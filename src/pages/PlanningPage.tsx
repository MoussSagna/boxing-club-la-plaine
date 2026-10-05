import { Section } from '@/components/Section'
import { ROUTES } from '@/data/navigation'
import { PLANNING_PAGE } from '@/data/planning'
import { scheduleDays, TRAINING_SCHEDULE } from '@/data/schedule'
import { usePageMeta } from '@/hooks/usePageMeta'
import { PlanningCallout } from '@/sections/schedule/PlanningCallout'
import { PlanningHero } from '@/sections/schedule/PlanningHero'
import { PlanningMarkers } from '@/sections/schedule/PlanningMarkers'
import { ScheduleSheet } from '@/sections/schedule/ScheduleSheet'

const SHEET_TITLE_ID = 'planning-semaine'

/** Page Planning : quand venir, avec qui, pour quelle séance. Statique, sans filtre ni date du jour. */
export function PlanningPage() {
  usePageMeta({
    title: 'Planning',
    description:
      'Découvrez les horaires des entraînements du Boxing Club de la Plaine à Paris 15.',
    path: ROUTES.planning,
  })

  const sessionCount = scheduleDays.reduce((total, day) => total + day.sessions.length, 0)
  const { hero, sheetTitle, markers, coaches, outro } = PLANNING_PAGE

  return (
    <>
      <PlanningHero
        content={hero}
        title={TRAINING_SCHEDULE.title}
        summary={`${scheduleDays.length} jours. ${sessionCount} séances.`}
      />

      <Section theme="cream" spacing="medium" aria-labelledby={SHEET_TITLE_ID}>
        <h2 id={SHEET_TITLE_ID} className="sr-only">
          {sheetTitle}
        </h2>
        <ScheduleSheet days={scheduleDays} numbered />
      </Section>

      <PlanningMarkers content={markers} days={scheduleDays} />

      <PlanningCallout
        id="planning-coachs"
        theme="cream"
        eyebrow={coaches.eyebrow}
        title={coaches.title}
        text={coaches.text}
        secondaryCta={coaches.action}
      />

      <PlanningCallout
        id="planning-inscription"
        theme="dark"
        size="xl"
        title={outro.title}
        text={outro.text}
        primaryCta={outro.primaryCta}
        secondaryCta={outro.secondaryCta}
      />
    </>
  )
}
