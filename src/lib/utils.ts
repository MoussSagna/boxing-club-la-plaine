import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Déclare les tailles de texte du projet (tokens.css) : sans cela, tailwind-merge
// prendrait `text-display-l` pour une couleur et le supprimerait face à `text-primary`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { text: ['display-hero', 'display-xl', 'display-l', 'display-m', 'heading', 'body', 'small', 'micro'] },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
