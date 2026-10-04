import { createBrowserRouter } from 'react-router'
import { ROUTES } from '@/data/navigation'
import { RootLayout } from '@/layouts/RootLayout'
import { ActualitesPage } from '@/pages/ActualitesPage'
import { ClubPage } from '@/pages/ClubPage'
import { CoachsPage } from '@/pages/CoachsPage'
import { ContactPage } from '@/pages/ContactPage'
import { CoursPage } from '@/pages/CoursPage'
import { HomePage } from '@/pages/HomePage'
import { InscriptionPage } from '@/pages/InscriptionPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PlanningPage } from '@/pages/PlanningPage'

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: ROUTES.home, Component: HomePage },
      { path: ROUTES.club, Component: ClubPage },
      { path: ROUTES.cours, Component: CoursPage },
      { path: ROUTES.planning, Component: PlanningPage },
      { path: ROUTES.coachs, Component: CoachsPage },
      { path: ROUTES.actualites, Component: ActualitesPage },
      { path: ROUTES.inscription, Component: InscriptionPage },
      { path: ROUTES.contact, Component: ContactPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
