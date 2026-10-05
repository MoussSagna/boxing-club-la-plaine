import { Section } from '@/components/Section'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { SectionTitle } from '@/components/SectionTitle'
import { useRowReveal } from '@/hooks/useRowReveal'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { MaskedLine } from '@/sections/courses/MaskedLines'
import type { CourseProfile, CoursesPageContent } from '@/types'

const TITLE_ID = 'cours-pour-qui'

function ProfileRow({ profile }: { profile: CourseProfile }) {
  const ref = useRowReveal<HTMLLIElement>()

  return (
    <li ref={ref} className="relative grid-site items-baseline gap-y-3 py-8 lg:py-10">
      <span
        aria-hidden="true"
        data-row-rule
        className="absolute inset-x-0 top-0 h-px origin-left bg-border"
      />
      <h3 className="display col-span-4 text-display-l md:col-span-8 lg:col-span-7">
        <MaskedLine>{profile.question}</MaskedLine>
      </h3>
      <div data-row-fade className="col-span-4 flex flex-col gap-2 md:col-span-6 lg:col-span-4 lg:col-start-9">
        <p className="label text-accent-text">{profile.label}</p>
        <p>{profile.description}</p>
      </div>
    </li>
  )
}

/** « Pour qui ? » : quatre questions pour se reconnaître — pas des niveaux officiels. */
export function CoursesProfiles({ content }: { content: CoursesPageContent['profiles'] }) {
  const headingRef = useScrollReveal<HTMLDivElement>({ selector: '[data-reveal]' })

  return (
    <Section spacing="large" aria-labelledby={TITLE_ID}>
      <div ref={headingRef} className="mb-10 flex flex-col gap-6 lg:mb-16">
        <SectionEyebrow data-reveal>{content.eyebrow}</SectionEyebrow>
        <SectionTitle id={TITLE_ID} size="m" data-reveal>
          {content.title}
        </SectionTitle>
      </div>
      <ul className="border-b border-border">
        {content.items.map((profile) => (
          <ProfileRow key={profile.id} profile={profile} />
        ))}
      </ul>
    </Section>
  )
}
