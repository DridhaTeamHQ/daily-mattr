import React from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { fetchEdition, SLUG_LABEL } from '../lib/content'
import { useLiveData } from '../lib/useLiveData'
import { readTime } from '../lib/readTime'
import SectionHeader from './SectionHeader'

const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }
const SANS = { fontFamily: "'Roboto', system-ui, sans-serif" }
const BANDS = ['#F4A300', '#D81B60', '#0E7C7B', '#C2410C', '#5B2A86', '#1B5E3F']
// Stable accent per id so colours don't reshuffle when the live feed updates.
const bandFor = (id) => {
  let h = 0
  for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return BANDS[h % BANDS.length]
}
const dateLabel = (iso) => {
  if (!iso) return ''
  try { return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) } catch { return '' }
}
const hrefFor = (a) => (a.slug ? `/${a.slug}/${a.id}` : '#')

function Reveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: reduce ? 0.3 : 0.5, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : delay }}
    >
      {children}
    </motion.div>
  )
}

function Meta({ a }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-gray-400" style={SANS}>
      <span>{a.source || 'Daily Mattr'}</span>
      {a.publishedAt && <><span aria-hidden>·</span><span>{dateLabel(a.publishedAt)}</span></>}
      <span aria-hidden>·</span>
      <span>{readTime(a.body, a.summary)} min read</span>
    </div>
  )
}

// Big lead story (first of the day).
function LeadCard({ a, band }) {
  return (
    <Link
      to={hrefFor(a)}
      className="group flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-7 transition-all hover:border-gray-300 hover:shadow-[0_18px_44px_-28px_rgba(17,24,39,0.4)] sm:p-9"
    >
      <span className="w-fit rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white" style={{ ...SANS, background: band }}>
        {a.bucket || 'Top story'}
      </span>
      <h3 className="mt-4 text-[26px] font-bold leading-[1.12] text-gray-900 decoration-[#7b1e3b]/50 decoration-2 underline-offset-4 group-hover:underline sm:text-[34px]" style={SERIF}>
        {a.headline}
      </h3>
      <p className="mt-3 line-clamp-4 flex-1 text-[15px] leading-relaxed text-gray-600" style={SANS}>{a.summary}</p>
      <Meta a={a} />
    </Link>
  )
}

// Smaller story card.
function StoryCard({ a, band }) {
  return (
    <Link
      to={hrefFor(a)}
      className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-[0_16px_36px_-28px_rgba(17,24,39,0.4)]"
    >
      {a.bucket && (
        <span className="w-fit rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ ...SANS, borderColor: band, color: band }}>
          {a.bucket}
        </span>
      )}
      <h3 className="mt-3 text-[17px] font-bold leading-snug text-gray-900 decoration-[#7b1e3b]/50 decoration-2 underline-offset-4 group-hover:underline" style={SERIF}>
        {a.headline}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-relaxed text-gray-600" style={SANS}>{a.summary}</p>
      <Meta a={a} />
    </Link>
  )
}

// Case study of the day — the right half of the lead row.
function Spotlight({ cs }) {
  return (
    <Link
      to={`/case-studies/${cs.id}`}
      className="group flex h-full flex-col rounded-3xl border border-gray-200 bg-[#fbf7f0] p-7 transition-all hover:border-[#c9a227]/60 hover:shadow-[0_18px_44px_-28px_rgba(106,27,90,0.3)] sm:p-9"
    >
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7b1e3b]" style={SANS}>◆ Case study of the day</span>
      <h3 className="mt-4 text-[26px] font-bold leading-[1.12] text-gray-900 decoration-[#7b1e3b]/50 decoration-2 underline-offset-4 group-hover:underline sm:text-[34px]" style={SERIF}>
        {cs.headline}
      </h3>
      <p className="mt-3 line-clamp-4 flex-1 text-[15px] leading-relaxed text-gray-600" style={SANS}>{cs.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#7b1e3b]" style={SANS}>
        Read the case
        <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </Link>
  )
}

// "Today's edition" — live approved stories led by a hero story + case study.
export default function EditionStories() {
  const { data: edition } = useLiveData(fetchEdition, [])

  if (!edition) return null
  const latest = edition.latest.slice(0, 7)
  const cs = edition.caseStudies[0]
  if (latest.length === 0 && !cs) return null
  const [lead, ...rest] = latest

  return (
    <section className="mx-auto max-w-[1180px] px-4 py-4 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeader overline="Fresh today" title="Today's edition" to="/general" linkLabel="Browse all stories" />
      </Reveal>

      {/* Lead row: hero story + case study of the day */}
      {(lead || cs) && (
        <div className="grid gap-6 lg:grid-cols-2">
          {lead && <Reveal className="h-full"><LeadCard a={lead} band={bandFor(lead.id)} /></Reveal>}
          {cs && <Reveal className="h-full" delay={0.08}><Spotlight cs={cs} /></Reveal>}
        </div>
      )}

      {/* The rest */}
      {rest.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a, i) => (
            <Reveal key={a.id} className="h-full" delay={Math.min(i * 0.06, 0.3)}>
              <StoryCard a={a} band={bandFor(a.id)} />
            </Reveal>
          ))}
        </div>
      )}

      <Reveal className="mt-9 flex flex-wrap items-center justify-center gap-3">
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
