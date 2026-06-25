import { motion } from 'framer-motion'
import { useI18n } from '../lib/i18n/context'
import { useReducedMotion } from '../lib/motion'
import { techStack } from '../data'
import SectionReveal, { RevealChild } from './ui/SectionReveal'

export default function TechMarquee() {
  const { t, isRtl } = useI18n()
  const reduced = useReducedMotion()
  const dir = isRtl ? 1 : -1
  const duration = 28

  return (
    <section className="overflow-hidden border-y border-[var(--border)] bg-bg-deep py-20">
      <SectionReveal className="mx-auto mb-12 max-w-6xl px-6 sm:px-10 lg:px-16">
        <RevealChild>
          <p className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-accent">
            {t.tech.eyebrow}
          </p>
        </RevealChild>
        <RevealChild>
          <h2 className={`text-3xl font-semibold text-primary sm:text-4xl ${isRtl ? 'font-persian' : 'font-display'}`}>
            {t.tech.heading}
          </h2>
        </RevealChild>
      </SectionReveal>

      {/* Marquee track */}
      <div
        className="relative"
        aria-label={t.tech.heading}
        aria-hidden={reduced ? true : undefined}
      >
        {/* Fade masks */}
        <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-bg-deep to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-bg-deep to-transparent" aria-hidden="true" />

        {reduced ? (
          <div className="flex flex-wrap justify-center gap-3 px-6">
            {techStack.map((tech: string) => <TechChip key={tech} name={tech} />)}
          </div>
        ) : (
          <motion.div
            className="flex gap-4 whitespace-nowrap px-4"
            animate={{ x: dir < 0 ? [0, '-50%'] : ['-50%', 0] }}
            transition={{ duration, ease: 'linear', repeat: Infinity }}
          >
            {[...techStack, ...techStack].map((tech: string, i: number) => (
              <TechChip key={i} name={tech} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

function TechChip({ name }: { name: string }) {
  return (
    <motion.span
      className="inline-flex shrink-0 items-center rounded-full border border-[var(--border)] bg-surface-1 px-5 py-2.5 font-mono text-sm text-secondary transition-colors hover:border-accent hover:text-accent"
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {name}
    </motion.span>
  )
}
