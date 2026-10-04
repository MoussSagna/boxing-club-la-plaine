import { PagePlaceholder } from '@/components/PagePlaceholder'
import { ROUTES } from '@/data/navigation'
import { usePageMeta } from '@/hooks/usePageMeta'

export function ContactPage() {
  usePageMeta({ title: 'Contact', path: ROUTES.contact })

  return <PagePlaceholder title="Contact" sprint="Sprint 9" />
}
