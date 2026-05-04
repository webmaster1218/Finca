import dynamic from "next/dynamic";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";

// Below-the-fold: loaded lazily to reduce initial JS bundle
const CerroTusaFeature = dynamic(() =>
  import("../components/CerroTusaFeature").then((m) => m.CerroTusaFeature)
);
const Experiences = dynamic(() =>
  import("../components/Experiences").then((m) => m.Experiences)
);
const EcoTours = dynamic(() =>
  import("../components/EcoTours").then((m) => m.EcoTours)
);
const Rooms = dynamic(() =>
  import("../components/Rooms").then((m) => m.Rooms)
);
const Gallery = dynamic(() =>
  import("../components/Gallery").then((m) => m.Gallery)
);
const Testimonials = dynamic(() =>
  import("../components/Testimonials").then((m) => m.Testimonials)
);
const Location = dynamic(() =>
  import("../components/Location").then((m) => m.Location)
);
const Footer = dynamic(() =>
  import("../components/Footer").then((m) => m.Footer)
);
const ChatWidget = dynamic(() => import("../components/ChatWidgetLoader"));

export default function Home() {
  return (
    <main className="min-h-screen">
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
      <ChatWidget />
    </main>
  );
}
