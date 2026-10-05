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

## Histoire du club (Sprint 4) — données officielles
Source : informations communiquées par le club le 2026-10-04. Fichier : `src/data/history.ts` (`historyIntro`, `historyEvents`, `clubPhilosophy`, `CLUB_HISTORY`, `CLUB_FOUNDED`).

```ts
type HistoryEvent = { id: string; year: string; title: string; description?: string; image?: string };

type ClubHistoryContent = {
  eyebrow: string;
  title: { lines: string[]; accent: string };
  paragraphs: string[];
  events: HistoryEvent[];
  philosophy: { text: string; highlight?: string };
  action: NavItem;
  media?: { src: string; alt: string; width?: number; height?: number; treatment?: ... };
};
```

| Élément | Valeur | Statut |
|---|---|---|
| Sur-titre | Depuis 1991 | officiel (création le 13 mai 1991) |
| Titre | Une salle. Une histoire. | composition de design, pas un slogan officiel |
| Paragraphes | les trois textes fournis par le club | officiel, repris tels quels |
| Timeline | 13 mai 1991, 2000, 2019 | officiel ; la première entrée porte la date complète (`date: '1991-05-13'`) |
| Phrase de clôture | « Le club est un club familial où… » | officiel, reprise telle quelle |
| Lien | Découvrir l'histoire → `/club` | validé |
| Photographie | absente | à fournir |

## Encadrants — données officielles
Fichier : `src/data/coaches.ts`. Les sept encadrants sont enregistrés (nom, diplômes et fonctions, titres sportifs), **sans être affichés** : ils serviront au sprint dédié à `/coachs`. Portraits : placeholder en attendant.

```ts
type Coach = {
  id: string;
  name: string;
  role?: string;
  specialty?: string;
  qualifications: string[];
  achievements?: string[];
  image: string;
  bio?: string;
};
```

### Mise à jour du hero
| Élément | Valeur | Statut |
|---|---|---|
| Repère historique (`since`) | Depuis 1991 | officiel |
| Mentions (`meta`) | Paris 15 — Club de boxe | provisoire, inchangé |

## Planning des entraînements (Sprint 5) — données officielles
Source : informations communiquées par le club le 2026-10-05. Fichier : `src/data/schedule.ts` (`scheduleDays`, `TRAINING_SCHEDULE`). Ces types remplacent `ScheduleItem`.

```ts
type DayId = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

type TrainingSession = {
  id: string;
  day: DayId;
  start: string;        // 'HH:MM'
  end: string;          // 'HH:MM'
  ageRange?: string;    // ex. '6/11 ans'
  coachIds: string[];   // identifiants de src/data/coaches.ts
  disciplines: string[]; // BEA, BA
  tags?: string[];      // Technique, Cardio, Sparing, Préparation physique, Passage de gants
};

type ScheduleDay = { id: DayId; label: string; short: string; sessions: TrainingSession[] };
```

| Jour | Horaire | Encadrants | Pratique |
|---|---|---|---|
| Lundi | 18h — 20h30 | Laurent Vantheemst, Jean-Paul Guinvanna | BEA / BA |
| Mardi | 18h — 19h30 | Paul Marius | BEA / BA — Technique / Cardio |
| Mercredi | 15h30 — 16h30 | Manuel Tavares | 6/11 ans |
| Mercredi | 16h30 — 18h | Manuel Tavares | 12/16 ans |
| Mercredi | 18h — 20h | Manuel Tavares (Christophe Tiozzo retiré au Sprint 6) | BEA / BA — Sparing / Préparation physique |
| Jeudi | 18h — 19h30 | Matthias Hourdé | BEA / BA — Technique / Cardio / Sparing |
| Vendredi | 18h — 20h | Paul Marius | BEA / BA — Technique / Cardio |
| Samedi | 12h — 13h | Matthias Hourdé | BEA / BA |
| Dimanche | 10h — 12h | Manuel Tavares | BEA — Technique / Sparing |
| Dimanche | 12h — 14h | Manuel Tavares | BA — Passage de gants |

Règles appliquées :
- Les encadrants sont référencés par identifiant : leur nom n'est écrit qu'une fois, dans `coaches.ts`.
- Appellations conservées telles quelles, dont « Sparing ».
- Les deux séances du mercredi après-midi n'ont qu'une tranche d'âge : aucune discipline n'est déduite.
- Titre de la section « À chaque jour, son round. » : validé par le client comme titre éditorial du site. Ce n'est pas un slogan officiel du club et il ne doit pas être présenté comme tel.

Points à confirmer par le club :
- « Manuel Tavarès » ou « Manuel Tavares » : les deux formes figurent dans les données reçues. Le site utilise « Tavares », la forme déjà enregistrée.
- « Sparing » : orthographe reçue, conservée (la graphie usuelle est « sparring »).
- Signification de BEA et BA : non affichée, faute de libellé officiel.

## Coachs (Sprint 6)
Fichier : `src/data/coaches.ts` (`coaches`, `currentCoaches`, `COACHES_PAGE`).

