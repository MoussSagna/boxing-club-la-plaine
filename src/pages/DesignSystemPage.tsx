import { ArrowLeft, ArrowRight, Menu } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { EditorialCard } from '@/components/EditorialCard'
import { ImageReveal } from '@/components/ImageReveal'
import { Logo } from '@/components/Logo'
import { MediaFrame, type MediaTreatment } from '@/components/MediaFrame'
import { ParallaxImage } from '@/components/ParallaxImage'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { Accent, SectionTitle } from '@/components/SectionTitle'
import { Button } from '@/components/ui/button'
import { IconButton } from '@/components/ui/icon-button'
import { AppLink } from '@/components/ui/link'
import { CTA_NAV, MAIN_NAV, ROUTES } from '@/data/navigation'
import { practices } from '@/data/practices'
import { PLACEHOLDER_IMAGE } from '@/data/site'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { cn } from '@/lib/utils'

/*
 * PAGE INTERNE — référence visuelle du design system.
 * Non indexée (meta robots + robots.txt), absente de la navigation et du sitemap.
 * Les textes de démonstration ne sont pas du contenu du site.
 */

const COLORS = [
  { name: 'Black', token: '--color-black', swatch: 'bg-black', usage: 'Fonds sombres, texte fort' },
  { name: 'Cream', token: '--color-cream', swatch: 'bg-cream', usage: 'Fonds éditoriaux, surfaces' },
  { name: 'Boxing Red', token: '--color-red', swatch: 'bg-red', usage: 'CTA, accents, grands chiffres' },
  { name: 'Dark Red', token: '--color-dark-red', swatch: 'bg-dark-red', usage: 'Hover, profondeur' },
  { name: 'Light Grey', token: '--color-grey', swatch: 'bg-grey', usage: 'Bordures, détails' },
  { name: 'White', token: '--color-white', swatch: 'bg-white', usage: 'Texte sur rouge et sur noir' },
] as const

const TYPE_SCALE = [
  { name: 'Display XL', classes: 'display text-display-xl', sample: 'Boxing Club' },
  { name: 'Display L', classes: 'display text-display-l', sample: 'Choisis ton terrain.' },
  { name: 'Display M', classes: 'display text-display-m', sample: 'Ton premier round' },
  { name: 'Heading', classes: 'display text-heading', sample: 'Boxe éducative' },
  {
    name: 'Body',
    classes: 'text-body max-w-prose',
    sample: 'Texte courant de démonstration : Inter, 16 à 20 px, interligne confortable pour la lecture.',
  },
  { name: 'Small', classes: 'text-small', sample: 'Légende, metadata, texte secondaire.' },
  { name: 'Label', classes: 'label', sample: 'Navigation — Bouton — Sur-titre' },
  { name: 'Micro', classes: 'micro', sample: '01 — Mention' },
] as const

const TREATMENTS: { treatment: MediaTreatment; label: string; grain?: boolean; vignette?: boolean }[] = [
  { treatment: 'none', label: 'none' },
  { treatment: 'monochrome', label: 'monochrome' },
  { treatment: 'contrast', label: 'contrast' },
  { treatment: 'red', label: 'red' },
  { treatment: 'contrast', label: 'contrast + grain + vignette', grain: true, vignette: true },
]

const GRID_LAYOUTS = [
  { label: 'Hero éditorial — 7 / 5', spans: ['lg:col-span-7', 'lg:col-span-5'] },
  { label: 'Image + texte — 6 / 6', spans: ['lg:col-span-6', 'lg:col-span-6'] },
  { label: 'Timeline — 2 / 10', spans: ['lg:col-span-2', 'lg:col-span-10'] },
  {
    label: 'Cartes, portraits — 4 × 3',
    spans: ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-3'],
  },
  { label: 'Actualités — 3 × 4', spans: ['lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4'] },
  { label: 'Planning — 3 / 9', spans: ['lg:col-span-3', 'lg:col-span-9'] },
] as const

/** Lit la valeur réelle du token : la page ne duplique aucun code couleur. */
function TokenValue({ token }: { token: string }) {
  const [value] = useState(() =>
    getComputedStyle(document.documentElement).getPropertyValue(token).trim().toUpperCase(),
  )
  return <>{value}</>
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="micro border-b border-border pb-3 text-muted-foreground">{title}</h2>
      {children}
    </div>
  )
}

