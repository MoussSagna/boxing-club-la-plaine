import { ArrowRight, Menu } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Logo } from '@/components/Logo'
import { MobileMenu } from '@/components/MobileMenu'
import { Button } from '@/components/ui/button'
import { CTA_NAV, MAIN_NAV, ROUTES } from '@/data/navigation'
import { SITE } from '@/data/site'

const MOBILE_MENU_ID = 'menu-mobile'
/** Correspond au breakpoint `lg` : au-delà, la navigation desktop prend le relais. */
const DESKTOP_QUERY = '(min-width: 64rem)'

export function Navbar() {
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
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="container-site flex h-18 items-center justify-between lg:h-24">
        <Link to={ROUTES.home} aria-label={`${SITE.name} — Accueil`} className="shrink-0">
          <Logo className="size-12 lg:size-16" />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-12">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className="label relative block py-3 transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out-quart hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Button asChild className="hidden lg:inline-flex">
          <Link to={CTA_NAV.href}>
            {CTA_NAV.label}
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          aria-controls={MOBILE_MENU_ID}
          className="label -mr-2 flex h-11 cursor-pointer items-center gap-2 px-2 lg:hidden"
        >
          Menu
          <Menu aria-hidden="true" className="size-5" />
        </button>
      </div>

      <MobileMenu id={MOBILE_MENU_ID} open={menuOpen} onClose={closeMenu} />
    </header>
  )
}
