import { ArrowRight } from 'lucide-react'
import { MediaFrame, type MediaRatio, type MediaTreatment } from '@/components/MediaFrame'
import { AppLink } from '@/components/ui/link'
import { cn } from '@/lib/utils'

type EditorialCardProps = {
  /**
   * `overlay` : texte posé sur l'image (pratiques).
   * `stacked` : image puis texte (coachs, actualités).
   */
  variant?: 'overlay' | 'stacked'
  image: string
  imageAlt: string
  ratio?: MediaRatio
  treatment?: MediaTreatment
  /** Numéro éditorial, ex. `01`. */
  number?: string
  /** Metadata courte : catégorie, date, rôle. */
  meta?: string
  title: string
  titleAs?: 'h2' | 'h3' | 'h4'
  description?: string
  /** Rend toute la carte cliquable. */
  href?: string
  /** Libellé du CTA discret ; sans libellé, seule la flèche s'affiche. */
  cta?: string
  className?: string
}

/**
 * Base des futures PracticeCard, CoachCard et NewsCard.
 * Identité éditoriale : image dominante, numéro, titre display, bordure fine,
 * ni radius ni ombre. Survol : léger zoom de l'image, flèche qui avance.
 */
export function EditorialCard({
  variant = 'stacked',
  image,
  imageAlt,
  ratio = variant === 'overlay' ? '3/4' : '4/5',
  treatment = 'none',
  number,
  meta,
  title,
  titleAs: Title = 'h3',
  description,
  href,
  cta,
  className,
}: EditorialCardProps) {
  const isOverlay = variant === 'overlay'

  const heading = (
    <Title className="display text-heading">
      {href ? (
        // Lien étiré : toute la carte est cliquable, un seul arrêt de tabulation.
        <AppLink href={href} className="outline-none after:absolute after:inset-0 after:z-10">
          {title}
        </AppLink>
      ) : (
        title
      )}
    </Title>
  )

  const body = (
    <>
      {meta && <p className="micro text-muted-foreground">{meta}</p>}
      {heading}
      {description && <p className="text-small text-muted-foreground">{description}</p>}
      {href && (
        <p aria-hidden="true" className="label mt-2 flex items-center gap-2">
          {cta}
          <ArrowRight className="size-5 text-primary transition-transform duration-300 ease-out-quart group-hover:translate-x-1" />
        </p>
      )}
    </>
  )

  return (
    <article
      // Les cartes en `overlay` portent toujours un texte clair sur image sombre.
      data-theme={isOverlay ? 'dark' : undefined}
      className={cn(
        'group relative flex flex-col border border-border transition-colors duration-300',
        'has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-ring',
        href && 'hover:border-foreground',
        className,
      )}
    >
      <MediaFrame
        src={image}
        alt={imageAlt}
        ratio={ratio}
        treatment={treatment}
        imageClassName="transition-transform duration-700 ease-out-quart motion-safe:group-hover:scale-105"
      >
        {number && (
          <span className="micro absolute top-0 left-0 bg-background px-3 py-2 text-foreground">
            {number}
          </span>
        )}
        {isOverlay && (
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-linear-to-t from-black via-black/80 to-transparent p-5 pt-24">
            {body}
          </div>
        )}
      </MediaFrame>
      {!isOverlay && (
        <div className="flex flex-1 flex-col gap-2 border-t border-border p-5">{body}</div>
      )}
    </article>
  )
}
