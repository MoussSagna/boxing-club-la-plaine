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
