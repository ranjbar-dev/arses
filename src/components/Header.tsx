import { motion, useScroll, useTransform } from 'framer-motion'
import { useI18n } from '../lib/i18n/context'
import { getLenis } from '../lib/lenis'

const TELEGRAM = 'https://t.me/[TODO-handle]'

export default function Header() {
  const { t, lang, setLang } = useI18n()
  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 80], ['rgba(0,31,32,0)', 'rgba(0,31,32,0.92)'])
  const blur = useTransform(scrollY, [0, 80], [0, 12])

  return (
    <motion.header
      style={{ backgroundColor: bg, backdropFilter: blur.get() ? `blur(${blur.get()}px)` : undefined }}
      className="fixed inset-x-0 top-0 z-50 flex h-16 items-center border-b border-[var(--border)] px-6 transition-[border-color] duration-300 sm:px-10 lg:px-16"
    >
      {/* Logo */}
      <a href="#" aria-label="Arses home" className="flex items-center gap-3 shrink-0">
        <svg width="28" height="27" viewBox="0 0 340 287" fill="none" aria-hidden="true">
          <path d="M105.46 222.57H233.92L258.74 265.93H80.6399L105.46 222.57Z" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M194.51 153.8L169.69 110.44L144.87 153.8H194.5H194.51ZM201.78 166.51H137.61L112.79 209.87H226.6L201.78 166.51Z" fill="white"/>
          <path d="M270.85 286.61L296.88 286.56L169.68 64.26L42.49 286.56L68.52 286.61L0 326.65L13.09 301.45L20.81 286.56L169.68 0L318.56 286.56L326.28 301.45L339.37 326.65L270.85 286.61Z" fill="white"/>
        </svg>
        <span className="font-display text-sm font-semibold tracking-widest text-primary">ARSES</span>
      </a>

      {/* Nav */}
      <nav className="ms-auto flex items-center gap-1 sm:gap-2">
        {(['work', 'process', 'contact'] as const).map((key) => {
          const href = `#${key}`
          return (
            <a
              key={key}
              href={href}
              onClick={(e) => {
                const lenis = getLenis()
                if (!lenis) return
                e.preventDefault()
                lenis.scrollTo(href)
              }}
              className="hidden px-3 py-1.5 text-sm text-secondary transition-colors hover:text-accent sm:block"
            >
              {t.nav[key]}
            </a>
          )
        })}

        {/* Lang toggle */}
        <button
          onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
          className="ms-2 rounded-full border border-[var(--border)] px-3 py-1 font-mono text-xs text-secondary transition hover:border-accent hover:text-accent"
          aria-label="Switch language"
        >
          {lang === 'en' ? t.lang.fa : t.lang.en}
        </button>

        {/* CTA */}
        <a
          href={TELEGRAM}
          target="_blank"
          rel="noopener noreferrer"
          className="ms-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-on-accent transition hover:bg-accent-bright"
        >
          {t.nav.startProject}
        </a>
      </nav>
    </motion.header>
  )
}
