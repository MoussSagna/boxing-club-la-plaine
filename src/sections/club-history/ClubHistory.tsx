import { useRef } from 'react'
import { Section } from '@/components/Section'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, revealTrigger, useGSAP } from '@/lib/gsap'
import { DISTANCE, DURATION, EASE, STAGGER } from '@/lib/motion'
import { HistoryAction } from '@/sections/club-history/HistoryAction'
import { HistoryHeading } from '@/sections/club-history/HistoryHeading'
import { HistoryMedia } from '@/sections/club-history/HistoryMedia'
import { HistoryPhilosophy } from '@/sections/club-history/HistoryPhilosophy'
import { HistoryText } from '@/sections/club-history/HistoryText'
import { HistoryTimeline } from '@/sections/club-history/HistoryTimeline'
import type { ClubHistoryContent } from '@/types'

type ClubHistoryProps = {
  content: ClubHistoryContent
  /** `cream` après le hero sombre : papier, archive. `dark` reste disponible. */
  theme?: 'dark' | 'cream'
  /** Identifiant de la section (ancre). Doit être unique dans la page. */
  id?: string
}

/**
 * Histoire du club, première section après le hero.
 * Trois temps : l'introduction (sur-titre, titre monumental), le récit (texte à gauche,
 * timeline décalée à droite), la clôture (phrase typographique et lien).
 * Mobile : sur-titre, titre, texte, timeline, phrase, lien.
 *
 * Chaque temps se révèle une fois, à son entrée dans l'écran, plus discrètement que le hero.
 * Tout le contenu est dans la page sans l'animation ; en reduced motion, simple fondu.
 */
export function ClubHistory({ content, theme = 'cream', id = 'histoire' }: ClubHistoryProps) {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const titleId = `${id}-titre`

  useGSAP(
    () => {
      const section = ref.current
      if (!section) return
      const once = revealTrigger
      const timeline = section.querySelector('[data-history-timeline]')
      const outro = section.querySelector('[data-history-outro]')
      const media = section.querySelector('[data-history-media]')

      if (reducedMotion) {
        const fade = { opacity: 0, duration: DURATION.fast, ease: EASE.outSoft }
        gsap.from(gsap.utils.toArray('[data-history-line], [data-history-fade]', section), {
          ...fade,
          scrollTrigger: once(section),
        })
        gsap.from('[data-timeline-item]', { ...fade, scrollTrigger: once(timeline) })
        gsap.from('[data-history-outro]', { ...fade, scrollTrigger: once(outro) })
        return
      }

      // 1 — Introduction : lignes du titre, puis sur-titre et texte, puis photographie éventuelle.
      const intro = gsap
        .timeline({ defaults: { ease: EASE.out }, scrollTrigger: once(section) })
        .from('[data-history-line]', {
          yPercent: 110,
          duration: DURATION.slow,
          stagger: STAGGER.tight,
        })
        .from(
          '[data-history-fade]',
          { opacity: 0, y: DISTANCE.sm, duration: DURATION.normal, stagger: STAGGER.tight },
          STAGGER.normal,
        )
      if (media) {
        intro.from(
          media,
          { clipPath: 'inset(100% 0% 0% 0%)', duration: DURATION.slow, clearProps: 'clipPath' },
          STAGGER.normal * 2,
        )
      }

      // 2 — Timeline : chaque date arrive à son tour (filet, année, événement).
      const items = gsap.utils.toArray<HTMLElement>('[data-timeline-item]', section)
      const dates = gsap.timeline({ defaults: { ease: EASE.out }, scrollTrigger: once(timeline) })
      items.forEach((item, index) => {
        const at = index * STAGGER.normal * 1.5
        dates
          .from(
            item.querySelector('[data-timeline-rule]'),
            { scaleX: 0, duration: DURATION.slow, ease: EASE.inOut },
            at,
          )
          .from(
            item.querySelector('[data-timeline-year]'),
            { yPercent: 110, duration: DURATION.normal },
            at + STAGGER.normal,
          )
          .from(
            item.querySelector('[data-timeline-text]'),
            { opacity: 0, y: DISTANCE.sm, duration: DURATION.normal },
            at + STAGGER.normal * 2,
          )
      })

      // 3 — Clôture : phrase et lien.
      gsap.from('[data-history-outro]', {
        opacity: 0,
        y: DISTANCE.md,
        duration: DURATION.slow,
        stagger: STAGGER.normal,
        ease: EASE.out,
        scrollTrigger: once(outro),
      })
    },
    { scope: ref, dependencies: [reducedMotion], revertOnUpdate: true },
  )

  return (
    <Section ref={ref} id={id} theme={theme} spacing="large" aria-labelledby={titleId}>
      <div className="grid-site gap-y-12 lg:gap-y-20">
        <HistoryHeading
          id={titleId}
          eyebrow={content.eyebrow}
          title={content.title}
          className="col-span-4 md:col-span-8 lg:col-span-8"
        />

        {/* Zone média, uniquement si une photographie est fournie : à droite du titre. */}
        <HistoryMedia
          media={content.media}
          className="col-span-3 col-start-2 md:col-span-3 md:col-start-6 lg:col-span-4 lg:col-start-9 lg:mt-20"
        />

        <HistoryText
          paragraphs={content.paragraphs}
          className="col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-1 lg:row-start-2"
        />

        {/* Décalée d'une colonne à droite du texte : la timeline porte l'asymétrie de la section. */}
        <HistoryTimeline
          events={content.events}
          className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:row-start-2"
        />

        <HistoryPhilosophy
          philosophy={content.philosophy}
          className="col-span-4 md:col-span-8 lg:col-span-10 lg:row-start-3"
        />

        <HistoryAction
          action={content.action}
          className="col-span-4 -mt-4 md:col-span-8 lg:col-span-12 lg:row-start-4 lg:-mt-8"
        />
      </div>
    </Section>
  )
}
