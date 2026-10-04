# Content Model

## Principes
Ne jamais inventer une information factuelle.

Si une donnée manque, utiliser `TODO` et la documenter.

## Practice
```ts
type Practice = {
  id: string;
  title: string;
  shortDescription: string;
  image: string;
  ageRange?: string;
  href: string;
};
```

Pratiques prévues :
- Boxe loisir
- Compétition
- Boxe éducative
- Baby boxe

## Coach
```ts
type Coach = {
  id: string;
  name: string;
  role?: string;
  specialty?: string;
  image: string;
  bio?: string;
};
```

## News
```ts
type NewsArticle = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  href: string;
};
```

## Schedule
```ts
type ScheduleItem = {
  id: string;
  day: string;
  start: string;
  end: string;
  title: string;
  audience?: string;
  level?: string;
};
```

## History
Ajouté au Sprint 0 (non défini initialement, nécessaire à `src/data/history.ts`).
```ts
type HistoryEvent = {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
};
```

## Implémentation
Les types vivent dans `src/types/index.ts`, les données dans `src/data/`.
Une donnée manquante vaut `TODO` (constante de `src/data/site.ts`), une liste
non fournie reste vide, et une image manquante pointe vers
`/assets/images/placeholder.svg`.

## Hero (Sprint 3)
```ts
type HeroContent = {
  title: { lead: string[]; connector: string[]; accent: string };
  meta: string[];
  primaryCta: NavItem;
  secondaryCta?: NavItem;
  media: {
    src: string;
    alt: string;
    focalPoint?: { x: number; y: number };
    focalPointMobile?: { x: number; y: number };
    treatment?: 'none' | 'monochrome' | 'contrast' | 'red';
  };
};
```

État du contenu de `src/data/home.ts` :

| Élément | Valeur | Statut |
|---|---|---|
| Titre | Boxing Club de la Plaine | validé (nom officiel) |
| Mentions | Paris 15 — Club de boxe | provisoire, purement fonctionnel ; accroche à valider |
| CTA | Inscription, Découvrir le club | noms de pages validés |
| Image | photographie d'entraînement fournie par le club | validé |
