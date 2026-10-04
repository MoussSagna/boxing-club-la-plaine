import type { CSSProperties, ReactNode, Ref } from 'react'
import { GrainOverlay } from '@/components/GrainOverlay'
import { cn } from '@/lib/utils'

/*
 * Traitements d'image — docs/04-design-system.md
 * Aucun effet n'est appliqué par défaut : tout se pilote par props.
 */
const TREATMENTS = {
  /** Image telle quelle. */
  none: '',
  /** Noir et blanc. */
  monochrome: 'grayscale',
  /** Noir et blanc contrasté, légèrement assombri. */
  contrast: 'grayscale contrast-125 brightness-90',
  /** Noir et blanc contrasté sous un voile rouge. */
  red: 'grayscale contrast-125',
} as const

const RATIOS = {
  auto: '',
  '1/1': 'aspect-square',
  '4/5': 'aspect-4/5',
  '3/4': 'aspect-3/4',
  '3/2': 'aspect-3/2',
  '16/9': 'aspect-video',
} as const

export type MediaTreatment = keyof typeof TREATMENTS
export type MediaRatio = keyof typeof RATIOS

/** Variante de l'image dans un format plus léger (AVIF, WebP), avec ses largeurs. */
export type MediaSource = {
  /** Type MIME, ex. `image/avif`. */
  type: string
  srcSet: string
}

export type MediaFrameProps = {
  /** Image de repli, lue par tous les navigateurs. */
  src: string
  /** Largeurs disponibles de l'image de repli, ex. `a-960.jpg 960w, a-1400.jpg 1400w`. */
  srcSet?: string
  /** Largeur d'affichage, pour que le navigateur choisisse le bon fichier. */
  sizes?: string
  /** Formats modernes, du plus léger au plus compatible. */
  sources?: MediaSource[]
  /** Alt vide (`""`) pour une image purement décorative. */
  alt: string
  width?: number
  height?: number
  /** Ratio du cadre. `auto` : la hauteur vient du parent ou de `className`. */
  ratio?: MediaRatio
  treatment?: MediaTreatment
  /** Grain argentique par-dessus l'image. */
  grain?: boolean
  /** Léger vignettage. */
  vignette?: boolean
  /** `eager` pour une image au-dessus de la ligne de flottaison. */
  loading?: 'lazy' | 'eager'
  /** Image principale de la page (hero) : chargée en priorité. */
  priority?: boolean
  style?: CSSProperties
  className?: string
  imageClassName?: string
  ref?: Ref<HTMLDivElement>
  imageRef?: Ref<HTMLImageElement>
  /** Contenu superposé à l'image (légende, scrim, texte). */
  children?: ReactNode
}

/** Cadre d'image : ratio, recadrage et traitements. Base de ImageReveal et ParallaxImage. */
export function MediaFrame({
  src,
  srcSet,
  sizes,
  sources,
  alt,
  width,
  height,
  ratio = 'auto',
  treatment = 'none',
  grain = false,
  vignette = false,
  loading = 'lazy',
  priority = false,
  style,
  className,
  imageClassName,
  ref,
  imageRef,
  children,
}: MediaFrameProps) {
  const image = (
    <img
      ref={imageRef}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      className={cn('size-full object-cover', TREATMENTS[treatment], imageClassName)}
    />
  )

  return (
    <div
      ref={ref}
      style={style}
      className={cn('relative overflow-hidden', RATIOS[ratio], className)}
    >
      {sources?.length ? (
        // `contents` : le <picture> ne crée pas de boîte, l'image garde sa mise en page.
        <picture className="contents">
          {sources.map((source) => (
            <source key={source.type} type={source.type} srcSet={source.srcSet} sizes={sizes} />
          ))}
          {image}
        </picture>
      ) : (
        image
      )}
      {treatment === 'red' && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-red mix-blend-multiply" />
      )}
      {vignette && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-(image:--texture-vignette)"
        />
      )}
      {grain && <GrainOverlay position="absolute" intensity="strong" />}
      {children}
    </div>
  )
}
