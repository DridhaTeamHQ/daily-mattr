import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, useNavigate, useParams } from 'react-router-dom'
import NewsletterNav from '../components/NewsletterNav'
import Footer from '../components/Footer'
import { fetchNewsletter } from '../lib/newsApi'
import { useLiveData } from '../lib/useLiveData'
import { NEWSLETTER_THEMES } from '../lib/newsletterThemes'
import '../styles/desi.css'

// Per-category stories page (Figma frame 1:36) + article reading view (1:529).
// Feed state:    dark category hero -> search + tabs -> date-grouped story cards
// Reading state: condensed list on the left, the open article on the right
const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }
const SANS = { fontFamily: "'Roboto', system-ui, sans-serif" }

const themeFor = (slug) => NEWSLETTER_THEMES.find((t) => t.slug === slug) || NEWSLETTER_THEMES[0]

// Scroll-reveal: fade + rise as the element enters the viewport (compositor
// transform/opacity only, so it stays smooth). Fires once. Honours reduced motion.
function Reveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: reduce ? 0.3 : 0.5, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : delay }}
    >
      {children}
    </motion.div>
  )
}

// ---- date helpers -----------------------------------------------------------
const ordinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}
const dateLabel = (iso) => {
  const d = new Date(iso)
  const now = new Date()
  const sameDay = d.toDateString() === now.toDateString()
  if (sameDay) return 'Today'
  const yest = new Date(now)
  yest.setDate(now.getDate() - 1)
  if (d.toDateString() === yest.toDateString()) return 'Yesterday'
  const wd = d.toLocaleDateString('en-IN', { weekday: 'long' })
  const mo = d.toLocaleDateString('en-IN', { month: 'long' })
  return `${wd}, ${ordinal(d.getDate())} ${mo}, ${d.getFullYear()}`
}
const groupByDate = (articles) => {
  const order = []
  const map = new Map()
  for (const a of articles) {
    const k = dateLabel(a.publishedAt)
    if (!map.has(k)) {
      map.set(k, [])
      order.push(k)
    }
    map.get(k).push(a)
  }
  return order.map((k) => [k, map.get(k)])
}

