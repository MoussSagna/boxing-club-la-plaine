import { cn } from '@/lib/utils'

type CoachHeadingProps = {
  id: string
  /** Rang dans la page, ex. `01`. */
  number: string
  name: string
  className?: string
}

/** Numéro, trait rouge et nom en très grand : prénom et nom sur deux lignes masquées (reveal). */
export function CoachHeading({ id, number, name, className }: CoachHeadingProps) {
  const [firstName, ...rest] = name.split(' ')
  const lines = [firstName, rest.join(' ')].filter(Boolean)

  return (
    <div className={cn('flex flex-col gap-4 lg:gap-6', className)}>
      <p className="label flex items-center gap-3">
        <span data-coach-fade>{number}</span>
        <span
          aria-hidden="true"
          data-coach-rule
          className="h-0.5 w-10 origin-left bg-primary"
        />
      </p>
      <h2 id={id} className="display text-display-l whitespace-nowrap">
        {lines.map((line) => (
          // Le padding laisse la place aux accents des capitales (« JÉRÔME », « HOURDÉ »).
          <span key={line} className="-my-[0.14em] block overflow-hidden py-[0.14em]">
            <span data-coach-line className="block">
              {line}{' '}
            </span>
          </span>
        ))}
      </h2>
    </div>
  )
}
