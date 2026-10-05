import { ROUTES } from '@/data/navigation'
import { usePageMeta } from '@/hooks/usePageMeta'
import { RegistrationChecklist } from '@/sections/registration/RegistrationChecklist'
import { RegistrationContact } from '@/sections/registration/RegistrationContact'
import { RegistrationHero } from '@/sections/registration/RegistrationHero'
import { RegistrationSteps } from '@/sections/registration/RegistrationSteps'
import { RegistrationTrial } from '@/sections/registration/RegistrationTrial'

/** Page Inscription : essayer d'abord, ou s'inscrire en quatre étapes. Aucun formulaire en ligne. */
export function InscriptionPage() {
  usePageMeta({
    title: 'Inscription',
    description:
      'Découvrez les étapes pour vous inscrire au Boxing Club de la Plaine : licence FFB, documents, règlement et envoi du dossier.',
    path: ROUTES.inscription,
  })

  return (
    <>
      <RegistrationHero />
      <RegistrationTrial />
      <RegistrationSteps />
      <RegistrationChecklist />
      <RegistrationContact />
    </>
  )
}
