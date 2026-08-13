"use client";

import { motion } from "framer-motion";

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function BlogHero({ eyebrow, title, subtitle }: Props) {
  const titleParts = title.split(" del ");
  const hasDel = titleParts.length === 2;

  return (
    <section className="relative pt-40 pb-24 md:pt-48 md:pb-28 px-6 bg-[#fffbf0] overflow-hidden">
      {/* Línea decorativa superior */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-transparent to-[#9a7d45]/40 pointer-events-none" />

      {/* Halos de fondo */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute -top-16 -right-16 w-[30rem] h-[30rem] rounded-full bg-[#6f7c4e] blur-[70px]" />
        <div className="absolute -bottom-16 -left-16 w-[28rem] h-[28rem] rounded-full bg-[#9a7d45] blur-[70px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-[#9a7d45] font-serif tracking-[0.4em] text-xs md:text-sm mb-10 uppercase"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[#6f7c4e] mb-12 leading-[1.05] tracking-tight font-serif"
          style={{ fontSize: "clamp(2.75rem, 7vw, 4.5rem)" }}
        >
          {hasDel ? (
            <>
              {titleParts[0]}
              <br />
              del {titleParts[1]}
            </>
          ) : (
            title
          )}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className="w-12 h-px bg-[#9a7d45]/30" />
          <div className="w-2 h-2 rotate-45 border border-[#9a7d45]" />
          <div className="w-12 h-px bg-[#9a7d45]/30" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[#2c3e50]/70 font-serif italic leading-relaxed max-w-2xl mx-auto"
          style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)" }}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
