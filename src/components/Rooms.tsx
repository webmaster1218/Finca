"use client";

import { motion } from "framer-motion";
import { User, Bed, Waves, Speaker, Bath, Home, Car, Droplets } from "lucide-react";

export function Rooms() {
    const specs = [
        { label: "6 Habitaciones", icon: <Home className="w-5 h-5" /> },
        { label: "8 Camas", icon: <Bed className="w-5 h-5" /> },
        { label: "6 Baños", icon: <Bath className="w-5 h-5" /> },
        { label: "16 Personas", icon: <User className="w-5 h-5" /> },
        { label: "Piscina - Jacuzzi - Turco", icon: <Waves className="w-5 h-5" /> },
        { label: "Agua Potable", icon: <Droplets className="w-5 h-5" /> },
        { label: "Párking Cubierto", icon: <Car className="w-5 h-5" /> },
        { label: "Kiosco", icon: <Home className="w-5 h-5" /> },
    ];

    return (
        <>
            <section id="habitaciones" className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden group/section">
                {/* Background Image with Parallax Effect */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url("/imagenes/exterior/IMG_5105.webp")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed'
                    }}
                />

                {/* Dynamic Overlays for Readability and Depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 z-[1]" />

                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                    <div className="text-center mb-16 md:mb-24">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-[#9a7d45] font-serif italic tracking-[0.4em] text-xs md:text-sm mb-6 uppercase drop-shadow-md"
                        >
                            Exclusividad Total
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-7xl font-serif text-white italic mb-8 drop-shadow-2xl"
                        >
                            Alquiler de Finca Completa
                        </motion.h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100px" }}
                            className="h-[1px] bg-[#9a7d45] mx-auto mb-10"
                        />
                    </div>

                    {/* Amenities Capsules (Glassmorphism) - Smaller Size */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {specs.map((spec, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                className="flex flex-col items-center justify-center p-4 md:p-6 backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl group transition-all duration-500 rounded-none"
                            >
                                <div className="text-[#9a7d45] mb-2 scale-100 md:scale-110 transition-transform duration-500 group-hover:scale-125">
                                    {spec.icon}
                                </div>
                                <span className="text-white font-serif italic text-xs md:text-sm tracking-wide text-center drop-shadow-lg">
                                    {spec.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* New Separate Section for Pricing and Details - Restored Original Style */}
            <section className="py-24 md:py-32 px-6 bg-[#fdfaf6] relative border-t border-[#9a7d45]/10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        {/* Text Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h3 className="text-3xl md:text-6xl font-serif italic text-[#1a3c34] leading-tight">
                                El espacio perfecto para <br /> momentos inolvidables
                            </h3>
                            <div className="w-16 h-[1px] bg-[#9a7d45]" />
                            <p className="text-slate-600 leading-relaxed font-serif italic text-lg max-w-xl">
                                Disfruta de <span className="text-[#9a7d45] font-bold">2 camareras</span> dedicadas a su confort y un <span className="text-[#9a7d45] font-bold">mayordomo</span> a su servicio. Seguridad, privacidad y naturaleza en un solo lugar.
                            </p>
                            <ul className="space-y-4 font-serif italic text-[#1a3c34]">
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#9a7d45] rotate-45" />
                                    Zonas sociales amplias y totalmente privadas
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#9a7d45] rotate-45" />
                                    Entorno natural con senderos exclusivos
                                </li>
                            </ul>
                        </motion.div>

                        {/* Price Box - Original Style (Sharp Edges, No rounded corners) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-[#1a3c34] p-12 text-center relative overflow-hidden group shadow-2xl rounded-none"
                        >
                            {/* Decorative inner border */}
                            <div className="absolute inset-2 border border-[#9a7d45]/20 pointer-events-none" />

                            <p className="text-[#9a7d45] font-serif italic mb-4 uppercase tracking-[0.2em] text-xs">Propuesta de Renta</p>
                            <h4 className="text-white font-serif italic text-2xl mb-2">Inversión por Noche</h4>
                            <div className="text-4xl md:text-5xl font-serif text-[#9a7d45] mb-8">$2'800.000 <span className="text-xs text-white/40 align-middle">COP</span></div>

                            <a
                                href="https://wa.me/573210000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-[#9a7d45] text-[#1a3c34] py-5 font-serif italic font-bold text-lg hover:bg-[#b49861] transition-all duration-300"
                            >
                                Consultar Disponibilidad
                            </a>

                            <p className="text-white/40 text-[10px] mt-6 uppercase tracking-widest font-serif">
                                * El precio puede variar según temporada y número de personas
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
