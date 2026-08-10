"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Locale } from "../../lib/i18n/locales";

type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  items: Crumb[];
  locale: Locale;
};

export function BlogBreadcrumb({ items }: Props) {
  return (
    <nav aria-label="breadcrumb" className="flex items-center flex-wrap gap-1.5 text-xs md:text-sm">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-[#6f7c4e]/70 hover:text-[#6f7c4e] transition-colors tracking-wide"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#9a7d45] font-serif italic tracking-wide">
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className="w-3 h-3 text-[#9a7d45]/40" />}
          </span>
        );
      })}
    </nav>
  );
}
