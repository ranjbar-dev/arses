import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../lib/motion'

export default function MagneticCursor() {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('')
  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const sx = useSpring(mx, { stiffness: 400, damping: 30 })
  const sy = useSpring(my, { stiffness: 400, damping: 30 })

  useEffect(() => {
    // Only on pointer-fine (non-touch) devices
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      setVisible(true)
    }
    const onLeave = () => setVisible(false)

    // Detect cursor=view areas
    const updateLabel = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-cursor]')
      setLabel(el?.getAttribute('data-cursor') ?? '')
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousemove', updateLabel)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousemove', updateLabel)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [mx, my, reduced])

  if (reduced) return null

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2"
      style={{ left: sx, top: sy, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full border border-accent bg-accent/10 text-accent"
        animate={label ? { width: 72, height: 72 } : { width: 12, height: 12 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {label && <span className="font-mono text-xs font-medium">{label}</span>}
      </motion.div>
    </motion.div>
  )
}
