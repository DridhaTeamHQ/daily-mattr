import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  getCategories,
  getMyPreferences,
  ensureProfile,
  updateDay,
  unsubscribe,
  unsubscribeAll,
  updateProfileName,
  WEEKDAYS,
} from '../lib/newsletterPrefs'

const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }
const cadenceLabel = (s) => {
  if (s.newsletter_type === 'case_study_daily') return 'Daily'
  if (s.newsletter_type === 'category_small_articles') return `Every ${s.weekday ? s.weekday[0].toUpperCase() + s.weekday.slice(1) : 'week'}`
  return s.rhythm ? s.rhythm[0].toUpperCase() + s.rhythm.slice(1) : 'Weekly'
}
// Show product names that match the subscribe page's three newsletters.
const productName = (s, cat) =>
  s.category_slug === 'national' && s.rhythm === 'daily' ? 'Daily Headlines'
    : s.newsletter_type === 'case_study_daily' ? 'Daily Case Study'
      : cat?.name || s.category_slug

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const [cats, setCats] = useState([])
  const [prefs, setPrefs] = useState({ profile: null, subscriptions: [], blocked: {} })
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [editing, setEditing] = useState(null) // category_slug being re-dayed
  const [msg, setMsg] = useState('')

  const catBySlug = useMemo(() => Object.fromEntries(cats.map((c) => [c.slug, c])), [cats])

  const load = async () => {
    setLoading(true)
    await ensureProfile()
    const [c, p] = await Promise.all([getCategories(), getMyPreferences()])
    setCats(c)
    setPrefs(p)
    setName(p.profile?.full_name || '')
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(''), 2500) }

  const saveName = async () => {
    try { await updateProfileName(name.trim()); flash('Name saved.') } catch (e) { flash(e.message) }
  }
  const changeDay = async (slug, weekday) => {
    try {
      await updateDay(catBySlug[slug], weekday)
      setEditing(null)
      await load()
      flash('Day updated.')
    } catch (e) { flash(e.message) }
  }
  const removeOne = async (slug) => {
    try { await unsubscribe(slug); await load(); flash('Unsubscribed.') } catch (e) { flash(e.message) }
  }
  const removeAll = async () => {
    if (!confirm('Unsubscribe from all newsletters?')) return
    try { await unsubscribeAll(); await load(); flash('All subscriptions removed.') } catch (e) { flash(e.message) }
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900">
      <header className="border-b border-[#c9a227]/30 bg-[#fffdf5]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-extrabold tracking-[2px] text-[#7b1e3b]" style={SERIF}>DAILY MATTR</Link>
          <div className="flex items-center gap-3 text-sm">
            <Link to="/" className="text-gray-600 hover:text-[#7b1e3b]">Explore</Link>
            <Link to="/subscribe" className="font-semibold text-[#d81b60]">Subscribe</Link>
            <button onClick={signOut} className="rounded-full border border-[#c9a227]/40 px-3 py-1.5 hover:bg-[#fff0d6]">Sign out</button>
          </div>
        </div>
      </header>

      {/* Hero band */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #7b1e3b, #3a1206)' }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.4px)', backgroundSize: '20px 20px' }} />
        <div className="relative mx-auto flex max-w-5xl flex-wrap items-center gap-5 px-4 py-10">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[#f4a300]/50 bg-white/10 text-2xl font-bold text-[#fdf6e7]" style={SERIF}>
            {(name || prefs.profile?.email || user?.email || 'D').trim().charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h1 className="text-3xl font-bold text-[#fdf6e7]" style={SERIF}>
              {name ? `Hello, ${name.split(' ')[0]}` : 'Your profile'}
            </h1>
            <p className="truncate text-sm text-[#f6e7c9]/75">{prefs.profile?.email || user?.email}</p>
          </div>
          <div className="ml-auto flex items-center gap-3 rounded-2xl border border-[#f4a300]/30 bg-white/10 px-5 py-3 text-[#fdf6e7]">
            <span className="text-3xl font-bold leading-none" style={SERIF}>{prefs.subscriptions.length}</span>
            <span className="text-[11px] font-semibold uppercase leading-tight tracking-wider text-[#f6e7c9]/80">Active<br />{prefs.subscriptions.length === 1 ? 'edition' : 'editions'}</span>
          </div>
        </div>
      </div>

      {msg && (
        <div className="mx-auto mt-4 max-w-5xl px-4">
          <div className="rounded-lg border border-[#bcd9c1] bg-[#eef6ec] px-3 py-2 text-sm text-[#2e6b3c]">{msg}</div>
        </div>
      )}

      <main className="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[0.85fr_1.5fr] lg:items-start">
        {/* Account */}
        <section className="desi-frame rounded-2xl bg-[#fffdf5] p-6 lg:sticky lg:top-6">
          <h2 className="text-lg font-bold text-gray-900" style={SERIF}>Account</h2>
          <label className="mt-4 block text-sm text-gray-600">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-xl border border-[#c9a227]/40 px-4 py-2.5 outline-none focus:border-[#d81b60]" placeholder="Your name" />
          <button onClick={saveName} className="mt-3 w-full rounded-xl border border-[#c9a227] bg-[#7b1e3b] py-2.5 font-semibold text-white transition-colors hover:bg-[#5e1730]">Save name</button>
          <p className="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-500">Signed in as<br /><span className="text-gray-800">{prefs.profile?.email || user?.email}</span></p>
        </section>

        {/* Active subscriptions */}
        <section className="desi-frame rounded-2xl bg-[#fffdf5] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900" style={SERIF}>Active newsletters</h2>
            {prefs.subscriptions.length > 0 && (
              <button onClick={removeAll} className="text-sm text-red-500 hover:underline">Unsubscribe all</button>
            )}
          </div>

          {loading ? (
            <p className="mt-4 text-gray-500">Loading…</p>
          ) : prefs.subscriptions.length === 0 ? (
            <div className="mt-4 rounded-xl border border-[#c9a227]/30 bg-[#fff7e6] p-8 text-center">
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-white text-[#7b1e3b] shadow-sm">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <p className="font-semibold text-gray-700">No active subscriptions yet</p>
              <p className="mt-1 text-sm text-gray-500">Pick the editions you want and they&rsquo;ll land in your inbox.</p>
              <Link to="/subscribe" className="mt-4 inline-block rounded-full border border-[#c9a227] bg-[#7b1e3b] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5e1730]">Browse newsletters</Link>
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-gray-100">
              {prefs.subscriptions.map((s) => {
                const cat = catBySlug[s.category_slug]
                const isSmall = s.newsletter_type === 'category_small_articles'
                return (
                  <li key={s.category_slug} className="py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-semibold">{productName(s, cat)}</div>
                        <div className="text-sm text-gray-500">{cadenceLabel(s)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isSmall && (
                          <button onClick={() => setEditing(editing === s.category_slug ? null : s.category_slug)} className="rounded-full border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">Change day</button>
                        )}
                        <button onClick={() => removeOne(s.category_slug)} className="rounded-full border border-red-200 px-3 py-1.5 text-sm text-red-500 hover:bg-red-50">Unsubscribe</button>
                      </div>
                    </div>

                    {isSmall && editing === s.category_slug && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {WEEKDAYS.map((w) => {
                          const usedBy = prefs.blocked[w.value]
                          const disabled = usedBy && usedBy !== s.category_slug
                          const current = s.weekday === w.value
                          return (
                            <button
                              key={w.value}
                              disabled={disabled}
                              onClick={() => changeDay(s.category_slug, w.value)}
                              title={disabled ? `Already used by ${catBySlug[usedBy]?.name || usedBy}` : ''}
                              className={`rounded-full px-3 py-1.5 text-sm border ${
                                current ? 'bg-[#d81b60] border-[#d81b60] text-white'
                                : disabled ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
                                : 'border-[#c9a227]/40 text-gray-700 hover:border-[#c9a227]'
                              }`}
                            >
                              {w.label}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}
