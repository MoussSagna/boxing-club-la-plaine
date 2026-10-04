import { PagePlaceholder } from '@/components/PagePlaceholder'
import { ROUTES } from '@/data/navigation'
import { usePageMeta } from '@/hooks/usePageMeta'

export function CoachsPage() {
  usePageMeta({ title: 'Coachs', path: ROUTES.coachs })

  return <PagePlaceholder title="Coachs" sprint="Sprint 7" />
}
