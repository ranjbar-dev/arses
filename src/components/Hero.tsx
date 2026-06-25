import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ease, useReducedMotion } from '../lib/motion'
import { useI18n } from '../lib/i18n/context'
import Button from './ui/Button'

const TELEGRAM = 'https://t.me/[TODO-handle]'

// Monogram paths (outer frame, inner chevron, bottom bar)
const PATHS = [
  'M270.85 286.61L296.88 286.56L169.68 64.26L42.49 286.56L68.52 286.61L0 326.65L13.09 301.45L20.81 286.56L169.68 0L318.56 286.56L326.28 301.45L339.37 326.65L270.85 286.61Z',
  'M194.51 153.8L169.69 110.44L144.87 153.8H194.5H194.51ZM201.78 166.51H137.61L112.79 209.87H226.6L201.78 166.51Z',
  'M105.46 222.57H233.92L258.74 265.93H80.6399L105.46 222.57Z',
]

export default function Hero() {
  const { t, isRtl } = useI18n()
  const reduced = useReducedMotion()
  const svgRef = useRef<SVGSVGElement>(null)
  const fogRef = useRef<HTMLCanvasElement>(null)

  // Monogram assemble animation via GSAP
  useGSAP(() => {
    if (reduced || !svgRef.current) return
    const paths = svgRef.current.querySelectorAll('path')
    gsap.fromTo(
      paths,
      { opacity: 0, scale: 0.92, transformOrigin: '50% 50%' },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.18,
        ease: 'power3.out',
        delay: 0.2,
      }
    )
  }, { scope: svgRef })

  // Ambient fog canvas
  useEffect(() => {
    const canvas = fogRef.current
    if (!canvas || reduced) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame: number
    let t = 0

    const draw = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cx = canvas.width / 2
      const cy = canvas.height * 0.4

      const g = ctx.createRadialGradient(
        cx + Math.sin(t * 0.3) * 60,
        cy + Math.cos(t * 0.2) * 40,
        0,
        cx,
        cy,
        canvas.width * 0.7
      )
      g.addColorStop(0, 'rgba(94,234,212,0.06)')
      g.addColorStop(0.5, 'rgba(0,31,32,0.02)')
      g.addColorStop(1, 'rgba(0,31,32,0)')

      ctx.fillStyle = g
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      t += 0.01
      frame = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(frame)
  }, [reduced])

  const headline = t.hero.headline.split('\n')

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 sm:px-10 lg:px-16">
      {/* Fog canvas */}
      <canvas ref={fogRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        {/* Monogram */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            ref={svgRef}
            viewBox="0 0 340 327"
            fill="none"
            className="h-24 w-auto sm:h-32"
            aria-hidden="true"
          >
            {PATHS.map((d, i) => (
              <path key={i} d={d} fill="white" style={{ opacity: reduced ? 1 : 0 }} />
            ))}
          </svg>
        </motion.div>

        {/* Headline */}
        <div className={`max-w-3xl ${isRtl ? 'font-persian' : 'font-display'}`}>
          {headline.map((line, i) => (
            <motion.h1
              key={i}
              className="block text-4xl font-semibold leading-tight tracking-tight text-primary sm:text-5xl lg:text-6xl"
              initial={reduced ? false : { opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 0.8, delay: reduced ? 0 : 0.6 + i * 0.15, ease }}
            >
              {line}
            </motion.h1>
          ))}
        </div>

        {/* Sub */}
        <motion.p
          className={`max-w-xl text-base text-secondary sm:text-lg ${isRtl ? 'font-persian' : ''}`}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduced ? 0 : 1.0, ease }}
        >
          {t.hero.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduced ? 0 : 1.15, ease }}
        >
          <Button href={TELEGRAM} target="_blank" rel="noopener noreferrer" magnetic>
            {t.hero.cta}
          </Button>
          <Button href="#work" variant="ghost">
            {t.hero.ctaSecondary}
          </Button>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        aria-hidden="true"
      >
        <motion.div
          className="h-10 w-px bg-gradient-to-b from-accent/50 to-transparent"
          animate={reduced ? {} : { scaleY: [0, 1, 0], originY: 0 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
