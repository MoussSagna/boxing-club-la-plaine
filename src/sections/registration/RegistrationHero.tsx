import { ArrowDown } from 'lucide-react'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Accent, SectionTitle } from '@/components/SectionTitle'
import { REGISTRATION } from '@/data/registration'
import { useRowReveal } from '@/hooks/useRowReveal'
import { MaskedLine } from '@/sections/courses/MaskedLines'

/** Ouverture : le titre, puis les deux parcours — essayer d'abord, ou s'inscrire. */
export function RegistrationHero() {
  const ref = useRowReveal<HTMLDivElement>()
  const { hero } = REGISTRATION

  return (
    <Section spacing="none" className="pt-12 pb-10 lg:pt-20 lg:pb-14">
      <div ref={ref} className="grid-site gap-y-6 lg:gap-y-8">
        <div className="col-span-4 flex flex-col gap-6 md:col-span-8 lg:col-span-12 lg:gap-8">
          <SectionEyebrow data-row-fade>{hero.eyebrow}</SectionEyebrow>
          <SectionTitle
            as="h1"
            size="xl"
            className="text-[length:min(var(--text-display-xl),18svh)] leading-[0.92]"
          >
            {hero.title.lines.map((line) => (
              <MaskedLine key={line}>{line}</MaskedLine>
            ))}
            <MaskedLine>
              <Accent>{hero.title.accent}</Accent>
            </MaskedLine>
          </SectionTitle>
        </div>

        <p data-row-fade className="col-span-4 max-w-[44ch] md:col-span-6 lg:col-span-5">
          {hero.text}
        </p>

        <nav
          aria-label="Votre situation"
          data-row-fade
          className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7"
        >
          <ul className="border-t border-border">
            {hero.paths.map((path) => (
              <li key={path.href} className="border-b border-border">
                <a
                  href={path.href}
                  className="group display flex min-h-11 items-center justify-between gap-4 py-3 text-heading transition-colors duration-200 hover:text-primary"
                >
                  {path.label}
                  <ArrowDown
                    aria-hidden="true"
                    className="size-6 shrink-0 text-primary transition-transform duration-300 ease-out-quart motion-safe:group-hover:translate-y-1"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Section>
  )
}
