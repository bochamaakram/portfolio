import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { ThemePicker } from '@/components/ThemePicker'
import { PixelSnap } from '@/components/PixelSnap'
import { ProjectPicker } from '@/components/ProjectPicker'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { watchOutbound } from '@/lib/outbound'
import { readTheme } from '@/lib/theme'

function AppLayout() {
  const location = useLocation()

  useEffect(() => {
    watchOutbound()
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = readTheme()
  }, [location.pathname])

  return (
    <>
      <a
        href="#main"
        className="bg-bg text-text focus-visible:outline-ring absolute left-4 z-(--z-modal) -translate-y-[120%] px-3 py-2 text-sm font-medium underline outline-offset-2 focus:translate-y-4 focus-visible:outline-2"
      >
        Skip to content
      </a>
      <div className="flex min-h-dvh flex-col">
        <SiteHeader path={location.pathname} />
        <div id="main" className="relative z-10 min-h-dvh flex-1 bg-bg">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <SiteFooter path={location.pathname} />
      </div>
      <ThemePicker />
      <ProjectPicker />
      <PixelSnap />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}
