import { CTA_NAV, ROUTES } from '@/data/navigation'
import type { PlanningPageContent } from '@/types'

/*
 * Page /planning — contenu éditorial uniquement.
 * Les horaires, encadrants et mentions de séance restent dans `src/data/schedule.ts`,
 * seule source du planning : rien n'est recopié ici.
 *
 * Textes fournis par le client : formulations éditoriales, pas des slogans officiels.
 */
export const PLANNING_PAGE: PlanningPageContent = {
  hero: {
    eyebrow: 'Le planning',
    closing: 'À vous de choisir votre rythme.',
    primaryCta: { label: 'Voir les cours', href: ROUTES.cours },
    secondaryCta: { label: 'Rencontrer les coachs', href: ROUTES.coachs },
  },

  sheetTitle: 'Les entraînements de la semaine',

  // Des repères de lecture, PAS des filtres ni des catégories officielles.
  // Chaque repère regroupe les séances d'après les mentions exactes du planning.
  markers: {
    eyebrow: 'Choisir sa séance',
    title: { lines: ['Quel rythme'], accent: 'vous correspond ?' },
    text: 'Quelques repères pour lire le planning, d’après les mentions de chaque séance.',
    items: [
      { id: 'technique', label: 'Technique', tags: ['Technique'] },
      { id: 'cardio', label: 'Cardio', tags: ['Cardio'] },
      { id: 'preparation-physique', label: 'Préparation physique', tags: ['Préparation physique'] },
      // À VALIDER par le club : le planning ne porte pas la mention « Assaut ».
      // Ce repère regroupe les séances indiquées « Sparing » ou « Passage de gants ».
      { id: 'assaut', label: 'Assaut', tags: ['Sparing', 'Passage de gants'] },
      { id: 'jeunes', label: 'Jeunes', youth: true },
    ],
    action: { label: 'Voir les cours', href: ROUTES.cours },
  },

  coaches: {
    eyebrow: 'Les coachs',
    title: { lines: ['Chaque séance'], accent: 'a son approche.' },
    text: 'Découvrez les coachs et leurs méthodes.',
    action: { label: 'Rencontrer les coachs', href: ROUTES.coachs },
  },

  outro: {
    title: { lines: ['Votre créneau'], accent: 'est là.' },
    text: 'Il ne reste plus qu’à pousser la porte.',
    primaryCta: CTA_NAV,
    secondaryCta: { label: 'Voir les cours', href: ROUTES.cours },
  },
}
