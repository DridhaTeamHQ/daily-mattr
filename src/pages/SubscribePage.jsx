import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  getCategories,
  getMyPreferences,
  ensureProfile,
  subscribe,
  WEEKDAYS,
} from '../lib/newsletterPrefs'
import '../styles/desi.css'

const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }

const DESC = {
  'corporate-case': 'A daily corporate case study — one company, one lesson.',
  'real-estate': 'Launches, handovers, builder moves, infrastructure and regulation.',
  'policy-partner': 'Indian policy in plain English — what changed and who it touches.',
  'money-matters': 'The money developments that actually change your week.',
  'wellness-daily': 'Evidence-led wellness for desk-bound professionals.',
  national: 'The biggest stories shaping India today.',
  international: 'World events and the shifts that ripple across borders.',
  finance: 'Markets, money, and the macro forces moving your wallet.',
  sports: 'Results, rivalries, and the moments that defined the day.',
  entertainment: 'Film, music, streaming, and the culture everyone is talking about.',
  lifestyle: 'Health, work, food, and living well.',
  technology: 'AI, startups, gadgets, and the tech reshaping how we live.',
}

// Jewel band colour per category (desi-maximalism).
const BAND = {
  'corporate-case': '#7B1E3B',
  'real-estate': '#1C7A6D',
  'policy-partner': '#B8860B',
  'money-matters': '#0E7A4F',
  'wellness-daily': '#C2185B',
  national: '#D81B60',
  international: '#7B1E3B',
  finance: '#0E7A4F',
  sports: '#E07A00',
  entertainment: '#8E24AA',
  lifestyle: '#C2185B',
  technology: '#1565C0',
}
const band = (slug) => BAND[slug] || '#F4A300'

