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
} as const

/** Navigation principale (header desktop + menu mobile). */
export const MAIN_NAV: NavItem[] = [
  { label: 'Club', href: ROUTES.club },
  { label: 'Cours', href: ROUTES.cours },
  { label: 'Planning', href: ROUTES.planning },
  { label: 'Coachs', href: ROUTES.coachs },
  { label: 'Actualités', href: ROUTES.actualites },
]

/** Liens secondaires (menu mobile + footer). */
export const SECONDARY_NAV: NavItem[] = [{ label: 'Contact', href: ROUTES.contact }]

export const CTA_NAV: NavItem = { label: 'Inscription', href: ROUTES.inscription }
