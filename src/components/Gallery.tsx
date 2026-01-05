"use client";

import { motion } from "framer-motion";

const galleryImages = [
    { url: "/imagenes/exterior/IMG_5135.webp", span: "md:col-span-2 md:row-span-2", title: "Arquitectura Tradicional" },
    { url: "/imagenes/espacios/IMG_5251.webp", span: "md:col-span-1 md:row-span-1", title: "Zonas Verdes" },
    { url: "/imagenes/exterior/IMG_3096.webp", span: "md:col-span-1 md:row-span-2", title: "La Majestuosidad del Valle" },
    { url: "/imagenes/habitaciones/IMG_5597.webp", span: "md:col-span-1 md:row-span-1", title: "Luces del Atardecer" },

    { url: "/imagenes/espacios/IMG_9346.webp", span: "md:col-span-1 md:row-span-1", title: "Senderos de la Finca" },
    { url: "/imagenes/exterior/IMG_5106.webp", span: "md:col-span-2 md:row-span-2", title: "Fachada Colonial" },
    { url: "/imagenes/exterior/IMG_5121.webp", span: "md:col-span-1 md:row-span-1", title: "Naturaleza Viva" },
    { url: "/imagenes/habitaciones/IMG_5179.webp", span: "md:col-span-1 md:row-span-1", title: "Entornos de Paz" },
    { url: "/imagenes/exterior/IMG_5133.webp", span: "md:col-span-1 md:row-span-1", title: "Cielos de Venecia" },
];

export function Gallery() {
    return (
        <section id="finca" className="py-24 bg-[#fdfaf6] relative overflow-hidden">
            {/* Decorative vertical line */}
            <div className="absolute top-0 right-1/2 translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-[#9a7d45]/40 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-[#9a7d45] font-serif tracking-[0.4em] text-xs mb-6 uppercase"
                >
                    Mosaico de Recuerdos
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-serif text-[#1a3c34] mb-8"
                >
                    Galería del Alma
                </motion.h2>
                <div className="flex items-center justify-center gap-4">
                    <div className="w-16 h-[1px] bg-[#9a7d45]/40" />
                    <div className="w-2 h-2 rounded-full bg-[#9a7d45]/60" />
                    <div className="w-16 h-[1px] bg-[#9a7d45]/40" />
                </div>
            </div>

            {/* Edge-to-Edge Grid with No Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 auto-rows-[300px] md:auto-rows-[400px]">
                {galleryImages.map((img, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.8 }}
                        className={`relative overflow-hidden group ${img.span} bg-[#142d27]`}
                    >
                        <img
                            src={img.url}
                            alt={img.title}
                            className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-110"
                        />

                        {/* Minimalistic Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                <h3 className="text-white font-serif text-2xl tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                    {img.title}
                                </h3>
                                <div className="w-8 h-[1px] bg-[#9a7d45] mt-4 scale-0 group-hover:scale-100 transition-transform duration-700 delay-100" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Artistic dark fade at the bottom to connect with next section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </section>
    );
}