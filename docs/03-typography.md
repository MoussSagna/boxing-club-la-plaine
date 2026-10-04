# Typography

## Police display
Préférence : **Anton**.

Alternative : **Bebas Neue** ou équivalent condensé si nécessaire.

Utilisation :
- hero
- titres de sections
- chiffres historiques
- CTA majeurs
- grands mots graphiques

## Police texte
Préférence : **Inter** ou Geist Sans.

Utilisation :
- paragraphes
- navigation
- metadata
- boutons
- planning

## Hiérarchie indicative

### Display XL
Hero desktop : 96–160px, uppercase, line-height très serré.

### Display L
Titres de sections : 64–110px.

### Display M
Sous-sections : 40–64px.

### Body
16–20px, line-height 1.45–1.6.

### Small
12–14px, souvent uppercase avec letter-spacing positif.

## Règles
Les grands titres peuvent être très grands. Ils doivent cependant rester lisibles sur mobile.

Le display est principalement visuel ; le body assure la compréhension.

Éviter plus de deux familles typographiques.

## Implémentation (Sprint 1)
Polices auto-hébergées via npm (`@fontsource/anton`, `@fontsource-variable/inter`), servies depuis le domaine du site, en `font-display: swap`.

- **Anton** : un seul poids (400). Ne jamais appliquer de graisse supérieure.
- **Inter** : police variable, poids 100 à 900. Usage : 400 (texte), 500 (labels), 600 (boutons).
- Fallbacks : `'Bebas Neue', 'Arial Narrow', Impact, sans-serif` pour le display ; `system-ui, sans-serif` pour le texte.

### Échelle
Tailles fluides (`clamp`), sans palier par breakpoint.

| Niveau | Classes | 375px | 1440px | 1920px | Usage |
|---|---|---|---|---|---|
| Display XL | `display text-display-xl` | 52 | 153 | 160 | Hero |
| Display L | `display text-display-l` | 40 | 110 | 110 | Titres de sections |
| Display M | `display text-display-m` | 32 | 63 | 64 | Sous-sections, grands chiffres |
| Heading | `display text-heading` | 24 | 38 | 40 | Titres de cartes, intertitres |
| Body | `text-body` | 16 | 19 | 20 | Paragraphes |
| Small | `text-small` | 12 | 13,5 | 14 | Légendes, metadata |
| Label | `label` | 12 | 13,5 | 14 | Navigation, boutons, sur-titres (uppercase, espacé) |
| Micro | `micro` | 11 | 12 | 12 | Numéros, mentions (uppercase, très espacé) |

### Titres
`SectionTitle` produit les compositions display. Une ligne par `<br />`, la ligne accentuée dans `<Accent>` :

```tsx
<SectionTitle>
  Plus qu’une salle.
  <br />
  <Accent>Une histoire.</Accent>
</SectionTitle>
```

« DE LA PLAINE » tient sur une ligne à 375px en Display XL.
