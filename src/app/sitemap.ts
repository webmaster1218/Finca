import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lajuanacerrotusa.com'
  const now = new Date()

  // Todas las rutas públicas del sitio, traducidas por idioma
  const routes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/tours/ascenso-sagrado', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/tours/retiro-diosa-espejo', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/galeria', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/politicas', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/gracias', changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const entries: MetadataRoute.Sitemap = []

  for (const route of routes) {
    for (const locale of ['es', 'en'] as const) {
      const url = `${baseUrl}/${locale}${route.path}`

      const alternateLanguages: Record<string, string> = {}
      for (const l of ['es', 'en'] as const) {
        alternateLanguages[l] = `${baseUrl}/${l}${route.path}`
      }

      entries.push({
        url,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            ...alternateLanguages,
            'x-default': `${baseUrl}/es${route.path}`,
          },
        },
      })
    }
  }

  return entries
}
