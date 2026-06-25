import { motion } from 'framer-motion'
import { useI18n } from '../lib/i18n/context'
import { useReducedMotion } from '../lib/motion'
import { workItems } from '../data'
import SectionReveal, { RevealChild } from './ui/SectionReveal'

export default function Work() {
  const { t, isRtl } = useI18n()
  const reduced = useReducedMotion()

  return (
    <section id="work" className="px-6 py-28 sm:px-10 lg:px-16">
      <SectionReveal className="mx-auto max-w-6xl">
        <RevealChild>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-accent">
            {t.work.eyebrow}
          </p>
        </RevealChild>
        <RevealChild>
          <h2 className={`mb-16 text-3xl font-semibold text-primary sm:text-4xl ${isRtl ? 'font-persian' : 'font-display'}`}>
            {t.work.heading}
          </h2>
        </RevealChild>

        <div className="grid gap-6 sm:grid-cols-2">
          {workItems.map((item, i) => (
            <RevealChild key={item.id}>
              <motion.a
                href={item.placeholder ? undefined : item.url}
                target={item.placeholder ? undefined : '_blank'}
                rel="noopener noreferrer"
                data-cursor={item.placeholder ? undefined : t.work.view}
                className="group relative flex min-h-64 flex-col justify-end overflow-hidden rounded-2xl border border-[var(--border)] p-7 transition-colors hover:border-[var(--border-strong)]"
                style={{ backgroundColor: item.color }}
                whileHover={reduced ? {} : { scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                {/* Thumbnail placeholder with geometric pattern */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                  <svg viewBox="0 0 400 256" className="absolute inset-0 h-full w-full opacity-10" preserveAspectRatio="xMidYMid slice">
                    <path d="M200 20L370 290H30L200 20Z" stroke="white" strokeWidth="1" fill="none" />
                    <path d="M200 80L310 270H90L200 80Z" stroke="white" strokeWidth="0.5" fill="none" />
                  </svg>
                  {/* Hover zoom overlay */}
                  <motion.div
                    className="absolute inset-0 bg-accent/5"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Labels */}
                <div className="relative z-10">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-mono text-xs font-medium uppercase tracking-wider text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {!item.placeholder && (
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
                        {t.work.live}
                      </span>
                    )}
                  </div>
                  <h3 className={`text-xl font-semibold text-primary ${isRtl ? 'font-persian' : 'font-display'}`}>
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-secondary">{item.tag}</p>
                </div>

                {/* Arrow on hover */}
                {!item.placeholder && (
                  <motion.div
                    className="absolute end-6 top-6 rounded-full border border-[var(--border-strong)] p-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                      <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                )}
              </motion.a>
            </RevealChild>
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}
