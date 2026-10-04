import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

/**
 * Sur-titre de section : petit label uppercase précédé d'un trait rouge.
 * Le trait est toujours rouge. Le texte est crème sur fond noir (le rouge
 * n'y a pas un contraste suffisant en petit corps) et rouge sur fond crème.
 */
export function SectionEyebrow({ className, children, ...props }: ComponentProps<'p'>) {
  return (
    <p className={cn('label flex items-center gap-3 text-accent-text', className)} {...props}>
      <span aria-hidden="true" className="h-0.5 w-8 shrink-0 bg-primary" />
      {children}
    </p>
  )
}
