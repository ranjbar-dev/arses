import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ease, useReducedMotion } from '../lib/motion'
import { useI18n } from '../lib/i18n/context'
import { getLenis } from '../lib/lenis'
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

  // Ambient fog canvas + constellation particles
  useEffect(() => {
    const canvas = fogRef.current
    if (!canvas || reduced) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const PARTICLE_COUNT = 30
    const CONNECTION_DIST = 120
    const ACCENT = '94,234,212'

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; opacity: number; opacityDir: number }

    let particles: Particle[] = []
    let frame: number
    let tick = 0

    const init = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: 1 + Math.random() * 1.5,
        opacity: Math.random() * 0.5 + 0.1,
        opacityDir: Math.random() > 0.5 ? 1 : -1,
      }))
    }

    const draw = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      // Ambient fog gradient (original)
      const cx = w / 2
      const cy = h * 0.4
      const g = ctx.createRadialGradient(
        cx + Math.sin(tick * 0.3) * 60,
        cy + Math.cos(tick * 0.2) * 40,
        0,
        cx, cy,
        w * 0.7
      )
      g.addColorStop(0, 'rgba(94,234,212,0.06)')
      g.addColorStop(0.5, 'rgba(0,31,32,0.02)')
      g.addColorStop(1, 'rgba(0,31,32,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      // Update + draw particles
      for (const p of particles) {
        p.x = (p.x + p.vx + w) % w
        p.y = (p.y + p.vy + h) % h
        p.opacity += p.opacityDir * 0.003
        if (p.opacity >= 0.6 || p.opacity <= 0.05) p.opacityDir *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ACCENT},${p.opacity})`
        ctx.fill()
      }

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < CONNECTION_DIST) {
            const lineOpacity = (1 - dist / CONNECTION_DIST) * 0.15
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${ACCENT},${lineOpacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      tick += 0.01
      frame = requestAnimationFrame(draw)
    }

    init()
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
          <Button
            href="#work"
            variant="ghost"
            onClick={(e) => {
              const lenis = getLenis()
              if (!lenis) return
              e.preventDefault()
              lenis.scrollTo('#work')
            }}
          >
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
