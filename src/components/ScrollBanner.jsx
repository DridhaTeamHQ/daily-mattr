import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

// The India collage banner (from the Figma), brought in with a superb scroll
// treatment: it reveals (rise + scale + clip) as it enters the viewport, and
// the image parallax-drifts inside its frame as you scroll through it.
export default function ScrollBanner() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // Parallax: the image sits taller than its frame and drifts down as you pass.
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-12%', '0%'])
  // A gentle settle-zoom keyed to the same progress.
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.06, 1])

  return (
    <section ref={ref} className="mx-auto mt-12 max-w-[1600px] px-4 sm:mt-16 sm:px-8 lg:px-14">
      <motion.div
        className="relative h-[clamp(220px,44vw,540px)] overflow-hidden rounded-3xl ring-1 ring-black/[0.06] shadow-[0_30px_70px_-40px_rgba(17,24,39,0.5)]"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60, scale: 0.95, clipPath: 'inset(8% 8% 8% 8% round 24px)' }}
        whileInView={{ opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
        viewport={{ once: true, margin: '0px 0px -120px 0px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src="/newsletter/banner.png"
          alt="Daily Mattr — the breadth of India's day, from markets and policy to culture and wellness"
          className="absolute inset-x-0 top-0 h-[124%] w-full object-cover"
          style={{ y, scale }}
        />
        {/* soft inner vignette for depth */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_80px_rgba(17,24,39,0.18)]" />
      </motion.div>
    </section>
  )
}
