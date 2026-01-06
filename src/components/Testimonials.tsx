"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const testimonials = [
    {
        name: "Familia Restrepo",
        location: "Medellín, CO",
        textKey: "testimonials.res1.text",
        rating: 5,
        image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: "Andrés Jaramillo",
        location: "Evento Corporativo",
        textKey: "testimonials.res2.text",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: "Mariana Velez",
        location: "Bogotá, CO",
        textKey: "testimonials.res3.text",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400"
    }
];

export function Testimonials() {
    const { t } = useLanguage();
    return (
        <section id="testimonios" className="py-24 md:py-32 px-6 bg-[#1a3c34] relative overflow-hidden">
            {/* Elegant background accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#9a7d45]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[#9a7d45] font-serif tracking-[0.4em] text-xs mb-6 uppercase"
                    >
                        {t('testimonials.tag')}
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-serif text-white mb-8"
                    >
                        {t('testimonials.title')}
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-[1px] bg-[#9a7d45]/40" />
                        <div className="w-2 h-2 rotate-45 border border-[#9a7d45]" />
                        <div className="w-12 h-[1px] bg-[#9a7d45]/40" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {testimonials.map((testi, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="bg-white p-10 shadow-2xl flex flex-col items-center text-center relative group transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="absolute -top-6">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#fdfaf6] shadow-lg">
                                    <img
                                        src={testi.image}
                                        alt={testi.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                            </div>

                            <div className="mt-12 mb-6">
                                <Quote className="w-8 h-8 text-[#9a7d45]/20 mx-auto" />
                            </div>

                            <p className="text-[#1a3c34]/80 font-serif text-lg leading-relaxed mb-8 flex-grow">
                                {t(testi.textKey)}
                            </p>

                            <div className="space-y-3 mt-auto w-full">
                                <div className="flex justify-center gap-1.5 mb-4">
                                    {[...Array(testi.rating)].map((_, star) => (
                                        <Star key={star} className="w-3 h-3 fill-[#9a7d45] text-[#9a7d45]" />
                                    ))}
                                </div>
                                <h4 className="text-[#1a3c34] font-serif font-bold text-lg uppercase tracking-widest border-t border-[#1a3c34]/10 pt-4">
                                    {testi.name}
                                </h4>
                                <p className="text-[#9a7d45] font-serif text-sm">
                                    {testi.location}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