function ButtonShowcase() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <Button>
          Primary
          <ArrowRight aria-hidden="true" />
        </Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="text">
          Text
          <ArrowRight aria-hidden="true" />
        </Button>
        <Button disabled>Disabled</Button>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <IconButton aria-label="Précédent" shape="round">
          <ArrowLeft aria-hidden="true" />
        </IconButton>
        <IconButton aria-label="Suivant" shape="round">
          <ArrowRight aria-hidden="true" />
        </IconButton>
        <IconButton aria-label="Suivant" variant="primary">
          <ArrowRight aria-hidden="true" />
        </IconButton>
        <IconButton aria-label="Suivant" variant="ghost" size="md">
          <ArrowRight aria-hidden="true" />
        </IconButton>
      </div>
    </div>
  )
}

function LinkShowcase() {
  return (
    <div className="flex flex-col items-start gap-6">
      <AppLink href={ROUTES.designSystem} variant="nav">
        Lien de navigation
      </AppLink>
      <Button asChild variant="text">
        <AppLink href={ROUTES.club} arrow>
          Lien CTA avec flèche
        </AppLink>
      </Button>
      <p className="max-w-prose">
        Un{' '}
        <AppLink href={ROUTES.club} variant="inline">
          lien éditorial
        </AppLink>{' '}
        dans un paragraphe, et un{' '}
        <AppLink href="https://www.boxingclubdelaplaine.com/" variant="inline" arrow>
          lien externe
        </AppLink>
        .
      </p>
    </div>
  )
}

/** Reproduction statique du header, pour comparer ses deux états côte à côte. */
function HeaderPreview({ theme, mobile = false }: { theme: 'dark' | 'cream'; mobile?: boolean }) {
  if (mobile) {
    return (
      <div
        data-theme={theme}
        className="flex h-18 w-full max-w-97.5 items-center justify-between border border-border px-5"
      >
        <Logo className="size-12" />
        <span className="label flex items-center gap-2">
          Menu
          <Menu aria-hidden="true" className="size-5" />
        </span>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <div
        data-theme={theme}
        className="grid h-24 min-w-240 grid-cols-[1fr_auto_1fr] items-center border border-border px-12"
      >
        <Logo className="size-16" />
        <ul className="flex items-center gap-8">
          {MAIN_NAV.map((item) => (
            <li key={item.href}>
              <AppLink href={item.href} variant="nav">
                {item.label}
              </AppLink>
            </li>
          ))}
          <li>
            <AppLink href={ROUTES.designSystem} variant="nav">
              Page active
            </AppLink>
          </li>
        </ul>
        <Button asChild className="justify-self-end">
          <AppLink href={CTA_NAV.href} arrow>
            {CTA_NAV.label}
          </AppLink>
        </Button>
      </div>
    </div>
  )
}

function NavigationShowcase() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <p className="micro text-muted-foreground">Header dark — desktop</p>
        <HeaderPreview theme="dark" />
        <p className="micro text-muted-foreground">Header light — desktop</p>
        <HeaderPreview theme="cream" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <p className="micro text-muted-foreground">Header dark — mobile</p>
          <HeaderPreview theme="dark" mobile />
        </div>
        <div className="flex flex-col gap-4">
          <p className="micro text-muted-foreground">Header light — mobile</p>
          <HeaderPreview theme="cream" mobile />
        </div>
      </div>
      <ul className="flex max-w-prose list-disc flex-col gap-2 pl-5 text-small text-muted-foreground">
        <li>
          Survol : le trait rouge se déploie de gauche à droite. Page active : trait rouge fixe
          (ici « Page active »).
        </li>
        <li>
          Thème : le vrai header, en haut de l’écran, passe en light quand une section crème
          arrive sous lui. Faire défiler jusqu’au bloc « Thème cream » pour le voir.
        </li>
        <li>
          Menu mobile : sous 1024 px de large, le bouton MENU ouvre le menu plein écran.
        </li>
        <li>
          Transition de page : cliquer sur un lien ci-dessus joue le rideau, puis utiliser le
          bouton précédent du navigateur pour revenir ici.
        </li>
      </ul>
    </div>
  )
}

