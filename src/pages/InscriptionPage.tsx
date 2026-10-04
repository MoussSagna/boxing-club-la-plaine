import { PagePlaceholder } from '@/components/PagePlaceholder'
import { ROUTES } from '@/data/navigation'
import { usePageMeta } from '@/hooks/usePageMeta'

export function InscriptionPage() {
  usePageMeta({ title: 'Inscription', path: ROUTES.inscription })

  return <PagePlaceholder title="Inscription" sprint="Sprint 9" />
}
