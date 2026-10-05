import { useEffect, useRef, useState } from 'react'
import { Outlet, ScrollRestoration, useLocation, type Location } from 'react-router'
import { Footer } from '@/components/Footer'
import { GrainOverlay } from '@/components/GrainOverlay'
import { Navbar } from '@/components/Navbar'
import { PageTransition } from '@/components/PageTransition'

const MAIN_ID = 'contenu'

/*
 * Restauration du défilement :
 *   - nouveau lien → haut de page ;
 *   - précédent / suivant, rechargement → position retrouvée ;
 *   - URL saisie ou lien externe → haut de page (les positions mémorisées sont oubliées) ;
 *   - page affichée dans un cadre (aperçus de /design-system) → aucune restauration.
 */
const SCROLL_STORAGE_KEY = 'bcp-scroll-positions'
const isEmbedded = window.self !== window.top

function isFreshVisit() {
  const [entry] = performance.getEntriesByType('navigation')
  return (entry as PerformanceNavigationTiming | undefined)?.type === 'navigate'
}

if (!isEmbedded && isFreshVisit()) {
  try {
    sessionStorage.removeItem(SCROLL_STORAGE_KEY)
  } catch {
    // Stockage indisponible (navigation privée stricte) : rien à oublier.
  }
}

// Tout chargement direct porte la même clé (`default`) : on la distingue par le chemin et
// l'ancre, sinon un lien d'ancre (#etape-…) hériterait de la position de l'ancre précédente.
const getScrollKey = (location: Location) =>
  location.key === 'default' ? location.pathname + location.hash : location.key

export function RootLayout() {
  const mainRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const previousPathname = useRef(pathname)
  const [announcement, setAnnouncement] = useState('')

  // À chaque navigation : le focus va sur le contenu et le titre de la nouvelle page
  // est annoncé, pour que clavier et lecteurs d'écran repartent du début de la page.
  useEffect(() => {
    if (previousPathname.current === pathname) return
    previousPathname.current = pathname
    mainRef.current?.focus({ preventScroll: true })
    // Les pages ont déjà mis à jour document.title (effets enfants avant effets parents).
    setAnnouncement(document.title)
  }, [pathname])

  return (
    <>
      <a
        href={`#${MAIN_ID}`}
        className="label fixed top-2 left-2 z-70 -translate-y-20 bg-primary px-4 py-3 text-primary-foreground focus-visible:translate-y-0"
      >
        Aller au contenu
      </a>
      <Navbar />
      <main id={MAIN_ID} ref={mainRef} tabIndex={-1} className="outline-none">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <GrainOverlay />
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
      {!isEmbedded && <ScrollRestoration getKey={getScrollKey} storageKey={SCROLL_STORAGE_KEY} />}
    </>
  )
}
