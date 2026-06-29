import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  getCategories,
  getMyPreferences,
  ensureProfile,
  subscribe,
  unsubscribe,
  WEEKDAYS,
} from '../lib/newsletterPrefs'
import '../styles/desi.css'

const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }

// Three independent newsletters (see the subscription model):
//   1. Daily Headlines      — 10 general headlines, daily        -> news_rhythm @ daily (national = broadest general feed)
//   2. Daily Case Study     — one business case study, daily     -> case_study_daily (corporate-case)
//   3. Weekly Category Brief — 5 category headlines, one weekday  -> category_small_articles (pick category + day)
const DAILY_HEADLINES_SLUG = 'national'
const CASE_SLUG = 'corporate-case'

const DESC = {
  'real-estate': 'Launches, handovers, builder moves, infrastructure and regulation.',
  'policy-partner': 'Indian policy in plain English — what changed and who it touches.',
  'money-matters': 'The money developments that actually change your week.',
  'wellness-daily': 'Evidence-led wellness for desk-bound professionals.',
}
const BAND = {
  'real-estate': '#1C7A6D',
  'policy-partner': '#B8860B',
  'money-matters': '#0E7A4F',
  'wellness-daily': '#C2185B',
}
const band = (slug) => BAND[slug] || '#F4A300'
const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s)

