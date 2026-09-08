import { useNavigate } from 'react-router-dom'
import { claimNextHashScroll, scrollToAnchor } from './anchor-scroll'

/** Repeated same-page anchor clicks must scroll even when the URL is unchanged. */

/**
 * A click handler for a link to an anchor. On the page that holds it, it takes
 * over and scrolls; anywhere else it stands aside and lets the router
 * navigate, and the anchor is reached on arrival.
 */
export function useHashLink(hash: string) {
  const navigate = useNavigate()

  return (event: React.MouseEvent) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }
    const target = document.getElementById(hash)
    if (!target) return

    event.preventDefault()
    claimNextHashScroll()
    scrollToAnchor(target, true)
    navigate(`/?#${hash}`, { replace: true })
  }
}

/** Scroll to the homepage top even when already on that route. */
export function useTopLink() {
  const navigate = useNavigate()

  return (event: React.MouseEvent) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }
    event.preventDefault()

    if (window.location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      })
      navigate('/', { replace: true })
      return
    }
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
}
