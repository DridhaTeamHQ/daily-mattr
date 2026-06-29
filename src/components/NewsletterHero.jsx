import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Newsletter hero: a giant Source-Serif "NEWSLETTER" over a vintage news-print
// backdrop that gently fades and drifts away as you scroll past it.
const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }
const SANS = { fontFamily: "'Roboto', system-ui, sans-serif" }

export default function NewsletterHero() {
  const { scrollY } = useScroll()
  // Fade the backdrop out (and drift it slightly) over the first stretch of scroll.
  const bgOpacity = useTransform(scrollY, [0, 460], [0.45, 0])
  const bgY = useTransform(scrollY, [0, 460], [0, 70])

  return (
    <section className="relative overflow-hidden bg-[#faf9f6] pt-28 pb-16 sm:pt-32">
      {/* News-print backdrop — fades on scroll */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: bgOpacity, y: bgY }} aria-hidden>
        <img src="/newsletter/hero/newspaper.jpg" alt="" className="h-full w-full object-cover mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#faf9f6]/30" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[#faf9f6]" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        {/* Title */}
        <h1
          className="text-center font-extrabold leading-none text-black tracking-tight text-[clamp(2.75rem,12vw,186px)]"
          style={{
            ...SERIF,
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
            textRendering: 'geometricPrecision',
          }}
        >
          NEWSLETTER
        </h1>

        {/* Tagline */}
        <p className="max-w-2xl text-center text-[18px] leading-[1.56] text-black" style={SANS}>
          A distilled, premium curation of the world&rsquo;s most significant movements in
          culture, technology, and finance. Crafted with cinematic precision.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#subscribe"
            className="inline-flex items-center justify-center rounded-full border border-[#c9a227] bg-[#7b1e3b] px-7 py-3.5 text-[15px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#5e1730]"
            style={SANS}
          >
            Subscribe
          </a>
          <a
            href="#stories"
            className="relative inline-flex items-center justify-center rounded-[50px] border border-[#7b1e3b]/40 bg-white/40 px-6 py-4 text-[15px] font-semibold uppercase tracking-wide text-[#7b1e3b] backdrop-blur-sm transition-transform hover:scale-[1.03]"
            style={SANS}
          >
            Read today&rsquo;s edition
          </a>
        </div>
      </div>
    </section>
  )
}
