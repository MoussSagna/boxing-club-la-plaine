import { COACHES_PAGE } from '@/data/coaches'
import { COURSES_PAGE } from '@/data/courses'
import { CLUB_FOUNDED, clubPhilosophy, historyEvents, historyIntro } from '@/data/history'
import { CTA_NAV, ROUTES } from '@/data/navigation'
import { PLANNING_PAGE } from '@/data/planning'
import { SITE } from '@/data/site'
import type { ClubPageContent, ClubPhoto } from '@/types'

/*
 * Page /club — l'histoire, la salle, l'esprit du club.
 *
 * Textes officiels (histoire, phrase sur le club familial) : importés de `src/data/history.ts`,
 * jamais recopiés. Textes des renvois : ceux déjà validés pour /coachs, /cours et /planning.
 * Les intitulés propres à cette page sont signalés « À VALIDER ».
 */

const DIR = '/assets/images/club'

/**
 * Photographies réelles de la salle (dossier client « la salle », originaux dans `sources/la-salle/`).
 * Ce sont des vues actuelles de la salle, pas des archives : ne jamais les associer à une date passée.
 * Seuls le format et les dimensions changent ; aucune retouche ajoutée.
 */
function photo(name: string, widths: number[], height: number, alt: string, focalPoint?: ClubPhoto['focalPoint']): ClubPhoto {
  const largest = widths.at(-1) ?? 0
  const list = (ext: string) => widths.map((w) => `${DIR}/${name}-${w}.${ext} ${w}w`).join(', ')
  return {
    src: `${DIR}/${name}-${largest}.jpg`,
    srcSet: list('jpg'),
    sources: [{ type: 'image/avif', srcSet: list('avif') }],
    width: largest,
    height,
    alt,
    focalPoint,
  }
}

const PHOTOS = {
  ring: photo(
    'salle-ring',
    [720, 1086],
    1448,
    'La salle du club : le ring bleu au fond, le sol rouge au premier plan, les néons au plafond.',
    { x: 50, y: 62 },
  ),
  ringCorner: photo(
    'salle-ring-coin',
    [720, 1086],
    1448,
    'Un coin du ring : tapis bleu, cordes rouges, blanches et bleues, protections de coin.',
    { x: 55, y: 70 },
  ),
  bags: photo(
    'salle-sacs',
    [720, 1086],
    1448,
    'L’espace d’entraînement : sacs de frappe suspendus, sol rouge, miroirs et vestiaires.',
    { x: 60, y: 55 },
  ),
}

export const CLUB_PAGE: ClubPageContent = {
  hero: {
    eyebrow: `${SITE.name} — ${SITE.location}`,
    // Composition typographique déjà utilisée sur l'accueil : pas un slogan officiel.
    title: historyIntro.title,
    founded: CLUB_FOUNDED,
    // À VALIDER — libellé repris de la timeline officielle.
    foundedLabel: historyEvents[0]?.title ?? '',
    photo: PHOTOS.ring,
  },

  story: {
    eyebrow: historyIntro.eyebrow,
    // À VALIDER — intitulé ajouté pour la page.
    title: { lines: ['Trois dates,'], accent: 'une salle.' },
    // Chaque date officielle reçoit le paragraphe officiel qui la raconte (même ordre : 1991, 2000, 2019).
    chapters: historyEvents.map((event, index) => ({
      event,
      text: historyIntro.paragraphs[index] ?? '',
    })),
  },

  space: {
    eyebrow: 'La salle',
    // À VALIDER — intitulé descriptif ajouté pour la page (ce que montrent les photographies).
    // La salle compte deux rings.
    title: { lines: ['Les rings.', 'Les sacs.'], accent: 'Le sol rouge.' },
    frames: [
      { id: 'rings', caption: 'Les rings', photo: PHOTOS.ringCorner },
      { id: 'sacs', caption: 'Les sacs de frappe', photo: PHOTOS.bags },
    ],
  },

  spirit: {
    eyebrow: 'L’esprit du club',
    // Composition demandée par le client, tirée de la phrase officielle.
    title: { lead: 'Les débutants', connector: 'avec les', accent: 'compétiteurs.' },
    philosophy: clubPhilosophy,
  },

  // Témoignages de membres : à renseigner quand le club les aura recueillis.
  // Liste vide : la section n'est pas affichée (ni titre, ni emplacement vide).
  testimonials: {
    // À VALIDER — intitulés prévus pour la section, affichés seulement avec des témoignages.
    eyebrow: 'Les membres',
    title: 'Ils racontent le club.',
    items: [],
  },

  next: [
    {
      eyebrow: 'Les coachs',
      title: COACHES_PAGE.title,
      text: COACHES_PAGE.text,
      links: [{ label: 'Découvrir les coachs', href: ROUTES.coachs }],
    },
    {
      eyebrow: COURSES_PAGE.hero.eyebrow,
      title: COURSES_PAGE.hero.title,
      text: COURSES_PAGE.hero.text,
      links: [
        { label: 'Voir les cours', href: ROUTES.cours },
        { label: 'Voir le planning', href: ROUTES.planning },
      ],
    },
  ],

  outro: {
    // Titre demandé par le client ; phrase reprise de la page Planning (validée).
    title: { lines: ['Entrez dans'], accent: 'la salle.' },
    text: PLANNING_PAGE.outro.text,
    primaryCta: CTA_NAV,
    secondaryCta: { label: 'Nous trouver', href: ROUTES.contact },
  },
}
