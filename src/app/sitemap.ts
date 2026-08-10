import { MetadataRoute } from 'next'
import { getAllArticles, listCategories, getCategorySlug, getArticle, CATEGORY_MAP } from '../lib/blog'
import { localizePath, type Locale } from '../lib/i18n/locales'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lajuanacerrotusa.com'
  const now = new Date()

  // Rutas estáticas del sitio
  const staticRoutes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/tours/ascenso-sagrado', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/tours/retiro-diosa-espejo', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/galeria', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/politicas', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/gracias', changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const entries: MetadataRoute.Sitemap = []

  // Rutas estáticas — el slug de cada ruta se traduce por idioma
  // (p.ej. /galeria → /gallery en inglés, /tours/ascenso-sagrado → /tours/sacred-ascent)
  const pathForLocale = (locale: Locale, path: string): string => {
    const localized = localizePath(path, locale)
    return localized === '/' ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}${localized}`
  }

  for (const route of staticRoutes) {
    const localeUrls = {
      es: pathForLocale('es', route.path),
      en: pathForLocale('en', route.path),
    }
    for (const locale of ['es', 'en'] as const) {
      entries.push({
        url: localeUrls[locale],
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            es: localeUrls.es,
            en: localeUrls.en,
            'x-default': localeUrls.es,
          },
        },
      })
    }
  }

  // Rutas del blog — índice por idioma
  for (const locale of ['es', 'en'] as const) {
    const url = `${baseUrl}/${locale}/blog`
    entries.push({
      url,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/es/blog`,
          en: `${baseUrl}/en/blog`,
          'x-default': `${baseUrl}/es/blog`,
        },
      },
    })
  }

  // Rutas del blog — categorías por idioma
  for (const locale of ['es', 'en'] as const) {
    for (const cat of listCategories(locale)) {
      const url = `${baseUrl}/${locale}/blog/${cat.slug}`
      const otherLocale = locale === 'es' ? 'en' : 'es'
      const otherCatKey = cat.key
      const otherSlug = getCategorySlug(otherCatKey, otherLocale)
      entries.push({
        url,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: {
            [locale]: url,
            [otherLocale]: otherSlug ? `${baseUrl}/${otherLocale}/blog/${otherSlug}` : `${baseUrl}/${otherLocale}/blog`,
            'x-default': `${baseUrl}/es/blog/${CATEGORY_MAP[cat.key].es}`,
          },
        },
      })
    }
  }

  // Rutas del blog — artículos individuales por idioma
  for (const locale of ['es', 'en'] as const) {
    for (const article of getAllArticles(locale)) {
      const url = `${baseUrl}${article.href}`
      const lastmod = article.date ? new Date(article.date) : now

      // Construir hreflang cruzando con la otra versión si existe
      const languages: Record<string, string> = { 'x-default': `${baseUrl}/es/blog/${getCategorySlug(article.categoria, 'es')}/${article.slug_es ?? article.slug}` }
      const otherLocale = locale === 'es' ? 'en' : 'es'
      const otherSlug = locale === 'es' ? article.slug_en : article.slug_es
      const otherCat = locale === 'es' ? article.categoria_en : article.categoria_es
      languages[locale] = url
      if (otherSlug && otherCat) {
        const otherCatSlug = getCategorySlug(otherCat, otherLocale)
        if (otherCatSlug) {
          const otherExists = !!getArticle(otherLocale, otherCat, otherSlug)
          if (otherExists) {
            languages[otherLocale] = `${baseUrl}/${otherLocale}/blog/${otherCatSlug}/${otherSlug}`
          }
        }
      }

      entries.push({
        url,
        lastModified: lastmod,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: { languages },
      })
    }
  }

  return entries
}
