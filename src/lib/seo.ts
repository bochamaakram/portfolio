import { siteUrl } from '../i18n/site.ts'
import { SITE_THEMES } from './site-themes.ts'

/** Every absolute URL in the head is built from this. Open Graph forbids
 *  relative image URLs, and a canonical is only meaningful as an absolute. */
export const SITE_URL = siteUrl

/** Select by canonical path so navigation between routes shares a card. */
export function socialImage(path: string) {
  const pathname = canonicalPath(path.split(/[?#]/, 1)[0])
  let hash = 2166136261
  for (const char of pathname) {
    hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0
  }
  const theme = SITE_THEMES[hash % SITE_THEMES.length]
  return {
    url: `${SITE_URL}/brand/social/${theme.id}.webp`,
    width: '1200',
    height: '630',
    alt: 'Akram Bouchama - Full Stack Web Developer',
  }
}

/** akrambouchama.com serves every page with a trailing slash; a canonical that
 *  drops it is a different URL to every crawler. */
function canonicalPath(path: string) {
  if (path === '/') return '/'
  return path.endsWith('/') ? path : `${path}/`
}