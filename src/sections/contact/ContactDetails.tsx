import type { ReactNode } from 'react'
import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Accent, SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/ui/link'
import {
  CONTACT,
  CONTACT_CITY_LINE,
  EMAIL_HREF,
  MAP_HREF,
  PHONE_HREF,
} from '@/data/contact'
import { useRowReveal } from '@/hooks/useRowReveal'
import { MaskedLine } from '@/sections/courses/MaskedLines'

/** Une ligne de coordonnées : intitulé à gauche, valeur en grand, lien d'action à droite. */
function ContactRow({
  label,
  action,
  href,
  children,
}: {
  label: string
  action: string
  href: string
  children: ReactNode
}) {
  const ref = useRowReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="relative grid-site items-baseline gap-y-4 py-8 lg:py-10">
      <span
        aria-hidden="true"
        data-row-rule
        className="absolute inset-x-0 top-0 h-px origin-left bg-border"
      />
      <dt data-row-fade className="label col-span-4 text-muted-foreground md:col-span-8 lg:col-span-2">
        {label}
      </dt>
      <dd className="col-span-4 flex flex-col items-start gap-5 md:col-span-8 lg:col-span-10 lg:flex-row lg:items-baseline lg:justify-between lg:gap-8">
        {/* Interligne desserré : l'accent de « GÉNÉRAL » toucherait la ligne du dessus. */}
        <span data-row-fade className="display text-display-m leading-[1.15]">
          {children}
        </span>
        <span data-row-fade className="shrink-0">
          <Button asChild variant="text">
            <AppLink href={href} arrow>
              {action}
            </AppLink>
          </Button>
        </span>
      </dd>
    </div>
  )
}

/**
 * Page Contact : « Nous trouver ». Les coordonnées officielles, chacune avec son action.
 * Aucune carte embarquée : un lien ouvre l'adresse dans un service de cartographie.
 */
export function ContactDetails() {
  const ref = useRowReveal<HTMLDivElement>()
  const [emailUser, emailDomain] = CONTACT.email.split('@')

  return (
    <Section spacing="none" className="pt-12 pb-20 lg:pt-20 lg:pb-32">
      <div ref={ref} className="mb-10 flex flex-col gap-6 lg:mb-16 lg:gap-8">
        <SectionEyebrow data-row-fade>Contact</SectionEyebrow>
        <SectionTitle as="h1" size="xl">
          <MaskedLine>Nous</MaskedLine>
          <MaskedLine>
            <Accent>trouver.</Accent>
          </MaskedLine>
        </SectionTitle>
        <p data-row-fade className="label">
          {CONTACT.clubName} — {CONTACT.category}
        </p>
      </div>

      <dl className="border-b border-border">
        <ContactRow label="Adresse" action="Voir sur la carte" href={MAP_HREF}>
          <address className="not-italic">
            {CONTACT.address}
            <br />
            {CONTACT_CITY_LINE}
          </address>
        </ContactRow>
        <ContactRow label="Téléphone" action="Appeler le club" href={PHONE_HREF}>
          <a href={PHONE_HREF} className="whitespace-nowrap transition-colors duration-200 hover:text-primary">
            {CONTACT.phone}
          </a>
        </ContactRow>
        <ContactRow label="E-mail" action="Envoyer un email" href={EMAIL_HREF}>
          <a href={EMAIL_HREF} className="normal-case transition-colors duration-200 hover:text-primary">
            {emailUser}
            <wbr />@{emailDomain}
          </a>
        </ContactRow>
      </dl>
    </Section>
  )
}
