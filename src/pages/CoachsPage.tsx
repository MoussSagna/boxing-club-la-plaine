import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { Accent } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/ui/link'
import { COACHES_PAGE, currentCoaches } from '@/data/coaches'
import { CTA_NAV, ROUTES } from '@/data/navigation'
import { TRAINING_SCHEDULE } from '@/data/schedule'
import { usePageMeta } from '@/hooks/usePageMeta'
import { CoachesIntro } from '@/sections/coaches/CoachesIntro'
import { CoachesList } from '@/sections/coaches/CoachesList'

/** Page Coachs : les visages du club. Seuls les coachs actuels y figurent. */
export function CoachsPage() {
  usePageMeta({
    title: 'Les coachs',
    description:
      'Découvrez les coachs du Boxing Club de la Plaine et leurs différentes approches de la boxe.',
    path: ROUTES.coachs,
  })

  const { title, action } = TRAINING_SCHEDULE

  return (
    <>
      <CoachesIntro content={COACHES_PAGE} />
      <CoachesList coaches={currentCoaches} />

      {/* Sortie de page : le planning, puis l'inscription. */}
      <Section theme="cream" spacing="large">
        <SectionHeader
          eyebrow={TRAINING_SCHEDULE.eyebrow}
          title={
            <>
              {title.lines.map((line) => (
                <span key={line} className="block">
                  {line}{' '}
                </span>
              ))}
              <Accent className="block">{title.accent}</Accent>
            </>
          }
        >
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <Button asChild size="lg">
              <AppLink href={CTA_NAV.href} arrow>
                {CTA_NAV.label}
              </AppLink>
            </Button>
            <Button asChild variant="text">
              <AppLink href={action.href} arrow>
                {action.label}
              </AppLink>
            </Button>
          </div>
        </SectionHeader>
      </Section>
    </>
  )
}
