import type { TextPart } from '@/types'

/** Boutons au libellé long : le texte passe à la ligne au lieu de déborder de sa colonne. */
export const WRAPPING_BUTTON =
  'h-auto min-h-13 w-full max-w-full shrink py-3 text-center whitespace-normal sm:w-auto'

/** Texte dont certains mots sont mis en évidence (graisse, pas seulement couleur). */
export function RichText({ parts }: { parts: TextPart[] }) {
  return (
    <>
      {parts.map((part) =>
        part.strong ? (
          <strong key={part.text} className="font-bold tracking-wide text-accent-text">
            {part.text}
          </strong>
        ) : (
          part.text
        ),
      )}
    </>
  )
}

/** Adresse e-mail en très grand, cliquable. Coupure autorisée avant le « @ » sur petit écran. */
export function BigEmail({ email, className }: { email: string; className?: string }) {
  const [user, domain] = email.split('@')

  return (
    <a
      href={`mailto:${email}`}
      className={`display text-display-m normal-case underline decoration-primary decoration-2 underline-offset-8 transition-colors duration-200 hover:decoration-foreground ${className ?? ''}`}
    >
      {user}
      <wbr />@{domain}
    </a>
  )
}
