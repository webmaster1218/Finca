"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Image from "next/image";
import { Navbar } from "../../components/Navbar";
import { Hero } from "../../components/Hero";
import { Footer } from "../../components/Footer";
import { useLanguage } from "../../context/LanguageContext";

// Detailed image data structure with "Mood" descriptions
const galleryItems = [
    // EXTERIORES
    {
        id: 1,
        url: "/imagenes/exterior/IMG_5135.webp",
        category: "exterior",
        title: "La Gran Pirámide",
        desc: "El amanecer tiñe las naves de Cerro Tusa, la pirámide natural que custodia nuestros sueños.",
        span: "lg:col-span-2 lg:row-span-2"
    },
    {
        id: 2,
        url: "/imagenes/exterior/IMG_3093.webp",
        category: "exterior",
        title: "Crepúsculo Dorado",
        desc: "Cuando el sol se oculta tras las montañas, la finca se viste de oro y nostalgia.",
        span: "lg:col-span-1 lg:row-span-1"
    },
    {
        id: 3,
        url: "/imagenes/exterior/IMG_5108.webp",
        category: "exterior",
        title: "Naturaleza Viva",
        desc: "Jardines que respiran y senderos que invitan a perderse en el verde.",
        span: "lg:col-span-1 lg:row-span-1"
    },
    {
        id: 4,
        url: "/imagenes/exterior/IMG_5110.webp",
        category: "exterior",
        title: "Arquitectura Viva",
        desc: "Blanco y teja roja, un diálogo constante con la historia antioqueña.",
        span: "lg:col-span-2 lg:row-span-1"
    },
    // ARQUITECTURA / ESPACIOS
    {
        id: 5,
        url: "/imagenes/espacios/IMG_5250.webp",
        category: "espacios",
        title: "El Alma Social",
        desc: "Espacios diseñados para el encuentro y la charla eterna bajo el aroma del café.",
        span: "lg:col-span-1 lg:row-span-2"
    },
    {
        id: 6,
        url: "/imagenes/espacios/IMG_5242.webp",
        category: "espacios",
        title: "Rincón Colonial",
        desc: "Detalles que evocan la calidez de un hogar con historia.",
        span: "lg:col-span-1 lg:row-span-1"
    },
    {
        id: 7,
        url: "/imagenes/espacios/IMG_5220.webp",
        category: "espacios",
        title: "Luz y Sombra",
        desc: "Juegos de iluminación natural que crean atmósferas mágicas.",
        span: "lg:col-span-2 lg:row-span-2"
    },
    {
        id: 16,
        url: "/imagenes/espacios/IMG_5221.webp",
        category: "espacios",
        title: "Reflejos",
        desc: "La paz reflejada en cada ventana.",
        span: "lg:col-span-1 lg:row-span-1"
    },
    // HABITACIONES
    {
        id: 8,
        url: "/imagenes/habitaciones/IMG_5145.webp",
        category: "habitaciones",
        title: "Refugio Ancestral",
        desc: "Sábanas de algodón y madera tallada: el descanso cobra un nuevo significado.",
        span: "lg:col-span-1 lg:row-span-1"
    },
    {
        id: 9,
        url: "/imagenes/habitaciones/IMG_5151.webp",
        category: "habitaciones",
        title: "Despertar Místico",
        desc: "Luz filtrada que acaricia cada rincón, invitando a la pausa y la contemplación.",
        span: "lg:col-span-1 lg:row-span-1"
    },
    {
        id: 10,
        url: "/imagenes/habitaciones/IMG_5561.webp",
        category: "habitaciones",
        title: "Suite del Sol",
        desc: "Amplitud y confort con vistas privilegiadas al valle.",
        span: "lg:col-span-2 lg:row-span-1"
    },
    {
        id: 11,
        url: "/imagenes/habitaciones/IMG_5622.webp",
        category: "habitaciones",
        title: "Noches de Paz",
        desc: "El silencio de la montaña es la mejor melodía para un sueño reparador.",
        span: "lg:col-span-1 lg:row-span-2"
    },
    {
        id: 12,
        url: "/imagenes/habitaciones/IMG_5597.webp",
        category: "habitaciones",
        title: "Detalles que Hablan",
        desc: "Cada objeto en La Juana cuenta una historia de tradición y buen gusto.",
        span: "lg:col-span-1 lg:row-span-1"
    },
    {
        id: 22,
        url: "/imagenes/habitaciones/IMG_5152.webp",
        category: "habitaciones",
        title: "Texturas Calmas",
        desc: "Materiales nobles para un descanso profundo.",
        span: "lg:col-span-1 lg:row-span-1"
    },
    {
        id: 23,
        url: "/imagenes/habitaciones/IMG_5153.webp",
        category: "habitaciones",
        title: "Armonía",
        desc: "El equilibrio perfecto entre lo rústico y lo moderno.",
        span: "lg:col-span-1 lg:row-span-1"
    },
    {
        id: 24,
        url: "/imagenes/habitaciones/IMG_5154.webp",
        category: "habitaciones",
        title: "Rincón de Lectura",
        desc: "El lugar ideal para perderse en un buen libro.",
        span: "lg:col-span-1 lg:row-span-1"
    },
    {
        id: 19,
        url: "/imagenes/habitaciones/IMG_5169.webp",
        category: "habitaciones",
        title: "Confort",
        desc: "Descanso en armonía con la naturaleza.",
        span: "lg:col-span-2 lg:row-span-1"
    },
    // MAS EXTERIORES
    {
        id: 13,
        url: "/imagenes/exterior/IMG_5132.webp",
        category: "exterior",
        title: "Senderos Secretos",
        desc: "Caminos de piedra que susurran secretos de antiguos pobladores.",
        span: "lg:col-span-1 lg:row-span-2"
    },
    {
        id: 14,
        url: "/imagenes/exterior/IMG_5111.webp",
        category: "exterior",
        title: "Vista Infinita",
        desc: "El horizonte se funde con el cielo en un abrazo eterno.",
        span: "lg:col-span-1 lg:row-span-1"
    },
    {
        id: 15,
        url: "/imagenes/exterior/IMG_5136.webp",
        category: "exterior",
        title: "Horizonte",
        desc: "Vistas inigualables desde la comodidad de la finca.",
        span: "lg:col-span-2 lg:row-span-1"
    },
    {
        id: 18,
        url: "/imagenes/exterior/IMG_5112.webp",
        category: "exterior",
        title: "Atardecer",
        desc: "El cielo se tiñe de colores al finalizar el día.",
        span: "lg:col-span-1 lg:row-span-1"
    },
    {
        id: 20,
        url: "/imagenes/exterior/IMG_5131.webp",
        category: "exterior",
        title: "Paz en la Altura",
        desc: "El aire puro de la montaña te da la bienvenida.",
        span: "lg:col-span-1 lg:row-span-1"
    },
    {
        id: 21,
        url: "/imagenes/exterior/IMG_3096.webp",
        category: "exterior",
        title: "Montaña Mágica",
        desc: "Cerro Tusa desde otro ángulo, siempre imponente.",
        span: "lg:col-span-1 lg:row-span-1"
    }
];

