import { t } from '@/i18n/site'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'
import { useIsNarrow } from '@/lib/use-media-query'
import { cn } from '@/lib/utils'

import imgEldenSetup from '@/assets/eleden-setup.png'
import imgVoiceNotesApp from '@/assets/voice-notes-app.png'
import imgKnowway from '@/assets/Knowway.png'
import imgCatsGallery from '@/assets/Cats-Gallery.png'
import imgSalatReminder from '@/assets/Salat-Reminder.png'
import imgTerminalSoliter from '@/assets/terminal-soliter.png'
import imgIrshade from '@/assets/irshade.png'
import imgMp3Downloader from '@/assets/mp3-downloader.png'
import imgStorageHub from '@/assets/StorageHub.jpg'

export const SITE_PROJECTS = [
  { id: 'EldenSetup', name: 'Elden Setup', url: '#', img: imgEldenSetup },
  { id: 'voice-notes-app', name: 'Voice Notes App', url: '#', img: imgVoiceNotesApp },
  { id: 'Knowway', name: 'Knowway', url: '#', img: imgKnowway },
  { id: 'Cats-Gallery', name: 'Cats Gallery', url: '#', img: imgCatsGallery },
  { id: 'Salat-Reminder', name: 'Salat Reminder', url: '#', img: imgSalatReminder },
  { id: 'terminal-soliter', name: 'Terminal Solitaire', url: '#', img: imgTerminalSoliter },
  { id: 'irshade', name: 'Irshade', url: '#', img: imgIrshade },
  { id: 'mp3-downloader', name: 'MP3 Downloader', url: '#', img: imgMp3Downloader },
  { id: 'StorageHub', name: 'Storage Hub', url: '#', img: imgStorageHub },
]

/** The card slant: a 2.5% lean, top edge shifted right of the bottom. */
const PARALLELOGRAM = 'polygon(2.5% 0%, 100% 0%, 97.5% 100%, 0% 100%)'

/** Inset in the same coordinate box to keep the slanted border edges parallel. */
const parallelogramInset = (b: string) =>
  `polygon(calc(2.5% + ${b}) ${b}, calc(100% - ${b}) ${b}, calc(97.5% - ${b}) calc(100% - ${b}), ${b} calc(100% - ${b}))`

