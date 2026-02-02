import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Gallery } from "../components/Gallery";
import { Experiences } from "../components/Experiences";
import { CerroTusaFeature } from "../components/CerroTusaFeature";
import { Rooms } from "../components/Rooms";
import { EcoTours } from "../components/EcoTours";
import { Location } from "../components/Location";
import { Testimonials } from "../components/Testimonials";
import { Footer } from "../components/Footer";
import { WhatsAppFloating } from "../components/WhatsAppFloating";

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
      <WhatsAppFloating />
    </main>
  );
}
