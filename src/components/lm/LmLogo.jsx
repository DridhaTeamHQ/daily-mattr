import React from 'react'
import { Link } from 'react-router-dom'

// The brand wordmark: "dailymattr" — lowercase Playfair in brand blue, wrapped
// in raised quote marks (Figma "Dailymattr — Landing page", blue #3979FF, the
// same blue as the News Studio filter pill).
//
// Everything inside is sized in `em`, so ONE font-size on the wrapper scales
// the whole lockup — the nav uses 30px, the footer brand block ~52px, and the
// giant footer crop uses a vw size. Colour is a wrapper class too, so a dark
// surface can pass a lighter blue.
const pf = { fontVariationSettings: '"opsz" 12, "wdth" 100' }

export function LmWordmark({ className = '' }) {
  return (
    <span className={`font-playfair font-black leading-none tracking-[-0.02em] ${className}`} style={pf}>
      {/* Straight (not curly) quote marks, riding high against the ascenders —
          matching the Figma lockup */}
      <span className="text-[0.62em] align-top leading-none">&quot;</span>
      dailymattr
      <span className="text-[0.62em] align-top leading-none">&quot;</span>
    </span>
  )
}

export default function LmLogo({ className = '', to = '/', tone = 'light' }) {
  // On near-black surfaces the pill blue reads dim, so the lockup steps up to
  // the lighter end of the brand gradient.
  const color = tone === 'dark' ? 'text-[#5D93FF]' : 'text-[#3979FF]'
  return (
    <Link
      to={to}
      aria-label="dailymattr home"
      className={`inline-block select-none whitespace-nowrap text-[30px] leading-none transition-opacity hover:opacity-80 ${color} ${className}`}
    >
      <LmWordmark />
    </Link>
  )
}
