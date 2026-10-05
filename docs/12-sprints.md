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

## Sprint 4 — Histoire du club
Status: COMPLETED (2026-10-05) — en local, en attente de validation

### Objectif
Créer la section « Histoire du club » de la homepage, juste après le hero, avec les informations officielles communiquées par le club.

### Critères de validation
- [x] vraie histoire du club intégrée
- [x] 1991 / 2000 / 2019 correctement présentés
- [x] aucune information inventée
- [x] timeline éditoriale
- [x] phrase sur l'esprit familial
- [x] design cohérent avec le hero
- [x] pas de cartes SaaS
- [x] mobile travaillé
- [x] reduced motion
- [x] accessible
- [x] design-system mis à jour
- [x] build OK
- [x] lint OK
- [x] aucune régression
- [x] aucun commit Git

### Hors section
- données des sept encadrants enregistrées dans `src/data/coaches.ts`, non affichées (futur sprint `/coachs`)

### Reste à faire hors sprint
- photographie d'archive ou du club pour la zone média

---

## Sprint 5 — Cours & Planning
Status: COMPLETED (2026-10-05) — en local, en attente de validation

### Objectif
Créer la section de la homepage consacrée aux entraînements et au planning, avec les horaires officiels.

Le plan initial séparait « Pratiques » (Sprint 5) et « Planning » (Sprint 6). Ils sont réunis ici pour la homepage. Restent à faire dans des sprints ultérieurs : les pages `/cours` et `/planning`.

### Critères de validation
- [x] toutes les séances fournies sont présentes (10 sur 10)
- [x] aucun horaire inventé
- [x] aucun coach inventé
- [x] mercredi correctement traité (trois créneaux distincts)
- [x] dimanche correctement traité (deux séances distinctes)
- [x] BEA / BA conservés
- [x] Technique / Cardio / Sparing / Préparation physique / Passage de gants conservés
- [x] design éditorial
- [x] pas de grille SaaS classique
- [x] mobile lisible
- [x] animation subtile
- [x] reduced motion
- [x] accessibilité
- [x] design-system mis à jour
- [x] lint OK
- [x] build OK
- [x] aucune régression des Sprints 0–4
- [x] aucun commit Git

---

## Sprint 6 — Coachs : les visages du club
Status: COMPLETED (2026-10-05) — en local, en attente de validation

- [x] page `/coachs` : introduction, six profils, sortie vers planning et inscription
- [x] six coachs actuels ; Christophe Tiozzo retiré des coachs et du planning
- [x] photos réelles uniquement ; état « Photo à venir » pour Jérôme Loubet
- [x] six compositions différentes en desktop, lecture verticale en mobile
- [x] reveals GSAP, léger déplacement photographique, reduced motion
- [x] métadonnées de la page
- [x] lint OK, build OK, console propre

Reste à faire : pages `/cours` et `/planning` ; photo de Jérôme Loubet ; portraits plus grands.

---

## Sprint 7 — Les cours : trouver son rythme
Status: COMPLETED (2026-10-05) — en local, en attente de validation

- [x] page `/cours` : ouverture, introduction, six approches, bloc Esprit club, « Pour qui ? », passage vers le planning
- [x] données dans `src/data/courses.ts`, coachs et planning réutilisés
- [x] page typographique, sans image ni dépendance
- [x] reveals GSAP, reduced motion
- [x] métadonnées de la page
- [x] lint OK, build OK, console propre

Reste à faire : page `/planning`.

---

## Sprint 8 — Page Club
Status: EN ATTENTE (décision du client)

Mis en attente : des témoignages de membres seront récupérés pour enrichir la page. Ne pas développer `/club` avant.

---

## Sprint 9 — Planning complet : trouver son créneau
Status: COMPLETED (2026-10-05) — en local, en attente de validation

- [x] page `/planning` : ouverture, feuille numérotée, repères, renvoi coachs, clôture
- [x] 10 séances sur 10 conformes ; mercredi (3) et dimanche (2) distincts
- [x] un seul système de planning (`ScheduleSheet` partagé avec l'accueil)
- [x] aucun filtre, aucune logique de date, pas de légende BEA / BA
- [x] reveals GSAP, survol, reduced motion
- [x] métadonnées de la page
- [x] lint OK, build OK, console propre

---

## Sprints suivants (plan initial, à renuméroter)

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
