"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Location() {
    const { t } = useLanguage();

    return (
        <section id="ubicacion" className="py-24 md:py-32 px-6 relative overflow-hidden">
            {/* Background Image for the whole section */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url("/imagenes/location/IMG_9324.webp")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            />
            {/* Dynamic Overlays for Readability and Depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 z-[1]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 text-white">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[#9a7d45] font-serif tracking-[0.4em] text-xs mb-6 uppercase"
                    >
                        {t('location.tag')}
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-serif text-white mb-8"
                    >
                        {t('location.title')}
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-[1px] bg-[#9a7d45]/30" />
                        <div className="w-2 h-2 rotate-45 border border-[#9a7d45]" />
                        <div className="w-12 h-[1px] bg-[#9a7d45]/30" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Info Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="lg:col-span-4 space-y-8 order-2 lg:order-1"
                    >
                        <div className="p-10 bg-white shadow-2xl border-l-4 border-[#9a7d45] relative overflow-hidden text-[#1a3c34]">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-serif text-[#1a3c34] mb-6">{t('location.visit')}</h3>
                                <div className="space-y-6 text-[#1a3c34]/80 font-serif">
                                    <div className="flex gap-4">
                                        <MapPin className="w-6 h-6 text-[#9a7d45] shrink-0" />
                                        <div>
                                            <p className="font-bold text-[#1a3c34]">{t('location.address_label')}</p>
                                            <p>{t('hero.location')}</p>
                                            <p>{t('location.parcelacion')}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Navigation className="w-6 h-6 text-[#9a7d45] shrink-0" />
                                        <div>
                                            <p className="font-bold text-[#1a3c34]">{t('location.ref_label')}</p>
                                            <p className="text-sm">{t('location.ref_val')}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 pt-10 border-t border-stone-100">
                                    <a
                                        href="https://www.google.com/maps?q=Parcelacion+Rochiles+Venecia+Antioquia"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a3c34] text-white font-serif hover:bg-[#9a7d45] transition-all duration-500 group"
                                    >
                                        {t('location.google_btn')}
                                        <Navigation className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Map Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="lg:col-span-8 h-[450px] md:h-[600px] w-full shadow-2xl relative order-1 lg:order-2"
                    >
                        <iframe
                            src="https://maps.google.com/maps?q=Parcelacion%20Rochiles,%20Venecia,%20Antioquia&t=&z=16&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale-[20%] contrast-[1.1]"
                        />
                        {/* Decorative Overlay Frame */}
                        <div className="absolute inset-0 pointer-events-none border-[12px] border-[#1a3c34]/5" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
