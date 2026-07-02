import React, { useEffect, useMemo, useState } from 'react'
import LmDrawer from './LmDrawer'
import { LM_CATEGORIES, lmCategoryBySlug } from './lmCategories'
import { subscribeNewsletter } from '../../lib/subscribeApi'
import { subscribe as accountSubscribe, ensureProfile } from '../../lib/newsletterPrefs'
import { useAuth } from '../../context/AuthContext'
import { useLmDrawer } from './LmDrawerContext'

// Subscribe drawer — Figma overlays 01-04 ("Setup your edition", 589px,
// bg #F4F4F6, white header/footer bars). Step 1: per-topic Daily Deep Dive vs
// Weekly Round-up (+ delivery-day pills). Step 2: review + name/email +
// consent → Confirm subscription. Success: green tick + edition list.
//
// TWO WRITE PATHS (mirrors the old site):
// - Signed-in users → account editions in `newsletter_subscriptions` via
//   newsletterPrefs.subscribe (shows in the My Editions tab; each category
//   row's newsletter_type dictates the rules below).
// - Guests → legacy `subscribers` table via the subscribers edge function.
const rb = { fontVariationSettings: '"wdth" 100' }
// The agent sends Mon–Sat; Sunday is deliberately excluded.
const DAYS = [
  ['mon', 'Mon'], ['tue', 'Tue'], ['wed', 'Wed'], ['thu', 'Thu'], ['fri', 'Fri'], ['sat', 'Sat'],
]
const FULL_DAY = { mon: 'monday', tue: 'tuesday', wed: 'wednesday', thu: 'thursday', fri: 'friday', sat: 'saturday' }
// Guest (legacy) categories: agent categories map 1:1; topic cards ride the
// general daily wrap.
const REAL_CATEGORY = (slug) =>
  ['real-estate', 'policy-partner', 'money-matters', 'wellness-daily'].includes(slug) ? slug : 'general'
// Per-type rules: case studies are daily-only; the 4 topic categories send
// weekly on a chosen weekday; general-news topics support both rhythms.
const isDailyOnly = (t) => t.account?.type === 'case_study_daily'
const isWeeklyOnly = (t) => t.account?.type === 'category_small_articles'
const defaultChoice = (t) => (isWeeklyOnly(t) ? { rhythm: 'weekly', day: 'fri' } : { rhythm: 'daily' })

