import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

// Thin gold→wine progress bar pinned to the very top — shown on reading pages.
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.3 })
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg, #d4af37, #d81b60, #7b1e3b)' }}
    />
  )
}
