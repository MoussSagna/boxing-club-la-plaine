import { Section } from '@/components/Section'
import { CoachProfile, type CoachLayout } from '@/sections/coaches/CoachProfile'
import type { Coach } from '@/types'

/*
 * Alternance éditoriale, dans l'ordre de la page. Au-delà de la liste, le cycle reprend.
 * Le dernier coach de la liste reçoit la composition la plus riche s'il a deux photos.
 */
const SEQUENCE: CoachLayout[] = ['left', 'right', 'center', 'narrow', 'right']

function getLayout(coach: Coach, index: number): CoachLayout {
  const hasBothPhotos =
    coach.photos.some((photo) => photo.kind === 'portrait') &&
    coach.photos.some((photo) => photo.kind === 'action')
  return hasBothPhotos ? 'duo' : (SEQUENCE[index % SEQUENCE.length] ?? 'left')
}

/** Les coachs actuels, l'un après l'autre, chacun dans sa composition. */
export function CoachesList({ coaches }: { coaches: Coach[] }) {
  return (
    <Section spacing="none" aria-label="Les coachs">
      {coaches.map((coach, index) => (
        <CoachProfile
          key={coach.id}
          coach={coach}
          number={String(index + 1).padStart(2, '0')}
          layout={getLayout(coach, index)}
        />
      ))}
    </Section>
  )
}
