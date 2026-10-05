import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { SectionTitle } from '@/components/SectionTitle'
import { REGISTRATION } from '@/data/registration'
import { useRowReveal } from '@/hooks/useRowReveal'
import { MaskedLine } from '@/sections/courses/MaskedLines'

const TITLE_ID = 'inscription-verification'

/** Aide-mémoire avant l'envoi. Liste statique : les cases sont décoratives. */
export function RegistrationChecklist() {
  const ref = useRowReveal<HTMLDivElement>()
  const { checklist } = REGISTRATION

  return (
    <Section theme="cream" spacing="large" aria-labelledby={TITLE_ID}>
      <div ref={ref} className="grid-site gap-y-10">
        <div className="col-span-4 flex flex-col gap-6 md:col-span-8 lg:col-span-5 lg:gap-8">
          <SectionEyebrow data-row-fade>{checklist.eyebrow}</SectionEyebrow>
          <SectionTitle id={TITLE_ID} size="l">
            <MaskedLine>{checklist.title}</MaskedLine>
          </SectionTitle>
        </div>
        <ul data-row-fade className="col-span-4 md:col-span-7 md:col-start-2 lg:col-span-6 lg:col-start-7">
          {checklist.items.map((item) => (
            <li key={item} className="flex items-center gap-4 border-b border-border py-3 first:border-t">
              <span aria-hidden="true" className="size-4 shrink-0 border-2 border-foreground" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
