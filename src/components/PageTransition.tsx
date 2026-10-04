import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Accent } from '@/components/SectionTitle'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, refreshScrollTriggers } from '@/lib/gsap'
import { DISTANCE, DURATION, EASE, STAGGER } from '@/lib/motion'

/** Si la nouvelle page n'arrive pas (réseau), le rideau se lève quand même. */
const SAFETY_DELAY = 6

const COVERED = 'inset(0% 0% 0% 0%)'
const BELOW = 'inset(100% 0% 0% 0%)'
const ABOVE = 'inset(0% 0% 100% 0%)'

/** Lien interne suivi par un clic simple, vers une autre page que la page courante. */
function getInternalTarget(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0) return null
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null

  const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href]')
  if (!anchor || anchor.hasAttribute('download')) return null
  if (anchor.target && anchor.target !== '_self') return null
  if (anchor.origin !== window.location.origin) return null
  if (anchor.pathname === window.location.pathname) return null

  return { anchor, to: anchor.pathname + anchor.search + anchor.hash }
}

/**
 * Transition de page « rideau » : un écran noir portant le nom du club monte,
 * la page change dessous, puis le rideau s'efface vers le haut (0,9s au total).
 *
 * - Clic sur un lien interne : rideau → changement de route → levée du rideau.
 * - Précédent / suivant du navigateur : la route change tout de suite (on ne retarde
 *   jamais l'historique), le rideau est posé d'un coup puis levé.
 * - Lien du menu mobile : le rideau est posé d'un coup sous le menu noir, sans rupture.
 * - Chargement direct, refresh, deep link : pas de rideau, simple fondu.
 * - Reduced motion : pas de rideau, navigation immédiate, fondu court.
 *
 * Le rideau est décoratif (`aria-hidden`, sans capture de pointeur) : il ne bloque
 * ni le clavier, ni le focus, ni le bouton retour.
 *
 * Les tweens vivent aussi longtemps que l'application : ils sont gérés à la main
 * (kill explicite) plutôt que par useGSAP, dont le contexte les accumulerait.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()

  const previousPathname = useRef<string | null>(null)
  const busy = useRef(false)
  const animation = useRef<gsap.core.Animation | null>(null)
  const safety = useRef<gsap.core.Tween | null>(null)

  // Entrée de la nouvelle page, à chaque changement de route.
  useLayoutEffect(() => {
    const content = contentRef.current
    const curtain = curtainRef.current
    if (!content || !curtain) return

    const isFirstRender = previousPathname.current === null
    if (previousPathname.current === pathname) return
    previousPathname.current = pathname

    animation.current?.kill()
    safety.current?.kill()

    const done = () => {
      busy.current = false
      refreshScrollTriggers()
    }

    if (isFirstRender || reducedMotion) {
      gsap.set(curtain, { autoAlpha: 0 })
      animation.current = gsap.fromTo(
        content,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: DURATION.fast, ease: EASE.outSoft, onComplete: done },
      )
      return
    }

    const lines = curtain.querySelectorAll('[data-curtain-line]')

    // Le rideau est déjà en place après un clic ; pour précédent / suivant, on le pose d'un coup.
    gsap.set(curtain, { autoAlpha: 1, clipPath: COVERED })
    gsap.set(lines, { yPercent: 0 })
    gsap.set(content, { autoAlpha: 1 })

    animation.current = gsap
      .timeline({ onComplete: done })
      .to(lines, { yPercent: -110, duration: DURATION.fast, ease: EASE.inOut, stagger: STAGGER.tight })
      .to(curtain, { clipPath: ABOVE, duration: DURATION.normal, ease: EASE.inOut }, 0)
      .fromTo(
        content,
        { y: DISTANCE.lg },
        // Le transform résiduel fausserait les mesures ScrollTrigger des sections.
        { y: 0, duration: DURATION.normal, ease: EASE.out, clearProps: 'transform' },
        0,
      )
      .set(curtain, { autoAlpha: 0 })
  }, [pathname, reducedMotion])

  // Sortie de la page courante : interception des clics sur les liens internes.
  useEffect(() => {
    if (reducedMotion) return

    const onClick = (event: MouseEvent) => {
      const target = getInternalTarget(event)
      const curtain = curtainRef.current
      if (!target || !curtain) return

      // On prend la main sur le routeur : il naviguera une fois le rideau en place.
      event.preventDefault()
      if (busy.current) return
      busy.current = true

      const lines = curtain.querySelectorAll('[data-curtain-line]')
      const go = () => {
        void navigate(target.to)
        safety.current = gsap.delayedCall(SAFETY_DELAY, () => {
          busy.current = false
          gsap.to(curtain, { autoAlpha: 0, duration: DURATION.fast })
        })
      }

      animation.current?.kill()

      if (target.anchor.closest('dialog')) {
        gsap.set(curtain, { autoAlpha: 1, clipPath: COVERED })
        gsap.set(lines, { yPercent: 0 })
        go()
        return
      }

      animation.current = gsap
        .timeline({ onComplete: go })
        .set(curtain, { autoAlpha: 1 })
        .fromTo(
          curtain,
          { clipPath: BELOW },
          { clipPath: COVERED, duration: DURATION.fast, ease: EASE.inOut },
        )
        .fromTo(
          lines,
          { yPercent: 110 },
          { yPercent: 0, duration: DURATION.fast, ease: EASE.out, stagger: STAGGER.tight },
          0,
        )
    }

    // Phase de capture : avant le gestionnaire de clic des liens du routeur.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [navigate, reducedMotion])

  // Démontage (y compris le double montage de React StrictMode) : on arrête tout
  // et on repart d'un état neuf, pour que l'entrée soit rejouée en entier.
  useLayoutEffect(
    () => () => {
      animation.current?.kill()
      safety.current?.kill()
      previousPathname.current = null
      busy.current = false
    },
    [],
  )

  return (
    <>
      <div ref={contentRef}>{children}</div>
      <div
        ref={curtainRef}
        aria-hidden="true"
        data-theme="dark"
        data-page-curtain
        className="pointer-events-none invisible fixed inset-0 z-60 flex items-center justify-center"
      >
        <p className="display text-center text-display-l">
          <span className="block overflow-hidden">
            <span className="block" data-curtain-line>
              Boxing Club
            </span>
          </span>
          <span className="block overflow-hidden">
            <Accent className="block" data-curtain-line>
              de la Plaine
            </Accent>
          </span>
        </p>
      </div>
    </>
  )
}
