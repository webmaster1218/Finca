"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import type { FaqItem, Locale } from "../../lib/blog-types";

type Props = {
  items: FaqItem[];
  locale: Locale;
};

export function FaqAccordion({ items, locale }: Props) {
  const [open, setOpen] = useState<number | null>(0);
  const title = locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions";

  return (
    <div className="mt-16">
      <div className="text-center mb-10">
        <p className="text-[#9a7d45] font-serif tracking-[0.4em] text-xs uppercase mb-4">
          {title}
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-[1px] bg-[#9a7d45]/40" />
          <div className="w-2 h-2 rotate-45 border border-[#9a7d45]" />
          <div className="w-12 h-[1px] bg-[#9a7d45]/40" />
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="border border-[#9a7d45]/25 bg-[#6f7c4e]/[0.03]"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-serif text-base md:text-lg text-[#2c3e50] leading-snug">
                  {item.pregunta}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 w-8 h-8 flex items-center justify-center border border-[#9a7d45]/40 text-[#9a7d45]"
                >
                  <Plus className="w-4 h-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-[#2c3e50]/75 leading-relaxed">
                      {item.respuesta}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
