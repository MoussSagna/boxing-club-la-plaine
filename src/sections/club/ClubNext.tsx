import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Accent, SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/ui/link'
import { useRowReveal } from '@/hooks/useRowReveal'
import { cn } from '@/lib/utils'
import { MaskedLine } from '@/sections/courses/MaskedLines'
import type { ClubPageContent } from '@/types'

type NextItem = ClubPageContent['next'][number]

/** Un renvoi : sur-titre, titre, phrase, liens. Le premier lien est un bouton en contour. */
function NextBlock({ item, id, className }: { item: NextItem; id: string; className?: string }) {
  const ref = useRowReveal<HTMLDivElement>()
  const [first, ...others] = item.links

  return (
    <div ref={ref} className={cn('relative flex flex-col items-start gap-6 pt-8 lg:gap-8 lg:pt-10', className)}>
      <span
        aria-hidden="true"
        data-row-rule
        className="absolute inset-x-0 top-0 h-px origin-left bg-border"
      />
      <span
        aria-hidden="true"
        data-row-rule
        className="absolute top-0 left-0 h-1 w-12 origin-left bg-primary"
      />
      <SectionEyebrow data-row-fade>{item.eyebrow}</SectionEyebrow>
      <SectionTitle id={id} size="m">
        {item.title.lines.map((line) => (
          <MaskedLine key={line}>{line}</MaskedLine>
        ))}
        <MaskedLine>
          <Accent>{item.title.accent}</Accent>
        </MaskedLine>
      </SectionTitle>
      <p data-row-fade className="max-w-[40ch] text-muted-foreground">
        {item.text}
      </p>
      <div
        data-row-fade
        className="flex w-full flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8"
      >
        {first && (
          <Button asChild variant="secondary" className="w-full sm:w-auto">
            <AppLink href={first.href} arrow>
              {first.label}
            </AppLink>
          </Button>
        )}
        {others.map((link) => (
          <Button key={link.href} asChild variant="text">
            <AppLink href={link.href} arrow>
              {link.label}
            </AppLink>
          </Button>
        ))}
      </div>
    </div>
  )
}

/** Après la salle : ceux qui l'animent (coachs), et ce qu'on y fait (cours, planning). */
export function ClubNext({ content }: { content: ClubPageContent['next'] }) {
  return (
    <Section spacing="large">
      <div className="grid-site gap-y-16">
        {content.map((item, index) => (
          <NextBlock
            key={item.eyebrow}
            item={item}
            id={`club-suite-${index + 1}`}
            className={cn(
              'col-span-4 md:col-span-8 lg:col-span-6',
              // Le second bloc est décalé vers le bas : les deux ne s'alignent pas au cordeau.
              index % 2 === 1 && 'lg:mt-24',
            )}
          />
        ))}
      </div>
    </Section>
  )
}
