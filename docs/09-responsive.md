# Responsive

## Breakpoints
Utiliser les breakpoints Tailwind du projet, avec au minimum :
- mobile
- tablet
- desktop
- large desktop

## Mobile
Le mobile n'est pas un desktop réduit.

Adapter :
- taille des titres
- composition des images
- navigation
- grille
- planning
- espacements
- animation

## Hero mobile
Le hero doit rester immédiatement compréhensible :
- logo
- titre
- image
- CTA

Éviter les textes qui sortent de l'écran.

## Navigation
Desktop : navigation horizontale.
Mobile : menu plein écran animé.

## Grilles
Les grilles passent progressivement :
12 → 8 → 4 colonnes.

Les cartes peuvent devenir une liste ou un slider horizontal sur mobile lorsque cela améliore l'UX.

## Implémentation (Sprint 1)
Breakpoints Tailwind : `sm` 640, `md` 768 (tablet), `lg` 1024 (desktop), `xl` 1280, `2xl` 1536, `3xl` 1920.

- Navigation : menu plein écran sous 1024px, navigation horizontale à partir de 1024px.
- Grille : 4 colonnes → 8 à 768px → 12 à 1024px.
- Marge latérale : 20px → 32px (768) → 48px (1024) → 64px (1536).
- Typographie fluide : aucune taille à redéfinir par breakpoint.

## Largeurs de test
375, 390, 430, 768, 1024, 1280, 1440, 1920.

Sprint 1 : aucun débordement horizontal et aucun élément hors cadre sur `/`, `/club` et `/design-system` à ces 8 largeurs.

## Navigation (Sprint 2)
- **Desktop (≥ 1024px)** : logo à gauche, navigation centrée sur la page, CTA à droite, header de 96px. Vérifié à 1024, 1280, 1440 et 1920 : navigation centrée au pixel, logo et CTA alignés sur les marges du container.
- **Mobile et tablet (< 1024px)** : logo + bouton MENU, header de 72px.
- **Menu mobile** : tout tient sans défilement à 375×667, 375×812, 390×844, 430×932 et 768×1024. Défilement interne prévu si l'écran est plus petit. Liens de 64px de haut minimum, CTA pleine largeur de 60px en bas d'écran (zone du pouce), bouton Fermer de 44px de haut.
- Le menu se ferme seul si la fenêtre passe en largeur desktop.

## Hero (Sprint 3)
- Composition mobile dédiée : titre sur 3 lignes, CTA principal pleine largeur sous le titre, indicateur de scroll masqué.
- Tablet (768) : titre sur 2 lignes, CTA sous le titre.
- Desktop (≥ 1024) : titre sur 2 lignes, CTA à droite de la dernière ligne.
- La taille du titre dépend aussi de la hauteur de l'écran : le hero tient dans un écran de 1280×720 comme de 375×667, CTA visible sans défiler.
- Vérifié à 375×667, 375×812, 390×844, 430×932, 768×1024, 1024×768, 1280×720, 1280×800, 1440×900, 1920×1080 : aucun débordement, aucune collision, hero = hauteur de l'écran.

### Hero avec la photographie réelle
- ≥ 1024px : image plein cadre.
- < 1024px (mobile et tablet) : image en bandeau sur les 56 % supérieurs du hero, titre posé dessous. La photographie étant très horizontale, c'est ce qui évite un recadrage excessif.
- Largeur de la photo visible : 47 % à 375×667, 38 % à 390×844, 62 % à 768×1024, 62 % à 1024×768, 75 % à 1440×900, 83 % en 16:9.

## Histoire du club (Sprint 4)
- Mobile : sur-titre, titre, texte, timeline (année au-dessus de l'événement), phrase, lien.
- Tablet (768) : même ordre ; dans la timeline, année et événement côte à côte.
- Desktop (≥ 1024) : texte sur 4 colonnes à gauche, timeline sur 7 colonnes à droite, phrase sur 10 colonnes.
- Vérifié à 375×667, 390×844, 430×932, 768×1024, 1024×768, 1280×800, 1440×900, 1920×1080 : aucun débordement, aucune collision, ordre de lecture identique partout.

## Entraînements / Planning (Sprint 5)
- Mobile (< 768) : jour puis créneaux empilés.
- Tablet (768 à 1023) : jour au-dessus, créneaux sur trois colonnes.
- Desktop (≥ 1024) : jour à gauche (4 colonnes), créneaux à droite (8 colonnes).
- Vérifié à 375×667, 390×844, 430×932, 768×1024, 1024×768, 1280×800, 1440×900, 1920×1080 : aucun débordement, aucun chevauchement, aucun texte coupé.

## Page Coachs (Sprint 6)
- < 1024px : lecture verticale, même ordre pour tous (nom, photo, informations). Jean-Paul : portrait puis photo en situation.
- ≥ 1024px : six compositions différentes sur la grille 12 colonnes.
- Vérifié à 375×667, 390×844, 430×932, 768×1024, 1024×768, 1280×800, 1440×900, 1920×1080 : aucun débordement, aucun chevauchement, aucun nom coupé, aucune image déformée.

## Page Cours (Sprint 7)
- Mobile : lecture verticale ; chaque approche se lit numéro, titre, phrase, détail, coachs.
- Tablet : numéro à gauche, contenu en une colonne.
- Desktop : titre à gauche, détail à droite.
- Vérifié à 375×667, 390×844, 430×932, 768×1024, 1024×768, 1280×720, 1280×800, 1440×900, 1920×1080 : aucun débordement, aucun titre coupé ; l'ouverture tient dans l'écran et ses liens sont visibles sans défiler.

## Page Planning (Sprint 9)
- Même comportement que la feuille de l'accueil : jour puis séances empilées en mobile, séances sur trois colonnes à 768px, jour à gauche à partir de 1024px.
- Vérifié à 375×667, 390×844, 430×932, 768×1024, 1024×768, 1280×720, 1280×800, 1440×900, 1920×1080 : aucun débordement, aucun texte coupé ; mercredi (3 séances) et dimanche (2) distincts partout.
- Contrôle de chevauchement : une alerte « numéro / jour » à partir de 768px, vérifiée sur capture — faux positif (la boîte de ligne de l'Anton est plus haute que ses lettres ; le numéro est nettement au-dessus du nom).
- Point serré connu : à 1024px, « MERCREDI » est à 13px de son premier horaire.

## Page Inscription (Sprint 10)
- Mobile : chaque étape se lit seule — numéro, titre, texte, action. Tarifs empilés, documents en une colonne, boutons pleine largeur dont le libellé passe à la ligne.
- À partir de 768px : numéro à gauche, contenu à droite ; documents et tarifs sur deux colonnes.
- Vérifié à 375×667, 390×844, 430×932, 768×1024, 1024×768, 1280×800, 1440×900, 1920×1080 : aucun débordement, aucun texte coupé, cibles de 44px minimum.
- Contrôle de chevauchement : aucune alerte.
