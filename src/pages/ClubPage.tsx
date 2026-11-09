import { CLUB_PAGE } from '@/data/club'
import { ROUTES } from '@/data/navigation'
import { usePageMeta } from '@/hooks/usePageMeta'
import { ClubHero } from '@/sections/club/ClubHero'
import { ClubNext } from '@/sections/club/ClubNext'
import { ClubSpace } from '@/sections/club/ClubSpace'
import { ClubSpirit } from '@/sections/club/ClubSpirit'
import { ClubStory } from '@/sections/club/ClubStory'
import { ClubTestimonials } from '@/sections/club/ClubTestimonials'
import { PlanningCallout } from '@/sections/schedule/PlanningCallout'

/**
 * Page Club : l'histoire, la salle, l'esprit. Noir et crème en alternance :
 * ouverture (noir) → histoire (crème) → la salle (noir) → l'esprit (crème)
 * → témoignages (noir, quand il y en aura) → coachs et cours (noir) → clôture (crème).
 */
export function ClubPage() {
  usePageMeta({
    title: 'Le club',
    description:
      'Créé le 13 mai 1991, le Boxing Club de la Plaine est un club de boxe familial à Paris 15 : son histoire, sa salle, son ring et son esprit.',
    path: ROUTES.club,
  })

  const { outro } = CLUB_PAGE

  return (
    <>
      <ClubHero content={CLUB_PAGE.hero} />
      <ClubStory content={CLUB_PAGE.story} />
      <ClubSpace content={CLUB_PAGE.space} />
      <ClubSpirit content={CLUB_PAGE.spirit} />
      <ClubTestimonials content={CLUB_PAGE.testimonials} />
      <ClubNext content={CLUB_PAGE.next} />
      <PlanningCallout
        id="club-cloture"
        theme="cream"
        size="xl"
        title={outro.title}
        text={outro.text}
        primaryCta={outro.primaryCta}
        secondaryCta={outro.secondaryCta}
      />
    </>
  )
}
