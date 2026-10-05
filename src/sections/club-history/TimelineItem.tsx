import type { HistoryEvent } from '@/types'

const DATE_FORMAT = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

/** « 13 mai 1991 » quand la date complète est connue, sinon l'année. */
function formatWhen(event: HistoryEvent) {
  return event.date ? DATE_FORMAT.format(new Date(event.date)) : event.year
}

/**
 * Une date de la timeline : un filet, la date en très grand à gauche, l'événement à droite
 * (dessous en mobile). Ni carte ni fond : la date tient par la typographie et le filet.
 * Lue d'une traite : « 13 mai 1991 — Création du club ».
 */
export function TimelineItem({ event }: { event: HistoryEvent }) {
  return (
    <li data-timeline-item className="relative pt-5 pb-7 lg:pt-6 lg:pb-9">
      <span
        aria-hidden="true"
        data-timeline-rule
        className="absolute inset-x-0 top-0 h-px origin-left bg-foreground"
      />
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-8">
        <p className="display shrink-0 overflow-hidden text-display-l whitespace-nowrap">
          <time dateTime={event.date ?? event.year} data-timeline-year className="block">
            {formatWhen(event)}
          </time>
        </p>
        <span className="sr-only"> — </span>
        {/* Aligné à droite : les événements gardent le même bord, quelle que soit la largeur de la date. */}
        <div data-timeline-text className="flex flex-col gap-1 md:max-w-[26ch] md:pb-[0.35em] md:text-right">
          <p className="font-medium">{event.title}</p>
          {event.description && <p className="text-muted-foreground">{event.description}</p>}
        </div>
      </div>
    </li>
  )
}
