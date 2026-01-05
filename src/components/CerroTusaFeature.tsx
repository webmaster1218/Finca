"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function CerroTusaFeature() {
    const { t } = useLanguage();

    return (
        <section className="relative py-32 bg-[#1a3c34] overflow-hidden">
            {/* Decorative center line for classic feel */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Left Column: Text */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-left"
                >
                    <p className="text-[#9a7d45] font-serif tracking-[0.4em] text-xs mb-6 uppercase">{t('feature.tag')}</p>
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-10 leading-tight">
                        {t('feature.title').split('<br />').map((text, i) => (
                            <React.Fragment key={i}>
                                {text}
                                {i === 0 && <br />}
                            </React.Fragment>
                        ))}
                    </h2>

                    <div className="w-16 h-[1px] bg-[#9a7d45] mb-8" />

                    <p
                        className="text-white/80 text-xl mb-12 leading-relaxed font-serif max-w-lg"
                        dangerouslySetInnerHTML={{
                            __html: t('feature.desc').replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>')
                        }}
                    />

                    <a href="#finca" className="px-10 py-3 bg-white text-[#1a3c34] font-serif hover:bg-[#fdfaf6] transition-all inline-flex items-center gap-4 group border border-white/20 shadow-lg">
                        {t('feature.cta')} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </a>
                </motion.div>

                {/* Right Column: Image with Classic Frame */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative group col-span-1"
                >
                    {/* Decorative Frame Elements */}
                    <div className="absolute -top-6 -right-6 w-full h-full border border-[#9a7d45]/30 z-0" />
                    <div className="absolute -bottom-6 -left-6 w-full h-full border border-[#9a7d45]/30 z-0" />

                    <div className="relative z-10 bg-white p-4 shadow-2xl">
                        <div className="overflow-hidden">
                            <img
                                src="/imagenes/exterior/IMG_5476.webp"
                                alt={t('feature.title')}
                                className="w-full h-[500px] object-cover transition-transform duration-[2s] group-hover:scale-110"
                            />
                        </div>
                    </div>

                    {/* Caption over image or near it */}
                    <div className="absolute bottom-10 -right-4 z-20 bg-[#fdfaf6] p-6 shadow-xl border-l-4 border-[#9a7d45] max-w-[200px]">
                        <p className="font-serif text-[#1a3c34] text-sm">
                            {t('feature.caption')}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
