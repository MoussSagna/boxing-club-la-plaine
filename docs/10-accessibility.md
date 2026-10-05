# Accessibility

## Obligations
- Navigation clavier.
- Focus visible.
- Contraste suffisant.
- Alt text pertinent.
- Labels accessibles.
- Structure sémantique.
- Boutons réellement interactifs.
- Liens identifiables.
- Respect de `prefers-reduced-motion`.

## Images
Ne pas utiliser un texte dans une image lorsque le contenu est important.

Les images purement décoratives doivent avoir un alt vide.

## Motion
Les animations ne doivent pas empêcher l'utilisation du site.

## Forms
Tous les champs doivent avoir :
- label
- état d'erreur
- message compréhensible
- focus visible

## Implémentation (Sprint 1)
- **Focus visible** : contour de 2px décalé de 3px, crème sur fond noir, noir sur fond crème.
- **Lien d'évitement** « Aller au contenu », premier arrêt de tabulation.
- **Navigation** : après un changement de page, le focus va sur le contenu et la page remonte en haut.
- **Menu mobile** : `<dialog>` modal. Focus piégé dans le menu, Échap ferme, le focus revient sur le bouton MENU, le scroll de la page est bloqué.
- **Boutons icône** : `aria-label` obligatoire (imposé par le type TypeScript).
- **Cartes cliquables** : un seul lien par carte, le contour de focus entoure toute la carte.
- **Liens externes** : ouverture dans une nouvelle fenêtre annoncée aux lecteurs d'écran.
- **Cibles tactiles** : 44px de haut minimum pour les boutons.
- **Contraste** : voir `02-colors.md`. Pas de petit texte rouge sur noir.
- **Reduced motion** : pas de parallax, pas de clip-path, pas de zoom au survol ; fondus courts uniquement.

Sprint 1 : contrôle automatisé du contraste de tous les textes rendus sur `/`, `/club` et `/design-system` : aucun échec WCAG AA.

## Navigation et transitions (Sprint 2)
- **Page active** : `aria-current="page"` sur le lien, en plus du trait rouge (ou du texte rouge dans le menu mobile).
- **Annonce de navigation** : à chaque changement de page, le titre de la nouvelle page est annoncé par une région `aria-live` et le focus va sur le contenu.
- **Défilement** : haut de page sur un nouveau lien, position retrouvée avec précédent / suivant.
- **Rideau de transition** : décoratif (`aria-hidden`), sans capture de pointeur. Il ne bloque ni le clavier, ni le focus, ni le bouton retour. L'historique du navigateur n'est jamais retardé.
- **Menu mobile** : les éléments restent atteignables au clavier dès l'ouverture (animation par opacité, jamais par `visibility`). Ordre de tabulation : logo, Fermer, 5 liens, Inscription, Contact.
- **Reduced motion** : pas de rideau, pas de clip-path ni de translation dans le menu ; fondus de 0,3s.
- **Header light** : texte noir sur crème, mêmes règles de contraste que les sections crème.

## Hero (Sprint 3)
- Un seul `h1` par page ; celui du hero se lit « Boxing Club de la Plaine » d'une traite malgré le découpage visuel.
- La section est nommée par son titre (`aria-labelledby`).
- Image : `alt` vide tant que c'est un placeholder ; à décrire quand la vraie photographie sera intégrée.
- Le texte reste lisible sans l'image : il repose sur le fond noir de la section (crème sur noir 16,9:1, CTA blanc sur rouge 5,9:1). « PLAINE » en rouge est du très grand texte (3,4:1, seuil 3:1) et n'est jamais le seul porteur d'information.
- Un voile sombre sous le titre et sous le header transparent garantit le contraste quelle que soit la photographie.
- Les CTA sont atteignables au clavier dès le début de l'animation d'entrée.
- Indicateur de scroll : décoratif, masqué aux lecteurs d'écran.
- Défilement : une URL saisie ou un lien externe ouvre la page en haut ; rechargement, précédent et suivant retrouvent la position.

### Hero avec la photographie réelle
- `alt` : « Séance d'entraînement : un boxeur de dos au premier plan, d'autres travaillent en binômes dans la salle. »
- Contraste mesuré sur les pixels réels de l'image derrière chaque texte (zone la plus claire, pire cas sur 7 tailles d'écran) :

| Texte | Contraste | Seuil |
|---|---|---|
| « BOXING » / « CLUB » | 9,1:1 / 4,5:1 | 3:1 |
| « PLAINE » (rouge) | 3,0:1 | 3:1 |
| Mentions | 7,9:1 | 4,5:1 |
| Navigation du header | 5,3:1 à 9,7:1 | 4,5:1 |
| CTA du header (contour) / MENU | 5,0:1 / 6,5:1 | 4,5:1 |
| « Découvrir le club » | 15,2:1 | 4,5:1 |

« PLAINE » est au seuil : le rouge de marque plafonne à 3,4:1 sur noir pur. Le voile est réglé pour le respecter ; il ne faut pas l'alléger sous cette ligne.

## Histoire du club (Sprint 4)
- `section` nommée par son `h2` ; la page garde un seul `h1` (hero), suivi de ce `h2`.
- Timeline : liste ordonnée (`ol`) nommée « Dates clés du club », années balisées par `time`. Lue dans l'ordre : « 1991 Création du club », etc. Elle se comprend sans animation ni mise en forme.
- Texte sélectionnable, aucune information portée par la seule couleur : « club familial » est en rouge mais fait partie de la phrase.
- Contraste sur fond crème : texte noir 16,9:1, texte secondaire 7,7:1, rouge 5,0:1. En thème sombre : texte secondaire 8,4:1, rouge 3,4:1 (uniquement en grand texte).
- Le lien est atteignable au clavier, avec focus visible, et son libellé (« Découvrir l'histoire ») diffère de celui du hero.
- Reduced motion : fondus courts, aucun déplacement.

### Correctifs Sprint 4
- Timeline : chaque entrée se lit « 13 mai 1991 — Création du club ». La date est un `time datetime="1991-05-13"` ; le tiret est présent dans le texte, masqué à l'écran.
- Hero : « Depuis 1991 » et « Paris 15 — Club de boxe » sont deux paragraphes lus dans cet ordre, avant le `h1`. Contraste mesuré sur la photographie : 7,7:1 au pire cas (seuil 4,5:1).
