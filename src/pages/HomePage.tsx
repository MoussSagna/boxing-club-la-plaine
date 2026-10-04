import { ImageReveal } from '@/components/ImageReveal'
import { ParallaxImage } from '@/components/ParallaxImage'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { Accent } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { AppLink } from '@/components/ui/link'
import { HOME_HERO } from '@/data/home'
import { ROUTES } from '@/data/navigation'
import { PLACEHOLDER_IMAGE } from '@/data/site'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Hero } from '@/sections/hero/Hero'

/*
 * Homepage. Seul le hero est construit (Sprint 3).
 * Les sections suivantes arrivent à partir du Sprint 4.
 */
export function HomePage() {
  usePageMeta({ path: ROUTES.home })
  const introRef = useScrollReveal<HTMLDivElement>()

  return (
    <>
      <Hero content={HOME_HERO} />

      {/* Aperçu temporaire des fondations : sera remplacé par la section histoire (Sprint 4). */}
      <Section theme="cream" spacing="large">
        <div className="grid-site gap-y-10">
          <SectionHeader
            ref={introRef}
            className="col-span-4 md:col-span-8 lg:col-span-6"
            eyebrow="Notre histoire"
            title={
              <>
                Plus qu’une salle.
                <br />
                <Accent>Une histoire.</Accent>
              </>
            }
          >
            <Button asChild variant="text">
              <AppLink href={ROUTES.club} arrow>
                Découvrir notre histoire
              </AppLink>
            </Button>
          </SectionHeader>

          {/* Visuels temporaires. */}
          <ImageReveal
            src={PLACEHOLDER_IMAGE}
            alt=""
            width={1600}
            height={1200}
            ratio="4/5"
            className="col-span-2 md:col-span-4 lg:col-span-3"
          />
          <ParallaxImage
            src={PLACEHOLDER_IMAGE}
            alt=""
            width={1600}
            height={1200}
            ratio="4/5"
            className="col-span-2 md:col-span-4 lg:col-span-3"
          />
        </div>
      </Section>
    </>
  )
}
