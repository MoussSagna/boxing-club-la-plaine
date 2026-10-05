import { useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, revealTrigger, useGSAP } from '@/lib/gsap'
import { DISTANCE, DURATION, EASE, STAGGER } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { CoachDetails } from '@/sections/coaches/CoachDetails'
import { CoachHeading } from '@/sections/coaches/CoachHeading'
import { CoachMedia } from '@/sections/coaches/CoachMedia'
import type { Coach } from '@/types'

/*
 * Compositions desktop (grille 12 colonnes). Chaque coach a la sienne : pas de carte répétée.
 * Sous 1024px, toutes se lisent dans le même ordre : numéro et nom, photo, informations.
 */
const LAYOUTS = {
  /** Grande image à gauche, texte à droite. */
  left: {
    media: 'md:col-span-5 lg:col-span-5 lg:col-start-1',
    heading: 'lg:col-span-6 lg:col-start-7',
    details: 'lg:col-span-6 lg:col-start-7',
  },
  /** Texte à gauche, grande image à droite. */
  right: {
    media: 'md:col-span-5 lg:col-span-5 lg:col-start-8',
    heading: 'lg:col-span-6 lg:col-start-1',
    details: 'lg:col-span-6 lg:col-start-1',
  },
  /** Image décalée d'une colonne, texte resserré à droite. */
  center: {
    media: 'md:col-span-5 lg:col-span-5 lg:col-start-2',
    heading: 'lg:col-span-5 lg:col-start-8',
    details: 'lg:col-span-5 lg:col-start-8',
  },
  /** Image plus étroite, en retrait : pour un portrait serré. */
  narrow: {
    media: 'md:col-span-4 lg:col-span-4 lg:col-start-2',
    heading: 'lg:col-span-6 lg:col-start-7',
    details: 'lg:col-span-6 lg:col-start-7',
  },
} as const

export type CoachLayout = keyof typeof LAYOUTS | 'duo'

type CoachProfileProps = {
  coach: Coach
  /** Rang dans la page, ex. `01`. */
  number: string
  layout: CoachLayout
}

const SIZES = '(min-width: 64rem) 42vw, (min-width: 48rem) 62vw, 100vw'

/**
 * Profil d'un coach : numéro, nom, visuel, qualifications, style de cours.
 * Reveal au scroll, joué une fois : la photo se dévoile, le trait rouge se trace, le nom monte,
 * puis le texte arrive. Reduced motion : simples fondus, pas de déplacement de l'image.
 */
export function CoachProfile({ coach, number, layout }: CoachProfileProps) {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const titleId = `coach-${coach.id}`
  const isDuo = layout === 'duo'
  const portrait = coach.photos.find((photo) => photo.kind === 'portrait')
  const action = coach.photos.find((photo) => photo.kind === 'action')

  useGSAP(
    () => {
      const article = ref.current
      if (!article) return
      const scrollTrigger = revealTrigger(article)
      const media = gsap.utils.toArray<HTMLElement>('[data-coach-media]', article)

      if (reducedMotion) {
        gsap.from(
          gsap.utils.toArray(
            '[data-coach-media], [data-coach-line], [data-coach-fade], [data-coach-rule]',
            article,
          ),
          { opacity: 0, duration: DURATION.fast, ease: EASE.outSoft, scrollTrigger },
        )
        return
      }

      gsap
        .timeline({ defaults: { ease: EASE.out }, scrollTrigger })
        .fromTo(
          media,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: DURATION.slower,
            ease: EASE.outStrong,
            stagger: STAGGER.normal,
            clearProps: 'clipPath',
          },
        )
        .from(
          '[data-coach-rule]',
          { scaleX: 0, duration: DURATION.slow, ease: EASE.inOut },
          STAGGER.normal * 2,
        )
        .from(
          '[data-coach-line]',
          { yPercent: 110, duration: DURATION.slow, stagger: STAGGER.tight },
          STAGGER.normal * 3,
        )
        // Le texte arrive légèrement après l'image et le nom.
        .from(
          '[data-coach-fade]',
          { opacity: 0, y: DISTANCE.sm, duration: DURATION.normal, stagger: STAGGER.tight },
          STAGGER.normal * 5,
        )
    },
    { scope: ref, dependencies: [reducedMotion], revertOnUpdate: true },
  )

  if (isDuo) {
    // Profil le plus riche : un portrait, puis la photo en situation mise en avant.
    return (
      <article
        ref={ref}
        aria-labelledby={titleId}
        className="grid-site gap-y-8 border-t border-border py-16 lg:gap-y-10 lg:py-28"
      >
        <CoachHeading
          id={titleId}
          number={number}
          name={coach.name}
          className="col-span-4 md:col-span-8 lg:col-span-5 lg:row-start-1 lg:self-end"
        />
        <figure className="col-span-3 flex flex-col gap-3 md:col-span-3 lg:col-span-3 lg:row-start-2">
          <CoachMedia coach={coach} photo={portrait} ratio="4/5" sizes="(min-width: 64rem) 25vw, 75vw" />
          <figcaption data-coach-fade className="micro text-muted-foreground">
            Portrait
          </figcaption>
        </figure>
        <figure className="col-span-4 flex flex-col gap-3 md:col-span-6 md:col-start-3 lg:col-span-6 lg:col-start-7 lg:row-span-3 lg:row-start-1">
          <CoachMedia coach={coach} photo={action} ratio="3/4" sizes={SIZES} />
          <figcaption data-coach-fade className="micro text-muted-foreground">
            En situation
          </figcaption>
        </figure>
        <CoachDetails
          coach={coach}
          className="col-span-4 md:col-span-6 lg:col-span-5 lg:row-start-3 lg:self-start"
        />
      </article>
    )
  }

  const classes = LAYOUTS[layout]

  return (
    <article
      ref={ref}
      aria-labelledby={titleId}
      className="grid-site gap-y-8 border-t border-border py-16 lg:gap-y-10 lg:py-28"
    >
      <CoachHeading
        id={titleId}
        number={number}
        name={coach.name}
        className={cn('col-span-4 md:col-span-8 lg:row-start-1 lg:self-end', classes.heading)}
      />
      <CoachMedia
        coach={coach}
        photo={portrait ?? action}
        ratio={layout === 'narrow' ? '3/4' : '4/5'}
        sizes={SIZES}
        className={cn('col-span-4 lg:row-span-2 lg:row-start-1', classes.media)}
      />
      <CoachDetails
        coach={coach}
        className={cn('col-span-4 md:col-span-6 lg:row-start-2 lg:self-start', classes.details)}
      />
    </article>
  )
}
