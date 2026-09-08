import { Seo } from '@/lib/seo-react'
import { NotFoundHero } from '@/components/NotFoundHero'
import { SITE_URL } from '@/lib/seo'

export function NotFoundPage() {
  return (
    <>
      <Seo
        title="Not found"
        description="There is nothing at this address."
        path={`${SITE_URL}/404/`}
        robots="noindex"
      />
      <NotFoundHero />
    </>
  )
}
