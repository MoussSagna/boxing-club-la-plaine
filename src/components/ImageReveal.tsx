import { useRef } from 'react'
import { MediaFrame, type MediaFrameProps } from '@/components/MediaFrame'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, revealTrigger, useGSAP } from '@/lib/gsap'
import { DURATION, EASE } from '@/lib/motion'

type ImageRevealProps = Omit<MediaFrameProps, 'ref' | 'imageRef'> & {
  /**
   * `clip` : dévoilement par clip-path + léger dézoom.
   * `fade` : fondu simple. `none` : image statique.
   */
  reveal?: 'clip' | 'fade' | 'none'
}

/**
 * Image révélée à l'entrée dans le viewport.
 * Reduced motion : `clip` est remplacé par un fondu court.
 */
export function ImageReveal({ reveal = 'clip', ...props }: ImageRevealProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const frame = frameRef.current
      if (!frame || reveal === 'none') return

      const scrollTrigger = revealTrigger(frame)

      if (reveal === 'fade' || reducedMotion) {
        gsap.from(frame, {
          autoAlpha: 0,
          duration: reducedMotion ? DURATION.fast : DURATION.slow,
          ease: EASE.outSoft,
          scrollTrigger,
        })
        return
      }

      gsap
        .timeline({ defaults: { duration: DURATION.slower, ease: EASE.outStrong }, scrollTrigger })
        .fromTo(frame, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)' })
        .from(imageRef.current, { scale: 1.2 }, 0)
    },
    { dependencies: [reducedMotion, reveal], revertOnUpdate: true },
  )

  return <MediaFrame ref={frameRef} imageRef={imageRef} {...props} />
}
