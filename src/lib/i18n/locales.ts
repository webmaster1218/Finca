export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function parseLocale(pathname: string): Locale | null {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLocale(first) ? first : null;
}

const slugPairs = [
  // Páginas estáticas y tours
  ["galeria", "gallery"],
  ["politicas", "policies"],
  ["gracias", "thank-you"],
  ["ascenso-sagrado", "sacred-ascent"],
  ["retiro-diosa-espejo", "mirror-goddess-retreat"],

  // Categorías del blog
  ["fincas-de-lujo", "luxury-fincas"],
  ["fincas-de-eventos", "event-venues-colombia"],
  ["turismo-antioquia", "antioquia-travel"],
  ["familia", "family-holidays-colombia"],
  ["ecoturismo", "eco-tourism"],
  ["cerro-tusa", "cerro-tusa"],
  ["glamping", "glamping"],
  ["colombia", "colombia"],

  // Artículos del blog (24 pares bilingües)
  ["cerro-tusa-como-llegar", "how-to-get-to-cerro-tusa"],
  ["piramide-natural-mas-grande-del-mundo", "largest-natural-pyramid-in-the-world"],
  ["que-hacer-venecia-antioquia", "things-to-do-venecia-antioquia"],
  ["lugares-para-visitar-en-colombia", "places-to-visit-in-colombia"],
  ["que-hacer-en-colombia", "things-to-do-in-colombia"],
  ["turismo-antioquia-guia", "antioquia-travel-guide"],
  ["cascadas-antioquia", "waterfalls-in-antioquia"],
  ["naturaleza-cerca-de-medellin", "nature-getaways-near-medellin"],
  ["senderismo-antioquia", "hiking-antioquia-colombia"],
  ["glamping-familiar-cerca-a-medellin", "family-glamping-near-medellin"],
  ["planes-con-ninos-en-antioquia", "things-to-do-with-kids-in-antioquia"],
  ["vacaciones-familia-medellin-ninos", "family-vacation-medellin-kids"],
  ["finca-para-eventos-antioquia", "event-venue-finca-antioquia"],
  ["matrimonio-finca-antioquia", "destination-wedding-finca-antioquia"],
  ["retiros-corporativos-medellin", "corporate-retreats-medellin"],
  ["alquiler-finca-exclusiva-antioquia", "exclusive-finca-rental-antioquia"],
  ["finca-de-lujo-antioquia", "luxury-finca-antioquia"],
  ["finca-la-juana-experiencia-de-lujo", "finca-la-juana-luxury-experience"],
  ["glamping-cerro-tusa", "glamping-cerro-tusa"],
  ["glamping-con-jacuzzi-medellin", "glamping-with-jacuzzi-medellin"],
  ["glamping-de-lujo-antioquia", "luxury-glamping-antioquia"],
  ["dia-de-sol-antioquia", "day-by-the-pool-antioquia"],
  ["pueblos-turisticos-antioquia", "heritage-towns-antioquia"],
  ["que-hacer-en-antioquia", "things-to-do-in-antioquia"],
] as const;

const segmentMap: Record<string, Record<Locale, string>> = {};
for (const [es, en] of slugPairs) {
  segmentMap[es] = { es, en };
  segmentMap[en] = { es, en };
}

/** Quita el prefijo de locale de un pathname si existe. */
export function stripLocale(pathname: string): string {
  const parts = pathname.split("/");
  if (parts.length > 1 && isLocale(parts[1])) {
    return "/" + parts.slice(2).join("/");
  }
  return pathname;
}

/**
 * Traduce los slugs conocidos de una ruta al idioma de destino.
 * Conserva anclas (#) y query (?), y deja pasar los segmentos desconocidos.
 */
export function localizePath(path: string, targetLocale: Locale): string {
  const hashIndex = path.search(/[?#]/);
  const pathPart = hashIndex === -1 ? path : path.slice(0, hashIndex);
  const suffix = hashIndex === -1 ? "" : path.slice(hashIndex);
  const segments = pathPart.split("/").filter(Boolean);
  const localized = segments
    .map((seg) => segmentMap[seg]?.[targetLocale] ?? seg)
    .join("/");
  return (localized ? `/${localized}` : "/") + suffix;
}

export function localizeHref(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const stripped = stripLocale(normalized);
  const localized = localizePath(stripped, locale);
  if (localized === "/") return `/${locale}`;
  return `/${locale}${localized}`;
}
