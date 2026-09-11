"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Calendar as CalendarIcon, Sparkles } from "lucide-react";
import type { Locale } from "../../lib/blog-types";

type Props = {
  categoria: string;
  articleTitle: string;
  locale: Locale;
};

const WHATSAPP_NUMBER = "573021025621";

export function ArticleLeadForm({ categoria, articleTitle, locale }: Props) {
  const [nombre, setNombre] = useState("");
  const [huespedes, setHuespedes] = useState("8");
  const [fecha, setFecha] = useState("");
  const [plan, setPlan] = useState(getDefaultPlan(categoria, locale));

  const isEs = locale === "es";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let mensaje = "";
    if (isEs) {
      mensaje = `¡Hola La Juana! Mi nombre es ${nombre ? nombre : "un visitante de la web"}.\n` +
        `Leí el artículo: "${articleTitle}".\n\n` +
        `Quisiera cotizar y consultar disponibilidad para:\n` +
        `• Plan: ${plan}\n` +
        `• Número de personas: ${huespedes} huéspedes (máximo 16)\n` +
        (fecha ? `• Fecha tentativa: ${fecha}\n` : "") +
        `\n¿Tienen fechas disponibles para nuestro grupo? Muchas gracias.`;
    } else {
      mensaje = `Hello La Juana! My name is ${nombre ? nombre : "a website visitor"}.\n` +
        `I read your article: "${articleTitle}".\n\n` +
        `I would like to inquire about availability and rates for:\n` +
        `• Experience: ${plan}\n` +
        `• Guests: ${huespedes} guests (up to 16 max)\n` +
        (fecha ? `• Estimated date: ${fecha}\n` : "") +
        `\nDo you have availability for our group? Thank you.`;
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-14 border border-[#9a7d45]/30 bg-[#fffbf0] p-6 md:p-10 shadow-lg relative"
      aria-labelledby="lead-form-title"
    >
      <div className="text-center mb-8">
        <p className="text-[#9a7d45] font-serif tracking-[0.35em] text-xs uppercase mb-2">
          {isEs ? "Consulta Directa" : "Direct Inquiry"}
        </p>
        <h3 id="lead-form-title" className="text-2xl md:text-3xl font-serif text-[#6f7c4e] mb-3">
          {isEs
            ? "¿Planeando tu visita a Cerro Tusa?"
            : "Planning your stay at Cerro Tusa?"}
        </h3>
        <p className="text-[#2c3e50]/75 text-sm md:text-base font-serif max-w-lg mx-auto leading-relaxed">
          {isEs
            ? "Cotiza directamente con nuestro equipo de atención. Respuesta inmediata y sin intermediarios."
            : "Inquire directly with our team for exclusive rates and availability with no middlemen."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Nombre */}
          <div>
            <label className="block text-xs font-serif uppercase tracking-widest text-[#6f7c4e] mb-1.5">
              {isEs ? "Tu nombre" : "Your name"}
            </label>
            <input
              type="text"
              placeholder={isEs ? "Ej. Carlos Gómez" : "e.g. John Doe"}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-[#fffbf0] border border-[#9a7d45]/30 px-3.5 py-2.5 text-sm text-[#2c3e50] focus:outline-none focus:border-[#6f7c4e] font-sans"
            />
          </div>

          {/* Tipo de plan */}
          <div>
            <label className="block text-xs font-serif uppercase tracking-widest text-[#6f7c4e] mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#9a7d45]" />
              {isEs ? "Tipo de plan" : "Experience"}
            </label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full bg-[#fffbf0] border border-[#9a7d45]/30 px-3.5 py-2.5 text-sm text-[#2c3e50] focus:outline-none focus:border-[#6f7c4e] font-sans"
            >
              {isEs ? (
                <>
                  <option value="Alquiler de finca completa">Alquiler de finca completa (hasta 16 pax)</option>
                  <option value="Escapada familiar">Vacaciones en familia</option>
                  <option value="Evento o celebración">Evento / Boda / Celebración</option>
                  <option value="Glamping">Glamping frente a Cerro Tusa</option>
                </>
              ) : (
                <>
                  <option value="Full private farmhouse rental">Full private farmhouse rental (up to 16)</option>
                  <option value="Family holiday stay">Family holiday stay</option>
                  <option value="Event or wedding retreat">Event or wedding retreat</option>
                  <option value="Glamping retreat">Glamping retreat</option>
                </>
              )}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Fecha tentativa */}
          <div>
            <label className="block text-xs font-serif uppercase tracking-widest text-[#6f7c4e] mb-1.5 flex items-center gap-1.5">
              <CalendarIcon className="w-3.5 h-3.5 text-[#9a7d45]" />
              {isEs ? "Fecha estimada" : "Estimated date"}
            </label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full bg-[#fffbf0] border border-[#9a7d45]/30 px-3.5 py-2.5 text-sm text-[#2c3e50] focus:outline-none focus:border-[#6f7c4e] font-sans"
            />
          </div>

          {/* Número de huéspedes */}
          <div>
            <label className="block text-xs font-serif uppercase tracking-widest text-[#6f7c4e] mb-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#9a7d45]" />
              {isEs ? "Huéspedes (máx. 16)" : "Guests (max 16)"}
            </label>
            <select
              value={huespedes}
              onChange={(e) => setHuespedes(e.target.value)}
              className="w-full bg-[#fffbf0] border border-[#9a7d45]/30 px-3.5 py-2.5 text-sm text-[#2c3e50] focus:outline-none focus:border-[#6f7c4e] font-sans"
            >
              {[...Array(16)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i === 0 ? (isEs ? "persona" : "guest") : (isEs ? "personas" : "guests")}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Nota de aforo estricto */}
        <p className="text-[11px] md:text-xs text-[#2c3e50]/60 font-serif italic text-center">
          {isEs
            ? "Nota: La Juana opera bajo alquiler completo y privado con una capacidad máxima estricta de 16 personas en 6 suites."
            : "Note: La Juana is a private luxury rental with a strict maximum capacity of 16 guests across 6 suites."}
        </p>

        {/* Botón de envío */}
        <div className="text-center pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#6f7c4e] hover:bg-[#5e6a42] text-[#fffbf0] font-serif text-sm tracking-wider uppercase transition-colors shadow-md border border-[#9a7d45]/40"
          >
            <span>
              {isEs ? "Consultar disponibilidad en WhatsApp" : "Check availability on WhatsApp"}
            </span>
            <span className="text-[#9a7d45] font-sans text-base">→</span>
          </button>
        </div>
      </form>
    </motion.section>
  );
}

function getDefaultPlan(categoria: string, locale: Locale): string {
  if (locale === "es") {
    switch (categoria) {
      case "fincas-de-eventos":
        return "Evento o celebración";
      case "familia":
        return "Escapada familiar";
      case "glamping":
        return "Glamping";
      case "turismo-antioquia":
      case "fincas-de-lujo":
      default:
        return "Alquiler de finca completa";
    }
  }
  switch (categoria) {
    case "event-venues-colombia":
    case "fincas-de-eventos":
      return "Event or wedding retreat";
    case "family-holidays-colombia":
    case "familia":
      return "Family holiday stay";
    default:
      return "Full private farmhouse rental";
  }
}
