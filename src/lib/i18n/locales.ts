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

// Pares de slugs por idioma. La variante en español es la canónica para las
// carpetas de rutas; la variante en inglés es el slug público en /en.
const slugPairs = [
  ["galeria", "gallery"],
  ["politicas", "policies"],
  ["gracias", "thank-you"],
  ["ascenso-sagrado", "sacred-ascent"],
  ["retiro-diosa-espejo", "mirror-goddess-retreat"],
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
