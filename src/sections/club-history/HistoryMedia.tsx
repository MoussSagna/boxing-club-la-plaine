import { MediaFrame } from '@/components/MediaFrame'
import type { ClubHistoryContent } from '@/types'

type HistoryMediaProps = {
  media?: ClubHistoryContent['media']
  className?: string
}

/**
 * Zone média de la section : une photographie d'archive ou du club, en cadre 4/5.
 * Tant qu'aucune photographie n'est fournie, rien n'est affiché : ni image de remplissage,
 * ni réemploi de la photographie du hero. Renseigner `media` dans les données suffit.
 */
export function HistoryMedia({ media, className }: HistoryMediaProps) {
  if (!media) return null

  return (
    <div data-history-media className={className}>
      <MediaFrame {...media} ratio="4/5" />
    </div>
  )
}
