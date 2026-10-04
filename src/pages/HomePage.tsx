import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { ImageReveal } from '@/components/ImageReveal'
import { ParallaxImage } from '@/components/ParallaxImage'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/data/navigation'
import { PLACEHOLDER_IMAGE, SITE } from '@/data/site'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useScrollReveal } from '@/hooks/useScrollReveal'

/*
 * SPRINT 0 — aperçu des fondations uniquement (tokens, typographie, boutons,
 * grille, hooks GSAP). Ce n'est PAS la homepage : le hero arrive au Sprint 3,
 * la section histoire au Sprint 4.
 */
export function HomePage() {
  usePageMeta({ path: ROUTES.home })
  const introRef = useScrollReveal<HTMLDivElement>({ selector: '[data-reveal]' })

  return (
    <>
      <section className="container-site flex min-h-[70svh] flex-col justify-end gap-8 py-16 lg:py-24">
        <SectionEyebrow>{SITE.location}</SectionEyebrow>
        <SectionTitle as="h1" size="xl">
          Boxing Club
          <br />
          <span className="text-primary">de la Plaine</span>
        </SectionTitle>
        <p className="label">{SITE.tagline}</p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link to={ROUTES.club}>
              Découvrir le club
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link to={ROUTES.planning}>Voir le planning</Link>
          </Button>
        </div>
      </section>

      <section data-theme="cream">
        <div ref={introRef} className="container-site grid-site gap-y-10 py-16 lg:py-32">
          <div className="col-span-4 flex flex-col items-start gap-6 md:col-span-8 lg:col-span-6">
            <SectionEyebrow data-reveal>Notre histoire</SectionEyebrow>
            <SectionTitle data-reveal>
              Plus qu’une salle.
              <br />
              <span className="text-primary">Une histoire.</span>
            </SectionTitle>
            <Button asChild variant="link" data-reveal>
              <Link to={ROUTES.club}>
                Découvrir notre histoire
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>

          {/* Visuels temporaires : démontrent ImageReveal et ParallaxImage. */}
          <ImageReveal
            src={PLACEHOLDER_IMAGE}
            alt=""
            width={1600}
            height={1200}
            className="col-span-2 aspect-4/5 md:col-span-4 lg:col-span-3"
          />
          <ParallaxImage
            src={PLACEHOLDER_IMAGE}
            alt=""
            width={1600}
            height={1200}
            className="col-span-2 aspect-4/5 md:col-span-4 lg:col-span-3"
          />
        </div>
      </section>
    </>
  )
}