export default function SubscribePage() {
  const { isAuthed, loading: authLoading, signOut } = useAuth()
  const navigate = useNavigate()
  const [cats, setCats] = useState([])
  const [prefs, setPrefs] = useState({ subscriptions: [], blocked: {} })
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState('')
  const [msg, setMsg] = useState(null) // { type, text }
  const [days, setDays] = useState({}) // weekday choice per topic slug
  const [csCats, setCsCats] = useState([]) // case-study topic preferences

  const catBySlug = useMemo(() => Object.fromEntries(cats.map((c) => [c.slug, c])), [cats])
  const subBySlug = useMemo(
    () => Object.fromEntries(prefs.subscriptions.map((s) => [s.category_slug, s])),
    [prefs]
  )

  const load = async () => {
    setLoading(true)
    const tasks = [getCategories()]
    if (isAuthed) { await ensureProfile(); tasks.push(getMyPreferences()) }
    const [c, p] = await Promise.all(tasks)
    setCats(c)
    if (p) {
      setPrefs(p)
      const cs = p.subscriptions.find((s) => s.newsletter_type === 'case_study_daily')
      if (cs?.case_study_categories?.length) setCsCats(cs.case_study_categories)
    }
    setLoading(false)
  }
  useEffect(() => { if (!authLoading) load() }, [authLoading, isAuthed])

  const flash = (type, text) => { setMsg({ type, text }); setTimeout(() => setMsg(null), 3500) }
  const requireLogin = () =>
    navigate(`/login?redirect=${encodeURIComponent('/subscribe')}`)

  const act = async (key, fn, okText) => {
    if (!isAuthed) return requireLogin()
    setBusy(key)
    try { await fn(); await load(); flash('ok', okText) }
    catch (e) { flash('err', e.message) }
    finally { setBusy('') }
  }

  // ---- product state ----
  const smallArticles = cats.filter((c) => c.newsletter_type === 'category_small_articles')
  const csChoices = cats.filter((c) => c.slug !== CASE_SLUG) // topic + news combined

  const dailyHeadlinesSub = prefs.subscriptions.find(
    (s) => s.category_slug === DAILY_HEADLINES_SLUG && s.rhythm === 'daily'
  )
  const caseSub = prefs.subscriptions.find((s) => s.newsletter_type === 'case_study_daily')

  const toggleCs = (slug) =>
    setCsCats((c) => (c.includes(slug) ? c.filter((x) => x !== slug) : [...c, slug]))

  const subDailyHeadlines = () =>
    act('daily', () => subscribe(catBySlug[DAILY_HEADLINES_SLUG], { rhythm: 'daily' }), 'Subscribed to Daily Headlines.')
  const subCase = () =>
    act('case', () => subscribe(catBySlug[CASE_SLUG], { case_study_categories: csCats }),
      caseSub ? 'Case study preferences updated.' : 'Subscribed to the Daily Case Study.')
  const subTopic = (slug) =>
    act(slug, () => subscribe(catBySlug[slug], { weekday: days[slug] || subBySlug[slug]?.weekday }),
      'Subscribed — ' + cap(days[slug] || subBySlug[slug]?.weekday) + '.')
  const remove = (slug, key) => act(key || slug, () => unsubscribe(slug), 'Removed.')

  const activeCount = prefs.subscriptions.length

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900">
      <header className="border-b border-[#c9a227]/35 bg-[#fffdf5]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-extrabold tracking-[2px] text-[#7b1e3b]" style={SERIF}>DAILY MATTR</Link>
          <div className="flex items-center gap-3 text-sm">
            <Link to="/" className="text-gray-600 hover:text-[#7b1e3b]">Explore</Link>
            {isAuthed ? (
              <>
                <Link to="/profile" className="font-semibold text-[#d81b60]">Profile</Link>
                <button onClick={signOut} className="rounded-full border border-[#c9a227]/40 px-3 py-1.5 hover:bg-[#fff0d6]">Sign out</button>
              </>
            ) : (
              <Link to="/login?redirect=/subscribe" className="rounded-full border border-[#c9a227] bg-[#7b1e3b] px-4 py-1.5 font-semibold text-white transition-colors hover:bg-[#5e1730]">Login</Link>
            )}
          </div>
        </div>
      </header>
      <div className="desi-jhalar" style={{ '--jhalar': '#c9a227' }} />

      <main className="mx-auto max-w-4xl px-4 py-10">
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d81b60]">✦ Make it yours ✦</span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#7b1e3b]" style={SERIF}>Your subscription</h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          Three independent newsletters. Subscribe to any or all — <strong className="text-[#7b1e3b]">each lands as its own separate email.</strong>
          {isAuthed ? '' : ' Log in to subscribe and manage them.'}
        </p>

        {!isAuthed && !authLoading && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#c9a227]/40 bg-[#fff7e6] px-5 py-4">
            <p className="text-sm text-[#7b1e3b]">Sign in to save your choices and manage them anytime.</p>
            <Link to="/login?redirect=/subscribe" className="rounded-full border border-[#c9a227] bg-[#7b1e3b] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#5e1730]">Log in with Google</Link>
          </div>
        )}

        {msg && (
          <div className={`mt-5 rounded-xl px-4 py-2.5 text-sm ${msg.type === 'ok' ? 'bg-[#eef6ec] text-[#2e6b3c] border border-[#bcd9c1]' : 'bg-red-50 text-red-600 border border-red-200'}`}>{msg.text}</div>
        )}

        <div className="mt-8 space-y-6">
          {/* 1 — DAILY HEADLINES */}
          <ProductCard
            n="1"
            band="#F4A300"
            title="Daily Headlines"
            cadence="Daily"
            blurb="The day's 10 most important general headlines — a fast, complete read every morning."
            active={!!dailyHeadlinesSub}
            activeLabel="Active · daily"
          >
            {dailyHeadlinesSub ? (
              <RemoveBtn busy={busy === 'daily'} onClick={() => remove(DAILY_HEADLINES_SLUG, 'daily')} />
            ) : (
              <SubBtn busy={busy === 'daily'} onClick={subDailyHeadlines} label="Subscribe" />
            )}
          </ProductCard>

          {/* 2 — DAILY CASE STUDY */}
          <ProductCard
            n="2"
            band="#7B1E3B"
            title="Daily Case Study"
            cadence="Daily"
            blurb="One sharp business case study — a company, a decision, a lesson — every day."
            active={!!caseSub}
            activeLabel="Active · daily"
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#b8860b]">Tune the topics (optional)</p>
            <p className="mt-1 text-[13px] text-gray-500">Pick the areas you care about — leave empty for all.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {csChoices.map((c) => {
                const on = csCats.includes(c.slug)
                return (
                  <button key={c.slug} type="button" onClick={() => toggleCs(c.slug)}
                    className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${on ? 'bg-[#fff0d6] border-[#d81b60] text-[#7b1e3b]' : 'bg-white border-[#c9a227]/40 text-gray-700 hover:border-[#c9a227]'}`}>
                    {c.name}
                  </button>
                )
              })}
            </div>
            <div className="mt-5 flex items-center gap-3">
              <SubBtn busy={busy === 'case'} onClick={subCase} label={caseSub ? 'Update' : 'Subscribe'} />
              {caseSub && <RemoveBtn busy={busy === 'case'} onClick={() => remove(CASE_SLUG, 'case')} subtle />}
            </div>
          </ProductCard>

          {/* 3 — WEEKLY CATEGORY BRIEFING */}
          <ProductCard
            n="3"
            band="#0E7C7B"
            title="Weekly Category Briefing"
            cadence="Weekly"
            blurb="Pick a category and the one day each week it lands — 5 category-specific headlines that morning. Add as many categories as you like (one per day)."
          >
            <div className="mt-1 grid gap-4 sm:grid-cols-2">
              {smallArticles.map((cat) => {
                const sub = subBySlug[cat.slug]
                const active = !!sub
                const chosen = days[cat.slug] || sub?.weekday || ''
                return (
                  <div key={cat.slug} className="rounded-2xl border border-[#c9a227]/35 bg-white p-4" style={{ borderTop: `3px solid ${band(cat.slug)}` }}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-[#1c1c1e]" style={SERIF}>{cat.name}</div>
                      {active && <ActivePill label={cap(sub.weekday)} small />}
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed text-gray-600">{DESC[cat.slug]}</p>
                    <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-[#b8860b]">Day it lands</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {WEEKDAYS.map((w) => {
                        const usedBy = prefs.blocked[w.value]
                        const disabled = usedBy && usedBy !== cat.slug
                        const selected = chosen === w.value
                        return (
                          <button key={w.value} disabled={disabled}
                            onClick={() => setDays((d) => ({ ...d, [cat.slug]: w.value }))}
                            title={disabled ? `Taken by ${catBySlug[usedBy]?.name || usedBy}` : ''}
                            className={`rounded-full px-2.5 py-1 text-[12px] border transition-colors ${selected ? 'bg-[#d81b60] border-[#d81b60] text-white' : disabled ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50' : 'border-[#c9a227]/40 text-gray-700 hover:border-[#c9a227]'}`}>
                            {w.label.slice(0, 3)}
                          </button>
                        )
                      })}
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <SubBtn small busy={busy === cat.slug} disabled={!chosen} onClick={() => subTopic(cat.slug)} label={active ? 'Update day' : 'Subscribe'} />
                      {active && <RemoveBtn small subtle busy={busy === cat.slug} onClick={() => remove(cat.slug)} />}
                    </div>
                  </div>
                )
              })}
            </div>
          </ProductCard>
        </div>

        {/* How it works */}
        <div className="mt-10 rounded-2xl border border-[#c9a227]/35 bg-[#fffdf5] p-6">
          <div className="desi-divider mb-4"><span className="desi-divider__motif">❖ How it works ❖</span></div>
          <div className="grid gap-4 text-sm text-gray-600 sm:grid-cols-3">
            <p><strong className="text-[#7b1e3b]">Mix &amp; match.</strong> Subscribe to one, two, or all three — they're independent.</p>
            <p><strong className="text-[#7b1e3b]">Separate emails.</strong> Each newsletter arrives as its own email, not bundled together.</p>
            <p><strong className="text-[#7b1e3b]">Change anytime.</strong> Update the day, retune topics, or remove any of them whenever you like.</p>
          </div>
          {isAuthed && activeCount > 0 && (
            <p className="mt-4 text-sm text-gray-500">You have <strong className="text-[#7b1e3b]">{activeCount}</strong> active {activeCount === 1 ? 'newsletter' : 'newsletters'}. Manage everything on your <Link to="/profile" className="font-semibold text-[#d81b60] hover:underline">profile</Link>.</p>
          )}
        </div>

        {loading && <p className="mt-8 text-gray-500">Loading…</p>}
      </main>
    </div>
  )
}

