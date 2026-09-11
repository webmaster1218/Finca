import { NextRequest, NextResponse } from "next/server";
import { getArticleByAnySlug } from "@/lib/blog";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n/locales";

type RouteContext = {
  params: Promise<{
    locale: string;
    categoria: string;
    slug: string;
  }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
): Promise<Response> {
  const { locale, categoria, slug } = await context.params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;

  const article = getArticleByAnySlug(lang, categoria, slug);

  if (!article) {
    return new NextResponse("Artículo no encontrado", { status: 404 });
  }

  const markdownContent = `---
title: "${article.title}"
description: "${article.meta_description ?? article.description ?? ""}"
date: "${article.date}"
author: "${article.autor}"
locale: "${lang}"
url: "https://lajuanacerrotusa.com${article.href}"
keyword_principal: "${article.keyword_principal ?? ""}"
---

# ${article.title}

${article.content}
`;

  return new NextResponse(markdownContent, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
