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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.1, 0.4) }}
      className={`group relative overflow-hidden shadow-xl ${isFeatured ? "md:col-span-2 md:row-span-2" : ""}`}
    >
      <Link href={article.href} className="block">
        <div className={`relative ${isFeatured ? "h-[480px] md:h-[560px]" : "h-[380px]"} overflow-hidden`}>
          <Image
            src={article.portada}
            alt={article.portada_alt}
            fill
            loading="lazy"
            sizes={isFeatured
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
            className="object-cover transition-transform duration-[2s] group-hover:scale-110"
          />
          {/* Overlay gradiente — patrón Heritage Green */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-85 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Esquina decorativa */}
          <div className="absolute top-5 right-5 w-8 h-8 border-t border-r border-[#9a7d45]/0 group-hover:border-[#9a7d45]/40 transition-all duration-700" />
        </div>

        {/* Contenido sobre el overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-[#fffbf0]">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[#9a7d45] font-serif tracking-[0.3em] text-[10px] md:text-xs uppercase">
              {getCategoryLabel(article.categoria, locale)}
            </span>
            <span className="text-[#fffbf0]/40 text-xs">·</span>
            <time className="text-[#fffbf0]/60 text-xs md:text-sm font-sans" dateTime={article.date}>
              {dateLabel}
            </time>
          </div>

          <h3 className={`font-serif tracking-tight mb-2 group-hover:mb-3 transition-all duration-500 underline underline-offset-8 decoration-[#9a7d45]/0 group-hover:decoration-[#9a7d45] ${isFeatured ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"}`}>
            {article.title}
          </h3>

          {isFeatured && article.meta_description && (
            <p className="text-[#fffbf0]/70 text-sm md:text-base font-serif italic line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              {article.meta_description}
            </p>
          )}
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
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}
