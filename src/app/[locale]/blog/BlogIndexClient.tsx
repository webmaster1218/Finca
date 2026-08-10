"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { Article, Locale } from "../../../lib/blog-types";
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

  return (
    <main className="min-h-screen">
      <Navbar darkText />
      <BlogHero eyebrow={strings.eyebrow} title={strings.title} subtitle={strings.subtitle} />

      <section className="py-16 md:py-24 px-6 bg-[#fffbf0] min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
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

              {/* Artículo destacado (solo vista "todo") */}
              {showFeaturedLayout && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="md:col-span-2 md:row-span-2">
                    <ArticleCard article={featured} locale={locale} index={0} variant="featured" />
                  </div>
                  {rest.slice(0, 2).map((a, i) => (
                    <ArticleCard key={a.slug} article={a} locale={locale} index={i + 1} />
                  ))}
                </div>
              )}

              {/* Grid del resto */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {(showFeaturedLayout ? rest.slice(2) : visible).map((a, i) => (
                  <ArticleCard key={a.slug} article={a} locale={locale} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
