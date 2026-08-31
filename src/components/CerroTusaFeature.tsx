"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import Image from "next/image";

export function CerroTusaFeature() {
    const { t } = useLanguage();

    return (
        <section className="relative py-32 bg-brand-green overflow-hidden">
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
                    <p className="text-[#fffbf0] font-serif tracking-[0.4em] text-xs mb-6 uppercase">{t('feature.tag')}</p>
                    <h2 className="text-4xl md:text-6xl font-serif text-brand-cream mb-10 leading-tight">
                        {t('feature.title').split('<br />').map((text, i) => (
                            <React.Fragment key={i}>
                                {text}
                                {i === 0 && <br />}
                            </React.Fragment>
                        ))}
                    </h2>

                    <div className="w-16 h-[1px] bg-[#9a7d45] mb-8" />

                    <p
                        className="text-[#fffbf0]/80 text-xl mb-12 leading-relaxed font-serif max-w-lg"
                        dangerouslySetInnerHTML={{
                            __html: t('feature.desc').replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>')
                        }}
                    />

                    <div className="flex flex-wrap items-center gap-4">
                        <a href="#finca" className="px-10 py-3 bg-[#fffbf0] text-[#6f7c4e] font-serif hover:bg-[#fffbf0] transition-all inline-flex items-center gap-4 group border border-[#fffbf0]/20 shadow-lg">
                            {t('feature.cta')} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </a>
                        <a
                            href="https://wa.me/573021025621?text=Hola%20La%20Juana%2C%20quisiera%20saber%20m%C3%A1s%20sobre%20la%20finca%20y%20la%20vista%20al%20Cerro%20Tusa."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-serif italic text-sm tracking-wide transition-all duration-300 shadow-lg inline-flex items-center gap-2.5 border border-emerald-400/30"
                        >
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            <span>WhatsApp</span>
                        </a>
                    </div>
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

                    <div className="relative z-10 bg-[#fffbf0] p-4 shadow-2xl">
                        <div className="overflow-hidden relative h-[500px]">
                            <Image
                                src="/imagenes/cerro-tusa/IMG_5476.webp"
                                alt="Vista panorámica al Cerro Tusa desde Finca La Juana"
                                fill
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                            />
                        </div>
                    </div>

                    {/* Caption over image or near it */}
                    <div className="absolute bottom-10 -right-4 z-20 bg-[#fffbf0] p-6 shadow-xl border-l-4 border-[#9a7d45] max-w-[200px]">
                        <p className="font-serif text-[#6f7c4e] text-sm">
                            {t('feature.caption')}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

