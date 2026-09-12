import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/es/admin/', '/en/admin/', '/api/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'anthropic-ai',
          'PerplexityBot',
          'Perplexity-Search',
          'Applebot-Extended',
          'Google-Extended',
          'cohere-ai',
        ],
        allow: '/',
        disallow: ['/admin/', '/es/admin/', '/en/admin/', '/api/'],
      },
    ],
    sitemap: 'https://www.lajuanacerrotusa.com/sitemap.xml',
  }
}
