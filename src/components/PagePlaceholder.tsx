import { SectionEyebrow } from '@/components/SectionEyebrow'
import { SectionTitle } from '@/components/SectionTitle'
import { SITE } from '@/data/site'

type PagePlaceholderProps = {
  title: string
  /** Sprint au cours duquel la page sera construite (docs/12-sprints.md). */
  sprint: string
}

/**
 * Structure minimale temporaire des pages (Sprint 0) : sert à vérifier
 * le routing. À supprimer une fois toutes les pages construites.
 */
export function PagePlaceholder({ title, sprint }: PagePlaceholderProps) {
  return (
    <section className="container-site flex min-h-[70svh] flex-col justify-end gap-6 py-16 lg:py-24">
      <SectionEyebrow>{SITE.location}</SectionEyebrow>
      <SectionTitle as="h1" size="xl">
        {title}
      </SectionTitle>
      <p className="label text-muted-foreground">Page en construction — {sprint}</p>
    </section>
  )
}
