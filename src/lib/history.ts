import type { HistoryEvent } from '@/types'

const DATE_FORMAT = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

/** « 13 mai 1991 » pour une date complète (AAAA-MM-JJ). */
export function formatDate(date: string) {
  return DATE_FORMAT.format(new Date(date))
}

/** « 13 mai 1991 » quand la date complète est connue, sinon l'année. */
export function formatEventDate(event: HistoryEvent) {
  return event.date ? formatDate(event.date) : event.year
}
