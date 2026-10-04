import { Link } from 'react-router'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/data/navigation'
import { useEffect } from 'react'
import { SITE } from '@/data/site'

export function NotFoundPage() {
  useEffect(() => {
    document.title = `Page introuvable — ${SITE.name}`
  }, [])

  return (
    <section className="container-site flex min-h-[70svh] flex-col items-start justify-end gap-6 py-16 lg:py-24">
      <SectionEyebrow>Erreur 404</SectionEyebrow>
      <SectionTitle as="h1" size="xl">
        Page introuvable
      </SectionTitle>
      <Button asChild>
        <Link to={ROUTES.home}>Retour à l’accueil</Link>
      </Button>
    </section>
  )
}
