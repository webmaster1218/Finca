"use client";

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Loader2, Calendar as CalendarIcon, Info, DollarSign, ExternalLink, X, User, Hash, CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import esLocale from '@fullcalendar/core/locales/es';

interface CalendarEvent {
    title: string;
    start: string;
    end?: string;
    allDay?: boolean;
    backgroundColor: string;
    borderColor: string;
    textColor?: string;
    display?: string;
    extendedProps: {
        type: 'reservation' | 'block';
        status?: string;
        isCancelled?: boolean;
        available?: boolean;
        price?: string;
        guestName?: string;
        platformId?: string;
        revenue?: string;
        platform?: string;
        phone?: string;
        guestCount?: number;
        checkIn?: string;
        checkOut?: string;
        uuid?: string;
        original?: any;
    };
}

const PLATFORM_COLORS: Record<string, string> = {
    airbnb: '#FF5A5F',
    booking: '#003580',
    homeaway: '#333D47',
    vrbo: '#333D47',
    direct: '#6f7c4e', // Color de marca
    manual: '#6f7c4e', // Color de marca
};

const BLOCK_COLOR = '#9a7d45'; // Dorado (bloqueado)

// Definitive fix for hydration error with FullCalendar in Next.js
const FullCalendarComponent = dynamic(
    () => import('@fullcalendar/react').then((mod) => mod.default),
    {
        ssr: false,
        loading: () => (
            <div className="h-full w-full flex flex-col items-center justify-center p-10 bg-white">
                <Loader2 className="w-8 h-8 animate-spin text-[#6f7c4e] mb-4" />
                <p className="text-slate-400 font-medium">Iniciando componente...</p>
            </div>
        )
    }
);