```ts
type CoachPhoto = { kind: 'portrait' | 'action'; src: string; srcSet?: string; sources?: ...; width: number; height: number; alt: string; focalPoint?: { x: number; y: number } };

type Coach = {
  id: string;
  name: string;
  status: 'current' | 'former';
  qualifications: string[];
  achievements?: string[];
  style?: { label: string; description: string };
  photos: CoachPhoto[];   // vide : état « Photo à venir »
};
```

| # | Coach | Style de cours | Photos |
|---|---|---|---|
| 01 | Laurent Vantheemst | Boxe académique | 1 |
| 02 | Paul Marius | Esprit club | 1 |
| 03 | Manuel Tavares | Physique → Assaut | 1 |
| 04 | Matthias Hourdé | Technique → Assauts à thème | 1 |
| 05 | Jérôme Loubet | Condition physique | aucune — « Photo à venir » |
| 06 | Jean-Paul Guinvanna | Boxe complète | 1 (en situation, `jp1`) |

- Qualifications et titres : ceux déjà enregistrés, sans ajout.
- Styles et descriptions : formulations fournies par le client ; ce ne sont pas des slogans officiels.
- Titre et introduction de la page : formulations éditoriales, non officielles.
- **Christophe Tiozzo** n'est plus présent dans la salle : `status: 'former'`. Sa fiche est conservée pour une éventuelle section historique ; il n'apparaît ni sur `/coachs` ni au planning.

### Planning mis à jour
Mercredi 18h — 20h : encadré par Manuel Tavares seul (Christophe Tiozzo retiré). Le reste du planning est inchangé.

## Cours (Sprint 7)
Fichier : `src/data/courses.ts` (`COURSES_PAGE`), types `CourseApproach`, `CourseProfile`, `CoursesPageContent`.

Tous les textes viennent du brief du client. Ce sont des formulations éditoriales : ni slogans officiels, ni programme officiel, ni niveaux ou catégories d'inscription. Rien n'est ajouté : pas d'horaires, de tarifs, de règles d'accès, de nombre de rounds ni de matériel.

| # | Approche | Phrase | Coachs associés |
|---|---|---|---|
| 01 | Technique | Les fondamentaux avant tout. | Laurent Vantheemst, Matthias Hourdé, Paul Marius |
| 02 | Préparation physique | Construire le moteur. | Manuel Tavares, Jérôme Loubet, Jean-Paul Guinvanna |
| 03 | Assauts | Mettre la technique à l'épreuve. | Manuel Tavares, Jean-Paul Guinvanna |
| 04 | Assauts à thème | Travailler avec un objectif précis. | Matthias Hourdé |
| 05 | Cardio & condition physique | Tenir le rythme. | Jérôme Loubet |
| 06 | Boxe complète | Tout mettre ensemble. | Jean-Paul Guinvanna |

Points à valider par le club :
- « Les assauts ne concernent pas tous les pratiquants. » : seule phrase rédigée par l'agent, pour traduire la consigne « ne pas présenter les assauts comme obligatoires ».
- Association question / profil : « Tu commences ? » Débuter ; « Tu veux progresser ? » Progresser ; « Tu reprends ? » S'entraîner ; « Tu veux boxer ? » Se confronter.
- Sur-titre de l'introduction (« Les séances ») et titres de section (« Ce qu'on travaille », « Trouver son rythme ») : intitulés fonctionnels ajoutés pour structurer la page.

## Page Planning (Sprint 9)
Fichier : `src/data/planning.ts` (`PLANNING_PAGE`), types `PlanningPageContent`, `ScheduleMarker`. Aucun horaire n'y est recopié.

Textes fournis par le client, éditoriaux et non officiels : « À vous de choisir votre rythme. », « Quel rythme vous correspond ? », « Chaque séance a son approche. », « Découvrez les coachs et leurs méthodes. », « Votre créneau est là. », « Il ne reste plus qu'à pousser la porte. »

| Repère | Rattachement | Séances |
|---|---|---|
| Technique | mention « Technique » | mardi 18h, jeudi 18h, vendredi 18h, dimanche 10h |
| Cardio | mention « Cardio » | mardi 18h, jeudi 18h, vendredi 18h |
| Préparation physique | mention « Préparation physique » | mercredi 18h |
| Assaut | mentions « Sparing » ou « Passage de gants » | mercredi 18h, jeudi 18h, dimanche 10h, dimanche 12h |
| Jeunes | séances avec une tranche d'âge | mercredi 15h30 (6/11 ans), mercredi 16h30 (12/16 ans) |

**À valider par le club :** le planning ne porte pas la mention « Assaut ». Le repère regroupe les séances « Sparing » et « Passage de gants », et l'affiche explicitement.

Ajouts de l'agent : la phrase « Quelques repères pour lire le planning, d'après les mentions de chaque séance. », le sur-titre « Choisir sa séance » (repris du brief), le sur-titre « Les coachs », et le titre masqué « Les entraînements de la semaine ».

## Inscription (Sprint 10) — informations officielles
Fichier : `src/data/registration.ts` (`REGISTRATION`).

