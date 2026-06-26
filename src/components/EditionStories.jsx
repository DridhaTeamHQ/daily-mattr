import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fetchEdition, SLUG_LABEL } from '../lib/content'
import { useLiveData } from '../lib/useLiveData'

const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }
const SANS = { fontFamily: "'Roboto', system-ui, sans-serif" }
const WINE = '#7B1E3B'
const BANDS = ['#F4A300', '#D81B60', '#0E7C7B', '#C2410C', '#5B2A86', '#1B5E3F']
// Stable band per id so colours don't reshuffle when the live feed updates.
const bandFor = (id) => {
  let h = 0
  for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return BANDS[h % BANDS.length]
}

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

function StoryCard({ a, band }) {
  return (
    <Link
      to={a.slug ? `/${a.slug}/${a.id}` : '#'}
      className="desi-card flex h-full flex-col rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
      style={{ '--band': band }}
    >
      {a.bucket && (
        <span className="w-fit rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ ...SANS, borderColor: band, color: band }}>
          {a.bucket}
        </span>
      )}
      <h3 className="mt-3 text-[17px] font-bold leading-snug text-gray-900" style={SERIF}>{a.headline}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-relaxed text-gray-700" style={SANS}>{a.summary}</p>
      <span className="mt-4 text-[12px] text-gray-400" style={SANS}>{a.source || 'Daily Mattr'}</span>
    </Link>
  )
}

function Spotlight({ cs }) {
  return (
    <Reveal>
      <Link
        to={`/case-studies/${cs.id}`}
        className="desi-frame group relative block overflow-hidden rounded-3xl p-8 sm:p-10"
        style={{ background: `linear-gradient(135deg, ${WINE}, #3A1206)` }}
      >
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.4px)', backgroundSize: '18px 18px' }} />
        <div className="relative">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white" style={SANS}>
            ◆ Case Study of the day
          </span>
          <h3 className="mt-4 max-w-3xl text-2xl font-bold leading-snug text-white sm:text-3xl" style={SERIF}>{cs.headline}</h3>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/85" style={SANS}>{cs.summary}</p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-[#3a1206] shadow-lg" style={{ ...SANS, background: '#F4A300' }}>
            Read the case
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </div>
      </Link>
    </Reveal>
  )
}

// "Today's edition" — live approved stories + the day's case-study spotlight.
export default function EditionStories() {
  // Live: polls + refetches on tab focus so the home page stays current.
  const edition = useLiveData(fetchEdition, [])

  if (!edition) return null
  const latest = edition.latest.slice(0, 6)
  const cs = edition.caseStudies[0]
  if (latest.length === 0 && !cs) return null

  return (
    <section className="mx-auto max-w-[1180px] px-4 py-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-2 flex items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d81b60]" style={SANS}>✦ Fresh today ✦</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#7b1e3b] sm:text-4xl" style={SERIF}>Today&rsquo;s edition</h2>
          </div>
          <Link to="/general" className="hidden shrink-0 text-[13px] font-semibold text-[#7b1e3b] hover:text-[#d81b60] sm:inline" style={SANS}>
            Browse all stories →
          </Link>
        </div>
      </Reveal>

      {cs && <div className="mt-6"><Spotlight cs={cs} /></div>}

      {latest.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((a, i) => (
            <Reveal key={a.id} className="h-full" delay={Math.min(i * 0.06, 0.3)}>
              <StoryCard a={a} band={bandFor(a.id)} />
            </Reveal>
          ))}
        </div>
      )}

      <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to="/case-studies" className="rounded-full border border-[#7b1e3b]/40 px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-[#7b1e3b] transition-colors hover:bg-[#fff0d6]" style={SANS}>
          All case studies
        </Link>
        {['general', 'real-estate', 'policy-partner', 'money-matters', 'wellness-daily'].map((s) => (
          <Link key={s} to={`/${s}`} className="rounded-full border border-[#c9a227]/40 px-4 py-2 text-[12px] font-semibold text-gray-700 transition-colors hover:border-[#c9a227]" style={SANS}>
            {SLUG_LABEL[s]}
          </Link>
        ))}
      </Reveal>
    </section>
  )
}
