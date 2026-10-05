import { cn } from '@/lib/utils'
import type { Coach } from '@/types'

/**
 * Qualifications existantes, style de cours et description.
 * Rien d'autre : ni ancienneté, ni palmarès, ni statistique qui ne figure pas dans les données.
 */
export function CoachDetails({ coach, className }: { coach: Coach; className?: string }) {
  const credentials = [...coach.qualifications, ...(coach.achievements ?? [])]

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <ul data-coach-fade className="flex flex-col gap-1 border-t border-border pt-4">
        {credentials.map((credential) => (
          <li key={credential} className="text-small text-muted-foreground">
            {credential}
          </li>
        ))}
      </ul>

      {coach.style && (
        <div className="flex flex-col gap-3">
          <p data-coach-fade className="display text-heading text-primary">
            <span className="sr-only">Style de cours : </span>
            {coach.style.label}
          </p>
          <p data-coach-fade className="max-w-[46ch]">
            {coach.style.description}
          </p>
        </div>
      )}
    </div>
  )
}
