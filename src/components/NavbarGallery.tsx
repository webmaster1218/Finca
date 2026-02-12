"use client";

import { useState, useEffect } from "react";
import { Trees, Globe, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export function NavbarGallery() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-6 ${isScrolled ? "bg-[#fffbf0]/95 backdrop-blur-sm shadow-md py-4" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
        <div className="flex-1 flex justify-start items-center">
          <Link
            href="/"
            className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] transition-all py-4 ${isScrolled ? "text-[#6f7c4e]" : "text-[#fffbf0]"} hover:opacity-70 group md:flex hidden`}
          >
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            {language === 'es' ? 'Volver al Inicio' : 'Back to Home'}
          </Link>
          
          {/* Mobile Back Button */}
          <Link
            href="/"
            className={`md:hidden flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${isScrolled ? "text-[#6f7c4e]" : "text-[#fffbf0]"} bg-[#fffbf0]/10 px-3 py-1.5 rounded-full backdrop-blur-sm`}
          >
            <ChevronLeft className="w-3 h-3" />
            {language === 'es' ? 'Inicio' : 'Home'}
          </Link>
        </div>

        <Link href="/" className="relative flex items-center justify-center w-40 h-12 group">
          <img
            src="/identidad de marca/LOGO LA JUANA CERRO TUSA-05.png"
            alt="La Juana Logo"
            className={`absolute top-1/2 -translate-y-1/2 transition-all duration-500 object-contain ${isScrolled ? "h-26" : "h-34"
              }`}
            style={!isScrolled ? { filter: 'brightness(0) invert(1)' } : {}}
          />
        </Link>

        <div className="flex-1 flex justify-end items-center gap-8">
          <div className="hidden md:block w-32" /> {/* Layout balance */}

          <div className="md:flex hidden items-center gap-4">
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${isScrolled ? "text-[#6f7c4e]" : "text-[#fffbf0]"} hover:opacity-70`}
            >
              <Globe className="w-4 h-4" />
              {language === 'es' ? 'EN' : 'ES'}
            </button>

            <a
              href="/#habitaciones"
              className={`px-6 py-2 border font-serif italic text-sm transition-all ${isScrolled
                ? "border-[#6f7c4e] text-[#6f7c4e] hover:bg-[#6f7c4e] hover:text-[#fffbf0]"
                : "border-[#fffbf0] text-[#fffbf0] hover:bg-[#fffbf0] hover:text-[#6f7c4e]"
                }`}
            >
              {t('nav.reserve')}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
