import { t } from '@/i18n/site'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ReactElement, RefObject } from 'react'
import {
  GithubIcon,
  MENU_BARS_FOLD_MS,
  MenuBarsIcon,
  PaletteIcon,
} from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useTopLink } from '@/lib/hash-scroll'
import { OPEN_PICKER_EVENT, THEME_EVENT, groundOf } from '@/lib/theme'
import { cn } from '@/lib/utils'

function NavTooltip({
  children,
  label,
  shortcut,
}: {
  children: ReactElement
  label: string
  shortcut?: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger render={children} />
      <TooltipContent side="bottom" sideOffset={10}>
        {label}
        {shortcut && (
          <kbd className="ml-1 rounded border border-current/25 px-1 font-mono text-[11px] opacity-75">
            {shortcut}
          </kbd>
        )}
      </TooltipContent>
    </Tooltip>
  )
}

/** Observe the live hero sentinel; the header and blended labels share this state. */
/** Choose the visible label layer before paint to prevent a navigation flash. */
const useBeforePaint =
  typeof document === 'undefined' ? useEffect : useLayoutEffect

function useHeroInView(seed: boolean) {
  const [heroInView, setHeroInView] = useState(seed)

  useBeforePaint(() => {
    let observer: IntersectionObserver | null = null
    let sizeWatcher: ResizeObserver | null = null
    let settling = 0
    let watched: Element | null | undefined

    const covers = (hero: Element, bar: Element) => {
      const barBox = bar.getBoundingClientRect()
      if (barBox.height === 0) return null
      return hero.getBoundingClientRect().bottom > barBox.height
    }

    const settle = (hero: Element, bar: Element, tries = 3) => {
      const covered = covers(hero, bar)
      if (covered !== null) {
        setHeroInView(covered)
        return
      }
      if (tries > 0)
        settling = requestAnimationFrame(() => settle(hero, bar, tries - 1))
    }

    const watch = (hero: Element, bar: Element) => {
      observer?.disconnect()
      const height = bar.getBoundingClientRect().height
      observer = new IntersectionObserver(
        ([entry]) => setHeroInView(entry.isIntersecting),
        { rootMargin: `-${height}px 0px 0px 0px` },
      )
      observer.observe(hero)
    }

    const sync = () => {
      const hero = document.querySelector('[data-hero-sentinel]')
      if (hero === watched) return
      observer?.disconnect()
      sizeWatcher?.disconnect()
      cancelAnimationFrame(settling)
      watched = hero
      const bar = document.querySelector('header')
      if (!hero || !bar) {
        setHeroInView(false)
        return
      }
      settle(hero, bar)
      watch(hero, bar)
      sizeWatcher = new ResizeObserver(() => watch(hero, bar))
      sizeWatcher.observe(bar)
    }

    const arrivals = new MutationObserver(sync)
    arrivals.observe(document.documentElement, {
      childList: true,
      subtree: true,
    })
    sync()

    return () => {
      cancelAnimationFrame(settling)
      observer?.disconnect()
      sizeWatcher?.disconnect()
      arrivals.disconnect()
    }
  }, [])

  return heroInView
}

