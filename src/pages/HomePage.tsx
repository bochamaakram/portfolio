import { Seo } from '@/lib/seo-react'
import { HomePage as HomeContent } from '@/components/HomeContent'
import { SITE_URL } from '@/lib/seo'

export function HomePage() {
  return (
    <>
      <Seo
        title="Akram Bouchama - Full Stack Web Developer"
        description="Full Stack Web Developer based in Marrakech, Morocco, specializing in React, Node.js, and modern web technologies."
        path={`${SITE_URL}/`}
      />
      <HomeContent />
    </>
  )
}
