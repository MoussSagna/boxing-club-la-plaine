import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { SectionTitle } from '@/components/SectionTitle'
import { useRowReveal } from '@/hooks/useRowReveal'
import { MaskedLine } from '@/sections/courses/MaskedLines'
import type { CoursesPageContent } from '@/types'

const TITLE_ID = 'cours-esprit-club'

/** Bloc à part : l'ambiance des séances d'un coach, décrite comme telle. */
export function CoursesSpotlight({ content }: { content: CoursesPageContent['spotlight'] }) {
  const ref = useRowReveal<HTMLDivElement>()

  return (
    <Section theme="cream" spacing="large" aria-labelledby={TITLE_ID}>
      <div ref={ref} className="grid-site gap-y-10">
        <div className="col-span-4 flex flex-col gap-6 md:col-span-8 lg:col-span-7 lg:gap-8">
          <SectionEyebrow data-row-fade>{content.eyebrow}</SectionEyebrow>
          <SectionTitle id={TITLE_ID} size="xl" className="text-primary">
            <MaskedLine>{content.title}</MaskedLine>
          </SectionTitle>
        </div>

        <div className="col-span-4 flex flex-col gap-8 md:col-span-7 md:col-start-2 lg:col-span-5 lg:col-start-8 lg:pt-14">
          <span aria-hidden="true" data-row-rule className="h-px origin-left bg-foreground" />
          <p data-row-fade className="display text-heading leading-[1.2]">
            {content.quote}
          </p>
          <ul data-row-fade className="flex flex-wrap gap-x-6 gap-y-2">
            {content.points.map((point) => (
              <li key={point} className="label">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
