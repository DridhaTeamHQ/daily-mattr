import React, { useMemo, useState } from 'react'
import LmDrawer from './LmDrawer'
import { LM_CATEGORIES, lmCategoryBySlug } from './lmCategories'
import { subscribeNewsletter } from '../../lib/subscribeApi'
import { useAuth } from '../../context/AuthContext'

// Subscribe drawer — Figma overlays 01-04 ("Setup your edition", 589px,
// bg #F4F4F6, white header/footer bars). Step 1: per-topic Daily Deep Dive vs
// Weekly Round-up (+ delivery-day pills). Step 2: review + name/email +
// consent → Confirm subscription. Success: green tick + edition list.
const rb = { fontVariationSettings: '"wdth" 100' }
const DAYS = [
  ['mon', 'Mon'], ['tue', 'Tue'], ['wed', 'Wed'], ['thu', 'Thu'], ['fri', 'Fri'], ['sat', 'Sat'], ['sun', 'Sun'],
]
// Real newsletter categories: agent categories map 1:1; topic cards ride the
// general daily wrap.
const REAL_CATEGORY = (slug) =>
  ['real-estate', 'policy-partner', 'money-matters', 'wellness-daily'].includes(slug) ? slug : 'general'

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
  const [step, setStep] = useState(1)
  // choices: slug -> { rhythm: 'daily'|'weekly', day: 'fri' }
  const [choices, setChoices] = useState({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState(user?.email || '')
  const [consent, setConsent] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const topics = useMemo(() => {
    return (slugs.length ? slugs : ['general']).map(
      (s) => lmCategoryBySlug(s) || { slug: s, title: s === 'general' ? 'The Daily — all categories' : s }
    )
  }, [slugs])

  const complete = topics.every((t) => {
    const c = choices[t.slug]
    return c && (c.rhythm === 'daily' || (c.rhythm === 'weekly' && c.day))
  })

  const setChoice = (slug, patch) =>
    setChoices((c) => ({ ...c, [slug]: { ...(c[slug] || {}), ...patch } }))

  const confirm = async () => {
    if (!email.trim()) { setError('Enter your email address.'); return }
    setBusy(true)
    setError('')
    try {
      // One subscribe call per distinct real category; weekly picks carry send_days.
      const seen = new Set()
      for (const t of topics) {
        const real = REAL_CATEGORY(t.slug)
        if (seen.has(real)) continue
        seen.add(real)
        const c = choices[t.slug] || { rhythm: 'daily' }
        await subscribeNewsletter({
          name: name.trim() || undefined,
          email: email.trim(),
          rhythm: c.rhythm || 'daily',
          send_days: c.rhythm === 'weekly' && c.day ? [c.day] : undefined,
          categories: [real],
          source_preference: 'top',
        })
      }
      setStep(3)
    } catch (e) {
      setError(e.message || 'Subscription failed — try again.')
    } finally {
      setBusy(false)
    }
  }

  const reset = () => { setStep(1); setChoices({}); setError('') }

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
              {topics.map((t) => {
                const c = choices[t.slug] || {}
                return (
                  <div key={t.slug} className="flex flex-col gap-[10px] rounded-[16px] bg-white p-[16px]">
                    <p className="font-bevietnam text-[15px] font-semibold text-lm-800">{t.title}</p>
                    <OptionRow
                      label="Daily Deep Dive"
                      hint="One story every morning"
                      selected={c.rhythm === 'daily'}
                      onClick={() => setChoice(t.slug, { rhythm: 'daily', day: undefined })}
                    />
                    <OptionRow
                      label="Weekly Round-up"
                      hint="The week's best, on your day"
                      selected={c.rhythm === 'weekly'}
                      onClick={() => setChoice(t.slug, { rhythm: 'weekly' })}
                    />
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
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="w-full rounded-[60px] border border-lm-200 bg-white px-[20px] py-[13px] font-roboto text-[15px] outline-none placeholder:text-lm-400 focus:border-lm-700" style={rb} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address..." className="w-full rounded-[60px] border border-lm-200 bg-white px-[20px] py-[13px] font-roboto text-[15px] outline-none placeholder:text-lm-400 focus:border-lm-700" style={rb} />
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
