import { CONTACT, CONTACT_CITY_LINE, EMAIL_HREF, PHONE_HREF } from '@/data/contact'
import { ROUTES } from '@/data/navigation'
import type { LegalPageContent, LegalRow } from '@/types'

/*
 * Pages juridiques.
 *
 * RÈGLE : aucune information légale n'est inventée. Ce qui n'a pas été fourni par le club
 * (numéro RNA, SIRET, directeur de la publication, coordonnées de l'hébergeur, durées de
 * conservation…) est soit absent, soit marqué `toConfirm` et affiché « À confirmer ».
 *
 * La politique de confidentialité décrit UNIQUEMENT ce que le site fait réellement
 * (état vérifié dans le code et dans le navigateur) :
 *   - aucun formulaire, aucun compte, aucune mesure d'audience, aucune publicité ;
 *   - aucun cookie ;
 *   - un seul stockage local : la position de défilement, en mémoire de session ;
 *   - polices et images servies par le site lui-même ;
 *   - liens sortants : espace licence FFB, service de cartographie, RIB du club.
 * Si une de ces fonctionnalités change (formulaire, statistiques, carte embarquée…),
 * ce texte doit être mis à jour en même temps.
 */

/** Informations officielles de l'association, fournies par le club. */
export const PUBLISHER = {
  name: 'BOXING CLUB DE LA PLAINE',
  legalForm: 'Association loi de 1901',
  president: 'Géraldine Filloux',
  publicationEditor: 'Boxing Club De La Plaine',
  /** Hébergeur indiqué dans les mentions du site actuel du club. */
  host: 'Wix',
} as const

const address = [CONTACT.address, CONTACT_CITY_LINE]

const contactRows: LegalRow[] = [
  { label: 'E-mail', value: CONTACT.email, href: EMAIL_HREF },
  { label: 'Téléphone', value: CONTACT.phone, href: PHONE_HREF },
]

export const LEGAL_NOTICE: LegalPageContent = {
  eyebrow: 'Informations légales',
  title: { lines: ['Mentions'], accent: 'légales' },
  sections: [
    {
      id: 'editeur',
      title: 'Éditeur du site',
      rows: [
        { label: 'Dénomination', value: PUBLISHER.name },
        { label: 'Forme juridique', value: PUBLISHER.legalForm },
        { label: 'Adresse', value: address },
        { label: 'Présidente', value: PUBLISHER.president },
        { label: 'Éditeur de la publication', value: PUBLISHER.publicationEditor },
        ...contactRows,
      ],
    },
    {
      id: 'hebergeur',
      title: 'Hébergeur',
      rows: [
        // « Wix » est l'hébergeur du site ACTUEL du club. Celui du nouveau site, et ses
        // coordonnées (raison sociale, adresse, téléphone), restent à confirmer.
        { label: 'Hébergeur', value: PUBLISHER.host, toConfirm: true },
        { label: 'Coordonnées de l’hébergeur', toConfirm: true },
      ],
    },
    {
      id: 'donnees-personnelles',
      title: 'Données personnelles',
      paragraphs: [
        'Les informations relatives aux données personnelles et aux cookies figurent dans la politique de confidentialité.',
      ],
      link: { label: 'Politique de confidentialité', href: ROUTES.confidentialite },
    },
  ],
}

export const PRIVACY_POLICY: LegalPageContent = {
  eyebrow: 'Données personnelles',
  title: { lines: ['Politique de'], accent: 'confidentialité' },
  sections: [
    {
      id: 'responsable',
      title: 'Responsable',
      rows: [
        { label: 'Dénomination', value: PUBLISHER.name },
        { label: 'Forme juridique', value: PUBLISHER.legalForm },
        { label: 'Adresse', value: address },
        ...contactRows,
      ],
    },
    {
      id: 'collecte',
      title: 'Ce que ce site collecte',
      paragraphs: [
        'Ce site est un site d’information. Il ne collecte aucune donnée personnelle par lui-même.',
      ],
      items: [
        'Aucun formulaire en ligne.',
        'Aucun compte utilisateur.',
        'Aucun outil de mesure d’audience ni de suivi.',
        'Aucune publicité.',
      ],
    },
    {
      id: 'ecrire-au-club',
      title: 'Lorsque vous écrivez au club',
      paragraphs: [
        'Les liens « e-mail » du site ouvrent votre propre messagerie : rien n’est envoyé par le site.',
        'Les messages que vous adressez au club, ainsi que les documents que vous y joignez (demande de cours d’essai, dossier d’inscription), sont reçus par le club sur sa messagerie. Ils servent à vous répondre et à traiter votre demande.',
      ],
      rows: [{ label: 'Durée de conservation', toConfirm: true }],
    },
    {
      id: 'cookies',
      title: 'Cookies',
      paragraphs: [
        'Ce site ne dépose aucun cookie. Aucun consentement n’est donc demandé.',
        'Pour retrouver votre position dans une page lorsque vous revenez en arrière, le site mémorise la position de défilement dans votre navigateur. Cette information ne contient aucune donnée personnelle, n’est transmise à personne et disparaît à la fermeture de l’onglet.',
      ],
    },
    {
      id: 'hebergement',
      title: 'Hébergement',
      rows: [
        { label: 'Hébergeur', value: PUBLISHER.host, toConfirm: true },
        { label: 'Données techniques de connexion traitées par l’hébergeur', toConfirm: true },
      ],
    },
    {
      id: 'liens-externes',
      title: 'Liens vers d’autres sites',
      paragraphs: [
        'Certains liens mènent vers des sites extérieurs, qui appliquent leurs propres règles de confidentialité. Aucune donnée ne leur est transmise par ce site avant votre clic.',
      ],
      items: [
        'L’espace licence de la Fédération Française de Boxe.',
        'Un service de cartographie, pour l’itinéraire.',
        'Le RIB du club, document hébergé sur son site actuel.',
      ],
    },
    {
      id: 'vos-droits',
      title: 'Vos droits',
      paragraphs: [
        'Vous pouvez demander l’accès aux données qui vous concernent, leur rectification ou leur effacement, et vous opposer à leur traitement, en écrivant au club.',
        'Vous pouvez également adresser une réclamation à la Commission nationale de l’informatique et des libertés (CNIL).',
      ],
      rows: [
        { label: 'Écrire au club', value: CONTACT.email, href: EMAIL_HREF },
        { label: 'CNIL', value: 'www.cnil.fr', href: 'https://www.cnil.fr' },
      ],
    },
  ],
}
