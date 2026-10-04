/**
 * Grain argentique global : calque fixe, statique (aucune animation permanente),
 * purement décoratif et transparent aux interactions.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 bg-(image:--texture-grain) opacity-[0.06]"
    />
  )
}
