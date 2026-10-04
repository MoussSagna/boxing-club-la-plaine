import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

/*
 * Système de boutons — docs/04-design-system.md
 *   variant="primary"   → PrimaryButton   : fond rouge, texte clair, hover sombre
 *   variant="secondary" → SecondaryButton : bordure, fond transparent, hover inversé
 *   variant="text"      → TextButton      : texte + flèche, soulignement rouge
 * Les boutons icône seule passent par `IconButton`.
 */
const buttonVariants = cva(
  [
    'inline-flex shrink-0 cursor-pointer items-center justify-center gap-3 whitespace-nowrap',
    'font-sans font-semibold uppercase tracking-label',
    'transition-[color,background-color,border-color,translate] duration-200 ease-out-quart',
    'active:translate-y-px',
    'disabled:pointer-events-none disabled:opacity-50',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50',
    // Icône (flèche) : glisse légèrement au survol.
    '[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-out-quart',
    'hover:[&_svg]:translate-x-1',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        secondary:
          'border border-foreground text-foreground hover:bg-foreground hover:text-background',
        text: 'border-b border-primary text-foreground hover:border-foreground',
      },
      size: {
        sm: 'h-11 px-5 text-xs',
        md: 'h-13 px-7 text-xs',
        lg: 'h-15 px-9 text-sm',
      },
    },
    compoundVariants: [{ variant: 'text', class: 'h-auto min-h-11 px-0 pt-3 pb-2' }],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    /** Rend l'enfant (ex. un `<AppLink>`) avec le style du bouton. */
    asChild?: boolean
  }

export function Button({
  className,
  variant,
  size,
  asChild = false,
  type = 'button',
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className)

  if (asChild) return <Slot data-slot="button" className={classes} {...props} />

  return <button data-slot="button" type={type} className={classes} {...props} />
}
