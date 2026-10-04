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

---

## 2026-10-04 — Sprint 1 : décisions

### Contraste du rouge sur noir — tranché
**Décision :** le rouge reste la couleur de marque, mais jamais en petit texte sur noir. Petits textes sur noir en crème ou blanc ; le rouge passe dans les grands titres, chiffres, traits, bordures et CTA.
**Raison :** arbitrage du client sur le point ouvert au Sprint 0 (ratio 3,4:1).
**Impact :** règle écrite dans `02-colors.md`, portée par le token `accent-text`. Écart assumé avec `maquette.png`.
**Statut :** validé.

### Périmètre du Sprint 0 — validé
**Décision :** l'élargissement du Sprint 0 est accepté ; le Sprint 1 a consolidé ces fondations.
**Statut :** validé.

### Hiérarchie typographique à 8 niveaux
**Décision :** Display XL, L, M, Heading, Body, Small, Label, Micro. `Label` s'ajoute aux 7 niveaux demandés : c'est le Small en uppercase espacé, utilisé par la navigation, les boutons et les sur-titres.
**Raison :** éviter de répéter uppercase + letter-spacing dans chaque composant.
**Impact :** utilitaires `display`, `label`, `micro` et tailles `text-display-*`, `text-heading`, `text-body`, `text-small`.
**Statut :** appliqué.

### Boutons : variantes plutôt que composants séparés
**Décision :** PrimaryButton, SecondaryButton et TextButton sont les variantes `primary`, `secondary`, `text` d'un seul `Button`. `IconButton` est un composant à part.
**Raison :** convention shadcn/ui, une seule source pour les états et les tailles. `IconButton` est séparé pour rendre `aria-label` obligatoire.
**Impact :** la variante `link` du Sprint 0 est renommée `text`.
**Statut :** appliqué.

### `AppLink` plutôt que `Link`
**Décision :** le composant de lien s'appelle `AppLink`.
**Raison :** éviter la collision de nom avec le `Link` de React Router.
**Impact :** `06-components.md` mis à jour.
**Statut :** appliqué.

### Composants prévus couverts par des utilitaires
**Décision :** pas de composant `DisplayTitle`, `BodyText` ni `Divider`.
**Raison :** `SectionTitle`, les utilitaires de texte et `border-t border-border` couvrent ces besoins ; des composants seraient des enveloppes vides.
**Impact :** à créer plus tard seulement si un besoin réel apparaît.
**Statut :** appliqué.

### Une base de carte unique
**Décision :** `EditorialCard` avec deux variantes (`overlay`, `stacked`) sert de base aux cartes pratiques, coachs et actualités.
**Raison :** structure commune (image, numéro, titre, description, CTA, survol).
**Impact :** les cartes métier seront de fines spécialisations aux Sprints 5, 7 et 8.
**Statut :** appliqué.

### Traitements d'image par props
**Décision :** `MediaFrame` porte `ratio`, `treatment`, `grain`, `vignette` ; aucun effet par défaut. Les traitements sont des filtres CSS.
**Raison :** effets contrôlables image par image, sans retoucher les fichiers.
**Impact :** le dégradé sombre sous le texte des cartes `overlay` est fonctionnel (lisibilité), pas décoratif.
**Statut :** appliqué.

### Tokens d'animation renommés
**Décision :** `DURATION.fast / normal / slow / slower`, `EASE`, `DISTANCE`, `STAGGER`, `SCROLL_START`.
**Raison :** convention par vitesse plutôt que par usage ; ajout des distances et des cascades.
**Impact :** remplace `micro / reveal / image / page` du Sprint 0.
**Statut :** appliqué.

### Corrections GSAP issues de l'audit
**Décision :** `revertOnUpdate` sur la transition de page et le menu mobile ; recalcul de ScrollTrigger après chargement des polices ; `ignoreMobileResize` ; pas d'animation lancée sur une sélection vide.
**Raison :** éviter l'accumulation d'animations au fil des navigations, des positions de déclenchement fausses et des avertissements GSAP.
**Impact :** après 13 navigations enchaînées, le nombre d'animations actives reste celui de la page affichée.
**Statut :** appliqué.

