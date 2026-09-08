import catalogue from './messages/en.json'
import registry from './locales.json' with { type: 'json' }

const messages: Record<string, string> = catalogue as Record<string, string>

export type Locale = {
  name: string
  domain: string
  formatLocale: string
  ogLocale: string
  manual: boolean
  contentLocale?: string
  direction?: 'ltr' | 'rtl'
  flag?: string
}
export const locales = registry as Record<string, Locale>
export const language = 'en'
export const locale = locales[language]
export const siteUrl = locale.domain
export const contentLocale = locale.contentLocale ?? language

/** English is the source copy; each language keeps its own reviewed catalogue. */
export function t(english: string): string {
  return messages[english] ?? english
}

export function hasTranslation(code: string, path: string): boolean {
  return (
    Boolean(locales[code]) &&
    (!path.startsWith('/manual') || locales[code].manual)
  )
}

/** Keep untranslated chapters on the English site, including their fragments. */
export function localizedHref(href: string): string {
  return !locale.manual && /^\/manual(?:[/?#]|$)/.test(href)
    ? `${locales.en.domain}${href}`
    : href
}
