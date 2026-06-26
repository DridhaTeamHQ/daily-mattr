import React, { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import NewsletterNav from '../components/NewsletterNav'
import Footer from '../components/Footer'
import { fetchCaseStudies } from '../lib/content'
import { useLiveData } from '../lib/useLiveData'
import '../styles/desi.css'

const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }
const SANS = { fontFamily: "'Roboto', system-ui, sans-serif" }
const WINE = '#7B1E3B'
const GOLD = '#C9A227'

const dateLabel = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

// A faint mandala, parked in the hero corners.
function Mandala({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="50" cy="50" r="46" />
      <circle cx="50" cy="50" r="34" />
      <circle cx="50" cy="50" r="20" />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i * Math.PI) / 8
        return <line key={i} x1="50" y1="50" x2={50 + 46 * Math.cos(a)} y2={50 + 46 * Math.sin(a)} />
      })}
    </svg>
  )
}

function CaseHero({ count }) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative mx-auto mt-2 max-w-[1600px] px-4 sm:px-8 lg:px-14">
        <div className="desi-frame relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${WINE}, #3A1206)` }} />
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.4px)', backgroundSize: '20px 20px' }}
          />
          <Mandala className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 text-white/20" />
          <Mandala className="pointer-events-none absolute -bottom-12 -right-10 h-52 w-52 text-white/15" />
          <motion.div
            className="relative flex flex-col items-center gap-5 px-6 py-20 text-center sm:py-24"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em]" style={{ ...SANS, color: '#F4A300' }}>
              ◆ Daily Mattr ◆
            </span>
            <h1
              className="text-[clamp(2.5rem,9vw,110px)] font-extrabold uppercase leading-none tracking-tight text-white"
              style={{ ...SERIF, textShadow: '0 2px 24px rgba(0,0,0,0.35)' }}
            >
              Corporate Cases
            </h1>
            <div className="h-[3px] w-28 rounded-full" style={{ background: '#F4A300' }} />
            <p className="max-w-2xl text-[15px] leading-relaxed text-white/90" style={SANS}>
              One company, one lesson. Deep, structured breakdowns of the moves shaping Indian business — the
              strategy, the stakes, and what it means next.
            </p>
            {count > 0 && (
              <span className="rounded-full bg-white/10 px-4 py-1.5 text-[12px] font-semibold text-white/90" style={SANS}>
                {count} {count === 1 ? 'case' : 'cases'} in this edition
              </span>
            )}
          </motion.div>
          <div className="desi-jhalar absolute inset-x-0 bottom-0" style={{ '--jhalar': '#F4A300' }} />
        </div>
      </div>
    </section>
  )
}

function CaseCard({ item, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      className="h-full"
    >
      <Link
        to={`/case-studies/${item.id}`}
        className="desi-card flex h-full flex-col rounded-2xl p-6 transition-transform hover:-translate-y-0.5"
        style={{ '--band': WINE }}
      >
        <span
          className="inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
          style={{ ...SANS, background: WINE }}
        >
          ◆ Case Study
        </span>
        <h3 className="mt-4 text-[20px] font-bold leading-snug text-gray-900" style={SERIF}>
          {item.headline}
        </h3>
        <p className="mt-2 line-clamp-4 flex-1 text-[14px] leading-relaxed text-gray-700" style={SANS}>
          {item.summary}
        </p>
        <div className="mt-5 flex items-center justify-between text-[12px] text-gray-500" style={SANS}>
          <span>{item.source || 'Daily Mattr'}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-[#7b1e3b]">
            Read case
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

function CaseList({ items }) {
  return (
    <div className="mx-auto max-w-[1600px] px-4 pb-12 pt-12 sm:px-8 lg:px-14">
      {items.length === 0 ? (
        <p className="mt-12 text-center text-gray-500" style={SANS}>
          No case studies published yet — check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <CaseCard key={item.id} item={item} delay={Math.min(i * 0.06, 0.3)} />
          ))}
        </div>
      )}
    </div>
  )
}

