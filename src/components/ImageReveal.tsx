import { useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, useGSAP } from '@/lib/gsap'
import { DURATION, EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

type ImageRevealProps = {
  src: string
  /** Alt vide (`""`) pour une image purement décorative. */
  alt: string
  width?: number
  height?: number
  /** Classes du cadre : y définir le ratio (ex. `aspect-4/5`). */
  className?: string
  /** `eager` pour une image au-dessus de la ligne de flottaison. */
  loading?: 'lazy' | 'eager'
}

/**
 * Image révélée par clip-path à l'entrée dans le viewport, avec léger dézoom.
 * Reduced motion : simple fade.
 */
export function ImageReveal({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
}: ImageRevealProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const frame = frameRef.current
      if (!frame) return

      const scrollTrigger = { trigger: frame, start: 'top 85%', once: true }

      if (reducedMotion) {
        gsap.from(frame, { autoAlpha: 0, duration: DURATION.micro, scrollTrigger })
        return
      }

      gsap
        .timeline({ defaults: { duration: DURATION.image, ease: EASE.outStrong }, scrollTrigger })
        .fromTo(frame, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)' })
        .from(imageRef.current, { scale: 1.2 }, 0)
    },
    { dependencies: [reducedMotion], revertOnUpdate: true },
  )

  return (
    <div ref={frameRef} className={cn('overflow-hidden', className)}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        className="size-full object-cover"
      />
    </div>
  )
}