export default function AdminCalendar() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent['extendedProps'] | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isToggling, setIsToggling] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);
    const [currentDateRange, setCurrentDateRange] = useState<{ start: string; end: string } | null>(null);
    const [dailyPrices, setDailyPrices] = useState<Record<string, { formatted: string; amount: number }>>({});
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    // New states for Context Menu and Price Modal
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; date: string } | null>(null);
    const [priceModal, setPriceModal] = useState<{ date: string; amount: number } | null>(null);
    const [newPrice, setNewPrice] = useState<string>('');
    const [confirmCancel, setConfirmCancel] = useState<string | null>(null);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const showNotification = useCallback((message: string, type: 'success' | 'error' = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    }, []);


    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const fetchCalendarData = useCallback(async (start: string, end: string) => {
        setLoading(true);
        setError(null);
        console.log(`[AdminCalendar] fetchCalendarData triggered for ${start} to ${end}`);

        try {
            // 1. Fetch Reservations (Expects start_date and end_date)
            const resParams = new URLSearchParams({ start_date: start, end_date: end });
            const resResponse = await fetch(`/api/calendar/hospitable/reservations?${resParams.toString()}`);
            let reservations = [];

            if (resResponse.ok) {
                const resData = await resResponse.json();
                reservations = Array.isArray(resData) ? resData : (resData.data || []);
                // If it's the detailed structure from reservations API
                if (Array.isArray(resData) && resData[0]?.data) reservations = resData[0].data;
            }

            // 2. Fetch Blocks
            const calParams = new URLSearchParams({ start, end });
            const calResponse = await fetch(`/api/calendar/hospitable?${calParams.toString()}`);
            let blocks = [];
            const pricesMap: Record<string, { formatted: string; amount: number }> = {};

            if (calResponse.ok) {
                const calData = await calResponse.json();

                let rawDays: any[] = [];
                if (Array.isArray(calData)) {
                    calData.forEach(item => {
                        const d = item.data?.days || item.days;
                        if (Array.isArray(d)) rawDays.push(...d);
                    });
                } else if (calData.data) {
                    if (Array.isArray(calData.data)) {
                        calData.data.forEach((listing: any) => {
                            if (Array.isArray(listing.days)) rawDays.push(...listing.days);
                        });
                    } else if (Array.isArray(calData.data.days)) {
                        rawDays = calData.data.days;
                    }
                } else if (Array.isArray(calData.days)) {
                    rawDays = calData.days;
                }

                const uniqueDaysMap: Record<string, any> = {};
                rawDays.forEach(day => {
                    if (!uniqueDaysMap[day.date]) {
                        uniqueDaysMap[day.date] = day;
                    } else {
                        const existing = uniqueDaysMap[day.date];
                        if (!day.status?.available) {
                            existing.status = day.status;
                            existing.reservation_id = day.reservation_id;
                        }
                        if (!existing.price && day.price) {
                            existing.price = day.price;
                        }
                    }
                });

                const finalDays = Object.values(uniqueDaysMap);

                blocks = finalDays.filter((day: any) =>
                    !day.status?.available &&
                    day.status?.reason !== 'RESERVED' &&
                    day.status?.source_type !== 'RESERVATION' &&
                    !day.reservation_id
                );

                finalDays.forEach((day: any) => {
                    if (day.price) {
                        pricesMap[day.date] = {
                            formatted: day.price.formatted,
                            amount: day.price.amount
                        };
                    }
                });
            }

            setDailyPrices(pricesMap);

            // 3. Transform Data
            const formattedEvents: CalendarEvent[] = [];
            reservations.forEach((reservation: any) => {
                const platformKey = reservation.platform?.toLowerCase() || 'manual';
                const color = PLATFORM_COLORS[platformKey] || PLATFORM_COLORS['manual'];

                let guestName = 'Huésped';
                if (reservation.guest) {
                    const full = `${reservation.guest.first_name || ''} ${reservation.guest.last_name || ''}`.trim();
                    if (full) guestName = full;
                }

                const s = reservation.reservation_status?.current?.category || '';
                const sub = reservation.reservation_status?.current?.sub_category || '';
                const fullStatus = sub ? `${s} (${sub})` : s;
                const sL = fullStatus.toLowerCase();
                const isCancelled = sL.includes('cancelled') || sL.includes('declined') || sL.includes('denied') || sL.includes('expired');

                formattedEvents.push({
                    title: guestName,
                    start: reservation.arrival_date,
                    end: reservation.departure_date,
                    backgroundColor: color,
                    borderColor: color,
                    textColor: '#ffffff',
                    extendedProps: {
                        type: 'reservation',
                        isCancelled: isCancelled,
                        guestName: guestName,
                        platformId: reservation.platform_id || 'N/A',
                        revenue: reservation.financials?.host?.revenue?.formatted || 'N/A',
                        platform: reservation.platform,
                        phone: reservation.guest?.phone_numbers?.[0] || 'N/A',
                        guestCount: reservation.guests?.total || 0,
                        status: fullStatus || 'N/A',
                        checkIn: reservation.check_in,
                        checkOut: reservation.check_out,
                        uuid: reservation.uuid || reservation.id,
                        original: reservation
                    }
                });
            });

            // Map Blocks
            blocks.forEach((day: any) => {
                formattedEvents.push({
                    title: day.status?.reason || 'Bloqueado',
                    start: day.date,
                    allDay: true,
                    backgroundColor: BLOCK_COLOR,
                    borderColor: BLOCK_COLOR,
                    textColor: '#ffffff',
                    display: 'background',
                    extendedProps: {
                        type: 'block',
                        original: day
                    }
                });
            });

            setEvents(formattedEvents);
        } catch (err: any) {
            console.error('Fetch error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (currentDateRange) {
            fetchCalendarData(currentDateRange.start, currentDateRange.end);
        }
    }, [currentDateRange, fetchCalendarData]);

    const handleEventClick = (info: any) => {
        const props = info.event.extendedProps as CalendarEvent['extendedProps'];
        if (props.type === 'reservation') {
            setSelectedEvent(props);
        } else if (props.type === 'block') {
            // If it's a block, we might want to unblock it
            setSelectedDate(info.event.startStr.split('T')[0]);
        }
    };

    const handleDateClick = (info: any) => {
        // Disabled left-click as requested - using right-click context menu instead
    };

    const handleContextMenu = (e: React.MouseEvent, dateStr: string) => {
        e.preventDefault();
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            date: dateStr
        });
    };

    const triggerToggleAvailability = async (date: string, available: boolean, price?: number) => {
        setIsToggling(true);
        try {
            const body: any = {
                dates: [
                    {
                        date,
                        available,
                    }
                ]
            };

            // If we are blocking, set defaults. If we are just updating price, send the price.
            if (!available) {
                body.dates[0].closed_for_checkout = true;
                body.dates[0].closed_for_checkin = true;
            }

            if (price !== undefined) {
                body.dates[0].price = { amount: price };
            }

            const response = await fetch('/api/calendar/hospitable', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                // Refresh data
                if (currentDateRange) {
                    await fetchCalendarData(currentDateRange.start, currentDateRange.end);
                }
                setSelectedDate(null);
            } else {
                const err = await response.json();
                alert(`Error: ${err.message || 'No se pudo actualizar la disponibilidad'}`);
            }
        } catch (err) {
            alert('Error de conexión');
        } finally {
            setIsToggling(false);
        }
    };

    const handleCancelReservation = async (uuid: string) => {
        setIsCancelling(true);
        setConfirmCancel(null);
        try {
            const response = await fetch(`/api/calendar/hospitable/reservations/${uuid}/cancel`, {
                method: 'POST'
            });

            if (response.ok) {
                showNotification('Reserva cancelada con éxito', 'success');
                setSelectedEvent(null);
                // Refresh data
                if (currentDateRange) {
                    await fetchCalendarData(currentDateRange.start, currentDateRange.end);
                }
            } else {
                const err = await response.json();
                showNotification(err.message || 'No se pudo cancelar la reserva', 'error');
            }
        } catch (err) {
            showNotification('Error de conexión al intentar cancelar', 'error');
        } finally {
            setIsCancelling(false);
        }
    };

    const renderEventContent = (eventInfo: any) => {
        const { extendedProps } = eventInfo.event;
        const type = extendedProps.type;
        if (type === 'block') return null;

        const isCancelled = extendedProps.isCancelled;

        return (
            <div className={`p-1 h-full flex flex-col justify-center overflow-hidden rounded-md ${isCancelled ? 'opacity-50 grayscale' : ''}`}>
                <div className="flex items-center gap-1 min-w-0">
                    <span className={`font-bold text-[8px] lg:text-[10px] leading-tight truncate uppercase tracking-tighter ${isCancelled ? 'line-through decoration-white/50' : ''}`}>
                        {eventInfo.event.title}
                    </span>
                </div>
                {!isMobile && (
                    <div className="flex items-center justify-between mt-0.5 opacity-80">
                        <span className="text-[8px] font-medium truncate uppercase">{extendedProps.platform}</span>
                        <span className="text-[8px] font-bold">{extendedProps.guestCount} h.</span>
                    </div>
                )}
            </div>
        );
    };


    const renderDayCellContent = (args: any) => {
        const dateStr = args.date.toISOString().split('T')[0];
        const priceData = dailyPrices[dateStr];

        return (
            <div
                className={`w-full h-full flex flex-col p-1 lg:p-2 ${isMobile ? 'min-h-[45px]' : 'min-h-[100px]'} relative group transition-colors hover:bg-slate-50/50 cursor-pointer overflow-hidden`}
                onContextMenu={(e) => handleContextMenu(e, dateStr)}
            >
                {/* Day Number */}
                <span className="text-[10px] lg:text-base font-serif font-bold text-slate-400 group-hover:text-[#6f7c4e] transition-colors leading-none mb-1">
                    {args.dayNumberText}
                </span>

                {/* Price Display */}
                {priceData && (
                    <div className="mt-auto flex flex-col items-start lg:items-end">
                        <span className="text-[8px] lg:text-[10px] font-black text-[#6f7c4e] leading-tight mb-0.5">
                            {mounted && isMobile ?
                                `$${(priceData.amount / 1).toFixed(0)}` :
                                priceData.formatted
                            }
                        </span>
                    </div>
                )}
            </div>
        );
    };

    const handlePriceSubmit = async (e: React.FormEvent) => {
        if (!priceModal) return;
        e.preventDefault();
        // Remove $ and . to get raw number
        const rawValue = newPrice.replace(/[^0-9]/g, '');
        const amount = parseInt(rawValue, 10);
        if (isNaN(amount)) return;

        await triggerToggleAvailability(priceModal.date, true, amount);
        setPriceModal(null);
        setNewPrice('');
    };
    if (!mounted) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-10 bg-white rounded-[2rem] shadow-sm animate-pulse">
                <Loader2 className="w-8 h-8 animate-spin text-[#6f7c4e] mb-4" />
                <p className="text-slate-400 font-medium">Cargando calendario...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-10 text-center bg-white rounded-[2rem] shadow-sm">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
                    <Info className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-slate-800 font-bold text-xl mb-2 font-serif">Error de Conexión</h3>
                <p className="text-slate-500 text-sm mb-6 max-w-xs">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-[#6f7c4e] text-white px-6 py-2 rounded-xl text-sm font-bold active:scale-95 transition-all"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    const formatDate = (dateStr: string | undefined) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleString('es-CO', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className={`${isMobile ? 'h-auto' : 'h-full'} flex flex-col admin-calendar-parent animate-in fade-in zoom-in-95 duration-500 relative`}>

            <div className="flex-grow lg:flex-grow-0 lg:h-full relative bg-white rounded-2xl lg:rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden min-h-[400px]">
                {mounted && (
                    <FullCalendarComponent
                        // @ts-ignore
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                        headerToolbar={isMobile ? {
                            left: 'prev,next',
                            center: 'title',
                            right: 'today refresh'
                        } : {
                            left: 'prev,next today refresh',
                            center: 'title',
                            right: 'dayGridMonth'
                        }}
                        customButtons={{
                            refresh: {
                                text: 'Actualizar',
                                click: () => {
                                    if (currentDateRange) {
                                        fetchCalendarData(currentDateRange.start, currentDateRange.end);
                                    }
                                }
                            }
                        }}
                        locale={esLocale}
                        datesSet={(dateInfo) => {
                            const start = dateInfo.startStr.split('T')[0];
                            const end = dateInfo.endStr.split('T')[0];
                            if (currentDateRange?.start !== start || currentDateRange?.end !== end) {
                                setCurrentDateRange({ start, end });
                            }
                        }}
                        eventClick={handleEventClick}
                        dateClick={handleDateClick}
                        height={isMobile ? 'auto' : '100%'}
                        contentHeight={isMobile ? 'auto' : '100%'}
                        aspectRatio={isMobile ? 0.6 : 1.8}
                        eventContent={renderEventContent}
                        dayMaxEvents={isMobile ? 1 : 2}
                        eventDisplay="block"
                        nowIndicator={true}
                        stickyHeaderDates={true}
                        handleWindowResize={true}
                        eventOrder="isCancelled,start,title"
                        dayCellContent={renderDayCellContent}
                    />
                )}

                {!mounted && (
                    <div className="h-full w-full flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-[#6f7c4e]" />
                    </div>
                )}

                {loading && (
                    <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-[#6f7c4e]" />
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selectedEvent && (
                    <div key="reservation-modal" className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden relative border border-slate-100"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-slate-50 bg-slate-50/30">
                                <h3 className="text-xl font-serif font-bold text-[#6f7c4e] flex items-center gap-3">
                                    <div className="p-2 bg-[#6f7c4e]/5 rounded-xl shadow-inner">
                                        <CalendarIcon className="w-5 h-5 text-[#6f7c4e]" />
                                    </div>
                                    Detalle de Reserva
                                    {(() => {
                                        const status = selectedEvent.status?.toLowerCase() || '';
                                        let label = status;
                                        let colorClass = 'bg-blue-100 text-blue-700';

                                        if (status.includes('cancelled') || status.includes('declined')) {
                                            label = 'CANCELADA';
                                            colorClass = 'bg-red-50 text-red-600 border border-red-100';
                                        } else if (status.includes('accepted') || status.includes('confirmed')) {
                                            label = 'CONFIRMADA';
                                            colorClass = 'bg-green-50 text-green-700 border border-green-100';
                                        } else if (status.includes('pending')) {
                                            label = 'PENDIENTE';
                                            colorClass = 'bg-amber-50 text-amber-700 border border-amber-100';
                                        } else {
                                            label = label.toUpperCase();
                                        }

                                        return (
                                            <span className={`ml-2 text-[10px] px-3 py-1 rounded-full font-bold tracking-widest ${colorClass}`}>
                                                {label}
                                            </span>
                                        );
                                    })()}
                                </h3>
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-600 shadow-sm"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-8 space-y-8">
                                {/* Row 1: Guest Info */}
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 shadow-sm shrink-0">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <div className="min-w-0">
                                        <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Huésped principal</label>
                                        <p className={`text-slate-900 font-serif font-bold text-xl leading-tight ${selectedEvent.isCancelled ? 'line-through decoration-slate-300 opacity-60' : ''}`}>
                                            {selectedEvent.guestName}
                                        </p>
                                        <p className="text-sm text-slate-500 mt-1 font-medium">{selectedEvent.phone !== 'N/A' ? selectedEvent.phone : 'Sin teléfono'}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Ocupación */}
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-orange-50 rounded-2xl text-orange-600 shadow-sm shrink-0">
                                            <Info className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Ocupación</label>
                                            <p className="text-slate-900 font-bold text-lg">{selectedEvent.guestCount} {selectedEvent.guestCount === 1 ? 'Huésped' : 'Huéspedes'}</p>
                                        </div>
                                    </div>

                                    {/* Origen */}
                                    <div className="flex items-start gap-4 overflow-hidden">
                                        <div className="p-3 bg-purple-50 rounded-2xl text-purple-600 shadow-sm shrink-0">
                                            <Hash className="w-6 h-6" />
                                        </div>
                                        <div className="min-w-0">
                                            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Origen / Canal</label>
                                            <p className="text-slate-900 font-bold text-sm tracking-tight capitalize truncate">{selectedEvent.platform || 'Directo'}</p>
                                            <p className="text-[10px] text-slate-400 font-mono mt-1 truncate">{selectedEvent.platformId}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 3: Totals - Prominent */}
                                <div className="bg-green-50/50 rounded-3xl p-6 border border-green-100 flex items-center gap-6">
                                    <div className="p-4 bg-green-100/50 rounded-2xl text-green-700 shadow-sm shrink-0">
                                        <DollarSign className="w-8 h-8" />
                                    </div>
                                    <div className="min-w-0">
                                        <label className="text-[11px] text-green-700/60 font-black uppercase tracking-[0.2em] block mb-1">Ingresos totales</label>
                                        <p className="text-green-700 font-black text-2xl lg:text-3xl tracking-tight leading-none break-words">
                                            {selectedEvent.revenue !== 'N/A' ? selectedEvent.revenue : '$0.00 COP'}
                                        </p>
                                    </div>
                                </div>

                                {/* Row 4: Dates */}
                                <div className="bg-slate-50/80 rounded-3xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border border-slate-100 shadow-inner">
                                    <div className="flex flex-col">
                                        <label className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-2 px-1">Entrada (Check-in)</label>
                                        <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100/50">
                                            <p className="text-slate-700 font-bold text-sm">{formatDate(selectedEvent.checkIn)}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-2 px-1">Salida (Check-out)</label>
                                        <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100/50">
                                            <p className="text-slate-700 font-bold text-sm">{formatDate(selectedEvent.checkOut)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50/10 flex flex-col sm:flex-row gap-3">
                                {!selectedEvent.isCancelled && (selectedEvent.platform?.toLowerCase() === 'manual' || selectedEvent.platform?.toLowerCase() === 'direct') && (
                                    <button
                                        disabled={isCancelling}
                                        onClick={() => {
                                            const id = selectedEvent.uuid;
                                            const originalUuid = selectedEvent.original?.uuid;
                                            const originalId = selectedEvent.original?.id;
                                            const platformId = selectedEvent.platformId;
                                            const isManual = selectedEvent.platform?.toLowerCase() === 'manual' || selectedEvent.platform?.toLowerCase() === 'direct';

                                            // For manual reservations, 'uuid' is the correct identifier
                                            const idToUse = originalUuid || id;

                                            console.log('[Cancel Preparation] Potential IDs:', {
                                                id,
                                                originalId,
                                                originalUuid,
                                                platformId
                                            });

                                            if (!isManual) {
                                                showNotification('Solo se pueden cancelar reservas manuales directamente desde aquí.', 'error');
                                                return;
                                            }

                                            if (idToUse) {
                                                setConfirmCancel(idToUse);
                                            } else {
                                                showNotification('No se encontró el UUID de la reserva para cancelar.', 'error');
                                            }
                                        }}
                                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-4 px-6 rounded-2xl transition-all border border-red-200 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
                                    >
                                        {isCancelling ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Cancelar Reserva'}
                                    </button>
                                )}
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="flex-1 bg-[#6f7c4e] hover:bg-[#8a9866] text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-[#6f7c4e]/10 active:scale-[0.98]"
                                >
                                    Cerrar Detalles
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {selectedDate && (
                    <div key="date-modal" className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden border border-slate-100"
                        >
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CalendarIcon className="w-8 h-8 text-[#6f7c4e]" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-[#6f7c4e] mb-2">
                                    {(() => {
                                        const [y, m, d] = selectedDate.split('-').map(Number);
                                        return new Date(y, m - 1, d).toLocaleDateString('es-CO', { day: 'numeric', month: 'long' });
                                    })()}
                                </h3>
                                <p className="text-slate-500 text-sm mb-8">¿Qué acción deseas realizar para este día?</p>

                                {events.find(e => e.start === selectedDate && e.extendedProps.type === 'block') ? (
                                    <button
                                        disabled={isToggling}
                                        onClick={() => triggerToggleAvailability(selectedDate, true)}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mb-3"
                                    >
                                        {isToggling ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Desbloquear Día'}
                                    </button>
                                ) : (
                                    <button
                                        disabled={isToggling}
                                        onClick={() => triggerToggleAvailability(selectedDate, false)}
                                        className="w-full bg-[#6f7c4e] hover:bg-[#8a9866] text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mb-3"
                                    >
                                        {isToggling ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Bloquear Día'}
                                    </button>
                                )}

                                <button
                                    onClick={() => setSelectedDate(null)}
                                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 px-6 rounded-2xl transition-all active:scale-[0.98]"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {contextMenu && (
                    <>
                        <div
                            className="fixed inset-0 z-[110]"
                            onClick={() => setContextMenu(null)}
                            onContextMenu={(e) => { e.preventDefault(); setContextMenu(null); }}
                        />
                        <div
                            className="fixed z-[120] bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 min-w-[200px] animate-in fade-in zoom-in-95 duration-200"
                            style={{ top: contextMenu.y, left: contextMenu.x }}
                        >
                            <div className="px-4 py-2 border-b border-slate-50 mb-1">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    {new Date(contextMenu.date + 'T00:00:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'long' })}
                                </p>
                            </div>

                            {events.find(e => e.start === contextMenu.date && e.extendedProps.type === 'block') ? (
                                <button
                                    onClick={() => {
                                        triggerToggleAvailability(contextMenu.date, true);
                                        setContextMenu(null);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                                >
                                    <CalendarIcon className="w-4 h-4" />
                                    Desbloquear Día
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        triggerToggleAvailability(contextMenu.date, false);
                                        setContextMenu(null);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#6f7c4e] hover:bg-slate-50 rounded-xl transition-colors"
                                >
                                    <Loader2 className="w-4 h-4" />
                                    Bloquear Día
                                </button>
                            )}

                            <button
                                onClick={() => {
                                    const currentPrice = dailyPrices[contextMenu.date]?.amount || 0;
                                    setPriceModal({ date: contextMenu.date, amount: currentPrice });
                                    setNewPrice(currentPrice ? (currentPrice / 1).toString() : '');
                                    setContextMenu(null);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                            >
                                <DollarSign className="w-4 h-4" />
                                Cambiar Precio
                            </button>
                        </div>
                    </>
                )}

                {priceModal && (
                    <div key="price-modal" className="fixed inset-0 z-[130] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden"
                        >
                            <form onSubmit={handlePriceSubmit} className="p-8">
                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <DollarSign className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2 text-center">Ajustar Precio</h3>
                                <p className="text-slate-500 text-sm mb-6 text-center">
                                    Fecha: {new Date(priceModal.date + 'T00:00:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'long' })}
                                </p>

                                <div className="relative mb-6">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                    <input
                                        autoFocus
                                        type="text"
                                        value={newPrice}
                                        onChange={(e) => setNewPrice(e.target.value)}
                                        placeholder="0"
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-8 pr-4 text-xl font-bold text-slate-800 focus:border-[#6f7c4e] focus:bg-white outline-none transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setPriceModal(null)}
                                        className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-all"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isToggling}
                                        className="bg-[#6f7c4e] hover:bg-[#8a9866] text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
                                    >
                                        {isToggling ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Guardar'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
                {confirmCancel && (
                    <div key="confirm-modal" className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm overflow-hidden border border-slate-100 p-8 text-center"
                        >
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                                <Info className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-serif font-black text-slate-800 mb-4">¿Confirmar Cancelación?</h3>
                            <p className="text-slate-500 mb-8 leading-relaxed">
                                Esta acción es irreversible. Se liberarán las fechas en el calendario y se notificará al sistema.
                            </p>
                            <div className="grid grid-cols-1 gap-3">
                                <button
                                    onClick={() => handleCancelReservation(confirmCancel)}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-red-200 active:scale-[0.98]"
                                >
                                    Sí, Cancelar Reserva
                                </button>
                                <button
                                    onClick={() => setConfirmCancel(null)}
                                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-all active:scale-[0.98]"
                                >
                                    No, Mantener Reserva
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Global Notification */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] min-w-[320px] max-w-[90vw]"
                    >
                        <div className={`
                            flex items-center gap-4 p-4 rounded-[1.5rem] shadow-2xl border backdrop-blur-xl
                            ${notification.type === 'success'
                                ? 'bg-[#6f7c4e] border-white/20 text-white'
                                : 'bg-red-600 border-white/20 text-white'}
                        `}>
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                {notification.type === 'success' ? (
                                    <CheckCircle2 className="w-6 h-6" />
                                ) : (
                                    <AlertCircle className="w-6 h-6" />
                                )}
                            </div>
                            <div className="flex-grow">
                                <p className="text-sm font-bold tracking-tight leading-tight">
                                    {notification.message}
                                </p>
                            </div>
                            <button
                                onClick={() => setNotification(null)}
                                className="flex-shrink-0 w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .admin-calendar-parent .fc {
                    --fc-border-color: #f1f5f9;
                    --fc-today-bg-color: #fdfaf6;
                    --fc-event-border-radius: 8px;
                    --fc-page-bg-color: transparent;
                    --fc-neutral-bg-color: #f8fafc;
                    font-family: var(--font-sans);
                    font-size: 0.85rem;
                }
                
                .admin-calendar-parent .fc .fc-toolbar {
                    padding: 1.25rem 1.5rem;
                    margin-bottom: 0 !important;
                    background: white;
                    border-bottom: 1px solid #f1f5f9;
                }

                .admin-calendar-parent .fc .fc-toolbar-title {
                    font-family: var(--font-serif);
                    color: #6f7c4e;
                    font-weight: 800;
                    font-size: 1.5rem;
                    letter-spacing: -0.01em;
                }

                .admin-calendar-parent .fc .fc-button-primary {
                    background-color: transparent;
                    border: 1px solid #e2e8f0;
                    color: #64748b;
                    font-weight: 700;
                    padding: 0.5rem 1rem;
                    border-radius: 12px;
                    transition: all 0.2s;
                    font-size: 0.8rem;
                    box-shadow: none;
                }

                .admin-calendar-parent .fc .fc-button-primary:hover {
                    background-color: #f8fafc;
                    border-color: #cbd5e1;
                    color: #6f7c4e;
                }

                .admin-calendar-parent .fc .fc-button-primary:not(:disabled).fc-button-active,
                .admin-calendar-parent .fc .fc-button-primary:active {
                    background-color: #6f7c4e !important;
                    border-color: #6f7c4e !important;
                    color: white !important;
                }

                .admin-calendar-parent .fc .fc-col-header-cell {
                    padding: 12px 0;
                    background: #f8fafc;
                    color: #94a3b8;
                    font-weight: 800;
                    font-size: 0.65rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .admin-calendar-parent .fc-daygrid-day-number {
                    font-weight: 800;
                    color: #475569;
                    padding: 6px 10px !important;
                    font-size: 0.9rem;
                }

                .admin-calendar-parent .fc-event {
                    margin: 2px 4px;
                    border: none;
                    min-height: 34px;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                }

                .admin-calendar-parent .fc-day-today {
                    background-color: #fdfaf6 !important;
                }

                .admin-calendar-parent .fc-scrollgrid {
                    border: none !important;
                }

                /* Ensure cell rows stay relatively even and full interactive */
                .admin-calendar-parent .fc-daygrid-day-frame {
                    min-height: 100px;
                    display: flex !important;
                    flex-direction: column !important;
                    padding: 0 !important;
                }

                .admin-calendar-parent .fc-daygrid-day-events {
                    margin: 0 !important;
                    padding: 0 !important;
                    flex-grow: 1 !important;
                    display: flex !important;
                    flex-direction: column !important;
                    min-height: 0 !important;
                }

                .admin-calendar-parent .fc-daygrid-day-content {
                    padding: 0 !important;
                    margin: 0 !important;
                    flex-grow: 1 !important;
                    display: flex !important;
                    flex-direction: column !important;
                }

                .admin-calendar-parent .fc-daygrid-more-link {
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: #6f7c4e;
                    padding-left: 4px;
                }

                /* Popover (See more modal) styling */
                .fc-popover {
                    z-index: 100 !important;
                    background: white !important;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
                    border: 1px solid #f1f5f9 !important;
                    border-radius: 1.5rem !important;
                    width: 350px !important;
                    overflow: hidden !important;
                    animation: popoverFadeIn 0.2s ease-out;
                }

                @keyframes popoverFadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }

                .fc-popover .fc-popover-header {
                    background: white !important;
                    padding: 1.25rem 1.5rem !important;
                    border-bottom: 1px solid #f1f5f9 !important;
                    font-family: var(--font-serif) !important;
                    font-weight: 800 !important;
                    font-size: 1.1rem !important;
                    color: #6f7c4e !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: space-between !important;
                }

                /* Styling the close button in popover */
                .fc-popover .fc-popover-close {
                    opacity: 0.5;
                    transition: all 0.2s;
                    font-size: 1.2rem;
                    padding: 4px;
                }

                .fc-popover .fc-popover-close:hover {
                    opacity: 1;
                    background: #f8fafc;
                    border-radius: 8px;
                }

                .fc-popover .fc-popover-body {
                    padding: 1rem !important;
                    max-height: 400px;
                    overflow-y: auto;
                }

                .fc-popover .fc-event {
                    margin-bottom: 0.75rem !important;
                    padding: 0.75rem !important;
                    border-radius: 1rem !important;
                    border: none !important;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05) !important;
                    transition: transform 0.2s, box-shadow 0.2s !important;
                }

                .fc-popover .fc-event:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
                }

                .fc-popover .fc-event-title {
                    font-weight: 700 !important;
                    font-size: 0.9rem !important;
                }

                /* Mobile tweaks */
                @media (max-width: 640px) {
                    .admin-calendar-parent .fc .fc-toolbar {
                        padding: 0.75rem;
                        flex-direction: column;
                        gap: 0.75rem;
                    }
                    .admin-calendar-parent .fc .fc-toolbar-title {
                        font-size: 1rem;
                    }
                }
            `}</style>
        </div>
    );
}
