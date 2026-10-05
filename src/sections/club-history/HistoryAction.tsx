import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/ui/link'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/types'

/** Lien discret vers la page du club. */
export function HistoryAction({ action, className }: { action: NavItem; className?: string }) {
  return (
    <div data-history-outro className={cn('flex', className)}>
      <Button asChild variant="text">
        <AppLink href={action.href} arrow>
          {action.label}
        </AppLink>
      </Button>
    </div>
  )
}
