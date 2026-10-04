import { Menu } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Logo } from '@/components/Logo'
import { MobileMenu } from '@/components/MobileMenu'
import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/ui/link'
import { CTA_NAV, MAIN_NAV, ROUTES } from '@/data/navigation'
import { SITE } from '@/data/site'
import { useHeaderTheme } from '@/hooks/useHeaderTheme'

const MOBILE_MENU_ID = 'menu-mobile'
/** Correspond au breakpoint `lg` : au-delà, la navigation desktop prend le relais. */
const DESKTOP_QUERY = '(min-width: 64rem)'

/**
 * Header global, sticky.
 * Trois états visuels, par un fondu de couleurs :
 *   - DARK et LIGHT : le thème de la section qui passe sous lui ;
 *   - TRANSPARENT : en haut d'une section qui le demande (`data-header="transparent"`,
 *     ex. le hero), le fond disparaît et l'image passe derrière.
 */
export function Navbar() {
  const headerRef = useRef<HTMLElement>(null)
  const { theme, transparent } = useHeaderTheme(headerRef)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // Ferme le menu mobile si la fenêtre passe en largeur desktop.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY)
    const onChange = () => {
      if (query.matches) setMenuOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return (
    <header
      ref={headerRef}
      data-theme={theme}
      data-transparent={transparent}
      className="sticky top-0 z-40 h-(--header-height) border-b border-border transition-colors duration-500 ease-out-quart data-[transparent=true]:border-transparent data-[transparent=true]:bg-transparent"
    >
      {/* 3 colonnes : la navigation reste centrée quelle que soit la largeur du logo et du CTA. */}
      <div className="container-site grid h-full grid-cols-[1fr_auto_1fr] items-center">
        <AppLink
          href={ROUTES.home}
          aria-label={`${SITE.name} — Accueil`}
          className="justify-self-start rounded-full"
        >
          <Logo className="size-12 lg:size-16" />
        </AppLink>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-12">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <AppLink href={item.href} variant="nav">
                  {item.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Au-dessus du hero, le CTA du header passe en contour : le seul aplat rouge
            de l'écran reste alors le CTA du hero. Il redevient rouge dès que la page défile. */}
        <Button
          asChild
          variant={transparent ? 'secondary' : 'primary'}
          className="col-start-3 hidden justify-self-end lg:inline-flex"
        >
          <AppLink href={CTA_NAV.href} arrow>
            {CTA_NAV.label}
          </AppLink>
        </Button>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          aria-controls={MOBILE_MENU_ID}
          className="label col-start-3 -mr-2 flex h-11 cursor-pointer items-center gap-2 justify-self-end px-2 lg:hidden"
        >
          Menu
          <Menu aria-hidden="true" className="size-5" />
        </button>
      </div>

      <MobileMenu id={MOBILE_MENU_ID} open={menuOpen} onClose={closeMenu} />
    </header>
  )
}
