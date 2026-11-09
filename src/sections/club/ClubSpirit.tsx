import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Accent } from '@/components/SectionTitle'
import { useRowReveal } from '@/hooks/useRowReveal'
import { HistoryPhilosophy } from '@/sections/club-history/HistoryPhilosophy'
import { MaskedLine } from '@/sections/courses/MaskedLines'
import type { ClubPageContent } from '@/types'

const TITLE_ID = 'club-esprit'

/**
 * L'esprit du club, en composition typographique :
 *   LES DÉBUTANTS
 *   ᴬᵛᴱᶜ COMPÉTITEURS.
 *   ᴸᴱˢ
 * Les mots de liaison en petit et empilés, comme dans le titre de l'accueil ; seul le dernier
 * mot est rouge. Puis la phrase officielle, décalée à droite. Lu d'une traite par les lecteurs d'écran.
 */
export function ClubSpirit({ content }: { content: ClubPageContent['spirit'] }) {
  const ref = useRowReveal<HTMLDivElement>()
  const { title } = content
  const connector = title.connector.split(' ')

  return (
    <Section theme="cream" spacing="large" aria-labelledby={TITLE_ID}>
      <div ref={ref} className="grid-site gap-y-10 lg:gap-y-16">
        <SectionEyebrow data-row-fade className="col-span-4 md:col-span-8 lg:col-span-12">
          {content.eyebrow}
        </SectionEyebrow>

        {/* Taille calculée pour que « COMPÉTITEURS. » et ses mots de liaison tiennent sur une ligne. */}
        <h2
          id={TITLE_ID}
          className="display col-span-4 text-[length:min(13.5vw,12rem)] leading-[0.9] whitespace-nowrap md:col-span-8 lg:col-span-12"
        >
          <MaskedLine>{title.lead}</MaskedLine>
          <MaskedLine>
            <span className="flex items-start gap-[0.12em]">
              <span className="mt-[0.1em] flex flex-col text-[0.3em] leading-[0.95]">
                {connector.map((word) => (
                  <span key={word}>{word} </span>
                ))}
              </span>
              <Accent>{title.accent}</Accent>
            </span>
          </MaskedLine>
        </h2>

        <div className="relative col-span-4 pt-6 md:col-span-6 md:col-start-3 lg:col-span-7 lg:col-start-6 lg:pt-8">
          <span
            aria-hidden="true"
            data-row-rule
            className="absolute inset-x-0 top-0 h-px origin-left bg-foreground"
          />
          <span
            aria-hidden="true"
            data-row-rule
            className="absolute top-0 left-0 h-1 w-12 origin-left bg-primary"
          />
          <div data-row-fade>
            <HistoryPhilosophy philosophy={content.philosophy} />
          </div>
        </div>
      </div>
    </Section>
  )
}
