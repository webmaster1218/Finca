"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus, X, Keyboard, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useRouter } from "next/navigation";

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
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<'DATES' | 'INFO' | 'SUMMARY' | 'SUCCESS'>('DATES');
    const [isGuestOpen, setIsGuestOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    // Guest Counts
    const [guestCounts, setGuestCounts] = useState<GuestCounts>({
        adults: 1,
        children: 0,
        infants: 0,
        pets: 0
    });

    // Dates
    const getInitialDates = () => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        // Start from tomorrow by default to avoid same-day booking issues if not allowed
        const start = new Date(d);
        start.setDate(d.getDate() + 1);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        return { start, end };
    };

    const defaults = getInitialDates();
    const [checkIn, setCheckIn] = useState<Date>(defaults.start);
    const [checkOut, setCheckOut] = useState<Date>(defaults.end);
    const [selecting, setSelecting] = useState<'checkIn' | 'checkOut'>('checkIn');

    // Guest Information
    const [guestInfo, setGuestInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const [occupiedDates, setOccupiedDates] = useState<OccupiedRange[]>([]);
    const [isLoadingDays, setIsLoadingDays] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [viewMonth, setViewMonth] = useState(new Date().getMonth());

    const dropdownRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    const nights = Math.max(0, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
    const pricePerNight = 2800000;
    const totalBasePrice = nights > 0 ? nights * pricePerNight : 0;
    const totalGuests = guestCounts.adults + guestCounts.children;

    // Helper for labels
    const getGuestLabel = () => {
        const guestsText = totalGuests === 1
            ? (language === 'es' ? '1 huésped' : '1 guest')
            : (language === 'es' ? `${totalGuests} huéspedes` : `${totalGuests} guests`);

        const infants = guestCounts.infants > 0 ? `, ${guestCounts.infants} ${guestCounts.infants > 1 ? (language === 'es' ? 'bebés' : 'infants') : (language === 'es' ? 'bebé' : 'infant')}` : "";
        const pets = guestCounts.pets > 0 ? `, ${guestCounts.pets} ${guestCounts.pets > 1 ? (language === 'es' ? 'mascotas' : 'pets') : (language === 'es' ? 'mascota' : 'pet')}` : "";

        return `${guestsText}${infants}${pets}`;
    };

    useEffect(() => {
        async function fetchAvailability() {
            try {
                // Fetch for a wide range to ensure everything is covered
                const res = await fetch('/api/calendar/hospitable?start=2026-01-01&end=2027-01-01');
                if (res.ok) {
                    const data = await res.json();

                    // Hospitable response structure for the calendar endpoint is usually:
                    // { data: { days: [ { date, status: { available: boolean } } ] } }
                    // OR it could be the array directly if normalized by our API route
                    const calendarData = data.data || data;
                    const days = calendarData.days || (Array.isArray(calendarData) ? calendarData[0]?.data?.days : []);

                    const occupied: OccupiedRange[] = [];
                    let currentRange: OccupiedRange | null = null;

                    if (Array.isArray(days)) {
                        days.forEach((day: any) => {
                            // available: false means it's booked/occupied
                            if (day.status && day.status.available === false) {
                                const date = new Date(day.date + 'T00:00:00');
                                if (!currentRange) {
                                    currentRange = { start: date, end: new Date(date.getTime() + 86400000) };
                                } else {
                                    // Extend range if consecutive
                                    currentRange.end = new Date(date.getTime() + 86400000);
                                }
                            } else if (currentRange) {
                                occupied.push(currentRange);
                                currentRange = null;
                            }
                        });
                        if (currentRange) occupied.push(currentRange);
                    }

                    setOccupiedDates(occupied);

                    // If default dates are occupied, find first available ones
                    const isOccupied = (d: Date) => occupied.some(r => d >= r.start && d < r.end);
                    if (isOccupied(defaults.start) || isOccupied(defaults.end)) {
                        // Find first available day for check-in
                        let searchDate = new Date(defaults.start);
                        // Search up to 6 months ahead
                        for (let i = 0; i < 180; i++) {
                            if (!isOccupied(searchDate)) {
                                const nextDay = new Date(searchDate);
                                nextDay.setDate(searchDate.getDate() + 1);
                                if (!isOccupied(nextDay)) {
                                    setCheckIn(searchDate);
                                    setCheckOut(nextDay);
                                    break;
                                }
                            }
                            searchDate.setDate(searchDate.getDate() + 1);
                        }
                    }
                }
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
                setIsCalendarOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isDateOccupied = (date: Date) => {
        return occupiedDates.some(range => date >= range.start && date < range.end);
    };

    const formatDateShort = (date: Date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
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
        if (currentStep === 'DATES') {
            if (nights <= 0) {
                setError(language === 'es' ? 'Selecciona una fecha de salida' : 'Select a checkout date');
                return;
            }
            setError(null);
            setCurrentStep('INFO');
            return;
        }

        if (currentStep === 'INFO') {
            if (!guestInfo.firstName || !guestInfo.lastName || !guestInfo.email || !guestInfo.phone) {
                setError(language === 'es' ? 'Por favor completa todos los campos' : 'Please fill all fields');
                return;
            }
            setError(null);
            setCurrentStep('SUMMARY');
            return;
        }

        if (currentStep === 'SUMMARY') {
            setIsSubmitting(true);
            try {
                const response = await fetch('/api/calendar/hospitable/reservations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        check_in: checkIn.toISOString().split('T')[0],
                        check_out: checkOut.toISOString().split('T')[0],
                        guests: guestCounts,
                        guest: {
                            first_name: guestInfo.firstName,
                            last_name: guestInfo.lastName,
                            email: guestInfo.email,
                            phone: guestInfo.phone
                        },
                        channel: guestInfo.email, // Using email as channel like in n8n
                        reservation_code: `WEB-${Date.now()}`,
                        financials: {
                            accommodation: 0,
                            cleaning_fee: 0,
                            linen_fee: 0,
                            management_fee: 0,
                            community_fee: 0,
                            resort_fee: 0,
                            pet_fee: 0,
                            pass_through_taxes: 0,
                            other_fees: [
                                {
                                    amount: totalBasePrice * 100, // Total in cents/minor units
                                    label: "string"
                                }
                            ],
                            currency: 'COP'
                        },
                        language: 'es'
                    })
                });

                if (response.ok) {
                    router.push('/gracias');
                } else {
                    const err = await response.json();
                    setError(err.message || (language === 'es' ? 'Error al crear la reserva' : 'Error creating reservation'));
                }
            } catch (err) {
                setError(language === 'es' ? 'Error de conexión' : 'Connection error');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    if (currentStep === 'SUCCESS') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[32px] shadow-2xl p-10 border border-slate-100 text-center max-w-[450px] mx-auto sticky top-24 z-[100]"
            >
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                    <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-[#222222] mb-4">¡Reserva Exitosa!</h2>
                <p className="text-slate-600 mb-10 leading-relaxed text-lg">
                    Hemos recibido tu solicitud para el <strong>{formatDateShort(checkIn)}</strong> al <strong>{formatDateShort(checkOut)}</strong>.
                    Te enviaremos un correo para la confirmación y el contrato.
                </p>
                <button
                    onClick={() => setCurrentStep('DATES')}
                    className="w-full bg-[#1a3c34] text-white font-bold py-5 rounded-2xl hover:bg-[#254d42] transition-all shadow-lg active:scale-[0.98]"
                >
                    Volver al Inicio
                </button>
            </motion.div>
        );
    }

    return (
        <div className="bg-white rounded-[32px] shadow-[0_6px_16px_rgba(0,0,0,0.12)] border border-[#dddddd] p-8 w-full max-w-[480px] mx-auto sticky top-24 z-30">
            <AnimatePresence mode="wait">
                {currentStep === 'DATES' && (
                    <motion.div
                        key="step-dates"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Price & Rating Header */}
                        <div className="flex items-baseline justify-between mb-6">
                            <div>
                                <span className="text-2xl font-bold text-[#222222] tabular-nums">${pricePerNight.toLocaleString()}</span>
                                <span className="text-[#222222] ml-1 text-base">noche</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold bg-[#f7f7f7] px-3 py-1.5 rounded-full border border-[#ebebeb]">
                                <span className="text-[#222222]">★</span>
                                <span className="text-[#222222]">4.95</span>
                            </div>
                        </div>

                        {/* Booking Box */}
                        <div className="border border-[#b0b0b0] rounded-xl mb-6 relative">
                            <div className="grid grid-cols-2 border-b border-[#b0b0b0]">
                                <button
                                    onClick={() => { setIsCalendarOpen(true); setSelecting('checkIn'); setIsGuestOpen(false); }}
                                    className={`p-3 text-left hover:bg-gray-50 transition-colors border-r border-[#b0b0b0] rounded-tl-xl ${selecting === 'checkIn' && isCalendarOpen ? 'ring-2 ring-black ring-inset z-10' : ''}`}
                                >
                                    <span className="block text-[10px] font-bold uppercase text-[#222222] mb-1 tracking-tight">LLEGADA</span>
                                    <span className="text-sm font-semibold text-[#222222]">{formatDateShort(checkIn)}</span>
                                </button>
                                <button
                                    onClick={() => { setIsCalendarOpen(true); setSelecting('checkOut'); setIsGuestOpen(false); }}
                                    className={`p-3 text-left hover:bg-gray-50 transition-colors rounded-tr-xl ${selecting === 'checkOut' && isCalendarOpen ? 'ring-2 ring-black ring-inset z-10' : ''}`}
                                >
                                    <span className="block text-[10px] font-bold uppercase text-[#222222] mb-1 tracking-tight">SALIDA</span>
                                    <span className="text-sm font-semibold text-[#222222]">{formatDateShort(checkOut)}</span>
                                </button>
                            </div>
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => { setIsGuestOpen(!isGuestOpen); setIsCalendarOpen(false); }}
                                    className={`w-full p-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between rounded-b-xl ${isGuestOpen ? 'ring-2 ring-black ring-inset z-10' : ''}`}
                                >
                                    <div>
                                        <span className="block text-[10px] font-bold uppercase text-[#222222] mb-1 tracking-tight">HUÉSPEDES</span>
                                        <span className="text-sm font-semibold text-[#222222] line-clamp-1">{getGuestLabel()}</span>
                                    </div>
                                    <ChevronDown className={`w-5 h-5 transition-transform text-[#222222] ${isGuestOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {isGuestOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.98, y: -10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.98, y: -10 }}
                                            className="absolute top-full left-[-1px] right-[-1px] bg-white border border-[#dddddd] rounded-b-xl shadow-2xl z-50 p-6 space-y-6 -mt-1"
                                        >
                                            <div className="space-y-6">
                                                <GuestRow
                                                    label="Adultos"
                                                    sub="Edad: 13 o más"
                                                    count={guestCounts.adults}
                                                    onUpdate={(d) => setGuestCounts(p => ({ ...p, adults: Math.max(1, p.adults + d) }))}
                                                    min={1}
                                                />
                                                <GuestRow
                                                    label="Niños"
                                                    sub="De 2 a 12 años"
                                                    count={guestCounts.children}
                                                    onUpdate={(d) => setGuestCounts(p => ({ ...p, children: Math.max(0, p.children + d) }))}
                                                />
                                                <GuestRow
                                                    label="Bebés"
                                                    sub="Menos de 2 años"
                                                    count={guestCounts.infants}
                                                    onUpdate={(d) => setGuestCounts(p => ({ ...p, infants: Math.max(0, p.infants + d) }))}
                                                />
                                                <GuestRow
                                                    label="Mascotas"
                                                    sub="¿Traes a un animal de servicio?"
                                                    count={guestCounts.pets}
                                                    onUpdate={(d) => setGuestCounts(p => ({ ...p, pets: Math.max(0, p.pets + d) }))}
                                                />
                                            </div>

                                            <div className="pt-4 border-t border-[#ebebeb]">
                                                <p className="text-[13px] text-[#222222] leading-[18px]">
                                                    Este alojamiento tiene una capacidad máxima de 3 huéspedes, sin incluir bebés. Si vienes con más de 2 mascotas, avísale al anfitrión.
                                                </p>
                                            </div>

                                            <div className="flex justify-end">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsGuestOpen(false);
                                                    }}
                                                    className="font-bold text-[#222222] underline py-2 hover:bg-gray-50 px-4 rounded-lg transition-colors text-base"
                                                >
                                                    Cerrar
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}

                {currentStep === 'INFO' && (
                    <motion.div
                        key="step-info"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <button onClick={() => setCurrentStep('DATES')} className="mb-6 flex items-center gap-2 text-sm font-bold text-[#222222] hover:opacity-70 transition-opacity">
                            <ChevronLeft className="w-4 h-4" /> Volver
                        </button>
                        <h2 className="text-2xl font-bold text-[#222222] mb-8">Tus Datos</h2>

                        <div className="space-y-4 mb-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-[#222222] mb-1 tracking-tight">Nombre</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 bg-white border border-[#b0b0b0] rounded-xl outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                                        value={guestInfo.firstName}
                                        onChange={e => setGuestInfo(p => ({ ...p, firstName: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-[#222222] mb-1 tracking-tight">Apellido</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 bg-white border border-[#b0b0b0] rounded-xl outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                                        value={guestInfo.lastName}
                                        onChange={e => setGuestInfo(p => ({ ...p, lastName: e.target.value }))}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-[#222222] mb-1 tracking-tight">Correo Electrónico</label>
                                <input
                                    type="email"
                                    className="w-full p-3 bg-white border border-[#b0b0b0] rounded-xl outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                                    value={guestInfo.email}
                                    onChange={e => setGuestInfo(p => ({ ...p, email: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-[#222222] mb-1 tracking-tight">Teléfono</label>
                                <input
                                    type="tel"
                                    className="w-full p-3 bg-white border border-[#b0b0b0] rounded-xl outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                                    value={guestInfo.phone}
                                    onChange={e => setGuestInfo(p => ({ ...p, phone: e.target.value }))}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}

                {currentStep === 'SUMMARY' && (
                    <motion.div
                        key="step-summary"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <button onClick={() => setCurrentStep('INFO')} className="mb-6 flex items-center gap-2 text-sm font-bold text-[#222222] hover:opacity-70 transition-opacity">
                            <ChevronLeft className="w-4 h-4" /> Editar información
                        </button>
                        <h2 className="text-2xl font-bold text-[#222222] mb-8">Revisa tu Reserva</h2>

                        <div className="bg-[#f7f7f7] rounded-2xl p-6 mb-8 border border-[#ebebeb]">
                            <div className="flex justify-between items-start pb-4 border-b border-[#dddddd] mb-4">
                                <div>
                                    <p className="text-[10px] font-bold uppercase text-[#222222] mb-1 tracking-tight">Fechas</p>
                                    <p className="text-sm font-bold text-[#222222]">{formatDateShort(checkIn)} - {formatDateShort(checkOut)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold uppercase text-[#222222] mb-1 tracking-tight">Huéspedes</p>
                                    <p className="text-sm font-bold text-[#222222]">{getGuestLabel()}</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-base text-[#222222]">
                                    <span className="underline">${pricePerNight.toLocaleString()} COP x {nights} noches</span>
                                    <span>${totalBasePrice.toLocaleString()} COP</span>
                                </div>
                                <div className="flex justify-between text-base text-[#222222]">
                                    <span className="underline">Tarifa de servicio</span>
                                    <span>$0 COP</span>
                                </div>
                                <div className="flex justify-between pt-3 border-t border-[#dddddd] font-bold text-lg text-[#222222]">
                                    <span>Total</span>
                                    <span>${totalBasePrice.toLocaleString()} COP</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-xs font-semibold">
                    {error}
                </div>
            )}

            <button
                onClick={handleReserva}
                disabled={isSubmitting || (currentStep === 'DATES' && nights === 0)}
                className={`w-full py-4 bg-[#E31C5F] hover:bg-[#D70466] text-white font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg uppercase tracking-tight`}
            >
                {isSubmitting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full" />
                ) : (
                    <>
                        {currentStep === 'DATES' ? 'Reserva' :
                            currentStep === 'INFO' ? 'Continuar' : 'Confirmar Reserva'}
                        <span className="text-xl">→</span>
                    </>
                )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-[#222222] text-sm">
                <span className="text-[#717171]">{t('booking.help')}</span>
                <a
                    href="tel:+573196588185"
                    className="font-bold underline hover:opacity-70 transition-opacity flex items-center gap-1.5"
                >
                    <Phone className="w-3.5 h-3.5" />
                    +57 319 658 8185
                </a>
            </div>

            {currentStep === 'DATES' && (
                <div className="mt-6">
                    {nights > 0 && (
                        <div className="space-y-4 mt-8 pt-6 border-t border-[#ebebeb]">
                            <div className="flex justify-between text-base text-[#222222]">
                                <span className="underline">${pricePerNight.toLocaleString()} COP x {nights} noches</span>
                                <span>${totalBasePrice.toLocaleString()} COP</span>
                            </div>
                            <div className="flex justify-between text-base text-[#222222]">
                                <span className="underline">Tarifa de servicio</span>
                                <span>$0 COP</span>
                            </div>
                            <div className="flex justify-between pt-4 border-t border-[#ebebeb] font-bold text-lg text-[#222222]">
                                <span>Total</span>
                                <span>${totalBasePrice.toLocaleString()} COP</span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <AnimatePresence>
                {isCalendarOpen && (
                    <motion.div
                        ref={calendarRef}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed inset-x-4 top-[10%] bottom-[10%] lg:absolute lg:top-[-40px] lg:bottom-auto lg:right-[-20px] lg:inset-x-auto bg-white border border-[#dddddd] rounded-[2rem] shadow-[0_32px_64px_rgba(0,0,0,0.25)] z-[9999] p-8 w-auto lg:w-[850px] max-h-[90vh] overflow-y-auto"
                    >
                        {/* Calendar content */}
                        <div className="flex flex-col lg:flex-row justify-between mb-8 gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-[#1a3c34]">{nights} {nights === 1 ? 'noche' : 'noches'} en Fredonia</h2>
                                <p className="text-sm text-slate-500">{formatDateShort(checkIn)} - {formatDateShort(checkOut)}</p>
                            </div>
                            <div className="flex items-center bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                                <div className={`px-4 py-2 cursor-pointer rounded-lg transition-all ${selecting === 'checkIn' ? 'bg-white shadow-sm ring-1 ring-black/5' : ''}`} onClick={() => setSelecting('checkIn')}>
                                    <span className="block text-[9px] font-bold uppercase text-slate-400">Llegada</span>
                                    <span className="font-bold text-xs">{formatDateShort(checkIn)}</span>
                                </div>
                                <div className={`px-4 py-2 cursor-pointer rounded-lg transition-all ${selecting === 'checkOut' ? 'bg-white shadow-sm ring-1 ring-black/5' : ''}`} onClick={() => setSelecting('checkOut')}>
                                    <span className="block text-[9px] font-bold uppercase text-slate-400">Salida</span>
                                    <span className="font-bold text-xs">{formatDateShort(checkOut)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute top-0 left-0 right-0 flex justify-between items-center pointer-events-none px-2 z-20">
                                <button onClick={() => setViewMonth(prev => prev - 1)} className="p-3 bg-white hover:bg-slate-50 shadow-md rounded-full pointer-events-auto border border-slate-100 transition-all"><ChevronLeft className="w-5 h-5" /></button>
                                <button onClick={() => setViewMonth(prev => prev + 1)} className="p-3 bg-white hover:bg-slate-50 shadow-md rounded-full pointer-events-auto border border-slate-100 transition-all"><ChevronRight className="w-5 h-5" /></button>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 overflow-hidden">
                                <CalendarMonth month={viewMonth} year={2026} onDateSelect={handleDateClick} checkIn={checkIn} checkOut={checkOut} isDateOccupied={isDateOccupied} language={language} />
                                <CalendarMonth month={viewMonth + 1} year={2026} onDateSelect={handleDateClick} checkIn={checkIn} checkOut={checkOut} isDateOccupied={isDateOccupied} language={language} />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-slate-100 gap-4">
                            <div className="flex gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded border border-slate-200" />
                                    <span className="text-[10px] font-bold uppercase text-slate-400">Disponible</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                                        <div className="w-full h-[1px] bg-slate-200 rotate-45" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase text-slate-300">Ocupado</span>
                                </div>
                            </div>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <button onClick={() => { setCheckIn(new Date()); setCheckOut(new Date(Date.now() + 86400000)); }} className="flex-1 sm:flex-none text-xs font-bold underline px-4 py-2">Borrar todo</button>
                                <button onClick={() => setIsCalendarOpen(false)} className="flex-1 sm:flex-none bg-[#1a3c34] text-white px-8 py-2.5 rounded-lg font-bold text-sm">Cerrar</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
}

function GuestRow({ label, sub, count, onUpdate, min = 0 }: { label: string, sub: string, count: number, onUpdate: (d: number) => void, min?: number }) {
    return (
        <div className="flex items-center justify-between py-2">
            <div>
                <p className="font-bold text-[#222222] text-base">{label}</p>
                <p className="text-sm text-[#717171]">{sub}</p>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={(e) => { e.stopPropagation(); onUpdate(-1); }}
                    disabled={count <= min}
                    className="w-8 h-8 rounded-full border border-[#b0b0b0] flex items-center justify-center hover:border-[#222222] transition-colors disabled:opacity-10 disabled:cursor-not-allowed"
                >
                    <Minus className="w-4 h-4 text-[#717171]" />
                </button>
                <span className="w-4 text-center text-[#222222] font-medium text-base tabular-nums">{count}</span>
                <button
                    onClick={(e) => { e.stopPropagation(); onUpdate(1); }}
                    className="w-8 h-8 rounded-full border border-[#b0b0b0] flex items-center justify-center hover:border-[#222222] transition-colors"
                >
                    <Plus className="w-4 h-4 text-[#717171]" />
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

    const dayLabels = language === 'es' ? ['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'] : ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
    const monthName = new Date(year, month).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { month: 'long', year: 'numeric' });

    return (
        <div className="flex-1 min-w-[300px]">
            <h3 className="font-bold mb-6 text-center capitalize text-base text-[#1a3c34]">{monthName}</h3>
            <div className="grid grid-cols-7 gap-y-1 text-center text-[10px] mb-4 font-bold text-slate-400">
                {dayLabels.map((l, idx) => <span key={`${l}-${idx}`}>{l}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-y-1 relative">
                {days.map((date, i) => {
                    if (!date) return <div key={`empty-${i}`} className="h-10 w-10 md:h-12 md:w-12" />;

                    const isCheckIn = date.getTime() === checkIn.getTime();
                    const isCheckOut = date.getTime() === checkOut.getTime();
                    const isSelected = isCheckIn || isCheckOut;
                    const isInRange = date > checkIn && date < checkOut;
                    const isPast = date < today;
                    const isOccupied = isDateOccupied(date);

                    return (
                        <div key={date.getTime()} className={`relative h-10 md:h-12 flex items-center justify-center ${isInRange ? 'bg-slate-50' : ''} ${isCheckIn && checkOut > checkIn ? 'rounded-l-full bg-slate-50' : ''} ${isCheckOut ? 'rounded-r-full bg-slate-50' : ''}`}>
                            <button
                                disabled={isPast || isOccupied}
                                onClick={() => onDateSelect(date)}
                                className={`
                                    h-9 w-9 md:h-10 md:w-10 flex items-center justify-center rounded-full text-xs transition-all z-10 font-bold tabular-nums
                                    ${isSelected ? 'bg-[#222222] text-white' : ''}
                                    ${isOccupied ? 'text-slate-200 cursor-not-allowed line-through' : ''}
                                    ${!isSelected && !isOccupied ? 'hover:border hover:border-black' : ''}
                                    ${isPast ? 'text-slate-100 cursor-not-allowed line-through' : (isOccupied ? 'text-slate-200' : 'text-slate-700')}
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