export function ProjectPicker() {
  const portrait = useIsNarrow()
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const restoreFocus = useRef<HTMLElement | null>(null)
  const indexRef = useRef(0)

  const openPicker = useCallback(() => {
    const trigger = document.activeElement as HTMLElement | null
    restoreFocus.current = trigger
    setOpen(true)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    restoreFocus.current?.focus({
      preventScroll: true,
    })
  }, [])

  const swipe = useRef({ id: -1, from: 0, moved: 0 })

  const step = useCallback((delta: number) => {
    setIndex((at) => {
      const next = (at + delta + SITE_PROJECTS.length) % SITE_PROJECTS.length
      indexRef.current = next
      return next
    })
  }, [])

  const choose = useCallback(() => {
    const next = SITE_PROJECTS[indexRef.current]
    if (next.url && next.url !== '#') {
      window.open(next.url, '_blank')
    }
    close()
  }, [close])

  useEffect(() => {
    const onOpenRequest = () => openPicker()
    window.addEventListener('OPEN_PROJECT_PICKER', onOpenRequest)
    return () => {
      window.removeEventListener('OPEN_PROJECT_PICKER', onOpenRequest)
    }
  }, [openPicker])

  const warmed = useRef(new Set<string>())
  const warmAround = useCallback((at: number) => {
    for (let d = -2; d <= 2; d++) {
      const project =
        SITE_PROJECTS[(at + d + SITE_PROJECTS.length) % SITE_PROJECTS.length]
      if (warmed.current.has(project.id)) continue
      warmed.current.add(project.id)
      const img = new Image()
      img.fetchPriority = 'low'
      img.decoding = 'async'
      img.src = project.img
      img.decode?.().catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (open) warmAround(index)
  }, [open, index, warmAround])

  useEffect(() => {
    if (!open) return
    dialogRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'Left') {
        event.preventDefault()
        step(-1)
      } else if (event.key === 'ArrowRight' || event.key === 'Right') {
        event.preventDefault()
        step(1)
      } else if (event.key === 'Enter') {
        event.preventDefault()
        choose()
      } else if (event.key === 'Escape') {
        event.preventDefault()
        close()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, step, close, choose])

  if (!open) return null

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-(--z-modal) isolate bg-black/55 supports-backdrop-filter:backdrop-blur-xs"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('Project picker')}
        tabIndex={-1}
        onPointerDown={(event) => {
          if (event.pointerType !== 'touch') return
          swipe.current = { id: event.pointerId, from: event.clientX, moved: 0 }
        }}
        onPointerMove={(event) => {
          const drag = swipe.current
          if (event.pointerId !== drag.id) return
          drag.moved = event.clientX - drag.from
        }}
        onPointerUp={(event) => {
          const drag = swipe.current
          if (event.pointerId !== drag.id) return
          swipe.current = { ...drag, id: -1 }
          if (Math.abs(drag.moved) > 44) step(drag.moved < 0 ? 1 : -1)
        }}
        onClickCapture={(event) => {
          if (Math.abs(swipe.current.moved) <= 44) return
          swipe.current.moved = 0
          event.preventDefault()
          event.stopPropagation()
        }}
        className="fixed inset-0 z-(--z-modal) flex touch-none flex-col items-center justify-center outline-none"
        style={{ viewTransitionName: 'project-picker' }}
      >
        <div aria-hidden="true" onClick={close} className="absolute inset-0" />

        <div className="pointer-events-none relative flex w-full items-center justify-center">
          {SITE_PROJECTS.map((project, i) => {
            const raw = i - index
            const half = SITE_PROJECTS.length / 2
            const offset =
              raw > half
                ? raw - SITE_PROJECTS.length
                : raw < -half
                  ? raw + SITE_PROJECTS.length
                  : raw
            const depth = Math.abs(offset)
            if (depth > 2) return null
            const shift =
              offset === 0 ? 0 : Math.sign(offset) * (6 + depth * 12)
            return (
              <div
                key={project.id}
                aria-hidden={offset !== 0}
                className="absolute w-[min(68vw,46rem)] sm:w-[min(72vw,46rem)]"
                style={{
                  transform: `translateX(${shift}%) scale(${depth === 0 ? 1 : 0.88})`,
                  zIndex: 10 - depth,
                }}
              >
                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden={offset !== 0}
                  aria-label={
                    offset === 0
                      ? `View ${project.name}`
                      : `Show ${project.name}`
                  }
                  onClick={() => (offset === 0 ? choose() : step(offset))}
                  className="pointer-events-auto block w-full cursor-pointer [--card-dim:0.55] hover:[--card-dim:0.78]"
                >
                  <div
                    className={
                      'shadow-2xl ' + (depth === 0 ? 'bg-brand' : 'bg-zinc-500')
                    }
                    style={{ clipPath: PARALLELOGRAM }}
                  >
                    <div
                      className="bg-black"
                      style={{
                        clipPath: parallelogramInset(
                          depth === 0 ? '3px' : '1px',
                        ),
                      }}
                    >
                      <img
                        src={project.img}
                        alt={`${project.name} project preview`}
                        width={1800}
                        height={1012}
                        draggable={false}
                        onError={(event) => {
                          const img = event.currentTarget
                          if (img.dataset.retried) return
                          img.dataset.retried = ''
                          window.setTimeout(() => {
                            img.src = `${project.img}?retry`
                          }, 1000)
                        }}
                        className="w-full select-none object-cover"
                        style={{
                          aspectRatio: portrait ? '4 / 5' : '1800 / 1012',
                          filter:
                            depth === 0
                              ? undefined
                              : 'brightness(var(--card-dim))',
                        }}
                      />
                    </div>
                  </div>
                </button>
              </div>
            )
          })}
          <div
            className="invisible w-[min(68vw,46rem)] sm:w-[min(72vw,46rem)]"
            style={{ aspectRatio: portrait ? '4 / 5' : '1800 / 1012' }}
          />
        </div>

        <button
          type="button"
          tabIndex={-1}
          aria-label={`View ${SITE_PROJECTS[index].name}`}
          onClick={choose}
          className={cn(
            'relative mt-1.5 cursor-pointer px-4 py-3.5 text-center transition-[filter] duration-150 ease-out hover:brightness-125',
          )}
        >
          <span
            className="block font-sans text-2xl font-semibold tracking-tight"
            style={{
              color: 'var(--t-text)',
              WebkitTextStroke: '2px var(--t-bg)',
              paintOrder: 'stroke fill',
            }}
          >
            {SITE_PROJECTS[index].name}
          </span>
        </button>

        <button
          type="button"
          aria-label={t('Previous project')}
          onClick={(e) => {
            e.stopPropagation()
            step(-1)
          }}
          className={cn(
            'absolute left-3 top-1/2 flex size-11 cursor-pointer -translate-y-1/2 items-center justify-center border border-border-subtle bg-bg text-text transition-colors duration-150 ease-out hover:bg-surface-2 sm:left-6',
          )}
        >
          <ChevronLeftIcon className="size-5" />
        </button>
        <button
          type="button"
          aria-label={t('Next project')}
          onClick={(e) => {
            e.stopPropagation()
            step(1)
          }}
          className={cn(
            'absolute right-3 top-1/2 flex size-11 cursor-pointer -translate-y-1/2 items-center justify-center border border-border-subtle bg-bg text-text transition-colors duration-150 ease-out hover:bg-surface-2 sm:right-6',
          )}
        >
          <ChevronRightIcon className="size-5" />
        </button>
      </div>
    </>
  )
}