| Élément | Valeur |
|---|---|
| E-mail du club | bclaplaine@gmail.com (dossier et cours d'essai) |
| Licence | https://monespace.ffboxe.com/auth/login |
| Tarifs | Loisir — BEA : 360 € ; BA — Compétiteurs : 360 € |
| Règlement | par virement bancaire uniquement ; RIB = PDF officiel hébergé sur le site actuel du club |

Phrases reprises telles quelles : « Vous n'avez rien à payer lors de la création de la licence sur le site de la FFB. », « Tout dossier incomplet sera rejeté. », « par virement bancaire UNIQUEMENT ».

### Documents publiés (`public/assets/documents/`)
Copies des fichiers du dossier local `download/`, renommées.

| Document | Loisir — BEA | BA — Compétiteurs |
|---|---|---|
| Règlement intérieur | oui | oui (même fichier) |
| Charte éthique | oui | oui (même fichier) |
| Demande de licence | oui | oui (même fichier) |
| Certificat médical (saison 2026-2027) | version BEA | version BA |
| Certificat ophtalmologique (saison 2026-2027) | — | oui |
| Engagement amateur | — | **non publié** : « Document à fournir » |
| Demande de cours d'essai | section cours d'essai | |

### Points à valider par le club
- **Engagement amateur** : le fichier fourni cite comme coachs Christophe Tiozzo et Christopher Coué. Il n'est pas publié ; une version à jour est attendue.
- **Certificat ophtalmologique** : présent dans le dossier BA mais absent de la liste de quatre documents du brief. Publié, car c'est un document fédéral du dossier compétiteur.
- **Règlement intérieur** : le fichier d'origine s'intitule « 2025-2026 », les certificats « 2026-2027 ».
- **Deux adresses e-mail** dans les informations reçues : `bclaplaine@gmail.com` et `boxingclubdelaplaine@gmail.com` (citée pour le cours d'essai). Le site n'utilise que la première, comme demandé.
- **RIB** : le lien pointe vers le site actuel du club ; il cessera de fonctionner si ce site est fermé. Prévoir d'héberger le PDF avec le nouveau site.
- Intitulés ajoutés par l'agent : « Quatre étapes, un dossier. », « Tout est prêt ? », « Une question ? / Écrivez au club. », et les trois repères du cours d'essai.

## Coordonnées officielles (sprint Coordonnées)
Fichier : `src/data/contact.ts` (`CONTACT`, `PHONE_HREF`, `EMAIL_HREF`, `MAP_HREF`). Source de vérité ; l'e-mail de la page Inscription en dépend.

| Élément | Valeur |
|---|---|
| Nom | Boxing Club de la Plaine |
| Type | Club de boxe |
| Adresse | 13 Rue du Général Guillaumat, 75015 Paris, France |
| Téléphone | 07 89 48 20 38 (`tel:+33789482038`) |
| E-mail | bclaplaine@gmail.com |

Ces valeurs sont aussi écrites en dur dans les données structurées de `index.html` (adresse, téléphone, e-mail) : à modifier aux deux endroits. Non renseignés, faute d'information : coordonnées GPS, horaires d'ouverture, avis, note.

## Pages juridiques (sprint Mentions légales)
Fichier : `src/data/legal.ts` (`PUBLISHER`, `LEGAL_NOTICE`, `PRIVACY_POLICY`). Adresse, téléphone et e-mail viennent de `contact.ts`.

Informations officielles fournies par le club : dénomination BOXING CLUB DE LA PLAINE ; association loi de 1901 ; présidente Géraldine Filloux ; éditeur de la publication Boxing Club De La Plaine ; hébergeur indiqué dans les mentions du site actuel : Wix.

### Ce que le site fait réellement (vérifié dans le code et le navigateur, toutes pages)
| Point | État |
|---|---|
| Cookies | aucun |
| Stockage local | aucun en `localStorage` ; position de défilement en mémoire de session |
| Requêtes vers des tiers | aucune (polices et images servies par le site) |
| Formulaire, compte, mesure d'audience, publicité | aucun |
| Carte ou contenu embarqué | aucun |
| Liens sortants | espace licence FFB, Google Maps, RIB sur le site actuel du club |

La politique de confidentialité décrit uniquement cela. **Si une fonctionnalité change (formulaire, statistiques, carte embarquée), le texte doit être mis à jour en même temps.** Aucune page Cookies n'est créée : elle n'a pas d'objet tant qu'aucun cookie n'est déposé.

### Informations manquantes (affichées « À confirmer » ou absentes)
- Hébergeur du **nouveau** site et ses coordonnées (raison sociale, adresse, téléphone). « Wix » est l'hébergeur du site actuel ; ce site-ci, construit hors Wix, sera vraisemblablement hébergé ailleurs.
- Données techniques de connexion conservées par l'hébergeur.
- Durée de conservation des messages et des dossiers reçus par e-mail.
- Directeur ou directrice de la publication (seul « éditeur de la publication » a été fourni).
- Numéro RNA, SIRET le cas échéant.
- Délégué à la protection des données : non mentionné, faute d'information.