const categories = [
    { id: "all", label: "Todo el Universo", labelEn: "The Universe" },
    { id: "exterior", label: "Paisajes", labelEn: "Landscapes" },
    { id: "espacios", label: "Arquitectura", labelEn: "Architecture" },
    { id: "habitaciones", label: "Estancias", labelEn: "The Stays" },
];

export default function GaleriaPage() {
    const { language, t } = useLanguage();
    const [filter, setFilter] = useState("all");
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const filteredItems = filter === "all" ? galleryItems : galleryItems.filter(img => img.category === filter);

    const openLightbox = (id: number) => setSelectedImage(id);
    const closeLightbox = () => setSelectedImage(null);

    return (
        <div className="min-h-screen bg-[#fffbf0] text-[#6f7c4e] selection:bg-[#6f7c4e] selection:text-[#fffbf0]">
            {/* Removed Noise Overlay for performance */}

            <Navbar />

            <Hero
                mediaType="image"
                mediaUrl="/imagenes/exterior/IMG_5135.webp"
                location={language === 'es' ? 'Una Visión de Gran Tradición' : 'A Vision of Great Tradition'}
                titlePart1={language === 'es' ? 'La Mirada' : 'The Vision'}
                titlePart2=""
                subtitle={language === 'es'
                    ? 'Cada rincón de nuestra finca es una oda a la tierra que nos vio nacer.'
                    : 'Every corner of our ranch is an ode to the land where we were born.'}
                ctaText={language === 'es' ? 'Explorar' : 'Explore'}
                ctaLink="#galeria-grid"
            />

            {/* Narrative Introduction */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-4xl font-serif italic leading-relaxed text-[#6f7c4e]/80"
                    >
                        “{language === 'es'
                            ? 'Cada rincón de nuestra finca es una oda a la tierra que nos vio nacer. Aquí, la luz no solo ilumina, sino que relata historias de hospitalidad y calma absoluta.'
                            : 'Every corner of our ranch is an ode to the land where we were born. Here, light does not just illuminate; it tells stories of hospitality and absolute calm.'}”
                    </motion.p>
                </div>
            </section>

            {/* Filter Navigation - High End Minimal */}
            <section className="sticky top-0 z-50 bg-[#fffbf0]/90 backdrop-blur-xl border-b border-[#6f7c4e]/5 py-6">
                <div className="max-w-7xl mx-auto px-6 flex justify-center flex-wrap gap-8 md:gap-16">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className="relative group py-2"
                        >
                            <span className={`text-[10px] md:text-xs font-serif tracking-[0.3em] uppercase transition-colors duration-500 ${filter === cat.id ? "text-[#6f7c4e]" : "text-slate-400"}`}>
                                {language === 'es' ? cat.label : cat.labelEn}
                            </span>
                            <motion.div
                                className="absolute bottom-0 left-0 h-[1.5px] bg-[#6f7c4e]"
                                initial={false}
                                animate={{ width: filter === cat.id ? "100%" : "0%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        </button>
                    ))}
                </div>
            </section>

            {/* Bento Style Gallery Grid */}
            <section id="galeria-grid" className="py-24 px-6 md:px-12 bg-[#fffbf0]">
                <div className="max-w-screen-2xl mx-auto">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px] md:auto-rows-[400px] grid-flow-row-dense"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    className={`relative group overflow-hidden bg-[#6f7c4e]/5 ${item.span || ""}`}
                                    onMouseEnter={() => setHoveredId(item.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    onClick={() => openLightbox(item.id)}
                                >
                                    {/* Image with Parallax-esque effect on hover */}
                                    <div className="relative w-full h-full transition-transform duration-[1.5s] ease-out group-hover:scale-110">
                                        <Image
                                            src={item.url}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            quality={95}
                                        />
                                    </div>

                                    {/* Glassmorphic Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-8">
                                        <motion.div
                                            initial={{ y: 20 }}
                                            animate={{ y: hoveredId === item.id ? 0 : 20 }}
                                            className="space-y-3"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-[1px] bg-[#fffbf0]/50" />
                                                <span className="text-[10px] text-[#fffbf0]/60 uppercase tracking-widest font-serif">{item.category}</span>
                                            </div>
                                            <h3 className="text-3xl font-serif text-[#fffbf0] italic">{item.title}</h3>
                                            <p className="text-[#fffbf0]/80 text-sm font-serif italic max-w-xs">{item.desc}</p>

                                            <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                                                <div className="flex items-center gap-2 text-[#fffbf0] text-[10px] uppercase tracking-widest font-bold">
                                                    <span>Explore details</span>
                                                    <Expand className="w-3 h-3" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Decorative Border */}
                                    <div className="absolute inset-4 border border-[#fffbf0]/10 pointer-events-none group-hover:border-[#fffbf0]/30 transition-colors duration-700" />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            <Footer />


            {/* Designer Lightbox */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-2xl flex items-center justify-center"
                    >
                        <button onClick={closeLightbox} className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors">
                            <X className="w-10 h-10" />
                        </button>

                        <div className="w-full max-w-7xl h-full flex flex-col items-center justify-center p-8 md:p-20">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative w-full h-[70vh] group"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={galleryItems.find(img => img.id === selectedImage)?.url || ""}
                                        fill
                                        className="object-contain"
                                        alt="Selected"
                                        priority
                                        quality={95}
                                    />
                                </div>

                                {/* Nav controls in Lightbox */}
                                <div className="absolute inset-y-0 -left-16 flex items-center">
                                    <button
                                        className="p-4 text-white/30 hover:text-white transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const idx = galleryItems.findIndex(i => i.id === selectedImage);
                                            setSelectedImage(galleryItems[idx === 0 ? galleryItems.length - 1 : idx - 1].id);
                                        }}
                                    >
                                        <ChevronLeft className="w-12 h-12" />
                                    </button>
                                </div>
                                <div className="absolute inset-y-0 -right-16 flex items-center">
                                    <button
                                        className="p-4 text-white/30 hover:text-white transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const idx = galleryItems.findIndex(i => i.id === selectedImage);
                                            setSelectedImage(galleryItems[(idx + 1) % galleryItems.length].id);
                                        }}
                                    >
                                        <ChevronRight className="w-12 h-12" />
                                    </button>
                                </div>
                            </motion.div>

                            {/* Caption Section */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-12 text-center max-w-2xl"
                            >
                                <h3 className="text-[#fffbf0] font-serif text-3xl italic mb-4">
                                    {galleryItems.find(img => img.id === selectedImage)?.title}
                                </h3>
                                <p className="text-[#fffbf0]/60 font-serif italic text-lg">
                                    {galleryItems.find(img => img.id === selectedImage)?.desc}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
