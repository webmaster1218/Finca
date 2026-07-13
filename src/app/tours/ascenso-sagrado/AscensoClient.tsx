"use client";

import { motion } from "framer-motion";
import { Clock, Users, ArrowLeft, Check, X, ShieldAlert, Star, MessageSquare, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import { useLanguage } from "../../../context/LanguageContext";

export default function AscensoClient() {
  const { t, language } = useLanguage();

  const whatsappNumber = "573244887171";
  const wppMessage = language === 'es'
    ? "Hola Alejo, me interesa el tour 'El Ascenso Sagrado (Day Tour Premium)'. ¿Me podrías dar información sobre disponibilidad y reservas?"
    : "Hi Alejo, I'm interested in the 'The Sacred Ascent (Day Tour Premium)' tour. Could you provide details about availability and bookings?";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(wppMessage)}`;

  const itinerary = [
    { time: "6:00 am", actES: "Recogida en Medellín", detES: "Transporte privado desde tu hotel (El Poblado o Laureles).", actEN: "Hotel Pickup in Medellín", detEN: "Private transport from your hotel (Poblado/Laureles)." },
    { time: "7:00 am - 7:30 am", actES: "Desayuno en Cocorollo", detES: "Delicioso desayuno típico antioqueño en la variante Caldas.", actEN: "Breakfast at Cocorollo", detEN: "Authentic traditional breakfast on the Caldas route." },
    { time: "9:00 am", actES: "Llegada a La Juana", detES: "Café de bienvenida y preparación. Dejamos el equipaje.", actEN: "Arrival at La Juana", detEN: "Welcome coffee and briefing. Store your luggage." },
    { time: "9:30 am - 2:00 pm", actES: "Ascenso al Cerro Tusa", detES: "Expedición guiada por el Parque Comfama (4-5 horas). Vistas 360° en la cima.", actEN: "Ascent to Cerro Tusa", detEN: "Guided climb led by Comfama park guides (~4-5 hours). Panoramic 360° summit views." },
    { time: "2:00 pm - 3:00 pm", actES: "Almuerzo regional", detES: "Almuerzo típico en el restaurante de Graciela en la base del parque.", actEN: "Regional Lunch", detEN: "Traditional local lunch at Graciela restaurant at the park entrance." },
    { time: "3:30 pm - 5:00 pm", actES: "Wellness en La Juana", detES: "Piscina, zonas húmedas y sesión de masaje con fisioterapeuta profesional.", actEN: "Wellness at La Juana", detEN: "Relaxing afternoon at the pools, wet areas, and a therapeutic massage." },
    { time: "5:00 pm - 7:00 pm", actES: "Regreso a Medellín", detES: "Transporte privado directo a tu hotel (sujeto a tráfico).", actEN: "Return to Medellín", detEN: "Private transport back to your hotel in Medellín." }
  ];

  const reviews = [
    { name: "John Doe", rating: 5, date: "15 May 2026", textES: "Una de las mejores experiencias que he tenido en Colombia. El ascenso al cerro es retador pero las vistas y la posterior relajación en la finca con masajes son insuperables.", textEN: "One of the best experiences I have had in Colombia. The climb is challenging but the views and the subsequent relaxation at the estate with massages are outstanding." },
    { name: "Sarah Miller", rating: 5, date: "20 May 2026", textES: "Excelente servicio, la logística impecable y el masaje del fisioterapeuta fue clave después de subir el Cerro Tusa. ¡Recomendadísimo!", textEN: "Excellent service, logistics were flawless and the therapist's massage was key after hiking Cerro Tusa. Highly recommended!" }
  ];

  const includes = [
    t('tours.ascenso.included').split(", ").map(item => item.trim())
  ][0];

  const notIncludesES = ["Propinas", "Bebidas alcohólicas", "Gastos personales"];
  const notIncludesEN = ["Tips / Gratuities", "Alcoholic beverages", "Personal expenses"];

  return (
    <main className="min-h-screen bg-[#fffbf0] overflow-x-hidden">
      <Navbar />

      {/* Taller Premium Hero (Responsive and overflow-visible) */}
      <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center justify-center text-center py-20 md:py-28 overflow-visible">
        {/* Background Image Container with isolated overflow-hidden */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/eco tours/SaveClip.App_522169608_18051317933624494_6236629626133625721_n.jpg"
            alt="El Ascenso Sagrado Cerro Tusa"
            fill
            priority
            className="object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/35 z-[1]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-brand-cream mt-10 md:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Link href="/#tours" className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#fffbf0]/80 hover:text-brand-cream transition-colors mb-4 md:mb-6 font-serif">
              <ArrowLeft className="w-4 h-4" /> {language === 'es' ? 'Volver a Experiencias' : 'Back to Experiences'}
            </Link>
            <span className="text-[10px] md:text-sm uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#9a7d45] block mb-3 md:mb-4 font-serif">
              ALL-INCLUSIVE DAY TOUR
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-serif text-brand-cream mb-4 md:mb-6 leading-tight drop-shadow-xl">
              {t('tours.ascenso.title')}
            </h1>
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl font-serif italic text-brand-cream/80 max-w-3xl mx-auto font-light leading-relaxed px-2 md:px-0">
              "{t('tours.ascenso.tagline')}"
            </p>
          </motion.div>
        </div>

        {/* Floating Quick Summary Bar - Desktop only */}
        <div className="absolute bottom-0 left-0 right-0 z-20 max-w-6xl mx-auto px-6 transform translate-y-1/2 hidden md:block">
          <div className="bg-[#fffbf0] border border-[#9a7d45]/20 shadow-2xl grid grid-cols-3 divide-x divide-[#9a7d45]/20 p-8 text-center backdrop-blur-md">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#9a7d45] block mb-1">{t('tours.duracion')}</span>
              <span className="text-xl font-serif text-[#6f7c4e] font-bold">{t('tours.ascenso.duration')}</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#9a7d45] block mb-1">{language === 'es' ? 'Grupo Máximo' : 'Max Capacity'}</span>
              <span className="text-xl font-serif text-[#6f7c4e] font-bold">{t('tours.ascenso.capacity')}</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#9a7d45] block mb-1">{language === 'es' ? 'Tarifa Especial' : 'Special Rate'}</span>
              <span className="text-xl font-serif text-[#6f7c4e] font-bold">$165 USD <span className="text-xs text-slate-500 font-sans">/ pax (4+ pax)</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Quick Summary Bar */}
      <div className="px-6 -mt-8 relative z-20 md:hidden">
        <div className="bg-[#fffbf0] border border-[#9a7d45]/20 shadow-xl grid grid-cols-3 divide-x divide-[#9a7d45]/20 p-4 text-center">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#9a7d45] block mb-1">{t('tours.duracion')}</span>
            <span className="text-xs sm:text-sm font-serif text-[#6f7c4e] font-bold block">{t('tours.ascenso.duration')}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#9a7d45] block mb-1">{language === 'es' ? 'Grupo Máximo' : 'Max Capacity'}</span>
            <span className="text-xs sm:text-sm font-serif text-[#6f7c4e] font-bold block">{t('tours.ascenso.capacity')}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#9a7d45] block mb-1">{language === 'es' ? 'Tarifa Especial' : 'Special Rate'}</span>
            <span className="text-xs sm:text-sm font-serif text-[#6f7c4e] font-bold block">$165 USD <span className="text-[8px] text-slate-500 font-sans block sm:inline">/ (4+ pax)</span></span>
          </div>
        </div>
      </div>

      {/* Section 1: Introduction & Stats (Cream Background) */}
      <section className="pt-16 md:pt-32 pb-16 md:pb-24 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-8">
            <span className="text-[#9a7d45] font-serif tracking-[0.3em] text-xs uppercase block">THE ASCENT OF A LEGEND</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#6f7c4e] leading-tight">
              {language === 'es' ? 'Conecta con la Magia Ancestral' : 'Connect with Ancestral Magic'}
            </h2>
            <div className="w-20 h-[1px] bg-[#9a7d45]" />
            <p className="text-slate-800 leading-relaxed text-lg font-serif italic font-light">
              {t('tours.ascenso.desc')}
            </p>

            <div className="p-6 bg-amber-50 border-l-4 border-amber-500 flex items-start gap-4">
              <ShieldAlert className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-serif text-amber-900 font-bold mb-1">{t('tours.details.restrictions')}</h4>
                <p className="text-amber-800 text-sm leading-relaxed">{t('tours.details.restrictions_desc')}</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 relative h-[300px] md:h-[420px] shadow-2xl border border-[#9a7d45]/20 group">
            <Image
              src="/imagenes/experiences/IMG_5181.webp"
              alt="Experience La Juana"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
            <div className="absolute bottom-6 left-6 bg-[#fffbf0] p-6 shadow-xl border-t-2 border-[#9a7d45]">
              <span className="text-xs uppercase text-[#9a7d45] tracking-widest block mb-1">DESTINATION</span>
              <span className="font-serif text-[#6f7c4e] text-xl font-bold">Venecia, Antioquia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Gallery Section */}
      <section className="py-24 bg-white border-t border-[#9a7d45]/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs uppercase text-[#9a7d45] tracking-[0.4em] font-serif block">
              {language === 'es' ? 'GALERÍA DE LA EXPERIENCIA' : 'EXPERIENCE GALLERY'}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-green">
              {language === 'es' ? 'El Viaje a Través de tus Ojos' : 'The Journey Through Your Eyes'}
            </h2>
            <div className="w-16 h-[1px] bg-[#9a7d45] mx-auto" />
            <p className="text-slate-600 max-w-2xl mx-auto font-sans font-light text-sm leading-relaxed">
              {language === 'es'
                ? 'Descubre cada detalle del día más completo de aventura y relax en Antioquia.'
                : 'Discover every detail of the most complete day of adventure and relaxation in Antioquia.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative h-64 md:h-80 overflow-hidden group shadow-lg border border-[#9a7d45]/10">
              <Image
                src="/eco tours/SaveClip.App_522169608_18051317933624494_6236629626133625721_n.jpg"
                alt="Cerro Tusa Summit"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-6 left-6 text-brand-cream">
                <span className="text-[10px] uppercase tracking-widest text-[#9a7d45] font-serif block mb-1">
                  {language === 'es' ? 'SENDERISMO' : 'HIKING'}
                </span>
                <h3 className="text-xl font-serif">{language === 'es' ? 'La Cima del Cerro Tusa' : 'Cerro Tusa Summit'}</h3>
              </div>
            </div>

            <div className="relative h-64 md:h-80 overflow-hidden group shadow-lg border border-[#9a7d45]/10">
              <Image
                src="/imagenes/experiences/IMG_5181.webp"
                alt="Path to Cerro Tusa"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-6 left-6 text-brand-cream">
                <span className="text-[10px] uppercase tracking-widest text-[#9a7d45] font-serif block mb-1">
                  {language === 'es' ? 'AVENTURA' : 'ADVENTURE'}
                </span>
                <h3 className="text-xl font-serif">{language === 'es' ? 'El Camino Ancestral' : 'The Ancestral Path'}</h3>
              </div>
            </div>

            <div className="relative h-64 md:h-80 overflow-hidden group shadow-lg border border-[#9a7d45]/10">
              <Image
                src="/imagenes/espacios/IMG_5220.webp"
                alt="Piscina La Juana"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-6 left-6 text-brand-cream">
                <span className="text-[10px] uppercase tracking-widest text-[#9a7d45] font-serif block mb-1">
                  {language === 'es' ? 'RELAX' : 'RELAXATION'}
                </span>
                <h3 className="text-xl font-serif">{language === 'es' ? 'Piscina de Lujo' : 'Luxury Pool'}</h3>
              </div>
            </div>

            <div className="relative h-64 md:h-80 overflow-hidden group shadow-lg border border-[#9a7d45]/10">
              <Image
                src="/imagenes/experiences/IMG_5132.webp"
                alt="Massage Therapy"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-6 left-6 text-brand-cream">
                <span className="text-[10px] uppercase tracking-widest text-[#9a7d45] font-serif block mb-1">
                  {language === 'es' ? 'BIENESTAR' : 'WELLNESS'}
                </span>
                <h3 className="text-xl font-serif">{language === 'es' ? 'Masaje con Fisioterapeuta' : 'Therapist Massage'}</h3>
              </div>
            </div>

            <div className="relative h-64 md:h-80 overflow-hidden group shadow-lg border border-[#9a7d45]/10">
              <Image
                src="/imagenes/espacios/IMG_5223.webp"
                alt="Wet Zonas"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-6 left-6 text-brand-cream">
                <span className="text-[10px] uppercase tracking-widest text-[#9a7d45] font-serif block mb-1">
                  {language === 'es' ? 'SPA' : 'SPA'}
                </span>
                <h3 className="text-xl font-serif">{language === 'es' ? 'Zonas Húmedas' : 'Wet Areas & Jacuzzi'}</h3>
              </div>
            </div>

            <div className="relative h-64 md:h-80 overflow-hidden group shadow-lg border border-[#9a7d45]/10">
              <Image
                src="/imagenes/espacios/IMG_5242.webp"
                alt="La Juana Panoramic View"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-6 left-6 text-brand-cream">
                <span className="text-[10px] uppercase tracking-widest text-[#9a7d45] font-serif block mb-1">
                  {language === 'es' ? 'VISTAS' : 'VIEWS'}
                </span>
                <h3 className="text-xl font-serif">{language === 'es' ? 'Atardecer en la Finca' : 'Sunset at the Estate'}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Itinerary (Beautiful Dark Green Background, Wide & Spacious) */}
      <section className="bg-[#6f7c4e] py-16 md:py-32 text-brand-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#9a7d45]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/25 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <span className="text-[#fffbf0]/60 font-serif tracking-[0.4em] text-xs uppercase block mb-4">{language === 'es' ? 'PASO A PASO' : 'CHRONOLOGY'}</span>
            <h2 className="text-4xl md:text-6xl font-serif text-[#fffbf0]">
              {t('tours.details.itinerary')}
            </h2>
            <div className="w-16 h-[1px] bg-[#fffbf0]/40 mx-auto mt-6" />
          </div>

          {/* Timeline Layout */}
          <div className="relative border-l border-[#fffbf0]/30 ml-4 md:ml-12 space-y-16">
            {itinerary.map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-10 md:pl-16 group"
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-[#fffbf0] rounded-full border-4 border-[#6f7c4e] group-hover:scale-125 transition-transform" />
                <span className="text-sm font-serif text-[#fffbf0]/80 tracking-[0.2em] font-bold uppercase">{item.time}</span>
                <h3 className="text-2xl md:text-3xl font-serif text-brand-cream mt-1 group-hover:text-[#fffbf0]/90 transition-colors">
                  {language === 'es' ? item.actES : item.actEN}
                </h3>
                <p className="text-brand-cream/70 text-base mt-2 leading-relaxed max-w-3xl font-light">
                  {language === 'es' ? item.detES : item.detEN}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Premium Tour Specifications & Unified Trip Board */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#fffbf0] to-[#f7f4eb] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-[#6f7c4e]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#9a7d45]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs uppercase text-[#9a7d45] tracking-[0.4em] font-serif block">TECHNICAL DATA</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-green">
              {language === 'es' ? 'Especificaciones del Tour' : 'Tour Specifications'}
            </h2>
            <div className="w-16 h-[1px] bg-[#9a7d45] mx-auto" />
          </div>

          {/* Grid of Key Technical Specs Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-[#fffbf0] border border-[#9a7d45]/20 p-6 md:p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-brand-green/10 flex items-center justify-center text-[#6f7c4e] mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-[#6f7c4e] text-lg font-bold mb-2">
                  {language === 'es' ? 'Duración Completa' : 'Full Duration'}
                </h4>
                <p className="text-slate-600 text-sm font-sans font-light leading-relaxed">
                  {language === 'es'
                    ? '12 Horas de aventura puerta a puerta desde Medellín.'
                    : '12 Hours of door-to-door adventure from Medellín.'}
                </p>
              </div>
              <div className="text-[#9a7d45] text-xs font-bold font-serif tracking-widest mt-6">
                {t('tours.ascenso.duration')}
              </div>
            </div>

            <div className="bg-[#fffbf0] border border-[#9a7d45]/20 p-6 md:p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-brand-green/10 flex items-center justify-center text-[#6f7c4e] mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-[#6f7c4e] text-lg font-bold mb-2">
                  {language === 'es' ? 'Capacidad de Grupo' : 'Group Capacity'}
                </h4>
                <p className="text-slate-600 text-sm font-sans font-light leading-relaxed">
                  {language === 'es'
                    ? 'Grupos pequeños y exclusivos para garantizar seguridad y confort.'
                    : 'Small and exclusive groups to guarantee safety and comfort.'}
                </p>
              </div>
              <div className="text-[#9a7d45] text-xs font-bold font-serif tracking-widest mt-6">
                {t('tours.ascenso.capacity')}
              </div>
            </div>

            <div className="bg-[#fffbf0] border border-[#9a7d45]/20 p-6 md:p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-brand-green/10 flex items-center justify-center text-[#6f7c4e] mb-6 group-hover:scale-110 transition-transform text-red-700">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-[#6f7c4e] text-lg font-bold mb-2">
                  {language === 'es' ? 'Nivel de Exigencia' : 'Difficulty Level'}
                </h4>
                <p className="text-slate-600 text-sm font-sans font-light leading-relaxed">
                  {language === 'es'
                    ? 'Hike exigente en Cerro Tusa con pendientes inclinadas de hasta 70%.'
                    : 'Challenging hike in Cerro Tusa with steep slopes of up to 70%.'}
                </p>
              </div>
              <div className="text-red-700 text-xs font-bold font-serif tracking-widest mt-6 uppercase">
                {language === 'es' ? 'Nivel 5 - Alto' : 'Level 5 - Hard'}
              </div>
            </div>

            <div className="bg-[#fffbf0] border border-[#9a7d45]/20 p-6 md:p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-brand-green/10 flex items-center justify-center text-[#6f7c4e] mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-brand-green text-lg font-bold mb-2">
                  {language === 'es' ? 'Ubicación de Destino' : 'Destination Location'}
                </h4>
                <p className="text-slate-600 text-sm font-sans font-light leading-relaxed">
                  {language === 'es'
                    ? 'Municipio de Venecia en el Suroeste Antioqueño.'
                    : 'Venecia municipality in Southwest Antioquia.'}
                </p>
              </div>
              <div className="text-[#9a7d45] text-xs font-bold font-serif tracking-widest mt-6 uppercase">
                Venecia, Antioquia
              </div>
            </div>
          </div>

          {/* Unified Inclusions & Exclusions Card */}
          <div className="bg-white border-t-4 border-[#9a7d45] shadow-2xl p-8 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

              {/* Left Column: What is Included (2/3 width) */}
              <div className="lg:col-span-8 space-y-8">
                <div className="space-y-3">
                  <span className="text-xs uppercase text-[#9a7d45] tracking-widest font-serif block">ALL-INCLUSIVE PREMIUM</span>
                  <h3 className="text-3xl font-serif text-brand-green">
                    {language === 'es' ? 'Todo lo que Incluye tu Viaje' : 'Everything Included in Your Trip'}
                  </h3>
                  <div className="w-12 h-[1px] bg-[#9a7d45]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  {includes.map((inc, i) => (
                    <div key={i} className="flex gap-3 items-start text-slate-700 hover:translate-x-1 transition-transform duration-200">
                      <span className="w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green text-xs shrink-0 mt-0.5 font-bold">✓</span>
                      <span className="text-sm font-sans font-light leading-relaxed capitalize">{inc}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-8 mt-8 space-y-6">
                  <h4 className="font-serif text-brand-green text-lg font-bold">
                    {language === 'es' ? 'Preparación e Información del Recorrido' : 'Preparation & Route Information'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h5 className="font-serif text-[#9a7d45] text-xs font-bold uppercase tracking-wider">
                        {language === 'es' ? 'Qué llevar (Recomendado)' : 'What to Bring (Recommended)'}
                      </h5>
                      <ul className="space-y-2 text-sm text-slate-600 font-sans font-light">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9a7d45]"></span>
                          {language === 'es' ? 'Mínimo 2 litros de agua por persona' : 'Minimum 2 liters of water per person'}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9a7d45]"></span>
                          {language === 'es' ? 'Calzado con excelente agarre o botas de montaña' : 'High-grip hiking boots or shoes'}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9a7d45]"></span>
                          {language === 'es' ? 'Ropa cómoda y ligera (licras o deportivo)' : 'Comfortable, lightweight athletic wear'}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9a7d45]"></span>
                          {language === 'es' ? 'Bloqueador solar y repelente de insectos' : 'Sunscreen and insect repellent'}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9a7d45]"></span>
                          {language === 'es' ? 'Morral pequeño y liviano' : 'Small and lightweight backpack'}
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h5 className="font-serif text-[#9a7d45] text-xs font-bold uppercase tracking-wider">
                        {language === 'es' ? 'Puntos Clave del Sendero' : 'Key Trail Highlights'}
                      </h5>
                      <ul className="space-y-2 text-sm text-slate-600 font-sans font-light">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9a7d45]"></span>
                          {language === 'es' ? 'Altar de Ofrendas de los Zenúfanas' : 'Zenúfana Altar of Offerings'}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9a7d45]"></span>
                          {language === 'es' ? 'Avistamiento de la Diosa del Espejo' : 'Mirror Goddess Viewpoint'}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9a7d45]"></span>
                          {language === 'es' ? 'Piedra del Eco y Jardín de Rocas' : 'Echo Stone & Rock Garden'}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9a7d45]"></span>
                          {language === 'es' ? 'Cima piramidal con vista de 360 grados' : 'Pyramid summit with 360-degree views'}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Exclusions & Technical Info (1/3 width) */}
              <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-slate-100 pt-8 lg:pt-0 lg:pl-8 space-y-8">
                {/* Exclusions */}
                <div className="space-y-4">
                  <h4 className="font-serif text-red-800 text-lg uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-800 text-xs font-bold">✗</span>
                    {t('tours.details.what_not_includes')}
                  </h4>
                  <ul className="space-y-2">
                    {(language === 'es' ? notIncludesES : notIncludesEN).map((exc, i) => (
                      <li key={i} className="text-sm text-slate-500 font-light flex items-center gap-2">
                        <span className="text-red-400">•</span>
                        {exc}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Facts */}
                <div className="border-t border-slate-100 pt-6 space-y-4">
                  <h4 className="font-serif text-brand-green text-xs uppercase tracking-widest font-bold">
                    {language === 'es' ? 'Información de Operación' : 'Operation Details'}
                  </h4>
                  <div className="space-y-3 text-xs text-slate-600 font-light leading-relaxed">
                    <div className="flex justify-between border-b border-slate-100 pb-1.5">
                      <strong className="text-slate-700">{language === 'es' ? 'Alianza:' : 'Partnership:'}</strong>
                      <span>Comfama Cerro Tusa</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-1.5">
                      <strong className="text-slate-700">{language === 'es' ? 'Alimentación:' : 'Meals:'}</strong>
                      <span>Cocorollo & Graciela</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-1.5">
                      <strong className="text-slate-700">{language === 'es' ? 'Idioma Guía:' : 'Guide Lang:'}</strong>
                      <span>Bilingual (ES/EN)</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Additional Tour Information Section (Visually Rich Timeline) */}
          <div className="mt-20 border-t border-[#9a7d45]/20 pt-16">
            <div className="text-center mb-12">
              <span className="text-[#9a7d45] font-serif tracking-[0.3em] text-xs uppercase block mb-2">
                {language === 'es' ? 'CRÓNICA VISUAL' : 'VISUAL CHRONICLE'}
              </span>
              <h3 className="text-3xl md:text-4xl font-serif text-brand-green">
                {language === 'es' ? 'La Experiencia Paso a Paso' : 'The Step-by-Step Experience'}
              </h3>
              <div className="w-12 h-[1px] bg-[#9a7d45] mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-[#9a7d45]/15 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden">
                <div className="relative w-full h-[220px] overflow-hidden shrink-0">
                  <Image
                    src="/eco tours/SaveClip.App_522169608_18051317933624494_6236629626133625721_n.jpg"
                    alt="Ascenso al Cerro"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-brand-green text-brand-cream px-3 py-1 font-serif text-xs uppercase tracking-wider">
                    {language === 'es' ? 'Mañana - Aventura' : 'Morning - Adventure'}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="font-serif text-brand-green text-lg font-bold">
                      {language === 'es' ? '1. El Ascenso Místico' : '1. The Mystical Ascent'}
                    </h4>
                    <p className="text-slate-600 text-sm font-sans font-light leading-relaxed">
                      {language === 'es'
                        ? 'Sube la pirámide natural con guías expertos. Caminata guiada de 4 a 5 horas por senderos cargados de historia ancestral Zenúfana.'
                        : 'Climb the natural pyramid with expert guides. A guided 4-5 hour hike on paths steeped in Zenúfana ancestral history.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#9a7d45]/15 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden">
                <div className="relative w-full h-[220px] overflow-hidden shrink-0">
                  <Image
                    src="/imagenes/experiences/IMG_5609.webp"
                    alt="Almuerzo tipico"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-brand-green text-brand-cream px-3 py-1 font-serif text-xs uppercase tracking-wider">
                    {language === 'es' ? 'Mediodía - Sabor' : 'Midday - Flavor'}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="font-serif text-brand-green text-lg font-bold">
                      {language === 'es' ? '2. Almuerzo Tradicional' : '2. Traditional Lunch'}
                    </h4>
                    <p className="text-slate-600 text-sm font-sans font-light leading-relaxed">
                      {language === 'es'
                        ? 'Disfruta de un banquete típico regional en el restaurante tradicional de Graciela al descender, recargando energías al estilo antioqueño.'
                        : 'Enjoy a typical regional banquet at Graciela\'s traditional restaurant upon descent, recharging energies Antioquian style.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#9a7d45]/15 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden">
                <div className="relative w-full h-[220px] overflow-hidden shrink-0">
                  <Image
                    src="/imagenes/espacios/IMG_5220.webp"
                    alt="Relajación en La Juana"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-brand-green text-brand-cream px-3 py-1 font-serif text-xs uppercase tracking-wider">
                    {language === 'es' ? 'Tarde - Bienestar' : 'Afternoon - Wellness'}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="font-serif text-brand-green text-lg font-bold">
                      {language === 'es' ? '3. Spa & Relax Premium' : '3. Premium Spa & Relax'}
                    </h4>
                    <p className="text-slate-600 text-sm font-sans font-light leading-relaxed">
                      {language === 'es'
                        ? 'Concluye el día en La Juana: sesión completa de masajes con fisioterapeuta y acceso libre a piscina, jacuzzi y zonas húmedas.'
                        : 'Wrap up the day at La Juana: a full massage session with a therapist and free access to pool, jacuzzi, and wet areas.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Full-Width Call to Action / Booking Banner */}
      <section className="bg-[#6f7c4e] py-20 text-brand-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#9a7d45]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
          <div className="space-y-4">
            <span className="text-[#9a7d45] font-serif tracking-[0.2em] text-xs uppercase block">{language === 'es' ? 'RESERVAS Y DISPONIBILIDAD' : 'BOOKINGS'}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#fffbf0] leading-tight">
              {language === 'es' ? 'Reserva tu Aventura' : 'Book Your Adventure with Alejo'}
            </h2>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-brand-cream/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#9a7d45]" />
                <span>Venecia, Antioquia</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#9a7d45]" />
                <span>12 Horas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#fffbf0]">$195 / $165 USD</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 shrink-0 min-w-[280px]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full justify-center px-8 py-5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full font-sans transition-all border border-[#25D366]/30 shadow-2xl flex items-center gap-3 font-bold text-center uppercase tracking-wider"
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" className="shrink-0">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.38-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
              </svg>
              {t('tours.details.book')}
            </a>
            <p className="text-[10px] text-brand-cream/60 text-center leading-relaxed">
              {language === 'es'
                ? "* Mensajes directos de reserva e información a Alejo."
                : "* Direct booking and inquiry messages directly to Alejo."}
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Reviews (Cream background, centered block) */}
      <section className="bg-[#fffbf0] border-t border-[#9a7d45]/10 py-24">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-green">
              {t('tours.details.reviews')}
            </h2>
            <div className="w-12 h-[1px] bg-[#9a7d45] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((rev, index) => (
              <div key={index} className="p-8 bg-white border border-[#9a7d45]/20 shadow-lg flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-base italic leading-relaxed">
                    "{language === 'es' ? rev.textES : rev.textEN}"
                  </p>
                </div>
                <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center text-xs text-slate-500">
                  <span className="font-bold text-brand-green">{rev.name}</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
