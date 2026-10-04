import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/*
 * Point d'entrée unique de GSAP : les plugins sont enregistrés une seule fois ici.
 * Toujours importer gsap / ScrollTrigger / useGSAP depuis `@/lib/gsap`.
 *
 * useGSAP crée un gsap.context() et le revert au démontage : toute animation
 * ou ScrollTrigger créé dans son callback est nettoyé automatiquement.
 */
gsap.registerPlugin(useGSAP, ScrollTrigger)

export { gsap, ScrollTrigger, useGSAP }
