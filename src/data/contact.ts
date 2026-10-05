/*
 * Coordonnées OFFICIELLES du club — source de vérité du site.
 * Fournies par le club : ne rien y ajouter (ni horaires d'ouverture, ni coordonnées GPS,
 * ni avis) sans information officielle.
 *
 * Ces valeurs sont aussi écrites en statique dans les données structurées de index.html,
 * qui ne peut pas importer ce fichier : les garder synchronisées.
 */
export const CONTACT = {
  clubName: 'Boxing Club de la Plaine',
  category: 'Club de boxe',
  address: '13 Rue du Général Guillaumat',
  postalCode: '75015',
  city: 'Paris',
  country: 'France',
  phone: '07 89 48 20 38',
  email: 'bclaplaine@gmail.com',
} as const

/** « 75015 Paris » */
export const CONTACT_CITY_LINE = `${CONTACT.postalCode} ${CONTACT.city}`

/** `tel:+33789482038` — numéro au format international, sans espaces. */
export const PHONE_HREF = `tel:+33${CONTACT.phone.replaceAll(' ', '').slice(1)}`

export const EMAIL_HREF = `mailto:${CONTACT.email}`

/** Ouvre l'adresse du club dans un service de cartographie (lien externe, aucune carte embarquée). */
export const MAP_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${CONTACT.address}, ${CONTACT_CITY_LINE}`,
)}`
