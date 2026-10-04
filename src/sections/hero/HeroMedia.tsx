import type { CSSProperties } from 'react'
import { MediaFrame, type MediaSource, type MediaTreatment } from '@/components/MediaFrame'
import { cn } from '@/lib/utils'

type FocalPoint = { x: number; y: number }

type HeroMediaProps = {
  /** Image de repli (JPEG). */
  src: string
  srcSet?: string
  sizes?: string
  /** Formats modernes (AVIF, WebP). */
  sources?: MediaSource[]
  width?: number
  height?: number
  /** Décrire la photographie ; vide (`""`) pour un visuel décoratif ou un placeholder. */
  alt: string
  /** Point d'intérêt de l'image, en % : il reste dans le cadre quel que soit le recadrage. */
  focalPoint?: FocalPoint
  /** Point d'intérêt sous 1024px, où le cadre est plus étroit. Par défaut : `focalPoint`. */
  focalPointMobile?: FocalPoint
  treatment?: MediaTreatment
  /**
   * Voile sombre garantissant la lisibilité du titre et du header transparent.
   * `soft` : photographie déjà sombre. `strong` : photographie claire ou chargée.
   */
  overlay?: 'none' | 'soft' | 'strong'
  grain?: boolean
  vignette?: boolean
  className?: string
}

/*
 * Trois couches par voile : un fond uniforme (assombrit toute l'image sans l'écraser),
 * un dégradé sous le titre, un dégradé sous le header transparent.
 * Sous 1024px, l'image n'occupe que le haut du hero : son bord bas se fond dans le noir.
 */
const OVERLAYS = {
  none: null,
  soft: {
    veil: 'bg-black/20',
    bottom: 'from-black via-black/40 via-40% to-transparent lg:from-black/80',
    top: 'from-black/50 to-transparent',
  },
  strong: {
    veil: 'bg-black/35',
    // Plein cadre (≥ 1024px) : presque noir sous la dernière ligne du titre — le rouge y exige
    // un fond très sombre —, puis le voile se dissipe vite pour laisser la scène intacte.
    bottom:
      'from-black via-black/55 via-45% to-transparent lg:from-black/95 lg:via-black/94 lg:via-42% lg:to-66%',
    top: 'from-black/65 to-transparent',
  },
} as const

const toPosition = ({ x, y }: FocalPoint) => `${x}% ${y}%`

/**
 * Image du hero. La photographie se remplace par ses seules props
 * (sources, alt, point focal, traitement, voile) sans toucher à la composition.
 */
export function HeroMedia({
  focalPoint = { x: 50, y: 50 },
  focalPointMobile = focalPoint,
  overlay = 'strong',
  className,
  ...media
}: HeroMediaProps) {
  const scrim = OVERLAYS[overlay]

  return (
    <div data-hero-media className={cn('absolute inset-0 -z-10', className)}>
      <MediaFrame
        {...media}
        priority
        className="size-full"
        style={
          {
            '--focal': toPosition(focalPoint),
            '--focal-mobile': toPosition(focalPointMobile),
          } as CSSProperties
        }
        imageClassName="object-(--focal-mobile) lg:object-(--focal)"
      >
        {scrim && (
          <>
            <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0', scrim.veil)} />
            {/* Sous le titre et les actions. */}
            <div
              aria-hidden="true"
              className={cn('pointer-events-none absolute inset-0 bg-linear-to-t', scrim.bottom)}
            />
            {/* Sous le header transparent. */}
            <div
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b',
                scrim.top,
              )}
            />
          </>
        )}
      </MediaFrame>
    </div>
  )
}
