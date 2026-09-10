"use client";

import { motion } from "framer-motion";
import type { Locale } from "../../../lib/blog-types";

type Props = {
  categoria: string;
  articleTitle: string;
  locale: Locale;
  className?: string;
};

const WHATSAPP_NUMBER = "573021025621";

function getContextualMessage(categoria: string, title: string, locale: Locale): string {
  if (locale === "es") {
    switch (categoria) {
      case "fincas-de-eventos":
        return `Hola La Juana, leí el artículo sobre eventos ("${title}") y me gustaría cotizar una fecha para una celebración/evento. ¿Tienen disponibilidad?`;
      case "familia":
        return `Hola La Juana, leí la guía de vacaciones familiares ("${title}") y me gustaría consultar disponibilidad y tarifas para nuestro grupo familiar (hasta 16 personas).`;
      case "glamping":
        return `Hola La Juana, leí el artículo de glamping ("${title}") y quisiera consultar disponibilidad y precios para una escapada frente a Cerro Tusa.`;
      case "turismo-antioquia":
        return `Hola La Juana, leí el artículo sobre turismo en Venecia ("${title}") y quisiera consultar disponibilidad y fechas para una estadía en la finca.`;
      case "cerro-tusa":
        return `Hola La Juana, leí la guía de Cerro Tusa ("${title}") y quisiera consultar tarifas de hospedaje en la finca.`;
      case "fincas-de-lujo":
      default:
        return `Hola La Juana, leí el artículo "${title}" y me gustaría cotizar una estadía en la finca. ¿Tienen fechas disponibles?`;
    }
  }

  // English
  switch (categoria) {
    case "event-venues-colombia":
    case "fincas-de-eventos":
      return `Hello La Juana, I read your article about event venues ("${title}") and I would like to inquire about availability for an event or celebration.`;
    case "family-holidays-colombia":
    case "familia":
      return `Hello La Juana, I read your family vacation guide ("${title}") and I would like to check availability and rates for our family group (up to 16 guests).`;
    case "glamping":
      return `Hello La Juana, I read your glamping article ("${title}") and would like to ask about availability and pricing near Cerro Tusa.`;
    case "antioquia-travel":
    case "turismo-antioquia":
      return `Hello La Juana, I read your travel article ("${title}") and would like to check availability and rates for a private stay at the finca.`;
    default:
      return `Hello La Juana, I read your article "${title}" and would like to check availability and rates for a private stay at the finca.`;
  }
}

export function ArticleWhatsAppButton({
  categoria,
  articleTitle,
  locale,
  className = "",
}: Props) {
  const message = getContextualMessage(categoria, articleTitle, locale);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const label = locale === "es" ? "Cotizar por WhatsApp" : "Inquire via WhatsApp";

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-[#fffbf0] font-sans font-medium text-sm tracking-wide shadow-md transition-colors rounded-none border border-[#fffbf0]/20 ${className}`}
      aria-label={label}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 fill-current shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
      <span>{label}</span>
    </motion.a>
  );
}
