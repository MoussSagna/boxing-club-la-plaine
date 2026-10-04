import { SITE } from '@/data/site'
import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  /** Laisser vide quand le logo est dans un lien déjà labellisé. */
  alt?: string
}

/**
 * Logo officiel, non modifié. Le fichier fourni n'a pas de transparence :
 * le masque circulaire CSS cache uniquement les coins du carré.
 */
export function Logo({ className, alt = '' }: LogoProps) {
  return (
    <img
      src={SITE.logo.light}
      alt={alt}
      width={256}
      height={256}
      decoding="async"
      className={cn('aspect-square size-14 rounded-full object-cover', className)}
    />
  )
}
