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

## Sprint 4 — Histoire du club

Dossier `src/sections/club-history/`.

| Composant | Rôle |
|---|---|
| `ClubHistory` | Composition, thème et reveals au scroll ; reçoit son contenu en props |
| `HistoryHeading` | Sur-titre et titre monumental, lignes masquées pour le reveal |
| `HistoryText` | Paragraphes du récit |
| `HistoryTimeline` | Liste ordonnée des dates |
| `TimelineItem` | Une date : filet, année, événement |
| `HistoryPhilosophy` | Phrase de clôture, avec un passage mis en avant |
| `HistoryMedia` | Photographie d'archive ; n'affiche rien tant qu'il n'y en a pas |
| `HistoryAction` | Lien discret vers `/club` |

Réutilisés : `Section`, `SectionEyebrow`, `SectionTitle`, `Accent`, `Button`, `AppLink`, `MediaFrame`, `useReducedMotion`. Aucune nouvelle primitive.

Supprimé : l'aperçu temporaire « Plus qu'une salle. Une histoire. » posé au Sprint 0 sur la homepage.

## Sprint 5 — Entraînements / Planning

Dossier `src/sections/schedule/`.

| Composant | Rôle |
|---|---|
| `TrainingSchedule` | Section, repère chiffré, reveals au scroll |
| `ScheduleHeading` | Sur-titre, titre monumental, repère chiffré |
| `ScheduleDayRow` | Un jour : nom en très grand et liste de ses créneaux |
| `ScheduleSession` | Un créneau : horaire, encadrants, pratique |

Réutilisés : `Section`, `SectionEyebrow`, `SectionTitle`, `Accent`, `Button`, `AppLink`, `useReducedMotion`. Aucune nouvelle primitive, aucune dépendance.

Utilitaires : `src/lib/schedule.ts` (`formatTime`), `getCoachName` dans `src/data/coaches.ts`, `revealTrigger` dans `src/lib/gsap.ts`.

`ScheduleItem` (prévu à l'origine) est remplacé par `ScheduleSession`.

## Sprint 6 — Page Coachs

Dossier `src/sections/coaches/`.

| Composant | Rôle |
|---|---|
| `CoachesIntro` | En-tête de page : sur-titre, H1, introduction |
| `CoachesList` | Enchaîne les profils et leur attribue une composition |
| `CoachProfile` | Un profil : composition, reveal au scroll |
| `CoachHeading` | Numéro, trait rouge, nom |
| `CoachDetails` | Qualifications, style de cours, description |
| `CoachMedia` | Photographie réelle, ou état « Photo à venir » |

Réutilisés : `Section`, `SectionEyebrow`, `SectionTitle`, `SectionHeader`, `Accent`, `Button`, `AppLink`, `ParallaxImage`, `MediaFrame`, `GrainOverlay`. Aucune dépendance ajoutée.

`CoachCard` (prévu à l'origine) est remplacé par `CoachProfile`. `PagePlaceholder` n'est plus utilisé par `/coachs`.

## Sprint 7 — Page Cours

Dossier `src/sections/courses/` : `CoursesHero`, `CoursesIntro`, `CoursesApproaches`, `ApproachItem`, `CoursesSpotlight`, `CoursesProfiles`, `CoursesOutro`, `MaskedLine`.

Hook : `src/hooks/useRowReveal.ts`. Données : `src/data/courses.ts`. Réutilisés : `Section`, `SectionEyebrow`, `SectionTitle`, `Accent`, `Button`, `AppLink`, `getCoachName`, `scheduleDays`. Aucune dépendance, aucune image.

`PracticeCard` et `src/data/practices.ts` (prévus au Sprint 0) ne sont pas utilisés par cette page.

## Sprint 9 — Page Planning

Dans `src/sections/schedule/` :

| Composant | Rôle |
|---|---|
| `ScheduleSheet` | **nouveau** — la feuille (intitulés de colonnes, jours, reveal). Utilisée par l'accueil et par `/planning` |
| `ScheduleDayRow` | prop `number` ajoutée (numérotation des jours) |
| `TrainingSchedule` | allégé : délègue la feuille à `ScheduleSheet` |
| `PlanningHero` | ouverture de la page |
| `PlanningMarkers` | repères de lecture, calculés à partir du planning |
| `PlanningCallout` | bloc d'appel (renvoi coachs, clôture) |

Données : `src/data/planning.ts` (textes de la page uniquement). Les horaires restent dans `src/data/schedule.ts`, seule source. `MaskedLine` et `useRowReveal` sont repris de la page Cours.

## Sprint 10 — Page Inscription

Dossier `src/sections/registration/` : `RegistrationHero`, `RegistrationTrial`, `RegistrationSteps`, `RegistrationStep`, `RegistrationChecklist`, `RegistrationContact`, et `shared.tsx` (`RichText`, `BigEmail`, `WRAPPING_BUTTON`).

Données : `src/data/registration.ts`. Fichiers : `public/assets/documents/`. Réutilisés : `Section`, `SectionEyebrow`, `SectionTitle`, `Button`, `AppLink`, `MaskedLine`, `useRowReveal`. Aucune dépendance.
