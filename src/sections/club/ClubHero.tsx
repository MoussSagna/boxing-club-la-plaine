import type { CSSProperties } from 'react'
import { ImageReveal } from '@/components/ImageReveal'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Accent, SectionTitle } from '@/components/SectionTitle'
import { useRowReveal } from '@/hooks/useRowReveal'
import { formatDate } from '@/lib/history'
import { MaskedLine } from '@/sections/courses/MaskedLines'
import type { ClubPageContent } from '@/types'

const TITLE_ID = 'club-titre'

/*
 * À partir de 1024px, la photographie occupe les colonnes 8 à 12 et déborde jusqu'au bord droit
 * de l'écran : on annule la marge du container, et la part de l'écran au-delà de sa largeur max.
 */
const BLEED_RIGHT = 'lg:mr-[calc(-1*(var(--gutter)_+_max(0px,(100vw_-_var(--container-max))/2)))]'

/**
 * Ouverture de la page : titre monumental, date de création, photographie de la salle.
 *   mobile / tablet : la photo en bandeau, bord à bord, puis le texte ;
 *   desktop         : le texte à gauche (7 colonnes), la photo à droite, sur toute la hauteur.
 * La photographie est verticale (3:4) : elle n'est jamais étirée en plein écran horizontal.
 */
export function ClubHero({ content }: { content: ClubPageContent['hero'] }) {
  const ref = useRowReveal<HTMLDivElement>()
  const { photo } = content
  const focal = photo.focalPoint ?? { x: 50, y: 50 }

  return (
    <Section spacing="none" aria-labelledby={TITLE_ID} className="overflow-hidden">
      <div className="grid-site lg:min-h-[calc(100svh-var(--header-height))]">
        <div
          className={`relative col-span-4 -mx-(--gutter) h-[46svh] min-h-64 md:col-span-8 md:h-[52svh] lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:ml-0 lg:h-auto ${BLEED_RIGHT}`}
        >
          <ImageReveal
            {...photo}
            sizes="(min-width: 64rem) 45vw, 100vw"
            priority
            className="size-full lg:absolute lg:inset-0"
            style={{ '--focal': `${focal.x}% ${focal.y}%` } as CSSProperties}
            imageClassName="object-(--focal)"
          >
            {/* Mobile et tablet : le bas de la photo se fond dans le noir, sous le titre. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black to-transparent lg:hidden"
            />
          </ImageReveal>
        </div>

        <div
          ref={ref}
          className="col-span-4 flex flex-col justify-end gap-6 pt-6 pb-12 md:col-span-8 md:pb-16 lg:col-span-7 lg:row-start-1 lg:gap-8 lg:pt-16 lg:pb-14"
        >
          <SectionEyebrow data-row-fade>
            <span className="text-balance">{content.eyebrow}</span>
          </SectionEyebrow>

          {/* Taille bornée par la largeur et par la hauteur de l'écran : tout tient dans le premier écran. */}
          <SectionTitle
            as="h1"
            id={TITLE_ID}
            className="text-[length:min(15.5vw,13svh)] leading-[0.92] lg:text-[length:min(8.5vw,9rem,15svh)]"
          >
            {content.title.lines.map((line) => (
              <MaskedLine key={line}>{line}</MaskedLine>
            ))}
            <MaskedLine>
              <Accent>{content.title.accent}</Accent>
            </MaskedLine>
          </SectionTitle>

          <div className="relative mt-2 pt-5 lg:mt-6">
            <span
              aria-hidden="true"
              data-row-rule
              className="absolute inset-x-0 top-0 h-px origin-left bg-border"
            />
            <span
              aria-hidden="true"
              data-row-rule
              className="absolute top-0 left-0 h-1 w-12 origin-left bg-primary"
            />
            <p
              data-row-fade
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2"
            >
              <span className="label text-muted-foreground">{content.foundedLabel}</span>
              <span className="sr-only"> : </span>
              <time dateTime={content.founded} className="display text-display-m">
                {formatDate(content.founded)}
              </time>
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
