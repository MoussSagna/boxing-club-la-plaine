import { getCoachName } from '@/data/coaches'
import { formatTime } from '@/lib/schedule'
import type { TrainingSession } from '@/types'

/**
 * Un créneau : horaire, encadrants, pratique. Trois colonnes à partir de 768px, empilées en mobile.
 * Lu d'une traite par un lecteur d'écran :
 * « 18h à 20h, avec Christophe Tiozzo et Manuel Tavares, BEA / BA, Sparing / Préparation physique ».
 * Survol : l'horaire passe au rouge, un trait rouge s'avance, le créneau glisse de 4px.
 */
export function ScheduleSession({ session }: { session: TrainingSession }) {
  const coaches = session.coachIds.map(getCoachName)
  const details = [session.ageRange, ...session.disciplines].filter(Boolean)

  return (
    // Le <li> est animé par GSAP (apparition) ; le survol agit sur le bloc intérieur.
    // Les deux ne doivent pas partager le même élément : GSAP y neutralise `translate`.
    <li data-schedule-session>
      <div className="group relative grid gap-x-8 gap-y-1 py-4 transition-[translate] duration-300 ease-out-quart md:grid-cols-8 md:items-baseline md:py-5 motion-safe:hover:translate-x-1">
        <span
          aria-hidden="true"
          className="absolute top-1/2 -left-6 hidden h-0.5 w-4 origin-right scale-x-0 bg-primary transition-[scale] duration-300 ease-out-quart group-hover:scale-x-100 lg:block"
        />

        <p className="display text-heading whitespace-nowrap transition-colors duration-200 group-hover:text-primary md:col-span-3">
          <time dateTime={session.start}>{formatTime(session.start)}</time>
          <span aria-hidden="true"> — </span>
          <span className="sr-only"> à </span>
          <time dateTime={session.end}>{formatTime(session.end)}</time>
        </p>

        <p className="md:col-span-2">
          <span className="sr-only">, avec </span>
          {coaches.map((name, index) => (
            <span key={name} className="block">
              {index > 0 && <span className="sr-only"> et </span>}
              {name}
            </span>
          ))}
        </p>

        <p className="md:col-span-3">
          <span className="sr-only">, </span>
          <span className="block font-medium">{details.join(' / ')}</span>
          {session.tags && (
            <span className="block text-muted-foreground">
              <span className="sr-only">, </span>
              {session.tags.join(' / ')}
            </span>
          )}
        </p>
      </div>
    </li>
  )
}
