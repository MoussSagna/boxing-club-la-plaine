import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Accent, SectionTitle } from '@/components/SectionTitle'
import { cn } from '@/lib/utils'
import type { TrainingScheduleContent } from '@/types'

type ScheduleHeadingProps = {
  id: string
  eyebrow: string
  title: TrainingScheduleContent['title']
  /** Repère chiffré, calculé à partir des données (ex. « 7 jours — 10 séances »). */
  summary?: string
  className?: string
}

/** Sur-titre, titre monumental (lignes masquées pour le reveal) et repère chiffré. */
export function ScheduleHeading({ id, eyebrow, title, summary, className }: ScheduleHeadingProps) {
  return (
    <div className={cn('flex flex-col gap-6 lg:gap-8', className)}>
      <SectionEyebrow data-schedule-fade>{eyebrow}</SectionEyebrow>
      <SectionTitle id={id} size="xl" className="whitespace-nowrap">
        {[...title.lines, title.accent].map((line, index) => (
          // Le padding compense l'interligne serré : sans lui le masque rognerait les lettres,
          // et en particulier l'accent du « À ».
          <span key={line} className="-my-[0.16em] block overflow-hidden py-[0.16em]">
            <span data-schedule-line className="block">
              {index === title.lines.length ? <Accent>{line}</Accent> : line}{' '}
            </span>
          </span>
        ))}
      </SectionTitle>
      {summary && (
        <p data-schedule-fade className="label text-muted-foreground">
          {summary}
        </p>
      )}
    </div>
  )
}
