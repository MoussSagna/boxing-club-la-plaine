import { useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, useGSAP } from '@/lib/gsap'
import { EASE } from '@/lib/motion'

type ParallaxOptions = {
  /** Amplitude du déplacement, en % de la hauteur de l'élément. Rester léger. */
  amount?: number
}

/**
 * Parallax vertical léger, lié au scroll (scrub), sur l'élément référencé.
 * Le cadre (`div`) qui contient l'image sert de fenêtre : il doit être en `overflow: hidden`.
 * Reduced motion : aucun mouvement.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>({
  amount = 8,
}: ParallaxOptions = {}) {
  const ref = useRef<T>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const element = ref.current
      if (!element || reducedMotion) return

      // Le zoom compense le déplacement pour ne jamais découvrir les bords.
      const scale = 1 + (amount * 2) / 100

      gsap.fromTo(
        element,
        { yPercent: -amount, scale },
        {
          yPercent: amount,
          scale,
          ease: EASE.none,
          scrollTrigger: {
            // Le cadre de l'image : son parent direct peut être un <picture> sans boîte.
            trigger: element.closest('div') ?? element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    },
    { dependencies: [reducedMotion, amount], revertOnUpdate: true },
  )

  return ref
}
