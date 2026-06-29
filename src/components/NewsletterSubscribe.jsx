import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { triggerHaptic } from '../utils/haptics'
import { subscribeNewsletter } from '../lib/subscribeApi'
import {
  SUBSCRIBE_CATEGORIES,
  RHYTHMS,
  WEEKDAYS,
} from '../lib/subscribeOptions'
import EditionPreview from './EditionPreview'
import Petals from './Petals'

// Figma-exact "Build your edition" form (node 1:1512). Palette: white, black,
// #7900d9, with the #f4e9ff selected tint. Roboto throughout.
const SANS = { fontFamily: "'Roboto', system-ui, sans-serif" }

const CalendarIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="3" y="5" width="18" height="16" rx="2.5" />
    <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
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
      ? `Weekly, ${WEEKDAYS.find((w) => w.id === days[0])?.label || ''}`
      : RHYTHMS.find((r) => r.id === rhythm)?.label

  // Weekly is a single day — selecting one replaces the previous choice.
  const selectDay = (id) => {
    triggerHaptic('light')
    setDays([id])
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

  // ---- desi-maximalism tokens (jewel + gold on warm ivory) ----
  const chip = (active) =>
    `rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
      active ? 'bg-[#fff0d6] border-[#d81b60] text-[#7b1e3b]' : 'bg-white border-[#c9a227]/35 text-gray-700 hover:border-[#c9a227]/70'
    }`
  const inputCls =
    'w-full rounded-[12px] border border-[#c9a227]/35 px-4 py-3 text-[15px] text-[#1c1c1e] outline-none transition-colors placeholder:text-[#6b6b73] focus:border-[#d81b60]'
  const summaryBadge = 'rounded-full bg-[#fff0d6] px-3 py-1 text-[13px] font-medium text-[#7b1e3b]'

  if (status.state === 'success') {
    return (
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="lg:sticky lg:top-24 lg:self-start"><EditionPreview rhythm={rhythm} days={days} categories={categories} name={name} summary={summary} /></div>
        <div className="desi-frame relative overflow-hidden rounded-[24px] bg-[#fffdf5] p-8 text-center sm:p-10" style={SANS}>
          <Petals />
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff0d6] text-[#d81b60]">
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
        <EditionPreview rhythm={rhythm} days={days} categories={categories} name={name} summary={summary} />
      </div>

      {/* RIGHT — compact desi builder card */}
      <form onSubmit={onSubmit} className="desi-frame rounded-[24px] bg-[#fffdf5] p-6 sm:p-7" style={SANS}>
        {/* Header + live summary */}
        <div className="flex flex-wrap items-center gap-3">
          <CalendarIcon className="h-5 w-5 text-[#b8860b]" />
          <h3 className="text-[20px] font-bold text-gray-900" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            Build your edition
          </h3>
          {summary && <span className={`${summaryBadge} ml-auto`}>{summary}</span>}
        </div>

        {/* Delivery rhythm — segmented toggle + inline day chips */}
        <div className="mt-5">
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#b8860b]">Delivery rhythm</p>
          <div className="mt-2 inline-flex rounded-full border border-[#c9a227]/40 bg-white p-1">
            {RHYTHMS.map((r) => {
              const active = rhythm === r.id
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => { triggerHaptic('light'); setRhythm(r.id) }}
                  className={`rounded-full px-6 py-2 text-[14px] font-semibold transition-colors ${active ? 'text-white' : 'text-[#7b1e3b] hover:text-[#d81b60]'}`}
                  style={active ? { background: '#7b1e3b' } : undefined}
                >
                  {r.label}
                </button>
              )
            })}
          </div>

          <AnimatePresence initial={false}>
            {rhythm === 'weekly' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="mt-3 text-[13px] text-gray-500">Arrives on</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {WEEKDAYS.map((w) => (
                    <button key={w.id} type="button" onClick={() => selectDay(w.id)} className={chip(days[0] === w.id)}>
                      {w.label.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Categories — compact chips */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#b8860b]">Categories</p>
            <span className="text-[12px] text-gray-500">{categories.length} selected</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <button type="button" onClick={toggleAll} className={chip(allSelected)}>All</button>
            {SUBSCRIBE_CATEGORIES.map((c) => (
              <button key={c.slug} type="button" onClick={() => toggleCategory(c.slug)} className={chip(categories.includes(c.slug))}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Claim — name + email side by side */}
        <div className="mt-6">
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#b8860b]">Claim your edition</p>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={inputCls}
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className={inputCls}
            />
          </div>
        </div>

        {status.state === 'error' && <p className="mt-3 text-[13px] text-red-500">{status.msg}</p>}

        <button
          type="submit"
          disabled={status.state === 'loading'}
          className="mt-5 w-full rounded-full border border-[#c9a227] bg-[#7b1e3b] py-3 text-[15px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#5e1730] disabled:opacity-60"
        >
          {status.state === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
    </div>
  )
}
