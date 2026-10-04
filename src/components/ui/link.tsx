import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { ComponentProps } from 'react'
import { Link, NavLink } from 'react-router'
import { cn } from '@/lib/utils'

/*
 * Système de liens — docs/04-design-system.md
 *   variant="plain"  → aucun style : à combiner avec <Button asChild> pour les CTA
 *   variant="nav"    → navigation : label uppercase, trait rouge au survol et sur la page active
 *   variant="nav-large" → grands liens du menu mobile : rouge sur la page active
 *   variant="inline" → lien éditorial dans un texte : souligné rouge
 * `arrow` ajoute la flèche → (↗ pour un lien externe).
 */
const VARIANTS = {
  plain: '',
  nav: [
    'label relative inline-block py-3',
    'after:absolute after:inset-x-0 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary',
    'after:transition-transform after:duration-300 after:ease-out-quart',
    'hover:after:scale-x-100 aria-[current=page]:after:scale-x-100',
  ],
  // Grand texte display : le rouge y a un contraste suffisant, même sur noir.
  'nav-large': 'transition-colors duration-200 aria-[current=page]:text-primary',
  inline: [
    'underline decoration-primary decoration-2 underline-offset-4',
    'transition-colors duration-200 hover:decoration-foreground',
  ],
} as const

type AppLinkProps = Omit<ComponentProps<'a'>, 'href'> & {
  href: string
  variant?: keyof typeof VARIANTS
  arrow?: boolean
}

const EXTERNAL = /^https?:\/\//
const INTERNAL = /^\//

export function AppLink({
  href,
  variant = 'plain',
  arrow = false,
  className,
  children,
  ...props
}: AppLinkProps) {
  const isExternal = EXTERNAL.test(href)
  const Arrow = isExternal ? ArrowUpRight : ArrowRight
  const classes = cn(
    arrow && variant !== 'plain' && 'inline-flex items-center gap-2 [&_svg]:size-4',
    VARIANTS[variant],
    className,
  )
  const content = (
    <>
      {children}
      {arrow && <Arrow aria-hidden="true" />}
      {isExternal && <span className="sr-only"> (nouvelle fenêtre)</span>}
    </>
  )

  if (INTERNAL.test(href)) {
    // NavLink pose aria-current="page" sur la route active.
    const RouterLink = variant === 'nav' || variant === 'nav-large' ? NavLink : Link
    return (
      <RouterLink to={href} className={classes} {...props}>
        {content}
      </RouterLink>
    )
  }

  return (
    <a
      href={href}
      className={classes}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {content}
    </a>
  )
}
