"use client";

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Loader2, Calendar as CalendarIcon, Info, DollarSign, ExternalLink, X, User, Hash, CreditCard } from 'lucide-react';
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
        original?: any;
    };
}

const PLATFORM_COLORS: Record<string, string> = {
    airbnb: '#FF5A5F',
    booking: '#003580',
    homeaway: '#333D47',
    vrbo: '#333D47',
    direct: '#1a3c34', // Color de marca
    manual: '#1a3c34', // Color de marca
};

const BLOCK_COLOR = '#9a7d45'; // Dorado (bloqueado)

// Definitive fix for hydration error with FullCalendar in Next.js
const FullCalendarComponent = dynamic(
    () => import('@fullcalendar/react').then((mod) => mod.default),
    {
        ssr: false,
        loading: () => (
            <div className="h-full w-full flex flex-col items-center justify-center p-10 bg-white">
                <Loader2 className="w-8 h-8 animate-spin text-[#1a3c34] mb-4" />
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
    const [currentDateRange, setCurrentDateRange] = useState<{ start: string; end: string } | null>(null);
    const [dailyPrices, setDailyPrices] = useState<Record<string, { formatted: string; amount: number }>>({});
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

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
        // If there's an event on this day that is NOT a block (like a reservation), we don't allow blocking?
        // Actually, Hospitable allows blocking even if there's a reservation.
        setSelectedDate(info.dateStr);
    };

    const triggerToggleAvailability = async (date: string, available: boolean) => {
        setIsToggling(true);
        try {
            const response = await fetch('/api/calendar/hospitable', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dates: [
                        {
                            date,
                            available,
                            // When blocking, we can set some defaults like in n8n
                            ...(!available && {
                                price: { amount: 1000 }, // Placeholder or current price
                                closed_for_checkout: true,
                                closed_for_checkin: true
                            })
                        }
                    ]
                })
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

    const renderEventContent = (eventInfo: any) => {
        const { extendedProps } = eventInfo.event;
        const type = extendedProps.type;
        if (type === 'block') return null;

        const isCancelled = extendedProps.isCancelled;

        return (
            <div className={`p-1 h-full flex flex-col justify-center overflow-hidden rounded-md ${isCancelled ? 'opacity-50 grayscale' : ''}`}>
                <div className="flex items-center gap-1 min-w-0">
                    <span className="font-bold text-[8px] lg:text-[10px] leading-tight truncate uppercase tracking-tighter">
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
            <div className={`w-full h-full flex flex-col p-1 lg:p-2 ${isMobile ? 'min-h-[45px]' : 'min-h-[100px]'} relative group overflow-hidden`}>
                <span className="text-[10px] lg:text-base font-serif font-bold text-slate-400 group-hover:text-[#1a3c34] transition-colors leading-none">
                    {args.dayNumberText}
                </span>

                {priceData && (
                    <div className="mt-auto flex flex-col items-start lg:items-end">
                        <span className="text-[8px] lg:text-[10px] font-black text-[#1a3c34] leading-tight mb-0.5">
                            {mounted && isMobile ?
                                `$${(priceData.amount / 1000000).toFixed(1)}M` :
                                priceData.formatted
                            }
                        </span>
                    </div>
                )}
            </div>
        );
    };

    if (!mounted) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-10 bg-white rounded-[2rem] shadow-sm animate-pulse">
                <Loader2 className="w-8 h-8 animate-spin text-[#1a3c34] mb-4" />
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
                    className="bg-[#1a3c34] text-white px-6 py-2 rounded-xl text-sm font-bold active:scale-95 transition-all"
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
                            right: 'today'
                        } : {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth'
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
                        <Loader2 className="w-8 h-8 animate-spin text-[#1a3c34]" />
                    </div>
                )}

                {loading && (
                    <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-[#1a3c34]" />
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selectedEvent && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-slate-50 bg-slate-50/30">
                                <h3 className="text-xl font-serif font-bold text-[#1a3c34] flex items-center gap-3">
                                    <div className="p-2 bg-[#1a3c34]/5 rounded-xl">
                                        <CalendarIcon className="w-5 h-5 text-[#1a3c34]" />
                                    </div>
                                    Detalle de Reserva
                                    <span className={`ml-2 text-[10px] px-2 py-1 rounded-full uppercase tracking-widest ${selectedEvent.status?.toLowerCase() === 'accepted' ? 'bg-green-100 text-green-700' :
                                        selectedEvent.status?.toLowerCase() === 'cancelled' || selectedEvent.status?.toLowerCase().includes('declined') ? 'bg-red-100 text-red-700' :
                                            'bg-blue-100 text-blue-700'
                                        }`}>
                                        {selectedEvent.status}
                                    </span>
                                </h3>
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-8 space-y-8">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                                            <User className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Huésped</label>
                                            <p className="text-slate-900 font-serif font-bold text-lg leading-tight">{selectedEvent.guestName}</p>
                                            <p className="text-xs text-slate-500 mt-1 font-medium">{selectedEvent.phone}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-orange-50 rounded-2xl text-orange-600">
                                            <Info className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Personas</label>
                                            <p className="text-slate-900 font-bold text-lg">{selectedEvent.guestCount} Huéspedes</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
                                            <Hash className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Plataforma</label>
                                            <p className="text-slate-900 font-bold text-sm tracking-tight">{selectedEvent.platform || 'Directo'}</p>
                                            <p className="text-[10px] text-slate-400 font-mono mt-1">{selectedEvent.platformId}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-green-50 rounded-2xl text-green-600">
                                            <DollarSign className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Ingresos</label>
                                            <p className="text-green-700 font-bold text-xl">{selectedEvent.revenue}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-50/80 rounded-3xl p-6 grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-1">Check In</label>
                                        <p className="text-slate-700 font-bold text-sm">{formatDate(selectedEvent.checkIn)}</p>
                                    </div>
                                    <div>
                                        <label className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-1">Check Out</label>
                                        <p className="text-slate-700 font-bold text-sm">{formatDate(selectedEvent.checkOut)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50/30">
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="w-full bg-[#1a3c34] hover:bg-[#254d42] text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-[#1a3c34]/10 active:scale-[0.98]"
                                >
                                    Cerrar Detalles
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {selectedDate && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden border border-slate-100"
                        >
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CalendarIcon className="w-8 h-8 text-[#1a3c34]" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-[#1a3c34] mb-2">
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
                                        className="w-full bg-[#1a3c34] hover:bg-[#254d42] text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mb-3"
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
                    color: #1a3c34;
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
                    color: #1a3c34;
                }

                .admin-calendar-parent .fc .fc-button-primary:not(:disabled).fc-button-active,
                .admin-calendar-parent .fc .fc-button-primary:active {
                    background-color: #1a3c34 !important;
                    border-color: #1a3c34 !important;
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

                /* Ensure cell rows stay relatively even */
                .admin-calendar-parent .fc-daygrid-day-frame {
                    min-height: 100px;
                }

                .admin-calendar-parent .fc-daygrid-more-link {
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: #1a3c34;
                    padding-left: 4px;
                }

                /* Popover (See more modal) styling */
                .fc-popover {
                    z-index: 100 !important;
                    background: white !important;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
                    border: 1px solid #e2e8f0 !important;
                    border-radius: 1rem !important;
                    width: 300px !important;
                }

                .fc-popover .fc-popover-header {
                    background: #f8fafc !important;
                    padding: 12px 16px !important;
                    border-top-left-radius: 1rem !important;
                    border-top-right-radius: 1rem !important;
                    font-weight: 800 !important;
                    font-size: 0.9rem !important;
                    color: #1a3c34 !important;
                }

                .fc-popover .fc-popover-body {
                    padding: 12px 8px !important;
                }

                .fc-popover .fc-event {
                    margin-bottom: 8px !important;
                    min-height: 40px !important;
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
