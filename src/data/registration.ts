import { CONTACT } from '@/data/contact'
import { ROUTES } from '@/data/navigation'
import type { RegistrationDocument, RegistrationPractice, TextPart } from '@/types'

/*
 * Page /inscription — informations OFFICIELLES communiquées par le club.
 * Les phrases de procédure sont reprises sans en changer le sens.
 * Rien n'est ajouté : pas de mensualités, de réductions, de frais annexes, de définition
 * de BEA / BA, ni de coordonnées bancaires (le RIB est le document officiel du club).
 * Titres et accroches : formulations éditoriales, pas des slogans officiels.
 */

const DOCUMENTS = '/assets/documents'

export const REGISTRATION = {
  /** Adresse du club pour le dossier et pour le cours d'essai (source : `contact.ts`). */
  email: CONTACT.email,

  links: {
    /** Espace licencié de la Fédération Française de Boxe (lien officiel). */
    ffb: 'https://monespace.ffboxe.com/auth/login',
    /** RIB officiel du club (PDF hébergé sur le site actuel du club). */
    rib: 'https://www.boxingclubdelaplaine.com/_files/ugd/87ea0d_756db576521546bfa2bec29253fa37a0.pdf',
    trialForm: `${DOCUMENTS}/demande-cours-essai.pdf`,
  },

  practices: [
    { id: 'bea', label: 'Loisir — BEA', price: 360 },
    { id: 'ba', label: 'BA — Compétiteurs', price: 360 },
  ] satisfies RegistrationPractice[],

  // Fichiers officiels fournis par le club (dossier `download/`, copiés sous des noms simples).
  // Pour brancher un nouveau document : déposer le PDF dans public/assets/documents/ et
  // renseigner `href`.
  documents: [
    {
      id: 'reglement-interieur',
      title: 'Règlement intérieur',
      practiceIds: ['bea', 'ba'],
      href: `${DOCUMENTS}/reglement-interieur.pdf`,
    },
    {
      id: 'charte-ethique',
      title: 'Charte éthique',
      practiceIds: ['bea', 'ba'],
      href: `${DOCUMENTS}/charte-ethique-et-deontologique.pdf`,
    },
    {
      id: 'demande-de-licence',
      title: 'Demande de licence',
      practiceIds: ['bea', 'ba'],
      href: `${DOCUMENTS}/demande-de-licence-bea-ba.pdf`,
    },
    {
      id: 'certificat-medical-bea',
      title: 'Certificat médical',
      practiceIds: ['bea'],
      href: `${DOCUMENTS}/certificat-medical-bea-2026-2027.pdf`,
    },
    {
      id: 'certificat-medical-ba',
      title: 'Certificat médical',
      practiceIds: ['ba'],
      href: `${DOCUMENTS}/certificat-medical-ba-2026-2027.pdf`,
    },
    {
      id: 'certificat-ophtalmologique-ba',
      title: 'Certificat ophtalmologique',
      practiceIds: ['ba'],
      href: `${DOCUMENTS}/certificat-ophtalmologique-ba-2026-2027.pdf`,
    },
    {
      // Le fichier fourni (« Engagement amateur ») cite des encadrants qui ne sont plus à jour :
      // il n'est pas publié. À remplacer par la version actualisée du club.
      id: 'engagement-amateur',
      title: 'Engagement amateur',
      practiceIds: ['ba'],
      href: null,
    },
  ] satisfies RegistrationDocument[],

  hero: {
    eyebrow: 'Inscriptions',
    title: { lines: ['Votre premier'], accent: 'round commence ici.' },
    text: 'Inscription, licence, documents, règlement : voici tout ce qu’il faut préparer pour rejoindre le club.',
    paths: [
      { label: 'Je veux essayer', href: '#essai' },
      { label: 'Je veux m’inscrire', href: '#inscription' },
    ],
  },

  trial: {
    eyebrow: 'Avant de vous inscrire',
    title: 'Essayez d’abord.',
    paragraphs: [
      'Pour suivre un cours d’essai avant inscription, vous devez impérativement faire une demande via le formulaire prévu à cet effet.',
      'Envoyez ensuite un email au club afin de définir une date et un horaire.',
    ],
    steps: ['Le formulaire', 'L’email au club', 'Une date et un horaire définis avec le club'],
    downloadLabel: 'Télécharger la demande de cours d’essai',
    emailLabel: 'Envoyer un email',
  },

  steps: {
    eyebrow: 'Je veux m’inscrire',
    title: { lines: ['Quatre étapes,'], accent: 'un dossier.' },
    overview: ['Licence FFB', 'Documents', 'Règlement', 'Envoi du dossier'],

    licence: {
      title: 'Prendre sa licence',
      text: 'La prise de licence se fait obligatoirement via l’espace de la Fédération Française de Boxe.',
      note: 'Vous n’avez rien à payer lors de la création de la licence sur le site de la FFB.',
      cta: 'Accéder à mon espace FFB',
    },
    documents: {
      title: 'Préparer son dossier',
      text: [
        { text: 'Imprimez les documents correspondant à votre pratique, remplissez-les ' },
        { text: 'LISIBLEMENT', strong: true },
        { text: ' et ' },
        { text: 'SIGNEZ', strong: true },
        { text: '-les.' },
      ] satisfies TextPart[],
      extra: 'Une photo d’identité',
      missing: 'Document à fournir',
    },
    payment: {
      title: 'Régler le club',
      text: [
        { text: 'Le règlement se fait directement auprès du club par virement bancaire ' },
        { text: 'UNIQUEMENT', strong: true },
        { text: '.' },
      ] satisfies TextPart[],
      cta: 'Télécharger le RIB',
    },
    sending: {
      title: 'Envoyer son dossier',
      text: 'Après votre prise de licence en ligne, transmettez votre dossier complet au club.',
      cta: 'Envoyer mon dossier',
      warning: 'Tout dossier incomplet sera rejeté.',
    },
  },

  // Aide visuelle tirée des instructions ci-dessus : aucune obligation supplémentaire.
  checklist: {
    eyebrow: 'Avant d’envoyer',
    title: 'Tout est prêt ?',
    items: [
      'Licence FFB créée',
      'Documents imprimés',
      'Documents remplis lisiblement',
      'Documents signés',
      'Photo d’identité ajoutée',
      'Règlement effectué par virement',
      'Dossier complet',
    ],
  },

  contact: {
    eyebrow: 'Une question ?',
    title: { lines: ['Contactez'], accent: 'le club.' },
    planning: { label: 'Voir le planning', href: ROUTES.planning },
  },
}
