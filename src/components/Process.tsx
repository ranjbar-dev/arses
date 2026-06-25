import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { useI18n } from '../lib/i18n/context'
import { useReducedMotion } from '../lib/motion'
import SectionReveal, { RevealChild } from './ui/SectionReveal'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const { t, isRtl } = useI18n()
  const reduced = useReducedMotion()
  const lineRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (reduced || !lineRef.current || !containerRef.current) return
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: 'top center' },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.5,
        },
      }
    )
  }, { scope: containerRef, dependencies: [reduced, isRtl] })

  return (
    <section id="process" className="bg-bg-deep px-6 py-28 sm:px-10 lg:px-16">
      <SectionReveal className="mx-auto max-w-4xl">
        <RevealChild>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-accent">
            {t.process.eyebrow}
          </p>
        </RevealChild>
        <RevealChild>
          <h2 className={`mb-20 text-3xl font-semibold text-primary sm:text-4xl ${isRtl ? 'font-persian' : 'font-display'}`}>
            {t.process.heading}
          </h2>
        </RevealChild>
      </SectionReveal>

      <div ref={containerRef} className="relative mx-auto max-w-4xl">
        {/* Vertical timeline line */}
        <div className="absolute start-[18px] top-0 h-full w-px bg-[var(--border)] sm:start-[23px]" aria-hidden="true">
          <div
            ref={lineRef}
            className="absolute inset-0 origin-top bg-accent"
            style={reduced ? { scaleY: 1 } : { scaleY: 0 }}
          />
        </div>

        <div className="space-y-12">
          {t.process.steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative flex gap-8"
              initial={reduced ? false : { opacity: 0, x: isRtl ? 16 : -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              {/* Step dot */}
              <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] bg-bg-deep">
                <span className="font-mono text-xs font-medium text-accent">{step.number}</span>
              </div>

              {/* Content */}
              <div className="pb-4 pt-1">
                <h3 className={`mb-2 text-lg font-semibold text-primary ${isRtl ? 'font-persian' : 'font-display'}`}>
                  {step.title}
                </h3>
                <p className={`text-sm leading-relaxed text-secondary ${isRtl ? 'font-persian' : ''}`}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
