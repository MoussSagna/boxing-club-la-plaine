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

---

# Histoire du club (Sprint 4)
Première section après le hero. Le hero dit « Boxing Club de la Plaine » ; la section répond « Depuis 1991 ». Fond crème (papier, archive) après le hero sombre.

## Composition
```text
desktop (12 colonnes)                              mobile
— DEPUIS 1991                                      — DEPUIS 1991
UNE SALLE.                                         UNE SALLE.
UNE HISTOIRE.               [zone média, si        UNE HISTOIRE.
                             une photo existe]     texte (3 paragraphes)
texte          ──────────────────────────          ──────────────
(col. 1–4)     1991   Création du club             1991
               ──────────────────────────          Création du club
               2000   Ouverture à la boxe…         ──────────────
               ──────────────────────────          2000 …
               2019   Modernisation…               2019 …
                      (col. 6–12)                  LE CLUB EST UN CLUB FAMILIAL…
LE CLUB EST UN CLUB FAMILIAL OÙ LES DÉBUTANTS…     Découvrir l'histoire →
Découvrir l'histoire →
```
- Titre : colonnes 1 à 8, `text-display-xl`, seconde ligne en rouge.
- Texte : colonnes 1 à 4. Timeline : colonnes 6 à 12, décalée — c'est elle qui porte l'asymétrie.
- Phrase de clôture : colonnes 1 à 10, en Anton (`text-display-m` desktop, `text-heading` mobile), « club familial » en rouge.
- Pas de carte, pas de fond, pas de radius, pas d'ombre.

## Timeline
Liste ordonnée. Chaque entrée : un filet, la date en très grand à gauche (`text-display-l`), l'événement aligné à droite (dessous en mobile). Composant `TimelineItem`.

- Quand la date complète est connue, elle est affichée en entier : « 13 MAI 1991 ». Sinon, l'année seule (« 2000 », « 2019 »).
- La date complète tient à toutes les largeurs, mobile compris : pas de forme abrégée.
- Les événements sont alignés à droite pour garder le même bord quelle que soit la largeur de la date.

## Zone média
`HistoryMedia` affiche une photographie d'archive ou du club (cadre 4/5, à droite du titre) dès que `media` est renseigné dans `src/data/history.ts`. Sans photographie, rien n'est affiché : ni image de remplissage, ni réemploi de la photo du hero. État actuel : aucune photographie, la section ne charge aucune image.

## Thèmes
`theme="cream"` sur la homepage ; `theme="dark"` disponible. Les deux sont visibles sur `/design-system`.

## Mentions du hero (mise à jour Sprint 4)
Deux lignes au-dessus du titre, secondaires par rapport à lui :

```text
— DEPUIS 1991
  PARIS 15 — CLUB DE BOXE
```
« Depuis 1991 » porte le trait rouge ; les autres mentions sont alignées sur son texte. Même style (`label`), même couleur, même animation que les mentions d'origine.

---

# Entraînements / Planning (Sprint 5)
Troisième section de la homepage (hero → histoire → entraînements). Elle répond à « Quand puis-je venir m'entraîner ? », composée comme une feuille de combat plutôt que comme un tableau.

## Composition
```text
desktop (12 colonnes)
— PLANNING
À CHAQUE JOUR,
SON ROUND.
7 JOURS — 10 SÉANCES PAR SEMAINE

JOUR          HORAIRE          ENCADREMENT          PRATIQUE
▬▬───────────────────────────────────────────────────────────
LUNDI         18H — 20H30      Laurent Vantheemst   BEA / BA
                               Jean-Paul Guinvanna
▬▬───────────────────────────────────────────────────────────
MERCREDI      15H30 — 16H30    Manuel Tavares       6/11 ans
              16H30 — 18H      Manuel Tavares       12/16 ans
              18H — 20H        Christophe Tiozzo    BEA / BA
                               Manuel Tavares       Sparing / Préparation physique
…
Voir le planning complet →
```
- Fond crème, texte noir. Un filet plein en tête de section la sépare de la section histoire, crème elle aussi.
- Jour : colonnes 1 à 4, en Anton (`text-display-l`). Créneaux : colonnes 5 à 12, sur trois sous-colonnes (horaire, encadrement, pratique).
- Un filet fin par jour, avec une amorce rouge. Un filet plus léger entre deux créneaux d'un même jour.
- La hauteur d'un jour suit son nombre de créneaux : le mercredi (trois) est le bloc le plus haut, le dimanche (deux) vient ensuite.
- Horaires en Anton (`text-heading`), au format « 18h — 20h30 ».
- Pratique : disciplines ou tranche d'âge en gras, contenu de la séance dessous en atténué.
- Ni carte, ni fond par séance, ni radius, ni ombre, ni image.

## Mobile et tablet
- Mobile : lecture verticale — le jour, puis chaque créneau empilé (horaire, encadrants, pratique). Pas de navigation par jour : dix créneaux se parcourent d'un geste.
- Tablet (768) : le jour au-dessus, les créneaux sur trois colonnes.

## Rouge
Amorce des filets, ligne accentuée du titre, survol d'un créneau. Jamais en aplat sur une séance.

Le planning est statique : aucun jour n'est mis en avant automatiquement.

## Survol (desktop)
L'horaire passe au rouge, un trait rouge s'avance à gauche, le créneau glisse de 4px. Pas de zoom, pas de carte flottante, pas d'infobulle.

