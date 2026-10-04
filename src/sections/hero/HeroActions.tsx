import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/ui/link'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/types'

type HeroActionsProps = {
  primary: NavItem
  secondary?: NavItem
  className?: string
}

/** CTA du hero : un bouton principal, un lien secondaire discret. */
export function HeroActions({ primary, secondary, className }: HeroActionsProps) {
  return (
    <div data-hero-actions className={cn('flex flex-col items-start gap-3', className)}>
      <Button asChild size="lg" className="w-full sm:w-auto">
        <AppLink href={primary.href} arrow>
          {primary.label}
        </AppLink>
      </Button>
      {secondary && (
        <Button asChild variant="text">
          <AppLink href={secondary.href} arrow>
            {secondary.label}
          </AppLink>
        </Button>
      )}
    </div>
  )
}
