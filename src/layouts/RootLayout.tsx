import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Footer } from '@/components/Footer'
import { GrainOverlay } from '@/components/GrainOverlay'
import { Navbar } from '@/components/Navbar'
import { PageTransition } from '@/components/PageTransition'

const MAIN_ID = 'contenu'

export function RootLayout() {
  const mainRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const previousPathname = useRef(pathname)

  // À chaque navigation : retour en haut de page et focus sur le contenu,
  // pour que clavier et lecteurs d'écran repartent du début de la nouvelle page.
  useEffect(() => {
    if (previousPathname.current === pathname) return
    previousPathname.current = pathname
    window.scrollTo(0, 0)
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <>
      <a
        href={`#${MAIN_ID}`}
        className="label fixed top-2 left-2 z-50 -translate-y-20 bg-primary px-4 py-3 text-primary-foreground focus-visible:translate-y-0"
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
    </>
  )
}
