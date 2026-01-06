"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus, X, Keyboard, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";

interface GuestCounts {
    adults: number;
    children: number;
    infants: number;
    pets: number;
}

interface OccupiedRange {
    start: Date;
    end: Date;
}

export function BookingCard() {
    const { language, t } = useLanguage();
    const [isGuestOpen, setIsGuestOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [guestCounts, setGuestCounts] = useState<GuestCounts>({
        adults: 1,
        children: 0,
        infants: 0,
        pets: 0
    });

    const [checkIn, setCheckIn] = useState<Date>(new Date(2026, 1, 2));
    const [checkOut, setCheckOut] = useState<Date>(new Date(2026, 1, 5));
    const [selecting, setSelecting] = useState<'checkIn' | 'checkOut'>('checkIn');
    const [occupiedDates, setOccupiedDates] = useState<OccupiedRange[]>([]);
    const [isLoadingDays, setIsLoadingDays] = useState(true);
    const [viewMonth, setViewMonth] = useState(1); // Default to February as in image
    const [isBooked, setIsBooked] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    const nights = Math.max(0, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
    const pricePerNight = 2800000;
    const totalBasePrice = nights > 0 ? nights * pricePerNight : 0;

    const totalGuests = guestCounts.adults + guestCounts.children;

    // Helper for labels
    const getGuestLabel = () => {
        const guests = `${totalGuests} ${totalGuests > 1 ? t('booking.guests_label') : t('booking.guest_label')}`;
        const infants = guestCounts.infants > 0 ? `, ${guestCounts.infants} ${guestCounts.infants > 1 ? t('booking.infants_label') : t('booking.infant_label')}` : "";
        const pets = guestCounts.pets > 0 ? `, ${guestCounts.pets} ${guestCounts.pets > 1 ? t('booking.pets_label') : t('booking.pet_label')}` : "";
        return `${guests}${infants}${pets}`;
    };

    const guestLabel = getGuestLabel();

    useEffect(() => {
        async function fetchAvailability() {
            try {
                // 1. Fetch Airbnb bookings
                const airbnbResponse = await fetch('/api/calendar/airbnb');
                let airbnbEvents: OccupiedRange[] = [];
                if (airbnbResponse.ok) {
                    const text = await airbnbResponse.text();
                    const lines = text.split(/\r?\n/);
                    let currentEvent: any = null;

                    for (const line of lines) {
                        if (line.startsWith('BEGIN:VEVENT')) {
                            currentEvent = {};
                        } else if (line.startsWith('END:VEVENT')) {
                            if (currentEvent.start && currentEvent.end) {
                                airbnbEvents.push({ start: currentEvent.start, end: currentEvent.end });
                            }
                            currentEvent = null;
                        } else if (currentEvent) {
                            if (line.startsWith('DTSTART')) {
                                const val = line.split(':')[1];
                                currentEvent.start = parseICalDate(val);
                            } else if (line.startsWith('DTEND')) {
                                const val = line.split(':')[1];
                                currentEvent.end = parseICalDate(val);
                            }
                        }
                    }
                }

                // 2. Fetch internal bookings from Supabase
                const { data: internalBookings, error } = await supabase
                    .from('bookings')
                    .select('check_in, check_out');

                const internalEvents: OccupiedRange[] = [];
                if (!error && internalBookings) {
                    internalBookings.forEach(b => {
                        // Dividimos el string YYYY-MM-DD para crear una fecha local a las 00:00
                        // Esto coincide con las fechas generadas por el calendario visual.
                        const [y, m, d] = b.check_in.split('-').map(Number);
                        const [y2, m2, d2] = b.check_out.split('-').map(Number);

                        internalEvents.push({
                            start: new Date(y, m - 1, d),
                            end: new Date(y2, m2 - 1, d2)
                        });
                    });
                }

                // 3. Merge both
                setOccupiedDates([...airbnbEvents, ...internalEvents]);
            } catch (error) {
                console.error('Failed to load availability:', error);
            } finally {
                setIsLoadingDays(false);
            }
        }
        fetchAvailability();

        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsGuestOpen(false);
            }
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                // Check if the click was NOT on the inputs that trigger the calendar
                const isInputClick = (event.target as HTMLElement).closest('button[onClick*="setIsCalendarOpen"]');
                if (!isInputClick) {
                    setIsCalendarOpen(false);
                }
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const parseICalDate = (str: string) => {
        const y = parseInt(str.substring(0, 4));
        const m = parseInt(str.substring(4, 6)) - 1;
        const d = parseInt(str.substring(6, 8));
        return new Date(y, m, d);
    };

    const isDateOccupied = (date: Date) => {
        return occupiedDates.some(range => date >= range.start && date < range.end);
    };

    const updateCount = (type: keyof GuestCounts, delta: number) => {
        setGuestCounts(prev => {
            const newValue = Math.max(0, prev[type] + delta);
            if (type !== 'pets' && type !== 'infants') {
                const currentTotal = prev.adults + prev.children;
                if (currentTotal + delta > 16) return prev;
            }
            if (type === 'adults' && newValue === 0 && (prev.children > 0 || prev.infants > 0)) {
                return prev;
            }
            return { ...prev, [type]: newValue };
        });
    };

    const formatDateShort = (date: Date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const formatDateLong = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', options).replace('.', '');
    };

    const handleDateClick = (date: Date) => {
        if (isDateOccupied(date)) return;

        if (selecting === 'checkIn') {
            setCheckIn(date);
            setSelecting('checkOut');
            if (date >= checkOut) {
                const newOut = new Date(date);
                newOut.setDate(date.getDate() + 1);
                setCheckOut(newOut);
            }
        } else {
            if (date <= checkIn) {
                setCheckIn(date);
                setSelecting('checkOut');
            } else {
                setCheckOut(date);
                setIsCalendarOpen(false);
            }
        }
    };

    const handleReserva = async () => {
        try {
            // 1. Guardar en Supabase para sincronizar con Airbnb
            const { error } = await supabase.from('bookings').insert({
                check_in: checkIn.toISOString().split('T')[0],
                check_out: checkOut.toISOString().split('T')[0],
                guest_count: totalGuests,
                source: 'website'
            });

            if (error) {
                console.error('Error saving booking:', error);
                return;
            }

            // 2. Mostrar estado de éxito para pruebas
            setIsBooked(true);
            setTimeout(() => setIsBooked(false), 3000); // Reset after 3 seconds

            // 3. Comentado por ahora para pruebas del sistema
            // const message = `¡Hola! Quiero reservar la finca.\nLlegada: ${formatDateShort(checkIn)}\nSalida: ${formatDateShort(checkOut)}\nHuéspedes: ${totalGuests}`;
            // window.open(`https://wa.me/573196588185?text=${encodeURIComponent(message)}`, '_blank');
        } catch (err) {
            console.error('System error:', err);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-[0_6px_16px_rgba(0,0,0,0.12)] border border-[#dddddd] p-6 w-full max-w-[400px] mx-auto sticky top-24">
            <div className="flex items-baseline justify-between mb-6">
                <div>
                    <span className="text-2xl font-bold text-[#222222]">{t('booking.price')}</span>
                    <span className="text-[#222222] ml-1">{t('booking.night')}</span>
                </div>
            </div>

            <div className="border border-[#b0b0b0] rounded-lg overflow-visible mb-4 relative">
                <div className="grid grid-cols-2 border-b border-[#b0b0b0]">
                    <button
                        onClick={() => { setIsCalendarOpen(true); setSelecting('checkIn'); setIsGuestOpen(false); }}
                        className={`p-3 text-left hover:bg-gray-50 transition-colors border-r border-[#b0b0b0] ${selecting === 'checkIn' && isCalendarOpen ? 'ring-2 ring-black ring-inset z-10' : ''}`}
                    >
                        <span className="block text-[10px] font-bold uppercase text-[#222222]">{t('booking.checkin')}</span>
                        <span className="text-sm text-[#222222]">{formatDateShort(checkIn)}</span>
                    </button>
                    <button
                        onClick={() => { setIsCalendarOpen(true); setSelecting('checkOut'); setIsGuestOpen(false); }}
                        className={`p-3 text-left hover:bg-gray-50 transition-colors ${selecting === 'checkOut' && isCalendarOpen ? 'ring-2 ring-black ring-inset z-10' : ''}`}
                    >
                        <span className="block text-[10px] font-bold uppercase text-[#222222]">{t('booking.checkout')}</span>
                        <span className="text-sm text-[#222222]">{formatDateShort(checkOut)}</span>
                    </button>
                </div>

                <AnimatePresence>
                    {isCalendarOpen && (
                        <motion.div
                            ref={calendarRef}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            className="fixed md:absolute top-1/2 left-1/2 md:top-auto md:left-auto md:right-0 md:mt-2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 bg-white border border-[#dddddd] rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.2)] z-[100] p-8 w-[95vw] md:w-[750px] max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex flex-col md:flex-row justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-semibold mb-1">{nights} {nights === 1 ? t('booking.night_single') : t('booking.nights')}</h2>
                                    <p className="text-sm text-[#717171]">{formatDateLong(checkIn)} - {formatDateLong(checkOut)}</p>
                                </div>
                                <div className="mt-4 md:mt-0 flex items-center border border-[#dddddd] rounded-xl overflow-visible self-start relative">
                                    {/* Campo LLEGADA */}
                                    <div
                                        className={`p-2 px-4 flex flex-col transition-all relative ${selecting === 'checkIn' ? 'bg-white ring-2 ring-black rounded-xl z-20' : 'bg-gray-50'}`}
                                        onClick={() => setSelecting('checkIn')}
                                    >
                                        <span className="text-[10px] font-bold uppercase cursor-default">{t('booking.checkin')}</span>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={formatDateShort(checkIn)}
                                                onChange={(e) => {
                                                    const parts = e.target.value.split('/');
                                                    if (parts.length === 3) {
                                                        const d = parseInt(parts[0]), m = parseInt(parts[1]) - 1, y = parseInt(parts[2]);
                                                        const date = new Date(y, m, d);
                                                        if (!isNaN(date.getTime())) setCheckIn(date);
                                                    }
                                                }}
                                                className="text-sm font-semibold bg-transparent border-none p-0 focus:outline-none w-20"
                                            />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCheckIn(new Date());
                                                }}
                                                className="text-[#717171] hover:text-black"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Campo SALIDA */}
                                    <div
                                        className={`p-2 px-4 flex flex-col transition-all relative ${selecting === 'checkOut' ? 'bg-white ring-2 ring-black rounded-xl z-20' : 'bg-gray-50 border-l border-[#dddddd]'}`}
                                        onClick={() => setSelecting('checkOut')}
                                    >
                                        <span className="text-[10px] font-bold uppercase cursor-default">{t('booking.checkout')}</span>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                placeholder="DD/MM/YYYY"
                                                value={nights > 0 ? formatDateShort(checkOut) : ''}
                                                onChange={(e) => {
                                                    const parts = e.target.value.split('/');
                                                    if (parts.length === 3) {
                                                        const d = parseInt(parts[0]), m = parseInt(parts[1]) - 1, y = parseInt(parts[2]);
                                                        const date = new Date(y, m, d);
                                                        if (!isNaN(date.getTime()) && date > checkIn) setCheckOut(date);
                                                    }
                                                }}
                                                className={`text-sm font-semibold bg-transparent border-none p-0 focus:outline-none w-20 ${nights === 0 ? 'text-[#717171]' : ''}`}
                                            />
                                            {nights > 0 && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const freshOut = new Date(checkIn);
                                                        freshOut.setDate(checkIn.getDate() + 1);
                                                        setCheckOut(freshOut);
                                                    }}
                                                    className="text-[#717171] hover:text-black"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute top-0 left-0 right-0 flex justify-between items-center pointer-events-none">
                                    <button
                                        onClick={() => setViewMonth(prev => prev - 1)}
                                        className="p-2 hover:bg-gray-100 rounded-full pointer-events-auto"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-[#222222]" />
                                    </button>
                                    <button
                                        onClick={() => setViewMonth(prev => prev + 1)}
                                        className="p-2 hover:bg-gray-100 rounded-full pointer-events-auto"
                                    >
                                        <ChevronRight className="w-5 h-5 text-[#222222]" />
                                    </button>
                                </div>

                                <div className="flex flex-col md:flex-row gap-12">
                                    <CalendarMonth
                                        month={viewMonth}
                                        year={2026}
                                        onDateSelect={handleDateClick}
                                        checkIn={checkIn}
                                        checkOut={checkOut}
                                        isDateOccupied={isDateOccupied}
                                        language={language}
                                    />
                                    <CalendarMonth
                                        month={viewMonth + 1}
                                        year={2026}
                                        onDateSelect={handleDateClick}
                                        checkIn={checkIn}
                                        checkOut={checkOut}
                                        isDateOccupied={isDateOccupied}
                                        language={language}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-8 pt-4 border-t border-[#f0f0f0]">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full border border-black" />
                                        <span className="text-[10px] uppercase font-bold">{language === 'es' ? 'Disponible' : 'Available'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-white border border-[#ebebeb] flex items-center justify-center overflow-hidden">
                                            <div className="w-full h-[1px] bg-[#ebebeb] rotate-45" />
                                        </div>
                                        <span className="text-[10px] uppercase font-bold text-[#717171]">{language === 'es' ? 'Ocupado' : 'Occupied'}</span>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <button
                                        onClick={() => {
                                            const t = new Date();
                                            setCheckIn(t);
                                            const tom = new Date(t);
                                            tom.setDate(t.getDate() + 1);
                                            setCheckOut(tom);
                                        }}
                                        className="text-sm font-semibold underline"
                                    >
                                        {language === 'es' ? 'Borrar fechas' : 'Clear dates'}
                                    </button>
                                    <button
                                        onClick={() => setIsCalendarOpen(false)}
                                        className="bg-[#222222] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-black transition-colors"
                                    >
                                        {language === 'es' ? 'Cerrar' : 'Close'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => { setIsGuestOpen(!isGuestOpen); setIsCalendarOpen(false); }}
                        className={`w-full p-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${isGuestOpen ? 'ring-2 ring-black ring-inset z-10' : ''}`}
                    >
                        <div>
                            <span className="block text-[10px] font-bold uppercase text-[#222222]">{t('booking.guests')}</span>
                            <span className="text-sm text-[#222222] line-clamp-1">{guestLabel}</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isGuestOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isGuestOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#dddddd] rounded-lg shadow-xl z-50 p-4 space-y-4"
                            >
                                <GuestRow
                                    label={language === 'es' ? 'Adultos' : 'Adults'}
                                    sub={language === 'es' ? 'Edad 13 o más' : 'Ages 13 or above'}
                                    count={guestCounts.adults}
                                    onUpdate={(d) => updateCount('adults', d)}
                                    min={1}
                                />
                                <GuestRow
                                    label={language === 'es' ? 'Niños' : 'Children'}
                                    sub={language === 'es' ? 'De 2 a 12 años' : 'Ages 2-12'}
                                    count={guestCounts.children}
                                    onUpdate={(d) => updateCount('children', d)}
                                />
                                <GuestRow
                                    label={language === 'es' ? 'Bebés' : 'Infants'}
                                    sub={language === 'es' ? 'Menos de 2 años' : 'Under 2'}
                                    count={guestCounts.infants}
                                    onUpdate={(d) => updateCount('infants', d)}
                                />
                                <GuestRow
                                    label={language === 'es' ? 'Mascotas' : 'Pets'}
                                    sub={language === 'es' ? '¿Traes un animal de servicio?' : 'Bringing a service animal?'}
                                    count={guestCounts.pets}
                                    onUpdate={(d) => updateCount('pets', d)}
                                />
                                <p className="text-[12px] text-[#717171] leading-tight">
                                    {language === 'es'
                                        ? 'Este alojamiento tiene una capacidad máxima de 16 huéspedes, sin contar bebés.'
                                        : 'This home has a maximum capacity of 16 guests, excluding infants.'}
                                </p>
                                <div className="flex justify-end pt-2">
                                    <button
                                        onClick={() => setIsGuestOpen(false)}
                                        className="text-sm font-semibold underline hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                                    >
                                        {language === 'es' ? 'Cerrar' : 'Close'}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <button
                onClick={handleReserva}
                disabled={isBooked}
                className={`w-full py-3.5 ${isBooked ? 'bg-green-600' : 'bg-[#E31C5F] hover:bg-[#D70466]'} text-white font-semibold rounded-lg transition-all mb-4 text-lg shadow-lg active:scale-[0.98] flex items-center justify-center gap-2`}
            >
                {isBooked ? (
                    <>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        {t('booking.button.done')}
                    </>
                ) : (
                    t('booking.button')
                )}
            </button>

            <p className="text-center text-[#222222] text-sm mb-4">{t('booking.no_charge')}</p>

            <div className="space-y-3 pt-4 border-t border-[#dddddd]">
                <div className="flex justify-between text-[#222222]">
                    <span className="underline">{t('booking.price')} x {nights} {nights === 1 ? t('booking.night_single') : t('booking.nights')}</span>
                    <span>${totalBasePrice.toLocaleString(language === 'es' ? 'es-CO' : 'en-US')} COP</span>
                </div>
                <div className="flex justify-between text-[#222222]">
                    <span className="underline">{t('booking.service_fee')}</span>
                    <span>$0 COP</span>
                </div>
                <div className="flex justify-between font-bold text-[#222222] pt-3 border-t border-[#f0f0f0]">
                    <span>{t('booking.total')}</span>
                    <span>${totalBasePrice.toLocaleString(language === 'es' ? 'es-CO' : 'en-US')} COP</span>
                </div>
            </div>
        </div>
    );
}

function GuestRow({ label, sub, count, onUpdate, min = 0 }: { label: string, sub: string, count: number, onUpdate: (d: number) => void, min?: number }) {
    return (
        <div className="flex items-center justify-between py-2">
            <div>
                <p className="font-semibold text-[#222222]">{label}</p>
                <p className="text-sm text-[#717171]">{sub}</p>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => onUpdate(-1)}
                    disabled={count <= min}
                    className="w-8 h-8 rounded-full border border-[#b0b0b0] flex items-center justify-center hover:border-[#222222] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <Minus className="w-4 h-4" />
                </button>
                <span className="w-4 text-center text-[#222222]">{count}</span>
                <button
                    onClick={() => onUpdate(1)}
                    className="w-8 h-8 rounded-full border border-[#b0b0b0] flex items-center justify-center hover:border-[#222222] transition-colors"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

function CalendarMonth({ month, year, onDateSelect, checkIn, checkOut, isDateOccupied, language }: { month: number, year: number, onDateSelect: (d: Date) => void, checkIn: Date, checkOut: Date, isDateOccupied: (d: Date) => boolean, language: string }) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < startOffset; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));

    const dayLabels = language === 'es' ? ['L', 'Ma', 'Mi', 'J', 'V', 'S', 'D'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const monthName = new Date(year, month).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { month: 'long', year: 'numeric' });

    return (
        <div className="flex-1 min-w-[300px]">
            <h3 className="font-bold mb-6 text-center capitalize">{monthName}</h3>
            <div className="grid grid-cols-7 gap-y-1 text-center text-xs mb-4">
                {dayLabels.map((l, idx) => <span key={`${l}-${idx}`} className="text-[#717171] font-bold">{l}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-y-1 relative">
                {days.map((date, i) => {
                    if (!date) return <div key={`empty-${i}`} className="h-12 w-12" />;

                    const isCheckIn = date.getTime() === checkIn.getTime();
                    const isCheckOut = date.getTime() === checkOut.getTime();
                    const isSelected = isCheckIn || isCheckOut;
                    const isInRange = date > checkIn && date < checkOut;
                    const isPast = date < today;
                    const isOccupied = isDateOccupied(date);

                    return (
                        <div key={date.getTime()} className={`relative h-12 flex items-center justify-center ${isInRange ? 'bg-[#f7f7f7]' : ''} ${isCheckIn && checkOut > checkIn ? 'rounded-l-full bg-gradient-to-r from-transparent to-[#f7f7f7]' : ''} ${isCheckOut ? 'rounded-r-full bg-gradient-to-l from-transparent to-[#f7f7f7]' : ''}`}>
                            <button
                                disabled={isPast || isOccupied}
                                onClick={() => onDateSelect(date)}
                                className={`
                                    h-11 w-11 flex items-center justify-center rounded-full text-sm transition-all z-10 font-medium
                                    ${isSelected ? 'bg-[#222222] text-white shadow-lg' : ''}
                                    ${isOccupied ? 'text-[#ebebeb] cursor-not-allowed line-through' : ''}
                                    ${!isSelected && !isOccupied ? 'hover:border hover:border-black' : ''}
                                    ${isPast ? 'text-[#ebebeb] cursor-not-allowed line-through' : (isOccupied ? 'text-[#ebebeb]' : 'text-[#222222]')}
                                `}
                            >
                                {date.getDate()}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