### `tailwind-merge` étendu
**Décision :** déclarer les tailles de texte du projet à `tailwind-merge`.
**Raison :** sans cela, `text-display-l` était pris pour une couleur et supprimé face à `text-primary`.
**Impact :** toute nouvelle taille de texte doit être ajoutée dans `src/lib/utils.ts`.
**Statut :** appliqué.

### Page `/design-system`
**Décision :** page interne chargée à la demande, hors navigation et hors sitemap, avec `noindex` et `Disallow` dans `robots.txt`. La 404 est aussi en `noindex`.
**Raison :** référence visuelle pour les sprints suivants, sans impact sur le bundle principal ni sur le référencement.
**Impact :** la page reste accessible à qui connaît l'URL ; à retirer du build de production si le client le souhaite.
**Statut :** appliqué, retrait en production à décider.

### Baseline de performance
**Décision :** bundle principal de référence = 481 Ko (161 Ko gzip). Aucune dépendance ajoutée au Sprint 1.
**Raison :** suivre l'évolution sans optimiser prématurément.
**Impact :** découpage par route à étudier au Sprint 13.
**Statut :** documenté.

### Logo
**Décision :** le PNG actuel est accepté pour le Sprint 1.
**Impact :** TODO : obtenir une version SVG ou PNG transparent haute qualité.
**Statut :** en attente du club.

---

## 2026-10-04 — Sprint 2 : décisions

### Header sticky à deux états
**Décision :** le header reste sticky et prend le thème (dark ou light) de la section qui passe sous lui, par un fondu de couleurs de 0,5s. En haut de page, il prend le thème de la première section.
**Raison :** deux états demandés, sans transition agressive. Le comportement sticky du Sprint 0 est conservé.
**Impact :** hook `useHeaderTheme`, une lecture de layout par frame pendant le scroll uniquement. Un header transparent posé sur l'image du hero reste à décider au Sprint 3.
**Statut :** appliqué.

### Navigation centrée
**Décision :** grille à 3 colonnes (logo, navigation, CTA) : la navigation est centrée sur la page, pas entre le logo et le CTA.
**Raison :** alignement stable quelle que soit la largeur du logo et du bouton.
**Statut :** appliqué.

### Page active et survol
**Décision :** trait rouge sous le lien (fixe pour la page active, animé au survol). Dans le menu mobile, le lien actif est en rouge.
**Raison :** indication éditoriale, sans fond ni pastille. Le rouge en texte n'est utilisé que sur les grands liens du menu (règle de contraste).
**Statut :** appliqué.

### Menu mobile
**Décision :** overlay noir plein écran avec le nom du club, les 5 liens numérotés, le CTA et une ligne secondaire (Contact, localisation). Une timeline GSAP unique, inversée à la fermeture.
**Raison :** la timeline inversée garantit l'absence d'état résiduel après des ouvertures et fermetures répétées.
**Impact :** « Contact » passe de la liste principale à la ligne secondaire ; les coordonnées s'y afficheront quand elles seront fournies.
**Statut :** appliqué.

### Transition de page par rideau
**Décision :** rideau noir portant « BOXING CLUB / DE LA PLAINE », 0,9s au total.
**Raison :** direction éditoriale et cinématique, rappel de l'affiche de combat ; aucun filtre, flou, canvas ou vidéo.
**Statut :** appliqué.

### Interception des clics plutôt que blocage du routeur
**Décision :** la sortie de page est déclenchée par un écouteur de clics unique sur les liens internes ; le routeur navigue une fois le rideau en place. L'historique (précédent / suivant) n'est jamais intercepté.
**Raison :** bloquer le routeur (`useBlocker`) retarderait aussi le bouton retour et fragiliserait l'historique. Ici, le routing reste intact dans tous les cas, et tous les liens du site sont couverts sans modification.
**Impact :** sur précédent / suivant, il n'y a pas de phase de sortie : le rideau est posé d'un coup puis levé.
**Statut :** appliqué.

