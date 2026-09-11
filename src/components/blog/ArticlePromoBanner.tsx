"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Locale } from "../../lib/blog-types";
import { ArticleWhatsAppButton } from "./ArticleWhatsAppButton";

type Props = {
  categoria: string;
  articleTitle: string;
  locale: Locale;
};

type PromoData = {
  eyebrow: string;
  title: string;
  description: string;
  highlight: string;
};

function getPromoData(categoria: string, locale: Locale): PromoData {
  if (locale === "es") {
    switch (categoria) {
      case "fincas-de-eventos":
        return {
          eyebrow: "Eventos & Celebraciones",
          title: "Tu evento inolvidable a la sombra del Cerro Tusa",
          description:
            "Espacios abiertos, terrazas panorámicas, privacidad absoluta y alojamiento para tus invitados más cercanos en una de las fincas más exclusivas del Suroeste antioqueño.",
          highlight: "Capacidad hasta 16 huéspedes · Servicio de mayordomo · Parqueadero privado",
        };
      case "familia":
        return {
          eyebrow: "Escapada Familiar",
          title: "Descanso y naturaleza para toda la familia",
          description:
            "Disfruta de piscina privada, fogata bajo las estrellas, amplias zonas verdes y el confort de 6 suites diseñadas para compartir momentos únicos con total tranquilidad.",
          highlight: "Capacidad máxima estricta de 16 personas · Cocina equipada · Vista a la pirámide",
        };
      case "glamping":
        return {
          eyebrow: "Experiencia Exclusiva",
          title: "Desconexión total frente a la pirámide sagrada",
          description:
            "Combina el lujo rústico y la serenidad de la montaña con todas las comodidades de una finca privada de gran tradición.",
          highlight: "Jacuzzi · Fogata al aire libre · A 5 minutos del sendero Cerro Tusa",
        };
      case "turismo-antioquia":
        return {
          eyebrow: "Turismo en Antioquia",
          title: "Descubre la magia de Venecia y el Suroeste",
          description:
            "A solo 90 minutos de Medellín, disfruta de una estadía privada con piscina panorámica, paisajes cafeteros y la majestuosidad de la montaña.",
          highlight: "Alquiler exclusivo · Paisajes del Suroeste · Reserva directa",
        };
      case "cerro-tusa":
        return {
          eyebrow: "A la Sombra de Cerro Tusa",
          title: "El punto de partida ideal para tu aventura",
          description:
            "Hospédate a minutos de la pirámide natural más grande del mundo y relájate tras tus caminatas en una finca con piscina, turco y servicio incluido.",
          highlight: "Senderismo cercano · Vista directa al cerro · 100% privado",
        };
      case "fincas-de-lujo":
      default:
        return {
          eyebrow: "Hospitalidad de Gran Tradición",
          title: "Reserva la finca completa para tu estadía privada",
          description:
            "Alquila La Juana en exclusiva: 6 suites, piscina panorámica, zonas sociales y atención personalizada para que solo te preocupes por disfrutar.",
          highlight: "Tarifa por noche completa · Hasta 16 personas · Privacidad total",
        };
    }
  }

  // English
  switch (categoria) {
    case "event-venues-colombia":
    case "fincas-de-eventos":
      return {
        eyebrow: "Events & Gatherings",
        title: "Your unforgettable retreat in the shadow of Cerro Tusa",
        description:
          "Open lawns, panoramic terraces, total privacy and boutique lodging for your guests in one of Antioquia’s most stunning private properties.",
        highlight: "Up to 16 guests lodging · Dedicated staff · Private parking",
      };
    case "family-holidays-colombia":
    case "familia":
      return {
        eyebrow: "Family Retreat",
        title: "Peace, nature and space for the entire family",
        description:
          "Private swimming pool, outdoor fire pit, expansive gardens and 6 spacious suites crafted for meaningful time together in complete security.",
        highlight: "Strict 16-guest capacity · Fully equipped kitchen · Natural pyramid views",
      };
    default:
      return {
        eyebrow: "Private Farmhouse Rental",
        title: "Experience the world's largest natural pyramid in luxury",
        description:
          "Rent the entire finca exclusively: 6 suites, panoramic pool, attentive house staff, and serene mountain sunsets just 90 minutes from Medellín.",
        highlight: "Private property rental · Up to 16 guests · 100% exclusive access",
      };
  }
}

export function ArticlePromoBanner({
  categoria,
  articleTitle,
  locale,
}: Props) {
  const data = getPromoData(categoria, locale);
  const reserveHref = locale === "es" ? "/es/#habitaciones" : "/en/#habitaciones";
  const reserveLabel = locale === "es" ? "Ver instalaciones" : "Explore the finca";

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-14 border border-[#9a7d45]/30 bg-[#6f7c4e]/[0.05] p-6 md:p-10 text-center relative overflow-hidden shadow-sm"
      aria-label={data.title}
    >
      {/* Detalle ornamental en esquinas */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#9a7d45]/40" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#9a7d45]/40" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#9a7d45]/40" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#9a7d45]/40" />

      {/* Eyebrow */}
      <p className="text-[#9a7d45] font-serif tracking-[0.35em] text-xs uppercase mb-3 font-medium">
        {data.eyebrow}
      </p>

      {/* Título */}
      <h3 className="text-2xl md:text-3xl font-serif text-[#6f7c4e] leading-snug mb-4 max-w-xl mx-auto">
        {data.title}
      </h3>

      {/* Separador Diamante */}
      <div className="flex items-center justify-center gap-3 my-4">
        <div className="w-10 h-[1px] bg-[#9a7d45]/30" />
        <div className="w-2 h-2 rotate-45 border border-[#9a7d45]" />
        <div className="w-10 h-[1px] bg-[#9a7d45]/30" />
      </div>

      {/* Descripción */}
      <p className="text-[#2c3e50]/80 text-sm md:text-base leading-relaxed font-serif max-w-2xl mx-auto mb-5">
        {data.description}
      </p>

      {/* Highlight chip */}
      <p className="inline-block text-xs font-serif italic text-[#9a7d45] bg-[#fffbf0] border border-[#9a7d45]/20 py-1.5 px-4 mb-8">
        ✦ {data.highlight}
      </p>

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <ArticleWhatsAppButton
          categoria={categoria}
          articleTitle={articleTitle}
          locale={locale}
        />
        <Link
          href={reserveHref}
          className="btn-classic text-xs md:text-sm py-3 px-6"
        >
          {reserveLabel}
        </Link>
      </div>
    </motion.aside>
  );
}
