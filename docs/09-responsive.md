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
