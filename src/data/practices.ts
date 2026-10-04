import { ROUTES } from '@/data/navigation'
import { PLACEHOLDER_IMAGE, TODO } from '@/data/site'
import type { Practice } from '@/types'

/*
 * Les quatre pratiques sont listées dans docs/07-content.md.
 * TODO : descriptions, tranches d'âge et photographies réelles à fournir par le club.
 */
export const practices: Practice[] = [
  {
    id: 'boxe-loisir',
    title: 'Boxe loisir',
    shortDescription: TODO,
    image: PLACEHOLDER_IMAGE,
    href: ROUTES.cours,
  },
  {
    id: 'competition',
    title: 'Compétition',
    shortDescription: TODO,
    image: PLACEHOLDER_IMAGE,
    href: ROUTES.cours,
  },
  {
    id: 'boxe-educative',
    title: 'Boxe éducative',
    shortDescription: TODO,
    image: PLACEHOLDER_IMAGE,
    href: ROUTES.cours,
  },
  {
    id: 'baby-boxe',
    title: 'Baby boxe',
    shortDescription: TODO,
    image: PLACEHOLDER_IMAGE,
    href: ROUTES.cours,
  },
]
