"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const experiences = [
    {
        key: "suites",
        image: "/imagenes/habitaciones/IMG_5181.webp"
    },
    {
        key: "eco",
        image: "/imagenes/exterior/IMG_5111.webp"
    },
    {
        key: "relax",
        image: "/imagenes/habitaciones/IMG_5609.webp"
    },
    {
        key: "events",
        image: "/imagenes/exterior/IMG_5132.webp"
    },
    {
        key: "diamond",
        image: "/imagenes/espacios/IMG_9329.webp"
    },
];

export function Experiences() {
    const { t } = useLanguage();

    return (
        <section id="experiencias" className="py-24 md:py-32 px-6 relative overflow-hidden group/section">
            {/* Background Image for the whole section */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url("/imagenes/espacios/IMG_52231.webp")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            />
            {/* Dynamic Overlays for Readability and Depth */}
            <div className="absolute inset-0 bg-[#1a3c34]/60 z-[1]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-white font-serif tracking-[0.4em] text-xs mb-6 uppercase shadow-sm"
                    >
                        {t('exp.tag')}
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-serif text-white mb-8 drop-shadow-lg"
                    >
                        {t('exp.title')}
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-[1px] bg-white/30" />
                        <div className="w-2 h-2 rotate-45 border border-white" />
                        <div className="w-12 h-[1px] bg-white/30" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="group relative h-[350px] md:h-[500px] overflow-hidden shadow-xl"
                        >
                            {/* Background Image */}
                            <img
                                src={exp.image}
                                alt={t(`exp.${exp.key}.title`)}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="absolute inset-x-0 bottom-0 p-8 text-center text-white">
                                <h3 className="text-2xl md:text-3xl font-serif mb-2 tracking-tight group-hover:mb-4 transition-all duration-500 underline underline-offset-8 decoration-[#9a7d45]/0 group-hover:decoration-[#9a7d45]">
                                    {t(`exp.${exp.key}.title`)}
                                </h3>
                                <p className="text-white/60 text-xs md:text-sm font-serif opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {t(`exp.${exp.key}.desc`)}
                                </p>
                            </div>

                            {/* Decorative Corner (Classic touch) */}
                            <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-[#9a7d45]/0 group-hover:border-[#9a7d45]/40 transition-all duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
