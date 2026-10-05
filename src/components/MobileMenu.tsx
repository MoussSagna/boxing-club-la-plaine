import { X } from 'lucide-react'
import { useEffect, useRef, type SyntheticEvent } from 'react'
import { Logo } from '@/components/Logo'
import { Accent } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/ui/link'
import { CTA_NAV, MAIN_NAV, ROUTES, SECONDARY_NAV } from '@/data/navigation'
import { SITE } from '@/data/site'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, useGSAP } from '@/lib/gsap'
import { DISTANCE, DURATION, EASE, STAGGER } from '@/lib/motion'

type MobileMenuProps = {
  id: string
  open: boolean
  onClose: () => void
}

/** La fermeture rejoue la séquence d'ouverture à l'envers, deux fois plus vite. */
const CLOSE_SPEED = 2

/**
 * Menu mobile plein écran.
 * `<dialog>` natif ouvert en modal : piège de focus, touche Échap, fond inerte
 * et retour du focus sur le bouton MENU sont gérés par le navigateur.
 *
 * Séquence d'ouverture (GSAP) : rideau → barre (logo, fermer) → nom du club →
 * liens → CTA → éléments secondaires. Le menu est utilisable dès le premier instant.
 * Reduced motion : simple fondu.
 */
export function MobileMenu({ id, open, onClose }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const reducedMotion = useReducedMotion()

  // La timeline est construite une fois, en pause ; elle est jouée ou inversée ensuite.
  useGSAP(
    () => {
      const dialog = dialogRef.current
      if (!dialog) return

      const timeline = gsap.timeline({
        paused: true,
        // Fin de la fermeture : le navigateur rend alors le focus au bouton MENU.
        onReverseComplete: () => dialog.close(),
      })

      if (reducedMotion) {
        timeline.fromTo(dialog, { opacity: 0 }, { opacity: 1, duration: DURATION.fast })
      } else {
        timeline
          .fromTo(
            dialog,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: DURATION.normal, ease: EASE.inOut },
          )
          // `opacity` et non `autoAlpha` : les éléments restent atteignables au clavier.
          .fromTo('[data-menu-bar]', { opacity: 0 }, { opacity: 1, duration: DURATION.fast }, 0.2)
          .fromTo(
            '[data-menu-line]',
            { yPercent: 110 },
            { yPercent: 0, duration: DURATION.normal, ease: EASE.out, stagger: STAGGER.tight },
            0.25,
          )
          .fromTo(
            '[data-menu-item]',
            { yPercent: 110 },
            { yPercent: 0, duration: DURATION.normal, ease: EASE.out, stagger: STAGGER.tight },
            0.35,
          )
          .fromTo(
            '[data-menu-cta]',
            { opacity: 0, y: DISTANCE.sm },
            { opacity: 1, y: 0, duration: DURATION.fast, ease: EASE.outSoft },
            '-=0.4',
          )
          .fromTo(
            '[data-menu-secondary]',
            { opacity: 0 },
            { opacity: 1, duration: DURATION.fast },
            '-=0.15',
          )
      }

      timelineRef.current = timeline
    },
    { dependencies: [reducedMotion], scope: dialogRef, revertOnUpdate: true },
  )

  useEffect(() => {
    const dialog = dialogRef.current
    const timeline = timelineRef.current
    if (!dialog || !timeline) return

    if (open) {
      if (dialog.open) {
        // Réouverture pendant la fermeture : on repart de la position courante.
        timeline.timeScale(1).play()
      } else {
        dialog.showModal()
        timeline.timeScale(1).restart()
      }
    } else if (dialog.open) {
      timeline.timeScale(CLOSE_SPEED).reverse()
    }
  }, [open, reducedMotion])

  // Échap : on passe par onClose pour jouer l'animation de sortie.
  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault()
    onClose()
  }

  // Clic sur un lien : fermeture immédiate. Le rideau de transition de page (noir lui aussi)
  // prend le relais sans rupture, et le focus peut aller sur le contenu de la nouvelle page.
  function handleNavigate() {
    dialogRef.current?.close()
  }

  return (
    <dialog
      ref={dialogRef}
      id={id}
      aria-label="Menu"
      onCancel={handleCancel}
      onClose={onClose}
      data-theme="dark"
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain backdrop:bg-transparent"
    >
      <div className="container-site flex min-h-full flex-col pb-6">
        <div className="flex h-18 shrink-0 items-center justify-between" data-menu-bar>
          <AppLink
            href={ROUTES.home}
            onClick={handleNavigate}
            aria-label={`${SITE.name} — Accueil`}
            className="rounded-full"
          >
            <Logo className="size-12" />
          </AppLink>
          <button
            type="button"
            onClick={onClose}
            className="label -mr-2 flex h-11 cursor-pointer items-center gap-2 px-2"
          >
            Fermer
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        {/* Nom du club : décoratif ici, le logo porte déjà le nom accessible. */}
        <p aria-hidden="true" className="display mt-4 text-display-m">
          <span className="block overflow-hidden">
            <span className="block" data-menu-line>
              Boxing Club
            </span>
          </span>
          <span className="block overflow-hidden">
            <Accent className="block" data-menu-line>
              de la Plaine
            </Accent>
          </span>
        </p>

        <nav aria-label="Navigation mobile" className="flex flex-1 flex-col justify-center py-4">
          <ul className="border-t border-border">
            {MAIN_NAV.map((item, index) => (
              <li key={item.href} className="border-b border-border">
                <AppLink
                  href={item.href}
                  variant="nav-large"
                  onClick={handleNavigate}
                  className="group flex items-baseline gap-4 py-2"
                >
                  <span className="micro w-6 shrink-0 text-muted-foreground" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="overflow-hidden">
                    <span
                      className="display block text-display-l leading-[1.2] transition-transform duration-300 ease-out-quart group-hover:translate-x-2"
                      data-menu-item
                    >
                      {item.label}
                    </span>
                  </span>
                </AppLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0" data-menu-cta>
          <Button asChild size="lg" className="w-full">
            <AppLink href={CTA_NAV.href} arrow onClick={handleNavigate}>
              {CTA_NAV.label}
            </AppLink>
          </Button>
        </div>

        <div
          className="mt-4 flex shrink-0 flex-wrap items-center justify-between gap-x-6"
          data-menu-secondary
        >
          <ul className="flex flex-wrap gap-x-6">
            {SECONDARY_NAV.map((item) => (
              <li key={item.href}>
                <AppLink href={item.href} variant="nav" onClick={handleNavigate}>
                  {item.label}
                </AppLink>
              </li>
            ))}
          </ul>
          <p className="micro text-muted-foreground">{SITE.location}</p>
        </div>
      </div>
    </dialog>
  )
}
