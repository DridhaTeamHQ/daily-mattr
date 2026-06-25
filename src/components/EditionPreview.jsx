import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NEWSLETTER_THEMES } from '../lib/newsletterThemes'
import { SOURCE_PREFERENCES } from '../lib/subscribeOptions'

// Live preview of the edition the reader is building. Reacts to rhythm / days /
// categories / source / name as they select on the left.
// Palette: white, black, and #7900D9 only.
const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }
const SANS = { fontFamily: "'Roboto', system-ui, sans-serif" }
const PURPLE = '#7900D9'

const themeBySlug = Object.fromEntries(NEWSLETTER_THEMES.map((t) => [t.slug, t]))
const DAY_IDS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const DAY_SHORT = { mon: 'M', tue: 'T', wed: 'W', thu: 'T', fri: 'F', sat: 'S', sun: 'S' }

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
  const lit = litDays(rhythm, days)
  const sourceIdx = Math.max(0, SOURCE_PREFERENCES.findIndex((s) => s.id === source))
  const breadth = sourceIdx + 1
  const wrapWord = rhythm === 'monthly' ? 'Monthly' : rhythm === 'weekly' ? 'Weekly' : rhythm === 'bi-weekly' ? 'Bi-Weekly' : 'Daily'

  return (
    <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-[#fbf7f0] shadow-[0_24px_60px_-24px_rgba(121,0,217,0.4)]">
      {/* Masthead — solid #7900D9 */}
      <div className="relative overflow-hidden px-6 pb-9 pt-7 text-white" style={{ background: PURPLE }}>
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.4px)', backgroundSize: '16px 16px' }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="pointer-events-none absolute -right-8 -top-8"
        >
          <Mandala className="h-32 w-32 text-white/20" />
        </motion.div>

        <div className="relative">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80" style={SANS}>
            Daily Mattr Edition
          </div>
          <h3 className="mt-1 text-[26px] font-extrabold leading-tight" style={SERIF}>
            Your {wrapWord} Wrap
          </h3>
          <p className="mt-1 text-sm text-white/90" style={SANS}>
            Hello, {name?.trim() || 'Reader'}
          </p>
          <span className="mt-3 inline-block rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#7900D9]" style={SANS}>
            {summary || 'Daily'}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-6 p-6" style={SANS}>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">In this edition</p>
          <div className="mt-2 flex flex-wrap gap-2">
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
                    className="rounded-full bg-[#7900D9] px-3 py-1.5 text-[12px] font-semibold text-white"
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
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">When it lands</p>
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
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold ${on ? 'bg-[#7900D9] text-white' : 'bg-black/[0.05] text-gray-400'}`}
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
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Curation breadth</p>
          <div className="mt-2 flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: i < breadth ? 1 : 0.12 }}
                className="h-2 flex-1 rounded-full"
                style={{ background: i < breadth ? PURPLE : '#000' }}
              />
            ))}
          </div>
          <p className="mt-1 text-xs text-gray-500">{SOURCE_PREFERENCES[sourceIdx]?.label}</p>
        </div>
      </div>
    </div>
  )
}
