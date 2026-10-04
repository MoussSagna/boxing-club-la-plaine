import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const SIZES = {
  xl: 'text-display-xl',
  l: 'text-display-l',
  m: 'text-display-m',
  heading: 'text-heading',
} as const

type SectionTitleProps = ComponentProps<'h2'> & {
  /** Niveau sémantique, indépendant de la taille visuelle. */
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  size?: keyof typeof SIZES
}

/**
 * Titre display (Anton, uppercase). Une ligne par `<br />`,
 * la ligne accentuée dans `<Accent>`.
 */
export function SectionTitle({
  as: Tag = 'h2',
  size = 'l',
  className,
  ...props
}: SectionTitleProps) {
  return <Tag className={cn('display', SIZES[size], className)} {...props} />
}

/** Accent rouge dans un titre display. Réservé au grand texte (contraste). */
export function Accent({ className, ...props }: ComponentProps<'span'>) {
  return <span className={cn('text-primary', className)} {...props} />
}
