import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NEWSLETTER_THEMES } from '../lib/newsletterThemes'
import { SOURCE_PREFERENCES } from '../lib/subscribeOptions'
import '../styles/desi.css'

// Live, desi-maximalist preview of the edition being built. The masthead tints to
// the most-recently-picked theme's jewel palette; mandalas spin, chips spring in,
// a jhalar hangs from the masthead, and the day-strip lights up in gold.
const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }
const SANS = { fontFamily: "'Roboto', system-ui, sans-serif" }

const themeBySlug = Object.fromEntries(NEWSLETTER_THEMES.map((t) => [t.slug, t]))
const DAY_IDS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const DAY_SHORT = { mon: 'M', tue: 'T', wed: 'W', thu: 'T', fri: 'F', sat: 'S', sun: 'S' }
const DEFAULT = { from: '#F4A300', to: '#D81B60', accent: '#F4A300' }

function Mandala({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="50" cy="50" r="46" />
      <circle cx="50" cy="50" r="32" />
      <circle cx="50" cy="50" r="18" />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i * Math.PI) / 8
        return <line key={i} x1="50" y1="50" x2={50 + 46 * Math.cos(a)} y2={50 + 46 * Math.sin(a)} />
      })}
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i * Math.PI) / 8
        return <circle key={`p${i}`} cx={50 + 32 * Math.cos(a)} cy={50 + 32 * Math.sin(a)} r="2.6" />
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4
        return <circle key={`q${i}`} cx={50 + 18 * Math.cos(a)} cy={50 + 18 * Math.sin(a)} r="1.8" />
      })}
    </svg>
  )
}

function litDays(rhythm, days) {
  if (rhythm === 'daily') return new Set(DAY_IDS)
  if (rhythm === 'weekly') return new Set(days)
  if (rhythm === 'bi-weekly') return new Set(['tue', 'fri'])
  return new Set() // monthly
}

export default function EditionPreview({ rhythm = 'daily', days = [], source = 'top', categories = [], name = '', summary = '' }) {
  const lead = categories.length ? themeBySlug[categories[categories.length - 1]] : null
  const d = lead?.desi || DEFAULT
  const grad = `linear-gradient(135deg, ${d.from}, ${d.to})`
  const accent = d.accent
  const lit = litDays(rhythm, days)
  const sourceIdx = Math.max(0, SOURCE_PREFERENCES.findIndex((s) => s.id === source))
  const breadth = sourceIdx + 1
  const wrapWord = rhythm === 'monthly' ? 'Monthly' : rhythm === 'weekly' ? 'Weekly' : rhythm === 'bi-weekly' ? 'Bi-Weekly' : 'Daily'

  return (
    <div className="desi-frame relative overflow-hidden rounded-3xl bg-[#fffdf5]">
      {/* Masthead — jewel gradient that crossfades to the latest theme */}
      <div className="relative overflow-hidden px-6 pb-10 pt-7 text-white">
        <AnimatePresence>
          <motion.div
            key={lead?.slug || 'default'}
            className="absolute inset-0"
            style={{ backgroundImage: grad }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        {/* block-print dot veil */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.4px)', backgroundSize: '18px 18px' }}
        />
        {/* spinning mandalas */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} className="pointer-events-none absolute -right-9 -top-9">
          <Mandala className="h-36 w-36 text-white/20" />
        </motion.div>
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 90, repeat: Infinity, ease: 'linear' }} className="pointer-events-none absolute -bottom-12 -left-10">
          <Mandala className="h-32 w-32 text-white/10" />
        </motion.div>

        <div className="relative">
          <div className="text-[10px] font-bold uppercase tracking-[0.32em]" style={{ ...SANS, color: accent }}>
            ✦ Daily Mattr Edition ✦
          </div>
          <h3 className="mt-1 text-[26px] font-extrabold leading-tight" style={{ ...SERIF, textShadow: '0 2px 18px rgba(0,0,0,0.3)' }}>
            Your {wrapWord} Wrap
          </h3>
          <div className="mt-2 h-[3px] w-20 rounded-full" style={{ background: accent }} />
          <p className="mt-2 text-sm text-white/90" style={SANS}>Namaste, {name?.trim() || 'Reader'}</p>
          <span className="mt-3 inline-block rounded-full px-3 py-1 text-[11px] font-bold text-[#3a1206]" style={{ ...SANS, background: accent }}>
            {summary || 'Daily'}
          </span>
        </div>

        {/* jhalar trim hanging from the masthead */}
        <div className="desi-jhalar absolute inset-x-0 bottom-0" style={{ '--jhalar': accent }} />
      </div>

      {/* Body */}
      <div className="space-y-6 p-6" style={SANS}>
        <div>
          <p className="desi-divider mb-3"><span className="desi-divider__motif">❖ In this edition ❖</span></p>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence mode="popLayout">
              {categories.map((slug) => {
                const t = themeBySlug[slug]
                if (!t) return null
                return (
                  <motion.span
                    key={slug}
                    layout
                    initial={{ opacity: 0, scale: 0.6, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                    className="rounded-full px-3 py-1.5 text-[12px] font-semibold text-white shadow-sm"
                    style={{ background: t.desi?.from || '#7900d9' }}
                  >
                    {t.label}
                  </motion.span>
                )
              })}
            </AnimatePresence>
            {categories.length === 0 && (
              <span className="text-[13px] text-gray-400">Pick your themes on the left →</span>
            )}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#c79a1e]">When it lands</p>
          {rhythm === 'monthly' ? (
            <p className="mt-2 text-sm text-gray-700">Once a month — one curated edition.</p>
          ) : (
            <div className="mt-2 flex items-center gap-1.5">
              {DAY_IDS.map((id) => {
                const on = lit.has(id)
                return (
                  <motion.span
                    key={id}
                    animate={{ scale: on ? 1 : 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold ${on ? 'text-white' : 'text-gray-400'}`}
                    style={{ background: on ? accent : 'rgba(0,0,0,0.05)' }}
                  >
                    {DAY_SHORT[id]}
                  </motion.span>
                )
              })}
            </div>
          )}
          {rhythm === 'bi-weekly' && <p className="mt-1 text-xs text-gray-500">Twice a week — Tuesday &amp; Friday.</p>}
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#c79a1e]">Curation breadth</p>
          <div className="mt-2 flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: i < breadth ? 1 : 0.15 }}
                className="h-2 flex-1 rounded-full"
                style={{ background: i < breadth ? accent : '#000' }}
              />
            ))}
          </div>
          <p className="mt-1 text-xs text-gray-500">{SOURCE_PREFERENCES[sourceIdx]?.label}</p>
        </div>
      </div>
    </div>
  )
}
