import { cn } from '@/lib/utils'

const INTENSITY = {
  subtle: 'opacity-6',
  medium: 'opacity-12',
  strong: 'opacity-20',
} as const

type GrainOverlayProps = {
  /** `subtle` pour le calque global ; `medium` / `strong` pour une image. */
  intensity?: keyof typeof INTENSITY
  /** `fixed` : tout le viewport. `absolute` : le parent positionné (image, section). */
  position?: 'fixed' | 'absolute'
  disabled?: boolean
  className?: string
}

/**
 * Grain argentique : calque statique (aucune animation permanente),
 * purement décoratif et transparent aux interactions.
 * La texture est un SVG inline de quelques centaines d'octets (--texture-grain).
 */
export function GrainOverlay({
  intensity = 'subtle',
  position = 'fixed',
  disabled = false,
  className,
}: GrainOverlayProps) {
  if (disabled) return null

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none inset-0 bg-(image:--texture-grain)',
        position === 'fixed' ? 'fixed z-50' : 'absolute',
        INTENSITY[intensity],
        className,
      )}
    />
  )
}
