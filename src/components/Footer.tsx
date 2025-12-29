"use client";

import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#1a3c34] text-white py-24 px-6 border-t border-[#9a7d45]/20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
                    {/* Brand/Logo Section */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-serif italic text-white mb-6">Finca Fredonia</h2>
                        <p className="text-white/60 font-serif italic leading-relaxed max-w-sm">
                            Donde la tradición antioqueña se encuentra con la exclusividad.
                            Vive una experiencia inolvidable a la sombra del Cerro Tusa.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 border border-[#9a7d45]/30 flex items-center justify-center hover:border-[#9a7d45] hover:bg-[#9a7d45]/10 transition-all">
                                <Instagram className="w-5 h-5 text-[#9a7d45]" />
                            </a>
                            <a href="#" className="w-10 h-10 border border-[#9a7d45]/30 flex items-center justify-center hover:border-[#9a7d45] hover:bg-[#9a7d45]/10 transition-all">
                                <Facebook className="w-5 h-5 text-[#9a7d45]" />
                            </a>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-serif italic text-[#9a7d45] mb-6">Contacto</h3>
                        <ul className="space-y-4 font-serif italic">
                            <li className="flex items-start gap-4 text-white/80">
                                <MapPin className="w-5 h-5 text-[#9a7d45] shrink-0" />
                                <span>Fredonia, Antioquia <br /> Vía Cerro Tusa - Marsella</span>
                            </li>
                            <li className="flex items-center gap-4 text-white/80">
                                <Phone className="w-5 h-5 text-[#9a7d45]" />
                                <a href="tel:+573210000000" className="hover:text-[#9a7d45] transition-colors">+57 321 000 0000</a>
                            </li>
                            <li className="flex items-center gap-4 text-white/80">
                                <Mail className="w-5 h-5 text-[#9a7d45]" />
                                <a href="mailto:hola@fincafredonia.com" className="hover:text-[#9a7d45] transition-colors">hola@fincafredonia.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Navigation Section */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-serif italic text-[#9a7d45] mb-6">Navegación</h3>
                        <ul className="space-y-4 font-serif italic">
                            <li><a href="#experiencias" className="text-white/80 hover:text-[#9a7d45] transition-colors">Experiencias</a></li>
                            <li><a href="#habitaciones" className="text-white/80 hover:text-[#9a7d45] transition-colors">Hospedaje</a></li>
                            <li><a href="#testimonios" className="text-white/80 hover:text-[#9a7d45] transition-colors">Testimonios</a></li>
                            <li><a href="#finca" className="text-white/80 hover:text-[#9a7d45] transition-colors">La Finca</a></li>
                            <li><a href="#ubicacion" className="text-white/80 hover:text-[#9a7d45] transition-colors">Ubicación</a></li>
                            <li><a href="https://wa.me/573210000000" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[#9a7d45] transition-colors font-bold text-[#9a7d45]">Reservas</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-[#9a7d45]/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/40 uppercase tracking-[0.2em] font-serif">
                    <p>© 2024 Finca Fredonia. Todos los derechos reservados.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-white transition-colors">Términos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
