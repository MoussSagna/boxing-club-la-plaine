import { CLUB_HISTORY } from '@/data/history'
import { HOME_HERO } from '@/data/home'
import { ROUTES } from '@/data/navigation'
import { usePageMeta } from '@/hooks/usePageMeta'
import { ClubHistory } from '@/sections/club-history/ClubHistory'
import { Hero } from '@/sections/hero/Hero'

/*
 * Homepage. Construits : le hero (Sprint 3) et l'histoire du club (Sprint 4).
 * Les sections suivantes arrivent à partir du Sprint 5.
 */
export function HomePage() {
  usePageMeta({ path: ROUTES.home })

  return (
    <>
      <Hero content={HOME_HERO} />
      <ClubHistory content={CLUB_HISTORY} />
    </>
  )
}
