import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Accent, SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/ui/link'
import { useRowReveal } from '@/hooks/useRowReveal'
import { MaskedLine } from '@/sections/courses/MaskedLines'
import type { NavItem } from '@/types'

type PlanningCalloutProps = {
  id: string
  theme: 'dark' | 'cream'
  eyebrow?: string
  title: { lines: string[]; accent: string }
  size?: 'xl' | 'l'
  text: string
  /** Bouton principal (plein). Sans lui, `secondaryCta` est le seul lien. */
  primaryCta?: NavItem
  secondaryCta: NavItem
}

/** Bloc d'appel : grand titre, une phrase, un ou deux liens. Sert au renvoi vers les coachs et à la clôture. */
export function PlanningCallout({
  id,
  theme,
  eyebrow,
  title,
  size = 'l',
  text,
  primaryCta,
  secondaryCta,
}: PlanningCalloutProps) {
  const ref = useRowReveal<HTMLDivElement>()

  return (
    <Section theme={theme} spacing="large" aria-labelledby={id}>
      <div ref={ref} className="flex flex-col items-start gap-8 lg:gap-10">
        {eyebrow && <SectionEyebrow data-row-fade>{eyebrow}</SectionEyebrow>}
        <SectionTitle id={id} size={size}>
          {title.lines.map((line) => (
            <MaskedLine key={line}>{line}</MaskedLine>
          ))}
          <MaskedLine>
            <Accent>{title.accent}</Accent>
          </MaskedLine>
        </SectionTitle>
        <p data-row-fade className="max-w-[40ch]">
          {text}
        </p>
        <div
          data-row-fade
          className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8"
        >
          {primaryCta && (
            <Button asChild size="lg" className="w-full sm:w-auto">
              <AppLink href={primaryCta.href} arrow>
                {primaryCta.label}
              </AppLink>
            </Button>
          )}
          <Button asChild variant="text">
            <AppLink href={secondaryCta.href} arrow>
              {secondaryCta.label}
            </AppLink>
          </Button>
        </div>
      </div>
    </Section>
  )
}
