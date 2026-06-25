import { motion } from 'framer-motion'
import { useI18n } from '../lib/i18n/context'
import { fadeIn } from '../lib/motion'

const TELEGRAM = 'https://t.me/[TODO-handle]'
const PHONE = 'tel:[TODO-number]'

export default function Footer() {
  const { t, lang, setLang, isRtl } = useI18n()

  return (
    <motion.footer
      className="border-t border-[var(--border)] bg-bg-deep px-6 py-12 sm:px-10 lg:px-16"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Logo + tagline */}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <svg width="24" height="23" viewBox="0 0 340 287" fill="none" aria-hidden="true">
                <path d="M105.46 222.57H233.92L258.74 265.93H80.6399L105.46 222.57Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M194.51 153.8L169.69 110.44L144.87 153.8H194.5H194.51ZM201.78 166.51H137.61L112.79 209.87H226.6L201.78 166.51Z" fill="white"/>
                <path d="M270.85 286.61L296.88 286.56L169.68 64.26L42.49 286.56L68.52 286.61L0 326.65L13.09 301.45L20.81 286.56L169.68 0L318.56 286.56L326.28 301.45L339.37 326.65L270.85 286.61Z" fill="white"/>
              </svg>
              <span className="font-display text-sm font-semibold tracking-widest text-primary">ARSES</span>
            </div>
            <p className={`text-xs text-faint ${isRtl ? 'font-persian' : ''}`}>{t.footer.tagline}</p>
            <p className="mt-1 font-mono text-xs text-faint">{t.footer.domain}</p>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-2 sm:items-end" aria-label="Footer navigation">
            {(['work', 'process', 'contact'] as const).map((key) => (
              <a key={key} href={`#${key}`} className="text-sm text-secondary transition-colors hover:text-accent">
                {t.nav[key]}
              </a>
            ))}
          </nav>

          {/* Contact + lang */}
          <div className="flex flex-col gap-3 sm:items-end">
            <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="text-sm text-secondary transition-colors hover:text-accent">
              {t.contact.handle}
            </a>
            <a href={PHONE} className="text-sm text-secondary transition-colors hover:text-accent">
              {t.contact.phone}
            </a>
            <button
              onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
              className="mt-2 rounded-full border border-[var(--border)] px-3 py-1 font-mono text-xs text-secondary transition hover:border-accent hover:text-accent"
              aria-label="Switch language"
            >
              {lang === 'en' ? t.lang.fa : t.lang.en}
            </button>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-6 text-center">
          <p className={`text-xs text-faint ${isRtl ? 'font-persian' : ''}`}>{t.footer.copyright}</p>
        </div>
      </div>
    </motion.footer>
  )
}
