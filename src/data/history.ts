import { ROUTES } from '@/data/navigation'
import type { ClubHistoryContent, HistoryEvent } from '@/types'

/*
 * Histoire du club — informations OFFICIELLES communiquées par le club.
 * Les textes sont repris tels quels : ne rien ajouter, ne rien reformuler sans validation.
 */

/** Date de création du club (13 mai 1991). */
export const CLUB_FOUNDED = '1991-05-13'

export const historyIntro = {
  eyebrow: 'Depuis 1991',
  // Composition typographique de la section — pas un slogan officiel du club.
  title: {
    lines: ['Une salle.'],
    accent: 'Une histoire.',
  },
  paragraphs: [
    'Créé le 13 mai 1991, le Boxing Club de la Plaine était initialement destiné aux boxeurs professionnels du monde entier. Les plus grands boxeurs se sont croisés et entraînés dans cette salle.',
    'En 2000, le club s’est ouvert à la pratique de la boxe amateur et éducative d’assaut.',
    'En 2019, le club a modernisé ses équipements avec de nouveaux sacs de frappe, une barre d’esquive et une salle complète de préparation physique.',
  ],
}

export const historyEvents: HistoryEvent[] = [
  { id: '1991', year: '1991', date: CLUB_FOUNDED, title: 'Création du club' },
  { id: '2000', year: '2000', title: 'Ouverture à la boxe amateur et éducative d’assaut' },
  {
    id: '2019',
    year: '2019',
    title: 'Modernisation des équipements et création de la salle de préparation physique',
  },
]

export const clubPhilosophy = {
  text: 'Le club est un club familial où les débutants sont mêlés aux compétiteurs afin de créer une émulation et une cohésion de groupe.',
  highlight: 'club familial',
}

/** Contenu de la section « Histoire du club » de la homepage. */
export const CLUB_HISTORY: ClubHistoryContent = {
  ...historyIntro,
  events: historyEvents,
  philosophy: clubPhilosophy,
  action: { label: 'Découvrir l’histoire', href: ROUTES.club },
  // TODO : photographie d'archive ou du club. Tant qu'elle manque, `media` reste absent :
  // la section fonctionne sans, et ne réutilise pas la photographie du hero.
}
