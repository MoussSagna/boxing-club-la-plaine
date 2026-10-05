import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Accent, SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/ui/link'
import { useRowReveal } from '@/hooks/useRowReveal'
import { MaskedLine } from '@/sections/courses/MaskedLines'
import type { CoursesPageContent } from '@/types'

/** Ouverture de la page : trois verbes en très grand, une phrase, deux liens. */
export function CoursesHero({ content }: { content: CoursesPageContent['hero'] }) {
  const ref = useRowReveal<HTMLDivElement>()

  return (
    <Section
      spacing="none"
      // Espacement propre à cette ouverture : elle doit tenir dans un écran bas (1280 × 720).
      className="flex min-h-[calc(100svh-var(--header-height))] flex-col justify-end pt-12 pb-8 lg:pb-10"
    >
      <div ref={ref} className="grid-site gap-y-6 lg:gap-y-8">
        <div className="col-span-4 flex flex-col gap-6 md:col-span-8 lg:col-span-12 lg:gap-8">
          <SectionEyebrow data-row-fade>{content.eyebrow}</SectionEyebrow>
          {/* Taille bornée aussi par la hauteur de l'écran, comme le titre du hero de l'accueil. */}
          <SectionTitle
            as="h1"
            size="xl"
            className="text-[length:min(var(--text-display-xl),16svh)] leading-[0.92]"
          >
            {content.title.lines.map((line) => (
              <MaskedLine key={line}>{line}</MaskedLine>
            ))}
            <MaskedLine>
              <Accent>{content.title.accent}</Accent>
            </MaskedLine>
          </SectionTitle>
        </div>

        <span
          aria-hidden="true"
          data-row-rule
          className="col-span-4 h-px origin-left bg-foreground md:col-span-8 lg:col-span-12"
        />

        <p data-row-fade className="col-span-4 max-w-[30ch] md:col-span-5 lg:col-span-5">
          {content.text}
        </p>
        <div
          data-row-fade
          className="col-span-4 flex flex-col items-start gap-4 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:flex-row lg:items-center lg:justify-end lg:gap-8"
        >
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
