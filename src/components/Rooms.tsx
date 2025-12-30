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
        <section id="habitaciones" className="relative min-h-screen flex items-center justify-center py-24 md:py-32 overflow-hidden bg-[#fdfaf6]">
            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                {/* Main Header */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#9a7d45] font-serif tracking-[0.4em] text-xs md:text-sm mb-6 uppercase"
                    >
                        Exclusividad Total
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-serif text-[#1a3c34] mb-8"
                    >
                        Alquiler de Finca Completa
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100px" }}
                        className="h-[1px] bg-[#9a7d45] mx-auto"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Details and Amenities */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <h3 className="text-3xl md:text-5xl font-serif text-[#1a3c34] leading-tight">
                                El espacio perfecto para <br /> momentos inolvidables
                            </h3>
                            <div className="w-16 h-[1px] bg-[#9a7d45]" />
                            <p className="text-slate-600 leading-relaxed font-serif text-lg max-w-xl">
                                Disfruta de <span className="text-[#9a7d45] font-bold">2 camareras</span> dedicadas a su confort y un <span className="text-[#9a7d45] font-bold">mayordomo</span> a su servicio. Seguridad, privacidad y naturaleza en un solo lugar.
                            </p>
                        </div>

                        {/* Amenities Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {specs.map((spec, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center gap-4 p-5 bg-white border border-[#9a7d45]/10 shadow-sm group transition-all duration-500 hover:border-[#9a7d45]/30 hover:shadow-md"
                                >
                                    <div className="text-[#9a7d45] transition-transform duration-500 group-hover:scale-110">
                                        {spec.icon}
                                    </div>
                                    <span className="text-[#1a3c34] font-serif text-xs md:text-sm tracking-wide">
                                        {spec.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Pricing and Conversion */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="w-full"
                    >
                        <div className="bg-[#1a3c34] p-10 md:p-14 text-center relative overflow-hidden group shadow-2xl border border-[#9a7d45]/20">
                            {/* Decorative inner border */}
                            <div className="absolute inset-2 border border-[#9a7d45]/10 pointer-events-none" />

                            <p className="text-[#9a7d45] font-serif mb-4 uppercase tracking-[0.2em] text-xs">Propuesta de Renta</p>
                            <h4 className="text-white font-serif text-2xl mb-2">Inversión por Noche</h4>
                            <div className="text-4xl md:text-5xl font-serif text-[#9a7d45] mb-8">
                                $2'800.000 <span className="text-xs text-white/40 align-middle">COP</span>
                            </div>

                            <a
                                href="https://wa.me/573210000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-[#9a7d45] text-[#1a3c34] py-5 font-serif font-bold text-lg hover:bg-[#b49861] transition-all duration-300 shadow-xl"
                            >
                                Consultar Disponibilidad
                            </a>

                            <div className="mt-8 space-y-4">
                                <p className="text-white/60 font-serif text-sm italic">
                                    “Privacidad absoluta en medio de la naturaleza”
                                </p>
                                <p className="text-white/30 text-[10px] uppercase tracking-widest font-serif">
                                    * El precio puede variar según temporada y número de personas
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
