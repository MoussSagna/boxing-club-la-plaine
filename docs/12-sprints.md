# Sprint Plan

## Sprint 0 — Setup & Documentation
Status: COMPLETED (2026-10-04)

### Objectif
Préparer le projet et créer la documentation.

### Tâches
- [x] analyser repository
- [x] analyser stack
- [x] analyser assets
- [x] créer `/docs`
- [x] valider architecture

### Périmètre élargi (demande du brief de setup)
Le brief de setup a demandé de poser dès le Sprint 0 une partie des fondations
prévues au Sprint 1 (voir `15-decisions-log.md`) :
- [x] stack installée : React 19, Vite 8, TypeScript 6 strict, Tailwind CSS 4, shadcn/ui, GSAP
- [x] design tokens centralisés (`src/styles/tokens.css`)
- [x] typographie (Anton + Inter, auto-hébergées)
- [x] architecture `src/` et `public/assets/`
- [x] routing des 8 pages + 404 (pages en structure minimale)
- [x] data layer (`src/data/`, sans donnée inventée)
- [x] infrastructure GSAP (ScrollTrigger, hooks, reduced motion)
- [x] composants fondamentaux (Navbar, MobileMenu, Button, SectionTitle, SectionEyebrow, ImageReveal, ParallaxImage, PageTransition, GrainOverlay, Footer)
- [x] fondations responsive, accessibilité et SEO

### Validation
- [x] docs présentes
- [x] architecture validée
- [x] aucune donnée inventée
- [x] `npm run build` et `npm run lint` sans erreur ni avertissement
- [x] audit navigateur : 8 routes + 404, 8 largeurs (375 → 1920) sans débordement horizontal, menu mobile, clavier, reduced motion, aucune erreur console

---

## Sprint 1 — Foundation
Status: COMPLETED (2026-10-04)

### Objectif
Transformer les fondations du Sprint 0 en un design system exploitable : le hero et les sections doivent pouvoir se construire uniquement avec ces primitives.

### Tâches
- [x] design tokens audités, aucune valeur hexadécimale dans les composants
- [x] règle de contraste du rouge documentée et appliquée
- [x] typographie : Display XL / L / M, Heading, Body, Small, Label, Micro
- [x] container (`container-site`) et grille (`grid-site`) vérifiés sur 8 largeurs
- [x] `Section` (thèmes dark / cream, espacements)
- [x] boutons : primary, secondary, text, `IconButton`
- [x] liens : `AppLink` (navigation, CTA, éditorial)
- [x] images : `MediaFrame`, `ImageReveal`, `ParallaxImage`, traitements pilotés par props
- [x] `GrainOverlay` (intensité, position, désactivation)
- [x] `SectionEyebrow`, `SectionTitle`, `SectionHeader`
- [x] `EditorialCard`, base des cartes pratiques / coachs / actualités
- [x] Navbar et menu mobile audités
- [x] tokens d'animation (durées, eases, distances, cascades)
- [x] infrastructure GSAP auditée (nettoyage, StrictMode, reduced motion)
- [x] page interne `/design-system`, non indexée

### Validation
- [x] `npm run build` et `npm run lint` sans erreur ni avertissement
- [x] 8 routes + `/design-system` + 404 : affichage, metadata, layout
- [x] aucun débordement à 375, 390, 430, 768, 1024, 1280, 1440, 1920
- [x] clavier : Tab, Shift+Tab, Entrée, Échap, focus visible
- [x] contraste WCAG AA sur tous les textes rendus
- [x] aucune erreur ni avertissement console (React, GSAP, réseau)
- [x] aucune donnée inventée

---

## Sprint 2 — Navigation + Page Transitions
Status: COMPLETED (2026-10-04)

### Objectif
Construire la navigation définitive et un système de transitions de pages cohérent avec la direction artistique.

### Critères de validation
- [x] Navbar desktop finalisée
- [x] Navbar mobile finalisée
- [x] Menu mobile animé
- [x] CTA fonctionnel
- [x] navigation active
- [x] transitions de pages fonctionnelles
- [x] retour navigateur fonctionnel
- [x] deep links fonctionnels
- [x] reduced motion fonctionnel
- [x] keyboard navigation fonctionnelle
- [x] responsive validé (375, 390, 430, 768, 1024, 1280, 1440, 1920)
- [x] build OK
- [x] lint OK
- [x] console propre
- [x] Design System Demo mise à jour
- [x] audit Git terminé (recommandations en attente de validation)

---

## Sprint 3 — Hero / Opening Experience
Status: COMPLETED (2026-10-04) — finalisé avec la photographie réelle

### Objectif
Créer le hero de la homepage, signature visuelle du site.

### Critères de validation
- [x] Hero visuellement fort (vérifié avec la photographie réelle)
- [x] vraie hiérarchie éditoriale
- [x] H1 clair
- [x] photographie remplaçable
- [x] header transparent fonctionnel
- [x] CTA fonctionnel
- [x] animation GSAP propre
- [x] reduced motion
- [x] mobile travaillé séparément
- [x] aucune donnée inventée
- [x] aucun overflow
- [x] lint OK
- [x] build OK
- [x] console propre
- [x] design-system mis à jour
- [x] aucune régression Sprint 1/2

### Finalisation avec la photographie réelle
- [x] photographie intégrée sans retouche, en AVIF + JPEG sur 3 largeurs
- [x] cadrage desktop et mobile, point focal réglé
- [x] contraste mesuré sur les pixels réels derrière chaque texte, à 7 tailles d'écran
- [x] CTA du header en contour au-dessus du hero : validé par le client

### Reste à faire hors sprint
- valider l'accroche qui remplacera « Paris 15 — Club de boxe »
- obtenir une version plus large de la photographie (≥ 2600px)

---

## Sprint 4 — Histoire
Status: TODO

- intro
- timeline
- images
- ScrollTrigger

---

## Sprint 5 — Pratiques
Status: TODO

- cards
- grille
- interactions
- responsive

---

## Sprint 6 — Planning
Status: TODO

- données planning
- filtres
- responsive
- interactions

---

## Sprint 7 — Coachs
Status: TODO

- portraits
- bios
- hover
- responsive

---

## Sprint 8 — Actualités
Status: TODO

- cards
- listing
- article structure
- responsive

---

## Sprint 9 — Inscription & Contact
Status: TODO

- CTA
- inscription
- contact
- formulaires si nécessaires

---

## Sprint 10 — Responsive
Status: TODO

- audit mobile
- tablet
- desktop
- corrections

---

## Sprint 11 — Motion Polish
Status: TODO

- page transitions
- reveals
- parallax
- hover
- reduced motion

---

## Sprint 12 — SEO & Accessibility
Status: TODO

- metadata
- semantic HTML
- keyboard
- contrast
- structured data

---

## Sprint 13 — Performance
Status: TODO

- images
- fonts
- bundle
- lazy loading
- animations

---

## Sprint 14 — QA Final
Status: TODO

- build
- lint
- TypeScript
- console
- responsive
- accessibility
- SEO
- animation
- liens
- contenu

## Règle
Ne pas passer au sprint suivant tant que les critères de validation du sprint courant ne sont pas satisfaits.
