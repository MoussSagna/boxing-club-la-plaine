import { PagePlaceholder } from '@/components/PagePlaceholder'
import { ROUTES } from '@/data/navigation'
import { usePageMeta } from '@/hooks/usePageMeta'

export function ClubPage() {
  usePageMeta({ title: 'Le club', path: ROUTES.club })

  return <PagePlaceholder title="Le club" sprint="Sprint 4" />
}
