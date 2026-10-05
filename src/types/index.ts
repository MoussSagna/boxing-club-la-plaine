/*
 * Types métier — référence : docs/07-content.md
 */

export type Practice = {
  id: string
  title: string
  shortDescription: string
  image: string
  ageRange?: string
  href: string
}

export type CoachPhoto = {
  /** `portrait` : le coach seul. `action` : en situation dans la salle ou au bord du ring. */
  kind: 'portrait' | 'action'
  /** Image de repli (JPEG). */
  src: string
  srcSet?: string
  /** Formats modernes (AVIF). */
  sources?: { type: string; srcSet: string }[]
  width: number
  height: number
  alt: string
  /** Point d'intérêt de l'image, en % : il reste dans le cadre au recadrage. */
  focalPoint?: { x: number; y: number }
}

export type Coach = {
  id: string
  name: string
  /** `former` : n'encadre plus actuellement ; n'apparaît ni parmi les coachs ni au planning. */
  status: 'current' | 'former'
  role?: string
  specialty?: string
  /** Diplômes et fonctions, tels que communiqués par le club. */
  qualifications: string[]
  /** Titres sportifs, tels que communiqués par le club. */
  achievements?: string[]
  /** Style de cours : un intitulé court et une phrase de description. */
  style?: {
    label: string
    description: string
  }
  /** Photographies réelles uniquement. Liste vide : un état « Photo à venir » est affiché. */
  photos: CoachPhoto[]
  bio?: string
}

export type CoachesPageContent = {
  eyebrow: string
  title: {
    lines: string[]
    accent: string
  }
  text: string
}

export type NewsArticle = {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  image: string
  href: string
}

export type DayId =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

/** Un créneau d'entraînement. */
export type TrainingSession = {
  id: string
  day: DayId
  /** Heure de début, au format 24 h `HH:MM`. */
  start: string
  /** Heure de fin, au format 24 h `HH:MM`. */
  end: string
  /** Tranche d'âge, telle que communiquée par le club (ex. « 6/11 ans »). */
  ageRange?: string
  /** Identifiants des encadrants (voir `src/data/coaches.ts`). */
  coachIds: string[]
  /** Disciplines, telles que communiquées par le club (BEA, BA). */
  disciplines: string[]
  /** Contenu de la séance, tel que communiqué par le club (Technique, Cardio…). */
  tags?: string[]
}

export type ScheduleDay = {
  id: DayId
  /** Nom complet, ex. « Lundi ». */
  label: string
  /** Abréviation, ex. « Lun ». */
  short: string
  sessions: TrainingSession[]
}

export type TrainingScheduleContent = {
  eyebrow: string
  title: {
    lines: string[]
    accent: string
  }
  days: ScheduleDay[]
  action: NavItem
}

export type HistoryEvent = {
  id: string
  year: string
  /** Date complète (AAAA-MM-JJ) quand elle est connue : elle est alors affichée à la place de l'année. */
  date?: string
  title: string
  description?: string
  image?: string
}

export type ClubHistoryContent = {
  eyebrow: string
  title: {
    /** Lignes du titre, en très grand. */
    lines: string[]
    /** Dernière ligne, accentuée en rouge. */
    accent: string
  }
  paragraphs: string[]
  events: HistoryEvent[]
  /** Phrase de clôture, traitée comme un élément typographique. */
  philosophy: {
    text: string
    /** Passage de `text` mis en avant. */
    highlight?: string
  }
  action: NavItem
  /** Photographie d'archive ou du club. Absente : la section s'en passe. */
  media?: {
    src: string
    alt: string
    width?: number
    height?: number
    treatment?: 'none' | 'monochrome' | 'contrast' | 'red'
  }
}

export type NavItem = {
  label: string
  href: string
}

export type HeroContent = {
  title: {
    /** Mots principaux, en très grand. */
    lead: string[]
    /** Mots de liaison, en petit, empilés. */
    connector: string[]
    /** Mot accentué en rouge. */
    accent: string
  }
  /** Repère historique, affiché en tête des mentions (ex. « Depuis 1991 »). */
  since?: string
  /** Mentions courtes affichées au-dessus du titre. */
  meta: string[]
  primaryCta: NavItem
  secondaryCta?: NavItem
  media: {
    /** Image de repli (JPEG). */
    src: string
    srcSet?: string
    sizes?: string
    /** Formats modernes (AVIF, WebP). */
    sources?: { type: string; srcSet: string }[]
    width?: number
    height?: number
    alt: string
    /** Point d'intérêt de l'image, en % (0–100), conservé au recadrage. */
    focalPoint?: { x: number; y: number }
    /** Point d'intérêt en cadrage vertical (mobile), si différent. */
    focalPointMobile?: { x: number; y: number }
    treatment?: 'none' | 'monochrome' | 'contrast' | 'red'
    /** Voile de lisibilité sous le titre et le header. */
    overlay?: 'none' | 'soft' | 'strong'
    grain?: boolean
    vignette?: boolean
  }
}

/** Une dimension du travail en cours (technique, préparation physique, assauts…). */
export type CourseApproach = {
  id: string
  title: string
  /** Phrase courte sous le titre. */
  intro: string
  /** Dimensions travaillées, quand elles sont listées. */
  points?: string[]
  description?: string
  /** Précision affichée telle quelle sous le contenu. */
  note?: string
  /** Coachs particulièrement associés (identifiants de `src/data/coaches.ts`). */
  coachIds: string[]
}

/** Un profil de pratiquant dans lequel le visiteur peut se reconnaître. */
export type CourseProfile = {
  id: string
  question: string
  label: string
  description: string
}

export type CoursesPageContent = {
  hero: {
    eyebrow: string
    title: { lines: string[]; accent: string }
    text: string
    primaryCta: NavItem
    secondaryCta: NavItem
  }
  intro: {
    eyebrow: string
    title: { lines: string[]; accent: string }
    text: string[]
  }
  approaches: {
    eyebrow: string
    title: string
    items: CourseApproach[]
    action: NavItem
  }
  spotlight: {
    eyebrow: string
    title: string
    coachId: string
    quote: string
    points: string[]
  }
  profiles: {
    eyebrow: string
    title: string
    items: CourseProfile[]
  }
  outro: {
    eyebrow: string
    /** Dernière ligne du titre ; les deux premières sont calculées à partir du planning. */
    closing: string
    primaryCta: NavItem
    secondaryCta: NavItem
  }
}

/** Repère de lecture du planning : regroupe les séances qui portent certaines mentions. */
export type ScheduleMarker = {
  id: string
  label: string
  /** Mentions du planning (contenus de séance) qui rattachent une séance à ce repère. */
  tags?: string[]
  /** Rattache les séances qui portent une tranche d'âge. */
  youth?: boolean
}

export type PlanningPageContent = {
  hero: {
    eyebrow: string
    /** Fin du sous-titre ; le début (« 7 jours. 10 séances. ») est calculé. */
    closing: string
    primaryCta: NavItem
    secondaryCta: NavItem
  }
  sheetTitle: string
  markers: {
    eyebrow: string
    title: { lines: string[]; accent: string }
    text: string
    items: ScheduleMarker[]
    action: NavItem
  }
  coaches: {
    eyebrow: string
    title: { lines: string[]; accent: string }
    text: string
    action: NavItem
  }
  outro: {
    title: { lines: string[]; accent: string }
    text: string
    primaryCta: NavItem
    secondaryCta: NavItem
  }
}
