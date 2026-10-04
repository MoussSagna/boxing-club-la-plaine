import type { ComponentProps, ReactNode } from 'react'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { SectionTitle } from '@/components/SectionTitle'
import { cn } from '@/lib/utils'

type SectionHeaderProps = Omit<ComponentProps<'div'>, 'title'> & {
  eyebrow?: ReactNode
  title: ReactNode
  /** Niveau sémantique du titre. */
  as?: ComponentProps<typeof SectionTitle>['as']
  size?: ComponentProps<typeof SectionTitle>['size']
  description?: ReactNode
  /** Actions sous le texte (boutons, liens). */
  children?: ReactNode
}

/** En-tête de section : sur-titre, titre display, texte d'introduction, actions. */
export function SectionHeader({
  eyebrow,
  title,
  as,
  size,
  description,
  children,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col items-start gap-6', className)} {...props}>
      {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
      <SectionTitle as={as} size={size}>
        {title}
      </SectionTitle>
      {description && <p className="max-w-prose text-muted-foreground">{description}</p>}
      {children}
    </div>
  )
}
