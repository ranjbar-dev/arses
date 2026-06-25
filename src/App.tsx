import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import TechMarquee from './components/TechMarquee'
import Work from './components/Work'
import Process from './components/Process'
import WhyUs from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MagneticCursor from './components/ui/MagneticCursor'
import { initLenis, destroyLenis } from './lib/lenis'
import { useReducedMotion } from './lib/motion'
import { useI18n } from './lib/i18n/context'

export default function App() {
  const reduced = useReducedMotion()
  const { isRtl } = useI18n()

  useEffect(() => {
    if (!reduced) initLenis(isRtl)
    return destroyLenis
  }, [reduced, isRtl])

  return (
    <>
      <MagneticCursor />
      <Header />
      <main>
        <Hero />
        <Services />
        <TechMarquee />
        <Work />
        <Process />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
