import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const iconButtonVariants = cva(
  [
    'inline-flex shrink-0 cursor-pointer items-center justify-center',
    'transition-[color,background-color,border-color,translate] duration-200 ease-out-quart',
    'active:translate-y-px',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:size-5 [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        secondary:
          'border border-foreground text-foreground hover:bg-foreground hover:text-background',
        ghost: 'text-foreground hover:text-background hover:bg-foreground',
      },
      // 44px minimum : taille de cible tactile.
      size: {
        sm: 'size-11',
        md: 'size-13',
      },
      shape: {
        square: '',
        round: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'sm',
      shape: 'square',
    },
  },
)

type IconButtonProps = Omit<ComponentProps<'button'>, 'aria-label'> &
  VariantProps<typeof iconButtonVariants> & {
    /** Obligatoire : un bouton sans texte doit être nommé pour les lecteurs d'écran. */
    'aria-label': string
  }

/** Bouton icône seule. L'icône enfant doit porter `aria-hidden`. */
export function IconButton({
  className,
  variant,
  size,
  shape,
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      data-slot="icon-button"
      type={type}
      className={cn(iconButtonVariants({ variant, size, shape }), className)}
      {...props}
    />
  )
}
