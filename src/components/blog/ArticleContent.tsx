"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

type Props = {
  content: string;
};

export function ArticleContent({ content }: Props) {
  return (
    <div className="prose-blog">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="text-3xl md:text-4xl font-serif text-[#6f7c4e] mt-14 mb-5 leading-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-serif text-[#6f7c4e] mt-10 mb-4 leading-tight">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-[#2c3e50]/85 text-base md:text-lg leading-[1.85] mb-6 font-serif">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="mb-6 space-y-2 pl-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-6 space-y-2 pl-1 list-decimal list-inside marker:text-[#9a7d45]">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-[#2c3e50]/85 text-base md:text-lg leading-[1.8] font-serif pl-2">
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong className="text-[#6f7c4e] font-semibold">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-[#9a7d45]">{children}</em>
          ),
          a: ({ href, children }) => {
            if (!href) return <>{children}</>;
            const isInternal = href.startsWith("/") || href.startsWith("#");
            if (isInternal) {
              return (
                <Link href={href} className="text-[#6f7c4e] underline decoration-[#9a7d45]/40 underline-offset-4 hover:decoration-[#9a7d45] transition-colors">
                  {children}
                </Link>
              );
            }
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#6f7c4e] underline decoration-[#9a7d45]/40 underline-offset-4 hover:decoration-[#9a7d45] transition-colors">
                {children}
              </a>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-[#9a7d45]/50 pl-6 my-8 italic font-serif text-[#6f7c4e]/80 text-lg">
              {children}
            </blockquote>
          ),
          hr: () => (
            <div className="flex items-center justify-center gap-4 my-12">
              <div className="w-16 h-[1px] bg-[#9a7d45]/30" />
              <div className="w-2 h-2 rotate-45 border border-[#9a7d45]/40" />
              <div className="w-16 h-[1px] bg-[#9a7d45]/30" />
            </div>
          ),
          img: ({ src, alt }) => {
            const srcStr = typeof src === "string" ? src : "";
            if (!srcStr) return null;
            return (
              <span className="block my-10">
                {/* Respetar la orientación natural de cada foto (las reales de la finca son verticales) */}
                <img
                  src={srcStr}
                  alt={alt ?? ""}
                  loading="lazy"
                  className="w-full h-auto shadow-lg rounded-sm"
                />
                {alt && (
                  <span className="block text-center text-xs md:text-sm text-[#9a7d45]/70 italic mt-3 font-serif">
                    {alt}
                  </span>
                )}
              </span>
            );
          },
          table: ({ children }) => (
            <div className="my-8 overflow-x-auto">
              <table className="w-full border-collapse text-sm md:text-base">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#6f7c4e]/10">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border border-[#9a7d45]/20 px-4 py-3 text-left font-serif text-[#6f7c4e] tracking-wide">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-[#9a7d45]/20 px-4 py-3 text-[#2c3e50]/80 font-serif">
              {children}
            </td>
          ),
          code: ({ children, className }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <pre className="bg-[#2c3e50] text-[#fffbf0] p-4 my-6 overflow-x-auto text-sm font-mono">
                  <code>{children}</code>
                </pre>
              );
            }
            return <code className="bg-[#6f7c4e]/10 text-[#6f7c4e] px-1.5 py-0.5 text-sm font-mono">{children}</code>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
