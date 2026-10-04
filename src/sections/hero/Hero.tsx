import { useRef } from 'react'
import { Section } from '@/components/Section'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { DISTANCE, DURATION, EASE, STAGGER } from '@/lib/motion'
import { HeroActions } from '@/sections/hero/HeroActions'
import { HeroMedia } from '@/sections/hero/HeroMedia'
import { HeroMeta } from '@/sections/hero/HeroMeta'
import { HeroScrollIndicator } from '@/sections/hero/HeroScrollIndicator'
import { HeroTitle } from '@/sections/hero/HeroTitle'
import type { HeroContent } from '@/types'

const TITLE_ID = 'hero-title'

/** Départ de chaque élément dans la séquence d'entrée, en secondes (≈ 1,3s au total). */
const ENTRANCE = {
  media: 0.1,
  title: 0.2,
  meta: 0.5,
  actions: 0.6,
  details: 0.75,
} as const

/**
 * Hero de la homepage : photographie plein cadre, titre monumental, CTA.
 * Il passe sous le header (marge négative) et lui demande d'être transparent.
 *
 * Entrée : image (rideau vertical + léger dézoom) → lignes du titre → mentions →
 * CTA → détails. Reduced motion : un seul fondu court, aucun mouvement.
 */
export function Hero({ content }: { content: HeroContent }) {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.from('[data-hero-media], [data-hero-content]', {
          opacity: 0,
          duration: DURATION.fast,
          ease: EASE.outSoft,
        })
        return
      }

      const fadeUp = { opacity: 0, y: DISTANCE.sm }
      const settle = { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.out }

      gsap
        .timeline({ defaults: { ease: EASE.outStrong } })
        .fromTo(
          '[data-hero-media]',
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: DURATION.slower, clearProps: 'clipPath' },
          ENTRANCE.media,
        )
        .fromTo(
          '[data-hero-media] img',
          { scale: 1.08 },
          { scale: 1, duration: DURATION.slower, clearProps: 'transform' },
          ENTRANCE.media,
        )
        .fromTo(
          '[data-hero-line]',
          { yPercent: 110 },
          { yPercent: 0, duration: DURATION.slow, stagger: STAGGER.tight },
          ENTRANCE.title,
        )
        // `opacity` et non `autoAlpha` : les CTA restent atteignables au clavier dès le départ.
        .fromTo('[data-hero-meta]', fadeUp, settle, ENTRANCE.meta)
        .fromTo('[data-hero-actions]', fadeUp, settle, ENTRANCE.actions)
        .fromTo(
          '[data-hero-detail]',
          { opacity: 0 },
          { opacity: 1, duration: DURATION.fast, ease: EASE.outSoft },
          ENTRANCE.details,
        )

      // Le trait de l'indicateur ne tourne que lorsque le hero est à l'écran.
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        toggleClass: { targets: '[data-hero-scroll-line]', className: 'animate-scroll-line' },
      })
    },
    { scope: ref, dependencies: [reducedMotion], revertOnUpdate: true },
  )

  return (
    <Section
      ref={ref}
      theme="dark"
      spacing="none"
      contained={false}
      data-header="transparent"
      aria-labelledby={TITLE_ID}
      className="relative isolate -mt-(--header-height) flex min-h-svh flex-col justify-end overflow-hidden"
    >
      {/* Mobile et tablet : l'image occupe le haut du hero (bandeau), pour ne pas recadrer
          à l'excès une photographie très horizontale. À partir de 1024px : plein cadre. */}
      <HeroMedia {...content.media} className="bottom-auto h-[56svh] lg:bottom-0 lg:h-auto" />

      <div
        data-hero-content
        className="container-site flex flex-col gap-5 pt-[calc(var(--header-height)+2rem)] pb-6 md:gap-6 md:pb-8 lg:pb-10"
      >
        <HeroMeta items={content.meta} />

        {/* Desktop : les CTA se logent à droite de la dernière ligne du titre, plus courte. */}
        <div className="relative flex flex-col gap-6 md:gap-8">
          <HeroTitle id={TITLE_ID} title={content.title} />
          <HeroActions
            primary={content.primaryCta}
            secondary={content.secondaryCta}
            className="lg:absolute lg:right-0 lg:bottom-[0.06em] lg:items-end"
          />
        </div>

        <HeroScrollIndicator className="hidden md:flex" />
      </div>
    </Section>
  )
}
