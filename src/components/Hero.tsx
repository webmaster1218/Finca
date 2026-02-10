"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import Image from "next/image";

interface HeroProps {
    mediaType?: "video" | "image";
    mediaUrl?: string;
    location?: string;
    titlePart1?: string;
    titlePart2?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
}

export function Hero({
    mediaType = "video",
    mediaUrl = "xl7Ywq7oR7E", // Default YouTube ID
    location,
    titlePart1,
    titlePart2,
    subtitle,
    ctaText,
    ctaLink = "#experiencias"
}: HeroProps) {
    const { t } = useLanguage();

    return (
        <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Immersive Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none bg-black">
                {mediaType === "video" ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${mediaUrl}?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&playsinline=1&start=5&end=37&vq=hd1080&playlist=${mediaUrl}&loop=1`}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115vw] h-[64.68vw] min-h-[115vh] min-w-[204.44vh] border-none opacity-80"
                        allow="autoplay; encrypted-media"
                    />
                ) : (
                    <Image
                        src={mediaUrl}
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-80"
                        priority
                        sizes="100vw"
                        quality={95}
                    />
                )}
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
                    {titlePart1 || t('hero.title_part1')} <br />
                    <span className="font-normal text-[#fffbf0]/90">{titlePart2 || t('hero.title_part2')}</span>
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
                    {subtitle || t('hero.subtitle_long')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="flex justify-center"
                >
                    <a
                        href={ctaLink}
                        className="px-10 py-3 bg-[#fffbf0] text-[#6f7c4e] rounded-none font-serif tracking-wide transition-all duration-300 hover:bg-[#fffbf0] border border-[#fffbf0]/30 shadow-xl flex items-center gap-3"
                    >
                        {ctaText || t('hero.cta')}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}


