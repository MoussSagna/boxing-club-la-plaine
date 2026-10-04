import { useSyncExternalStore } from 'react'
import { REDUCED_MOTION_QUERY } from '@/lib/motion'

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

function getSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

/** `true` lorsque l'utilisateur a activé `prefers-reduced-motion`. Réactif. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
