import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Accent, SectionTitle } from '@/components/SectionTitle'
import { useRowReveal } from '@/hooks/useRowReveal'
import { MaskedLine } from '@/sections/courses/MaskedLines'
import { ClubSpaceFrame } from '@/sections/club/ClubSpaceFrame'
import type { ClubPageContent } from '@/types'

const TITLE_ID = 'club-salle'

/*
 * Deux grandes vues décalées :
 *   desktop : la première sur 7 colonnes, la seconde sur 5 colonnes à droite, plus bas ;
 *   tablet  : l'une sous l'autre, la seconde décalée vers la droite ;
 *   mobile  : l'une sous l'autre, pleine largeur.
 */
const LAYOUTS = [
  { className: 'col-span-4 md:col-span-6 lg:col-span-7', ratio: '4/5' },
  {
    className: 'col-span-4 md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-8 lg:mt-48',
    ratio: '3/4',
  },
] as const

const SIZES = '(min-width: 64rem) 55vw, (min-width: 48rem) 75vw, 100vw'

/** La salle en photographies : les rings, les sacs de frappe. Fond noir. */
export function ClubSpace({ content }: { content: ClubPageContent['space'] }) {
  const ref = useRowReveal<HTMLDivElement>()

  return (
    <Section spacing="large" aria-labelledby={TITLE_ID}>
      <div ref={ref} className="flex flex-col gap-6 lg:gap-8">
        <SectionEyebrow data-row-fade>{content.eyebrow}</SectionEyebrow>
        <SectionTitle id={TITLE_ID} size="l">
          {content.title.lines.map((line) => (
            <MaskedLine key={line}>{line}</MaskedLine>
          ))}
          <MaskedLine>
            <Accent>{content.title.accent}</Accent>
          </MaskedLine>
        </SectionTitle>
      </div>

      <div className="mt-12 grid-site gap-y-16 md:gap-y-20 lg:mt-20">
        {content.frames.map((frame, index) => {
          const layout = LAYOUTS[index % 2] ?? LAYOUTS[0]
          return (
            <ClubSpaceFrame
              key={frame.id}
              frame={frame}
              number={String(index + 1).padStart(2, '0')}
              ratio={layout.ratio}
              sizes={SIZES}
              className={layout.className}
            />
          )
        })}
      </div>
    </Section>
  )
}
