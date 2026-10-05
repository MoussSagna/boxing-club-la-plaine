import type { ReactNode } from 'react'

/** Une ligne de titre derrière son masque, pour le reveal vertical (`data-row-line`). */
export function MaskedLine({ children }: { children: ReactNode }) {
  return (
    // Le padding laisse la place aux accents des capitales (« É », « È »).
    <span className="-my-[0.18em] block overflow-hidden py-[0.18em]">
      <span data-row-line className="block">
        {children}{' '}
      </span>
    </span>
  )
}