---

# Page Coachs (Sprint 6)
« Les visages du club ». Page sombre, un coach après l'autre, chacun dans sa propre composition.

## Structure
1. **Introduction** : sur-titre « Les visages du club », H1 « Ceux qui font / vivre la salle. », courte phrase à droite.
2. **Six profils**, séparés par un filet : numéro et trait rouge, nom en Anton sur deux lignes, photo, qualifications, style de cours en rouge, description.
3. **Sortie** (fond crème) : rappel du planning, CTA Inscription, lien vers le planning.

## Compositions desktop
| # | Coach | Composition |
|---|---|---|
| 01 | Laurent Vantheemst | grande image à gauche (col. 1–5), texte à droite |
| 02 | Paul Marius | texte à gauche, grande image à droite (col. 8–12) |
| 03 | Manuel Tavares | image décalée d'une colonne (col. 2–6), texte resserré |
| 04 | Matthias Hourdé | image plus étroite en 3/4 (col. 2–5), texte à droite |
| 05 | Jérôme Loubet | texte à gauche, état « Photo à venir » à droite |
| 06 | Jean-Paul Guinvanna | grande photo en situation à gauche (col. 1–5), texte à droite |

Sous 1024px, tous les profils se lisent dans le même ordre : numéro et nom, photo, informations. Pas de carrousel. Ni carte, ni avatar rond, ni ombre.

## Photographies
- Photos réelles uniquement, fournies par le client. Seul traitement : passage en noir et blanc (filtre CSS), pour unifier des sources différentes. Aucune retouche des visages, aucune image générée.
- Originaux : `public/assets/coach/` (non modifiés). Fichiers servis : `public/assets/images/coaches/` (AVIF + JPEG).
- Les portraits de Laurent, Paul, Manuel et Matthias font environ 450 × 650px : ils sont agrandis en desktop. Des versions plus grandes sont à demander.

## État « Photo à venir »
`CoachMedia` sans photographie : cadre au même ratio, fond noir, grain, initiales en très grand et très atténuées, trait rouge, mention « Photo à venir ». Annoncé « Photo de Jérôme Loubet à venir » aux lecteurs d'écran. Ajouter la photo dans `src/data/coaches.ts` suffit à le remplacer, sans toucher à la mise en page.

---

# Page Cours (Sprint 7)
« Qu'est-ce que je vais faire ? Quel entraînement me correspond ? » Page entièrement typographique, sans image, qui alterne fonds noir et crème.

| # | Section | Fond | Contenu |
|---|---|---|---|
| 1 | Ouverture | noir | « Les cours », H1 « Apprendre. / Travailler. / Combattre. », phrase, liens Planning et Coachs |
| 2 | Introduction | crème | « Pas une seule / façon de boxer. », deux phrases en retrait à droite |
| 3 | Approches | noir | six lignes numérotées : titre en très grand, phrase en rouge, ce qu'on y travaille ou description, coachs associés |
| 4 | Esprit club | crème | bloc à part pour l'ambiance des séances de Paul Marius |
| 5 | Pour qui ? | noir | quatre questions en très grand, chacune avec un profil et une phrase |
| 6 | Vers le planning | crème | « 7 jours. / 10 séances. / Une salle. », liens Planning et Coachs |

- Approches : numéro en colonne 1, titre décalé d'une colonne une ligne sur deux, détail en colonnes 9 à 12. Un filet par ligne avec une amorce rouge, comme au planning. Ni carte ni fond.
- L'ouverture tient dans un écran, y compris en 1280 × 720 : son titre est borné par la hauteur (`16svh`).
- Les deux nombres de la dernière section sont calculés à partir du planning.

---

# Page Planning (Sprint 9)
La section de l'accueil est un aperçu ; `/planning` est la page pratique. Même feuille, mêmes données, même composant.

| # | Section | Fond | Contenu |
|---|---|---|---|
| 1 | Ouverture | noir | « Le planning », H1 « À chaque jour, / son round. » (titre partagé avec l'accueil), « 7 jours. 10 séances. À vous de choisir votre rythme. », liens Cours et Coachs |
| 2 | La feuille | crème | les sept jours numérotés 01 à 07, chacun avec ses séances |
| 3 | Repères | noir | « Quel rythme vous correspond ? » : cinq repères de lecture et les séances correspondantes |
| 4 | Coachs | crème | « Chaque séance a son approche. », lien vers `/coachs` |
| 5 | Clôture | noir | « Votre créneau / est là. », CTA Inscription, lien Cours |

- L'ouverture est compacte (environ 470 à 630px) : la feuille s'annonce dès le premier écran.
- Feuille : `ScheduleSheet`, partagée avec l'accueil ; la page ajoute seulement la numérotation des jours.
- Aucun filtre, onglet, tableau, menu déroulant ni calendrier : une page statique. Aucune logique de date ; pas de « Aujourd'hui ».
- Pas de légende BEA / BA (définition officielle non fournie). « Sparing » conservé tel quel.

## Repères de lecture
Technique, Cardio, Préparation physique, Assaut, Jeunes. Ce ne sont ni des filtres ni des catégories officielles. Chaque repère affiche la mention du planning sur laquelle il s'appuie, puis les séances concernées (« Mardi 18h »), calculées à partir des données.
