import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/ui/link'
import { useRowReveal } from '@/hooks/useRowReveal'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { ApproachItem } from '@/sections/courses/ApproachItem'
import type { CoursesPageContent } from '@/types'

const TITLE_ID = 'cours-approches'

/** Cœur de la page : la séquence numérotée des approches. */
export function CoursesApproaches({ content }: { content: CoursesPageContent['approaches'] }) {
  const headingRef = useScrollReveal<HTMLDivElement>({ selector: '[data-reveal]' })
  // Fondu par opacité (et non par visibilité) : le lien reste atteignable au clavier avant son reveal.
  const actionRef = useRowReveal<HTMLDivElement>()

  return (
    <Section spacing="large" aria-labelledby={TITLE_ID}>
      <div ref={headingRef} className="mb-12 flex flex-col gap-6 lg:mb-20">
        <SectionEyebrow data-reveal>{content.eyebrow}</SectionEyebrow>
        <SectionTitle id={TITLE_ID} size="m" data-reveal>
          {content.title}
        </SectionTitle>
      </div>

      <ol>
        {content.items.map((approach, index) => (
          <ApproachItem
            key={approach.id}
            approach={approach}
            number={String(index + 1).padStart(2, '0')}
            shifted={index % 2 === 1}
          />
        ))}
      </ol>

      <div ref={actionRef} className="flex border-t border-border pt-8">
        <Button asChild variant="text" data-row-fade>
          <AppLink href={content.action.href} arrow>
            {content.action.label}
          </AppLink>
        </Button>
      </div>
    </Section>
  )
}
