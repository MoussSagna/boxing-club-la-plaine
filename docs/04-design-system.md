# Design System

## Principes
1. Contraste fort.
2. Grandes masses typographiques.
3. Grilles éditoriales.
4. Photographies fortes.
5. Bordures fines plutôt que cartes molles.
6. Peu de radius.
7. Peu d'ombres.
8. Beaucoup d'espace lorsque le contenu le permet.

## Container
Desktop : max-width cible 1440–1600px.
Mobile : padding latéral 20–24px.

## Grid
Desktop : 12 colonnes.
Tablet : 8 colonnes.
Mobile : 4 colonnes.

## Spacing
Utiliser une échelle cohérente basée sur 4 ou 8px.

## Boutons
Style principal :
- fond rouge
- texte clair
- uppercase
- typographie medium/bold
- padding généreux
- hover par assombrissement ou déplacement léger

Style secondaire :
- transparent
- bordure
- texte clair ou noir selon le fond

## Cards
Les cartes doivent être éditoriales :
- image dominante
- numéro
- titre
- texte court
- CTA discret

Éviter les cartes SaaS génériques avec grosse ombre et radius excessif.

## Images
Traitement privilégié :
- noir et blanc
- contraste élevé
- grain
- léger vignettage
- overlays rouges ponctuels

## Texture
Une texture papier/grain peut être utilisée avec parcimonie pour éviter l'aspect artificiel.

## Icônes
Préférer des icônes simples, géométriques et discrètes.

---

# Implémentation (Sprint 1)
Référence visuelle : page interne `/design-system` (non indexée).

## Container
`container-site` : largeur max 1600px, centré, marge latérale fluide.

| Largeur écran | Marge latérale | Largeur de contenu |
|---|---|---|
| 375 / 390 / 430 | 20px | 335 / 350 / 390 |
| 768 | 32px | 704 |
| 1024 / 1280 / 1440 | 48px | 928 / 1184 / 1344 |
| 1920 | 64px | 1472 |

## Grid
`grid-site` : 4 colonnes (gap 16px) → 8 à partir de 768px (gap 24px) → 12 à partir de 1024px (gap 32px). Les enfants se placent avec `col-span-*`.

Compositions prévues : hero éditorial 7/5, image + texte 6/6, timeline 2/10, cartes et portraits 4 × 3, actualités 3 × 4, planning 3/9.

## Section
```tsx
<Section theme="dark | cream" spacing="none | small | medium | large" contained>
```
- `theme` pose `data-theme` : fond, texte, bordures et focus suivent automatiquement.
- `spacing` : small 48/64px, medium 64/96px, large 80/128/160px (mobile / desktop / très grand écran).
- `contained={false}` pour un contenu bord à bord.

## Boutons
| Rôle | Code |
|---|---|
| PrimaryButton | `<Button variant="primary">` |
| SecondaryButton | `<Button variant="secondary">` |
| TextButton | `<Button variant="text">` |
| IconButton | `<IconButton aria-label="…">` (`shape="square | round"`) |

Tailles `sm` 44px, `md` 52px, `lg` 60px. États : hover, active (enfoncement de 1px), focus visible, disabled. Toute cible fait au moins 44px de haut.

