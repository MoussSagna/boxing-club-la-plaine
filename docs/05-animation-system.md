# Animation System

## Technologie
GSAP est la technologie principale d'animation.

## Principes
Les animations doivent raconter quelque chose. Elles ne doivent jamais exister uniquement pour faire « joli ».

## Easing
Privilégier :
- `power2.out`
- `power3.out`
- `power4.out`
- `expo.out`
- `power2.inOut`

## Durées
- Micro interaction : 0.2–0.4s
- Reveal : 0.6–1s
- Image : 0.8–1.4s
- Transition de page : 0.6–1.2s

## Page load
Ordre recommandé :
1. logo
2. navigation
3. titre
4. image
5. CTA

## Scroll
Utiliser :
- ScrollTrigger
- parallax léger
- clip-path reveal
- scale image
- split text
- pinned sections avec modération

## Hover
Les interactions peuvent utiliser :
- image scale
- déplacement de 4–12px
- reveal d'un CTA
- changement de contraste

## Performance
Animer prioritairement :
- transform
- opacity
- clip-path lorsque pertinent

Éviter les animations permanentes coûteuses.

## Reduced motion
Respecter `prefers-reduced-motion`.
Dans ce mode, supprimer les parallax et réduire les transitions à des fades simples.

## Tokens (Sprint 1)
Source : `src/lib/motion.ts`. Aucune durée, ease ou distance arbitraire dans les composants.

| Token | Valeur | Usage |
|---|---|---|
| `DURATION.fast` | 0,3s | Micro interaction, fade de repli en reduced motion |
| `DURATION.normal` | 0,6s | Transition de page, apparition simple |
| `DURATION.slow` | 0,9s | Reveal de texte ou de bloc |
| `DURATION.slower` | 1,2s | Reveal d'image |
| `EASE.out` | `power3.out` | Ease par défaut des entrées |
| `EASE.outSoft` | `power2.out` | Entrées discrètes, sorties |
| `EASE.outStrong` | `power4.out` | Images, rideaux |
| `EASE.expo` | `expo.out` | Grands mouvements |
| `EASE.inOut` | `power2.inOut` | Transitions symétriques |
| `EASE.none` | `none` | Animations liées au scroll |
| `DISTANCE.sm / md / lg` | 12 / 24 / 40px | Déplacements |
| `STAGGER.tight / normal` | 0,06 / 0,1s | Cascades |
| `SCROLL_START` | `top 85%` | Déclenchement des reveals |

Les survols CSS utilisent `duration-200` / `duration-300` et `ease-out-quart`.

## Infrastructure GSAP
- `src/lib/gsap.ts` enregistre ScrollTrigger et `useGSAP` une seule fois. Toujours importer depuis ce fichier.
- Toute animation vit dans `useGSAP` : le contexte est nettoyé au démontage, y compris sous React StrictMode.
- Les hooks dépendants d'un état utilisent `revertOnUpdate: true` pour ne pas accumuler d'animations.
- `ScrollTrigger.refresh()` est relancé après le chargement des polices et après chaque transition de page.
- `ignoreMobileResize` évite les sauts liés à la barre d'adresse mobile.

## Hooks
- `useReducedMotion()` : préférence utilisateur, réactive.
- `useScrollReveal({ selector, y, duration, delay, stagger, start })` : reveal à l'entrée dans le viewport, en cascade avec `selector`.
- `useParallax({ amount })` : parallax léger ; le parent doit être en `overflow: hidden`.

## Navigation et transitions (Sprint 2)

### Liens de navigation
Trait rouge qui se déploie de gauche à droite au survol (0,3s). Trait fixe sur la page active. CSS uniquement.

### CTA Inscription
`Button` existant : fond qui s'assombrit, flèche qui avance de 4px, enfoncement de 1px au clic.

### Header
Fondu de couleurs de 0,5s entre l'état dark et l'état light. Aucun mouvement.

### Menu mobile
Une seule timeline GSAP, construite en pause, jouée à l'ouverture et inversée à la fermeture (vitesse × 2).

