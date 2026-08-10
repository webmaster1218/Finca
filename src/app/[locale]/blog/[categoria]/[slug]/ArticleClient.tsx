"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User } from "lucide-react";
import type { Article, Locale } from "../../../../../lib/blog-types";
import { Navbar } from "../../../../../components/Navbar";
import { Footer } from "../../../../../components/Footer";
import { ArticleContent } from "../../../../../components/blog/ArticleContent";
import { ArticleCard } from "../../../../../components/blog/ArticleCard";
import { BlogBreadcrumb } from "../../../../../components/blog/BlogBreadcrumb";

type Strings = {
  home: string;
  blog: string;
  readMore: string;
  related: string;
  by: string;
  reserve: string;
};

type Props = {
  article: Article;
  related: Article[];
  locale: Locale;
  categoryLabel: string;
  strings: Strings;
};

export default function ArticleClient({ article, related, locale, categoryLabel, strings }: Props) {
  const dateLabel = formatDate(article.date, locale);
  const readingTime = article.palabras ? Math.max(1, Math.round(article.palabras / 200)) : null;
  const reserveHref = locale === "es" ? "/es/#habitaciones" : "/en/#habitaciones";

  return (
    <main className="bg-[#fffbf0]">
      <Navbar darkText />
      {/* Hero del artículo */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <BlogBreadcrumb
              locale={locale}
              items={[
                { label: strings.home, href: `/${locale}` },
                { label: strings.blog, href: `/${locale}/blog` },
                { label: categoryLabel, href: `/${locale}/blog/${getCatSlug(article, locale)}` },
                { label: article.title },
              ]}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <p className="text-[#9a7d45] font-serif tracking-[0.4em] text-xs md:text-sm mb-5 uppercase">
              {categoryLabel}
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#6f7c4e] leading-[1.15] mb-6">
              {article.title}
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-10 h-[1px] bg-[#9a7d45]/40" />
              <div className="w-2 h-2 rotate-45 border border-[#9a7d45]" />
              <div className="w-10 h-[1px] bg-[#9a7d45]/40" />
            </div>
            <div className="flex items-center justify-center flex-wrap gap-x-5 gap-y-2 text-xs md:text-sm text-[#2c3e50]/60">
              {dateLabel && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#9a7d45]" />
                  <time dateTime={article.date}>{dateLabel}</time>
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#9a7d45]" />
                {strings.by} {article.autor}
              </span>
              {readingTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#9a7d45]" />
                  {readingTime} {locale === "es" ? "min de lectura" : "min read"}
                </span>
              )}
            </div>
          </motion.div>
        </div>

        {/* Portada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto relative"
          style={{ aspectRatio: "16 / 9" }}
        >
          <Image
            src={article.portada}
            alt={article.portada_alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover shadow-2xl"
          />
        </motion.div>
      </section>

      {/* Cuerpo del artículo */}
      <section className="px-6 pb-16 md:pb-20">
        <div className="max-w-3xl mx-auto">
          <ArticleContent content={article.content} />

          {/* Autor / E-E-A-T al cierre */}
          <div className="mt-16 pt-8 border-t border-[#9a7d45]/20 text-center">
            <p className="font-serif italic text-[#6f7c4e] text-base md:text-lg">
              {strings.by} <span className="not-italic font-semibold">{article.autor}</span>
            </p>
            <p className="text-[#9a7d45] text-xs md:text-sm tracking-widest uppercase mt-1">
              La Juana Cerro Tusa · Venecia, Antioquia
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link href={reserveHref} className="btn-classic inline-block">
              {strings.reserve}
            </Link>
          </div>
        </div>
      </section>

      {/* Artículos relacionados */}
      {related.length > 0 && (
        <section className="px-6 py-16 md:py-24 bg-[#6f7c4e]/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#9a7d45] font-serif tracking-[0.4em] text-xs uppercase mb-4">
                {strings.related}
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-[1px] bg-[#9a7d45]/40" />
                <div className="w-2 h-2 rotate-45 border border-[#9a7d45]" />
                <div className="w-12 h-[1px] bg-[#9a7d45]/40" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {related.map((a, i) => (
                <ArticleCard key={a.slug} article={a} locale={locale} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

function formatDate(dateStr: string, locale: Locale): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(locale === "es" ? "es-CO" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function getCatSlug(article: Article, locale: Locale): string {
  if (locale === "es") {
    return article.categoria;
  }
  return article.categoria_en ?? article.categoria;
}
