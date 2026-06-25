import { motion } from 'framer-motion'
import { useI18n } from '../lib/i18n/context'
import { ease, useReducedMotion } from '../lib/motion'
import SectionReveal, { RevealChild } from './ui/SectionReveal'

const TELEGRAM = 'https://t.me/[TODO-handle]'
const PHONE = 'tel:[TODO-number]'

// Monogram echo paths
const MONOGRAM_PATHS = [
  'M270.85 286.61L296.88 286.56L169.68 64.26L42.49 286.56L68.52 286.61L0 326.65L13.09 301.45L20.81 286.56L169.68 0L318.56 286.56L326.28 301.45L339.37 326.65L270.85 286.61Z',
  'M194.51 153.8L169.69 110.44L144.87 153.8H194.5ZM201.78 166.51H137.61L112.79 209.87H226.6L201.78 166.51Z',
  'M105.46 222.57H233.92L258.74 265.93H80.6399L105.46 222.57Z',
]

export default function Contact() {
  const { t, isRtl } = useI18n()
  const reduced = useReducedMotion()
  const lines = t.contact.heading.split('\n')

  return (
    <section id="contact" className="relative overflow-hidden bg-bg-deep px-6 py-32 sm:px-10 lg:px-16">
      {/* Background monogram echo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden opacity-[0.03]" aria-hidden="true">
        <svg viewBox="0 0 340 327" className="h-[80vw] max-h-[600px] w-auto">
          {MONOGRAM_PATHS.map((d, i) => (
            <path key={i} d={d} fill="white" />
          ))}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <SectionReveal>
          <RevealChild>
            <p className="mb-6 font-mono text-xs font-medium uppercase tracking-widest text-accent">
              {t.contact.eyebrow}
            </p>
          </RevealChild>

          {/* Kinetic headline */}
          <div className={`mb-8 ${isRtl ? 'font-persian' : 'font-display'}`}>
            {lines.map((line, i) => (
              <motion.h2
                key={i}
                className="block text-4xl font-semibold leading-tight text-primary sm:text-5xl lg:text-6xl"
                initial={reduced ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.12, ease }}
              >
                {line}
              </motion.h2>
            ))}
          </div>

          <RevealChild>
            <p className={`mb-12 text-base text-secondary sm:text-lg ${isRtl ? 'font-persian' : ''}`}>
              {t.contact.sub}
            </p>
          </RevealChild>

          {/* CTAs */}
          <RevealChild>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {/* Telegram — accent pulse */}
              <motion.a
                href={TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-on-accent transition hover:bg-accent-bright"
                whileHover={reduced ? {} : { scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Single accent pulse ring */}
                {!reduced && (
                  <motion.span
                    className="pointer-events-none absolute inset-0 rounded-full border border-accent"
                    animate={{ scale: [1, 1.12], opacity: [0.6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                    aria-hidden="true"
                  />
                )}
                <TelegramIcon />
                {t.contact.telegram}
              </motion.a>

              {/* Phone */}
              <a
                href={PHONE}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-8 py-4 text-sm font-medium text-primary transition hover:border-accent hover:text-accent"
              >
                <PhoneIcon />
                {t.contact.phone}
              </a>
            </div>
          </RevealChild>

          <RevealChild>
            <p className="mt-6 font-mono text-xs text-faint">{t.contact.handle}</p>
          </RevealChild>
        </SectionReveal>
      </div>
    </section>
  )
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6z" />
    </svg>
  )
}
