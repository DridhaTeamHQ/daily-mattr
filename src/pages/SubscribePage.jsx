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

const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }
const RHYTHMS = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-weekly' },
  { value: 'monthly', label: 'Monthly' },
]
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

export default function SubscribePage() {
  const { isAuthed, loading: authLoading, signOut } = useAuth()
  const navigate = useNavigate()
  const [cats, setCats] = useState([])
  const [prefs, setPrefs] = useState({ subscriptions: [], blocked: {} })
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState('')
  const [msg, setMsg] = useState(null) // { type, text }
  // local weekday / rhythm choices keyed by slug
  const [days, setDays] = useState({})
  const [rhythms, setRhythms] = useState({})

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
    if (p) setPrefs(p)
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
        : cat.newsletter_type === 'category_small_articles' ? `every ${opts.weekday}`
        : (opts.rhythm || 'weekly')
      flash('ok', `Subscribed to ${cat.name} — ${where}.`)
    } catch (e) {
      flash('err', e.message)
    } finally {
      setBusy('')
    }
  }

  const caseStudy = cats.find((c) => c.newsletter_type === 'case_study_daily')
  const smallArticles = cats.filter((c) => c.newsletter_type === 'category_small_articles')
  const newsCats = cats.filter((c) => c.newsletter_type === 'news_rhythm')

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-extrabold tracking-[2px]">DAILY MATTR</Link>
          <div className="flex items-center gap-3 text-sm">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Explore</Link>
            {isAuthed ? (
              <>
                <Link to="/profile" className="text-[#7900d9] font-semibold">Profile</Link>
                <button onClick={signOut} className="rounded-full border border-gray-300 px-3 py-1.5 hover:bg-gray-50">Sign out</button>
              </>
            ) : (
              <Link to="/login?redirect=/subscribe" className="rounded-full bg-[#7900d9] px-4 py-1.5 font-semibold text-white">Login</Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold" style={SERIF}>Daily Mattr Newsletters</h1>
        <p className="mt-2 text-gray-600">Browse freely. {isAuthed ? 'Pick what lands when.' : 'Log in to subscribe and save your preferences.'}</p>

        {msg && (
          <div className={`mt-4 rounded-xl px-4 py-2.5 text-sm ${msg.type === 'ok' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>{msg.text}</div>
        )}

        {/* Case Studies — daily */}
        {caseStudy && (
          <section className="mt-8">
            <h2 className="text-xl font-bold" style={SERIF}>Case Studies</h2>
            <div className="mt-3 rounded-2xl border border-black/10 bg-white p-6 sm:flex sm:items-center sm:justify-between">
              <div>
                <div className="font-semibold">{caseStudy.name} <span className="ml-2 rounded-full bg-[#7900d9]/10 px-2 py-0.5 text-[11px] font-bold text-[#7900d9]">Daily</span></div>
                <p className="mt-1 text-sm text-gray-600">{DESC[caseStudy.slug]}</p>
              </div>
              <SubBtn
                active={activeSlugs.has(caseStudy.slug)}
                busy={busy === caseStudy.slug}
                onClick={() => doSubscribe(caseStudy, {})}
                label="Subscribe to daily Case Studies"
              />
            </div>
          </section>
        )}

        {/* Category Small Articles — weekday */}
        <section className="mt-10">
          <h2 className="text-xl font-bold" style={SERIF}>Category newsletters <span className="text-sm font-normal text-gray-500">— one per weekday</span></h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {smallArticles.map((cat) => {
              const sub = prefs.subscriptions.find((s) => s.category_slug === cat.slug)
              const chosen = days[cat.slug] || sub?.weekday || ''
              return (
                <div key={cat.slug} className="rounded-2xl border border-black/10 bg-white p-5">
                  <div className="font-semibold">{cat.name}</div>
                  <p className="mt-1 text-sm text-gray-600">{DESC[cat.slug]}</p>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">Choose your day</p>
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
                          className={`rounded-full px-2.5 py-1 text-[13px] border ${
                            selected ? 'bg-[#7900d9] border-[#7900d9] text-white'
                            : disabled ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
                            : 'border-gray-300 text-gray-700 hover:border-[#7900d9]'
                          }`}
                        >
                          {w.label.slice(0, 3)}
                        </button>
                      )
                    })}
                  </div>
                  <div className="mt-4">
                    <SubBtn
                      active={activeSlugs.has(cat.slug)}
                      activeLabel={sub?.weekday ? `Active · ${sub.weekday}` : 'Active'}
                      busy={busy === cat.slug}
                      onClick={() => doSubscribe(cat, { weekday: chosen })}
                      label="Subscribe"
                      disabled={!chosen}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* News — rhythm */}
        <section className="mt-10">
          <h2 className="text-xl font-bold" style={SERIF}>News categories <span className="text-sm font-normal text-gray-500">— weekly or monthly</span></h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {newsCats.map((cat) => {
              const sub = prefs.subscriptions.find((s) => s.category_slug === cat.slug)
              const r = rhythms[cat.slug] || sub?.rhythm || 'weekly'
              return (
                <div key={cat.slug} className="rounded-2xl border border-black/10 bg-white p-5">
                  <div className="font-semibold">{cat.name}</div>
                  <p className="mt-1 text-sm text-gray-600">{DESC[cat.slug]}</p>
                  <select
                    value={r}
                    onChange={(e) => setRhythms((m) => ({ ...m, [cat.slug]: e.target.value }))}
                    className="mt-3 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#7900d9]"
                  >
                    {RHYTHMS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <div className="mt-3">
                    <SubBtn
                      active={activeSlugs.has(cat.slug)}
                      activeLabel={sub?.rhythm ? `Active · ${sub.rhythm}` : 'Active'}
                      busy={busy === cat.slug}
                      onClick={() => doSubscribe(cat, { rhythm: r })}
                      label="Subscribe"
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

function SubBtn({ active, activeLabel = 'Active', busy, onClick, label, disabled }) {
  if (active) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        {activeLabel}
      </span>
    )
  }
  return (
    <button
      onClick={onClick}
      disabled={busy || disabled}
      className="rounded-full bg-[#7900d9] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#6800ba] disabled:opacity-50"
    >
      {busy ? 'Saving…' : label}
    </button>
  )
}
