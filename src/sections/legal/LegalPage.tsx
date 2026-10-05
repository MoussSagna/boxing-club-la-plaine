import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Accent, SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/ui/link'
import { useRowReveal } from '@/hooks/useRowReveal'
import { MaskedLine } from '@/sections/courses/MaskedLines'
import type { LegalPageContent, LegalRow, LegalSection } from '@/types'

/** Mention affichée pour une information non fournie ou non vérifiée. */
const TO_CONFIRM = 'À confirmer'

function Row({ row }: { row: LegalRow }) {
  const lines = row.value === undefined ? [] : [row.value].flat()

  return (
    <div className="grid gap-x-8 gap-y-1 border-b border-border py-3 first:border-t sm:grid-cols-[14rem_1fr]">
      <dt className="text-muted-foreground">{row.label}</dt>
      <dd className="font-medium">
        {lines.length > 0 &&
          (row.href ? (
            <AppLink href={row.href} variant="inline">
              {lines.join(' ')}
            </AppLink>
          ) : (
            lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))
          ))}
        {row.toConfirm && (
          <span className="label mt-1 block text-accent-text first:mt-0">[{TO_CONFIRM}]</span>
        )}
      </dd>
    </div>
  )
}

function SectionBlock({ section }: { section: LegalSection }) {
  return (
    <section
      aria-labelledby={section.id}
      className="grid-site gap-y-4 border-t border-foreground py-10 lg:py-14"
    >
      <h2 id={section.id} className="display col-span-4 text-heading md:col-span-8 lg:col-span-4">
        {section.title}
      </h2>
      {/* Colonne de lecture : environ 70 caractères par ligne au plus. */}
      <div className="col-span-4 flex max-w-[56ch] flex-col gap-5 md:col-span-8 lg:col-span-7 lg:col-start-6">
        {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.items && (
          <ul className="flex list-disc flex-col gap-1 pl-5 marker:text-primary">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {section.rows && (
          <dl>
            {section.rows.map((row) => (
              <Row key={row.label} row={row} />
            ))}
          </dl>
        )}
        {section.link && (
          <div className="flex">
            <Button asChild variant="text">
              <AppLink href={section.link.href} arrow>
                {section.link.label}
              </AppLink>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

/**
 * Gabarit des pages juridiques : en-tête sobre sur fond noir, puis le texte sur fond crème,
 * en colonne de lecture. Une seule animation, à l'ouverture ; le contenu est statique.
 */
export function LegalPage({ content }: { content: LegalPageContent }) {
  const ref = useRowReveal<HTMLDivElement>()

  return (
    <>
      <Section spacing="none" className="pt-12 pb-10 lg:pt-20 lg:pb-14">
        <div ref={ref} className="flex flex-col gap-6 lg:gap-8">
          <SectionEyebrow data-row-fade>{content.eyebrow}</SectionEyebrow>
          {/* Interligne desserré : les accents (« LÉGALES », « CONFIDENTIALITÉ ») ne touchent pas la ligne du dessus. */}
          <SectionTitle as="h1" size="l" className="leading-[1.06]">
            {content.title.lines.map((line) => (
              <MaskedLine key={line}>{line}</MaskedLine>
            ))}
            <MaskedLine>
              <Accent>{content.title.accent}</Accent>
            </MaskedLine>
          </SectionTitle>
        </div>
      </Section>

      <Section theme="cream" spacing="medium">
        {content.sections.map((section) => (
          <SectionBlock key={section.id} section={section} />
        ))}
      </Section>
    </>
  )
}
