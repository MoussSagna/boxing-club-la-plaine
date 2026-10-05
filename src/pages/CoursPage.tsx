import { COURSES_PAGE } from '@/data/courses'
import { ROUTES } from '@/data/navigation'
import { usePageMeta } from '@/hooks/usePageMeta'
import { CoursesApproaches } from '@/sections/courses/CoursesApproaches'
import { CoursesHero } from '@/sections/courses/CoursesHero'
import { CoursesIntro } from '@/sections/courses/CoursesIntro'
import { CoursesOutro } from '@/sections/courses/CoursesOutro'
import { CoursesProfiles } from '@/sections/courses/CoursesProfiles'
import { CoursesSpotlight } from '@/sections/courses/CoursesSpotlight'

/** Page Cours : ce qu'on travaille, avec qui, et pour quel profil. Page typographique, sans image. */
export function CoursPage() {
  usePageMeta({
    title: 'Les cours',
    description:
      'Découvrez les différentes approches des cours de boxe du Boxing Club de la Plaine : technique, préparation physique, cardio et assauts.',
    path: ROUTES.cours,
  })

  return (
    <>
      <CoursesHero content={COURSES_PAGE.hero} />
      <CoursesIntro content={COURSES_PAGE.intro} />
      <CoursesApproaches content={COURSES_PAGE.approaches} />
      <CoursesSpotlight content={COURSES_PAGE.spotlight} />
      <CoursesProfiles content={COURSES_PAGE.profiles} />
      <CoursesOutro content={COURSES_PAGE.outro} />
    </>
  )
}
