import { useEffect } from 'react'
import { SITE } from '@/data/site'

type PageMeta = {
  /** Titre de la page, sans le nom du site. Omis sur l'accueil. */
  title?: string
  description?: string
  /** Chemin de la route, ex. `/club`. */
  path: string
  /** Demande aux moteurs de ne pas indexer la page (404, pages internes). */
  noindex?: boolean
}

function setContent(selector: string, content: string) {
  document.head.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content)
}

/**
 * Met à jour title, description, canonical et Open Graph pour la page courante.
 * Les balises existent déjà dans index.html (valeurs par défaut) : on les
 * modifie au lieu d'en créer, pour éviter tout doublon.
 */
export function usePageMeta({
  title,
  description = SITE.description,
  path,
  noindex = false,
}: PageMeta) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE.name}` : SITE.defaultTitle
    const url = new URL(path, SITE.url).href

    document.title = fullTitle
    setContent('meta[name="description"]', description)
    setContent('meta[property="og:title"]', fullTitle)
    setContent('meta[property="og:description"]', description)
    setContent('meta[property="og:url"]', url)
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', url)

    if (!noindex) return

    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex, nofollow'
    document.head.append(robots)
    return () => robots.remove()
  }, [title, description, path, noindex])
}
