import { ScheduleSession } from '@/sections/schedule/ScheduleSession'
import type { ScheduleDay } from '@/types'

/**
 * Une ligne de la feuille : le jour en très grand à gauche, ses créneaux à droite.
 * La hauteur suit le nombre de créneaux : le mercredi (trois séances) est le bloc le plus haut.
 * Mobile : le jour, puis ses créneaux dessous.
 */
type ScheduleDayRowProps = {
  day: ScheduleDay
  /** Rang du jour dans la semaine, ex. `01` (page Planning). */
  number?: string
}

export function ScheduleDayRow({ day, number }: ScheduleDayRowProps) {
  const titleId = `planning-${day.id}`

  return (
    <li data-schedule-day className="relative grid-site gap-y-2 pt-6 pb-4 lg:pt-8 lg:pb-6">
      {/* Filet du jour : un trait fin, avec une amorce rouge. */}
      <span
        aria-hidden="true"
        data-schedule-rule
        className="absolute inset-x-0 top-0 h-px origin-left bg-foreground"
      />
      <span aria-hidden="true" className="absolute top-0 left-0 h-1 w-12 bg-primary" />

      {/* Le titre garde la largeur de son texte : les noms les plus longs (« Mercredi »)
          peuvent déborder de quelques pixels dans la gouttière sans être rognés par le masque. */}
      <div className="col-span-4 flex flex-col items-start gap-1 md:col-span-8 lg:col-span-4">
        {number && (
          <p data-schedule-fade aria-hidden="true" className="label text-muted-foreground">
            {number}
          </p>
        )}
        <h3 id={titleId} className="display shrink-0 overflow-hidden text-display-l">
          <span data-schedule-name className="block">
            {day.label}
          </span>
        </h3>
      </div>

      <ul
        aria-labelledby={titleId}
        className="col-span-4 divide-y divide-border md:col-span-8 lg:col-span-8"
      >
        {day.sessions.map((session) => (
          <ScheduleSession key={session.id} session={session} />
        ))}
      </ul>
    </li>
  )
}
