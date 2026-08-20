import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "./i18n/locales";

export type { Article, ArticleImage } from "./blog-types";
export {
  CATEGORY_MAP,
  getCategorySlug,
  resolveCategoryBySlug,
  getCategoryLabel,
  listCategories,
} from "./blog-types";

import {
  CATEGORY_MAP,
  getCategorySlug,
  resolveCategoryBySlug,
} from "./blog-types";
import type { Article } from "./blog-types";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function buildHref(locale: Locale, categoria: string, slug: string): string {
  const catSlug = getCategorySlug(categoria, locale) ?? categoria;
  return `/${locale}/blog/${catSlug}/${slug}`;
}

function readArticleFile(
  filePath: string,
  locale: Locale,
  categoria: string,
  slug: string
): Article | null {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      categoria,
      title: data.title ?? slug,
      meta_title: data.meta_title,
      meta_description: data.meta_description,
      description: data.description,
      date: data.date ? String(data.date) : "",
      autor: data.autor ?? "La Juana Cerro Tusa",
      palabras: data.palabras,
      portada: data.portada ?? "/imagenes/hero.webp",
      portada_alt: data.portada_alt ?? data.title ?? slug,
      imagenes: data.imagenes,
      faq: data.faq,
      tldr: data.tldr,
      keyword_principal: data.keyword_principal,
      keywords_secundarias: data.keywords_secundarias,
      slug_en: data.slug_en,
      categoria_en: data.categoria_en,
      slug_es: data.slug_es,
      categoria_es: data.categoria_es,
      content,
      locale,
      href: buildHref(locale, categoria, slug),
    };
  } catch {
    return null;
  }
}

function localeDir(locale: Locale): string {
  return path.join(CONTENT_DIR, locale);
}

function categoriaDir(locale: Locale, categoria: string): string {
  const catSlug = getCategorySlug(categoria, locale) ?? categoria;
  return path.join(localeDir(locale), catSlug);
}

export function getAllArticles(locale: Locale): Article[] {
  const base = localeDir(locale);
  if (!fs.existsSync(base)) return [];
  const articles: Article[] = [];
  for (const catKey of Object.keys(CATEGORY_MAP)) {
    const dir = categoriaDir(locale, catKey);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".md")) continue;
      const slug = file.replace(/\.md$/, "");
      const article = readArticleFile(
        path.join(dir, file),
        locale,
        catKey,
        slug
      );
      if (article) articles.push(article);
    }
  }
  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticlesByCategory(
  locale: Locale,
  categoria: string
): Article[] {
  return getAllArticles(locale).filter((a) => a.categoria === categoria);
}

export function getArticle(
  locale: Locale,
  categoria: string,
  slug: string
): Article | null {
  const dir = categoriaDir(locale, categoria);
  const filePath = path.join(dir, `${slug}.md`);
  return readArticleFile(filePath, locale, categoria, slug);
}

export function getArticleByAnySlug(
  locale: Locale,
  categoriaParam: string,
  slugParam: string
): Article | null {
  const categoria = resolveCategoryBySlug(categoriaParam, locale);
  if (!categoria) return null;
  return getArticle(locale, categoria, slugParam);
}

export function getRelatedArticles(
  locale: Locale,
  article: Article,
  limit = 3
): Article[] {
  return getAllArticles(locale)
    .filter((a) => a.categoria === article.categoria && a.slug !== article.slug)
    .slice(0, limit);
}

export function getAlternateLocaleArticle(
  article: Article,
  targetLocale: Locale
): { href: string; exists: boolean } {
  if (targetLocale === article.locale) {
    return { href: article.href, exists: true };
  }
  const targetSlug =
    targetLocale === "en" ? article.slug_en : article.slug_es;
  const targetCategoria =
    targetLocale === "en" ? article.categoria_en : article.categoria_es;
  if (!targetSlug || !targetCategoria) {
    return { href: `/${targetLocale}/blog`, exists: false };
  }
  const exists = !!getArticle(targetLocale, targetCategoria, targetSlug);
  return {
    href: buildHref(targetLocale, targetCategoria, targetSlug),
    exists,
  };
}
