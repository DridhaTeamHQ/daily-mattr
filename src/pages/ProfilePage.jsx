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
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-extrabold tracking-[2px]">DAILY MATTR</Link>
          <div className="flex items-center gap-3 text-sm">
            <Link to="/" className="text-[#7900d9] font-semibold">Newsletters</Link>
            <button onClick={signOut} className="rounded-full border border-gray-300 px-3 py-1.5 hover:bg-gray-50">Sign out</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold" style={SERIF}>Your profile</h1>
        {msg && <div className="mt-3 rounded-lg bg-[#7900d9]/10 px-3 py-2 text-sm text-[#7900d9]">{msg}</div>}

        {/* Account details */}
        <section className="mt-6 rounded-2xl border border-black/10 bg-white p-6">
          <h2 className="text-lg font-bold" style={SERIF}>Account</h2>
          <label className="mt-4 block text-sm text-gray-600">Name</label>
          <div className="mt-1 flex gap-2">
            <input value={name} onChange={(e) => setName(e.target.value)} className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:border-[#7900d9]" placeholder="Your name" />
            <button onClick={saveName} className="rounded-xl bg-[#7900d9] px-4 font-semibold text-white">Save</button>
          </div>
          <p className="mt-3 text-sm text-gray-500">Email: <span className="text-gray-800">{prefs.profile?.email || user?.email}</span></p>
        </section>

        {/* Active subscriptions */}
        <section className="mt-6 rounded-2xl border border-black/10 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold" style={SERIF}>Active newsletters</h2>
            {prefs.subscriptions.length > 0 && (
              <button onClick={removeAll} className="text-sm text-red-500 hover:underline">Unsubscribe all</button>
            )}
          </div>

          {loading ? (
            <p className="mt-4 text-gray-500">Loading…</p>
          ) : prefs.subscriptions.length === 0 ? (
            <div className="mt-4 rounded-xl bg-gray-50 p-6 text-center">
              <p className="text-gray-600">You have no active subscriptions yet.</p>
              <Link to="/" className="mt-3 inline-block rounded-full bg-[#7900d9] px-5 py-2.5 text-sm font-semibold text-white">Browse newsletters</Link>
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
                        <div className="font-semibold">{cat?.name || s.category_slug}</div>
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
                                current ? 'bg-[#7900d9] border-[#7900d9] text-white'
                                : disabled ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
                                : 'border-gray-300 text-gray-700 hover:border-[#7900d9]'
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
