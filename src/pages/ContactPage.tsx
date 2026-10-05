import { CONTACT, CONTACT_CITY_LINE } from '@/data/contact'
import { ROUTES } from '@/data/navigation'
import { usePageMeta } from '@/hooks/usePageMeta'
import { ContactDetails } from '@/sections/contact/ContactDetails'

/** Page Contact : les coordonnées officielles du club. */
export function ContactPage() {
  usePageMeta({
    title: 'Contact',
    description: `${CONTACT.clubName}, ${CONTACT.category.toLowerCase()} : ${CONTACT.address}, ${CONTACT_CITY_LINE}. Téléphone, e-mail et itinéraire.`,
    path: ROUTES.contact,
  })

  return <ContactDetails />
}
