import type { Metadata } from "next";
import RetiroClient from "./RetiroClient";

export const metadata: Metadata = {
  title: "El Retiro de la Diosa del Espejo | Stay & Climb 2D/1N Cerro Tusa | La Juana",
  description: "Vive el Retiro de la Diosa del Espejo: 2 días de aventura, estadía en finca de lujo La Juana, ascenso a Cerro Tusa, fogata, yoga, masajes y tour cultural por Venecia.",
  keywords: [
    "Retiro Diosa del Espejo",
    "Stay & Climb Cerro Tusa",
    "La Juana Cerro Tusa",
    "Estadía de lujo Venecia",
    "Yoga Venecia Antioquia",
    "Senderismo y Bienestar"
  ],
  openGraph: {
    title: "El Retiro de la Diosa del Espejo | Stay & Climb 2D/1N Cerro Tusa | La Juana",
    description: "Escala Cerro Tusa de día, descansa en una finca de lujo de noche. Fogata, yoga, masajes y todo incluido.",
    images: [
      {
        url: "/imagenes/experiences/IMG_5111.webp",
        width: 1200,
        height: 630,
        alt: "Estadía y Bienestar en La Juana Finca",
      }
    ],
    type: "website",
  }
};

export default function RetiroDiosaEspejoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Tour",
    "name": "El Retiro de la Diosa del Espejo (Stay & Climb 2D/1N)",
    "description": "Escala una montaña mítica de día. Duerme en una finca campestre de noche. Vive Colombia como nunca antes.",
    "image": "https://lajuanacerrotusa.com/imagenes/experiences/IMG_5111.webp",
    "duration": "P2D",
    "typicalAgeRange": "18-60",
    "touristType": ["Adventure travelers", "Wellness seekers", "Cultural travelers"],
    "startLocation": {
      "@type": "Place",
      "name": "Medellín (Recogida en Hotel)",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Medellín",
        "addressRegion": "Antioquia",
        "addressCountry": "CO"
      }
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "445",
      "priceValidUntil": "2027-12-31",
      "url": "https://lajuanacerrotusa.com/tours/retiro-diosa-espejo",
      "availability": "https://schema.org/InStock"
    },
    "provider": {
      "@type": "TravelAgency",
      "name": "La Juana Cerro Tusa",
      "telephone": "+573244887171",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Parcelación Rochiles",
        "addressLocality": "Venecia",
        "addressRegion": "Antioquia",
        "addressCountry": "CO"
      }
    },
    "itinerary": {
      "@type": "ItemList",
      "numberOfItems": 12,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Recogida y viaje desde Medellín" },
        { "@type": "ListItem", "position": 2, "name": "Desayuno regional en Cocorollo" },
        { "@type": "ListItem", "position": 3, "name": "Llegada a La Juana y bebida de bienvenida" },
        { "@type": "ListItem", "position": 4, "name": "Ascenso al Cerro Tusa con guía Comfama" },
        { "@type": "ListItem", "position": 5, "name": "Almuerzo típico en restaurante del parque (Graciela)" },
        { "@type": "ListItem", "position": 6, "name": "Tarde de masajes y piscina en La Juana" },
        { "@type": "ListItem", "position": 7, "name": "Cena gourmet en La Juana" },
        { "@type": "ListItem", "position": 8, "name": "Fogata nocturna con vino y malvaviscos" },
        { "@type": "ListItem", "position": 9, "name": "Clase matutina de yoga y meditación" },
        { "@type": "ListItem", "position": 10, "name": "Desayuno en la finca" },
        { "@type": "ListItem", "position": 11, "name": "Tour cultural por el pueblo de Venecia y almuerzo con Graciela" },
        { "@type": "ListItem", "position": 12, "name": "Regreso privado a hotel en Medellín" }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "bestRating": "5",
      "ratingCount": "18"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "David Carter" },
        "datePublished": "2026-05-10",
        "reviewBody": "Un fin de semana inolvidable. Subir el cerro es retador pero el yoga de la mañana siguiente y la fogata bajo las estrellas valieron cada centavo. Trato de lujo.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Emily Watson" },
        "datePublished": "2026-05-28",
        "reviewBody": "La finca es preciosa y el tour por el pueblo de Venecia fue encantador. Alejo y su equipo coordinaron todo a la perfección.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RetiroClient />
    </>
  );
}
