"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Immersive Background */}
            <div
                className="absolute inset-0 bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url("/imagenes/exterior/IMG_51203.webp")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto border-y border-white/20 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="flex items-center justify-center gap-2 mb-8"
                >
                    <span className="text-white/80 font-serif tracking-[0.2em] text-sm uppercase">
                        {t('hero.location')}
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="text-5xl md:text-8xl font-serif text-white mb-8 tracking-normal leading-tight"
                >
                    {t('hero.title_part1')} <br />
                    <span className="font-normal text-white/90">{t('hero.title_part2')}</span>
                </motion.h1>

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "80px" }}
                    transition={{ duration: 1, delay: 1 }}
                    className="h-[1px] bg-[#9a7d45] mx-auto mb-10"
                />

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="text-lg md:text-xl text-white/90 mb-12 max-w-xl mx-auto font-serif leading-relaxed"
                >
                    {t('hero.subtitle_long')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="flex justify-center"
                >
                    <a
                        href="#experiencias"
                        className="px-10 py-3 bg-white text-[#1a3c34] rounded-none font-serif tracking-wide transition-all duration-300 hover:bg-[#fdfaf6] border border-white/30 shadow-xl flex items-center gap-3"
                    >
                        {t('hero.cta')}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
