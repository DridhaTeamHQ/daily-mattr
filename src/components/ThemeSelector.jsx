import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { NEWSLETTER_THEMES } from '../lib/newsletterThemes'

// "Explore the editions" — editorial cover cards. The category title sits over a
// gradient-scrimmed image; a short blurb + arrow CTA sit below. Each card lifts
// and its cover zooms on hover/tap, and the grid reveals in a gentle stagger.
const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }
const SANS = { fontFamily: "'Roboto', system-ui, sans-serif" }

const Arrow = () => (
  <svg className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function ThemeSelector() {
  const reduce = useReducedMotion()
  return (
    <section id="themes" className="mx-auto mt-16 max-w-[1600px] scroll-mt-28 px-4 sm:px-8 lg:px-14">
      <div className="mb-8">
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d81b60]" style={SANS}>
          ✦ Explore ✦
        </span>
        <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-[#7b1e3b] sm:text-5xl" style={SERIF}>
          Explore the editions
        </h2>
        <p className="mt-2 max-w-2xl text-base text-gray-600 sm:text-lg" style={SANS}>
          Browse every category — the day&rsquo;s headlines, the topics, and the case studies.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {NEWSLETTER_THEMES.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ duration: reduce ? 0.3 : 0.5, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : Math.min(i * 0.06, 0.3) }}
            whileHover={reduce ? undefined : { y: -5 }}
          >
            <Link
              to={cat.href || `/${cat.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#c9a227]/25 bg-[#fbf7f0] transition-[border-color,box-shadow] hover:border-[#c9a227]/60 hover:shadow-[0_18px_44px_rgba(106,27,90,0.16)]"
            >
              {/* Cover with the title overlaid on a gradient scrim */}
              <div className="relative h-[260px] w-full overflow-hidden sm:h-[300px]">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.label}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient}`} />
                )}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(58,18,6,0.90) 0%, rgba(58,18,6,0.30) 46%, rgba(58,18,6,0) 76%)' }}
                />
                <span className="absolute left-5 top-4 text-[12px] font-bold tracking-[0.2em] text-white/70" style={SANS}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="inline-block rounded-full bg-[#f4a300] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#3a1206]" style={SANS}>
                    {cat.href ? 'Case Studies' : 'Edition'}
                  </span>
                  <h3 className="mt-2 text-[27px] font-extrabold leading-[1.05] text-white sm:text-[30px]" style={SERIF}>
                    {cat.label}
                  </h3>
                </div>
              </div>

              {/* Blurb + CTA */}
              <div className="flex flex-1 flex-col p-5" style={SANS}>
                <p className="text-[14px] leading-relaxed text-gray-600">{cat.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#7b1e3b] transition-colors group-hover:text-[#d81b60]">
                  {cat.href ? 'Read case studies' : 'Read more'}
                  <Arrow />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
