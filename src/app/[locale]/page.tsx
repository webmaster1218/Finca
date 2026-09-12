import dynamic from "next/dynamic";
import { Navbar } from "../../components/Navbar";
import { Hero } from "../../components/Hero";

// Below-the-fold: loaded lazily to reduce initial JS bundle
const CerroTusaFeature = dynamic(() =>
  import("../../components/CerroTusaFeature").then((m) => m.CerroTusaFeature)
);
const Experiences = dynamic(() =>
  import("../../components/Experiences").then((m) => m.Experiences)
);
const EcoTours = dynamic(() =>
  import("../../components/EcoTours").then((m) => m.EcoTours)
);
const Rooms = dynamic(() =>
  import("../../components/Rooms").then((m) => m.Rooms)
);
const Gallery = dynamic(() =>
  import("../../components/Gallery").then((m) => m.Gallery)
);
const Testimonials = dynamic(() =>
  import("../../components/Testimonials").then((m) => m.Testimonials)
);
const Location = dynamic(() =>
  import("../../components/Location").then((m) => m.Location)
);
const Footer = dynamic(() =>
  import("../../components/Footer").then((m) => m.Footer)
);

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: isEn
      ? "How to Book an Exclusive Stay or Tour at La Juana Cerro Tusa"
      : "Cómo reservar una estadía exclusiva o tour en La Juana Cerro Tusa",
    description: isEn
      ? "Step-by-step guide to reserving your luxury finca rental, glamping suite, or guided Cerro Tusa expedition."
      : "Guía paso a paso para reservar tu alquiler de finca de lujo, suite de glamping o tour guiado al Cerro Tusa.",
    step: [
      {
        "@type": "HowToStep",
        name: isEn ? "Choose Your Experience or Accommodation" : "Selecciona tu tipo de alojamiento o experiencia",
        text: isEn
          ? "Select between exclusive full finca rental (up to 20 guests), private luxury suites, or nature glamping with private jacuzzi."
          : "Elige entre el alquiler de la finca completa (hasta 20 personas), suites privadas de lujo o glamping con jacuzzi.",
        url: `https://lajuanacerrotusa.com/${locale}/#habitaciones`,
      },
      {
        "@type": "HowToStep",
        name: isEn ? "Add Guided Mountain Tours" : "Añade tours guiados a la montaña",
        text: isEn
          ? "Incorporate the Sacred Ascent to Cerro Tusa or the Mirror Goddess Wellness Retreat into your stay."
          : "Incorpora el Ascenso Sagrado al Cerro Tusa o el Retiro de Bienestar de la Diosa del Espejo a tu estadía.",
        url: `https://lajuanacerrotusa.com/${locale}/tours/ascenso-sagrado`,
      },
      {
        "@type": "HowToStep",
        name: isEn ? "Confirm Direct Reservation via WhatsApp" : "Confirma la reserva directa por WhatsApp",
        text: isEn
          ? "Contact our concierge directly to verify live dates, customize culinary options, and secure your booking."
          : "Contacta a nuestra anfitriona para verificar fechas en vivo, personalizar servicios y asegurar tu reserva.",
        url: `https://lajuanacerrotusa.com/${locale}`,
      },
    ],
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Navbar />
      <Hero />
      <CerroTusaFeature />
      <Experiences />
      <EcoTours />
      <Rooms />
      <Gallery />
      <Testimonials />
      <Location />
      <Footer />
    </main>
  );
}
