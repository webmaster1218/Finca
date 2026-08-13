"use client";

import { motion } from "framer-motion";
import type { Locale } from "../../lib/blog-types";

type Category = {
  key: string;
  slug: string;
  label: string;
  count: number;
};

type Props = {
  categories: Category[];
  active: string | null;
  onSelect: (key: string | null) => void;
  locale: Locale;
  allLabel: string;
};

export function CategoryFilter({ categories, active, onSelect, locale, allLabel }: Props) {
  const items: Array<{ key: string | null; label: string; count: number }> = [
    { key: null, label: allLabel, count: categories.reduce((s, c) => s + c.count, 0) },
    ...categories,
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 mb-20">
      {items.map((item) => {
        const isActive = active === item.key;
        return (
          <motion.button
            key={item.key ?? "all"}
            onClick={() => onSelect(item.key)}
            whileTap={{ scale: 0.97 }}
            className={`px-5 py-2.5 font-serif text-sm tracking-wide whitespace-nowrap transition-all duration-300 border ${
              isActive
                ? "bg-[#6f7c4e] text-[#fffbf0] border-[#6f7c4e]"
                : "bg-transparent text-[#6f7c4e] border-[#9a7d45]/30 hover:bg-[#6f7c4e]/[0.06]"
            }`}
          >
            {item.label}
            <span className={`ml-2 text-[10px] ${isActive ? "text-[#fffbf0]/60" : "text-[#9a7d45]"}`}>
              {item.count}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
