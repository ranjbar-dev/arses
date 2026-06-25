import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { useI18n } from '../lib/i18n/context'
import { useReducedMotion } from '../lib/motion'
import SectionReveal, { RevealChild } from './ui/SectionReveal'

function useCountUp(target: number, active: boolean, reduced: boolean, duration = 1800) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active || reduced) return
    let start = 0
    const step = (ts: number) => {
      if (!start) start = ts
      const pct = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - pct, 3)
      setVal(Math.round(ease * target))
      if (pct < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration, reduced])
  return reduced || !active ? target : val
}

function StatCard({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const reduced = useReducedMotion()
  const count = useCountUp(value, active, reduced)

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-surface-1 p-8 text-center">
      <div className="mb-2 font-mono text-4xl font-semibold text-accent sm:text-5xl">
        {count}{suffix}
      </div>
      <p className="text-sm text-secondary">{label}</p>
    </div>
  )
}

export default function WhyUs() {
  const { t, isRtl } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="px-6 py-28 sm:px-10 lg:px-16">
      <SectionReveal className="mx-auto max-w-6xl">
        <RevealChild>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-accent">
            {t.whyUs.eyebrow}
          </p>
        </RevealChild>
        <RevealChild>
          <h2 className={`mb-4 text-3xl font-semibold text-primary sm:text-4xl ${isRtl ? 'font-persian' : 'font-display'}`}>
            {t.whyUs.heading}
          </h2>
        </RevealChild>
        <RevealChild>
          <p className={`mb-16 max-w-xl text-secondary ${isRtl ? 'font-persian' : ''}`}>
            {t.whyUs.credibility}
          </p>
        </RevealChild>

        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.whyUs.stats.map((stat, i) => (
            <RevealChild key={i}>
              <StatCard
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                active={inView}
              />
            </RevealChild>
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}