function OptionRow({ label, hint, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-[16px] border px-[16px] py-[11px] text-left ${
        selected ? 'border-lm-700 bg-[#F4F4F6]' : 'border-lm-200 bg-white'
      }`}
    >
      <span>
        <span className="block font-bevietnam text-[15px] font-semibold text-lm-800">{label}</span>
        {hint && <span className="block font-bevietnam text-[12px] text-lm-500">{hint}</span>}
      </span>
      <img
        alt=""
        src={selected ? '/figma/icon-tick-circle-selected-dark.svg' : '/figma/icon-tick-circle-unselected.svg'}
        className="size-[20px] shrink-0"
      />
    </button>
  )
}

export default function LmSubscribeDrawer({ open, slugs = [], onClose }) {
  const { user } = useAuth()
  const { markSubscribed } = useLmDrawer()
  const [step, setStep] = useState(1)
  // selected: slugs of the categories currently in the edition.
  const [selected, setSelected] = useState([])
  // choices: slug -> { rhythm: 'daily'|'weekly', day: 'fri' }
  const [choices, setChoices] = useState({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState(user?.email || '')
  const [consent, setConsent] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  // Opening (re)seeds the selection with whatever card/button launched the
  // drawer, pre-filling each topic's only-valid rhythm so weekly-only topics
  // show their day picker immediately.
  useEffect(() => {
    if (open) {
      const seeded = slugs.filter((s) => lmCategoryBySlug(s))
      setSelected(seeded)
      setChoices((c) => {
        const next = { ...c }
        for (const s of seeded) {
          if (!next[s]?.rhythm) next[s] = defaultChoice(lmCategoryBySlug(s))
        }
        return next
      })
      setStep(1)
      setError('')
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  const topics = useMemo(
    () => selected.map((s) => lmCategoryBySlug(s)).filter(Boolean),
    [selected]
  )

  const allSelected = selected.length === LM_CATEGORIES.length
  const toggleTopic = (slug) => {
    setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]))
    setChoices((c) => (c[slug]?.rhythm ? c : { ...c, [slug]: defaultChoice(lmCategoryBySlug(slug)) }))
  }
  // Subscribe all: select every category with its natural default (daily, or
  // weekly-on-Friday for the weekday categories) so one click completes setup.
  const selectAll = () => {
    setSelected(LM_CATEGORIES.map((c) => c.slug))
    setChoices((c) => {
      const next = { ...c }
      for (const cat of LM_CATEGORIES) {
        if (!next[cat.slug]?.rhythm) next[cat.slug] = defaultChoice(cat)
      }
      return next
    })
  }

  const complete = topics.length > 0 && topics.every((t) => {
    const c = choices[t.slug]
    return c && (c.rhythm === 'daily' || (c.rhythm === 'weekly' && c.day))
  })

  const setChoice = (slug, patch) =>
    setChoices((c) => ({ ...c, [slug]: { ...(c[slug] || {}), ...patch } }))

  const confirm = async () => {
    if (!user && !email.trim()) { setError('Enter your email address.'); return }
    setBusy(true)
    setError('')
    try {
      if (user) {
        // ACCOUNT PATH — one newsletter_subscriptions row per topic; shows in
        // the My Editions tab and feeds the account audience of send-newsletter.
        await ensureProfile()
        const failures = []
        for (const t of topics) {
          const c = choices[t.slug] || defaultChoice(t)
          const categoryRow = { slug: t.account.slug, newsletter_type: t.account.type }
          try {
            await accountSubscribe(categoryRow, {
              weekday: c.day ? FULL_DAY[c.day] : undefined,
              rhythm: c.rhythm || 'daily',
              send_days: c.rhythm === 'weekly' && c.day ? [FULL_DAY[c.day]] : undefined,
              source_preference: 'top',
            })
          } catch (err) {
            failures.push(`${t.title}: ${err.message}`)
          }
        }
        if (failures.length === topics.length) throw new Error(failures[0])
        if (failures.length) setError(failures.join(' · '))
      } else {
        // GUEST PATH — legacy subscribers table via the edge function; one call
        // per distinct legacy category (topic cards ride the general wrap).
        const seen = new Set()
        for (const t of topics) {
          const real = REAL_CATEGORY(t.slug)
          if (seen.has(real)) continue
          seen.add(real)
          const c = choices[t.slug] || defaultChoice(t)
          await subscribeNewsletter({
            name: name.trim() || undefined,
            email: email.trim(),
            rhythm: c.rhythm || 'daily',
            send_days: c.rhythm === 'weekly' && c.day ? [c.day] : undefined,
            categories: [real],
            source_preference: 'top',
          })
        }
      }
      markSubscribed(selected)
      setStep(3)
    } catch (e) {
      setError(e.message || 'Subscription failed — try again.')
    } finally {
      setBusy(false)
    }
  }

  const reset = () => { setStep(1); setChoices({}); setSelected([]); setError('') }

  return (
    <LmDrawer open={open} onClose={() => { onClose(); reset() }} width={589} scrim={0.7}>
      <div className="flex min-h-full flex-col bg-[#F4F4F6]">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-lm-200 bg-white px-[32px] py-[16px]">
          <div>
            <p className="font-bevietnam text-[12px] font-medium uppercase tracking-[1.5px] text-lm-500">
              {step === 3 ? 'All set' : `Step ${step} of 2`}
            </p>
            <p className="font-bevietnam text-[18px] font-medium text-lm-800">
              {step === 1 ? 'Setup your edition' : step === 2 ? 'Where should we send it?' : 'Added to My Editions'}
            </p>
          </div>
          <button type="button" aria-label="Close" onClick={() => { onClose(); reset() }} className="flex size-[32px] items-center justify-center rounded-full text-[22px] leading-none text-lm-500 hover:bg-black/5">
            ×
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-[24px] py-[20px]">
          {step === 1 && (
            <div className="flex flex-col gap-[16px]">
              {/* Topic picker — shows what's currently selected; add/remove freely */}
              <div className="flex flex-col gap-[10px] rounded-[16px] bg-white p-[16px]">
                <div className="flex items-center justify-between">
                  <p className="font-bevietnam text-[13px] font-semibold uppercase tracking-[1px] text-lm-500">
                    Your topics {selected.length > 0 && `· ${selected.length} selected`}
                  </p>
                  <button
                    type="button"
                    onClick={() => (allSelected ? setSelected([]) : selectAll())}
                    className={`rounded-[100px] px-[14px] py-[7px] font-bevietnam text-[12px] font-semibold ${
                      allSelected ? 'border border-lm-300 text-lm-500' : 'bg-lm-800 text-white'
                    }`}
                  >
                    {allSelected ? 'Clear all' : 'Subscribe all'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-[8px]">
                  {LM_CATEGORIES.map((c) => {
                    const on = selected.includes(c.slug)
                    return (
                      <button
                        key={c.slug}
                        type="button"
                        onClick={() => toggleTopic(c.slug)}
                        className={`flex items-center gap-[6px] rounded-[40px] border px-[12px] py-[8px] font-bevietnam text-[13px] font-medium transition-colors ${
                          on ? 'border-lm-800 bg-lm-800 text-white' : 'border-lm-200 bg-white text-lm-600 hover:border-lm-400'
                        }`}
                      >
                        <span className="text-[14px] leading-none">{on ? '✓' : '+'}</span>
                        {c.title}
                      </button>
                    )
                  })}
                </div>
                {topics.length === 0 && (
                  <p className="font-bevietnam text-[13px] text-lm-500">Pick at least one topic — or hit “Subscribe all”.</p>
                )}
              </div>

              {topics.map((t) => {
                const c = choices[t.slug] || {}
                return (
                  <div key={t.slug} className="flex flex-col gap-[10px] rounded-[16px] bg-white p-[16px]">
                    <p className="font-bevietnam text-[15px] font-semibold text-lm-800">{t.title}</p>
                    {!isWeeklyOnly(t) && (
                      <OptionRow
                        label="Daily Deep Dive"
                        hint={isDailyOnly(t) ? 'One case study every morning' : 'One story every morning'}
                        selected={c.rhythm === 'daily'}
                        onClick={() => setChoice(t.slug, { rhythm: 'daily', day: undefined })}
                      />
                    )}
                    {!isDailyOnly(t) && (
                      <OptionRow
                        label="Weekly Round-up"
                        hint={isWeeklyOnly(t) ? 'Five briefs, delivered on your day' : "The week's best, on your day"}
                        selected={c.rhythm === 'weekly'}
                        onClick={() => setChoice(t.slug, { rhythm: 'weekly' })}
                      />
                    )}
                    {c.rhythm === 'weekly' && (
                      <div className="flex flex-col gap-[8px] pt-[4px]">
                        <p className="font-bevietnam text-[13px] text-lm-500">Choose a delivery day</p>
                        <div className="flex flex-wrap gap-[8px]">
                          {DAYS.map(([id, label]) => (
                            <button
                              key={id}
                              type="button"
                              onClick={() => setChoice(t.slug, { day: id })}
                              className={`rounded-[40px] border px-[16px] py-[8px] font-bevietnam text-[13px] font-medium ${
                                c.day === id ? 'border-lm-800 bg-lm-800 text-white' : 'border-lm-200 bg-white text-lm-600'
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[10px] rounded-[16px] bg-white p-[16px]">
                <p className="font-bevietnam text-[13px] font-semibold uppercase tracking-[1px] text-lm-500">Your editions</p>
                {topics.map((t) => {
                  const c = choices[t.slug] || { rhythm: 'daily' }
                  return (
                    <div key={t.slug} className="flex items-center justify-between border-b border-dashed border-lm-300 pb-[8px] last:border-0 last:pb-0">
                      <span className="font-bevietnam text-[15px] font-medium text-lm-800">{t.title}</span>
                      <span className="font-bevietnam text-[13px] text-[#2563EB]">
                        {c.rhythm === 'weekly' ? `Weekly · ${(DAYS.find(([id]) => id === c.day) || [])[1] || ''}` : 'Daily'}
                      </span>
                    </div>
                  )
                })}
              </div>
              <div className="flex flex-col gap-[12px] rounded-[16px] bg-white p-[16px]">
                <p className="font-roboto text-[18px] font-medium text-lm-800" style={rb}>Where should we send it?</p>
                {user ? (
                  <p className="font-roboto text-[15px] text-lm-500" style={rb}>
                    Your editions will land in <span className="font-medium text-lm-800">{user.email}</span> and show up under My Editions.
                  </p>
                ) : (
                  <>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="w-full rounded-[60px] border border-lm-200 bg-white px-[20px] py-[13px] font-roboto text-[15px] outline-none placeholder:text-lm-400 focus:border-lm-700" style={rb} />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address..." className="w-full rounded-[60px] border border-lm-200 bg-white px-[20px] py-[13px] font-roboto text-[15px] outline-none placeholder:text-lm-400 focus:border-lm-700" style={rb} />
                  </>
                )}
                <button type="button" onClick={() => setConsent(!consent)} className="flex items-start gap-[8px] text-left">
                  <span className={`mt-[2px] flex size-[18px] items-center justify-center rounded-[5px] border ${consent ? 'border-lm-800 bg-lm-800' : 'border-lm-300 bg-white'}`}>
                    {consent && <img alt="" src="/figma/icon-tick-24.svg" className="size-[12px] invert" />}
                  </span>
                  <span className="font-roboto text-[13px] leading-[1.4] text-lm-500" style={rb}>
                    Send me the editions I picked and occasional product updates. Unsubscribe anytime.
                  </span>
                </button>
              </div>
              {error && <p className="font-bevietnam text-[13px] text-red-600">{error}</p>}
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center gap-[16px] pt-[48px] text-center">
              <img alt="" src="/figma/icon-tick-circle-success-96.svg" className="size-[96px]" />
              <p className="font-bevietnam text-[20px] font-semibold text-lm-800">Added to My Editions</p>
              <div className="flex w-full flex-col gap-[8px] rounded-[16px] bg-white p-[16px] text-left">
                {topics.map((t) => {
                  const c = choices[t.slug] || { rhythm: 'daily' }
                  return (
                    <div key={t.slug} className="flex items-center justify-between">
                      <span className="font-bevietnam text-[15px] font-medium text-lm-800">{t.title}</span>
                      <span className="font-bevietnam text-[13px] text-[#2563EB]">
                        {c.rhythm === 'weekly' ? `Weekly · ${(DAYS.find(([id]) => id === c.day) || [])[1] || ''}` : 'Daily'}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer bar */}
        <div className="border-t border-lm-200 bg-white px-[32px] py-[16px]">
          {step === 1 && (
            <button
              type="button"
              disabled={!complete}
              onClick={() => setStep(2)}
              className={`h-[50px] w-full rounded-[35px] font-roboto text-[15px] font-semibold ${
                complete ? 'bg-lm-700 text-white shadow-[0px_6px_25px_0px_rgba(0,0,0,0.15)]' : 'bg-lm-200 text-lm-400'
              }`}
              style={rb}
            >
              Review {topics.length} {topics.length === 1 ? 'edition' : 'editions'}
            </button>
          )}
          {step === 2 && (
            <div className="flex gap-[8px]">
              <button type="button" onClick={() => setStep(1)} className="h-[50px] rounded-[35px] border border-lm-300 px-[20px] font-roboto text-[15px] font-semibold text-lm-600" style={rb}>
                Back
              </button>
              <button
                type="button"
                disabled={busy || !consent}
                onClick={confirm}
                className={`h-[50px] flex-1 rounded-[35px] font-roboto text-[15px] font-semibold ${busy || !consent ? 'bg-lm-200 text-lm-400' : 'bg-lm-700 text-white shadow-[0px_6px_25px_0px_rgba(0,0,0,0.15)]'}`}
                style={rb}
              >
                {busy ? 'Subscribing…' : 'Confirm subscription'}
              </button>
            </div>
          )}
          {step === 3 && (
            <div className="flex gap-[8px]">
              <button type="button" onClick={() => { onClose(); reset() }} className="h-[50px] flex-1 rounded-[35px] border border-lm-300 font-roboto text-[15px] font-semibold text-lm-600" style={rb}>
                Explore more topics
              </button>
              <button type="button" onClick={() => { onClose(); reset() }} className="h-[50px] flex-1 rounded-[35px] bg-lm-700 font-roboto text-[15px] font-semibold text-white" style={rb}>
                View my editions
              </button>
            </div>
          )}
        </div>
      </div>
    </LmDrawer>
  )
}
