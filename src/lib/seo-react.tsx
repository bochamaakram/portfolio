import { useEffect } from 'react'

export interface SeoProps {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  robots?: string
  published?: string
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
 * Manages document head tags for a single-page application. Since the app is
 * client-rendered, the tags are written on mount and whenever the props
 * change. All `<title>` and `<meta>` tags are managed here so navigating
 * between routes updates them.
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
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', path)
    setLink('canonical', path)
    if (type === 'article' && published) {
      setMeta('property', 'article:published_time', published)
    } else {
      document.head
        .querySelector('meta[property="article:published_time"]')
        ?.remove()
    }
    if (robots) {
      setMeta('name', 'robots', robots)
    } else {
      document.head.querySelector('meta[name="robots"]')?.remove()
    }
  }, [title, description, path, type, robots, published])

  return null
}
