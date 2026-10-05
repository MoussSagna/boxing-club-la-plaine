import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Accent, SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/ui/link'
import { scheduleDays } from '@/data/schedule'
import { useRowReveal } from '@/hooks/useRowReveal'
import { MaskedLine } from '@/sections/courses/MaskedLines'
import type { CoursesPageContent } from '@/types'

const TITLE_ID = 'cours-planning'

/** Passage vers le planning. Les deux nombres viennent du planning lui-même. */
export function CoursesOutro({ content }: { content: CoursesPageContent['outro'] }) {
  const ref = useRowReveal<HTMLDivElement>()
  const sessionCount = scheduleDays.reduce((total, day) => total + day.sessions.length, 0)

  return (
    <Section theme="cream" spacing="large" aria-labelledby={TITLE_ID}>
      <div ref={ref} className="flex flex-col items-start gap-8 lg:gap-10">
        <SectionEyebrow data-row-fade>{content.eyebrow}</SectionEyebrow>
        <SectionTitle id={TITLE_ID} size="xl">
          <MaskedLine>{scheduleDays.length} jours.</MaskedLine>
          <MaskedLine>{sessionCount} séances.</MaskedLine>
          <MaskedLine>
            <Accent>{content.closing}</Accent>
          </MaskedLine>
        </SectionTitle>
        <div data-row-fade className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <AppLink href={content.primaryCta.href} arrow>
              {content.primaryCta.label}
            </AppLink>
          </Button>
          <Button asChild variant="text">
            <AppLink href={content.secondaryCta.href} arrow>
              {content.secondaryCta.label}
            </AppLink>
          </Button>
        </div>
      </div>
    </Section>
  )
}
