"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus, X, Keyboard, ChevronLeft, ChevronRight } from "lucide-react";

interface GuestCounts {
    adults: number;
    children: number;
    infants: number;
    pets: number;
}

export function BookingCard() {
    const [isGuestOpen, setIsGuestOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [guestCounts, setGuestCounts] = useState<GuestCounts>({
        adults: 1,
        children: 0,
        infants: 0,
        pets: 0
    });

    // Default dates: Feb 2, 2026 and Feb 5, 2026 (matching reference image)
    const [checkIn, setCheckIn] = useState<Date>(new Date(2026, 1, 2));
    const [checkOut, setCheckOut] = useState<Date>(new Date(2026, 1, 5));
    const [selecting, setSelecting] = useState<'checkIn' | 'checkOut'>('checkIn');

    const dropdownRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    const nights = Math.max(0, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
    const pricePerNight = 2800000;
    const totalBasePrice = nights > 0 ? nights * pricePerNight : 0;

    const totalGuests = guestCounts.adults + guestCounts.children;
    const guestLabel = `${totalGuests} huésped${totalGuests > 1 ? "s" : ""}${guestCounts.infants > 0 ? `, ${guestCounts.infants} bebé${guestCounts.infants > 1 ? "s" : ""}` : ""}${guestCounts.pets > 0 ? `, ${guestCounts.pets} mascota${guestCounts.pets > 1 ? "s" : ""}` : ""}`;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsGuestOpen(false);
            }
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                // Keep it open if clicking inside the popover handled by Framer Motion / container
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
        return date.toLocaleDateString('es-ES', options).replace('.', '');
    };

    const handleDateClick = (date: Date) => {
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

    const [viewMonth, setViewMonth] = useState(1); // Default to February as in image

    return (
        <div className="bg-white rounded-xl shadow-[0_6px_16px_rgba(0,0,0,0.12)] border border-[#dddddd] p-6 w-full max-w-[400px] mx-auto sticky top-24">
            <div className="flex items-baseline justify-between mb-6">
                <div>
                    <span className="text-2xl font-bold text-[#222222]">$2.800.000 COP</span>
                    <span className="text-[#222222] ml-1">noche</span>
                </div>
            </div>

            <div className="border border-[#b0b0b0] rounded-lg overflow-visible mb-4 relative">
                <div className="grid grid-cols-2 border-b border-[#b0b0b0]">
                    <button
                        onClick={() => { setIsCalendarOpen(true); setSelecting('checkIn'); setIsGuestOpen(false); }}
                        className={`p-3 text-left hover:bg-gray-50 transition-colors border-r border-[#b0b0b0] ${selecting === 'checkIn' && isCalendarOpen ? 'ring-2 ring-black ring-inset z-10' : ''}`}
                    >
                        <span className="block text-[10px] font-bold uppercase text-[#222222]">Llegada</span>
                        <span className="text-sm text-[#222222]">{formatDateShort(checkIn)}</span>
                    </button>
                    <button
                        onClick={() => { setIsCalendarOpen(true); setSelecting('checkOut'); setIsGuestOpen(false); }}
                        className={`p-3 text-left hover:bg-gray-50 transition-colors ${selecting === 'checkOut' && isCalendarOpen ? 'ring-2 ring-black ring-inset z-10' : ''}`}
                    >
                        <span className="block text-[10px] font-bold uppercase text-[#222222]">Salida</span>
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
                                    <h2 className="text-2xl font-semibold mb-1">{nights} noches</h2>
                                    <p className="text-sm text-[#717171]">{formatDateLong(checkIn)} - {formatDateLong(checkOut)}</p>
                                </div>
                                <div className="mt-4 md:mt-0 flex border border-black rounded-xl overflow-hidden self-start">
                                    <div className={`p-2 px-4 border-r border-[#dddddd] flex flex-col ${selecting === 'checkIn' ? 'bg-white ring-2 ring-black' : 'bg-gray-100'}`}>
                                        <span className="text-[10px] font-bold uppercase">Llegada</span>
                                        <span className="text-sm font-semibold">{formatDateShort(checkIn)}</span>
                                    </div>
                                    <div className={`p-2 px-4 flex flex-col ${selecting === 'checkOut' ? 'bg-white ring-2 ring-black' : 'bg-gray-100'}`}>
                                        <span className="text-[10px] font-bold uppercase">Salida</span>
                                        <span className="text-sm font-semibold">{formatDateShort(checkOut)}</span>
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
                                    />
                                    <CalendarMonth
                                        month={viewMonth + 1}
                                        year={2026}
                                        onDateSelect={handleDateClick}
                                        checkIn={checkIn}
                                        checkOut={checkOut}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-8 pt-4 border-t border-[#f0f0f0]">
                                <button className="p-2 hover:bg-gray-100 rounded-full">
                                    <Keyboard className="w-5 h-5" />
                                </button>
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
                                        Borrar fechas
                                    </button>
                                    <button
                                        onClick={() => setIsCalendarOpen(false)}
                                        className="bg-[#222222] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-black transition-colors"
                                    >
                                        Cierra
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
                            <span className="block text-[10px] font-bold uppercase text-[#222222]">Huéspedes</span>
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
                                    label="Adultos"
                                    sub="Edad 13 o más"
                                    count={guestCounts.adults}
                                    onUpdate={(d) => updateCount('adults', d)}
                                    min={1}
                                />
                                <GuestRow
                                    label="Niños"
                                    sub="De 2 a 12 años"
                                    count={guestCounts.children}
                                    onUpdate={(d) => updateCount('children', d)}
                                />
                                <GuestRow
                                    label="Bebés"
                                    sub="Menos de 2 años"
                                    count={guestCounts.infants}
                                    onUpdate={(d) => updateCount('infants', d)}
                                />
                                <GuestRow
                                    label="Mascotas"
                                    sub="¿Traes un animal de servicio?"
                                    count={guestCounts.pets}
                                    onUpdate={(d) => updateCount('pets', d)}
                                />
                                <p className="text-[12px] text-[#717171] leading-tight">
                                    Este alojamiento tiene una capacidad máxima de 16 huéspedes, sin contar bebés.
                                </p>
                                <div className="flex justify-end pt-2">
                                    <button
                                        onClick={() => setIsGuestOpen(false)}
                                        className="text-sm font-semibold underline hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <button
                onClick={() => {
                    const message = `Hola! Quiero reservar la finca.\nLlegada: ${formatDateShort(checkIn)}\nSalida: ${formatDateShort(checkOut)}\nHuéspedes: ${totalGuests}`;
                    window.open(`https://wa.me/573210000000?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="w-full py-3.5 bg-[#E31C5F] hover:bg-[#D70466] text-white font-semibold rounded-lg transition-colors mb-4 text-lg"
            >
                Reserva
            </button>

            <p className="text-center text-[#222222] text-sm mb-4">No se hará ningún cargo por el momento</p>

            <div className="space-y-3 pt-4 border-t border-[#dddddd]">
                <div className="flex justify-between text-[#222222]">
                    <span className="underline">$2.800.000 COP x {nights} noche{nights > 1 ? 's' : ''}</span>
                    <span>${totalBasePrice.toLocaleString('es-CO')} COP</span>
                </div>
                <div className="flex justify-between text-[#222222]">
                    <span className="underline">Tarifa de servicio</span>
                    <span>$0 COP</span>
                </div>
                <div className="flex justify-between font-bold text-[#222222] pt-3 border-t border-[#f0f0f0]">
                    <span>Total</span>
                    <span>${totalBasePrice.toLocaleString('es-CO')} COP</span>
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

function CalendarMonth({ month, year, onDateSelect, checkIn, checkOut }: { month: number, year: number, onDateSelect: (d: Date) => void, checkIn: Date, checkOut: Date }) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < startOffset; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));

    const dayLabels = ['L', 'Ma', 'Mi', 'J', 'V', 'S', 'D'];
    const monthName = new Date(year, month).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

    return (
        <div className="flex-1 min-w-[300px]">
            <h3 className="font-bold mb-6 text-center capitalize">{monthName}</h3>
            <div className="grid grid-cols-7 gap-y-1 text-center text-xs mb-4">
                {dayLabels.map(l => <span key={l} className="text-[#717171] font-bold">{l}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-y-1 relative">
                {days.map((date, i) => {
                    if (!date) return <div key={`empty-${i}`} className="h-12 w-12" />;

                    const isCheckIn = date.getTime() === checkIn.getTime();
                    const isCheckOut = date.getTime() === checkOut.getTime();
                    const isSelected = isCheckIn || isCheckOut;
                    const isInRange = date > checkIn && date < checkOut;
                    const isPast = date < today;

                    return (
                        <div key={date.getTime()} className={`relative h-12 flex items-center justify-center ${isInRange ? 'bg-[#f7f7f7]' : ''} ${isCheckIn && checkOut > checkIn ? 'rounded-l-full bg-gradient-to-r from-transparent to-[#f7f7f7]' : ''} ${isCheckOut ? 'rounded-r-full bg-gradient-to-l from-transparent to-[#f7f7f7]' : ''}`}>
                            <button
                                disabled={isPast}
                                onClick={() => onDateSelect(date)}
                                className={`
                                    h-11 w-11 flex items-center justify-center rounded-full text-sm transition-all z-10 font-medium
                                    ${isSelected ? 'bg-[#222222] text-white shadow-lg' : 'hover:border hover:border-black'}
                                    ${isPast ? 'text-[#ebebeb] cursor-not-allowed line-through' : 'text-[#222222]'}
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
