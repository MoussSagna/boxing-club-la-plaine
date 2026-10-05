import { Accent } from '@/components/SectionTitle'
import { cn } from '@/lib/utils'
import type { ClubHistoryContent } from '@/types'

type HistoryPhilosophyProps = {
  philosophy: ClubHistoryContent['philosophy']
  className?: string
}

/** Phrase de clôture, composée comme un grand élément typographique. */
export function HistoryPhilosophy({ philosophy, className }: HistoryPhilosophyProps) {
  const { text, highlight } = philosophy
  const [before, after] = highlight && text.includes(highlight) ? text.split(highlight) : [text]

  return (
    <p data-history-outro // Interligne desserré : en capitales, les accents (É, Ê, Ù) toucheraient la ligne du dessus.
      className={cn('display text-heading leading-[1.18] lg:text-display-m lg:leading-[1.14]', className)}>
      {before}
      {after !== undefined && (
        <>
          <Accent>{highlight}</Accent>
          {after}
        </>
      )}
    </p>
  )
}
