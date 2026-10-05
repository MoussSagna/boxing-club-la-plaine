import { ROUTES } from '@/data/navigation'
import type { CoursesPageContent } from '@/types'

/*
 * Page /cours — « Qu'est-ce que je vais faire ? Quel entraînement me correspond ? »
 *
 * Textes fournis par le client. Ce sont des formulations éditoriales : ni slogans officiels,
 * ni programme officiel, ni niveaux ou catégories d'inscription.
 * Rien d'autre n'est ajouté : pas d'horaires, de tarifs, de règles d'accès ni de matériel.
 *
 * Les coachs sont référencés par identifiant (`src/data/coaches.ts`), qui reste la source
 * de vérité pour leurs noms et leur style de cours.
 */
export const COURSES_PAGE: CoursesPageContent = {
  hero: {
    eyebrow: 'Les cours',
    title: { lines: ['Apprendre.', 'Travailler.'], accent: 'Combattre.' },
    text: 'De la technique aux assauts, chaque séance a son rythme.',
    primaryCta: { label: 'Voir le planning', href: ROUTES.planning },
    secondaryCta: { label: 'Rencontrer les coachs', href: ROUTES.coachs },
  },

  intro: {
    eyebrow: 'Les séances',
    title: { lines: ['Pas une seule'], accent: 'façon de boxer.' },
    text: [
      'Chaque coach apporte sa méthode, son expérience et son énergie.',
      'Technique, condition physique, cardio, préparation, assauts : les séances se complètent pour construire un boxeur plus complet.',
    ],
  },

  approaches: {
    eyebrow: 'Les approches',
    title: 'Ce qu’on travaille',
    items: [
      {
        id: 'technique',
        title: 'Technique',
        intro: 'Les fondamentaux avant tout.',
        points: [
          'Garde',
          'Déplacements',
          'Coups',
          'Enchaînements',
          'Précision',
          'Défense',
          'Travail aux sacs',
        ],
        coachIds: ['laurent-vantheemst', 'matthias-hourde', 'paul-marius'],
      },
      {
        id: 'preparation-physique',
        title: 'Préparation physique',
        intro: 'Construire le moteur.',
        points: [
          'Endurance',
          'Cardio',
          'Intensité',
          'Préparation physique',
          'Capacité à tenir les rounds',
        ],
        coachIds: ['manuel-tavares', 'jerome-loubet', 'jean-paul-guinvanna'],
      },
      {
        id: 'assauts',
        title: 'Assauts',
        intro: 'Mettre la technique à l’épreuve.',
        points: [
          'Mise en situation',
          'Opposition',
          'Lecture de l’adversaire',
          'Rythme',
          'Distance',
          'Application du travail technique',
        ],
        // Consigne du client : ne pas présenter les assauts comme obligatoires pour tous.
        note: 'Les assauts ne concernent pas tous les pratiquants.',
        coachIds: ['manuel-tavares', 'jean-paul-guinvanna'],
      },
      {
        id: 'assauts-a-theme',
        title: 'Assauts à thème',
        intro: 'Travailler avec un objectif précis.',
        description:
          'Une situation d’assaut avec une consigne précise pour travailler un aspect particulier du jeu.',
        coachIds: ['matthias-hourde'],
      },
      {
        id: 'cardio-condition-physique',
        title: 'Cardio & condition physique',
        intro: 'Tenir le rythme.',
        description:
          'Des séances orientées cardio et condition physique pour développer endurance, intensité et capacité à maintenir l’effort.',
        coachIds: ['jerome-loubet'],
      },
      {
        id: 'boxe-complete',
        title: 'Boxe complète',
        intro: 'Tout mettre ensemble.',
        description:
          'Des séances complètes qui mêlent technique, préparation physique, cardio, travail aux sacs, déplacements, mise en situation et assauts.',
        coachIds: ['jean-paul-guinvanna'],
      },
    ],
    action: { label: 'Rencontrer les coachs', href: ROUTES.coachs },
  },

  // Le style d'ambiance des séances de Paul Marius : une description, pas une affirmation
  // historique ni un argument officiel du club.
  spotlight: {
    eyebrow: 'Avec Paul Marius',
    title: 'Esprit club',
    coachId: 'paul-marius',
    quote:
      'Une approche technique, mais toujours avec cette énergie de salle qui fait penser aux boxing gyms américains.',
    points: ['Travail technique', 'Ambiance de salle', 'Esprit collectif'],
  },

  // Des profils pour se reconnaître — pas des niveaux officiels ni des catégories d'inscription.
  profiles: {
    eyebrow: 'Pour qui ?',
    title: 'Trouver son rythme',
    items: [
      {
        id: 'debuter',
        question: 'Tu commences ?',
        label: 'Débuter',
        description: 'Découvrir les fondamentaux et apprendre les bases.',
      },
      {
        id: 'progresser',
        question: 'Tu veux progresser ?',
        label: 'Progresser',
        description: 'Approfondir sa technique et développer sa condition.',
      },
      {
        id: 's-entrainer',
        question: 'Tu reprends ?',
        label: 'S’entraîner',
        description: 'Travailler l’intensité, le cardio et la préparation physique.',
      },
      {
        id: 'se-confronter',
        question: 'Tu veux boxer ?',
        label: 'Se confronter',
        description:
          'Pour les pratiquants concernés par les assauts et la pratique compétitive.',
      },
    ],
  },

  outro: {
    eyebrow: 'Maintenant, trouve ton créneau',
    closing: 'Une salle.',
    primaryCta: { label: 'Voir le planning', href: ROUTES.planning },
    secondaryCta: { label: 'Voir les coachs', href: ROUTES.coachs },
  },
}
