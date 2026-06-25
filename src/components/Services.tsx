import { motion } from 'framer-motion'
import { useI18n } from '../lib/i18n/context'
import { useReducedMotion } from '../lib/motion'
import SectionReveal, { RevealChild } from './ui/SectionReveal'

const ICONS = [
  // Design — chevron pen
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
  </svg>,
  // Development — chevron code
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
  </svg>,
  // Deployment — chevron rocket
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
  </svg>,
]

export default function Services() {
  const { t, isRtl } = useI18n()
  const reduced = useReducedMotion()

  return (
    <section id="services" className="px-6 py-28 sm:px-10 lg:px-16">
      <SectionReveal className="mx-auto max-w-6xl">
        {/* Eyebrow + heading */}
        <RevealChild>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-accent">
            {t.services.eyebrow}
          </p>
        </RevealChild>
        <RevealChild>
          <h2 className={`mb-16 text-3xl font-semibold leading-tight text-primary sm:text-4xl ${isRtl ? 'font-persian' : 'font-display'}`}>
            {t.services.heading.split('\n').map((l, i) => <span key={i} className="block">{l}</span>)}
          </h2>
        </RevealChild>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((item, i) => (
            <RevealChild key={i}>
              <motion.div
                className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-surface-1 p-8 transition-colors duration-300 hover:border-[var(--border-strong)] hover:bg-surface-2"
                whileHover={reduced ? {} : { y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Accent border draw on hover */}
                <motion.span
                  className="pointer-events-none absolute inset-0 rounded-2xl border border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />

                {/* Icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--bg-deep)] text-accent transition-transform duration-300 group-hover:scale-110">
                  {ICONS[i]}
                </div>

                <h3 className={`mb-3 text-lg font-semibold text-primary ${isRtl ? 'font-persian' : 'font-display'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm leading-relaxed text-secondary ${isRtl ? 'font-persian' : ''}`}>
                  {item.desc}
                </p>
              </motion.div>
            </RevealChild>
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}
