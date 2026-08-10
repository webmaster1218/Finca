"use client";

import { useState, useMemo } from "react";
import type { Article, Locale } from "../../../../lib/blog-types";
import { Navbar } from "../../../../components/Navbar";
import { Footer } from "../../../../components/Footer";
import { BlogHero } from "../../../../components/blog/BlogHero";
import { CategoryFilter } from "../../../../components/blog/CategoryFilter";
import { ArticleCard } from "../../../../components/blog/ArticleCard";
import { BlogBreadcrumb } from "../../../../components/blog/BlogBreadcrumb";

type Category = { key: string; slug: string; label: string; count: number };
type Strings = { eyebrow: string; all: string; empty: string; home: string; blog: string };

type Props = {
  articles: Article[];
  categories: Category[];
  locale: Locale;
  categoryKey: string;
  categoryLabel: string;
  strings: Strings;
};

export default function CategoryClient({
  articles,
  categories,
  locale,
  categoryKey,
  categoryLabel,
  strings,
}: Props) {
  const [active, setActive] = useState<string | null>(categoryKey);

  const visible = useMemo(() => {
    if (!active) return articles;
    if (active === categoryKey) return articles;
    return articles;
  }, [active, articles, categoryKey]);

  return (
    <main className="min-h-screen">
      <Navbar darkText />
      <BlogHero
        eyebrow={strings.eyebrow}
        title={categoryLabel}
        subtitle=""
      />

      <section className="py-16 md:py-24 px-6 bg-[#fffbf0] min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <BlogBreadcrumb
              locale={locale}
              items={[
                { label: strings.home, href: `/${locale}` },
                { label: strings.blog, href: `/${locale}/blog` },
                { label: categoryLabel },
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
                onSelect={(k) => {
                  if (k === null) {
                    window.location.href = `/${locale}/blog`;
                  } else if (k !== categoryKey) {
                    const slug = categories.find((c) => c.key === k)?.slug;
                    if (slug) window.location.href = `/${locale}/blog/${slug}`;
                  } else {
                    setActive(k);
                  }
                }}
                locale={locale}
                allLabel={strings.all}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {visible.map((a, i) => (
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
