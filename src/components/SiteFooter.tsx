import { Link } from 'react-router-dom'
import { PixelBackdrop } from '@/components/HeroShader'
import { GithubIcon } from '@/components/icons'
import { useTopLink } from '@/lib/hash-scroll'

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

const footerLink = `text-text-secondary transition-colors duration-150 ease-out hover:text-text ${focusRing}`

export function SiteFooter({ path: _path }: { path: string }) {
  const homeLink = useTopLink()
  return (
    <footer
      className="relative isolate overflow-hidden border-t border-border-subtle"
      style={{
        background: 'var(--t-field-bg)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <PixelBackdrop className="footer-rise" />

      <div className="footer-rise relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col sm:w-max">
            <Link
              to="/"
              aria-label="Home"
              onClick={homeLink}
              data-quiet
              className={`group block ${focusRing}`}
            >
              <span className="font-semibold tracking-tight text-brand transition-colors duration-150 ease-out group-hover:text-(--t-field-hover)">
                Akram Bouchama
              </span>
            </Link>
            <p
              data-quiet
              className="mt-4 max-w-sm text-sm leading-relaxed text-text-muted [text-wrap:pretty]"
            >
              Full Stack Web Developer based in Marrakech, Morocco. Building
              with React, Node.js, and modern web technologies.
            </p>
          </div>

          <nav aria-label="Contact" className="shrink-0">
            <h2 className="font-sans text-xs tracking-widest text-text-muted uppercase">
              Connect
            </h2>
            <ul className="mt-3.5 flex flex-col gap-2.5">
              <li>
                <a
                  href="mailto:contact@akrambouchama.com"
                  className={`text-sm ${footerLink}`}
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/akrambouchama"
                  className={`text-sm ${footerLink}`}
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.space.akrambouchama.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm ${footerLink}`}
                >
                  My Desktop like portfolio
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border-subtle pt-6 text-[13px] text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p data-quiet>© {new Date().getFullYear()} Akram Bouchama.</p>
          <a
            href="https://github.com/akrambouchama"
            className={`inline-flex items-center gap-1.5 ${footerLink}`}
          >
            <GithubIcon className="size-4" /> GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
