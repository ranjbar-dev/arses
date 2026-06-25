import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, stagger, useReducedMotion } from '../../lib/motion'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'article'
}

export default function SectionReveal({ children, className, delay = 0, as = 'div' }: Props) {
  const reduced = useReducedMotion()

  const container: Variants = reduced
    ? {}
    : { ...stagger(0.1), visible: { ...stagger(0.1).visible, transition: { staggerChildren: 0.1, delayChildren: delay } } }

  const Tag = motion[as]

  return (
    <Tag
      className={className}
      variants={container}
      initial={reduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </Tag>
  )
}

export function RevealChild({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return (
    <motion.div className={className} variants={reduced ? {} : fadeUp}>
      {children}
    </motion.div>
  )
}
