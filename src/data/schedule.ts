import { ROUTES } from '@/data/navigation'
import type { ScheduleDay, TrainingScheduleContent } from '@/types'

/*
 * Planning des entraînements — informations OFFICIELLES communiquées par le club.
 * Horaires, encadrants, disciplines et contenus sont repris tels quels :
 * ne rien ajouter, ne rien renommer sans validation.
 *
 * - Les encadrants sont référencés par leur identifiant (`src/data/coaches.ts`) :
 *   leur nom n'est écrit qu'à un seul endroit.
 * - « Sparing » est l'orthographe communiquée par le club : elle est conservée.
 * - Les séances du mercredi après-midi n'ont ni discipline ni contenu communiqués,
 *   seulement une tranche d'âge : rien n'est déduit.
 */
export const scheduleDays: ScheduleDay[] = [
  {
    id: 'monday',
    label: 'Lundi',
    short: 'Lun',
    sessions: [
      {
        id: 'monday-1800',
        day: 'monday',
        start: '18:00',
        end: '20:30',
        coachIds: ['laurent-vantheemst', 'jean-paul-guinvanna'],
        disciplines: ['BEA', 'BA'],
      },
    ],
  },
  {
    id: 'tuesday',
    label: 'Mardi',
    short: 'Mar',
    sessions: [
      {
        id: 'tuesday-1800',
        day: 'tuesday',
        start: '18:00',
        end: '19:30',
        coachIds: ['paul-marius'],
        disciplines: ['BEA', 'BA'],
        tags: ['Technique', 'Cardio'],
      },
    ],
  },
  {
    id: 'wednesday',
    label: 'Mercredi',
    short: 'Mer',
    sessions: [
      {
        id: 'wednesday-1530',
        day: 'wednesday',
        start: '15:30',
        end: '16:30',
        ageRange: '6/11 ans',
        coachIds: ['manuel-tavares'],
        disciplines: [],
      },
      {
        id: 'wednesday-1630',
        day: 'wednesday',
        start: '16:30',
        end: '18:00',
        ageRange: '12/16 ans',
        coachIds: ['manuel-tavares'],
        disciplines: [],
      },
      {
        id: 'wednesday-1800',
        day: 'wednesday',
        start: '18:00',
        end: '20:00',
        // Christophe Tiozzo, initialement annoncé sur ce créneau, n'est plus présent dans la salle.
        coachIds: ['manuel-tavares'],
        disciplines: ['BEA', 'BA'],
        tags: ['Sparing', 'Préparation physique'],
      },
    ],
  },
  {
    id: 'thursday',
    label: 'Jeudi',
    short: 'Jeu',
    sessions: [
      {
        id: 'thursday-1800',
        day: 'thursday',
        start: '18:00',
        end: '19:30',
        coachIds: ['matthias-hourde'],
        disciplines: ['BEA', 'BA'],
        tags: ['Technique', 'Cardio', 'Sparing'],
      },
    ],
  },
  {
    id: 'friday',
    label: 'Vendredi',
    short: 'Ven',
    sessions: [
      {
        id: 'friday-1800',
        day: 'friday',
        start: '18:00',
        end: '20:00',
        coachIds: ['paul-marius'],
        disciplines: ['BEA', 'BA'],
        tags: ['Technique', 'Cardio'],
      },
    ],
  },
  {
    id: 'saturday',
    label: 'Samedi',
    short: 'Sam',
    sessions: [
      {
        id: 'saturday-1200',
        day: 'saturday',
        start: '12:00',
        end: '13:00',
        coachIds: ['matthias-hourde'],
        disciplines: ['BEA', 'BA'],
      },
    ],
  },
  {
    id: 'sunday',
    label: 'Dimanche',
    short: 'Dim',
    sessions: [
      {
        id: 'sunday-1000',
        day: 'sunday',
        start: '10:00',
        end: '12:00',
        coachIds: ['manuel-tavares'],
        disciplines: ['BEA'],
        tags: ['Technique', 'Sparing'],
      },
      {
        id: 'sunday-1200',
        day: 'sunday',
        start: '12:00',
        end: '14:00',
        coachIds: ['manuel-tavares'],
        disciplines: ['BA'],
        tags: ['Passage de gants'],
      },
    ],
  },
]

/** Contenu de la section « Entraînements » de la homepage. */
export const TRAINING_SCHEDULE: TrainingScheduleContent = {
  eyebrow: 'Planning',
  // VALIDÉ par le client comme titre éditorial du site.
  // Ce n'est PAS un slogan officiel du club : ne pas le présenter comme tel.
  title: {
    lines: ['À chaque jour,'],
    accent: 'son round.',
  },
  days: scheduleDays,
  action: { label: 'Voir le planning complet', href: ROUTES.planning },
}