function CaseReading({ items, id }) {
  const item = items.find((c) => c.id === id) || items[0]
  if (!item) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-24 text-center sm:px-8 lg:px-14" style={SANS}>
        <p className="text-gray-600">This case study isn’t available right now.</p>
        <Link to="/case-studies" className="mt-4 inline-block font-semibold text-[#d81b60] hover:underline">
          ← Back to all case studies
        </Link>
      </div>
    )
  }
  const paras = (item.body || item.summary || '')
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div className="mx-auto mt-10 max-w-[1600px] px-4 pb-8 sm:px-8 lg:px-14">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        {/* left: other cases */}
        <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-auto lg:pr-2">
          <div className="desi-divider mb-5">
            <span className="desi-divider__motif" style={SANS}>◆ More cases ◆</span>
          </div>
          <div className="flex flex-col gap-3">
            {items.map((c) => (
              <Link
                key={c.id}
                to={`/case-studies/${c.id}`}
                className={`rounded-xl border p-4 transition-colors ${
                  c.id === item.id ? 'border-[#7b1e3b] bg-[#fff0d6]' : 'border-[#c9a227]/25 bg-[#fffdf5] hover:border-[#c9a227]/50'
                }`}
              >
                <h4 className="text-[15px] font-bold leading-snug text-gray-900" style={SERIF}>{c.headline}</h4>
                <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-gray-500" style={SANS}>{c.summary}</p>
              </Link>
            ))}
          </div>
        </aside>

        {/* right: open case */}
        <motion.article
          key={item.id}
          className="min-w-0"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 flex items-center gap-2 text-[12px]" style={SANS}>
            <Link to="/case-studies" className="font-medium text-[#d81b60] hover:underline">← All case studies</Link>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white" style={{ ...SANS, background: WINE }}>
            ◆ Case Study
          </span>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl" style={SERIF}>{item.headline}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-[13px] text-gray-500" style={SANS}>
            {item.source && <span>{item.source}</span>}
            {item.source && item.publishedAt && <span>·</span>}
            {item.publishedAt && <span>{dateLabel(item.publishedAt)}</span>}
          </div>

          <div className="desi-divider my-7"><span className="desi-divider__motif" style={SANS}>❖</span></div>

          <div className="space-y-5 text-[16px] leading-[1.8] text-gray-700" style={SANS}>
            {paras.map((p, i) => (
              <p key={i} className={i === 0 ? 'text-[18px] leading-[1.7] text-gray-800' : ''}>{p}</p>
            ))}
          </div>

          {item.sourceUrl && (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-bold text-white shadow-[0_8px_24px_rgba(123,30,59,0.35)]"
              style={{ ...SANS, background: `linear-gradient(135deg, #F4A300, ${WINE})` }}
            >
              Read the source at {item.source || 'origin'}
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </motion.article>
      </div>
    </div>
  )
}

export default function CaseStudiesPage() {
  const { id } = useParams()
  // Live: polls + refetches on tab focus so new/edited approved cases show up.
  const { data: items, error, loading, reload } = useLiveData(fetchCaseStudies, [])
  const list = useMemo(() => items || [], [items])

  return (
    <div className="desi-paper min-h-screen text-gray-900" style={{ '--jhalar': GOLD }}>
      <NewsletterNav />
      <div className="pt-24 sm:pt-28">
        <CaseHero count={list.length} />
        {error && !items ? (
          <div className="mx-auto max-w-[1600px] px-4 py-20 text-center sm:px-8 lg:px-14" style={SANS}>
            <p className="text-[15px] text-[#7b1e3b]">Couldn’t load case studies.</p>
            <p className="mt-1 text-[13px] text-gray-500 break-words">{error}</p>
            <button onClick={reload} className="mt-4 rounded-full px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-white" style={{ background: 'linear-gradient(135deg, #F4A300, #7B1E3B)' }}>Retry</button>
          </div>
        ) : loading ? (
          <div className="mx-auto max-w-[1600px] px-4 pb-8 pt-12 sm:px-8 lg:px-14">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-56 animate-pulse rounded-2xl bg-black/[0.05]" style={{ animationDelay: `${i * 80}ms` }} />
              ))}
            </div>
          </div>
        ) : id ? (
          <CaseReading items={list} id={id} />
        ) : (
          <CaseList items={list} />
        )}
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  )
}
