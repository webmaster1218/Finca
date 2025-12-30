"use client";

import { useState, useEffect } from "react";
import { Trees, Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "La Finca", href: "#finca" },
    { name: "Experiencias", href: "#experiencias" },
    { name: "Testimonios", href: "#testimonios" },
    { name: "Habitaciones", href: "#habitaciones" },
    { name: "Ubicación", href: "#ubicacion" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-6 ${isScrolled ? "bg-[#fdfaf6]/95 backdrop-blur-sm shadow-md py-4" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 md:flex hidden">
          <div className="flex gap-8">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`nav-link text-sm uppercase tracking-widest ${isScrolled ? "text-slate-800" : "text-white"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <Link href="/" className="flex flex-col items-center gap-0 group px-4">
          <Trees className={`w-6 h-6 mb-1 ${isScrolled ? "text-[#1a3c34]" : "text-[#9a7d45]"}`} />
          <span className={`text-xl font-serif italic tracking-tighter ${isScrolled ? "text-[#1a3c34]" : "text-white"
            }`}>
            La Juana de cerro tusa
          </span>
        </Link>

        <div className="flex-1 md:flex hidden justify-end items-center gap-8">
          <div className="flex gap-8">
            {navLinks.slice(3).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`nav-link text-sm uppercase tracking-widest ${isScrolled ? "text-slate-800" : "text-white"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <a
            href="https://wa.me/573210000000"
            className={`px-6 py-2 border font-serif italic text-sm transition-all ${isScrolled
              ? "border-[#1a3c34] text-[#1a3c34] hover:bg-[#1a3c34] hover:text-white"
              : "border-white text-white hover:bg-white hover:text-[#1a3c34]"
              }`}
          >
            Reservar
          </a>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? "text-slate-950" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-slate-950" : "text-white"} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#fdfaf6] border-t border-[#9a7d45]/20 mt-6 -mx-6 px-6 py-8 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-serif italic text-2xl text-[#1a3c34]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="https://wa.me/573210000000"
                className="btn-classic justify-center"
              >
                Reservar Ahora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
