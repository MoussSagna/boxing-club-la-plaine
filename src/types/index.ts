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

export type Coach = {
  id: string
  name: string
  role?: string
  specialty?: string
  image: string
  bio?: string
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

export type ScheduleItem = {
  id: string
  day: string
  start: string
  end: string
  title: string
  audience?: string
  level?: string
}

export type HistoryEvent = {
  id: string
  year: string
  title: string
  description: string
  image?: string
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
