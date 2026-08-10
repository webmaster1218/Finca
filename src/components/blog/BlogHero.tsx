"use client";

import { motion } from "framer-motion";

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function BlogHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-24 px-6 bg-[#fffbf0] overflow-hidden">
      {/* Detalle decorativo de fondo */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#6f7c4e] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#9a7d45] blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-[#9a7d45] font-serif tracking-[0.4em] text-xs md:text-sm mb-6 uppercase"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-serif text-[#6f7c4e] mb-8 leading-tight"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-12 h-[1px] bg-[#9a7d45]/40" />
          <div className="w-2 h-2 rotate-45 border border-[#9a7d45]" />
          <div className="w-12 h-[1px] bg-[#9a7d45]/40" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[#2c3e50]/70 text-base md:text-lg font-serif italic max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
