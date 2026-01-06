"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    es: {
        // Navbar
        'nav.finca': 'La Finca',
        'nav.experiences': 'Experiencias',
        'nav.testimonials': 'Testimonios',
        'nav.rooms': 'Habitaciones',
        'nav.location': 'Ubicación',
        'nav.reserve': 'Reservar',

        // Hero
        'hero.title': 'La Juana',
        'hero.subtitle': 'cerro tusa',
        'hero.location': 'Venecia, Antioquia',
        'hero.title_part1': 'Hospitalidad de',
        'hero.title_part2': 'Gran Tradición',
        'hero.subtitle_long': 'Donde las nubes abrazan los cafetales y el tiempo se detiene para honrar nuestras raíces.',
        'hero.cta': 'Descubrir la Experiencia',

        // Rooms Section
        'rooms.tag': 'Exclusividad Total',
        'rooms.title': 'Alquiler de Finca Completa',
        'rooms.desc.title': 'Alquila tu finca ya para una experiencia inolvidable junto a cerro tusa',
        'rooms.staff': 'Disfruta de <span class="text-[#9a7d45] font-bold">2 camareras</span> dedicadas a su confort y un <span class="text-[#9a7d45] font-bold">mayordomo</span> a su servicio. Seguridad, privacidad y naturaleza en un solo lugar.',
        'rooms.hospedaje': 'Hospedaje',

        // Amenities
        'amenity.rooms': '6 Habitaciones',
        'amenity.beds': '8 Camas',
        'amenity.baths': '6 Baños',
        'amenity.people': '16 Personas',
        'amenity.pool': 'Piscina - Jacuzzi - Turco',
        'amenity.water': 'Agua Potable',
        'amenity.parking': 'Párking Cubierto',
        'amenity.kiosk': 'Kiosco',
        'amenity.firepit': 'Fogata',
        'amenity.wifi': 'WiFi de alta velocidad',

        // Booking Card
        'booking.price': '$2.800.000 COP',
        'booking.night': 'noche',
        'booking.checkin': 'Llegada',
        'booking.checkout': 'Salida',
        'booking.guests': 'Huéspedes',
        'booking.button': 'Reserva',
        'booking.button.done': 'Reserva hecha',
        'booking.no_charge': 'No se hará ningún cargo por el momento',
        'booking.service_fee': 'Tarifa de servicio',
        'booking.total': 'Total',
        'booking.nights': 'noches',
        'booking.night_single': 'noche',
        'booking.guest_label': 'huésped',
        'booking.guests_label': 'huéspedes',
        'booking.infant_label': 'bebé',
        'booking.infants_label': 'bebés',
        'booking.pet_label': 'mascota',
        'booking.pets_label': 'mascotas',

        // Experiences
        'exp.tag': 'Aventuras y Tradición',
        'exp.title': 'Detalles que Enamoran',
        'exp.suites.title': 'Suites de Lujo',
        'exp.suites.desc': 'Habitaciones con encanto tradicional y confort moderno',
        'exp.eco.title': 'Jacuzzi Privado',
        'exp.eco.desc': 'Momentos de relax con vistas a la naturaleza',
        'exp.relax.title': 'Rincón de Descanso',
        'exp.relax.desc': 'Espacios íntimos diseñados para la serenidad',
        'exp.events.title': 'Piscina y Fogata',
        'exp.events.desc': 'El corazón de la diversión y el encuentro',
        'exp.diamond.title': 'Zona Social',
        'exp.diamond.desc': 'Ambientes compartidos llenos de tradición',

        // Cerro Tusa Feature
        'feature.tag': 'La Gran Pirámide Natural',
        'feature.title': 'Vistas que cuentan una historia',
        'feature.desc': '“Desde nuestra terraza, el horizonte se rinde ante la imponente silueta del **Cerro Tusa**, creando un espectáculo de sombras y luces que parece sacado de un sueño tradicional.”',
        'feature.cta': 'Ver mas sobre la finca',
        'feature.caption': '"El amanecer en lo más alto de Antioquia."',

        // Location
        'location.tag': 'Encuéntranos',
        'location.title': 'Nuestra Ubicación',
        'location.visit': 'Visítanos',
        'location.address_label': 'Dirección',
        'location.parcelacion': 'Parcelación Rochiles',
        'location.ref_label': 'Referencia',
        'location.ref_val': 'A 1.5Km del Parque Comfama cerro tusa',
        'location.google_btn': 'VER EN GOOGLE MAPS',

        // Footer
        'footer.contact': 'Contacto',
        'footer.navigation': 'Navegación',
        'footer.privacy': 'Privacidad',
        'footer.terms': 'Términos',
        'footer.policies': 'Políticas y Términos',
        'footer.rights': 'Todos los derechos reservados.',
        'footer.brand_desc': 'Donde la tradición antioqueña se encuentra con la exclusividad. Vive una experiencia inolvidable a la sombra del Cerro Tusa.',

        // Gallery
        'gallery.tag': 'Mosaico de Recuerdos',
        'gallery.title': 'Galería del Alma',
        'gallery.img1': 'Arquitectura Tradicional',
        'gallery.img2': 'Zonas Verdes',
        'gallery.img3': 'La Majestuosidad del Valle',
        'gallery.img4': 'Luces del Atardecer',
        'gallery.img5': 'Senderos de la Finca',
        'gallery.img6': 'Fachada Colonial',
        'gallery.img7': 'Naturaleza Viva',
        'gallery.img8': 'Entornos de Paz',
        'gallery.img9': 'Cielos de Venecia',

        // Testimonials
        'testimonials.tag': 'Voces de Nuestros Huéspedes',
        'testimonials.title': 'Historias Inolvidables',
        'testimonials.res1.text': '“Una experiencia que superó todas nuestras expectativas. La paz que se respira viendo el atardecer frente al Cerro Tusa no tiene precio. La casa es una joya arquitectónica con todas las comodidades modernas.”',
        'testimonials.res2.text': '“Buscábamos un lugar exclusivo para nuestro retiro directivo y Finca Fredonia fue el acierto total. El nivel de privacidad, la calidad del sonido pro y el entorno natural facilitaron un ambiente de trabajo único.”',
        'testimonials.res3.text': '“Los detalles que enamoran no son solo un nombre, es la realidad. Desde la lencería de las habitaciones hasta el aroma a café del Diamante, todo está pensado para el descanso absoluto. Un lujo total.”',

        // Policies
        'policies.hero_title': 'Políticas y Términos',
        'policies.privacy_title': 'Política de Privacidad',
        'policies.privacy_content': 'En La Juana cerro tusa, su privacidad es nuestra prioridad. Solo recopilamos la información necesaria para gestionar sus reservas y mejorar su experiencia. No compartimos sus datos con terceros sin su consentimiento explícito.',
        'policies.terms_title': 'Términos y Condiciones',
        'policies.terms_content': 'Las reservas están sujetas a disponibilidad y confirmación. El check-in es a las 3:00 PM y el check-out a las 11:00 AM. Se requiere un comportamiento respetuoso con el entorno natural y las instalaciones. Cancelaciones con menos de 48 horas pueden incurrir en cargos.',
        'policies.back_home': 'Volver al Inicio',

        // Common
        'common.available': 'Disponible',
        'common.occupied': 'Ocupado',
        'common.clear_dates': 'Borrar fechas',
        'common.close': 'Cerrar',
    },
    en: {
        // Navbar
        'nav.finca': 'The Ranch',
        'nav.experiences': 'Experiences',
        'nav.testimonials': 'Testimonials',
        'nav.rooms': 'Rooms',
        'nav.location': 'Location',
        'nav.reserve': 'Book Now',

        // Hero
        'hero.title': 'La Juana',
        'hero.subtitle': 'cerro tusa',
        'hero.location': 'Venecia, Antioquia',
        'hero.title_part1': 'Hospitality of',
        'hero.title_part2': 'Great Tradition',
        'hero.subtitle_long': 'Where clouds embrace the coffee fields and time stands still to honor our roots.',
        'hero.cta': 'Discover the Experience',

        // Rooms Section
        'rooms.tag': 'Total Exclusivity',
        'rooms.title': 'Full Property Rental',
        'rooms.desc.title': 'Rent your ranch now for an unforgettable experience next to Cerro Tusa',
        'rooms.staff': 'Enjoy <span class="text-[#9a7d45] font-bold">2 housekeepers</span> dedicated to your comfort and a <span class="text-[#9a7d45] font-bold">butler</span> at your service. Security, privacy, and nature in one place.',
        'rooms.hospedaje': 'Stay',

        // Amenities
        'amenity.rooms': '6 Bedrooms',
        'amenity.beds': '8 Beds',
        'amenity.baths': '6 Bathrooms',
        'amenity.people': '16 Guests',
        'amenity.pool': 'Pool - Jacuzzi - Steam Room',
        'amenity.water': 'Potable Water',
        'amenity.parking': 'Covered Parking',
        'amenity.kiosk': 'Kiosk',
        'amenity.firepit': 'Fire Pit',
        'amenity.wifi': 'High-speed WiFi',

        // Booking Card
        'booking.price': '$2,800,000 COP',
        'booking.night': 'night',
        'booking.checkin': 'Check-in',
        'booking.checkout': 'Check-out',
        'booking.guests': 'Guests',
        'booking.button': 'Book',
        'booking.button.done': 'Booking complete',
        'booking.no_charge': 'You won\'t be charged yet',
        'booking.service_fee': 'Service fee',
        'booking.total': 'Total',
        'booking.nights': 'nights',
        'booking.night_single': 'night',
        'booking.guest_label': 'guest',
        'booking.guests_label': 'guests',
        'booking.infant_label': 'infant',
        'booking.infants_label': 'infants',
        'booking.pet_label': 'pet',
        'booking.pets_label': 'pets',

        // Experiences
        'exp.tag': 'Adventure & Tradition',
        'exp.title': 'Details that Enchant',
        'exp.suites.title': 'Luxury Suites',
        'exp.suites.desc': 'Rooms with traditional charm and modern comfort',
        'exp.eco.title': 'Private Jacuzzi',
        'exp.eco.desc': 'Relaxing moments with nature views',
        'exp.relax.title': 'Rest Corner',
        'exp.relax.desc': 'Intimate spaces designed for serenity',
        'exp.events.title': 'Pool and Fire Pit',
        'exp.events.desc': 'The heart of fun and gathering',
        'exp.diamond.title': 'Social Zone',
        'exp.diamond.desc': 'Shared environments full of tradition',

        // Cerro Tusa Feature
        'feature.tag': 'The Great Natural Pyramid',
        'feature.title': 'Views that tell a story',
        'feature.desc': '“From our terrace, the horizon surrenders to the imposing silhouette of **Cerro Tusa**, creating a spectacle of shadows and lights that seems taken from a timeless dream.”',
        'feature.cta': 'See more about the ranch',
        'feature.caption': '"The sunrise at the highest point of Antioquia."',

        // Location
        'location.tag': 'Find Us',
        'location.title': 'Our Location',
        'location.visit': 'Visit Us',
        'location.address_label': 'Address',
        'location.parcelacion': 'Parcelación Rochiles',
        'location.ref_label': 'Reference',
        'location.ref_val': '1.5Km from Parque Comfama Cerro Tusa',
        'location.google_btn': 'VIEW ON GOOGLE MAPS',

        // Footer
        'footer.contact': 'Contact',
        'footer.navigation': 'Navigation',
        'footer.privacy': 'Privacy',
        'footer.terms': 'Terms',
        'footer.policies': 'Policies and Terms',
        'footer.rights': 'All rights reserved.',
        'footer.brand_desc': 'Where Antioquian tradition meets exclusivity. Live an unforgettable experience in the shadow of Cerro Tusa.',

        // Gallery
        'gallery.tag': 'Mosaic of Memories',
        'gallery.title': 'Gallery of the Soul',
        'gallery.img1': 'Traditional Architecture',
        'gallery.img2': 'Green Areas',
        'gallery.img3': 'The Majesty of the Valley',
        'gallery.img4': 'Sunset Lights',
        'gallery.img5': 'Farm Trails',
        'gallery.img6': 'Colonial Façade',
        'gallery.img7': 'Living Nature',
        'gallery.img8': 'Environments of Peace',
        'gallery.img9': 'Venice Skies',

        // Testimonials
        'testimonials.tag': 'Voice of Our Guests',
        'testimonials.title': 'Unforgettable Stories',
        'testimonials.res1.text': '“An experience that exceeded all our expectations. The peace felt while watching the sunset in front of Cerro Tusa is priceless. The house is an architectural gem with all modern comforts.”',
        'testimonials.res2.text': '“We were looking for an exclusive place for our executive retreat and Finca Fredonia was the perfect choice. The level of privacy, quality of pro sound, and natural surroundings facilitated a unique work environment.”',
        'testimonials.res3.text': '“Details that enchant is not just a name, it\'s the reality. From the bedroom linens to the coffee aroma of the Diamond, everything is designed for absolute rest. Total luxury.”',

        // Policies
        'policies.hero_title': 'Policies and Terms',
        'policies.privacy_title': 'Privacy Policy',
        'policies.privacy_content': 'At La Juana cerro tusa, your privacy is our priority. We only collect necessary information to manage your bookings and improve your experience. We do not share your data with third parties without your explicit consent.',
        'policies.terms_title': 'Terms and Conditions',
        'policies.terms_content': 'Bookings are subject to availability and confirmation. Check-in is at 3:00 PM and check-out at 11:00 AM. Respectful behavior towards the natural environment and facilities is required. Cancellations within 48 hours may incur charges.',
        'policies.back_home': 'Back to Home',

        // Common
        'common.available': 'Available',
        'common.occupied': 'Occupied',
        'common.clear_dates': 'Clear dates',
        'common.close': 'Close',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('es');

    useEffect(() => {
        const saved = localStorage.getItem('language') as Language;
        if (saved && (saved === 'es' || saved === 'en')) {
            setLanguage(saved);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key: string) => {
        return translations[language][key as keyof typeof translations['es']] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