export default function SubscribePage() {
  const { isAuthed, loading: authLoading, signOut } = useAuth()
  const navigate = useNavigate()
  const [cats, setCats] = useState([])
  const [prefs, setPrefs] = useState({ subscriptions: [], blocked: {} })
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState('')
  const [msg, setMsg] = useState(null) // { type, text }
  const [days, setDays] = useState({}) // weekday choice keyed by slug
  const [csCats, setCsCats] = useState([]) // chosen case-study categories

  const catBySlug = useMemo(() => Object.fromEntries(cats.map((c) => [c.slug, c])), [cats])
  const activeSlugs = useMemo(
    () => new Set(prefs.subscriptions.map((s) => s.category_slug)),
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

  const requireLogin = (topic) => {
    navigate(`/login?redirect=${encodeURIComponent(`/subscribe?intent=subscribe&topic=${topic}`)}`)
  }

  const doSubscribe = async (cat, opts) => {
    if (!isAuthed) return requireLogin(cat.slug)
    setBusy(cat.slug)
    try {
      await subscribe(cat, opts)
      await load()
      const where = cat.newsletter_type === 'case_study_daily' ? 'daily'
        : `every ${opts.weekday}`
      flash('ok', `Subscribed to ${cat.name} — ${where}.`)
    } catch (e) {
      flash('err', e.message)
    } finally {
      setBusy('')
    }
  }

  const caseStudy = cats.find((c) => c.newsletter_type === 'case_study_daily')
  const smallArticles = cats.filter((c) => c.newsletter_type === 'category_small_articles')
  // Everything except the case study itself can be a case-study topic (topic + news combined).
  const csChoices = cats.filter((c) => c.slug !== caseStudy?.slug)
  const toggleCs = (slug) =>
    setCsCats((c) => (c.includes(slug) ? c.filter((x) => x !== slug) : [...c, slug]))

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900">
      {/* Header */}
      <header className="border-b border-[#c9a227]/35 bg-[#fffdf5]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-extrabold tracking-[2px] text-[#7b1e3b]" style={SERIF}>DAILY MATTR</Link>
          <div className="flex items-center gap-3 text-sm">
            <Link to="/" className="text-gray-600 hover:text-[#7b1e3b]">Explore</Link>
            {isAuthed ? (
              <>
                <Link to="/profile" className="font-semibold text-[#d81b60]">Profile</Link>
                <button onClick={signOut} className="rounded-full border border-[#c9a227]/40 px-3 py-1.5 hover:bg-[#fff0d6]">Sign out</button>
              </>
            ) : (
              <Link to="/login?redirect=/subscribe" className="rounded-full px-4 py-1.5 font-semibold text-white" style={{ background: 'linear-gradient(135deg, #F4A300, #D81B60)' }}>Login</Link>
            )}
          </div>
        </div>
      </header>
      <div className="desi-jhalar" style={{ '--jhalar': '#c9a227' }} />

      <main className="mx-auto max-w-5xl px-4 py-10">
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d81b60]">✦ Make it yours ✦</span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#7b1e3b]" style={SERIF}>Daily Mattr Newsletters</h1>
        <p className="mt-2 text-gray-600">Browse freely. {isAuthed ? 'Pick what lands when.' : 'Log in to subscribe and save your preferences.'}</p>

        {msg && (
          <div className={`mt-5 rounded-xl px-4 py-2.5 text-sm ${msg.type === 'ok' ? 'bg-[#eef6ec] text-[#2e6b3c] border border-[#bcd9c1]' : 'bg-red-50 text-red-600 border border-red-200'}`}>{msg.text}</div>
        )}

        {/* Case Studies — daily, choose categories */}
        {caseStudy && (
          <section className="mt-9">
            <div className="desi-divider mb-4">
              <span className="desi-divider__motif">❖ Case Studies ❖</span>
            </div>
            <div className="desi-frame overflow-hidden rounded-3xl bg-[#fffdf5]">
              <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${band('corporate-case')}, #F4A300)` }} />
              <div className="p-6 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-[#1c1c1e]" style={SERIF}>{caseStudy.name}</h3>
                      <span className="rounded-full bg-[#fff0d6] px-2 py-0.5 text-[11px] font-bold text-[#7b1e3b]">Daily</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{DESC[caseStudy.slug]}</p>
                  </div>
                  {activeSlugs.has(caseStudy.slug) && <ActivePill label="Active" />}
                </div>

                <p className="mt-5 text-[11px] font-bold uppercase tracking-wider text-[#b8860b]">Choose your categories</p>
                <p className="mt-1 text-[13px] text-gray-500">Pick the topics you want the daily case study drawn from.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {csChoices.map((c) => {
                    const on = csCats.includes(c.slug)
                    return (
                      <button
                        key={c.slug}
                        type="button"
                        onClick={() => toggleCs(c.slug)}
                        className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                          on ? 'bg-[#fff0d6] border-[#d81b60] text-[#7b1e3b]'
                          : 'bg-white border-[#c9a227]/40 text-gray-700 hover:border-[#c9a227]'
                        }`}
                        style={on ? undefined : { borderLeftColor: band(c.slug), borderLeftWidth: 3 }}
                      >
                        {c.name}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-6">
                  <SubBtn
                    busy={busy === caseStudy.slug}
                    onClick={() => doSubscribe(caseStudy, { case_study_categories: csCats })}
                    label={activeSlugs.has(caseStudy.slug) ? 'Update selection' : 'Subscribe to daily Case Studies'}
                    disabled={csCats.length === 0}
                  />
                  {csCats.length === 0 && <p className="mt-2 text-[12px] text-gray-400">Pick at least one category.</p>}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Category Small Articles — weekday */}
        <section className="mt-12">
          <div className="desi-divider mb-4">
            <span className="desi-divider__motif">❖ Category newsletters · one per weekday ❖</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {smallArticles.map((cat) => {
              const sub = prefs.subscriptions.find((s) => s.category_slug === cat.slug)
              const chosen = days[cat.slug] || sub?.weekday || ''
              const active = activeSlugs.has(cat.slug)
              return (
                <div key={cat.slug} className="desi-card rounded-2xl p-5" style={{ '--band': band(cat.slug) }}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-[#1c1c1e]" style={SERIF}>{cat.name}</div>
                    {active && <ActivePill label={sub?.weekday ? `Active · ${sub.weekday}` : 'Active'} small />}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{DESC[cat.slug]}</p>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-[#b8860b]">Choose your day</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {WEEKDAYS.map((w) => {
                      const usedBy = prefs.blocked[w.value]
                      const disabled = usedBy && usedBy !== cat.slug
                      const selected = chosen === w.value
                      return (
                        <button
                          key={w.value}
                          disabled={disabled}
                          onClick={() => setDays((d) => ({ ...d, [cat.slug]: w.value }))}
                          title={disabled ? `Already used by ${catBySlug[usedBy]?.name || usedBy}` : ''}
                          className={`rounded-full px-2.5 py-1 text-[13px] border transition-colors ${
                            selected ? 'bg-[#d81b60] border-[#d81b60] text-white'
                            : disabled ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
                            : 'border-[#c9a227]/40 text-gray-700 hover:border-[#c9a227]'
                          }`}
                        >
                          {w.label.slice(0, 3)}
                        </button>
                      )
                    })}
                  </div>
                  <div className="mt-4">
                    <SubBtn
                      busy={busy === cat.slug}
                      onClick={() => doSubscribe(cat, { weekday: chosen })}
                      label={active ? 'Update day' : 'Subscribe'}
                      disabled={!chosen}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {loading && <p className="mt-8 text-gray-500">Loading…</p>}
      </main>
    </div>
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

function SubBtn({ busy, onClick, label, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={busy || disabled}
      className="rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_8px_22px_rgba(216,27,96,0.3)] transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:shadow-none"
      style={{ background: 'linear-gradient(135deg, #F4A300, #D81B60)' }}
    >
      {busy ? 'Saving…' : label}
    </button>
  )
}
