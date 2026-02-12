"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import Image from "next/image";

interface HeroGalleryProps {
    mediaUrl: string;
    location?: string;
    titlePart1?: string;
    titlePart2?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
}

export function HeroGallery({
    mediaUrl,
    location,
    titlePart1,
    titlePart2,
    subtitle,
    ctaText,
    ctaLink = "#galeria-grid"
}: HeroGalleryProps) {
    const { t } = useLanguage();

    return (
        <section id="hero-gallery" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Immersive Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none bg-black">
                <Image
                    src={mediaUrl}
                    alt="Hero Background"
                    fill
                    className="object-cover opacity-80"
                    priority
                    sizes="100vw"
                    quality={90}
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto border-y border-[#fffbf0]/20 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="flex items-center justify-center gap-2 mb-8"
                >
                    <span className="text-[#fffbf0]/80 font-serif tracking-[0.2em] text-sm uppercase">
                        {location || t('hero.location')}
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="text-5xl md:text-8xl font-serif text-[#fffbf0] mb-8 tracking-normal leading-tight"
                >
                    {titlePart1} <br />
                    <span className="font-normal text-[#fffbf0]/90">{titlePart2}</span>
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
                    className="text-lg md:text-xl text-[#fffbf0]/90 mb-12 max-w-xl mx-auto font-serif leading-relaxed"
                >
                    {subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="flex justify-center"
                >
                    <a
                        href={ctaLink}
                        className="px-10 py-3 bg-[#fffbf0] text-[#6f7c4e] rounded-none font-serif tracking-wide transition-all duration-300 hover:bg-white border border-[#fffbf0]/30 shadow-xl flex items-center gap-3"
                    >
                        {ctaText || t('hero.cta')}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
