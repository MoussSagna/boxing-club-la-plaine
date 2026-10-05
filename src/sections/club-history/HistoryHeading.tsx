import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Accent, SectionTitle } from '@/components/SectionTitle'
import { cn } from '@/lib/utils'
import type { ClubHistoryContent } from '@/types'

type HistoryHeadingProps = {
  id: string
  eyebrow: string
  title: ClubHistoryContent['title']
  className?: string
}

/** Sur-titre et titre monumental. Chaque ligne est masquée pour son reveal vertical. */
export function HistoryHeading({ id, eyebrow, title, className }: HistoryHeadingProps) {
  return (
    <div className={cn('flex flex-col gap-6 lg:gap-8', className)}>
      <SectionEyebrow data-history-fade>{eyebrow}</SectionEyebrow>
      <SectionTitle id={id} size="xl" className="whitespace-nowrap">
        {[...title.lines, title.accent].map((line, index) => (
          // Le padding compense l'interligne serré : sans lui le masque rognerait les lettres.
          <span key={line} className="-my-[0.05em] block overflow-hidden py-[0.05em]">
            <span data-history-line className="block">
              {index === title.lines.length ? <Accent>{line}</Accent> : line}{' '}
            </span>
          </span>
        ))}
      </SectionTitle>
    </div>
  )
}
