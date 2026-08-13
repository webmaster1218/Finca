"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Article } from "../../lib/blog-types";
import { getCategoryLabel } from "../../lib/blog-types";
import type { Locale } from "../../lib/i18n/locales";

type Props = {
  article: Article;
  locale: Locale;
  index?: number;
  variant?: "default" | "featured";
};

export function ArticleCard({ article, locale, index = 0, variant = "default" }: Props) {
  const isFeatured = variant === "featured";
  const dateLabel = formatDate(article.date, locale);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, delay: Math.min(index * 0.1, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden h-[340px] sm:h-[380px] lg:h-[400px]"
    >
      <Link href={article.href} className="block w-full h-full">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={article.portada}
            alt={article.portada_alt}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
          {/* Overlay gradiente — patrón Heritage Green */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />

          {/* Esquina decorativa */}
          <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#9a7d45]/0 group-hover:border-[#9a7d45]/50 transition-colors duration-700" />
        </div>

        {/* Contenido sobre el overlay — centrado */}
        <div className="absolute inset-x-0 bottom-0 p-7 text-center text-[#fffbf0]">
          <p className="font-serif text-[10px] tracking-[0.25em] uppercase text-[#9a7d45] mb-2">
            {getCategoryLabel(article.categoria, locale)} · {dateLabel}
          </p>
          <h3 className="font-serif text-xl leading-snug text-[#fffbf0]">
            {article.title}
          </h3>
        </div>
      </Link>
    </motion.article>
  );
}

function formatDate(dateStr: string, locale: Locale): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(locale === "es" ? "es-CO" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}
