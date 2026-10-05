import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Accent, SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/ui/link'
import { REGISTRATION } from '@/data/registration'
import { useRowReveal } from '@/hooks/useRowReveal'
import { MaskedLine } from '@/sections/courses/MaskedLines'
import { BigEmail } from '@/sections/registration/shared'

const TITLE_ID = 'inscription-contact'

/** Clôture : comment joindre le club. */
export function RegistrationContact() {
  const ref = useRowReveal<HTMLDivElement>()
  const { contact, email } = REGISTRATION

  return (
    <Section spacing="large" aria-labelledby={TITLE_ID}>
      <div ref={ref} className="flex flex-col items-start gap-8 lg:gap-10">
        <SectionEyebrow data-row-fade>{contact.eyebrow}</SectionEyebrow>
        <SectionTitle id={TITLE_ID} size="xl">
          {contact.title.lines.map((line) => (
            <MaskedLine key={line}>{line}</MaskedLine>
          ))}
          <MaskedLine>
            <Accent>{contact.title.accent}</Accent>
          </MaskedLine>
        </SectionTitle>
        <p data-row-fade>
          <BigEmail email={email} />
        </p>
        <div data-row-fade className="flex">
          <Button asChild variant="text">
            <AppLink href={contact.planning.href} arrow>
              {contact.planning.label}
            </AppLink>
          </Button>
        </div>
      </div>
    </Section>
  )
}
