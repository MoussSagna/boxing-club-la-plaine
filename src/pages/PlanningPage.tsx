import { PagePlaceholder } from '@/components/PagePlaceholder'
import { ROUTES } from '@/data/navigation'
import { usePageMeta } from '@/hooks/usePageMeta'

export function PlanningPage() {
  usePageMeta({ title: 'Planning', path: ROUTES.planning })

  return <PagePlaceholder title="Planning" sprint="Sprint 6" />
}
