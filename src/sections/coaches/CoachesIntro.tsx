import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Accent, SectionTitle } from '@/components/SectionTitle'
import type { CoachesPageContent } from '@/types'

/** En-tête de la page : sur-titre, H1 monumental, courte introduction. */
export function CoachesIntro({ content }: { content: CoachesPageContent }) {
  return (
    <Section spacing="large" className="flex min-h-[60svh] flex-col justify-end">
      <div className="grid-site gap-y-8">
        <div className="col-span-4 flex flex-col gap-6 md:col-span-8 lg:col-span-12 lg:gap-8">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <SectionTitle as="h1" size="xl">
            {content.title.lines.map((line) => (
              <span key={line} className="block">
                {line}{' '}
              </span>
            ))}
            <Accent className="block">{content.title.accent}</Accent>
          </SectionTitle>
        </div>
        <p className="col-span-4 max-w-[38ch] border-t border-foreground pt-5 md:col-span-6 lg:col-span-5 lg:col-start-8">
          {content.text}
        </p>
      </div>
    </Section>
  )
}
