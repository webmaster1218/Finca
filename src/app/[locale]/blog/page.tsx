import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, defaultLocale, type Locale } from "../../../lib/i18n/locales";
import { getAllArticles, listCategories, getArticlesByCategory } from "../../../lib/blog";
import BlogIndexClient from "./BlogIndexClient";

type Params = { locale: string };

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const baseUrl = "https://lajuanacerrotusa.com";
  const title = lang === "es" ? "Blog | La Juana Cerro Tusa" : "Journal | La Juana Cerro Tusa";
  const description = lang === "es"
    ? "Guías, experiencias y consejos sobre la finca, el Cerro Tusa, Venecia Antioquia y el turismo de lujo en Colombia."
    : "Guides, stories and tips about the ranch, Cerro Tusa, Venecia Antioquia and luxury travel in Colombia.";

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${lang}/blog`,
      languages: {
        es: `${baseUrl}/es/blog`,
        en: `${baseUrl}/en/blog`,
        "x-default": `${baseUrl}/${defaultLocale}/blog`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}/blog`,
      type: "website",
    },
  };
}

export default async function BlogIndexPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang: Locale = locale;

  const articles = getAllArticles(lang);
  const categories = listCategories(lang).map((c) => ({
    ...c,
    count: getArticlesByCategory(lang, c.key).length,
  }));

  const strings = lang === "es"
    ? {
        eyebrow: "Diario de Viaje",
        title: "El Blog",
        subtitle: "Historias, guías y experiencias desde la falda del Cerro Tusa. Todo lo que necesitas saber para visitar Venecia Antioquia.",
        all: "Todo",
        empty: "Aún no hay artículos en esta categoría. Vuelve pronto.",
        readMore: "Leer artículo",
      }
    : {
        eyebrow: "Travel Journal",
        title: "The Journal",
        subtitle: "Stories, guides and experiences from the foothills of Cerro Tusa. Everything you need to know to visit Venecia Antioquia.",
        all: "All",
        empty: "No articles in this category yet. Check back soon.",
        readMore: "Read article",
      };

  return (
    <BlogIndexClient
      articles={articles}
      categories={categories}
      locale={lang}
      strings={strings}
    />
  );
}
