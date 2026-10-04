import { useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { DURATION, EASE } from '@/lib/motion'

/**
 * Transition d'entrée jouée à chaque changement de route.
 * Fondation Sprint 0 : fade + léger décalage. La transition finale
 * (rideau, sortie de page) sera affinée au Sprint 11.
 * Reduced motion : fade court uniquement.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y: reducedMotion ? 0 : 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: reducedMotion ? DURATION.micro : DURATION.page,
          ease: EASE.out,
          // Le transform résiduel fausserait les mesures ScrollTrigger des sections.
          clearProps: 'transform',
          onComplete: () => ScrollTrigger.refresh(),
        },
      )
    },
    { dependencies: [pathname, reducedMotion] },
  )

  return <div ref={ref}>{children}</div>
}
