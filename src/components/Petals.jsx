import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// A one-shot fall of marigold / jewel-tone petals — used to celebrate a
// successful subscribe. Purely decorative; skipped for reduced-motion.
const COLORS = ['#F4A300', '#D81B60', '#C9A227', '#7B1E3B', '#E8B84B', '#F06292']

export default function Petals({ count = 22 }) {
  const reduce = useReducedMotion()
  if (reduce) return null
  const petals = Array.from({ length: count }, (_, i) => ({
    i,
    left: (i * 37) % 100,
    delay: (i % 7) * 0.09,
    dur: 2.4 + (i % 5) * 0.35,
    size: 7 + (i % 4) * 3,
    color: COLORS[i % COLORS.length],
    rot: (i * 47) % 360,
    drift: ((i % 5) - 2) * 18,
  }))
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <motion.span
          key={p.i}
          className="absolute top-[-16px] block"
          style={{ left: `${p.left}%`, width: p.size, height: p.size * 1.5, background: p.color, borderRadius: '40% 60% 60% 40%' }}
          initial={{ y: -20, x: 0, opacity: 0, rotate: p.rot }}
          animate={{ y: '130%', x: p.drift, opacity: [0, 1, 1, 0], rotate: p.rot + 220 }}
          transition={{ duration: p.dur, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}
