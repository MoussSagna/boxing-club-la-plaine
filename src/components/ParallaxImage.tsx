import { useParallax } from '@/hooks/useParallax'
import { cn } from '@/lib/utils'

type ParallaxImageProps = {
  src: string
  /** Alt vide (`""`) pour une image purement décorative. */
  alt: string
  width?: number
  height?: number
  /** Classes du cadre : y définir le ratio (ex. `aspect-16/9`). */
  className?: string
  /** Amplitude du parallax, en % de la hauteur de l'image. */
  amount?: number
  loading?: 'lazy' | 'eager'
}

/** Image avec parallax léger au scroll. Reduced motion : image fixe. */
export function ParallaxImage({
  src,
  alt,
  width,
  height,
  className,
  amount,
  loading = 'lazy',
}: ParallaxImageProps) {
  const imageRef = useParallax<HTMLImageElement>({ amount })

  return (
    <div className={cn('overflow-hidden', className)}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        className="size-full object-cover will-change-transform"
      />
    </div>
  )
}
