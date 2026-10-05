import type { ReactNode } from 'react'
import { useRowReveal } from '@/hooks/useRowReveal'
import { MaskedLine } from '@/sections/courses/MaskedLines'

type RegistrationStepProps = {
  id: string
  /** Rang de l'étape, ex. `01`. */
  number: string
  title: string
  children: ReactNode
}

/** Une étape du parcours : grand numéro, filet à amorce rouge, titre, puis son contenu. */
export function RegistrationStep({ id, number, title, children }: RegistrationStepProps) {
  const ref = useRowReveal<HTMLLIElement>()

  return (
    <li
      ref={ref}
      id={id}
      className="relative grid-site scroll-mt-(--header-height) gap-y-6 py-12 lg:py-20"
    >
      <span
        aria-hidden="true"
        data-row-rule
        className="absolute inset-x-0 top-0 h-px origin-left bg-border"
      />
      <span aria-hidden="true" className="absolute top-0 left-0 h-1 w-12 bg-primary" />

      <p
        data-row-fade
        className="display col-span-4 text-display-l text-primary md:col-span-2 lg:col-span-2"
      >
        <span className="sr-only">Étape </span>
        {number}
      </p>
      <div className="col-span-4 flex flex-col gap-8 md:col-span-6 lg:col-span-9 lg:col-start-4">
        <h3 className="display text-display-l">
          <MaskedLine>{title}</MaskedLine>
        </h3>
        {children}
      </div>
    </li>
  )
}
