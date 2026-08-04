import type { Metadata } from "next";
import AscensoClient from "./AscensoClient";

export const metadata: Metadata = {
  title: "El Ascenso Sagrado | Day Tour Premium Cerro Tusa | La Juana",
  description: "Disfruta de El Ascenso Sagrado, un tour premium de un día con transporte privado desde Medellín, caminata guiada al Cerro Tusa, almuerzo típico, masajes y relax en piscina.",
  keywords: [
    "Day Tour Cerro Tusa",
    "El Ascenso Sagrado",
    "La Juana Cerro Tusa",
    "Senderismo Venecia Antioquia",
    "Finca de lujo Medellín",
    "Turismo de bienestar Antioquia"
  ],
  openGraph: {
    title: "El Ascenso Sagrado | Day Tour Premium Cerro Tusa | La Juana",
    description: "Camine una montaña mítica, relájese en una finca de lujo con masajes y piscina. Un día todo incluido inolvidable.",
    images: [
      {
        url: "/eco tours/SaveClip.App_522169608_18051317933624494_6236629626133625721_n.jpg",
        width: 1200,
        height: 630,
        alt: "Cerro Tusa y Finca La Juana",
      }
    ],
    type: "website",
  }
};

export default function AscensoSagradoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Tour",
    "name": "El Ascenso Sagrado (Day Tour Premium)",
    "description": "Sube una montaña mítica, nada en una finca campestre y descubre un pueblo que los turistas nunca encuentran, todo en un día épico.",
    "image": "https://lajuanacerrotusa.com/eco%20tours/SaveClip.App_522169608_18051317933624494_6236629626133625721_n.jpg",
    "duration": "PT12H",
    "typicalAgeRange": "18-60",
    "touristType": ["Adventure travelers", "Wellness seekers", "Nature lovers"],
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
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "165",
      "highPrice": "195",
      "offerCount": "2",
      "price": "165",
      "priceValidUntil": "2027-12-31",
      "url": "https://lajuanacerrotusa.com/tours/ascenso-sagrado",
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
      "numberOfItems": 7,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Recogida en Medellín en transporte privado" },
        { "@type": "ListItem", "position": 2, "name": "Desayuno tradicional en Cocorollo (variante Caldas)" },
        { "@type": "ListItem", "position": 3, "name": "Llegada a La Juana y café de bienvenida" },
        { "@type": "ListItem", "position": 4, "name": "Ascenso guiado al Cerro Tusa (Parque Comfama)" },
        { "@type": "ListItem", "position": 5, "name": "Almuerzo típico en restaurante del parque (Graciela)" },
        { "@type": "ListItem", "position": 6, "name": "Tarde de bienestar en La Juana (piscina, jacuzzi, turco y masaje con fisioterapeuta)" },
        { "@type": "ListItem", "position": 7, "name": "Regreso privado a hotel en Medellín" }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "ratingCount": "32"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "John Doe" },
        "datePublished": "2026-05-15",
        "reviewBody": "Una de las mejores experiencias que he tenido en Colombia. El ascenso al cerro es retador pero las vistas y la posterior relajación en la finca con masajes son insuperables.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Sarah Miller" },
        "datePublished": "2026-05-20",
        "reviewBody": "Excelente servicio, la logística impecable y el masaje del fisioterapeuta fue clave después de subir el Cerro Tusa.",
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
      <AscensoClient />
    </>
  );
}
