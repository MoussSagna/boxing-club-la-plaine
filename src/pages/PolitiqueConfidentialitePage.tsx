import { PRIVACY_POLICY } from '@/data/legal'
import { ROUTES } from '@/data/navigation'
import { usePageMeta } from '@/hooks/usePageMeta'
import { LegalPage } from '@/sections/legal/LegalPage'

export function PolitiqueConfidentialitePage() {
  usePageMeta({
    title: 'Politique de confidentialité',
    description:
      'Politique de confidentialité du site du Boxing Club de la Plaine : données personnelles, cookies et droits des visiteurs.',
    path: ROUTES.confidentialite,
  })

  return <LegalPage content={PRIVACY_POLICY} />
}