| Ordre | Élément | Animation |
|---|---|---|
| 1 | Overlay | rideau clip-path de haut en bas, 0,6s |
| 2 | Barre (logo, fermer) | fondu, 0,3s |
| 3 | Nom du club | deux lignes qui montent, 0,6s |
| 4 | Liens | montée en cascade (0,06s d'écart), 0,6s |
| 5 | CTA | fondu + 12px, 0,3s |
| 6 | Éléments secondaires | fondu, 0,3s |

Ouverture complète en 1,2s environ, fermeture en 0,6s. Le menu est utilisable dès le premier instant.

### Transition de page
Rideau noir portant « BOXING CLUB / DE LA PLAINE » (deuxième ligne en rouge).

| Phase | Durée | Animation |
|---|---|---|
| Sortie | 0,3s | le rideau monte depuis le bas, le nom du club apparaît |
| Changement de route | — | sous le rideau |
| Entrée | 0,6s | le rideau s'efface vers le haut, la nouvelle page monte de 40px |

Total : 0,9s.

| Cas | Comportement |
|---|---|
| Clic sur un lien interne | sortie → changement de route → entrée |
| Précédent / suivant du navigateur | la route change tout de suite, le rideau est posé d'un coup puis levé |
| Lien du menu mobile | le rideau est posé d'un coup sous le menu (noir sur noir), puis levé |
| Chargement direct, refresh, deep link | pas de rideau, fondu de 0,3s |
| Clic sur la page courante, lien externe, clic avec Cmd/Ctrl | pas de transition |
| Reduced motion | pas de rideau, navigation immédiate, fondu de 0,3s |

Sécurité : si la nouvelle page n'arrive pas, le rideau se lève seul après 6s.

Exception documentée : `PageTransition` gère ses tweens à la main (kill explicite) au lieu de `useGSAP`, car le composant vit aussi longtemps que l'application et le contexte accumulerait une animation par navigation.

## Hero (Sprint 3)

### Entrée
Une seule timeline GSAP, environ 1,3s.

| Départ | Élément | Animation |
|---|---|---|
| 0,10s | Image | rideau vertical (clip-path) + dézoom de 1,08 à 1, 1,2s |
| 0,20s | Titre | lignes qui montent derrière un masque, 0,9s, 0,06s d'écart |
| 0,50s | Mentions | fondu + 12px, 0,6s |
| 0,60s | CTA | fondu + 12px, 0,6s |
| 0,75s | Détails (indicateur de scroll) | fondu, 0,3s |

Aucun effet permanent sur l'image : le clip-path et le zoom sont retirés à la fin.

### Indicateur de scroll
Un trait de 40px qui se dessine puis s'efface (CSS, 2,4s). L'animation ne tourne que lorsque le hero est à l'écran.

### Reduced motion
Un seul fondu de 0,3s sur l'image et le contenu. Aucun déplacement, aucun clip-path, indicateur de scroll statique.

### Correctif commun
`refreshScrollTriggers()` (dans `src/lib/gsap.ts`) remplace les appels directs à `ScrollTrigger.refresh()` : il recalcule les déclenchements sans déplacer la page.

## Histoire du club (Sprint 4)
Trois reveals au scroll, chacun joué une seule fois quand son bloc atteint 85 % de la hauteur d'écran. Plus discrets et plus courts que le hero.

| Bloc | Élément | Animation |
|---|---|---|
| Introduction | Lignes du titre | montée derrière un masque, 0,9s |
| | Sur-titre, paragraphes | fondu + 12px, 0,6s, en cascade |
| | Photographie (si présente) | rideau vertical, 0,9s |
| Timeline | Par date, à 0,15s d'écart | filet qui se trace (0,9s), année qui monte (0,6s), événement en fondu (0,6s) |
| Clôture | Phrase, puis lien | fondu + 24px, 0,9s |

Ni scroll-jacking, ni épinglage, ni parallax, ni animation permanente. Reduced motion : fondus de 0,3s, aucun déplacement. Tout le contenu est dans la page sans l'animation.

## Entraînements / Planning (Sprint 5)
Reveal au scroll, joué une fois : d'abord le titre, puis chaque jour à son entrée dans l'écran.

| Bloc | Élément | Animation |
|---|---|---|
| Introduction | Lignes du titre | montée derrière un masque, 0,9s |
| | Sur-titre, repère chiffré | fondu + 12px, 0,6s |
| Chaque jour | Filet | se trace de gauche à droite, 0,9s |
| | Nom du jour | monte derrière un masque, 0,6s |
| | Créneaux | fondu + 12px, 0,6s, en cascade |
| Lien | | fondu + 12px, 0,6s |

Ni scroll-jacking, ni épinglage, ni parallax. Reduced motion : fondus de 0,3s, aucun déplacement, pas de glissement au survol.

## Règles ajoutées au Sprint 5
- **Pas de `once: true` sur un ScrollTrigger.** Utiliser `revealTrigger(element)` (`src/lib/gsap.ts`). `once: true` détruit le déclencheur dès qu'il a servi, y compris pendant que ScrollTrigger recalcule les autres : quand la page s'ouvre déjà défilée (précédent, rechargement), elle plantait. Corrigé pour toutes les sections.
- **Ne pas animer avec GSAP un élément qui porte aussi un déplacement CSS au survol.** GSAP neutralise `translate` sur l'élément qu'il anime : mettre le survol sur un bloc intérieur.

## Page Coachs (Sprint 6)
Chaque profil se révèle une fois, à son entrée dans l'écran :

| Départ | Élément | Animation |
|---|---|---|
| 0s | Photo(s) | rideau vertical (clip-path), 1,2s |
| 0,2s | Trait rouge | se trace, 0,9s |
| 0,3s | Nom | lignes qui montent derrière un masque, 0,9s |
| 0,5s | Numéro, qualifications, style, description | fondu + 12px, 0,6s, en cascade |

Puis un déplacement photographique très léger au scroll (`ParallaxImage`, amplitude 3 %). Ni rotation, ni rebond, ni animation permanente. Reduced motion : simples fondus, image fixe.

Correctif commun : `useParallax` prend désormais pour repère le cadre de l'image, et non son parent direct (un `<picture>` sans boîte quand l'image a plusieurs formats).

## Page Cours (Sprint 7)
Un seul comportement, porté par le hook `useRowReveal` : à l'entrée d'un bloc dans l'écran, une fois, le filet se trace (`data-row-rule`), les lignes de titre montent derrière leur masque (`data-row-line`), puis le texte arrive en fondu avec 12px de translation (`data-row-fade`). L'ouverture joue la même séquence au chargement.

Scroll naturel : ni scroll-jacking, ni défilement horizontal, ni épinglage, ni parallax, ni animation permanente. Reduced motion : simples fondus.

Règle ajoutée : un élément qui contient un lien ne doit pas être révélé avec `autoAlpha` (qui le rend invisible au clavier tant qu'il n'est pas apparu) mais avec `opacity`. `useRowReveal` applique cette règle ; `useScrollReveal` reste réservé aux blocs sans lien.

## Page Planning (Sprint 9)
- Ouverture, repères et blocs d'appel : `useRowReveal` (filet, titre, texte).
- Feuille : le reveal jour par jour vit désormais dans `ScheduleSheet`, commun à l'accueil et à la page (filet, nom du jour, puis numéro et séances).
- Survol d'une séance inchangé : horaire en rouge, trait rouge, glissement de 4px.
- Reduced motion : simples fondus, aucune translation.
