/*
 * Informations globales du site.
 * Les coordonnées du club sont dans `src/data/contact.ts`.
 * Les valeurs name / description / url sont dupliquées en statique dans
 * index.html, public/sitemap.xml et public/robots.txt : les garder synchronisées.
 */

/** Marqueur de donnée manquante — ne jamais inventer (docs/13-agent-rules.md). */
export const TODO = 'TODO'

/** Visuel temporaire, à remplacer par une vraie photographie. */
export const PLACEHOLDER_IMAGE = '/assets/images/placeholder.svg'

export const SITE = {
  name: 'Boxing Club de la Plaine',
  location: 'Paris 15',
  tagline: 'La boxe, sans compromis.',
  url: 'https://www.boxingclubdelaplaine.com',
  defaultTitle: 'Boxing Club de la Plaine — Club de boxe à Paris 15',
  description:
    'Boxing Club de la Plaine, club de boxe à Paris 15. Boxe loisir, compétition, boxe éducative et baby boxe. La boxe, sans compromis.',
  logo: {
    light: '/assets/logo/logo-256.png',
    dark: '/assets/logo/logo-dark-512.png',
  },
} as const
