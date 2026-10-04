import { PagePlaceholder } from '@/components/PagePlaceholder'
import { ROUTES } from '@/data/navigation'
import { usePageMeta } from '@/hooks/usePageMeta'

export function CoursPage() {
  usePageMeta({ title: 'Cours', path: ROUTES.cours })

  return <PagePlaceholder title="Cours" sprint="Sprint 5" />
}