/** Write surface opacity to CSS while scrolling; measure section geometry once per layout. */
function useNavSurface(
  sheetOpen: boolean,
  blended: boolean,
  bar: RefObject<HTMLElement | null>,
  pathname: string,
) {
  const wasOpen = useRef(sheetOpen)
  useEffect(() => {
    const el = bar.current
    if (!el) return
    const justClosed = wasOpen.current && !sheetOpen
    wasOpen.current = sheetOpen
    let holding = blended && justClosed

    const solid = (on: boolean) => {
      if (!on && holding) return
      if (on) el.removeAttribute('data-nav-blend')
      else el.setAttribute('data-nav-blend', '')
      const ghost = document.querySelector<HTMLElement>('[data-nav-ghost]')
      if (ghost) ghost.style.opacity = on ? '0' : '1'
    }

    type Ground = { top: number; bottom: number; colour: string }
    let grounds: Ground[] = []
    let height = 0
    let heroBottom = 0
    let surveyed: Element | null = null
    let heroUp = false
    let hovering =
      window.matchMedia('(hover: hover)').matches && el.matches(':hover')

    const survey = () => {
      const main = document.querySelector('main')
      if (main !== surveyed) {
        surveyed = main
        sizes.disconnect()
        if (main) sizes.observe(main)
      }
      const hero = document.querySelector('[data-hero-sentinel]')
      heroUp = hero !== null
      heroBottom = hero
        ? hero.getBoundingClientRect().bottom + window.scrollY
        : 0
      height = el.getBoundingClientRect().height
      const sections = document.querySelectorAll<HTMLElement>(
        'main > section, main [data-ground]',
      )
      const nodes = sections.length
        ? [...sections]
        : [...document.querySelectorAll<HTMLElement>('main')]

      const footer = document.querySelector<HTMLElement>('footer')
      if (footer) nodes.push(footer)

      grounds = nodes
        .filter((node) => !node.hasAttribute('data-hero-sentinel'))
        .map((node) => {
          const box = node.getBoundingClientRect()
          return {
            top: box.top + window.scrollY,
            bottom: box.bottom + window.scrollY,
            colour: groundOf(node) ?? 'var(--color-bg)',
          }
        })
      return grounds.length > 0
    }

    const groundAt = (y: number) => {
      let found: Ground | null = null
      for (const g of grounds) if (y >= g.top && y < g.bottom) found = g
      return found
    }

    const phone = window.matchMedia('(max-width: 639.98px)')
    const wash = (colour: string) =>
      `color-mix(in srgb, ${colour} 90%, transparent)`

    const paint = () => {
      const y = window.scrollY
      const top = groundAt(y)
      const bottom = groundAt(y + height)
      const whole = top && top === bottom ? top : null
      const here = phone.matches ? (top ?? bottom) : whole
      let image = ''
      let fill = '1'
      if (phone.matches && !sheetOpen && top !== bottom) {
        const edge =
          top && bottom
            ? Math.min(top.bottom, bottom.top > y ? bottom.top : Infinity)
            : top
              ? top.bottom
              : bottom!.top
        const split = Math.round(edge - y)
        const above = top ? wash(top.colour) : 'transparent'
        const below = bottom ? wash(bottom.colour) : 'transparent'
        image = `linear-gradient(to bottom, ${above} ${split}px, ${below} ${split}px)`
        fill = '0'
      }
      el.style.backgroundImage = image
      el.style.setProperty('--nav-fill', fill)
      if (here) el.style.setProperty('--nav-ground', here.colour)
      else if (!heroUp) el.style.setProperty('--nav-ground', 'var(--color-bg)')
      el.style.setProperty('--nav-surface', here || !heroUp ? '1' : '0')
      el.toggleAttribute(
        'data-nav-past-hero',
        !heroUp || (phone.matches ? y + height : y) >= heroBottom,
      )
      solid(sheetOpen || !blended || hovering)
    }

    const hold = holding
      ? window.setTimeout(() => {
          holding = false
          paint()
        }, MENU_BARS_FOLD_MS)
      : 0

    const onEnter = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      hovering = true
      paint()
    }
    const onLeave = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      hovering = false
      paint()
    }

    const relayout = () => {
      survey()
      paint()
    }

    const settle = window.setTimeout(relayout, 0)

    const sizes = new ResizeObserver(relayout)

    let probe = 0
    const wait = () => {
      if (survey()) {
        paint()
        return
      }
      probe = requestAnimationFrame(wait)
    }
    wait()

    const arrivals = new MutationObserver(() => {
      if (document.querySelector('main') !== surveyed) relayout()
    })
    arrivals.observe(document.documentElement, {
      childList: true,
      subtree: true,
    })

    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)
    phone.addEventListener('change', paint)
    window.addEventListener('scroll', paint, { passive: true })
    window.addEventListener('resize', relayout)
    window.addEventListener(THEME_EVENT, relayout)
    return () => {
      cancelAnimationFrame(probe)
      window.clearTimeout(settle)
      window.clearTimeout(hold)
      arrivals.disconnect()
      sizes.disconnect()
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
      phone.removeEventListener('change', paint)
      el.style.backgroundImage = ''
      el.style.removeProperty('--nav-fill')
      window.removeEventListener('scroll', paint)
      window.removeEventListener('resize', relayout)
      window.removeEventListener(THEME_EVENT, relayout)
    }
  }, [sheetOpen, blended, bar, pathname])
}

