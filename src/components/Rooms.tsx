"use client";

import { motion } from "framer-motion";
import { User, Bed, Waves, Speaker, Bath, Home, Car, Droplets, Flame, Wifi } from "lucide-react";
import { BookingCard } from "./BookingCard";
import { useLanguage } from "@/context/LanguageContext";

export function Rooms() {
    const { t } = useLanguage();

    const specs = [
        { label: t('amenity.rooms'), icon: <Home className="w-5 h-5" /> },
        { label: t('amenity.beds'), icon: <Bed className="w-5 h-5" /> },
        { label: t('amenity.baths'), icon: <Bath className="w-5 h-5" /> },
        { label: t('amenity.people'), icon: <User className="w-5 h-5" /> },
        { label: t('amenity.pool'), icon: <Waves className="w-5 h-5" /> },
        { label: t('amenity.water'), icon: <Droplets className="w-5 h-5" /> },
        { label: t('amenity.parking'), icon: <Car className="w-5 h-5" /> },
        { label: t('amenity.firepit'), icon: <Flame className="w-5 h-5" /> },
        { label: t('amenity.wifi'), icon: <Wifi className="w-5 h-5" /> },
        { label: t('amenity.kiosk'), icon: <Home className="w-5 h-5" /> },
    ];

    return (
        <section id="habitaciones" className="relative min-h-screen flex items-center justify-center py-24 md:py-32 bg-[#fdfaf6] z-20">
            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                {/* Main Header */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#9a7d45] font-serif tracking-[0.4em] text-xs md:text-sm mb-6 uppercase"
                    >
                        {t('rooms.tag')}
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-serif text-[#1a3c34] mb-8"
                    >
                        {t('rooms.title')}
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100px" }}
                        className="h-[1px] bg-[#9a7d45] mx-auto"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Details and Amenities */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <h3
                                className="text-3xl md:text-5xl font-serif text-[#1a3c34] leading-tight"
                                dangerouslySetInnerHTML={{ __html: t('rooms.desc.title').replace('invonvidable', 'inolvidable').replace(/\n/g, '<br />') }}
                            />
                            <div className="w-16 h-[1px] bg-[#9a7d45]" />
                            <p
                                className="text-slate-600 leading-relaxed font-serif text-lg max-w-xl"
                                dangerouslySetInnerHTML={{ __html: t('rooms.staff') }}
                            />
                        </div>

                        {/* Amenities Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {specs.map((spec, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center gap-4 p-5 bg-white border border-[#9a7d45]/10 shadow-sm group transition-all duration-500 hover:border-[#9a7d45]/30 hover:shadow-md"
                                >
                                    <div className="text-[#9a7d45] transition-transform duration-500 group-hover:scale-110">
                                        {spec.icon}
                                    </div>
                                    <span className="text-[#1a3c34] font-serif text-xs md:text-sm tracking-wide">
                                        {spec.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Pricing and Conversion */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="w-full flex justify-center lg:justify-end"
                    >
                        <BookingCard />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
