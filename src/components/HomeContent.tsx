import { useEffect, useLayoutEffect, useState } from 'react'
import { HeroNavGhost } from '@/components/SiteHeader'
import { HeroShader } from '@/components/HeroShader'
import { EtchPicker } from '@/components/EtchPicker'
import { Button } from '@/components/ui/button'

export const ASCII_ART = `   
   ▄████████    ▄█   ▄█▄    ▄████████    ▄████████   ▄▄▄▄███▄▄▄▄        ▀█████████▄   ▄██████▄  ███    █▄   ▄████████    ▄█    █▄       ▄████████   ▄▄▄▄███▄▄▄▄      ▄████████ 
  ███    ███   ███ ▄███▀   ███    ███   ███    ███ ▄██▀▀▀███▀▀▀██▄        ███    ███ ███    ███ ███    ███ ███    ███   ███    ███     ███    ███ ▄██▀▀▀███▀▀▀██▄   ███    ███ 
  ███    ███   ███▐██▀     ███    ███   ███    ███ ███   ███   ███        ███    ███ ███    ███ ███    ███ ███    █▀    ███    ███     ███    ███ ███   ███   ███   ███    ███ 
  ███    ███  ▄█████▀     ▄███▄▄▄▄██▀   ███    ███ ███   ███   ███       ▄███▄▄▄██▀  ███    ███ ███    ███ ███         ▄███▄▄▄▄███▄▄   ███    ███ ███   ███   ███   ███    ███ 
▀███████████ ▀▀█████▄    ▀▀███▀▀▀▀▀   ▀███████████ ███   ███   ███      ▀▀███▀▀▀██▄  ███    ███ ███    ███ ███        ▀▀███▀▀▀▀███▀  ▀███████████ ███   ███   ███ ▀███████████ 
  ███    ███   ███▐██▄   ▀███████████   ███    ███ ███   ███   ███        ███    ██▄ ███    ███ ███    ███ ███    █▄    ███    ███     ███    ███ ███   ███   ███   ███    ███ 
  ███    ███   ███ ▀███▄   ███    ███   ███    ███ ███   ███   ███        ███    ███ ███    ███ ███    ███ ███    ███   ███    ███     ███    ███ ███   ███   ███   ███    ███ 
  ███    █▀    ███   ▀█▀   ███    █▀    ███    █▀   ▀█   ███   █▀       ▄█████████▀   ▀██████▀  ████████▀  ████████▀    ███    █▀      ███    █▀   ▀█   ███   █▀    ███    █▀  
`
export function HomePage() {
  const [intro, setIntro] = useState(false)
  const [painted, setPainted] = useState(false)
  const [etchAsked, setEtchAsked] = useState(false)

  useEffect(() => {
    setEtchAsked(new URLSearchParams(window.location.search).has('etch'))
  }, [])

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      setPainted(true)
  }, [])

  useLayoutEffect(() => {
    if (painted) document.documentElement.classList.remove('etch-pending')
  }, [painted])

  useEffect(() => {
    if (!sessionStorage.getItem('akram-intro-seen')) {
      sessionStorage.setItem('akram-intro-seen', 'true')
      setIntro(true)
    }
  }, [])

  return (
    <main>
      <section
        id="home"
        data-hero-sentinel
        className={
          'pixel-container relative -mt-(--nav-h) flex min-h-svh flex-col overflow-hidden border-b border-border-subtle pt-(--nav-h) select-none [-webkit-touch-callout:none]' +
          (intro ? ' hero-intro' : '')
        }
        style={{ background: 'var(--t-field-bg)' }}
      >
        <HeroShader variant="field" onPainted={() => setPainted(true)} />
        {etchAsked ? <EtchPicker /> : null}

        <HeroNavGhost />

        <div className="pointer-events-none relative flex flex-1 flex-col items-center px-6">
          <div className="flex-1" />

          <div
            data-hero-quiet
            className="pointer-events-auto mt-12 flex w-full flex-col items-center text-center lg:mt-[calc(var(--pxr)*5)]"
          >
            <pre
              data-hero-stagger
              style={{ '--stagger': 0 } as React.CSSProperties}
              className="mx-auto w-fit max-w-full overflow-x-auto overflow-y-hidden text-center font-mono text-[3.5px] leading-[1.15] text-brand xs:text-[4.5px] sm:text-[8px] md:text-[10px] lg:text-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {ASCII_ART}
            </pre>
            <p
              data-hero-stagger
              style={{ '--stagger': 1 } as React.CSSProperties}
              className="mt-6 text-lg leading-relaxed text-text-secondary"
            >
              <span className="block [text-wrap:balance]">
                Full Stack Web Developer
              </span>
              <span className="block [text-wrap:balance] text-sm mt-2 text-text-muted">
                Specializing in React, Node.js, and modern web technologies.
                Based in Marrakech, Morocco.
              </span>
            </p>

            <div
              data-hero-stagger
              data-hero-cta
              style={{ '--stagger': 2 } as React.CSSProperties}
              className="mt-9 flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row lg:gap-[calc(var(--pxc)*2)]"
            >
              <Button
                size="lg"
                className="h-10 px-8"
                nativeButton={true}
                onClick={() =>
                  window.dispatchEvent(new CustomEvent('OPEN_PROJECT_PICKER'))
                }
              >
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-10 px-8"
                nativeButton={true}
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Contact Me
              </Button>
            </div>
          </div>
          <div className="flex-1" />
        </div>
      </section>

      <section
        id="about"
        data-ground
        className="border-b border-border-subtle"
        style={{ background: 'var(--t-field-bg)' }}
      >
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-20 sm:px-6 md:flex md:justify-between md:gap-12">
          <div className="md:w-1/3">
            <h2 className="font-sans text-xs tracking-widest text-text-muted uppercase">
              About Me
            </h2>
          </div>
          <div className="md:w-2/3 mt-4 md:mt-0">
            <p className="max-w-2xl text-lg leading-relaxed text-text-secondary [text-wrap:pretty]">
              I'm Akram Bouchama, a Full Stack Web Developer based in Marrakech,
              Morocco. I build fast, focused web experiences end to end — from the
              first idea and the database schema to the last pixel of the
              interface and the deployment that ships it.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted [text-wrap:pretty]">
              I work across React on the front end and Node.js on the back end,
              and I care about the details most people never see: speed, clarity,
              and code that the next developer will thank you for.
            </p>
          </div>
        </div>
      </section>

      <section
        id="skills"
        data-ground
        className="border-b border-border-subtle"
        style={{ background: 'var(--t-field-bg)' }}
      >
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-20 sm:px-6 md:flex md:flex-row-reverse md:justify-between md:gap-12">
          <div className="md:w-1/3 md:text-right">
            <h2 className="font-sans text-xs tracking-widest text-text-muted uppercase">
              Technical Skills
            </h2>
          </div>
          <div className="md:w-2/3 mt-4 md:mt-0">
            <p className="max-w-2xl text-lg leading-relaxed text-text-secondary [text-wrap:pretty]">
              My day-to-day stack is the modern JavaScript ecosystem: React and
              TypeScript on the front end, Node.js on the back end, with Tailwind
              CSS, Git, and SQL in the mix. Wherever the work needs it, I reach
              for the right tool instead of the familiar one.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted [text-wrap:pretty]">
              Away from web development I stay on the systems side of things: I
              daily-drive Linux, write scripts and wrangle configuration, and
              design printed circuit boards (PCBs) — taking small hardware
              projects from schematic to a board that actually works.
            </p>
          </div>
        </div>
      </section>

      <section
        id="contact"
        data-ground
        className="border-b border-border-subtle"
        style={{ background: 'var(--t-field-bg)' }}
      >
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-20 sm:px-6 md:flex md:justify-between md:gap-12">
          <div className="md:w-1/3">
            <h2 className="font-sans text-xs tracking-widest text-text-muted uppercase">
              Contact
            </h2>
          </div>
          <div className="md:w-2/3 mt-4 md:mt-0">
            <form action="https://api.web3forms.com/submit" method="POST" className="flex flex-col gap-4 max-w-xl">
              <input type="hidden" name="access_key" value="fff8147f-22c9-46cc-9251-4af470db95f5" />

              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm text-text-muted">Name</label>
                <input type="text" id="name" name="name" required className="bg-transparent border border-border-subtle rounded-md px-4 py-2.5 text-text-secondary focus:outline-none focus:border-text-muted transition-colors" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm text-text-muted">Email</label>
                <input type="email" id="email" name="email" required className="bg-transparent border border-border-subtle rounded-md px-4 py-2.5 text-text-secondary focus:outline-none focus:border-text-muted transition-colors" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm text-text-muted">Message</label>
                <textarea id="message" name="message" required rows={5} className="bg-transparent border border-border-subtle rounded-md px-4 py-2.5 text-text-secondary focus:outline-none focus:border-text-muted transition-colors resize-y"></textarea>
              </div>

              <Button type="submit" variant="outline" className="w-full sm:w-fit mt-4">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
