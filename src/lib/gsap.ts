import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/*
 * Point d'entrée unique de GSAP : les plugins sont enregistrés une seule fois ici.
 * Toujours importer gsap / ScrollTrigger / useGSAP depuis `@/lib/gsap`.
 *
 * useGSAP crée un gsap.context() et le revert au démontage : toute animation
 * ou ScrollTrigger créé dans son callback est nettoyé automatiquement
 * (y compris lors du double montage de React StrictMode).
 */
gsap.registerPlugin(useGSAP, ScrollTrigger)

// Évite les recalculs quand la barre d'adresse mobile apparaît ou disparaît.
ScrollTrigger.config({ ignoreMobileResize: true })

/**
 * Recalcule les positions de déclenchement sans déplacer la page.
 * `ScrollTrigger.refresh()` replace le défilement sur la dernière valeur qu'il a mémorisée ;
 * après un changement de route, cette valeur est celle de l'ancienne page et annulerait
 * la position restaurée par le routeur (précédent / suivant).
 */
function refreshScrollTriggers() {
  const { scrollX, scrollY } = window
  ScrollTrigger.refresh()
  if (window.scrollY !== scrollY) window.scrollTo(scrollX, scrollY)
}

// Les polices arrivent après le premier rendu (font-display: swap) et changent
// la hauteur des titres : on recalcule alors les positions de déclenchement.
if (typeof document !== 'undefined') {
  void document.fonts?.ready.then(refreshScrollTriggers)
}

export { gsap, refreshScrollTriggers, ScrollTrigger, useGSAP }
