import { ArrowRight, X } from 'lucide-react'
import { useRef, type SyntheticEvent } from 'react'
import { Link, NavLink } from 'react-router'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { CTA_NAV, MAIN_NAV, ROUTES, SECONDARY_NAV } from '@/data/navigation'
import { SITE } from '@/data/site'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { gsap, useGSAP } from '@/lib/gsap'
import { DURATION, EASE } from '@/lib/motion'

type MobileMenuProps = {
  id: string
  open: boolean
  onClose: () => void
}

const MENU_ITEMS = [...MAIN_NAV, ...SECONDARY_NAV]

/**
 * Menu mobile plein écran.
 * `<dialog>` natif ouvert en modal : piège de focus, touche Échap, fond inerte
 * et retour du focus sur le bouton MENU sont gérés par le navigateur.
 * L'animation GSAP (fondation) sera affinée au Sprint 2.
 */
export function MobileMenu({ id, open, onClose }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const dialog = dialogRef.current
      if (!dialog) return

      if (!open) {
        if (!dialog.open) return
        gsap.to(dialog, {
          autoAlpha: 0,
          duration: DURATION.micro,
          ease: EASE.outSoft,
          onComplete: () => dialog.close(),
        })
        return
      }

      if (!dialog.open) dialog.showModal()
      gsap.killTweensOf(dialog)

      if (reducedMotion) {
        gsap.fromTo(dialog, { autoAlpha: 0 }, { autoAlpha: 1, duration: DURATION.micro })
        return
      }

      gsap
        .timeline({ defaults: { ease: EASE.outStrong } })
        .set(dialog, { autoAlpha: 1 })
        .fromTo(
          dialog,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: DURATION.reveal, clearProps: 'clipPath' },
        )
        .fromTo(
          '[data-menu-item]',
          { yPercent: 110 },
          { yPercent: 0, duration: DURATION.reveal, stagger: 0.06 },
          '-=0.45',
        )
        .fromTo(
          '[data-menu-fade]',
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: DURATION.micro },
          '-=0.3',
        )
    },
    { dependencies: [open, reducedMotion], scope: dialogRef },
  )

  // Échap : on passe par onClose pour jouer l'animation de sortie.
  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault()
    onClose()
  }

  // Clic sur un lien : fermeture immédiate (la transition de page prend le relais),
  // pour que le focus puisse être déplacé sur le contenu de la nouvelle page.
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
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto backdrop:bg-black"
    >
      <div className="container-site flex min-h-full flex-col pb-8">
        <div className="flex h-18 shrink-0 items-center justify-between">
          <Link to={ROUTES.home} onClick={handleNavigate} aria-label={`${SITE.name} — Accueil`}>
            <Logo className="size-12" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="label -mr-2 flex h-11 cursor-pointer items-center gap-2 px-2"
          >
            Fermer
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <nav aria-label="Navigation mobile" className="flex flex-1 flex-col justify-center py-10">
          <ul className="border-t border-border">
            {MENU_ITEMS.map((item, index) => (
              <li key={item.href} className="border-b border-border">
                <NavLink
                  to={item.href}
                  onClick={handleNavigate}
                  className="group flex items-baseline gap-4 overflow-hidden py-3 aria-[current=page]:text-primary"
                >
                  <span className="label w-6 text-muted-foreground" data-menu-fade aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="overflow-hidden">
                    <span className="display block text-display-l leading-[1.2]" data-menu-item>
                      {item.label}
                    </span>
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 flex-col gap-6" data-menu-fade>
          <Button asChild size="lg" className="w-full">
            <Link to={CTA_NAV.href} onClick={handleNavigate}>
              {CTA_NAV.label}
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <p className="label text-muted-foreground">
            {SITE.location} — {SITE.tagline}
          </p>
        </div>
      </div>
    </dialog>
  )
}
