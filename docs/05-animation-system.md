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