### Restauration du défilement
**Décision :** utiliser `ScrollRestoration` de React Router.
**Raison :** haut de page sur un nouveau lien, position retrouvée sur précédent / suivant. Remplace le `scrollTo(0, 0)` systématique du Sprint 0.
**Statut :** appliqué.

### Performance
**Décision :** aucune dépendance ajoutée. Bundle principal : 489 Ko (163 Ko gzip), contre 481 Ko au Sprint 1.
**Statut :** documenté.

### Audit du dépôt public
**Décision :** aucun fichier supprimé ni déplacé. Recommandations remises dans le rapport du Sprint 2.
**Statut :** en attente de validation.

---

## 2026-10-04 — Sprint 3 : décisions

### Composition du hero
**Décision :** photographie plein cadre, titre posé dessus en bas, CTA à droite de la dernière ligne (desktop) ou sous le titre (mobile, tablet).
**Raison :** logique d'affiche de combat ; hiérarchie identité → image → CTA.
**Impact :** la moitié basse de la photographie est couverte par le titre : le sujet doit être cadré dans le tiers supérieur.
**Statut :** appliqué, à confirmer avec la vraie photographie.

### Titre
**Décision :** « BOXING CLUB » en très grand, « DE LA » en petit et empilé, « PLAINE » seul en rouge. 2 lignes à partir de 768px, 3 lignes en mobile. Taille bornée par la largeur et la hauteur de l'écran.
**Raison :** vraie hiérarchie plutôt qu'un nom sur une ligne ; rouge ponctuel ; le hero tient dans un écran bas (1280×720).
**Statut :** appliqué.

### Photographie : placeholder abstrait
**Décision :** aucun visuel figuratif. Un placeholder abstrait (lumière latérale, repère de point focal, mention « PLACEHOLDER — PHOTOGRAPHIE À FOURNIR »).
**Raison :** aucune photographie du club n'est validée ; une image générée ou de banque pourrait passer pour une photo du club.
**Impact :** le rendu final du hero ne peut être jugé pleinement qu'avec la vraie photographie.
**Statut :** en attente de la photographie.

### Contenu du hero
**Décision :** mentions « Paris 15 — Club de boxe », marquées PROVISOIRE dans `src/data/home.ts`. La signature de travail « La boxe, sans compromis. » n'est pas utilisée dans le hero.
**Raison :** pas de slogan définitif tant qu'il n'est pas validé ; mentions purement fonctionnelles.
**Statut :** en attente de l'accroche validée.

### Header transparent
**Décision :** troisième état du header existant, déclenché par `data-header="transparent"` sur une section. Transparent uniquement en haut de cette section ; fond plein dès que la page défile. Le header reste sticky ; le hero passe dessous par une marge négative égale à `--header-height`.
**Raison :** un seul header pour tout le site ; le contenu ne défile jamais à nu sous la navigation.
**Statut :** appliqué.

### CTA du header en contour au-dessus du hero
**Décision :** tant que le header est transparent, son CTA « Inscription » passe en variante `secondary` (contour). Il redevient rouge dès que la page défile.
**Raison :** le hero porte déjà un CTA « Inscription » rouge ; deux aplats rouges identiques à l'écran affaiblissaient la hiérarchie.
**Impact :** écart avec la consigne « CTA visible » du header : il reste visible et cliquable, mais moins prioritaire. À arbitrer.
**Statut :** à valider.

### Pas de `HeroContent` en composant
**Décision :** le bloc de contenu est une `div` dans `Hero` ; `HeroContent` est le nom du type de données.
**Raison :** un composant de plus n'aurait rien encapsulé.
**Statut :** appliqué.

