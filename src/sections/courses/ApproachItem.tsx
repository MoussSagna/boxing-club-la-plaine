import { getCoachName } from '@/data/coaches'
import { useRowReveal } from '@/hooks/useRowReveal'
import { cn } from '@/lib/utils'
import { MaskedLine } from '@/sections/courses/MaskedLines'
import type { CourseApproach } from '@/types'

type ApproachItemProps = {
  approach: CourseApproach
  /** Rang dans la séquence, ex. `01`. */
  number: string
  /** Décale le titre d'une colonne, une ligne sur deux : la séquence ne s'empile pas au cordeau. */
  shifted?: boolean
}

/**
 * Une approche : numéro et filet, titre en très grand avec sa phrase, puis ce qu'on y travaille
 * et les coachs associés. Ni carte ni fond : une ligne d'une séquence.
 */
export function ApproachItem({ approach, number, shifted = false }: ApproachItemProps) {
  const ref = useRowReveal<HTMLLIElement>()
  const titleId = `approche-${approach.id}`
  const coaches = approach.coachIds.map(getCoachName)

  return (
    <li ref={ref} className="relative grid-site gap-y-6 py-10 lg:py-16">
      <span
        aria-hidden="true"
        data-row-rule
        className="absolute inset-x-0 top-0 h-px origin-left bg-border"
      />
      <span aria-hidden="true" className="absolute top-0 left-0 h-1 w-12 bg-primary" />

      <p data-row-fade className="display col-span-4 text-heading text-muted-foreground md:col-span-1">
        <span className="sr-only">Approche </span>
        {number}
      </p>

      <div
        className={cn(
          'col-span-4 flex flex-col gap-3 md:col-span-7 lg:col-span-6',
          shifted ? 'lg:col-start-3' : 'lg:col-start-2',
        )}
      >
        <h3 id={titleId} className="display text-display-l">
          <MaskedLine>{approach.title}</MaskedLine>
        </h3>
        <p data-row-fade className="display text-heading text-primary">
          {approach.intro}
        </p>
      </div>

      <div className="col-span-4 flex flex-col gap-6 md:col-span-6 md:col-start-2 lg:col-span-4 lg:col-start-9 lg:pt-3">
        {approach.points && (
          <ul data-row-fade aria-label="Ce qu’on y travaille" className="flex flex-col">
            {approach.points.map((point) => (
              <li key={point} className="border-b border-border py-2 first:border-t">
                {point}
              </li>
            ))}
          </ul>
        )}
        {approach.description && <p data-row-fade>{approach.description}</p>}
        {approach.note && (
          <p data-row-fade className="text-small text-muted-foreground">
            {approach.note}
          </p>
        )}
        <p data-row-fade className="flex flex-col gap-1">
          <span className="micro text-muted-foreground">
            {coaches.length > 1 ? 'Coachs associés' : 'Coach associé'}
          </span>
          <span className="sr-only"> : </span>
          <span>{coaches.join(', ')}</span>
        </p>
      </div>
    </li>
  )
}
