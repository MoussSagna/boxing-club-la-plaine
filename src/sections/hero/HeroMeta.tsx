import { SectionEyebrow } from '@/components/SectionEyebrow'

/** Mentions courtes au-dessus du titre (lieu, nature du club). */
export function HeroMeta({ items }: { items: string[] }) {
  return (
    <SectionEyebrow data-hero-meta className="flex-wrap">
      {items.map((item, index) => (
        <span key={item} className="flex items-center gap-3">
          {index > 0 && <span aria-hidden="true">—</span>}
          {item}
        </span>
      ))}
    </SectionEyebrow>
  )
}
