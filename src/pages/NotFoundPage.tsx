import { useLocation } from 'react-router'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/ui/link'
import { ROUTES } from '@/data/navigation'
import { usePageMeta } from '@/hooks/usePageMeta'

export function NotFoundPage() {
  const { pathname } = useLocation()
  usePageMeta({ title: 'Page introuvable', path: pathname, noindex: true })

  return (
    <Section spacing="large" className="flex min-h-[70svh] flex-col justify-end">
      <SectionHeader as="h1" size="xl" eyebrow="Erreur 404" title="Page introuvable">
        <Button asChild>
          <AppLink href={ROUTES.home}>Retour à l’accueil</AppLink>
        </Button>
      </SectionHeader>
    </Section>
  )
}
