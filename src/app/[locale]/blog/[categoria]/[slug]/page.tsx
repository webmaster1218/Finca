import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, defaultLocale, type Locale } from "../../../../../lib/i18n/locales";
import {
  getAllArticles,
  getArticleByAnySlug,
  getRelatedArticles,
  getAlternateLocaleArticle,
  getCategoryLabel,
  getCategorySlug,
} from "../../../../../lib/blog";
import ArticleClient from "./ArticleClient";

type Params = { locale: string; categoria: string; slug: string };

export async function generateStaticParams() {
  const out: { locale: string; categoria: string; slug: string }[] = [];
  for (const locale of ["es", "en"] as const) {
    for (const article of getAllArticles(locale)) {
      const catSlug = getCategorySlug(article.categoria, locale);
      if (catSlug) out.push({ locale, categoria: catSlug, slug: article.slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, categoria, slug } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const article = getArticleByAnySlug(lang, categoria, slug);
  if (!article) return {};

  const baseUrl = "https://lajuanacerrotusa.com";
  const title = article.meta_title ?? article.title;
  const description = article.meta_description ?? "";
  const ogImage = article.portada.startsWith("http")
    ? article.portada
    : `${baseUrl}${article.portada}`;

  const altEn = getAlternateLocaleArticle(article, "en");
  const altEs = getAlternateLocaleArticle(article, "es");

  const languages: Record<string, string> = {
    "x-default": `${baseUrl}/${defaultLocale}/blog/${getCategorySlug(article.categoria, defaultLocale)}/${article.slug}`,
  };
  if (altEs.exists) languages.es = `${baseUrl}${altEs.href}`;
  if (altEn.exists) languages.en = `${baseUrl}${altEn.href}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}${article.href}`,
      languages,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${article.href}`,
      type: "article",
      publishedTime: article.date,
      authors: [article.autor],
      images: [{ url: ogImage, width: 1200, height: 675, alt: article.portada_alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { locale, categoria, slug } = await params;
  if (!isLocale(locale)) notFound();
  const lang: Locale = locale;

  const article = getArticleByAnySlug(lang, categoria, slug);
  if (!article) notFound();

  const related = getRelatedArticles(lang, article, 3);
  const categoryLabel = getCategoryLabel(article.categoria, lang);

  const baseUrl = "https://lajuanacerrotusa.com";
  const ogImage = article.portada.startsWith("http") ? article.portada : `${baseUrl}${article.portada}`;

  // JSON-LD: BlogPosting
  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.meta_description ?? article.title,
    image: [ogImage],
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      name: article.autor,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "La Juana Cerro Tusa",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}${article.href}`,
    },
    inLanguage: lang === "es" ? "es-CO" : "en-US",
    articleSection: categoryLabel,
    keywords: [article.keyword_principal, ...(article.keywords_secundarias ?? [])]
      .filter(Boolean)
      .join(", "),
  };

  // JSON-LD: BreadcrumbList
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "es" ? "Inicio" : "Home", item: `${baseUrl}/${lang}` },
      { "@type": "ListItem", position: 2, name: lang === "es" ? "Blog" : "Journal", item: `${baseUrl}/${lang}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryLabel,
        item: `${baseUrl}/${lang}/blog/${categoria}`,
      },
      { "@type": "ListItem", position: 4, name: article.title, item: `${baseUrl}${article.href}` },
    ],
  };

  // JSON-LD: FAQPage (si el artículo tiene FAQ)
  const faqSchema = article.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: article.faq.map((f) => ({
          "@type": "Question",
          name: f.pregunta,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.respuesta,
          },
        })),
      }
    : null;

  const strings = lang === "es"
    ? {
        home: "Inicio",
        blog: "Blog",
        readMore: "Leer más",
        related: "Artículos relacionados",
        by: "por",
        reserve: "Reservar estadía",
      }
    : {
        home: "Home",
        blog: "Journal",
        readMore: "Read more",
        related: "Related articles",
        by: "by",
        reserve: "Book your stay",
      };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <ArticleClient
        article={article}
        related={related}
        locale={lang}
        categoryLabel={categoryLabel}
        strings={strings}
      />
    </>
  );
}
