import { TimelineItem } from '@/sections/club-history/TimelineItem'
import type { HistoryEvent } from '@/types'

/** Timeline éditoriale : une liste ordonnée de dates, lisible sans aucune animation. */
export function HistoryTimeline({ events, className }: { events: HistoryEvent[]; className?: string }) {
  return (
    <div data-history-timeline className={className}>
      <ol aria-label="Dates clés du club">
        {events.map((event) => (
          <TimelineItem key={event.id} event={event} />
        ))}
      </ol>
    </div>
  )
}
