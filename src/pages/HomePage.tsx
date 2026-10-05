import { CLUB_HISTORY } from '@/data/history'
import { HOME_HERO } from '@/data/home'
import { ROUTES } from '@/data/navigation'
import { TRAINING_SCHEDULE } from '@/data/schedule'
import { usePageMeta } from '@/hooks/usePageMeta'
import { ClubHistory } from '@/sections/club-history/ClubHistory'
import { Hero } from '@/sections/hero/Hero'
import { TrainingSchedule } from '@/sections/schedule/TrainingSchedule'

/*
 * Homepage. Construits : le hero (Sprint 3), l'histoire du club (Sprint 4)
 * et les entraînements (Sprint 5). Les sections suivantes arrivent ensuite.
 */
export function HomePage() {
  usePageMeta({ path: ROUTES.home })

  return (
    <>
      <Hero content={HOME_HERO} />
      <ClubHistory content={CLUB_HISTORY} />
      <TrainingSchedule content={TRAINING_SCHEDULE} />
    </>
  )
}
