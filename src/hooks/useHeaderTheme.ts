import { useLayoutEffect, useState, type RefObject } from 'react'
import { useLocation } from 'react-router'

export type SectionTheme = 'dark' | 'cream'

type HeaderState = {
  theme: SectionTheme
  /** Fond du header supprimé : l'image de la section passe derrière. */
  transparent: boolean
}

const SECTIONS = 'main section[data-theme]'

function readState(section: Element | undefined, headerHeight: number): HeaderState {
  const theme = section?.getAttribute('data-theme') === 'cream' ? 'cream' : 'dark'
  // Transparent uniquement en haut de la section : dès que la page défile,
  // le header reprend un fond plein pour que le contenu ne passe pas dessous à nu.
  const transparent =
    section?.getAttribute('data-header') === 'transparent' &&
    section.getBoundingClientRect().top > -headerHeight / 2

  return { theme, transparent }
}

/**
 * État à donner au header : thème de la section qui passe sous lui, et transparence
 * si cette section la demande (`data-header="transparent"`).
 * En haut de page (aucune section sous le header), c'est la première section qui décide.
 * Une seule lecture de layout par frame, uniquement pendant le scroll : rien ne tourne en permanence.
 */
export function useHeaderTheme(headerRef: RefObject<HTMLElement | null>) {
  const [state, setState] = useState<HeaderState>({ theme: 'dark', transparent: false })
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const header = headerRef.current
      if (!header) return

      const sections = [...document.querySelectorAll(SECTIONS)]
      const { bottom } = header.getBoundingClientRect()
      // Ligne de bascule : le milieu du header.
      const probe = bottom / 2
      const under = sections.find((section) => {
        const rect = section.getBoundingClientRect()
        return rect.top <= probe && rect.bottom > probe
      })

      const next = readState(under ?? sections[0], bottom)
      setState((current) =>
        current.theme === next.theme && current.transparent === next.transparent ? current : next,
      )
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    // Première mesure avant l'affichage : pas de flash de fond plein sur le hero.
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [headerRef, pathname])

  return state
}
