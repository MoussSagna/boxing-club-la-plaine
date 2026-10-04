# Architecture

## Stack
- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- GSAP

## Structure recommandée
```text
src/
├── components/
│   └── ui/
├── sections/
├── pages/
├── layouts/
├── hooks/
├── data/
├── lib/
├── types/
└── styles/

public/
└── assets/
    ├── logo/
    ├── images/
    ├── icons/
    └── fonts/
```

## Principes
- Les pages composent des sections.
- Les sections composent des composants.
- Les données répétitives sont externalisées.
- Les animations complexes disposent de hooks ou fonctions dédiées.
- Les types métier sont centralisés.

## GSAP
Encapsuler les animations dans des composants/hooks et nettoyer correctement les contextes GSAP.

## Imports
Préférer des imports cohérents et des aliases TypeScript si le projet les configure.
