import { Download } from 'lucide-react'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Accent, SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/ui/link'
import { REGISTRATION } from '@/data/registration'
import { useRowReveal } from '@/hooks/useRowReveal'
import { MaskedLine } from '@/sections/courses/MaskedLines'
import { RegistrationStep } from '@/sections/registration/RegistrationStep'
import { BigEmail, RichText, WRAPPING_BUTTON } from '@/sections/registration/shared'

const TITLE_ID = 'inscription-titre'
const STEP_IDS = ['etape-licence', 'etape-dossier', 'etape-reglement', 'etape-envoi']
const number = (index: number) => String(index + 1).padStart(2, '0')

/** Les documents d'une pratique : un lien de téléchargement par fichier fourni. */
function PracticeDocuments({ practiceId, label }: { practiceId: string; label: string }) {
  const { documents, steps } = REGISTRATION
  const list = documents.filter((document) => document.practiceIds.includes(practiceId))

  return (
    <div className="flex flex-col gap-3">
      <h4 className="display text-heading">{label}</h4>
      <ul>
        {list.map((document) => (
          <li key={document.id} className="border-b border-border first:border-t">
            {document.href ? (
              <AppLink
                href={document.href}
                className="group flex min-h-11 items-center justify-between gap-4 py-2 transition-colors duration-200 hover:text-primary"
              >
                {document.title}
                <Download aria-hidden="true" className="size-4 shrink-0 text-primary" />
              </AppLink>
            ) : (
              <p className="flex min-h-11 items-center justify-between gap-4 py-2">
                {document.title}
                <span className="micro text-muted-foreground">{steps.documents.missing}</span>
              </p>
            )}
          </li>
        ))}
        <li className="flex min-h-11 items-center border-b border-border py-2">
          + {steps.documents.extra}
        </li>
      </ul>
    </div>
  )
}

/** « Je veux m'inscrire » : le parcours en quatre étapes, d'abord en un coup d'œil, puis en détail. */
export function RegistrationSteps() {
  const headingRef = useRowReveal<HTMLDivElement>()
  const { steps, practices, email, links } = REGISTRATION
  const { licence, documents, payment, sending } = steps

  return (
    <Section
      id="inscription"
      spacing="large"
      aria-labelledby={TITLE_ID}
      className="scroll-mt-(--header-height)"
    >
      <div ref={headingRef} className="mb-12 flex flex-col gap-8 lg:mb-20 lg:gap-12">
        <div className="flex flex-col gap-6 lg:gap-8">
          <SectionEyebrow data-row-fade>{steps.eyebrow}</SectionEyebrow>
          <SectionTitle id={TITLE_ID} size="l">
            {steps.title.lines.map((line) => (
              <MaskedLine key={line}>{line}</MaskedLine>
            ))}
            <MaskedLine>
              <Accent>{steps.title.accent}</Accent>
            </MaskedLine>
          </SectionTitle>
        </div>

        {/* Le parcours en un regard : quatre repères, chacun mène à son étape. */}
        <nav aria-label="Les étapes de l’inscription" data-row-fade>
          <ol className="grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {steps.overview.map((label, index) => (
              <li key={label} className="border-b border-border lg:border-b-0">
                <a
                  href={`#${STEP_IDS[index]}`}
                  className="group flex min-h-11 items-baseline gap-4 py-4 transition-colors duration-200 hover:text-primary lg:flex-col lg:gap-1"
                >
                  <span className="display text-heading text-primary">{number(index)}</span>
                  <span className="label">{label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <ol>
        <RegistrationStep id={STEP_IDS[0]!} number={number(0)} title={licence.title}>
          <p data-row-fade className="max-w-[52ch]">
            {licence.text}
          </p>
          <p data-row-fade className="max-w-[52ch] border-l-2 border-primary pl-4 font-medium">
            {licence.note}
          </p>
          <div data-row-fade className="flex">
            <Button asChild size="lg" className={WRAPPING_BUTTON}>
              <AppLink href={links.ffb} arrow>
                {licence.cta}
              </AppLink>
            </Button>
          </div>
        </RegistrationStep>

        <RegistrationStep id={STEP_IDS[1]!} number={number(1)} title={documents.title}>
          <p data-row-fade className="max-w-[52ch]">
            <RichText parts={documents.text} />
          </p>
          <div data-row-fade className="grid gap-10 md:grid-cols-2 md:gap-8">
            {practices.map((practice) => (
              <PracticeDocuments key={practice.id} practiceId={practice.id} label={practice.label} />
            ))}
          </div>
        </RegistrationStep>

        <RegistrationStep id={STEP_IDS[2]!} number={number(2)} title={payment.title}>
          <p data-row-fade className="max-w-[52ch]">
            <RichText parts={payment.text} />
          </p>
          <dl data-row-fade className="grid gap-8 border-y border-border py-8 sm:grid-cols-2">
            {practices.map((practice) => (
              <div key={practice.id} className="flex flex-col-reverse gap-2">
                <dt className="label">{practice.label}</dt>
                <dd className="display text-display-xl leading-none">
                  {practice.price}&nbsp;€
                </dd>
              </div>
            ))}
          </dl>
          <div data-row-fade className="flex">
            <Button asChild size="lg" variant="secondary" className={WRAPPING_BUTTON}>
              <AppLink href={links.rib} arrow>
                {payment.cta}
              </AppLink>
            </Button>
          </div>
        </RegistrationStep>

        <RegistrationStep id={STEP_IDS[3]!} number={number(3)} title={sending.title}>
          <p data-row-fade className="max-w-[52ch]">
            {sending.text}
          </p>
          <p data-row-fade>
            <BigEmail email={email} />
          </p>
          <p data-row-fade className="max-w-[52ch] border-l-2 border-primary pl-4 font-medium">
            {sending.warning}
          </p>
          <div data-row-fade className="flex">
            <Button asChild size="lg" className={WRAPPING_BUTTON}>
              <AppLink href={`mailto:${email}`} arrow>
                {sending.cta}
              </AppLink>
            </Button>
          </div>
        </RegistrationStep>
      </ol>
    </Section>
  )
}
