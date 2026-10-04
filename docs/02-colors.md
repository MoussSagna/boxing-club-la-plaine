# Color System

## Palette principale

| Token | HEX | Usage |
|---|---|---|
| Black | `#0A0A0A` | Fonds sombres, texte fort |
| Cream | `#F1EDE3` | Fonds éditoriaux, surfaces |
| Boxing Red | `#C8102E` | CTA, accents, chiffres |
| Dark Red | `#8F0D22` | Hover, profondeur |
| Light Grey | `#D6D2C8` | Bordures, détails |
| White | `#FFFFFF` | Texte sur fonds très sombres |

## Répartition indicative
- 70% noir / crème
- 20% photographie / texture
- 10% rouge

## Règles
Le rouge ne doit jamais devenir la couleur dominante de toute l'interface.

Utiliser le rouge pour :
- CTA principaux
- chiffres
- lignes
- hover
- éléments de navigation actifs
- accents typographiques
- détails graphiques

## Contraste
Tout texte fonctionnel doit respecter un contraste accessible. Les textures ne doivent jamais réduire la lisibilité.

## Tokens
```css
--color-black: #0A0A0A;
--color-cream: #F1EDE3;
--color-red: #C8102E;
--color-dark-red: #8F0D22;
--color-grey: #D6D2C8;
--color-white: #FFFFFF;
```

## Règle de contraste du rouge (Sprint 1 — validée)
Le rouge reste la couleur de marque. Il n'est simplement jamais utilisé en petit texte sur noir.

| Combinaison | Ratio | Petit texte | Grand texte (≥ 24px) |
|---|---|---|---|
| Rouge `#C8102E` sur noir `#0A0A0A` | 3,4:1 | Interdit | Autorisé |
| Rouge sur crème `#F1EDE3` | 5,0:1 | Autorisé | Autorisé |
| Blanc sur rouge | 5,9:1 | Autorisé | Autorisé |
| Crème sur rouge | 5,0:1 | Autorisé | Autorisé |
| Crème sur noir | 16,8:1 | Autorisé | Autorisé |

Sur fond noir :
- pas de petit texte rouge, pas de paragraphe rouge, pas de metadata rouge ;
- petits textes en crème ou blanc ;
- le rouge sert aux grandes typographies, grands chiffres, traits, bordures, éléments graphiques et CTA (texte blanc sur fond rouge).

Exemple : un sur-titre sur fond noir = texte crème + trait rouge. Sur fond crème, le texte du sur-titre peut être rouge.

## Implémentation
Source unique : `src/styles/tokens.css`. La palette Tailwind par défaut est désactivée.

- Couleurs brutes : `bg-black`, `bg-cream`, `text-red`, `bg-dark-red`, `border-grey`, `text-white`.
- Tokens sémantiques, qui changent selon le thème de la section (`dark` ou `cream`) : `background`, `foreground`, `primary`, `primary-foreground`, `primary-hover`, `muted-foreground`, `border`, `ring`, `accent-text`.
- `accent-text` applique la règle ci-dessus : crème en thème sombre, rouge en thème crème.
- Les composants utilisent les tokens sémantiques. Aucune valeur hexadécimale dans les composants (`bg-[#…]` interdit).
