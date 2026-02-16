"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Clock, Mountain, X, Info, MapPin, Beer } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

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
    const { t } = useLanguage();
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
                            <img
                                src={tour.image}
                                alt={t(`tours.${tour.key}.title`)}
                                className="absolute inset-0 w-full h-full object-cover opacity-80"
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
