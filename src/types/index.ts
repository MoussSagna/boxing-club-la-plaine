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
