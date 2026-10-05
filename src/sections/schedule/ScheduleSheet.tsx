import { useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, revealTrigger, useGSAP } from '@/lib/gsap'
import { DISTANCE, DURATION, EASE, STAGGER } from '@/lib/motion'
import { ScheduleDayRow } from '@/sections/schedule/ScheduleDayRow'
import type { ScheduleDay } from '@/types'

type ScheduleSheetProps = {
  days: ScheduleDay[]
  /** Numérote les jours (01, 02…). */
  numbered?: boolean
}

/**
 * La feuille du planning : intitulés de colonnes puis un jour par ligne.
 * Commune à la section de l'accueil et à la page Planning — un seul planning dans le site.
 *
 * Chaque jour se révèle une fois, à son entrée dans l'écran : le filet se trace, le nom du
 * jour monte, les créneaux apparaissent. Reduced motion : simple fondu.
 */
export function ScheduleSheet({ days, numbered = false }: ScheduleSheetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>('[data-schedule-day]', ref.current)

      rows.forEach((row) => {
        const scrollTrigger = revealTrigger(row)

        if (reducedMotion) {
          gsap.from(row, { opacity: 0, duration: DURATION.fast, ease: EASE.outSoft, scrollTrigger })
          return
        }

        gsap
          .timeline({ defaults: { ease: EASE.out }, scrollTrigger })
          .from(row.querySelector('[data-schedule-rule]'), {
            scaleX: 0,
            duration: DURATION.slow,
            ease: EASE.inOut,
          })
          .from(
            row.querySelector('[data-schedule-name]'),
            { yPercent: 110, duration: DURATION.normal },
            STAGGER.normal,
          )
          .from(
            row.querySelectorAll('[data-schedule-session], [data-schedule-fade]'),
            { opacity: 0, y: DISTANCE.sm, duration: DURATION.normal, stagger: STAGGER.tight },
            STAGGER.normal * 2,
          )
      })
    },
    { scope: ref, dependencies: [reducedMotion], revertOnUpdate: true },
  )

  return (
    <div ref={ref}>
      {/* Intitulés de colonnes, à la manière d'une feuille : décoratifs, le sens est dans le texte. */}
      <div aria-hidden="true" className="hidden pb-3 lg:block">
        <div className="grid-site">
          <p className="micro col-span-4 text-muted-foreground">Jour</p>
          <div className="col-span-8 grid grid-cols-8 gap-x-8">
            <p className="micro col-span-3 text-muted-foreground">Horaire</p>
            <p className="micro col-span-2 text-muted-foreground">Encadrement</p>
            <p className="micro col-span-3 text-muted-foreground">Pratique</p>
          </div>
        </div>
      </div>

      <ol>
        {days.map((day, index) => (
          <ScheduleDayRow
            key={day.id}
            day={day}
            number={numbered ? String(index + 1).padStart(2, '0') : undefined}
          />
        ))}
      </ol>
    </div>
  )
}
