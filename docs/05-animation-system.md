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