/**
 * Aperçu du vrai hero dans un cadre aux dimensions d'un écran donné (iframe sur `/`),
 * réduit pour tenir dans la page. Le hero dépend de la taille de l'écran : c'est la seule
 * façon de le montrer fidèlement en desktop et en mobile côte à côte.
 */
function HeroPreview({ label, width, height }: { label: string; width: number; height: number }) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [replay, setReplay] = useState(0)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setScale(entry.contentRect.width / width)
    })
    observer.observe(frame)
    return () => observer.disconnect()
  }, [width])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="micro text-muted-foreground">
          {label} — {width} × {height}
        </p>
        <Button variant="text" onClick={() => setReplay((count) => count + 1)}>
          Rejouer l’entrée
        </Button>
      </div>
      <div
        ref={frameRef}
        className="w-full overflow-hidden border border-border"
        style={{ maxWidth: width, aspectRatio: `${width} / ${height}` }}
      >
        <iframe
          key={replay}
          src={ROUTES.home}
          title={`Aperçu du hero — ${label}`}
          width={width}
          height={height}
          loading="lazy"
          className="origin-top-left"
          style={{ scale }}
        />
      </div>
    </div>
  )
}

function HeroShowcase() {
  return (
    <div className="flex flex-col gap-10">
      <HeroPreview label="Desktop" width={1440} height={900} />
      <div className="grid items-start gap-10 lg:grid-cols-[390px_1fr]">
        <HeroPreview label="Mobile" width={390} height={844} />
        <ul className="flex max-w-prose list-disc flex-col gap-2 pl-5 text-small text-muted-foreground">
          <li>
            Structure : <code>Hero</code> = <code>HeroMedia</code> + <code>HeroMeta</code> +{' '}
            <code>HeroTitle</code> + <code>HeroActions</code> + <code>HeroScrollIndicator</code>. Le
            contenu vient de <code>src/data/home.ts</code>.
          </li>
          <li>
            Titre : 2 lignes en desktop (« Boxing Club » / « de la Plaine »), 3 lignes en mobile.
            Seul le dernier mot est rouge.
          </li>
          <li>
            Image : photographie fournie par le club, servie en AVIF et JPEG sur 3 largeurs.
            Elle se règle par les props de <code>HeroMedia</code> : sources, alt, point focal
            (desktop et mobile), traitement, voile, grain, vignette. En mobile, elle occupe le
            haut du hero pour ne pas être recadrée à l’excès.
          </li>
          <li>
            Header transparent : en haut du hero, le header n’a plus de fond et son CTA passe en
            contour. Dès que la page défile, il reprend son fond plein et son CTA rouge. Faire
            défiler dans l’aperçu pour le voir.
          </li>
          <li>
            Entrée (≈ 1,3 s) : image, lignes du titre, mentions, CTA, détails. « Rejouer l’entrée »
            recharge l’aperçu.
          </li>
          <li>
            Reduced motion : un seul fondu de 0,3 s, aucun mouvement, indicateur de scroll
            statique. Pour le voir, activer « Réduire les animations » dans les réglages du
            système puis recharger.
          </li>
          <li>Le hero n’existe qu’en thème sombre : pas de variante crème à ce stade.</li>
        </ul>
      </div>
    </div>
  )
}

function ThemeShowcase() {
  return (
    <div className="flex flex-col gap-10">
      <SectionHeader
        eyebrow="Nos pratiques"
        title={
          <>
            Choisis
            <br />
            <Accent>ton terrain.</Accent>
          </>
        }
        description="Texte d’introduction de démonstration, dans la couleur atténuée du thème."
      />
      <ButtonShowcase />
      <LinkShowcase />
    </div>
  )
}

