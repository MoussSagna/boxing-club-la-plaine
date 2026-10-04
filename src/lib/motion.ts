/*
 * Tokens d'animation — référence : docs/05-animation-system.md
 */

export const EASE = {
  out: 'power3.out',
  outSoft: 'power2.out',
  outStrong: 'power4.out',
  expo: 'expo.out',
  inOut: 'power2.inOut',
} as const

/** Durées en secondes. */
export const DURATION = {
  /** Micro interaction : 0.2–0.4s */
  micro: 0.3,
  /** Reveal : 0.6–1s */
  reveal: 0.8,
  /** Image : 0.8–1.4s */
  image: 1.2,
  /** Transition de page : 0.6–1.2s */
  page: 0.6,
} as const

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
