import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { triggerHaptic } from '../utils/haptics'
import { subscribeNewsletter } from '../lib/subscribeApi'
import {
  SUBSCRIBE_CATEGORIES,
  RHYTHMS,
  WEEKDAYS,
  SOURCE_PREFERENCES,
} from '../lib/subscribeOptions'
import EditionPreview from './EditionPreview'

// Figma-exact "Build your edition" form (node 1:1512). Palette: white, black,
// #7900d9, with the #f4e9ff selected tint. Roboto throughout.
const SANS = { fontFamily: "'Roboto', system-ui, sans-serif" }

const CalendarIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="3" y="5" width="18" height="16" rx="2.5" />
    <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
  </svg>
)
const Chevron = ({ up, ...p }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-5 w-5 transition-transform ${up ? 'rotate-180' : ''}`} {...p}>
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Tick = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#7900d9" strokeWidth="2" className="h-5 w-5 shrink-0" {...p}>
    <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function NewsletterSubscribe({ categories: categoriesProp, onCategoriesChange }) {
  const controlled = Array.isArray(categoriesProp)
  const [catState, setCatState] = useState([])
  const categories = controlled ? categoriesProp : catState
  const setCategories = (updater) => {
    if (controlled) {
      const next = typeof updater === 'function' ? updater(categoriesProp) : updater
      onCategoriesChange?.(next)
    } else {
      setCatState(updater)
    }
  }

  const [rhythm, setRhythm] = useState('weekly')
  const [days, setDays] = useState(['thu'])
  const [source, setSource] = useState('top')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  const allSelected = categories.length === SUBSCRIBE_CATEGORIES.length
  const summary =
    rhythm === 'weekly' && days.length
      ? `Weekly, ${days.map((d) => WEEKDAYS.find((w) => w.id === d)?.label).filter(Boolean).join(', ')}`
      : RHYTHMS.find((r) => r.id === rhythm)?.label

  const toggleDay = (id) => {
    triggerHaptic('light')
    setDays((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]))
  }
  const toggleCategory = (slug) => {
    triggerHaptic('light')
    setCategories((c) => (c.includes(slug) ? c.filter((x) => x !== slug) : [...c, slug]))
  }
  const toggleAll = () => {
    triggerHaptic('light')
    setCategories(allSelected ? [] : SUBSCRIBE_CATEGORIES.map((c) => c.slug))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) return setStatus({ state: 'error', msg: 'Please enter a valid email address.' })
    if (categories.length === 0) return setStatus({ state: 'error', msg: 'Select at least one category.' })
    if (rhythm === 'weekly' && days.length === 0) return setStatus({ state: 'error', msg: 'Pick at least one day for weekly delivery.' })
    setStatus({ state: 'loading', msg: '' })
    try {
      const res = await subscribeNewsletter({
        name: name.trim(),
        email: email.trim(),
        rhythm,
        send_days: rhythm === 'weekly' ? days : [],
        categories,
        source_preference: source,
      })
      triggerHaptic('success')
      setStatus({
        state: 'success',
        msg: res.resubscribed
          ? 'Welcome back — your subscription is active again.'
          : res.existing
            ? 'Your preferences have been updated.'
            : "You're in. Watch your inbox for your first edition.",
      })
    } catch (err) {
      triggerHaptic('error')
      setStatus({ state: 'error', msg: err?.message || 'Something went wrong. Please try again.' })
    }
  }

  // ---- Figma tokens ----
  const headline = 'text-[17px] font-medium text-[#1c1c1e] leading-snug'
  const desc = 'text-[15px] text-[#1c1c1e] leading-snug'
  const optBox = (active) =>
    `rounded-[12px] border w-full px-5 py-[15px] text-left transition-colors ${
      active ? 'bg-[#f4e9ff] border-[#7900d9]' : 'bg-white border-black/10 hover:border-black/20'
    }`
  const pill = (active) =>
    `flex items-center justify-between gap-2 rounded-[32px] border px-6 py-[14px] text-[15px] font-medium text-[rgba(28,28,30,0.93)] transition-colors ${
      active ? 'bg-[#f4e9ff] border-[#7900d9]' : 'bg-white border-black/10 hover:border-black/20'
    }`
  const summaryBadge = 'rounded-[44px] bg-[#f4e9ff] px-3.5 py-[7px] text-[15px] font-medium text-[#1c1c1e]'

  if (status.state === 'success') {
    return (
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="lg:sticky lg:top-24 lg:self-start"><EditionPreview rhythm={rhythm} days={days} source={source} categories={categories} name={name} summary={summary} /></div>
        <div className="rounded-[24px] border border-black/10 bg-[#fbf7f0] p-8 text-center sm:p-10" style={SANS}>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f4e9ff] text-[#7900d9]">
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h3 className="text-[22px] font-semibold text-black">You&rsquo;re subscribed!</h3>
          <p className="mt-2 text-[15px] text-[#1c1c1e]">{status.msg}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* LEFT — live preview (the section's left visual) */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <EditionPreview rhythm={rhythm} days={days} source={source} categories={categories} name={name} summary={summary} />
      </div>

      {/* RIGHT — Figma-exact builder card */}
      <form onSubmit={onSubmit} className="overflow-hidden rounded-[24px] border border-black/10 bg-[#fbf7f0]" style={SANS}>
        {/* Schedule header */}
        <div className="flex items-center gap-4 border-b border-black/10 bg-[#f4ede1] px-8 py-6">
          <CalendarIcon className="h-6 w-6 text-black" />
          <h3 className="text-[22px] font-semibold text-black">Schedule</h3>
        </div>

        {/* Choose your delivery rhythm */}
        <div className="border-b border-black/10 pb-8">
          <div className="flex flex-col gap-2 px-8 pb-2 pt-8">
            <p className="text-[18px] font-medium text-black">Choose your delivery rhythm.</p>
            {summary && <span className={`${summaryBadge} self-start`}>{summary}</span>}
          </div>

          <div className="flex flex-col gap-2 px-8">
            {RHYTHMS.map((r) => {
              const active = rhythm === r.id
              const collapsible = r.id !== 'daily'
              return (
                <div
                  key={r.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => { triggerHaptic('light'); setRhythm(r.id) }}
                  onKeyDown={(e) => { if (e.key === 'Enter') { triggerHaptic('light'); setRhythm(r.id) } }}
                  className={`cursor-pointer rounded-[12px] border px-5 py-[15px] transition-colors ${active ? 'bg-[#faf9f6] border-[#7900d9]' : 'bg-white border-black/10 hover:border-black/20'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className={headline}>{r.label}</p>
                      <p className={desc}>{r.desc}</p>
                    </div>
                    {collapsible && <Chevron up={active} className="h-5 w-5 shrink-0 text-[#1c1c1e]" />}
                  </div>

                  <AnimatePresence initial={false}>
                    {active && r.id === 'weekly' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="grid grid-cols-2 gap-2 pt-3">
                          {WEEKDAYS.map((w) => (
                            <button
                              type="button"
                              key={w.id}
                              onClick={(e) => { e.stopPropagation(); toggleDay(w.id) }}
                              className={pill(days.includes(w.id))}
                            >
                              <span>{w.label}</span>
                              {days.includes(w.id) && <Tick />}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    {active && r.id === 'bi-weekly' && (
                      <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-2 text-[13px] text-[#6b6b73]">
                        You will receive editions twice a week (Tuesday &amp; Friday).
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        {/* Categories */}
        <div className="border-b border-black/10 pb-6">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="min-w-0">
              <p className="text-[18px] font-medium text-[#1c1c1e]">Categories</p>
              <p className={desc}>Choose what matters to you.</p>
            </div>
            <span className={`${summaryBadge} shrink-0`}>{categories.length} Selected</span>
          </div>
          <div className="grid grid-cols-2 gap-2 px-8 py-2">
            <button type="button" onClick={toggleAll} className={pill(allSelected)}>
              <span>All</span>
              {allSelected && <Tick />}
            </button>
            {SUBSCRIBE_CATEGORIES.map((c) => {
              const active = categories.includes(c.slug)
              return (
                <button type="button" key={c.slug} onClick={() => toggleCategory(c.slug)} className={pill(active)}>
                  <span className="truncate">{c.label}</span>
                  {active && <Tick />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Source Preference */}
        <div className="border-b border-black/10 pb-8">
          <div className="flex flex-col gap-2 px-8 pb-2 pt-8">
            <p className="text-[18px] font-medium text-black">Source Preference</p>
            <p className="text-[15px] text-black">Choose how broadly we should curate.</p>
          </div>
          <div className="flex flex-col gap-2 px-8">
            {SOURCE_PREFERENCES.map((s) => {
              const active = source === s.id
              return (
                <button type="button" key={s.id} onClick={() => { triggerHaptic('light'); setSource(s.id) }} className={optBox(active)}>
                  <p className={headline}>{s.label}</p>
                  <p className={desc}>{s.desc}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Claim your edition */}
        <div className="flex flex-col gap-4">
          <div className="px-8 pb-4 pt-8">
            <h3 className="text-[22px] font-semibold text-black">Claim your edition</h3>
          </div>
          <div className="flex flex-col gap-6">
            <label className="flex flex-col gap-3 px-8">
              <span className="text-[15px] text-[#1c1c1e]">Your preferred name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="rounded-[12px] border border-black/10 py-[15px] pl-6 pr-8 text-[16px] text-[#1c1c1e] outline-none transition-colors placeholder:text-[#6b6b73] focus:border-[#7900d9]"
              />
            </label>
            <label className="flex flex-col gap-3 px-8">
              <span className="text-[15px] text-[#1c1c1e]">Your email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="rounded-[12px] border border-black/10 py-[15px] pl-6 pr-8 text-[16px] text-[#1c1c1e] outline-none transition-colors placeholder:text-[#6b6b73] focus:border-[#7900d9]"
              />
            </label>

            {status.state === 'error' && <p className="px-8 text-[14px] text-red-500">{status.msg}</p>}

            <div className="px-8 pb-2">
              <button
                type="submit"
                disabled={status.state === 'loading'}
                className="w-full rounded-[12px] bg-[#7900d9] py-[15px] text-[16px] font-semibold text-white transition-colors hover:bg-[#6800ba] disabled:opacity-60"
              >
                {status.state === 'loading' ? 'SUBSCRIBING…' : 'SUBSCRIBE'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
