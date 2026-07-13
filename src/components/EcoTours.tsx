"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Clock, Mountain, X, Info, MapPin, Beer } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import Image from "next/image";
import Link from "next/link";

const tours = [
    {
        key: "cerrotusa",
        image: "/eco tours/SaveClip.App_522169608_18051317933624494_6236629626133625721_n.jpg",
        icon: <Mountain className="w-5 h-5" />
    },
    {
        key: "bees",
        image: "/eco tours/abejas.jpg",
        icon: <Info className="w-5 h-5" />
    },
    {
        key: "town",
        image: "/eco tours/SaveClip.App_521930582_18051317924624494_1633705148474644517_n.jpg",
        icon: <MapPin className="w-5 h-5" />
    }
];

export function EcoTours() {
    const { t, language } = useLanguage();
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <section id="tours" className="py-24 md:py-32 bg-[#fffbf0] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#9a7d45] font-serif tracking-[0.4em] text-xs mb-6 uppercase"
                    >
                        {t('tours.tag')}
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-serif text-brand-green mb-8"
                    >
                        {t('tours.title')}
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "48px" }}
                            className="h-[1px] bg-[#9a7d45]/40"
                        />
                        <div className="w-2 h-2 rotate-45 border border-[#9a7d45]/60" />
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "48px" }}
                            className="h-[1px] bg-[#9a7d45]/40"
                        />
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto text-slate-800 font-serif italic text-lg leading-relaxed"
                    >
                        {t('tours.subtitle')}
                    </motion.p>
                </div>

                {/* Premium All-Inclusive Tours */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-5xl font-serif text-brand-green mb-4">
                            {t('tours.premium.sec_title')}
                        </h3>
                        <p className="max-w-2xl mx-auto text-slate-700 font-serif italic text-sm">
                            {t('tours.premium.sec_subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Plan 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="group relative h-[480px] overflow-hidden shadow-2xl bg-brand-green cursor-pointer"
                        >
                            <Image
                                src="/eco tours/SaveClip.App_522169608_18051317933624494_6236629626133625721_n.jpg"
                                alt={t('tours.ascenso.title')}
                                fill
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent opacity-95" />
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-brand-cream">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-[1px] bg-brand-cream/50" />
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-serif text-[#9a7d45]">{t('tours.ascenso.duration')}</span>
                                </div>
                                <h4 className="text-3xl font-serif mb-2">{t('tours.ascenso.title')}</h4>
                                <p className="text-brand-cream/70 font-serif italic text-xs mb-4 line-clamp-2">
                                    {t('tours.ascenso.tagline')}
                                </p>
                                <div className="flex justify-between items-center pt-4 border-t border-brand-cream/10">
                                    <span className="text-xs text-brand-cream/60">{t('tours.ascenso.capacity')}</span>
                                    <span className="text-sm font-bold text-[#9a7d45]">{t('tours.ascenso.price_info')}</span>
                                </div>
                                <Link href="/tours/ascenso-sagrado" className="absolute inset-0 z-10" />
                            </div>
                            <div className="absolute inset-4 border border-[#9a7d45]/20 pointer-events-none" />
                        </motion.div>

                        {/* Plan 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="group relative h-[480px] overflow-hidden shadow-2xl bg-brand-green cursor-pointer"
                        >
                            <Image
                                src="/imagenes/experiences/IMG_5111.webp"
                                alt={t('tours.diosa.title')}
                                fill
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent opacity-95" />
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-brand-cream">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-[1px] bg-brand-cream/50" />
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-serif text-[#9a7d45]">{t('tours.diosa.duration')}</span>
                                </div>
                                <h4 className="text-3xl font-serif mb-2">{t('tours.diosa.title')}</h4>
                                <p className="text-brand-cream/70 font-serif italic text-xs mb-4 line-clamp-2">
                                    {t('tours.diosa.tagline')}
                                </p>
                                <div className="flex justify-between items-center pt-4 border-t border-brand-cream/10">
                                    <span className="text-xs text-brand-cream/60">{t('tours.diosa.capacity')}</span>
                                    <span className="text-sm font-bold text-[#9a7d45]">{t('tours.diosa.price_info')}</span>
                                </div>
                                <Link href="/tours/retiro-diosa-espejo" className="absolute inset-0 z-10" />
                            </div>
                            <div className="absolute inset-4 border border-[#9a7d45]/20 pointer-events-none" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Local Experiences Section with unique background */}
            <div className="bg-[#6f7c4e] py-24 relative z-10">
                {/* Elegant background accents matching Testimonials */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#9a7d45]/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* Local Experiences Header */}
                    <div className="text-center mb-16">
                        <h3 className="text-2xl md:text-4xl font-serif text-[#fffbf0] uppercase tracking-wider">
                            {language === 'es' ? 'Actividades Locales Adicionales' : 'Additional Local Activities'}
                        </h3>
                        <div className="w-16 h-[1px] bg-[#fffbf0]/40 mx-auto mt-4" />
                    </div>

                    {/* Tours Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {tours.map((tour, i) => (
                            <motion.div
                                key={tour.key}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.8 }}
                                className="group relative h-[550px] overflow-hidden shadow-2xl bg-brand-green"
                            >
                                {/* Background Image */}
                                <Image
                                    src={tour.image}
                                    alt={t(`tours.${tour.key}.title`)}
                                    fill
                                    loading="lazy"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover opacity-80"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90" />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end text-brand-cream">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-[1px] bg-brand-cream/50" />
                                        <span className="text-[10px] uppercase tracking-[0.3em] font-serif">{t(`tours.${tour.key}.level`)}</span>
                                    </div>

                                    <h3 className="text-3xl font-serif mb-4">
                                        {t(`tours.${tour.key}.title`)}
                                    </h3>

                                    <p className="text-brand-cream/80 font-serif italic text-sm mb-6">
                                        {t(`tours.${tour.key}.desc`)}
                                    </p>

                                    <div className="grid grid-cols-1 gap-4 pt-6 border-t border-brand-cream/10">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-[#9a7d45]" />
                                            <span className="text-xs font-serif italic text-brand-cream/60">{t(`tours.${tour.key}.duration`)}</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="text-[#9a7d45] shrink-0 mt-0.5">{tour.icon}</div>
                                            <p className="text-[10px] text-brand-cream/60 uppercase tracking-widest leading-relaxed">
                                                {t(`tours.${tour.key}.details`)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative border */}
                                <div className="absolute inset-4 border border-[#9a7d45]/20 pointer-events-none" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer Action */}
                    <div className="flex justify-center">
                        <motion.button
                            onClick={() => setIsVideoOpen(true)}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="flex items-center gap-3 px-8 py-4 bg-brand-accent text-brand-cream rounded-none font-serif italic hover:opacity-90 transition-all border border-[#9a7d45]/30 group shadow-xl"
                        >
                            <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                            {t('tours.video')}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
                    >
                        <button
                            onClick={() => setIsVideoOpen(false)}
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="w-full max-w-5xl aspect-video bg-black shadow-2xl relative">
                            <video
                                controls
                                autoPlay
                                className="w-full h-full object-contain"
                            >
                                <source src="/VIDEO_AL_PARCHE.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
