import { motion, useMotionValue, useSpring, type HTMLMotionProps } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { useReducedMotion } from '../../lib/motion'

interface Props extends Omit<HTMLMotionProps<'a'>, 'children'> {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  magnetic?: boolean
}

export default function Button({ children, variant = 'primary', magnetic = false, className = '', ...props }: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 300, damping: 20 })
  const sy = useSpring(my, { stiffness: 300, damping: 20 })

  const handleMove = (e: React.MouseEvent) => {
    if (!magnetic || reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.3)
    my.set((e.clientY - rect.top - rect.height / 2) * 0.3)
  }

  const reset = () => { mx.set(0); my.set(0) }

  const base =
    'inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors focus-visible:outline-none cursor-pointer'

  const variants = {
    primary: 'bg-accent text-on-accent hover:bg-accent-bright',
    ghost: 'border border-[var(--border-strong)] text-primary hover:border-accent hover:text-accent',
  }

  return (
    <motion.a
      ref={ref}
      style={magnetic && !reduced ? { x: sx, y: sy } : undefined}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  )
}
