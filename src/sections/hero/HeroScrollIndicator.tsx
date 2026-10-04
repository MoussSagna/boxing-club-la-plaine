import { cn } from '@/lib/utils'

/**
 * Indicateur de scroll, décoratif. Le trait ne s'anime que lorsque le hero est à l'écran
 * (classe `animate-scroll-line` posée par le Hero) ; en reduced motion il reste statique.
 */
export function HeroScrollIndicator({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-hero-detail
      className={cn('micro flex items-center gap-3 text-muted-foreground', className)}
    >
      <span className="block h-10 w-px bg-border">
        <span data-hero-scroll-line className="block size-full bg-foreground" />
      </span>
      Scroll
    </div>
  )
}
