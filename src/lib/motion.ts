/*
 * Tokens d'animation — référence : docs/05-animation-system.md
 * Toute animation GSAP pioche ses valeurs ici : pas de durée, d'ease
 * ou de distance arbitraire dans les composants.
 */

/** Durées en secondes. */
export const DURATION = {
  /** Micro interaction, fade de repli (reduced motion). */
  fast: 0.3,
  /** Transition de page, apparition simple. */
  normal: 0.6,
  /** Reveal de texte ou de bloc au scroll. */
  slow: 0.9,
  /** Reveal d'image (clip-path, dézoom). */
  slower: 1.2,
} as const

export const EASE = {
  /** Ease par défaut des entrées. */
  out: 'power3.out',
  /** Entrées discrètes, sorties. */
  outSoft: 'power2.out',
  /** Entrées appuyées : images, rideaux. */
  outStrong: 'power4.out',
  /** Grands mouvements cinématiques. */
  expo: 'expo.out',
  /** Mouvements aller-retour, transitions symétriques. */
  inOut: 'power2.inOut',
  /** Animations liées au scroll (scrub). */
  none: 'none',
} as const

/** Distances de déplacement en px. */
export const DISTANCE = {
  sm: 12,
  md: 24,
  lg: 40,
} as const

/** Décalage entre éléments d'une cascade, en secondes. */
export const STAGGER = {
  tight: 0.06,
  normal: 0.1,
} as const

/** Position ScrollTrigger par défaut pour déclencher un reveal. */
export const SCROLL_START = 'top 85%'

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
