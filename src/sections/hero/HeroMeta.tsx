import { SectionEyebrow } from '@/components/SectionEyebrow'

type HeroMetaProps = {
  /** Repère historique, en première ligne (ex. « Depuis 1991 »). */
  since?: string
  /** Mentions courtes (lieu, nature du club). */
  items: string[]
}

/**
 * Mentions au-dessus du titre, secondaires par rapport à lui.
 * Avec un repère historique : il porte le trait rouge, les autres mentions passent dessous,
 * alignées sur son texte. Sans repère : une seule ligne.
 */
export function HeroMeta({ since, items }: HeroMetaProps) {
  const mentions = items.map((item, index) => (
    <span key={item} className="flex items-center gap-3">
      {index > 0 && <span aria-hidden="true">—</span>}
      {item}
    </span>
  ))

  if (!since) {
    return (
      <SectionEyebrow data-hero-meta className="flex-wrap">
        {mentions}
      </SectionEyebrow>
    )
  }

  return (
    <div data-hero-meta className="flex flex-col gap-1.5">
      <SectionEyebrow>{since}</SectionEyebrow>
      {/* Retrait = trait rouge (2rem) + espace (0,75rem) du sur-titre. */}
      <p className="label flex flex-wrap items-center gap-3 pl-11">{mentions}</p>
    </div>
  )
}
