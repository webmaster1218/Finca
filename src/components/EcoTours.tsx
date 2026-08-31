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
                                <a
                                    href="https://wa.me/573021025621?text=Hola%20La%20Juana%2C%20me%20interesa%20el%20plan%20El%20Ascenso%20Sagrado%20%28Day%20Tour%20Premium%29.%20%C2%BFMe%20pueden%20dar%20informaci%C3%B3n%3F"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 px-6 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-serif italic tracking-wide transition-all shadow-md flex items-center justify-center gap-2 border border-emerald-400/30 w-full"
                                >
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    <span>Reservar por WhatsApp</span>
                                </a>
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
                                <a
                                    href="https://wa.me/573021025621?text=Hola%20La%20Juana%2C%20me%20interesa%20el%20plan%20El%20Retiro%20de%20la%20Diosa%20del%20Espejo%20%282D%2F1N%29.%20%C2%BFMe%20pueden%20dar%20informaci%C3%B3n%3F"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 px-6 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-serif italic tracking-wide transition-all shadow-md flex items-center justify-center gap-2 border border-emerald-400/30 w-full"
                                >
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    <span>Reservar por WhatsApp</span>
                                </a>
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
                                        <a
                                            href={`https://wa.me/573021025621?text=Hola%20La%20Juana%2C%20me%20interesa%20obtener%20informaci%C3%B3n%20sobre%20el%20${encodeURIComponent(t(`tours.${tour.key}.title`))}.`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 px-4 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-serif italic tracking-wide transition-all shadow-md flex items-center justify-center gap-2 border border-emerald-400/30 w-full z-10"
                                        >
                                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                            <span>Consultar Actividad</span>
                                        </a>
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
