import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { SectionTitle } from '@/components/SectionTitle'
import { useRowReveal } from '@/hooks/useRowReveal'
import { MaskedLine } from '@/sections/courses/MaskedLines'
import type { ClubPageContent, Testimonial } from '@/types'

const TITLE_ID = 'club-temoignages'

function TestimonialItem({ testimonial }: { testimonial: Testimonial }) {
  const ref = useRowReveal<HTMLLIElement>()

  return (
    <li ref={ref} className="relative col-span-4 pt-6 md:col-span-4 lg:col-span-6">
      <span
        aria-hidden="true"
        data-row-rule
        className="absolute inset-x-0 top-0 h-px origin-left bg-border"
      />
      <span
        aria-hidden="true"
        data-row-rule
        className="absolute top-0 left-0 h-1 w-12 origin-left bg-primary"
      />
      <figure data-row-fade className="flex flex-col gap-5">
        <blockquote className="display text-heading leading-[1.18]">
          <p>« {testimonial.quote} »</p>
        </blockquote>
        <figcaption className="flex flex-col gap-1">
          <span className="font-medium">{testimonial.author}</span>
          {testimonial.detail && (
            <span className="text-small text-muted-foreground">{testimonial.detail}</span>
          )}
        </figcaption>
      </figure>
    </li>
  )
}

/**
 * Témoignages de membres. Tant que la liste est vide, la section n'existe pas :
 * ni titre, ni emplacement réservé. Ajouter des témoignages réels dans `src/data/club.ts` suffit.
 */
export function ClubTestimonials({ content }: { content: ClubPageContent['testimonials'] }) {
  const ref = useRowReveal<HTMLDivElement>()

  if (content.items.length === 0) return null

  return (
    <Section spacing="large" aria-labelledby={TITLE_ID}>
      <div ref={ref} className="mb-10 flex flex-col gap-6 lg:mb-16 lg:gap-8">
        <SectionEyebrow data-row-fade>{content.eyebrow}</SectionEyebrow>
        <SectionTitle id={TITLE_ID} size="l">
          <MaskedLine>{content.title}</MaskedLine>
        </SectionTitle>
      </div>
      <ul className="grid-site gap-y-12 lg:gap-y-16">
        {content.items.map((testimonial) => (
          <TestimonialItem key={testimonial.id} testimonial={testimonial} />
        ))}
      </ul>
    </Section>
  )
}
