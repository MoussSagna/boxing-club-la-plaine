import { MediaFrame, type MediaFrameProps } from '@/components/MediaFrame'
import { useParallax } from '@/hooks/useParallax'
import { cn } from '@/lib/utils'

type ParallaxImageProps = Omit<MediaFrameProps, 'ref' | 'imageRef'> & {
  /** Amplitude du parallax, en % de la hauteur de l'image. Rester léger. */
  amount?: number
}

/** Image avec parallax léger au scroll. Reduced motion : image fixe. */
export function ParallaxImage({ amount, imageClassName, ...props }: ParallaxImageProps) {
  const imageRef = useParallax<HTMLImageElement>({ amount })

  return (
    <MediaFrame
      imageRef={imageRef}
      imageClassName={cn('will-change-transform', imageClassName)}
      {...props}
    />
  )
}
