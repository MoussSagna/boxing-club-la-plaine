import { PagePlaceholder } from '@/components/PagePlaceholder'
import { ROUTES } from '@/data/navigation'
import { usePageMeta } from '@/hooks/usePageMeta'

export function ActualitesPage() {
  usePageMeta({ title: 'Actualités', path: ROUTES.actualites })

  return <PagePlaceholder title="Actualités" sprint="Sprint 8" />
}
