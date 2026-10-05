import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Accent, SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/ui/link'
import { useRowReveal } from '@/hooks/useRowReveal'
import { formatTime } from '@/lib/schedule'
import { MaskedLine } from '@/sections/courses/MaskedLines'
import type { PlanningPageContent, ScheduleDay, ScheduleMarker } from '@/types'

const TITLE_ID = 'planning-reperes'

/** Séances rattachées à un repère, lues dans le planning : « Mardi 18h », « Jeudi 18h »… */
function findSessions(marker: ScheduleMarker, days: ScheduleDay[]) {
  return days.flatMap((day) =>
    day.sessions
      .filter((session) =>
        marker.youth
          ? Boolean(session.ageRange)
          : session.tags?.some((tag) => marker.tags?.includes(tag)),
      )
      .map((session) => ({
        id: session.id,
        text: `${day.label} ${formatTime(session.start)}`,
        detail: marker.youth ? session.ageRange : undefined,
      })),
  )
}

function MarkerRow({ marker, days }: { marker: ScheduleMarker; days: ScheduleDay[] }) {
  const ref = useRowReveal<HTMLLIElement>()
  const sessions = findSessions(marker, days)
  // Dit d'où vient le regroupement : les mentions exactes du planning.
  const source = marker.youth
    ? 'Séances avec une tranche d’âge'
    : `Mention au planning : ${marker.tags?.map((tag) => `« ${tag} »`).join(' ou ')}`

  return (
    <li ref={ref} className="relative grid-site items-baseline gap-y-3 py-6 lg:py-8">
      <span
        aria-hidden="true"
        data-row-rule
        className="absolute inset-x-0 top-0 h-px origin-left bg-border"
      />
      <h3 className="display col-span-4 text-display-m md:col-span-8 lg:col-span-5">
        <MaskedLine>{marker.label}</MaskedLine>
      </h3>
      <div data-row-fade className="col-span-4 flex flex-col gap-2 md:col-span-8 lg:col-span-7">
        <p className="micro text-muted-foreground">{source}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          {sessions.map((session) => (
            <li key={session.id}>
              {session.text}
              {session.detail && <span className="text-muted-foreground"> — {session.detail}</span>}
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

type PlanningMarkersProps = {
  content: PlanningPageContent['markers']
  days: ScheduleDay[]
}

/**
 * Repères de lecture du planning. Ce ne sont ni des filtres ni des catégories officielles :
 * une liste statique, calculée à partir des mentions des séances.
 */
export function PlanningMarkers({ content, days }: PlanningMarkersProps) {
  const headingRef = useRowReveal<HTMLDivElement>()
  const actionRef = useRowReveal<HTMLDivElement>()

  return (
    <Section spacing="large" aria-labelledby={TITLE_ID}>
      <div ref={headingRef} className="mb-10 grid-site gap-y-6 lg:mb-16">
        <div className="col-span-4 flex flex-col gap-6 md:col-span-8 lg:col-span-8">
          <SectionEyebrow data-row-fade>{content.eyebrow}</SectionEyebrow>
          <SectionTitle id={TITLE_ID} size="l">
            {content.title.lines.map((line) => (
              <MaskedLine key={line}>{line}</MaskedLine>
            ))}
            <MaskedLine>
              <Accent>{content.title.accent}</Accent>
            </MaskedLine>
          </SectionTitle>
        </div>
        <p
          data-row-fade
          className="col-span-4 max-w-[36ch] self-end text-muted-foreground md:col-span-6 lg:col-span-4"
        >
          {content.text}
        </p>
      </div>

      <ul>
        {content.items.map((marker) => (
          <MarkerRow key={marker.id} marker={marker} days={days} />
        ))}
      </ul>

      <div ref={actionRef} className="flex border-t border-border pt-8">
        <Button asChild variant="text" data-row-fade>
          <AppLink href={content.action.href} arrow>
            {content.action.label}
          </AppLink>
        </Button>
      </div>
    </Section>
  )
}
