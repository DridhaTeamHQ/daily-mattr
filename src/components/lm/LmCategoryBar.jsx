import React from 'react'
import { motion } from 'framer-motion'

// Sticky reading toolbar — sits under the fixed nav. Liquid-glass treatment:
// the strip is translucent with heavy blur + saturation so stories scrolling
// beneath it refract through; the pill row is a frosted capsule with a bright
// inner top-edge highlight, and the ACTIVE pill is a glossy #3979FF lozenge
// that physically GLIDES between labels (framer `layoutId` shared element) —
// the liquid part. Default pills are the content-kind filters; pages can pass
// their own set via `filters` (News Studio uses topic sections) and a `title`
// wordmark (News Studio shows its name here since it has no hero).
const FILTERS = [
  ['all', 'All'],
  ['long', 'Long reads'],
  ['short', 'Briefs'],
  ['fact', 'Fact checked'],
]

const serif = { fontFamily: "Georgia, 'Times New Roman', serif" }

export default function LmCategoryBar({ active, filter = 'all', onFilter, showFilter = true, filters = FILTERS, title }) {
  if (!showFilter) return null

  return (
    <div className="sticky top-[70px] z-40 border-b border-white/30 bg-white/30 shadow-[0_8px_32px_rgba(15,15,17,0.05)] backdrop-blur-2xl backdrop-saturate-150">
      {/* top-edge light catch — the "glass lip" */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" aria-hidden="true" />
      {/* Scrollable on small screens so the pill row never forces page overflow */}
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-[14px] overflow-x-auto px-4 py-[12px] [scrollbar-width:none] sm:gap-[22px] sm:py-[14px] sm:px-8 lg:px-[32px] [&::-webkit-scrollbar]:hidden">
        {title && (
          // Masthead lockup, same language as the DailyMattr logo: quiet first
          // word, confident second, and a blue full-stop that ties the wordmark
          // to the active pill. "NewsStudio." reads as a sibling of "DailyMattr'."
          <h1 className="shrink-0 select-none whitespace-nowrap text-[21px] leading-none tracking-[-0.02em] sm:text-[24px]" style={serif}>
            <span className="font-normal text-lm-500">News</span>
            <span className="font-bold text-[#0F0F11]">Studio</span>
            <span className="font-bold text-[#3979FF]">.</span>
          </h1>
        )}
        <div className="relative flex shrink-0 items-center gap-[2px] rounded-[100px] border border-white/50 bg-white/35 p-[4px] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(15,15,17,0.04),0_2px_12px_rgba(15,15,17,0.05)] backdrop-blur-xl sm:gap-[4px] sm:p-[5px]">
          {filters.map(([id, label]) => {
            const isActive = filter === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => onFilter?.(id)}
                className={`relative whitespace-nowrap rounded-[100px] px-[13px] py-[7px] font-bevietnam text-[13px] font-semibold transition-colors duration-200 sm:px-[20px] sm:py-[9px] sm:text-[15px] ${
                  isActive ? 'text-white' : 'text-lm-600 hover:text-black'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="lm-filter-pill"
                    transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                    className="absolute inset-0 rounded-[100px] bg-gradient-to-b from-[#5D93FF] to-[#3979FF] shadow-[0_4px_14px_rgba(57,121,255,0.4),inset_0_1px_0_rgba(255,255,255,0.35)]"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-[1]">{label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
