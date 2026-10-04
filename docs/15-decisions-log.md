# Decisions Log

Ce fichier conserve les décisions structurantes du projet.

## Format
Chaque décision doit contenir :
- date
- décision
- raison
- impact
- statut

## 2026-10-04 — Initial setup
**Décision :** utiliser React + Vite + TypeScript + Tailwind CSS + shadcn/ui + GSAP.

**Raison :** obtenir une base moderne, performante et adaptée à une expérience fortement animée.

**Direction visuelle :** sport éditorial, cinématique, brut, premium et parisien.

**Palette :** noir `#0A0A0A`, crème `#F1EDE3`, rouge `#C8102E`.

**Typographie :** Anton pour le display, Inter/Geist Sans pour le texte.

**Statut :** validé pour le setup.

---

## 2026-10-04 — Sprint 0 : décisions de setup

### Périmètre du Sprint 0 élargi
**Décision :** poser dès le Sprint 0 les tokens, la typographie, le layout, le routing et les composants fondamentaux, alors que `12-sprints.md` les plaçait au Sprint 1.
**Raison :** conflit entre le brief de setup (qui les demande) et le plan de sprints. Le brief étant la consigne la plus récente, il a été suivi.
**Impact :** le Sprint 1 devient un sprint de validation, d'ajustement et de complétion des composants de base.
**Statut :** à valider.

### Projet créé à partir de zéro
**Décision :** générer le projet avec le template officiel Vite `react-ts`.
**Raison :** le dépôt ne contenait aucun code (docs, logo, favicon, maquette et PDF uniquement).
**Impact :** React 19, Vite 8, TypeScript 6, npm. Aucun fichier existant supprimé ni déplacé.
**Statut :** appliqué.

### Tailwind CSS 4, configuration en CSS
**Décision :** Tailwind 4 via `@tailwindcss/vite`, sans `tailwind.config.js`. Les tokens vivent dans `src/styles/tokens.css` (`@theme`).
**Raison :** une seule source de vérité, directement exploitable en utilitaires (`bg-red`, `text-cream`, `text-display-xl`…).
**Impact :** la palette Tailwind par défaut est désactivée (`--color-*: initial`) : seules les 6 couleurs du projet existent.
**Statut :** appliqué.

### Tokens sémantiques et thèmes de section
**Décision :** ajouter des tokens sémantiques (`background`, `foreground`, `primary`, `border`, `ring`, `accent-text`…) et un attribut `data-theme="dark" | "cream"` par section.
**Raison :** convention shadcn/ui ; un même composant fonctionne sur fond noir et sur fond crème sans variante dédiée.
**Impact :** les composants utilisent les tokens sémantiques plutôt que les couleurs brutes.
**Statut :** appliqué.

### Contraste du rouge sur noir
**Décision :** le rouge `#C8102E` sur noir `#0A0A0A` est réservé au grand texte (titres display) et aux éléments graphiques. Les petits textes accentués sur fond noir sont en crème avec un trait rouge.
**Raison :** ratio rouge/noir = 3,4:1 (insuffisant pour du petit texte, AA = 4,5:1). Rouge/crème = 5:1 et blanc/rouge = 5,9:1 sont conformes.
**Impact :** écart avec `maquette.png`, où les sur-titres sont en petit rouge sur noir. À arbitrer.
**Statut :** à valider.

### shadcn/ui en installation manuelle
**Décision :** `components.json` + `cn()` + `Button` écrits à la main, sans `shadcn init`.
**Raison :** `init` injecte un thème neutre, des radius et des dépendances contraires à la direction artistique. Le CLI reste utilisable (`npx shadcn add …`) pour les composants futurs.
**Impact :** dépendances limitées à `class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/react-slot`, `lucide-react`.
**Statut :** appliqué.

### Polices auto-hébergées
**Décision :** Anton via `@fontsource/anton`, Inter via `@fontsource-variable/inter`.
**Raison :** pas d'appel à Google Fonts (performance, RGPD), versions figées par npm.
**Impact :** les fichiers de police sont émis par le build ; `public/assets/fonts/` reste vide pour l'instant.
**Statut :** appliqué.

### Échelle typographique fluide
**Décision :** tailles en `clamp()` : Display XL 51→160px, Display L 40→110px, Display M 32→64px, Body 16→20px, Small 12→14px.
**Raison :** respecter les plages desktop de `03-typography.md` tout en gardant « DE LA PLAINE » sur une ligne à 375px.
**Impact :** pas de changement de taille par breakpoint à gérer dans les composants.
**Statut :** appliqué, à ajuster au Sprint 1 si besoin.

### Routing
**Décision :** React Router 8 (`createBrowserRouter`), routes centralisées dans `src/data/navigation.ts`, page 404 ajoutée.
**Raison :** aucun routeur présent ; 8 pages à servir.
**Impact :** site en SPA : l'hébergement devra rediriger toutes les URL vers `index.html`.
**Statut :** appliqué.

### GSAP
**Décision :** `gsap` + `@gsap/react`. Plugins enregistrés une seule fois dans `src/lib/gsap.ts`. Hooks `useReducedMotion`, `useScrollReveal`, `useParallax`. Eases et durées dans `src/lib/motion.ts`.
**Raison :** `useGSAP` gère le contexte et le nettoyage ; pas de hook `useGsap` maison redondant.
**Impact :** en reduced motion, pas de parallax ni de clip-path, uniquement des fades courts.
**Statut :** appliqué.

### Menu mobile en `<dialog>` natif
**Décision :** le menu mobile est un `<dialog>` ouvert avec `showModal()`, animé par GSAP.
**Raison :** piège de focus, touche Échap, fond inerte et retour du focus fournis par le navigateur, sans dépendance supplémentaire.
**Impact :** animation finale à affiner au Sprint 2.
**Statut :** appliqué.

### Métadonnées SEO
**Décision :** métadonnées par défaut en statique dans `index.html`, mises à jour par page via le hook `usePageMeta`. `robots.txt`, `sitemap.xml` et JSON-LD `SportsClub` minimal (nom, URL, logo).
**Raison :** les robots de partage social n'exécutent pas le JavaScript ; aucune donnée factuelle inventée.
**Impact :** en SPA, les métadonnées par page ne sont vues que par les robots qui exécutent le JS. Un pré-rendu est à évaluer au Sprint 12. Le domaine `www.boxingclubdelaplaine.com` est supposé conservé.
**Statut :** appliqué, pré-rendu à décider.

### Lint et formatage
**Décision :** conserver oxlint (fourni par le template Vite). Pas de Prettier.
**Raison :** aucun outil de formatage n'était présent ; ne rien ajouter d'inutile.
**Impact :** `npm run lint` = oxlint.
**Statut :** appliqué.

### Logo
**Décision :** logo officiel utilisé tel quel, seulement redimensionné (256 / 512px, favicons 32 / 180 / 192px). Un masque circulaire CSS cache les coins du fichier, qui n'a pas de transparence.
**Raison :** les fichiers fournis font 1254px et 1,2 Mo ; aucune modification du dessin.
**Impact :** une version SVG ou PNG transparente est à demander au club.
**Statut :** appliqué.

### Maquette non considérée comme source de données
**Décision :** `maquette.png` sert de référence visuelle uniquement. Ses contenus (« Depuis 1991 », noms de coachs, horaires, tranches d'âge, textes) ne sont pas repris.
**Raison :** règle « ne pas inventer » ; ces informations ne figurent dans aucun document validé.
**Impact :** `coaches`, `schedule`, `news`, `history` sont vides ; les descriptions des pratiques valent `TODO`.
**Statut :** en attente des données du club.
