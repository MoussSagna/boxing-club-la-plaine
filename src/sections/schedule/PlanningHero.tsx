import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Accent, SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/ui/link'
import { useRowReveal } from '@/hooks/useRowReveal'
import { MaskedLine } from '@/sections/courses/MaskedLines'
import type { PlanningPageContent, TrainingScheduleContent } from '@/types'

type PlanningHeroProps = {
  content: PlanningPageContent['hero']
  /** Titre éditorial validé, partagé avec la section de l'accueil. */
  title: TrainingScheduleContent['title']
  /** Repère chiffré, calculé à partir du planning (« 7 jours. 10 séances. »). */
  summary: string
}

/** Ouverture de la page Planning. Compacte : la feuille doit s'annoncer dès le premier écran. */
export function PlanningHero({ content, title, summary }: PlanningHeroProps) {
  const ref = useRowReveal<HTMLDivElement>()

  return (
    <Section spacing="none" className="pt-12 pb-10 lg:pt-20 lg:pb-14">
      <div ref={ref} className="grid-site gap-y-6 lg:gap-y-8">
        <div className="col-span-4 flex flex-col gap-6 md:col-span-8 lg:col-span-12 lg:gap-8">
          <SectionEyebrow data-row-fade>{content.eyebrow}</SectionEyebrow>
          <SectionTitle
            as="h1"
            size="xl"
            className="text-[length:min(var(--text-display-xl),18svh)] leading-[0.92]"
          >
            {title.lines.map((line) => (
              <MaskedLine key={line}>{line}</MaskedLine>
            ))}
            <MaskedLine>
              <Accent>{title.accent}</Accent>
            </MaskedLine>
          </SectionTitle>
        </div>

        <span
          aria-hidden="true"
          data-row-rule
          className="col-span-4 h-px origin-left bg-foreground md:col-span-8 lg:col-span-12"
        />

        <p data-row-fade className="col-span-4 md:col-span-8 lg:col-span-6">
          <span className="font-medium">{summary}</span> {content.closing}
        </p>
        <div
          data-row-fade
          className="col-span-4 flex flex-col items-start gap-4 md:col-span-8 lg:col-span-6 lg:flex-row lg:items-center lg:justify-end lg:gap-8"
        >
          <Button asChild variant="secondary" className="w-full sm:w-auto">
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
