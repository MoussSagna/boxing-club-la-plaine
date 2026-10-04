import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

/**
 * Sur-titre de section : petit label uppercase précédé d'un trait rouge.
 * Le texte est rouge sur fond crème, crème sur fond noir (contraste AA).
 */
export function SectionEyebrow({ className, children, ...props }: ComponentProps<'p'>) {
  return (
    <p className={cn('label flex items-center gap-3 text-accent-text', className)} {...props}>
      <span aria-hidden="true" className="h-px w-8 bg-primary" />
      {children}
    </p>
  )
}