### Aperçus du hero dans `/design-system`
**Décision :** le hero est montré dans deux cadres (iframe sur `/`) aux dimensions desktop et mobile.
**Raison :** sa composition dépend de la taille de l'écran ; c'est le seul moyen de montrer fidèlement les deux versions sur une même page.
**Impact :** le reduced motion y est décrit, pas démontré (il dépend du réglage du système).
**Statut :** appliqué.

### Restauration du défilement durcie
**Décision :** une URL saisie ou un lien externe ouvre toujours la page en haut ; rechargement, précédent et suivant retrouvent la position. `ScrollTrigger.refresh()` est encapsulé pour ne plus déplacer la page.
**Raison :** deux défauts trouvés à l'audit : un chargement direct héritait de la position de la page précédente, et « suivant » perdait la position restaurée.
**Impact :** corrige aussi un défaut latent des Sprints 1 et 2.
**Statut :** appliqué.

### Section histoire temporaire conservée
**Décision :** l'aperçu crème « Plus qu'une salle. Une histoire. » reste sous le hero, marqué temporaire.
**Raison :** il permet de vérifier la bascule du header (transparent → dark → light) ; il sera remplacé au Sprint 4.
**Statut :** temporaire.

---

## 2026-10-04 — Sprint 3 : finalisation avec la photographie réelle

### Photographie du hero
**Décision :** la photographie fournie remplace le placeholder, sans retouche. Seuls le format et les dimensions des fichiers servis changent (AVIF + JPEG, 960 / 1400 / 1838px).
**Raison :** consigne du client ; 94 Ko en AVIF contre 2,3 Mo pour le PNG d'origine.
**Impact :** le placeholder du hero est supprimé. `MediaFrame` accepte désormais `srcSet`, `sizes` et `sources` (aucun nouveau système média).
**Statut :** appliqué.

### Image en bandeau sous 1024px
**Décision :** en mobile et tablet, l'image occupe les 56 % supérieurs du hero au lieu du plein cadre.
**Raison :** la photo est en 2,15:1 ; en plein cadre vertical, on n'en verrait que 21 à 35 %. En bandeau, 38 à 62 %.
**Impact :** remplace la décision « plein cadre partout » prise avec le placeholder.
**Statut :** appliqué.

### Voile renforcé sous la dernière ligne du titre
**Décision :** en plein cadre, voile presque noir sous « PLAINE », dissipé à partir du milieu de l'image.
**Raison :** mesuré sur l'image réelle, le rouge tombait à 2,1:1 sur le sol clair. Le rouge de marque exige un fond très sombre.
**Impact :** le bas de la photo (sol, pieds) est assombri ; la moitié haute (visages, gestes) reste intacte.
**Statut :** appliqué.

### Pas de filtre ni de grain supplémentaire
**Décision :** `treatment="none"`, pas de grain propre à l'image.
**Raison :** la photo est déjà en noir et blanc contrasté ; le grain global du site suffit.
**Statut :** appliqué.

### CTA du header en contour au-dessus du hero
**Décision :** validée par le client.
**Statut :** validé.

### Original sorti de `public/`
**Décision :** l'original de la photographie (2,3 Mo) est déplacé dans `sources/`, dossier ignoré par Git.
**Raison :** il n'était chargé par aucune page mais était copié dans le build.
**Impact :** seules les déclinaisons AVIF / JPEG sont publiées. L'original reste disponible en local.
**Statut :** appliqué, validé par le client.

### Nettoyage du dépôt public
**Décision :** `maquette.png`, `logo.png`, `favicon.png` (racine) et `download/` ne sont plus suivis par Git ; ils restent en local et sont ignorés (`.gitignore`).
**Raison :** recommandations de l'audit du Sprint 2, validées par le client.
**Impact :** ces fichiers restent visibles dans l'historique du commit du Sprint 0 : l'historique n'a pas été réécrit, à la demande du client.
**Statut :** appliqué.
