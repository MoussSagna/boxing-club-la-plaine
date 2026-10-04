# Components

## Global
- Navbar
- MobileMenu
- Footer
- PageTransition
- GrainOverlay

## Typography
- SectionEyebrow
- SectionTitle
- DisplayTitle
- BodyText

## UI
- Button
- IconButton
- Link
- Divider

## Media
- ImageReveal
- ParallaxImage
- MediaFrame

## Content
- PracticeCard
- CoachCard
- NewsCard
- ScheduleItem
- TimelineItem

## Sections
- Hero
- IntroSection
- HistoryTimeline
- PracticeGrid
- ScheduleSection
- CoachesSection
- NewsSection
- FinalCTA

## Règles
Les composants doivent être :
- petits
- composables
- typés
- réutilisables
- indépendants autant que possible du contenu

Le contenu répétitif doit vivre dans `src/data`.

---

# État d'implémentation (Sprint 1)

| Composant prévu | Implémentation | Fichier |
|---|---|---|
| Navbar | fait (fondation) | `components/Navbar.tsx` |
| MobileMenu | fait (fondation) | `components/MobileMenu.tsx` |
| Footer | fait (fondation) | `components/Footer.tsx` |
| PageTransition | fait (fondation) | `components/PageTransition.tsx` |
| GrainOverlay | fait | `components/GrainOverlay.tsx` |
| SectionEyebrow | fait | `components/SectionEyebrow.tsx` |
| SectionTitle | fait, avec `Accent` | `components/SectionTitle.tsx` |
| DisplayTitle | couvert par `SectionTitle` (`size="xl"`) | — |
| BodyText | couvert par les utilitaires `text-body`, `text-small` | — |
| Button | fait (`primary`, `secondary`, `text`) | `components/ui/button.tsx` |
| IconButton | fait | `components/ui/icon-button.tsx` |
| Link | fait, nommé `AppLink` | `components/ui/link.tsx` |
| Divider | couvert par `border-t border-border` | — |
| ImageReveal | fait | `components/ImageReveal.tsx` |
| ParallaxImage | fait | `components/ParallaxImage.tsx` |
| MediaFrame | fait | `components/MediaFrame.tsx` |
| PracticeCard, CoachCard, NewsCard | base commune `EditorialCard` | `components/EditorialCard.tsx` |
| ScheduleItem, TimelineItem | à faire (Sprints 6 et 4) | — |
| Sections (Hero, etc.) | à faire (Sprint 3 et suivants) | `sections/` |

Ajoutés hors liste initiale : `Section` (thème + espacement + container), `SectionHeader` (sur-titre + titre + introduction + actions), `Logo`, `PagePlaceholder` (temporaire).

Le détail des props est dans `04-design-system.md` ; la démonstration visuelle est sur `/design-system`.

## Sprint 2 — Navigation et transitions

| Composant | État | Notes |
|---|---|---|
| Navbar | définitif | sticky, deux états (dark / light), navigation centrée, CTA à droite |
| MobileMenu | définitif | plein écran : nom du club, 5 liens, CTA, Contact et localisation |
| PageTransition | définitif | rideau noir avec le nom du club |
| AppLink | étendu | nouvelle variante `nav-large` (grands liens du menu mobile) |

Nouveau hook : `useHeaderTheme(headerRef)` renvoie le thème de la section située sous le header.

Aucun nouveau bouton, lien ou carte : le CTA utilise `Button`, tous les liens utilisent `AppLink`. La variante `nav-large` est la seule addition, justifiée par l'état actif propre aux grands liens (texte rouge, autorisé en grand corps).

## Sprint 3 — Hero

Dossier `src/sections/hero/`.

| Composant | Rôle |
|---|---|
| `Hero` | Composition et animation d'entrée ; reçoit son contenu en props |
| `HeroMedia` | Image plein cadre, point focal, traitement, voile de lisibilité |
| `HeroTitle` | H1 monumental, lignes masquées pour le reveal |
| `HeroMeta` | Mentions courtes au-dessus du titre |
| `HeroActions` | CTA principal et lien secondaire |
| `HeroScrollIndicator` | Indicateur de scroll décoratif |

Réutilisés : `Section`, `SectionEyebrow`, `Accent`, `Button`, `AppLink`, `MediaFrame`, `GrainOverlay`, `useReducedMotion`. `HeroContent` n'est pas un composant séparé : le bloc de contenu est une simple `div` dans `Hero`.

Évolutions de composants existants :
- `MediaFrame` : props `priority` (image principale, chargée en priorité) et `style`.
- `Navbar` : état `transparent`.
- `useHeaderTheme` : renvoie `{ theme, transparent }`.

Contenu : `src/data/home.ts` (`HOME_HERO`), typé par `HeroContent`.
