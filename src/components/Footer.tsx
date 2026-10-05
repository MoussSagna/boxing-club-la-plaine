import { Link } from 'react-router'
import { Logo } from '@/components/Logo'
import { CONTACT, CONTACT_CITY_LINE, EMAIL_HREF, PHONE_HREF } from '@/data/contact'
import { CTA_NAV, MAIN_NAV, ROUTES, SECONDARY_NAV } from '@/data/navigation'
import { SITE } from '@/data/site'

const FOOTER_NAV = [...MAIN_NAV, CTA_NAV, ...SECONDARY_NAV]
const CURRENT_YEAR = new Date().getFullYear()

const CONTACT_LINK =
  'inline-flex min-h-11 items-center underline-offset-4 hover:underline md:min-h-0 md:py-1'

export function Footer() {
  const [emailUser, emailDomain] = CONTACT.email.split('@')

  return (
    <footer data-theme="dark" className="border-t border-border">
      <div className="container-site grid-site gap-y-12 py-16 lg:py-24">
        <div className="col-span-4 flex flex-col gap-6 md:col-span-8 lg:col-span-5">
          <Link to={ROUTES.home} aria-label={`${SITE.name} — Accueil`} className="self-start">
            <Logo className="size-20 lg:size-24" />
          </Link>
          <p className="display text-display-m">{SITE.tagline}</p>
        </div>

        <nav aria-label="Navigation du pied de page" className="col-span-2 md:col-span-4 lg:col-span-3 lg:col-start-7">
          <h2 className="label mb-4 text-muted-foreground">Navigation</h2>
          <ul>
            {FOOTER_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="inline-block py-2 underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 md:col-span-4 lg:col-span-3">
          <h2 className="label mb-4 text-muted-foreground">Le club</h2>
          <address className="flex flex-col items-start gap-3 not-italic md:gap-2">
            <p className="font-medium">{CONTACT.clubName}</p>
            <p>
              {CONTACT.address}
              <br />
              {CONTACT_CITY_LINE}
            </p>
            <p className="flex flex-col items-start">
              <a href={PHONE_HREF} className={`${CONTACT_LINK} whitespace-nowrap`}>
                <span className="sr-only">Téléphone : </span>
                {CONTACT.phone}
              </a>
              {/* Sur une colonne étroite, l'adresse se coupe proprement avant le « @ ». */}
              <a href={EMAIL_HREF} className={CONTACT_LINK}>
                <span className="sr-only">E-mail : </span>
                <span>
                  {emailUser}
                  <wbr />@{emailDomain}
                </span>
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="container-site label py-6 text-muted-foreground">
          © {CURRENT_YEAR} {SITE.name} — {SITE.location}
        </p>
      </div>
    </footer>
  )
}
