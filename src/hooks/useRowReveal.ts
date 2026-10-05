import { useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, revealTrigger, useGSAP } from '@/lib/gsap'
import { DISTANCE, DURATION, EASE, STAGGER } from '@/lib/motion'

/**
 * Reveal d'une ligne éditoriale (numéro, filet, titre, texte), joué une fois à son entrée
 * dans l'écran. Les éléments à animer sont marqués dans le balisage :
 *   `data-row-rule`  filet qui se trace
 *   `data-row-line`  ligne de titre qui monte derrière un masque
 *   `data-row-fade`  texte qui arrive en fondu, avec une légère translation
 * Reduced motion : simple fondu, aucun déplacement.
 */
export function useRowReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const row = ref.current
      if (!row) return
      const scrollTrigger = revealTrigger(row)
      const pick = (selector: string) => gsap.utils.toArray<HTMLElement>(selector, row)
      const rules = pick('[data-row-rule]')
      const lines = pick('[data-row-line]')
      const fades = pick('[data-row-fade]')

      if (reducedMotion) {
        gsap.from([...rules, ...lines, ...fades], {
          opacity: 0,
          duration: DURATION.fast,
          ease: EASE.outSoft,
          scrollTrigger,
        })
        return
      }

      const timeline = gsap.timeline({ defaults: { ease: EASE.out }, scrollTrigger })
      if (rules.length) {
        timeline.from(rules, { scaleX: 0, duration: DURATION.slow, ease: EASE.inOut }, 0)
      }
      if (lines.length) {
        timeline.from(
          lines,
          { yPercent: 110, duration: DURATION.slow, stagger: STAGGER.tight },
          STAGGER.normal,
        )
      }
      if (fades.length) {
        timeline.from(
          fades,
          { opacity: 0, y: DISTANCE.sm, duration: DURATION.normal, stagger: STAGGER.tight },
          STAGGER.normal * 2,
        )
      }
    },
    { scope: ref, dependencies: [reducedMotion], revertOnUpdate: true },
  )

  return ref
}
