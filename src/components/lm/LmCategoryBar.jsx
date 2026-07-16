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

// Morphing search (adapted from a Uiverse concept by fanishah, rebuilt on
// framer-motion in the LONG MATTR glass language): idle, the input shrinks into
// the LENS of a magnifier (thick dark inset ring) and the button is the rotated
// HANDLE. Focused — or while holding text — the lens unfolds into a glass input
// and the handle unrolls into a #3979FF gradient pill with a magnifier glyph.
const searchSpring = { type: 'spring', stiffness: 420, damping: 34 }

function LmSearch({ value = '', onSearch }) {
  const [focused, setFocused] = React.useState(false)
  const inputRef = React.useRef(null)
  const open = focused || value.trim().length > 0
  return (
    <form
      className={`ml-auto flex shrink-0 items-center ${open ? '' : 'cursor-pointer'}`}
      role="search"
      onSubmit={(e) => e.preventDefault()}
      // The idle magnifier is visually tiny (scaled-down lens + handle), so the
      // WHOLE form area acts as its hit target.
      onClick={() => { if (!open) inputRef.current?.focus() }}
    >
      <motion.input
        ref={inputRef}
        type="search"
        autoComplete="off"
        placeholder="Search stories…"
        aria-label="Search stories"
        value={value}
        onChange={(e) => onSearch?.(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) => { if (e.key === 'Escape') { onSearch?.(''); e.currentTarget.blur() } }}
        initial={false}
        animate={{
          width: open ? 200 : 39,
          scale: open ? 1 : 0.5,
          x: open ? 0 : 10,
          borderRadius: open ? '20px 0px 0px 20px' : '20px',
          backgroundColor: open ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0)',
          boxShadow: open
            ? 'inset 0 0 0 1px rgba(15,15,17,0.12), 0 2px 12px rgba(15,15,17,0.06)'
            : 'inset 0 0 0 4.5px #0F0F11',
        }}
        transition={searchSpring}
        className="h-[39px] min-w-0 border-0 bg-transparent px-[13px] font-bevietnam text-[13px] font-medium text-[#0F0F11] outline-none placeholder:text-lm-400 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
        style={{ transformOrigin: '100% 50%', backdropFilter: 'blur(12px)', appearance: 'none', WebkitAppearance: 'none' }}
      />
      <motion.button
        type="submit"
        aria-label="Search"
        onClick={(e) => { e.preventDefault(); e.currentTarget.previousSibling?.focus?.() }}
        initial={false}
        animate={{
          rotate: open ? 0 : 45,
          scaleX: open ? 1 : 0.28,
          scaleY: open ? 1 : 0.14,
          x: open ? 0 : -8,
          borderRadius: open ? '0px 20px 20px 0px' : '4px',
          background: open ? 'linear-gradient(180deg,#5D93FF,#3979FF)' : 'linear-gradient(180deg,#0F0F11,#0F0F11)',
          boxShadow: open ? '0 4px 14px rgba(57,121,255,0.4), inset 0 1px 0 rgba(255,255,255,0.35)' : '0 0 0 rgba(0,0,0,0)',
        }}
        transition={searchSpring}
        className="flex h-[39px] w-[42px] shrink-0 cursor-pointer items-center justify-center border-0"
        style={{ transformOrigin: '0% 50%' }}
      >
        {/* Magnifier glyph fades in once the pill unrolls */}
        <motion.svg
          width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
          initial={false}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.18 }}
        >
          <circle cx="6.8" cy="6.8" r="4.6" stroke="#fff" strokeWidth="1.9" />
          <path d="M10.4 10.4 14 14" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" />
        </motion.svg>
      </motion.button>
    </form>
  )
}

export default function LmCategoryBar({ active, filter = 'all', onFilter, showFilter = true, filters = FILTERS, title, search, onSearch }) {
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
        {onSearch && <LmSearch value={search} onSearch={onSearch} />}
      </div>
    </div>
  )
}
