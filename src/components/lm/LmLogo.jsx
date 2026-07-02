import React from 'react'
import { Link } from 'react-router-dom'

// "DailyMattr'." wordmark — Playfair mixed weights per Figma node 1:413.
// size="nav" (24/32px) or scale via className on the wrapper.
const pf = { fontVariationSettings: '"opsz" 12, "wdth" 100' }

export default function LmLogo({ className = '', to = '/' }) {
  return (
    <Link to={to} className={`inline-block whitespace-nowrap leading-none select-none ${className}`} aria-label="Daily Mattr home">
      <span className="font-playfair font-extrabold text-[24px] tracking-[-1.2px] text-lm-800" style={pf}>Daily</span>
      <span className="font-playfair font-black text-[32px] tracking-[-1.6px] text-lm-800" style={pf}>Ma</span>
      <span className="font-playfair font-black text-[32px] tracking-[-2.56px] text-lm-800" style={pf}>tt</span>
      <span className="font-playfair font-black text-[32px] text-lm-800" style={pf}>r</span>
      <span className="font-playfair font-black text-[32px] text-lm-500" style={pf}>’</span>
      <span className="font-playfair font-black text-[32px] text-lm-800" style={pf}>.</span>
    </Link>
  )
}
