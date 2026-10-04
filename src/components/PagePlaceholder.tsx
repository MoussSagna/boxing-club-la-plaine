import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { SITE } from '@/data/site'

type PagePlaceholderProps = {
  title: string
  /** Sprint au cours duquel la page sera construite (docs/12-sprints.md). */
  sprint: string
}

/**
 * Structure minimale temporaire des pages : sert à vérifier le routing.
 * À supprimer une fois toutes les pages construites.
 */
export function PagePlaceholder({ title, sprint }: PagePlaceholderProps) {
  return (
    <Section spacing="large" className="flex min-h-[70svh] flex-col justify-end">
      <SectionHeader as="h1" size="xl" eyebrow={SITE.location} title={title}>
        <p className="label text-muted-foreground">Page en construction — {sprint}</p>
      </SectionHeader>
    </Section>
  )
}
