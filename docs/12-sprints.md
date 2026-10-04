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
Status: TODO

Les éléments ci-dessous ont été amorcés au Sprint 0. Le Sprint 1 les valide
visuellement, les ajuste et complète les composants de base restants
(`06-components.md` : DisplayTitle, BodyText, IconButton, Link, Divider, MediaFrame).

- design tokens (amorcé)
- Tailwind (amorcé)
- fonts (amorcé)
- layout (amorcé)
- container (amorcé)
- grid (amorcé)
- boutons (amorcé)
- composants de base (partiel)

---

## Sprint 2 — Navigation
Status: TODO

- navbar desktop
- menu mobile
- transitions
- responsive
- accessibilité

---

## Sprint 3 — Hero
Status: TODO

- hero
- image
- typography
- CTA
- animation d'entrée
- scroll indicator

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
