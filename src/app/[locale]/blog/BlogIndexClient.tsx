"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Article, Locale } from "../../../lib/blog-types";
import { getCategoryLabel } from "../../../lib/blog-types";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import { BlogHero } from "../../../components/blog/BlogHero";
import { CategoryFilter } from "../../../components/blog/CategoryFilter";
import { ArticleCard } from "../../../components/blog/ArticleCard";
import { BlogBreadcrumb } from "../../../components/blog/BlogBreadcrumb";

type Category = {
  key: string;
  slug: string;
  label: string;
  count: number;
};

type Strings = {
  eyebrow: string;
  title: string;
  subtitle: string;
  all: string;
  empty: string;
  readMore: string;
};

type Props = {
  articles: Article[];
  categories: Category[];
  locale: Locale;
  strings: Strings;
};

export default function BlogIndexClient({ articles, categories, locale, strings }: Props) {
  const [active, setActive] = useState<string | null>(null);

  const visible = useMemo(() => {
    if (!active) return articles;
    return articles.filter((a) => a.categoria === active);
  }, [active, articles]);

  const [featured, ...rest] = visible;
  const showFeaturedLayout = !active && featured;

  const homeLabel = locale === "es" ? "Inicio" : "Home";
  const blogLabel = locale === "es" ? "Blog" : "Journal";
  const ctaEyebrow = locale === "es" ? "La Juana Cerro Tusa" : "La Juana Cerro Tusa";
  const ctaTitle = locale === "es"
    ? "Vive la experiencia a los pies del Cerro Tusa"
    : "Experience the foothills of Cerro Tusa";
  const ctaBtn = locale === "es" ? "Reservar estadía" : "Book your stay";

  return (
    <main className="min-h-screen">
      <Navbar darkText />
      <BlogHero eyebrow={strings.eyebrow} title={strings.title} subtitle={strings.subtitle} />

      <section className="pt-8 pb-20 md:pt-8 md:pb-24 px-6 bg-[#fffbf0] min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-16">
            <BlogBreadcrumb
              locale={locale}
              items={[
                { label: homeLabel, href: `/${locale}` },
                { label: blogLabel },
              ]}
            />
          </div>

          {articles.length === 0 ? (
            <p className="text-center text-[#2c3e50]/60 font-serif italic text-lg py-20">
              {strings.empty}
            </p>
          ) : (
            <>
              <CategoryFilter
                categories={categories}
                active={active}
                onSelect={setActive}
                locale={locale}
                allLabel={strings.all}
              />

              {/* ===== ARTÍCULO DESTACADO (hero horizontal full-width) ===== */}
              {showFeaturedLayout && (
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-8"
                >
                  <FeaturedHero article={featured} locale={locale} />
                </motion.div>
              )}

              {/* ===== GRID 3 COLUMNAS ===== */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(showFeaturedLayout ? rest : visible).map((a, i) => (
                  <ArticleCard
                    key={a.slug}
                    article={a}
                    locale={locale}
                    index={i}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="relative overflow-hidden py-24 md:py-32 px-6 bg-[#6f7c4e]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-[#fffbf0]/[0.02] blur-[60px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <p className="text-[#fffbf0]/60 font-serif tracking-[0.4em] text-xs md:text-sm mb-8 uppercase">
            {ctaEyebrow}
          </p>
          <h2
            className="font-serif text-[#fffbf0] mb-10 leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
          >
            {ctaTitle}
          </h2>
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-12 h-px bg-[#fffbf0]/30" />
            <div className="w-2 h-2 rotate-45 border border-[#fffbf0]/50" />
            <div className="w-12 h-px bg-[#fffbf0]/30" />
          </div>
          <Link
            href={`/${locale}${locale === "es" ? "/contacto" : "/contact"}`}
            className="inline-block px-10 py-3 font-serif tracking-wider border border-[#fffbf0]/30 bg-[#fffbf0] text-[#6f7c4e] hover:opacity-90 transition-opacity duration-300"
          >
            {ctaBtn}
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

/* ===== Artículo destacado — hero horizontal full-width ===== */
function FeaturedHero({ article, locale }: { article: Article; locale: Locale }) {
  const dateLabel = formatFeaturedDate(article.date, locale);

  return (
    <Link href={article.href} className="group relative block w-full overflow-hidden" style={{ minHeight: "420px", height: "540px" }}>
      <Image
        src={article.portada}
        alt={article.portada_alt}
        fill
        priority
        sizes="100vw"
        className="object-cover transition-transform duration-[2500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/5" />

      {/* Badge "Destacado" */}
      <span className="absolute left-5 top-5 bg-[#9a7d45] px-3.5 py-1.5 font-serif text-[10px] tracking-[0.3em] uppercase text-[#fffbf0]">
        {locale === "es" ? "Destacado" : "Featured"}
      </span>

      {/* Esquina decorativa */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#9a7d45]/0 group-hover:border-[#9a7d45]/50 transition-colors duration-700" />

      <div className="absolute inset-x-0 bottom-0 px-8 py-12 text-center">
        <p className="font-serif text-[10px] tracking-[0.25em] uppercase text-[#9a7d45] mb-2">
          {getCategoryLabel(article.categoria, locale)} · {dateLabel}
        </p>
        <h3
          className="font-serif text-[#fffbf0] max-w-3xl mx-auto leading-[1.15]"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
        >
          {article.title}
        </h3>
        {article.meta_description && (
          <p className="font-serif italic text-[#fffbf0]/80 max-w-2xl mx-auto mt-6 text-base leading-relaxed">
            {article.meta_description}
          </p>
        )}
      </div>
    </Link>
  );
}

function formatFeaturedDate(dateStr: string, locale: Locale): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(locale === "es" ? "es-CO" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}
