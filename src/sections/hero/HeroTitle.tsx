import type { ReactNode } from 'react'
import { Accent } from '@/components/SectionTitle'
import type { HeroContent } from '@/types'

/** Une ligne du titre : le masque cache la ligne avant son reveal. */
function Line({ children, className }: { children: ReactNode; className?: string }) {
  return (
    // Le padding compense l'interligne serré : sans lui le masque rognerait les lettres.
    <span className="-my-[0.04em] block overflow-hidden py-[0.04em]">
      <span data-hero-line className={className ?? 'block'}>
        {children}
      </span>
    </span>
  )
}

type HeroTitleProps = {
  id: string
  title: HeroContent['title']
}

/**
 * H1 monumental, en composition éditoriale :
 *   mobile            desktop
 *   BOXING            BOXING CLUB
 *   CLUB              ᴰᴱ PLAINE
 *   ᴰᴱ PLAINE         ᴸᴬ
 *   ᴸᴬ
 * Les mots principaux sont en très grand, les mots de liaison en petit et empilés,
 * le dernier mot seul en rouge. Lu d'une traite par les lecteurs d'écran.
 */
export function HeroTitle({ id, title }: HeroTitleProps) {
  return (
    <h1 id={id} className="display text-display-hero whitespace-nowrap">
      <span className="flex flex-col md:flex-row md:gap-[0.2em]">
        {title.lead.map((word) => (
          <Line key={word}>{word} </Line>
        ))}
      </span>
      <Line className="flex items-start gap-[0.1em]">
        <span className="mt-[0.085em] flex flex-col text-[0.375em] leading-[0.95]">
          {title.connector.map((word) => (
            <span key={word}>{word} </span>
          ))}
        </span>
        <Accent>{title.accent}</Accent>
      </Line>
    </h1>
  )
}
