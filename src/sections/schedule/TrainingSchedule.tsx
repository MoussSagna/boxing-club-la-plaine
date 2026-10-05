import { useRef } from 'react'
import { Section } from '@/components/Section'
import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/ui/link'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, revealTrigger, useGSAP } from '@/lib/gsap'
import { DISTANCE, DURATION, EASE, STAGGER } from '@/lib/motion'
import { ScheduleSheet } from '@/sections/schedule/ScheduleSheet'
import { ScheduleHeading } from '@/sections/schedule/ScheduleHeading'
import type { TrainingScheduleContent } from '@/types'

type TrainingScheduleProps = {
  content: TrainingScheduleContent
  /** `cream` : la feuille de planning. `dark` reste disponible. */
  theme?: 'dark' | 'cream'
  /** Identifiant de la section (ancre). Doit être unique dans la page. */
  id?: string
}

/**
 * Entraînements de la semaine, composés comme une feuille de combat : chaque jour en très
 * grand à gauche, ses créneaux à droite, un filet par jour. Pas de cartes, pas de tableau
 * de bord : une liste lisible d'un coup d'œil et au lecteur d'écran.
 *
 * Reveal au scroll, joué une fois : le titre ici, puis chaque jour dans `ScheduleSheet`.
 * Reduced motion : simples fondus.
 */
export function TrainingSchedule({
  content,
  theme = 'cream',
  id = 'entrainements',
}: TrainingScheduleProps) {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const titleId = `${id}-titre`
  const sessionCount = content.days.reduce((total, day) => total + day.sessions.length, 0)

  useGSAP(
    () => {
      const section = ref.current
      if (!section) return
      const once = revealTrigger
      const action = section.querySelector('[data-schedule-action]')

      if (reducedMotion) {
        const fade = { opacity: 0, duration: DURATION.fast, ease: EASE.outSoft }
        gsap.from(gsap.utils.toArray('[data-schedule-line], [data-schedule-heading] [data-schedule-fade]', section), {
          ...fade,
          scrollTrigger: once(section),
        })
        gsap.from(action, { ...fade, scrollTrigger: once(action) })
        return
      }

      // Introduction : lignes du titre, puis sur-titre et repère chiffré.
      gsap
        .timeline({ defaults: { ease: EASE.out }, scrollTrigger: once(section) })
        .from('[data-schedule-line]', {
          yPercent: 110,
          duration: DURATION.slow,
          stagger: STAGGER.tight,
        })
        .from(
          '[data-schedule-heading] [data-schedule-fade]',
          { opacity: 0, y: DISTANCE.sm, duration: DURATION.normal, stagger: STAGGER.tight },
          STAGGER.normal,
        )

      gsap.from(action, {
        opacity: 0,
        y: DISTANCE.sm,
        duration: DURATION.normal,
        ease: EASE.out,
        scrollTrigger: once(action),
      })
    },
    { scope: ref, dependencies: [reducedMotion], revertOnUpdate: true },
  )

  return (
    <Section
      ref={ref}
      id={id}
      theme={theme}
      spacing="large"
      aria-labelledby={titleId}
      // Filet plein en tête : sépare cette feuille de la section crème qui la précède.
      className="border-t border-foreground"
    >
      <div className="flex flex-col gap-12 lg:gap-20">
        <div data-schedule-heading>
          <ScheduleHeading
            id={titleId}
            eyebrow={content.eyebrow}
            title={content.title}
            summary={`${content.days.length} jours — ${sessionCount} séances par semaine`}
          />
        </div>

        <ScheduleSheet days={content.days} />

        <div data-schedule-action className="flex">
          <Button asChild variant="text">
            <AppLink href={content.action.href} arrow>
              {content.action.label}
            </AppLink>
          </Button>
        </div>
      </div>
    </Section>
  )
}
