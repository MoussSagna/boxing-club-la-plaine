import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/ui/link'
import { REGISTRATION } from '@/data/registration'
import { useRowReveal } from '@/hooks/useRowReveal'
import { MaskedLine } from '@/sections/courses/MaskedLines'
import { BigEmail, WRAPPING_BUTTON } from '@/sections/registration/shared'

const TITLE_ID = 'essai-titre'

/**
 * Cours d'essai, séparé de l'inscription : formulaire à télécharger, e-mail au club, puis une
 * date et un horaire définis avec le club. Pas de réservation en ligne, pas de créneau à choisir.
 */
export function RegistrationTrial() {
  const ref = useRowReveal<HTMLDivElement>()
  const { trial, email, links } = REGISTRATION

  return (
    <Section id="essai" theme="cream" spacing="large" aria-labelledby={TITLE_ID} className="scroll-mt-(--header-height)">
      <div ref={ref} className="grid-site gap-y-10">
        <div className="col-span-4 flex flex-col gap-6 md:col-span-8 lg:col-span-6 lg:gap-8">
          <SectionEyebrow data-row-fade>{trial.eyebrow}</SectionEyebrow>
          <SectionTitle id={TITLE_ID} size="l">
            <MaskedLine>{trial.title}</MaskedLine>
          </SectionTitle>
          <ol data-row-fade className="mt-2 flex flex-col">
            {trial.steps.map((step, index) => (
              <li key={step} className="flex items-baseline gap-4 border-b border-border py-3 first:border-t">
                <span aria-hidden="true" className="display text-heading text-primary">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="col-span-4 flex flex-col gap-8 md:col-span-7 md:col-start-2 lg:col-span-5 lg:col-start-8 lg:pt-14">
          <span aria-hidden="true" data-row-rule className="h-px origin-left bg-foreground" />
          {trial.paragraphs.map((paragraph, index) => (
            <p key={paragraph} data-row-fade className={index === 0 ? 'font-medium' : undefined}>
              {paragraph}
            </p>
          ))}
          <p data-row-fade>
            <BigEmail email={email} />
          </p>
          <div data-row-fade className="flex flex-col items-start gap-4">
            <Button asChild size="lg" className={WRAPPING_BUTTON}>
              <AppLink href={links.trialForm} arrow>
                {trial.downloadLabel}
              </AppLink>
            </Button>
            <Button asChild variant="text">
              <AppLink href={`mailto:${email}`} arrow>
                {trial.emailLabel}
              </AppLink>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