function ProductCard({ n, band, title, cadence, blurb, active, activeLabel, children }) {
  return (
    <section className="desi-frame overflow-hidden rounded-3xl bg-[#fffdf5]">
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${band}, #F4A300)` }} />
      <div className="p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[15px] font-bold text-white" style={{ background: band }}>{n}</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#1c1c1e]" style={SERIF}>{title}</h2>
                <span className="rounded-full bg-[#fff0d6] px-2 py-0.5 text-[11px] font-bold text-[#7b1e3b]">{cadence}</span>
              </div>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-gray-600">{blurb}</p>
            </div>
          </div>
          {active && <ActivePill label={activeLabel || 'Active'} />}
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </section>
  )
}

function ActivePill({ label, small }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-[#eef6ec] font-semibold text-[#2e6b3c] ${small ? 'px-3 py-1 text-[12px]' : 'px-4 py-1.5 text-sm'}`}>
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      {label}
    </span>
  )
}

function SubBtn({ busy, onClick, label, disabled, small }) {
  return (
    <button onClick={onClick} disabled={busy || disabled}
      className={`rounded-full border border-[#c9a227] bg-[#7b1e3b] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#5e1730] disabled:opacity-50 ${small ? 'px-4 py-2 text-[12px]' : 'px-5 py-2.5 text-sm'}`}>
      {busy ? 'Saving…' : label}
    </button>
  )
}

function RemoveBtn({ busy, onClick, subtle, small }) {
  return (
    <button onClick={onClick} disabled={busy}
      className={`rounded-full border border-red-200 font-semibold text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50 ${small ? 'px-3 py-1.5 text-[12px]' : 'px-4 py-2 text-sm'} ${subtle ? '' : ''}`}>
      {busy ? '…' : 'Remove'}
    </button>
  )
}
