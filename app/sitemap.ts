import type { MetadataRoute } from 'next'
import { artworksData } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://not-found-ink.vercel.app'

  // Rutas estáticas
  const routes = [
    '',
    '/collection',
    '/artist',
    '/pedidos',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Rutas dinámicas de obras
  const artworks = Object.values(artworksData).map((artwork) => ({
    url: `${baseUrl}/collection/${artwork.id}`,
    lastModified: new Date(), // Idealmente esto vendría de la fecha de creación/edición
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...routes, ...artworks]
}
