import { CTA_NAV, ROUTES } from '@/data/navigation'
import { SITE } from '@/data/site'
import type { HeroContent } from '@/types'

const HERO_IMAGE = '/assets/images/hero/hero'

/*
 * Contenu de la homepage.
 * Seules des données validées figurent ici ; tout élément provisoire est marqué PROVISOIRE.
 */
export const HOME_HERO: HeroContent = {
  // VALIDÉ — nom officiel du club, découpé pour la composition du titre.
  title: {
    lead: ['Boxing', 'Club'],
    connector: ['de', 'la'],
    accent: 'Plaine',
  },
  // PROVISOIRE — mentions purement fonctionnelles (lieu + nature du club), pas un slogan.
  // À remplacer par l'accroche validée par le club.
  meta: [SITE.location, 'Club de boxe'],
  primaryCta: CTA_NAV,
  secondaryCta: { label: 'Découvrir le club', href: ROUTES.club },
  // VALIDÉ — photographie fournie par le club, utilisée telle quelle.
  // Seuls le format et les dimensions des fichiers changent (AVIF + JPEG, 3 largeurs) ;
  // l'assombrissement vient du voile CSS, pas d'une retouche de l'image.
  media: {
    src: `${HERO_IMAGE}-1838.jpg`,
    srcSet: `${HERO_IMAGE}-960.jpg 960w, ${HERO_IMAGE}-1400.jpg 1400w, ${HERO_IMAGE}-1838.jpg 1838w`,
    sources: [
      {
        type: 'image/avif',
        srcSet: `${HERO_IMAGE}-960.avif 960w, ${HERO_IMAGE}-1400.avif 1400w, ${HERO_IMAGE}-1838.avif 1838w`,
      },
    ],
    // Largeur réellement affichée : l'image couvre le cadre, recadrée dans sa largeur.
    // Sous 1024px : bandeau de 56 % de la hauteur d'écran ; au-delà : tout le hero.
    sizes: '(min-width: 64rem) max(100vw, 215vh), max(100vw, 121vh)',
    width: 1838,
    height: 856,
    alt: 'Séance d’entraînement : un boxeur de dos au premier plan, d’autres travaillent en binômes dans la salle.',
    // Desktop : boxeur du premier plan à gauche, groupe au centre, profondeur de la salle.
    focalPoint: { x: 35, y: 30 },
    // Mobile et tablet : le cadre est plus étroit ; on garde le boxeur du premier plan et le binôme central.
    focalPointMobile: { x: 39, y: 30 },
    treatment: 'none',
    overlay: 'strong',
    // Le grain global du site (GrainOverlay) suffit : pas de seconde couche sur la photo.
    grain: false,
  },
}
