import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const SPACING = {
  none: '',
  small: 'py-12 lg:py-16',
  medium: 'py-16 lg:py-24',
  large: 'py-20 lg:py-32 2xl:py-40',
} as const

type SectionProps = ComponentProps<'section'> & {
  /** `dark` : fond noir, texte crème. `cream` : fond crème, texte noir. */
  theme?: 'dark' | 'cream'
  /** Respiration verticale. */
  spacing?: keyof typeof SPACING
  /** `false` pour un contenu pleine largeur (image bord à bord). */
  contained?: boolean
}

/**
 * Bloc de page. Pose le thème (tous les tokens sémantiques en découlent),
 * l'espacement vertical et le container.
 */
export function Section({
  theme = 'dark',
  spacing = 'medium',
  contained = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section data-theme={theme} className={cn(SPACING[spacing], className)} {...props}>
      {contained ? <div className="container-site">{children}</div> : children}
    </section>
  )
}
