import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, defaultLocale, type Locale } from "../../../../lib/i18n/locales";
import {
  resolveCategoryBySlug,
  getCategoryLabel,
  getArticlesByCategory,
  listCategories,
  CATEGORY_MAP,
} from "../../../../lib/blog";
import CategoryClient from "./CategoryClient";

type Params = { locale: string; categoria: string };

export async function generateStaticParams() {
  const out: { locale: string; categoria: string }[] = [];
  for (const locale of ["es", "en"] as const) {
    for (const [, c] of Object.entries(CATEGORY_MAP)) {
      out.push({ locale, categoria: locale === "es" ? c.es : c.en });
    }
  }
  return out;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, categoria } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const catKey = resolveCategoryBySlug(categoria, lang);
  if (!catKey) return {};
  const baseUrl = "https://lajuanacerrotusa.com";
  const label = getCategoryLabel(catKey, lang);
  const title = lang === "es" ? `${label} | Blog La Juana` : `${label} | La Juana Journal`;
  const description = lang === "es"
    ? `Artículos sobre ${label} en La Juana Cerro Tusa, Venecia Antioquia.`
    : `Articles about ${label} at La Juana Cerro Tusa, Venecia Antioquia.`;
  const catSlug = lang === "es" ? CATEGORY_MAP[catKey].es : CATEGORY_MAP[catKey].en;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${lang}/blog/${catSlug}`,
      languages: {
        es: `${baseUrl}/es/blog/${CATEGORY_MAP[catKey].es}`,
        en: `${baseUrl}/en/blog/${CATEGORY_MAP[catKey].en}`,
        "x-default": `${baseUrl}/${defaultLocale}/blog/${CATEGORY_MAP[catKey].es}`,
      },
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { locale, categoria } = await params;
  if (!isLocale(locale)) notFound();
  const lang: Locale = locale;

  const catKey = resolveCategoryBySlug(categoria, lang);
  if (!catKey) notFound();

  const articles = getArticlesByCategory(lang, catKey);
  const label = getCategoryLabel(catKey, lang);
  const allCategories = listCategories(lang).map((c) => ({
    ...c,
    count: getArticlesByCategory(lang, c.key).length,
  }));

  const strings = lang === "es"
    ? {
        eyebrow: "Categoría",
        all: "Todas",
        empty: "Aún no hay artículos en esta categoría.",
        home: "Inicio",
        blog: "Blog",
      }
    : {
        eyebrow: "Category",
        all: "All",
        empty: "No articles in this category yet.",
        home: "Home",
        blog: "Journal",
      };

  return (
    <CategoryClient
      articles={articles}
      categories={allCategories}
      locale={lang}
      categoryKey={catKey}
      categoryLabel={label}
      strings={strings}
    />
  );
}
