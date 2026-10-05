import type { NavItem } from '@/types'

export const ROUTES = {
  home: '/',
  club: '/club',
  cours: '/cours',
  planning: '/planning',
  coachs: '/coachs',
  actualites: '/actualites',
  inscription: '/inscription',
  contact: '/contact',
  /** Page interne (développement), absente de la navigation et du sitemap. */
  designSystem: '/design-system',
} as const

/** Navigation principale (header desktop + menu mobile). */
export const MAIN_NAV: NavItem[] = [
  { label: 'Club', href: ROUTES.club },
  { label: 'Cours', href: ROUTES.cours },
  { label: 'Planning', href: ROUTES.planning },
  { label: 'Coachs', href: ROUTES.coachs },
  // « Actualités » est retiré de la navigation pour le moment (demande du client).
  // La route /actualites existe toujours : il suffit de remettre l'entrée ici.
]

/** Liens secondaires (menu mobile + footer). */
export const SECONDARY_NAV: NavItem[] = [{ label: 'Contact', href: ROUTES.contact }]

export const CTA_NAV: NavItem = { label: 'Inscription', href: ROUTES.inscription }