## Liens
`AppLink` choisit seul entre lien interne (routeur), lien externe (nouvelle fenêtre, annoncée aux lecteurs d'écran) et `mailto:` / `tel:`.

| Usage | Code |
|---|---|
| Navigation | `<AppLink variant="nav">` : trait rouge au survol et sur la page active |
| CTA | `<Button asChild><AppLink href arrow>…</AppLink></Button>` |
| Lien éditorial | `<AppLink variant="inline">` : souligné rouge |

`arrow` ajoute `→` (ou `↗` pour un lien externe). Pas d'animation complexe sur les petits liens.

## Images
`MediaFrame` est la base ; `ImageReveal` et `ParallaxImage` acceptent les mêmes props. Aucun effet n'est appliqué par défaut.

| Prop | Valeurs |
|---|---|
| `ratio` | `auto`, `1/1`, `4/5`, `3/4`, `3/2`, `16/9` |
| `treatment` | `none`, `monochrome`, `contrast`, `red` |
| `grain` | grain argentique sur l'image |
| `vignette` | léger vignettage |
| `reveal` (ImageReveal) | `clip`, `fade`, `none` |
| `amount` (ParallaxImage) | amplitude en % |

## Grain
`GrainOverlay` : `intensity` (`subtle` 6 %, `medium` 12 %, `strong` 20 %), `position` (`fixed` pour le calque global, `absolute` dans un bloc), `disabled`. Texture SVG inline de quelques centaines d'octets, statique, sans mode de fusion.

## Cards
`EditorialCard` est la base de PracticeCard, CoachCard et NewsCard.
- `variant="overlay"` : texte posé sur l'image (pratiques).
- `variant="stacked"` : image puis texte (coachs, actualités).
- Contenu : image, numéro, metadata, titre, description, CTA.
- Bordure fine, pas de radius, pas d'ombre. Survol : léger zoom de l'image, flèche qui avance, bordure renforcée.
- Avec `href`, toute la carte est cliquable par un seul lien.

## Logo
PNG officiel utilisé tel quel, avec masque circulaire CSS.
**TODO :** obtenir une version SVG ou PNG transparent haute qualité auprès du club.

## Performance — baseline
Bundle principal après Sprint 1 : **481 Ko (161 Ko gzip)**, CSS 34 Ko (7,5 Ko gzip). La page `/design-system` est chargée à part (16 Ko). Sprint 0 : 477 Ko (160 Ko gzip). Découpage par route à étudier au Sprint 13.

---

# Hero (Sprint 3)

## Composition
Photographie plein cadre, titre monumental posé dessus, CTA. Le hero occupe tout le premier écran (`min-height: 100svh`) et passe sous le header.

```text
desktop / tablet                      mobile
[logo]   nav   [Inscription]          [logo]            [Menu]
        (photographie)                    (photographie)
— PARIS 15 — CLUB DE BOXE             — PARIS 15 — CLUB DE BOXE
BOXING CLUB                           BOXING
ᴰᴱ PLAINE         [INSCRIPTION →]     CLUB
ᴸᴬ                Découvrir le club   ᴰᴱ PLAINE
| SCROLL                              ᴸᴬ
                                      [INSCRIPTION →]
                                      Découvrir le club
```

Hiérarchie : identité (titre) → image → CTA.

## Titre
- `text-display-hero`, taille bornée par la largeur **et** la hauteur de l'écran : `min(27vw, 17svh)` en mobile, `min(16.5vw, 27svh, 288px)` à partir de 768px.
- Mobile : 3 lignes, « BOXING » presque pleine largeur. Tablet et desktop : 2 lignes.
- « DE LA » en petit, empilé, à gauche de « PLAINE ». Seul « PLAINE » est rouge.

| Largeur | Taille du titre |
|---|---|
| 375 / 390 / 430 | 101 / 105 / 116px |
| 768 | 127px |
| 1024 / 1280 / 1440 | 169 / 211 / 238px |
| 1920 | 288px |

## Image
`HeroMedia` : `src`, `srcSet`, `sizes`, `sources`, `alt`, `focalPoint`, `focalPointMobile`, `treatment`, `overlay` (`none`, `soft`, `strong`), `grain`, `vignette`. Changer de photographie ne demande que de modifier `src/data/home.ts`.

### Photographie en place
Photographie fournie par le club (séance d'entraînement, noir et blanc), utilisée telle quelle : ni retouche, ni recadrage du fichier, ni image générée.

| | |
|---|---|
| Original | `sources/hero.png`, 1838 × 856, 2,3 Mo — conservé en local, hors dépôt et hors build |
| Fichiers servis | `public/assets/images/hero/hero-{960,1400,1838}.{avif,jpg}` |
| Poids | AVIF 34 / 59 / 94 Ko, JPEG de repli 122 / 233 / 391 Ko |
| Chargement | `<picture>` AVIF + JPEG, `srcset` + `sizes`, priorité haute |

### Cadrage
- **Desktop (≥ 1024px)** : image plein cadre, point focal 35 % / 30 %. On voit 75 % de la largeur à 1440×900 et 83 % en 16:9 : le boxeur du premier plan à gauche, le groupe au centre, la profondeur de la salle.
- **Mobile et tablet (< 1024px)** : la photo est très horizontale (2,15:1) ; en plein cadre vertical on n'en verrait qu'un cinquième. Elle occupe donc un bandeau en haut du hero (56 % de la hauteur d'écran) qui se fond dans le noir, et le titre est posé dessous. Point focal 39 % / 30 % : le boxeur du premier plan et le binôme central restent visibles (38 à 62 % de la largeur selon l'écran).

### Traitement
- Aucun filtre sur l'image (`treatment="none"`) : elle est déjà en noir et blanc contrasté.
- Voile `strong` : un fond uniforme à 35 %, un dégradé sous le header, un dégradé sous le titre.
- En plein cadre, le voile est presque noir sous la dernière ligne du titre, puis se dissipe vite : la moitié haute de la scène (visages, gestes) reste intacte. C'est le rouge de « PLAINE » qui l'impose : il lui faut un fond très sombre pour atteindre 3:1.
- Grain : celui du site (`GrainOverlay`, 6 %) ; pas de seconde couche sur la photo. Ni flou, ni vignette.

### Limite connue
L'original fait 1838px de large. Sur un écran de 1920px et plus, l'image est agrandie d'environ 25 % : le rendu reste correct sous le voile et le grain, mais une version d'au moins 2600px de large serait préférable.

## CTA
- Principal : `INSCRIPTION →` (`Button` primary, pleine largeur en mobile).
- Secondaire : `DÉCOUVRIR LE CLUB →` (`Button` text).
- Desktop : logés à droite de la dernière ligne du titre, plus courte.

## Header au-dessus du hero
Le header a trois états : `dark`, `cream`, `transparent`. Une section demande la transparence avec `data-header="transparent"`. En haut du hero, le header n'a ni fond ni bordure et son CTA passe en contour, pour que le CTA du hero reste le seul aplat rouge. Dès que la page défile de plus d'une demi-hauteur de header, il reprend son fond plein et son CTA rouge.

## Performance — baseline
Bundle principal après Sprint 3 : 495 Ko (165 Ko gzip). Aucune dépendance ajoutée, ni vidéo, ni canvas, ni flou.
