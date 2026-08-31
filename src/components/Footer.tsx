"use client";

import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export function Footer() {
    const { t, useHref } = useLanguage();

    return (
        <footer className="bg-[#6f7c4e] text-[#fffbf0] py-24 px-6 border-t border-[#fffbf0]/20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
                    {/* Brand/Logo Section */}
                    <div className="space-y-6">
                        <Link href={useHref("/admin")} className="inline-block hover:opacity-100 transition-none">
                            <img
                                src="/identidad de marca/LOGO LA JUANA CERRO TUSA-02.png"
                                alt="La Juana Logo"
                                className="h-20 w-auto mb-6"
                            />
                        </Link>
                        <p className="text-[#fffbf0]/60 font-serif italic leading-relaxed max-w-sm">
                            {t('footer.brand_desc')}
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/lajuanacerrotusa/" className="w-10 h-10 border border-[#fffbf0]/30 flex items-center justify-center hover:border-[#fffbf0] hover:bg-[#fffbf0]/10 transition-all">
                                <Instagram className="w-5 h-5 text-[#fffbf0]" />
                            </a>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-serif italic text-[#fffbf0] mb-6">{t('footer.contact')}</h3>
                        <ul className="space-y-4 font-serif italic">
                            <li className="flex items-start gap-4 text-[#fffbf0]/80">
                                <MapPin className="w-5 h-5 text-[#fffbf0] shrink-0" />
                                <span>{t('hero.location')} <br /> Parcelación Rochiles</span>
                            </li>
                            <li className="flex items-center gap-4 text-[#fffbf0]/80">
                                <Phone className="w-5 h-5 text-[#fffbf0]" />
                                <a href="tel:+573021025621" className="hover:text-[#fffbf0] transition-colors">+57 302 102 5621</a>
                            </li>
                            <li className="pt-2">
                                <a
                                    href="https://wa.me/573021025621?text=Hola%20La%20Juana%2C%20quisiera%20hacer%20una%20consulta."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-serif italic rounded-none shadow-md transition-all border border-emerald-400/30"
                                >
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    <span>Escribir por WhatsApp</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Navigation Section */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-serif italic text-[#fffbf0] mb-6">{t('footer.navigation')}</h3>
                        <ul className="space-y-4 font-serif italic">
                            <li><a href={useHref("/#experiencias")} className="text-[#fffbf0]/80 hover:text-[#fffbf0] transition-colors">{t('nav.experiences')}</a></li>
                            <li><a href={useHref("/#tours")} className="text-[#fffbf0]/80 hover:text-[#fffbf0] transition-colors">{t('nav.tours')}</a></li>
                            <li><a href={useHref("/#habitaciones")} className="text-[#fffbf0]/80 hover:text-[#fffbf0] transition-colors">{t('nav.rooms')}</a></li>
                            <li><a href={useHref("/#testimonios")} className="text-[#fffbf0]/80 hover:text-[#fffbf0] transition-colors">{t('nav.testimonials')}</a></li>
                            <li><a href={useHref("/#finca")} className="text-[#fffbf0]/80 hover:text-[#fffbf0] transition-colors">{t('nav.finca')}</a></li>
                            <li><a href={useHref("/#ubicacion")} className="text-[#fffbf0]/80 hover:text-[#fffbf0] transition-colors">{t('nav.location')}</a></li>
                            <li><a href={useHref("/#habitaciones")} className="text-[#fffbf0]/80 hover:text-[#fffbf0] transition-colors font-bold text-[#fffbf0]">{t('nav.reserve')}</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-[#fffbf0]/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-[#fffbf0]/40 uppercase tracking-[0.2em] font-serif">
                    <p>© 2026 {t('hero.title')} {t('hero.subtitle')}. {t('footer.rights')}</p>
                    <div className="flex gap-8">
                        <Link href={useHref("/politicas")} className="hover:text-[#fffbf0] transition-colors">{t('footer.policies')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