// ---- small bits -------------------------------------------------------------
const DOTS = ['#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#8b5cf6', '#d81b60']
// Coloured stacked dots + a count; click to reveal every outlet that covered it.
function Sources({ count = 5, sources = [] }) {
  const list = Array.isArray(sources) && sources.length ? sources : null
  const total = list ? list.length : count
  const n = Math.max(1, Math.min(total, DOTS.length))
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false))
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const toggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (list) setOpen((o) => !o)
  }

  return (
    <div className="relative inline-block" ref={ref} style={SANS}>
      <button
        type="button"
        onClick={toggle}
        className={`flex items-center gap-2 ${list ? 'cursor-pointer' : 'cursor-default'}`}
        aria-haspopup={list ? 'true' : undefined}
        aria-expanded={open}
      >
        <div className="flex -space-x-1.5">
          {DOTS.slice(0, n).map((c, i) => (
            <span key={i} className="h-4 w-4 rounded-full ring-2 ring-white" style={{ background: c }} />
          ))}
        </div>
        <span className="text-xs text-gray-500 transition-colors hover:text-gray-800">
          {total} sources{list ? ' ▾' : ''}
        </span>
      </button>

      <AnimatePresence>
        {open && list && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute left-0 z-40 mt-2 w-60 rounded-xl border border-[#c9a227]/40 bg-white p-2 shadow-[0_12px_32px_rgba(106,27,90,0.18)]"
          >
            <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Reported by {total} {total === 1 ? 'outlet' : 'outlets'}
            </p>
            {list.map((s, i) =>
              s.url ? (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-[13px] text-gray-700 hover:bg-[#fff7e0]"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: DOTS[i % DOTS.length] }} />
                    {s.name}
                  </span>
                  <svg className="h-3.5 w-3.5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ) : (
                <div key={i} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] text-gray-700">
                  <span className="h-2 w-2 rounded-full" style={{ background: DOTS[i % DOTS.length] }} />
                  {s.name}
                </div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Fallback accent so a theme without a `desi` field never crashes the hero.
const DESI_FALLBACK = { from: '#7B1E3B', to: '#3A1206', accent: '#F4A300' }

// Editorial-minimal category header: a big serif title on the cream page, a
// small accent overline, a one-line description, and a quiet subscribe link.
// No gradients, mandalas, or fringe — colour lives in the story images below.
function CategoryHero({ theme }) {
  const d = theme.desi || DESI_FALLBACK
  return (
    <section className="mx-auto max-w-[1600px] px-4 pt-4 sm:px-8 lg:px-14">
      <motion.div
        className="border-b border-gray-200 pb-8 sm:pb-10"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ ...SANS, color: d.accent }}>
          Daily Mattr Edition
        </span>
        <h1 className="mt-3 text-[clamp(2.5rem,8vw,84px)] font-bold leading-[0.95] tracking-tight text-gray-900" style={SERIF}>
          {theme.label}
        </h1>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-gray-600" style={SANS}>
          {theme.desc}
        </p>
        <Link
          to="/subscribe"
          className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#7b1e3b] transition-colors hover:text-[#d81b60]"
          style={SANS}
        >
          Subscribe to this edition
          <svg className="h-[17px] w-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      </motion.div>
    </section>
  )
}

function SearchTabs({ tab, setTab, query, setQuery, tabs }) {
  return (
    <div className="mx-auto mt-10 flex max-w-[1600px] flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-14">
      <div className="relative w-full sm:max-w-sm">
        <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4-4" strokeLinecap="round" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stories…"
          className="w-full rounded-full border border-[#c9a227]/45 bg-[#fffdf5] py-3 pl-11 pr-4 text-sm text-gray-800 outline-none focus:border-[#c9a227]"
          style={SANS}
        />
      </div>
      {tabs && (
        <div className="flex items-center gap-2 rounded-full border border-[#c9a227]/40 bg-[#fffdf5] p-1" style={SANS}>
          {tabs.map((t) => {
            const on = tab === t.key
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                  on ? 'text-white' : 'text-[#7b1e3b] hover:text-[#d81b60]'
                }`}
                style={on ? { background: '#7b1e3b' } : undefined}
              >
                {t.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// Rotating jewel bands so the grid reads "more is more" without losing order.
const DESI_BANDS = ['#F4A300', '#D81B60', '#0E7C7B', '#C2410C', '#5B2A86', '#1B5E3F']

// Stable band per article id, so colours don't reshuffle when the live feed
// updates and a new story is prepended.
const bandFor = (id) => {
  let h = 0
  for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return DESI_BANDS[h % DESI_BANDS.length]
}

// Case studies get their own wine band + "Case Study" badge so they never read
// as just another news brief; topic short articles carry their topic as a chip.
const CASE_BAND = '#7B1E3B'
const isCase = (a) => a.kind === 'case_study'

// Short brief: a compact card explicitly tagged "Brief".
function CardTags({ article, band }) {
  return (
    <div className="flex flex-wrap items-center gap-2" style={SANS}>
      {isCase(article) ? (
        <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white" style={{ background: CASE_BAND }}>
          ◆ Case Study
        </span>
      ) : (
        <span className="rounded-full bg-[#fff0d6] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#7b1e3b]">
          Brief
        </span>
      )}
      {article.bucket && !isCase(article) && (
        <span className="rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ borderColor: band, color: band }}>
          {article.bucket}
        </span>
      )}
    </div>
  )
}

// Long-form feature: a wide, framed card explicitly tagged "In-depth · Long read".
function FeatureCard({ category, article }) {
  return (
    <Link
      to={`/${category}/${article.id}`}
      className="desi-card desi-frame block rounded-2xl p-6 transition-transform hover:-translate-y-0.5 sm:p-8"
      style={{ '--band': '#7B1E3B' }}
    >
      <div className="flex flex-wrap items-center gap-2" style={SANS}>
        <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white" style={{ background: 'linear-gradient(135deg, #F4A300, #7B1E3B)' }}>
          ✦ In-depth
        </span>
        {article.bucket && (
          <span className="rounded-full border border-[#7b1e3b]/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#7b1e3b]">
            {article.bucket}
          </span>
        )}
        <span className="text-[11px] text-gray-400">Long read</span>
      </div>
      <h3 className="mt-4 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl" style={SERIF}>
        {article.headline}
      </h3>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-gray-700" style={SANS}>
        {article.summary}
      </p>
      <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold text-[#7b1e3b]" style={SANS}>
        Read the full feature
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </Link>
  )
}

function StoryCard({ category, article, band }) {
  const b = isCase(article) ? CASE_BAND : band
  return (
    <Link
      to={`/${category}/${article.id}`}
      className="desi-card flex h-full flex-col rounded-2xl p-5 shadow-sm transition-transform hover:-translate-y-0.5"
      style={{ '--band': b }}
    >
      <CardTags article={article} band={b} />
      <h4 className="mt-3 text-[17px] font-bold leading-snug text-gray-900" style={SERIF}>
        {article.headline}
      </h4>
      <p className="mt-2 line-clamp-4 flex-1 text-[13px] leading-relaxed text-gray-700" style={SANS}>
        {article.summary}
      </p>
      <div className="mt-4">
        <Sources count={article.sourceCount || (article.tags?.length || 2) + 1} sources={article.sources} />
      </div>
    </Link>
  )
}

function LoadError({ message, onRetry }) {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-20 text-center sm:px-8 lg:px-14" style={SANS}>
      <p className="text-[15px] text-[#7b1e3b]">Couldn’t load stories.</p>
      <p className="mt-1 text-[13px] text-gray-500 break-words">{message}</p>
      <button onClick={onRetry} className="mt-4 rounded-full border border-[#c9a227] bg-[#7b1e3b] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#5e1730]">
        Retry
      </button>
    </div>
  )
}

function SkeletonFeed() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 pb-8 pt-10 sm:px-8 lg:px-14">
      <div className="mb-6 h-44 animate-pulse rounded-2xl bg-black/[0.05]" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 animate-pulse rounded-2xl bg-black/[0.05]" style={{ animationDelay: `${i * 80}ms` }} />
        ))}
      </div>
    </div>
  )
}

function DateHeading({ children }) {
  return (
    <div className="desi-divider mb-6 mt-12">
      <span className="desi-divider__motif" style={SANS}>
        ❖ {children} ❖
      </span>
    </div>
  )
}

// ---- feed state -------------------------------------------------------------
// Differentiates LONG features ("In-depth") from SHORT briefs, in every category.
function Feed({ category, articles, features }) {
  const [tab, setTab] = useState('all')
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()
  const match = (a) => !q || `${a.headline} ${a.summary}`.toLowerCase().includes(q)
  const feats = useMemo(() => features.filter(match), [features, q])
  const briefs = useMemo(() => articles.filter(match), [articles, q])

  const hasFeatures = features.length > 0
  const tabs = hasFeatures
    ? [{ key: 'all', label: 'All' }, { key: 'long', label: 'In-depth' }, { key: 'short', label: 'Briefs' }]
    : null

  const showLong = (tab === 'all' || tab === 'long') && feats.length > 0
  const showShort = (tab === 'all' || tab === 'short') && briefs.length > 0
  const empty = feats.length === 0 && briefs.length === 0

  return (
    <>
      <SearchTabs tab={tab} setTab={setTab} query={query} setQuery={setQuery} tabs={tabs} />
      <div className="mx-auto max-w-[1600px] px-4 pb-8 sm:px-8 lg:px-14">
        {empty && (
          <p className="mt-16 text-center text-gray-500" style={SANS}>
            {articles.length === 0 && features.length === 0
              ? 'No stories published in this edition yet — check back soon.'
              : 'No stories match your search.'}
          </p>
        )}

        {showLong && (
          <section>
            <Reveal><DateHeading>In-depth</DateHeading></Reveal>
            <div className="flex flex-col gap-6">
              {feats.map((f, i) => (
                <Reveal key={f.id} delay={Math.min(i * 0.07, 0.28)}>
                  <FeatureCard category={category} article={f} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {showShort && (
          <section>
            <Reveal><DateHeading>{hasFeatures ? 'Short briefs' : 'Latest'}</DateHeading></Reveal>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {briefs.map((a, ri) => (
                <Reveal key={a.id} className="h-full" delay={Math.min(ri * 0.07, 0.28)}>
                  <StoryCard category={category} article={a} band={bandFor(a.id)} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}

// ---- reading state ----------------------------------------------------------
function Reading({ category, items, articleId }) {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const idx = Math.max(0, items.findIndex((a) => a.id === articleId))
  const article = items[idx] || items[0]
  const prev = items[idx - 1]
  const next = items[idx + 1]
  const groups = groupByDate(items)
  const isLong = isCase(article) || article?.kind === 'feature'
  const [sheetOpen, setSheetOpen] = useState(false)
  const dirRef = useRef(1)

  const goTo = (target, dir) => {
    if (!target) return
    dirRef.current = dir
    setSheetOpen(false)
    navigate(`/${category}/${target.id}`)
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }
  const goNext = () => goTo(next, 1)
  const goPrev = () => goTo(prev, -1)

  if (!article) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-24 text-center sm:px-8 lg:px-14" style={SANS}>
        <p className="text-gray-600">This story isn’t available right now.</p>
        <Link to={`/${category}`} className="mt-4 inline-block font-semibold text-[#d81b60] hover:underline">
          ← Back to {themeFor(category).label} stories
        </Link>
      </div>
    )
  }

  const enterX = reduce ? 0 : dirRef.current >= 0 ? 44 : -44

  return (
    <div className="mx-auto mt-6 max-w-[1600px] px-4 pb-28 sm:mt-10 sm:px-8 sm:pb-8 lg:px-14">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        {/* The article — FIRST in the DOM (content-first); pulled into the right
            column on desktop via grid placement, never CSS order, so the
            screen-reader/tab order stays correct. Swipe left/right to change. */}
        <div className="min-w-0 lg:col-start-2 lg:row-start-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={article.id}
              className="min-w-0 touch-pan-y select-none lg:select-text"
              drag={reduce ? false : 'x'}
              dragDirectionLock
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(e, info) => {
                if (info.offset.x <= -70 || info.velocity.x < -480) goNext()
                else if (info.offset.x >= 70 || info.velocity.x > 480) goPrev()
              }}
              whileDrag={{ cursor: 'grabbing' }}
              initial={{ opacity: 0, x: enterX }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduce ? 0 : -enterX }}
              transition={{ duration: reduce ? 0.2 : 0.4, ease: [0.33, 1, 0.68, 1] }}
            >
          <div className="mb-4 flex items-center gap-2 text-[12px] text-gray-500" style={SANS}>
            <Link to={`/${category}`} className="font-medium text-[#d81b60] hover:underline">
              ← All {themeFor(category).label} stories
            </Link>
          </div>
          {/* Swipe affordance + position (phones) */}
          <div className="mb-5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-gray-400 lg:hidden" style={SANS}>
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Swipe
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="ml-1 text-gray-300">·</span>
            <span className="text-[#b8860b]">{idx + 1} / {items.length}</span>
          </div>
          <div className="mb-3 flex flex-wrap items-center gap-2" style={SANS}>
            {isCase(article) ? (
              <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white" style={{ background: CASE_BAND }}>
                ◆ Case Study
              </span>
            ) : article.kind === 'feature' ? (
              <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white" style={{ background: 'linear-gradient(135deg, #F4A300, #7B1E3B)' }}>
                ✦ In-depth
              </span>
            ) : (
              <span className="rounded-full bg-[#fff0d6] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#7b1e3b]">
                Brief
              </span>
            )}
            {article.bucket && (
              <span className="rounded-full border border-[#c9a227] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#b8860b]">
                {article.bucket}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl" style={SERIF}>
            {article.headline}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-[13px] text-gray-500" style={SANS}>
            <span>
              {article.source || `Synthesised from ${article.sourceCount || 'multiple'} sources`}
            </span>
            <span>·</span>
            <span>{dateLabel(article.publishedAt)}</span>
          </div>
          <div className="mt-5">
            <Sources count={article.sourceCount || (article.tags?.length || 2) + 1} sources={article.sources} />
          </div>

          <div className="mt-8 space-y-5 text-[16px] leading-[1.8] text-gray-700" style={SANS}>
            {isLong && article.body ? (
              // Case study / long feature: the agent's full curated write-up.
              article.body
                .split(/\n\n+/)
                .map((p) => p.trim())
                .filter(Boolean)
                .map((p, i) => (
                  <p key={i} className={i === 0 ? 'text-[18px] leading-[1.7] text-gray-800' : ''}>
                    {p}
                  </p>
                ))
            ) : (
              <>
                <p className="text-[18px] leading-[1.7] text-gray-800">{article.summary}</p>
                <p>
                  This is a curated brief from Daily Mattr. We synthesised the key developments above from
                  multiple newsrooms so you get the full picture in seconds. For the complete reporting,
                  continue to the original source below.
                </p>
              </>
            )}
          </div>

          {article.tags?.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2" style={SANS}>
              {article.tags.map((t) => (
                <span key={t} className="rounded-full bg-gray-100 px-3 py-1 text-[12px] text-gray-600">
                  {t}
                </span>
              ))}
            </div>
          )}

          {article.sourceUrl ? (
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#c9a227] bg-[#7b1e3b] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#5e1730]"
              style={SANS}
            >
              Read the full story at {article.source}
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : (
            <p className="mt-8 text-[13px] text-gray-500" style={SANS}>
              ✦ Curated and written by Daily Mattr from {article.sourceCount || 'multiple'} Indian newsrooms.
            </p>
          )}
              <ReadNav prev={prev} next={next} onPrev={goPrev} onNext={goNext} />
            </motion.article>
          </AnimatePresence>
        </div>

        {/* "More stories" — AFTER the article in the DOM; pulled into the left
            column on desktop. Hidden on phones, where the bottom bar + sheet and
            swipe handle story navigation. */}
        <aside className="hidden lg:col-start-1 lg:row-start-1 lg:block lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-auto lg:pr-2">
          {groups.map(([label, items]) => (
            <div key={label}>
              <DateHeading>{label}</DateHeading>
              <div className="flex flex-col gap-3">
                {items.map((a) => (
                  <Link
                    key={a.id}
                    to={`/${category}/${a.id}`}
                    className={`rounded-xl border p-4 transition-colors ${
                      a.id === article.id
                        ? 'border-[#c9a227] bg-[#fff7e0]'
                        : 'border-[#c9a227]/25 bg-[#fffdf5] hover:border-[#c9a227]/50'
                    }`}
                  >
                    <h4 className="text-[15px] font-bold leading-snug text-gray-900" style={SERIF}>
                      {a.headline}
                    </h4>
                    <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-gray-500" style={SANS}>
                      {a.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </aside>
      </div>

      {/* Thumb-zone toolbar + browse sheet (phones only) */}
      <MobileReadBar prev={prev} next={next} onPrev={goPrev} onNext={goNext} onBrowse={() => setSheetOpen(true)} />
      <BrowseSheet open={sheetOpen} onClose={() => setSheetOpen(false)} groups={groups} currentId={article.id} onPick={(a) => goTo(a, 0)} />
    </div>
  )
}

// Inline previous/next pager shown at the end of an article.
function ReadNav({ prev, next, onPrev, onNext }) {
  if (!prev && !next) return null
  return (
    <div className="mt-12 grid gap-3 border-t border-[#c9a227]/25 pt-6 sm:grid-cols-2" style={SANS}>
      {prev ? (
        <button onClick={onPrev} className="flex flex-col items-start rounded-2xl border border-[#c9a227]/30 bg-[#fffdf5] p-4 text-left transition-colors hover:border-[#c9a227]/70">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#b8860b]">&larr; Previous</span>
          <span className="mt-1 line-clamp-2 text-[14px] font-semibold text-gray-800" style={SERIF}>{prev.headline}</span>
        </button>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <button onClick={onNext} className="flex flex-col items-end rounded-2xl border border-[#c9a227]/30 bg-[#fffdf5] p-4 text-right transition-colors hover:border-[#c9a227]/70">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#b8860b]">Next &rarr;</span>
          <span className="mt-1 line-clamp-2 text-[14px] font-semibold text-gray-800" style={SERIF}>{next.headline}</span>
        </button>
      ) : (
        <span className="hidden sm:block" />
      )}
    </div>
  )
}

// Fixed bottom toolbar on phones: previous · browse · next (thumb-reach zone).
function MobileReadBar({ prev, next, onPrev, onNext, onBrowse }) {
  const arrow = 'flex h-11 w-11 items-center justify-center rounded-full text-[#7b1e3b] transition-colors hover:bg-[#fff0d6] disabled:opacity-30'
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden" style={SANS}>
      <div className="mx-auto flex max-w-sm items-center justify-between gap-2 rounded-full border border-[#c9a227]/40 bg-[#fffdf5]/95 p-1.5 shadow-[0_10px_30px_rgba(106,27,90,0.18)] backdrop-blur-md">
        <button onClick={onPrev} disabled={!prev} aria-label="Previous story" className={arrow}>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button onClick={onBrowse} className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#7b1e3b] px-4 text-[13px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#5e1730]">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          Browse
        </button>
        <button onClick={onNext} disabled={!next} aria-label="Next story" className={arrow}>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  )
}

// Bottom sheet listing every story for quick jumping (phones).
function BrowseSheet({ open, onClose, groups, currentId, onPick }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="absolute inset-x-0 bottom-0 max-h-[82dvh] overflow-auto rounded-t-3xl border-t border-[#c9a227]/40 bg-[#fffdf5] p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            style={SANS}
          >
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[#c9a227]/40" />
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[18px] font-bold text-[#7b1e3b]" style={SERIF}>All stories</h3>
              <button onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full text-[#7b1e3b] hover:bg-[#fff0d6]">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>
            {groups.map(([label, items]) => (
              <div key={label} className="mb-3">
                <p className="px-1 pb-2 pt-2 text-[11px] font-bold uppercase tracking-wider text-[#b8860b]">{label}</p>
                <div className="flex flex-col gap-2">
                  {items.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => onPick(a)}
                      className={`rounded-xl border p-3 text-left transition-colors ${a.id === currentId ? 'border-[#7b1e3b] bg-[#fff0d6]' : 'border-[#c9a227]/25 bg-white hover:border-[#c9a227]/50'}`}
                    >
                      <h4 className="line-clamp-2 text-[14px] font-bold leading-snug text-gray-900" style={SERIF}>{a.headline}</h4>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function CategoryNewsPage() {
  const { category, articleId } = useParams()
  const navigate = useNavigate()

  const theme = themeFor(category)
  const valid = NEWSLETTER_THEMES.some((t) => t.slug === category)

  useEffect(() => {
    if (!valid) navigate('/', { replace: true })
  }, [valid, navigate])

  // Live: polls + refetches on tab focus so approvals/edits show without reload.
  const { data, error, loading, reload } = useLiveData(() => fetchNewsletter(category), [category])
  const articles = data?.articles || []
  const features = data?.features || []
  // Long features first so they head the reading list.
  const readingItems = [...features, ...articles]

  return (
    <div className="desi-paper min-h-screen text-gray-900">
      <NewsletterNav />
      <div className="pt-24 sm:pt-28">
        {/* Reading an article lands you on the article — no full hero to scroll past. */}
        {!articleId && <CategoryHero theme={theme} />}

        {error && !data ? (
          <LoadError message={error} onRetry={reload} />
        ) : loading ? (
          <SkeletonFeed />
        ) : articleId ? (
          <Reading category={category} items={readingItems} articleId={articleId} />
        ) : (
          <Feed category={category} articles={articles} features={features} />
        )}
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  )
}
