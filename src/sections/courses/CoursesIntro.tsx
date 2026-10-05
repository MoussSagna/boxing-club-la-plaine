import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Accent, SectionTitle } from '@/components/SectionTitle'
import { useRowReveal } from '@/hooks/useRowReveal'
import { MaskedLine } from '@/sections/courses/MaskedLines'
import type { CoursesPageContent } from '@/types'

const TITLE_ID = 'cours-introduction'

/** « Pas une seule façon de boxer » : titre à gauche, texte en retrait à droite. */
export function CoursesIntro({ content }: { content: CoursesPageContent['intro'] }) {
  const ref = useRowReveal<HTMLDivElement>()

  return (
    <Section theme="cream" spacing="large" aria-labelledby={TITLE_ID}>
      <div ref={ref} className="grid-site gap-y-10">
        <div className="col-span-4 flex flex-col gap-6 md:col-span-8 lg:col-span-9 lg:gap-8">
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
        <div className="col-span-4 flex flex-col gap-4 border-t border-foreground pt-5 md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-8">
          {content.text.map((paragraph, index) => (
            <p
              key={paragraph}
              data-row-fade
              className={index === 0 ? 'font-medium' : 'text-muted-foreground'}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  )
}
