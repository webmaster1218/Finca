import type { Locale } from "./i18n/locales";
export type { Locale } from "./i18n/locales";

export type ArticleImage = {
  archivo: string;
  alt: string;
};

export type FaqItem = {
  pregunta: string;
  respuesta: string;
};

export type Article = {
  slug: string;
  categoria: string;
  title: string;
  meta_title?: string;
  meta_description?: string;
  description?: string;
  date: string;
  autor: string;
  palabras?: number;
  portada: string;
  portada_alt: string;
  imagenes?: ArticleImage[];
  faq?: FaqItem[];
  tldr?: string[];
  keyword_principal?: string;
  keywords_secundarias?: string[];
  slug_en?: string;
  categoria_en?: string;
  slug_es?: string;
  categoria_es?: string;
  content: string;
  locale: Locale;
  href: string;
};

export const CATEGORY_MAP: Record<
  string,
  { es: string; en: string; label_es: string; label_en: string }
> = {
  "fincas-de-lujo": {
    es: "fincas-de-lujo",
    en: "luxury-fincas",
    label_es: "Fincas de Lujo",
    label_en: "Luxury Fincas",
  },
  "cerro-tusa": {
    es: "cerro-tusa",
    en: "cerro-tusa",
    label_es: "Cerro Tusa",
    label_en: "Cerro Tusa",
  },
  glamping: {
    es: "glamping",
    en: "glamping",
    label_es: "Glamping",
    label_en: "Glamping",
  },
  "fincas-de-eventos": {
    es: "fincas-de-eventos",
    en: "event-venues-colombia",
    label_es: "Fincas para Eventos",
    label_en: "Event Venues",
  },
  "turismo-antioquia": {
    es: "turismo-antioquia",
    en: "antioquia-travel",
    label_es: "Turismo en Antioquia",
    label_en: "Antioquia Travel",
  },
  familia: {
    es: "familia",
    en: "family-holidays-colombia",
    label_es: "Turismo en Familia",
    label_en: "Family Holidays",
  },
  ecoturismo: {
    es: "ecoturismo",
    en: "eco-tourism",
    label_es: "Ecoturismo",
    label_en: "Ecotourism",
  },
  colombia: {
    es: "colombia",
    en: "colombia",
    label_es: "Turismo Colombia",
    label_en: "Colombia Travel",
  },
};

export function getCategorySlug(
  categoria: string,
  locale: Locale
): string | null {
  const entry = CATEGORY_MAP[categoria];
  if (!entry) return null;
  return locale === "es" ? entry.es : entry.en;
}

export function resolveCategoryBySlug(
  slugParam: string,
  locale: Locale
): string | null {
  for (const [key, value] of Object.entries(CATEGORY_MAP)) {
    if ((locale === "es" ? value.es : value.en) === slugParam) return key;
  }
  return null;
}

export function getCategoryLabel(categoria: string, locale: Locale): string {
  const entry = CATEGORY_MAP[categoria];
  if (!entry) return categoria;
  return locale === "es" ? entry.label_es : entry.label_en;
}

export function listCategories(locale: Locale) {
  return Object.entries(CATEGORY_MAP).map(([key, value]) => ({
    key,
    slug: locale === "es" ? value.es : value.en,
    label: locale === "es" ? value.label_es : value.label_en,
  }));
}
