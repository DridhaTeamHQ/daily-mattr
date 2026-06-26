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
      <header className="border-b border-[#c9a227]/35 bg-[#fffdf5]">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-extrabold tracking-[2px] text-[#7b1e3b]" style={SERIF}>DAILY MATTR</Link>
          <div className="flex items-center gap-3 text-sm">
            <Link to="/" className="font-semibold text-[#d81b60]">Newsletters</Link>
            <button onClick={signOut} className="rounded-full border border-[#c9a227]/40 px-3 py-1.5 hover:bg-[#fff0d6]">Sign out</button>
          </div>
        </div>
      </header>
      <div className="desi-jhalar" style={{ '--jhalar': '#c9a227' }} />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold text-[#7b1e3b]" style={SERIF}>Your profile</h1>
        {msg && <div className="mt-3 rounded-lg bg-[#eef6ec] px-3 py-2 text-sm text-[#2e6b3c] border border-[#bcd9c1]">{msg}</div>}

        {/* Account details */}
        <section className="mt-6 desi-frame rounded-2xl bg-[#fffdf5] p-6">
          <h2 className="text-lg font-bold text-[#1c1c1e]" style={SERIF}>Account</h2>
          <label className="mt-4 block text-sm text-gray-600">Name</label>
          <div className="mt-1 flex gap-2">
            <input value={name} onChange={(e) => setName(e.target.value)} className="flex-1 rounded-xl border border-[#c9a227]/40 px-4 py-2.5 outline-none focus:border-[#d81b60]" placeholder="Your name" />
            <button onClick={saveName} className="rounded-xl px-5 font-semibold text-white" style={{ background: 'linear-gradient(135deg, #F4A300, #D81B60)' }}>Save</button>
          </div>
          <p className="mt-3 text-sm text-gray-500">Email: <span className="text-gray-800">{prefs.profile?.email || user?.email}</span></p>
        </section>

        {/* Active subscriptions */}
        <section className="mt-6 desi-frame rounded-2xl bg-[#fffdf5] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold" style={SERIF}>Active newsletters</h2>
            {prefs.subscriptions.length > 0 && (
              <button onClick={removeAll} className="text-sm text-red-500 hover:underline">Unsubscribe all</button>
            )}
          </div>

          {loading ? (
            <p className="mt-4 text-gray-500">Loading…</p>
          ) : prefs.subscriptions.length === 0 ? (
            <div className="mt-4 rounded-xl bg-[#fff7e6] p-6 text-center">
              <p className="text-gray-600">You have no active subscriptions yet.</p>
              <Link to="/subscribe" className="mt-3 inline-block rounded-full px-5 py-2.5 text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg, #F4A300, #D81B60)' }}>Browse newsletters</Link>
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
