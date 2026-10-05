import { LEGAL_NOTICE } from '@/data/legal'
import { ROUTES } from '@/data/navigation'
import { usePageMeta } from '@/hooks/usePageMeta'
import { LegalPage } from '@/sections/legal/LegalPage'

export function MentionsLegalesPage() {
  usePageMeta({
    title: 'Mentions légales',
    description:
      'Mentions légales du site du Boxing Club de la Plaine : éditeur, hébergeur et informations relatives aux données personnelles.',
    path: ROUTES.mentionsLegales,
  })

  return <LegalPage content={LEGAL_NOTICE} />
}
