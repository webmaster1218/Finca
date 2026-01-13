"use client";

import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-[#1a3c34] text-white py-24 px-6 border-t border-[#9a7d45]/20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
                    {/* Brand/Logo Section */}
                    <div className="space-y-6">
                        <Link href="/admin" className="inline-block hover:opacity-100 transition-none">
                            <img
                                src="/imagenes/logo/Logo.png"
                                alt="La Juana Logo"
                                className="h-20 w-auto mb-6"
                            />
                        </Link>
                        <p className="text-white/60 font-serif italic leading-relaxed max-w-sm">
                            {t('footer.brand_desc')}
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
                        <h3 className="text-xl font-serif italic text-[#9a7d45] mb-6">{t('footer.contact')}</h3>
                        <ul className="space-y-4 font-serif italic">
                            <li className="flex items-start gap-4 text-white/80">
                                <MapPin className="w-5 h-5 text-[#9a7d45] shrink-0" />
                                <span>{t('hero.location')} <br /> Parcelación Rochiles</span>
                            </li>
                            <li className="flex items-center gap-4 text-white/80">
                                <Phone className="w-5 h-5 text-[#9a7d45]" />
                                <a href="tel:+573196588185" className="hover:text-[#9a7d45] transition-colors">+57 319 658 8185</a>
                            </li>
                            <li className="flex items-center gap-4 text-white/80">
                                <Mail className="w-5 h-5 text-[#9a7d45]" />
                                <a href="mailto:hola@lajuana.com" className="hover:text-[#9a7d45] transition-colors">hola@lajuana.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Navigation Section */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-serif italic text-[#9a7d45] mb-6">{t('footer.navigation')}</h3>
                        <ul className="space-y-4 font-serif italic">
                            <li><a href="#experiencias" className="text-white/80 hover:text-[#9a7d45] transition-colors">{t('nav.experiences')}</a></li>
                            <li><a href="#habitaciones" className="text-white/80 hover:text-[#9a7d45] transition-colors">{t('nav.rooms')}</a></li>
                            <li><a href="#testimonios" className="text-white/80 hover:text-[#9a7d45] transition-colors">{t('nav.testimonials')}</a></li>
                            <li><a href="#finca" className="text-white/80 hover:text-[#9a7d45] transition-colors">{t('nav.finca')}</a></li>
                            <li><a href="#ubicacion" className="text-white/80 hover:text-[#9a7d45] transition-colors">{t('nav.location')}</a></li>
                            <li><a href="#habitaciones" className="text-white/80 hover:text-[#9a7d45] transition-colors font-bold text-[#9a7d45]">{t('nav.reserve')}</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-[#9a7d45]/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/40 uppercase tracking-[0.2em] font-serif">
                    <p>© 2026 {t('hero.title')} {t('hero.subtitle')}. {t('footer.rights')}</p>
                    <div className="flex gap-8">
                        <Link href="/politicas" className="hover:text-white transition-colors">{t('footer.policies')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
