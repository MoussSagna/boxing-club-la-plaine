import { useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, useGSAP } from '@/lib/gsap'
import { DURATION, EASE } from '@/lib/motion'

type ScrollRevealOptions = {
  /** Sélecteur d'enfants à révéler (en cascade). Par défaut : l'élément lui-même. */
  selector?: string
  /** Décalage vertical de départ, en px. */
  y?: number
  duration?: number
  delay?: number
  stagger?: number
  /** Position ScrollTrigger de déclenchement. */
  start?: string
}

/**
 * Révèle un élément (ou ses enfants) à l'entrée dans le viewport.
 * Reduced motion : simple fade, sans déplacement.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  selector,
  y = 40,
  duration = DURATION.reveal,
  delay = 0,
  stagger = 0.08,
  start = 'top 85%',
}: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const element = ref.current
      if (!element) return

      const targets = selector ? gsap.utils.toArray<HTMLElement>(selector, element) : element

      gsap.from(targets, {
        autoAlpha: 0,
        y: reducedMotion ? 0 : y,
        duration: reducedMotion ? DURATION.micro : duration,
        delay,
        stagger: reducedMotion ? 0 : stagger,
        ease: EASE.out,
        scrollTrigger: { trigger: element, start, once: true },
      })
    },
    { dependencies: [reducedMotion], revertOnUpdate: true },
  )

  return ref
}
