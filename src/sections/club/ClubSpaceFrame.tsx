import { useRef, type CSSProperties } from 'react'
import type { MediaRatio } from '@/components/MediaFrame'
import { ParallaxImage } from '@/components/ParallaxImage'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, revealTrigger, useGSAP } from '@/lib/gsap'
import { DISTANCE, DURATION, EASE, STAGGER } from '@/lib/motion'
import { cn } from '@/lib/utils'
import type { ClubFrame } from '@/types'

type ClubSpaceFrameProps = {
  frame: ClubFrame
  /** Rang dans la séquence, ex. `01`. */
  number: string
  ratio: MediaRatio
  /** Largeur d'affichage, pour le choix du fichier. */
  sizes: string
  /** Amplitude du déplacement au scroll, en %. Les détails bougent un peu plus que les grandes vues. */
  parallax?: number
  className?: string
}

/**
 * Une image de la séquence « La salle » : photographie, numéro et légende.
 * Reveal au scroll, joué une fois : rideau vertical sur l'image, trait rouge, légende.
 * Puis un léger déplacement de l'image au scroll (`ParallaxImage`).
 * Reduced motion : simple fondu, image fixe.
 */
export function ClubSpaceFrame({
  frame,
  number,
  ratio,
  sizes,
  parallax = 3,
  className,
}: ClubSpaceFrameProps) {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { photo } = frame
  const focal = photo.focalPoint ?? { x: 50, y: 50 }

  useGSAP(
    () => {
      const figure = ref.current
      if (!figure) return
      const scrollTrigger = revealTrigger(figure)

      if (reducedMotion) {
        gsap.from(gsap.utils.toArray('[data-frame-media], [data-frame-caption]', figure), {
          opacity: 0,
          duration: DURATION.fast,
          ease: EASE.outSoft,
          scrollTrigger,
        })
        return
      }

      gsap
        .timeline({ defaults: { ease: EASE.out }, scrollTrigger })
        .fromTo(
          '[data-frame-media]',
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: DURATION.slower,
            ease: EASE.outStrong,
            clearProps: 'clipPath',
          },
        )
        .from(
          '[data-frame-rule]',
          { scaleX: 0, duration: DURATION.slow, ease: EASE.inOut },
          STAGGER.normal * 3,
        )
        .from(
          '[data-frame-caption]',
          { opacity: 0, y: DISTANCE.sm, duration: DURATION.normal },
          STAGGER.normal * 4,
        )
    },
    { scope: ref, dependencies: [reducedMotion], revertOnUpdate: true },
  )

  return (
    <figure ref={ref} className={cn('flex flex-col gap-3 lg:gap-4', className)}>
      <div data-frame-media>
        <ParallaxImage
          {...photo}
          sizes={sizes}
          ratio={ratio}
          amount={parallax}
          style={{ '--focal': `${focal.x}% ${focal.y}%` } as CSSProperties}
          imageClassName="object-(--focal)"
        />
      </div>
      <figcaption className="micro flex items-center gap-3 text-muted-foreground">
        <span aria-hidden="true" data-frame-rule className="h-0.5 w-8 shrink-0 origin-left bg-primary" />
        <span data-frame-caption>
          <span aria-hidden="true">{number} — </span>
          {frame.caption}
        </span>
      </figcaption>
    </figure>
  )
}
