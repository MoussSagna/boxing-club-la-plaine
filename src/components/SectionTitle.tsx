import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const SIZES = {
  xl: 'text-display-xl',
  l: 'text-display-l',
  m: 'text-display-m',
} as const

type SectionTitleProps = ComponentProps<'h2'> & {
  /** Niveau sémantique, indépendant de la taille visuelle. */
  as?: 'h1' | 'h2' | 'h3'
  size?: keyof typeof SIZES
}

/**
 * Titre display (Anton, uppercase).
 * Accent rouge : `<span className="text-primary">…</span>` dans les enfants.
 */
export function SectionTitle({
  as: Tag = 'h2',
  size = 'l',
  className,
  ...props
}: SectionTitleProps) {
  return <Tag className={cn('display', SIZES[size], className)} {...props} />
}
