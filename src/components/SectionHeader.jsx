import React from 'react'
import { Link } from 'react-router-dom'

// One editorial section header used across the site: accent overline + serif H2,
// optional standfirst, and an optional "see all" link. Keeps headers consistent.
const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }
const SANS = { fontFamily: "'Roboto', system-ui, sans-serif" }

export default function SectionHeader({ overline, title, sub, to, linkLabel, accent = '#d81b60' }) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        {overline && (
          <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ ...SANS, color: accent }}>
            ✦&ensp;{overline}&ensp;✦
          </span>
        )}
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-[40px]" style={SERIF}>
          {title}
        </h2>
        {sub && <p className="mt-2 max-w-2xl text-[15px] text-gray-600 sm:text-base" style={SANS}>{sub}</p>}
      </div>
      {to && linkLabel && (
        <Link
          to={to}
          className="group hidden shrink-0 items-center gap-1.5 whitespace-nowrap pb-2 text-[13px] font-semibold text-[#7b1e3b] transition-colors hover:text-[#d81b60] sm:inline-flex"
          style={SANS}
        >
          {linkLabel}
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      )}
    </div>
  )
}