export function SiteHeader({ path: _path }: { path?: string }) {
  const { pathname } = useLocation()
  const heroInView = useHeroInView(pathname === '/')
  const [menuOpen, setMenuOpen] = useState(false)
  const homeLink = useTopLink()
  const transparent = heroInView

  useEffect(() => setMenuOpen(false), [pathname])
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])
  useEffect(() => {
    const root = document.documentElement
    if (menuOpen) root.dataset.navMenu = t('open')
    else delete root.dataset.navMenu
    return () => {
      delete root.dataset.navMenu
    }
  }, [menuOpen])
  const bar = useRef<HTMLDivElement>(null)
  useNavSurface(menuOpen, transparent, bar, pathname)

  const glyph = (
    <Link
      to="/"
      aria-label={t('Home')}
      onClick={homeLink}
      className="relative flex items-center"
    >
      <pre
        aria-hidden="true"
        className="select-none font-mono text-[4px] leading-[1.15] text-brand"
      >
        {`▄████████ 
  ███    ███ 
  ███    ███ 
  ███    ███ 
▀███████████ 
  ███    ███ 
  ███    ███ 
  ███    █▀ `}
      </pre>
    </Link>
  )

  const theme = (
    <Button
      variant="ghost"
      size="icon"
      aria-label={t('Change website theme')}
      data-nav-glyph
      className="relative h-8 w-8 text-text-secondary transition-[background-color,transform] hover:text-text before:absolute before:-inset-1 lg:h-[calc(var(--pxr)*3)] lg:w-[calc(var(--pxr)*3)]"
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_PICKER_EVENT))}
    >
      <PaletteIcon className="size-5" />
    </Button>
  )

  const github = (
    <Button
      variant="ghost"
      size="icon"
      aria-label={t('View on GitHub')}
      data-nav-glyph
      className="relative h-8 w-8 text-text-secondary transition-[background-color,transform] hover:text-text before:absolute before:-inset-1 lg:h-[calc(var(--pxr)*3)] lg:w-[calc(var(--pxr)*3)]"
      nativeButton={false}
      render={<a href="https://github.com/akrambouchama" />}
    >
      <GithubIcon className="size-5" />
    </Button>
  )

  return (
    <header dir="ltr" className="pixel-container sticky top-0 z-(--z-nav)">
      <div
        ref={bar}
        data-nav-blend={transparent ? '' : undefined}
        className={cn('group/bar', menuOpen && 'bg-bg/95 backdrop-blur-lg')}
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          backgroundColor: menuOpen
            ? undefined
            : 'color-mix(in srgb, var(--nav-ground, var(--color-bg)) calc(var(--nav-surface, 0) * var(--nav-fill, 1) * 90%), transparent)',
          backdropFilter: menuOpen
            ? undefined
            : 'blur(calc(var(--nav-surface, 0) * 12px))',
        }}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
          {glyph}

          <div className="ml-auto flex items-center gap-2.5">
            <div className="hidden items-center gap-1 sm:flex">
              <TooltipProvider delay={300}>
                <NavTooltip label={t('Change website theme')} shortcut="T">
                  {theme}
                </NavTooltip>
                <NavTooltip label={t('View on GitHub')}>{github}</NavTooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-1 sm:hidden">{theme}</div>
            <Button
              variant="ghost"
              size="icon"
              data-nav-toggle
              className="relative size-8 text-text-secondary transition-[background-color,transform] hover:text-text before:absolute before:-inset-1 sm:hidden"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? 'Close menu' : 'Menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <MenuBarsIcon open={menuOpen} className="size-[22px]" />
            </Button>
          </div>
        </div>
      </div>
      {menuOpen ? (
        <div
          data-menu-scrim
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
          className="absolute inset-x-0 top-(--nav-h) h-svh bg-black/55 supports-backdrop-filter:backdrop-blur-xs sm:hidden"
        />
      ) : null}

      <div
        id="site-menu"
        hidden={!menuOpen}
        className="absolute inset-x-0 top-(--nav-h) border-b border-border-subtle bg-bg/95 backdrop-blur-lg sm:hidden"
      >
        <nav
          aria-label={t('Main')}
          className="mx-auto flex max-w-6xl flex-col px-4 py-2"
        >
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false)
              window.dispatchEvent(new CustomEvent(OPEN_PICKER_EVENT))
            }}
            className="flex items-center gap-2.5 py-3 text-left text-[15px] text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <PaletteIcon className="size-5" />
            {t('Change the theme')}
          </button>
          <a
            href="https://github.com/akrambouchama"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2.5 py-3 text-left text-[15px] text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <GithubIcon className="size-5" />
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}

/** Render inside the hero stacking context so labels can blend with its canvas. */
export function HeroNavGhost() {
  return (
    <div
      aria-hidden="true"
      dir="ltr"
      data-nav-ghost
      className="pointer-events-none fixed inset-x-0 top-0 z-(--z-nav) mix-blend-difference"
      style={{ paddingTop: 'env(safe-area-inset-top)', opacity: 1 }}
      suppressHydrationWarning
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <span className="flex items-center">
          <span className="block h-[37px] w-[29px] shrink-0" />
        </span>

        <span className="ml-auto flex items-center gap-2.5">
          <span
            className="hidden items-center gap-1 sm:flex"
            style={{ color: 'var(--t-hdr-text-2)' }}
          >
            <span className="flex h-8 w-8 items-center justify-center lg:h-[calc(var(--pxr)*3)] lg:w-[calc(var(--pxr)*3)]">
              <PaletteIcon className="size-5" />
            </span>
            <span className="flex h-8 w-8 items-center justify-center lg:h-[calc(var(--pxr)*3)] lg:w-[calc(var(--pxr)*3)]">
              <GithubIcon className="size-5" />
            </span>
          </span>

          <span
            className="flex size-8 items-center justify-center sm:hidden"
            style={{ color: 'var(--t-hdr-text-2)' }}
          >
            <MenuBarsIcon className="size-[22px]" />
          </span>
        </span>
      </div>
    </div>
  )
}
