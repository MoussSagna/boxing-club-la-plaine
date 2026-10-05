import type { CSSProperties } from 'react'
import { GrainOverlay } from '@/components/GrainOverlay'
import type { MediaRatio } from '@/components/MediaFrame'
import { ParallaxImage } from '@/components/ParallaxImage'
import { cn } from '@/lib/utils'
import type { Coach, CoachPhoto } from '@/types'

const RATIO_CLASSES: Record<MediaRatio, string> = {
  auto: '',
  '1/1': 'aspect-square',
  '4/5': 'aspect-4/5',
  '3/4': 'aspect-3/4',
  '3/2': 'aspect-3/2',
  '16/9': 'aspect-video',
}

/** « Jérôme Loubet » → « JL ». */
function getInitials(name: string) {
  const parts = name.split(' ')
  return `${parts[0]?.[0] ?? ''}${parts.at(-1)?.[0] ?? ''}`.toUpperCase()
}

type CoachMediaProps = {
  coach: Coach
  /** Photographie à afficher. Absente : état « Photo à venir ». */
  photo?: CoachPhoto
  ratio?: MediaRatio
  /** Largeur d'affichage, pour le choix du fichier (attribut `sizes`). */
  sizes?: string
  className?: string
}

/**
 * Visuel d'un coach, dans un cadre au ratio fixe.
 *   - avec une photographie réelle : image en noir et blanc, léger déplacement au scroll ;
 *   - sans photographie : un état « Photo à venir » assumé (initiales, grain), jamais une image
 *     générée ni un portrait de remplacement.
 * Les deux occupent exactement le même cadre : ajouter la photo dans `src/data/coaches.ts`
 * suffit, sans retoucher la mise en page.
 */
export function CoachMedia({ coach, photo, ratio = '4/5', sizes, className }: CoachMediaProps) {
  if (!photo) {
    return (
      <div
        data-coach-media
        role="img"
        aria-label={`Photo de ${coach.name} à venir`}
        className={cn(
          'relative flex flex-col justify-between overflow-hidden border border-border p-5 lg:p-6',
          RATIO_CLASSES[ratio],
          className,
        )}
      >
        <GrainOverlay position="absolute" intensity="strong" />
        <span aria-hidden="true" className="relative h-0.5 w-10 bg-primary" />
        <span
          aria-hidden="true"
          className="display relative self-center text-display-hero leading-none text-foreground/15"
        >
          {getInitials(coach.name)}
        </span>
        <span aria-hidden="true" className="micro relative text-muted-foreground">
          Photo à venir
        </span>
      </div>
    )
  }

  const focal = photo.focalPoint ?? { x: 50, y: 50 }

  return (
    <div data-coach-media className={className}>
      <ParallaxImage
        src={photo.src}
        srcSet={photo.srcSet}
        sources={photo.sources}
        sizes={sizes}
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        ratio={ratio}
        // Seul traitement : le noir et blanc, pour unifier des photos de sources différentes.
        treatment="monochrome"
        amount={3}
        style={{ '--focal': `${focal.x}% ${focal.y}%` } as CSSProperties}
        imageClassName="object-(--focal)"
      />
    </div>
  )
}
