import { useEffect } from 'react'
import { SITE_URL, socialImage } from '@/lib/seo'

export interface SeoProps {
  title: string
  description: string
  /** Absolute URL for this page, e.g. `${SITE_URL}/`. */
  path: string
  type?: 'website' | 'article'
  robots?: string
  published?: string
}

/** site_name and locale shared by every page's card. */
const SITE_NAME = 'Akram Bouchama'
const LOCALE = 'en_US'

/** Person schema describing the site's owner, reused on every page. */
const PERSON = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  jobTitle: 'Full Stack Web Developer',
  url: SITE_URL,
  email: 'mailto:contact@akrambouchama.com',
  sameAs: ['https://github.com/akrambouchama'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Marrakech',
    addressCountry: 'MA',
  },
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  )
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function removeMeta(attr: 'name' | 'property', key: string) {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove()
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Keeps the document head's structured data in sync. The static JSON-LD in
 * index.html carries an `id`; overwriting it here avoids duplicate blobs
 * for crawlers that execute scripts.
 */
function upsertJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/**
 * Manages document head tags for a single-page application. Since the app is
 * client-rendered, every tag is written on mount and whenever the props
 * change, so navigating between routes stays consistent and the static
 * fallbacks in index.html are overwritten once the app hydrates.
 */
export function Seo({
  title,
  description,
  path,
  type = 'website',
  robots,
  published,
}: SeoProps) {
  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)

    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:locale', LOCALE)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', path)

    const image = socialImage(new URL(path).pathname)
    setMeta('property', 'og:image', image.url)
    setMeta('property', 'og:image:width', image.width)
    setMeta('property', 'og:image:height', image.height)
    setMeta('property', 'og:image:alt', image.alt)

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image.url)
    setMeta('name', 'twitter:image:alt', image.alt)

    setLink('canonical', path)

    if (type === 'article' && published) {
      setMeta('property', 'article:published_time', published)
    } else {
      removeMeta('property', 'article:published_time')
    }

    if (robots) {
      setMeta('name', 'robots', robots)
    } else {
      removeMeta('name', 'robots')
    }

    upsertJsonLd('person-jsonld', PERSON)
  }, [title, description, path, type, robots, published])

  return null
}