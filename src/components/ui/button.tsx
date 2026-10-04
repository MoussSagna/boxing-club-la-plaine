import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex shrink-0 cursor-pointer items-center justify-center gap-3 whitespace-nowrap',
    'font-sans font-semibold uppercase tracking-[0.14em]',
    'transition-colors duration-300 ease-out-quart',
    'disabled:pointer-events-none disabled:opacity-50',
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
        link: 'border-b border-primary text-foreground hover:border-foreground',
      },
      size: {
        sm: 'h-11 px-5 text-xs',
        md: 'h-13 px-7 text-xs',
        lg: 'h-15 px-9 text-sm',
      },
    },
    compoundVariants: [{ variant: 'link', class: 'h-auto px-0 pb-2' }],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    /** Rend l'enfant (ex. un `<Link>`) avec le style du bouton. */
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
