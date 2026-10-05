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

## Entraînements / Planning (Sprint 5)
- `section` nommée par son `h2` ; liste ordonnée de sept jours, chacun avec un `h3` et une liste de créneaux nommée par ce `h3`.
- Chaque créneau se lit comme une unité : « Mercredi, 18h à 20h, avec Christophe Tiozzo et Manuel Tavares, BEA / BA, Sparing / Préparation physique ». Les mots de liaison (« à », « avec », « et ») sont dans le texte, masqués à l'écran.
- Horaires en texte réel, balisés par `time` (`datetime="18:00"`).
- Les intitulés de colonnes (desktop) sont décoratifs et masqués aux lecteurs d'écran : le sens est porté par le texte de chaque créneau.
- Contraste sur crème : texte noir 16,9:1, texte atténué 7,7:1, rouge 5,0:1.
- Un seul élément interactif dans la section : le lien « Voir le planning complet », atteignable au clavier avec focus visible. Le survol des créneaux est purement décoratif.

## Page Coachs (Sprint 6)
- Un `h1`, puis un `article` par coach, nommé par son `h2`.
- Chaque photographie a un texte alternatif décrivant la scène. L'état « Photo à venir » est annoncé « Photo de Jérôme Loubet à venir ».
- Le style de cours est précédé de « Style de cours : » pour les lecteurs d'écran ; il n'est pas distingué par la seule couleur.
- Contraste sur noir : texte 16,9:1, qualifications et légendes 8,4:1, style en rouge 3,4:1 (grand texte de 24 à 40px, seuil 3:1).
- Aucun élément interactif dans les profils ; les liens de fin de page sont atteignables au clavier.

## Page Cours (Sprint 7)
- Un `h1`, cinq sections nommées par leur `h2`, approches et profils en `h3`. Les approches forment une liste ordonnée.
- Contraste contrôlé sur les 95 textes de la page : aucun échec. Les phrases en rouge sur noir font au moins 24px.
- Tous les liens sont atteignables au clavier dès le chargement, avec focus visible ; boutons de 44px de haut au minimum.
- Aucune information portée par la seule couleur.

## Page Planning (Sprint 9)
- Un `h1` ; la feuille a un `h2` masqué « Les entraînements de la semaine », les jours sont en `h3` dans une liste ordonnée.
- Les numéros 01 à 07 sont décoratifs (masqués aux lecteurs d'écran) : l'ordre est déjà porté par la liste.
- Chaque séance se lit d'une traite, horaires en `time`.
- Repères : la source du regroupement est écrite, pas suggérée par la couleur.
- Contraste contrôlé sur les 127 textes de la page : aucun échec. Liens atteignables au clavier dès le chargement, 44px minimum.