export function DesignSystemPage() {
  usePageMeta({ title: 'Design system', path: ROUTES.designSystem, noindex: true })
  const revealRef = useScrollReveal<HTMLDivElement>({ selector: '[data-reveal]' })
  const [revealKey, setRevealKey] = useState(0)

  return (
    <>
      <Section spacing="large">
        <SectionHeader
          as="h1"
          size="xl"
          eyebrow="Référence interne"
          title={
            <>
              Design
              <br />
              <Accent>System</Accent>
            </>
          }
          description="Page de développement, non indexée. Elle présente les primitives avec lesquelles le hero et les sections seront construits."
        />
      </Section>

      <Section spacing="medium" className="border-t border-border">
        <div className="flex flex-col gap-20">
          <Block title="Couleurs">
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {COLORS.map((color) => (
                <li key={color.token} className="flex flex-col gap-3">
                  <div className={cn('aspect-square border border-border', color.swatch)} />
                  <div>
                    <p className="label">{color.name}</p>
                    <p className="micro text-muted-foreground">
                      <TokenValue token={color.token} />
                    </p>
                    <p className="mt-1 text-small text-muted-foreground">{color.usage}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-border p-5">
                <p className="display text-display-m text-primary">Rouge en grand</p>
                <p className="mt-2 text-small text-muted-foreground">
                  Autorisé : titres display, grands chiffres, traits, bordures, CTA.
                </p>
              </div>
              <div className="border border-border p-5">
                <p className="label flex items-center gap-3">
                  <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
                  Petit texte : crème
                </p>
                <p className="mt-2 text-small text-muted-foreground">
                  Sur fond noir, jamais de petit texte rouge (contraste 3,4:1). Le rouge passe
                  dans le trait.
                </p>
              </div>
            </div>
          </Block>

          <Block title="Typographie">
            <ul className="flex flex-col">
              {TYPE_SCALE.map((level) => (
                <li
                  key={level.name}
                  className="grid-site items-baseline gap-y-2 border-b border-border py-6"
                >
                  <p className="micro col-span-4 text-muted-foreground md:col-span-2">
                    {level.name}
                  </p>
                  <p className={cn('col-span-4 md:col-span-6 lg:col-span-10', level.classes)}>
                    {level.sample}
                  </p>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Titres">
            <div className="grid-site gap-y-12">
              <SectionTitle size="xl" className="col-span-4 md:col-span-8 lg:col-span-12">
                Boxing Club
                <br />
                <Accent>de la Plaine</Accent>
              </SectionTitle>
              <SectionHeader
                className="col-span-4 lg:col-span-6"
                eyebrow="Notre histoire"
                title={
                  <>
                    Plus qu’une salle.
                    <br />
                    <Accent>Une histoire.</Accent>
                  </>
                }
              />
              <SectionHeader
                className="col-span-4 lg:col-span-6"
                eyebrow="Cours d’essai"
                title={
                  <>
                    Ton premier round
                    <br />
                    <Accent>commence ici.</Accent>
                  </>
                }
              />
            </div>
          </Block>

          <Block title="Boutons">
            <ButtonShowcase />
          </Block>

          <Block title="Liens">
            <LinkShowcase />
          </Block>

          <Block title="Navigation — header, lien actif, CTA, transition de page">
            <NavigationShowcase />
          </Block>
        </div>
      </Section>

      <Section spacing="medium" contained={false} className="border-t border-border">
        <div className="flex flex-col gap-20">
          <div className="container-site">
            <Block title="Container — max 1600 px, marge fluide 20 → 64 px">
              <div className="micro border border-dashed border-border py-6 text-center text-muted-foreground">
                container-site
              </div>
            </Block>
          </div>
          <div className="container-site">
            <Block title="Grid — 4 colonnes (mobile) / 8 (tablet) / 12 (desktop)">
              <div className="grid-site" aria-hidden="true">
                {Array.from({ length: 12 }, (_, index) => (
                  <div
                    key={index}
                    className={cn(
                      'micro border border-border py-4 text-center text-muted-foreground',
                      index >= 4 && 'hidden md:block',
                      index >= 8 && 'md:hidden lg:block',
                    )}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {GRID_LAYOUTS.map((layout) => (
                  <div key={layout.label} className="grid-site gap-y-2">
                    {layout.spans.map((span, index) => (
                      <div
                        key={index}
                        className={cn(
                          'micro col-span-2 border border-border px-3 py-4 text-muted-foreground md:col-span-4',
                          span,
                        )}
                      >
                        {index === 0 ? layout.label : ' '}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Block>
          </div>
        </div>
      </Section>

      <Section spacing="medium" className="border-t border-border">
        <div className="flex flex-col gap-20">
          <Block title="Cards — variante overlay (pratiques)">
            <ul className="grid-site gap-y-6">
              {practices.map((practice, index) => (
                <li key={practice.id} className="col-span-4 lg:col-span-3">
                  <EditorialCard
                    variant="overlay"
                    image={practice.image}
                    imageAlt=""
                    treatment="contrast"
                    number={String(index + 1).padStart(2, '0')}
                    title={practice.title}
                    description="Description de démonstration."
                    href={practice.href}
                  />
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Cards — variante stacked (coachs, actualités)">
            <ul className="grid-site gap-y-6">
              {['Titre de carte', 'Titre de carte sur deux lignes', 'Carte sans lien'].map(
                (title, index) => (
                  <li key={title} className="col-span-4 lg:col-span-4">
                    <EditorialCard
                      image={PLACEHOLDER_IMAGE}
                      imageAlt=""
                      ratio="3/2"
                      treatment="monochrome"
                      number={String(index + 1).padStart(2, '0')}
                      meta="Catégorie — Date"
                      title={title}
                      description="Description de démonstration, courte, sur une ou deux lignes."
                      href={index < 2 ? ROUTES.actualites : undefined}
                      cta="Lire"
                    />
                  </li>
                ),
              )}
            </ul>
          </Block>

          <Block title="Images — traitements (MediaFrame)">
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {TREATMENTS.map((item) => (
                <li key={item.label} className="flex flex-col gap-3">
                  <MediaFrame
                    src={PLACEHOLDER_IMAGE}
                    alt=""
                    ratio="4/5"
                    treatment={item.treatment}
                    grain={item.grain}
                    vignette={item.vignette}
                  />
                  <p className="micro text-muted-foreground">{item.label}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Images — animations (ImageReveal, ParallaxImage)">
            <div className="flex flex-col items-start gap-6">
              <Button variant="secondary" size="sm" onClick={() => setRevealKey((key) => key + 1)}>
                Rejouer les reveals
              </Button>
              <ul className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
                <li className="flex flex-col gap-3">
                  <ImageReveal key={revealKey} src={PLACEHOLDER_IMAGE} alt="" ratio="4/5" />
                  <p className="micro text-muted-foreground">reveal="clip"</p>
                </li>
                <li className="flex flex-col gap-3">
                  <ImageReveal
                    key={revealKey}
                    src={PLACEHOLDER_IMAGE}
                    alt=""
                    ratio="4/5"
                    reveal="fade"
                  />
                  <p className="micro text-muted-foreground">reveal="fade"</p>
                </li>
                <li className="flex flex-col gap-3">
                  <ImageReveal src={PLACEHOLDER_IMAGE} alt="" ratio="4/5" reveal="none" />
                  <p className="micro text-muted-foreground">reveal="none"</p>
                </li>
                <li className="flex flex-col gap-3">
                  <ParallaxImage src={PLACEHOLDER_IMAGE} alt="" ratio="4/5" />
                  <p className="micro text-muted-foreground">ParallaxImage</p>
                </li>
              </ul>
            </div>
          </Block>

          <Block title="Animation — useScrollReveal (cascade)">
            <div ref={revealRef} className="grid-site gap-y-4">
              {['01', '02', '03', '04'].map((number) => (
                <div
                  key={number}
                  data-reveal
                  className="col-span-2 border border-border p-5 lg:col-span-3"
                >
                  <p className="display text-display-m text-primary">{number}</p>
                  <p className="micro mt-2 text-muted-foreground">data-reveal</p>
                </div>
              ))}
            </div>
          </Block>
        </div>
      </Section>

      <Section spacing="medium" className="border-t border-border">
        <Block title="Hero — desktop, mobile, header transparent, animation">
          <HeroShowcase />
        </Block>
      </Section>

      <Section theme="dark" spacing="large" className="border-t border-border">
        <Block title='Thème — <Section theme="dark">'>
          <ThemeShowcase />
        </Block>
      </Section>

      <Section theme="cream" spacing="large">
        <Block title='Thème — <Section theme="cream">'>
          <ThemeShowcase />
        </Block>
      </Section>

      <Section theme="dark" spacing="small">
        <p className="micro text-muted-foreground">spacing="small"</p>
      </Section>
      <Section theme="cream" spacing="medium">
        <p className="micro text-muted-foreground">spacing="medium"</p>
      </Section>
      <Section theme="dark" spacing="large">
        <p className="micro text-muted-foreground">spacing="large"</p>
      </Section>
    </>
  )
}
