import type { Coach, CoachesPageContent, CoachPhoto } from '@/types'

/*
 * Encadrants — informations communiquées par le club.
 * - Diplômes, fonctions et titres : repris tels quels.
 * - Style de cours (intitulé et description) : formulations fournies par le client pour
 *   présenter chaque coach. Ce sont des descriptions, pas des slogans officiels.
 * - Photographies : uniquement des photos réelles. Aucune image générée.
 *
 * L'ordre de la liste est l'ordre d'affichage de la page /coachs.
 */

const IMAGES = '/assets/images/coaches'

/** Portrait fourni en une seule taille (AVIF d'origine + JPEG de repli). */
function singlePhoto(
  file: string,
  photo: Omit<CoachPhoto, 'src' | 'srcSet' | 'sources'>,
): CoachPhoto {
  return {
    ...photo,
    src: `${IMAGES}/${file}.jpg`,
    sources: [{ type: 'image/avif', srcSet: `${IMAGES}/${file}.avif` }],
  }
}

/** Photo disponible en deux largeurs (AVIF + JPEG). */
function responsivePhoto(
  file: string,
  widths: [number, number],
  photo: Omit<CoachPhoto, 'src' | 'srcSet' | 'sources'>,
): CoachPhoto {
  const set = (extension: string) =>
    widths.map((width) => `${IMAGES}/${file}-${width}.${extension} ${width}w`).join(', ')

  return {
    ...photo,
    src: `${IMAGES}/${file}-${widths[1]}.jpg`,
    srcSet: set('jpg'),
    sources: [{ type: 'image/avif', srcSet: set('avif') }],
  }
}

export const coaches: Coach[] = [
  {
    id: 'laurent-vantheemst',
    name: 'Laurent Vantheemst',
    status: 'current',
    qualifications: ['Cadre technique', 'Arbitre national', 'Préparateur mental diplômé'],
    style: {
      label: 'Boxe académique',
      description:
        'Une approche académique et structurée autour des fondamentaux, de la précision technique et de la rigueur pugilistique.',
    },
    photos: [
      singlePhoto('laurent-vantheemst', {
        kind: 'action',
        width: 471,
        height: 646,
        alt: 'Laurent Vantheemst, mains ouvertes, en pleine explication dans la salle.',
        focalPoint: { x: 42, y: 20 },
      }),
    ],
  },
  {
    id: 'paul-marius',
    name: 'Paul Marius',
    status: 'current',
    qualifications: ['Prévôt fédéral', 'Cutman-soigneur'],
    style: {
      label: 'Esprit club',
      description:
        'Une approche technique portée par l’énergie de la salle et une vraie ambiance de club, inspirée de la culture des boxing gyms américains.',
    },
    photos: [
      singlePhoto('paul-marius', {
        kind: 'action',
        width: 510,
        height: 646,
        alt: 'Paul Marius ajuste le casque d’un boxeur dans le coin du ring.',
        focalPoint: { x: 70, y: 45 },
      }),
    ],
  },
  {
    id: 'manuel-tavares',
    name: 'Manuel Tavares',
    status: 'current',
    qualifications: [
      'Brevet Professionnel de la Jeunesse, de l’Éducation Populaire et du Sport (BPJEPS)',
      'Cutman-soigneur',
    ],
    achievements: ['Vice-Champion d’Europe de MMA'],
    style: {
      label: 'Physique → Assaut',
      description:
        'On construit l’intensité avec la préparation physique avant de la mettre en pratique dans les assauts.',
    },
    photos: [
      singlePhoto('manuel-tavares', {
        kind: 'portrait',
        width: 436,
        height: 590,
        alt: 'Portrait de Manuel Tavares, bras croisés, en extérieur.',
        focalPoint: { x: 50, y: 25 },
      }),
    ],
  },
  {
    id: 'matthias-hourde',
    name: 'Matthias Hourdé',
    status: 'current',
    qualifications: [
      'Brevet Professionnel de la Jeunesse, de l’Éducation Populaire et du Sport (BPJEPS)',
      'Cutman-soigneur',
    ],
    style: {
      label: 'Technique → Assauts à thème',
      description:
        'Un travail technique précis suivi d’assauts à thème pour mettre les acquis directement en pratique.',
    },
    photos: [
      singlePhoto('matthias-hourde', {
        kind: 'portrait',
        width: 453,
        height: 656,
        alt: 'Portrait de Matthias Hourdé, souriant.',
        focalPoint: { x: 48, y: 30 },
      }),
    ],
  },
  {
    id: 'jerome-loubet',
    name: 'Jérôme Loubet',
    status: 'current',
    qualifications: ['Prévôt fédéral', 'Cutman-soigneur'],
    style: {
      label: 'Condition physique',
      description:
        'Des séances orientées condition physique et cardio pour développer endurance, intensité et capacité à tenir le rythme.',
    },
    // TODO : photographie réelle de Jérôme. Tant qu'elle manque, la liste reste vide et la page
    // affiche un état « Photo à venir ». Ne jamais y mettre une image générée ou de remplacement.
    photos: [],
  },
  {
    id: 'jean-paul-guinvanna',
    name: 'Jean-Paul Guinvanna',
    status: 'current',
    qualifications: ['Prévôt fédéral', 'Cutman-soigneur'],
    style: {
      label: 'Boxe complète',
      description:
        'Des séances complètes qui mêlent technique, préparation physique, cardio, travail aux sacs, déplacements, mise en situation et assauts.',
    },
    photos: [
      // Rognée d'un pixel (928 × 1692) : les AVIF aux dimensions impaires s'affichent en noir.
      responsivePhoto('jean-paul-guinvanna-action', [600, 928], {
        kind: 'action',
        width: 928,
        height: 1692,
        alt: 'Jean-Paul Guinvanna donne ses consignes à un boxeur casqué, accoudé aux cordes du ring.',
        focalPoint: { x: 50, y: 22 },
      }),
    ],
  },
  {
    // Christophe Tiozzo n'est plus présent actuellement dans la salle (information du client).
    // Sa fiche est conservée pour une éventuelle section historique : elle n'apparaît
    // ni parmi les coachs, ni au planning.
    id: 'christophe-tiozzo',
    name: 'Christophe Tiozzo',
    status: 'former',
    qualifications: ['Prévôt fédéral', 'Cutman-soigneur'],
    achievements: [
      'Médaillé de bronze aux Jeux Olympiques de Los Angeles 1984',
      'Champion du monde WBA 1990',
    ],
    photos: [],
  },
]

/** Coachs qui encadrent actuellement, dans l'ordre d'affichage. */
export const currentCoaches = coaches.filter((coach) => coach.status === 'current')

/** Contenu d'introduction de la page /coachs. */
export const COACHES_PAGE: CoachesPageContent = {
  eyebrow: 'Les visages du club',
  // Titre et texte : formulations éditoriales validées par le client pour la page,
  // pas des slogans officiels du club.
  title: {
    lines: ['Ceux qui font'],
    accent: 'vivre la salle.',
  },
  text: 'Six coachs. Six approches. Une même exigence : faire progresser chaque boxeur.',
}

const coachesById = new Map(coaches.map((coach) => [coach.id, coach]))

/**
 * Nom d'un encadrant à partir de son identifiant : une seule orthographe dans tout le site.
 * Un identifiant inconnu est une erreur de saisie dans les données : on la rend visible.
 */
export function getCoachName(id: string) {
  const coach = coachesById.get(id)
  if (!coach) throw new Error(`Encadrant inconnu : « ${id} »`)
  return coach.name
}
