import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Shared reading-view navigation used by BOTH the category articles and the
// case studies, so the swipe-card + prev/next + browse experience is universal.
const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }
const SANS = { fontFamily: "'Roboto', system-ui, sans-serif" }

// A draggable "swipe card" wrapper around the open article/case. Works with both
// touch and mouse; drag past the threshold (or flick) to go prev/next. Vertical
// scrolling still works (touch-pan-y + dragDirectionLock). Honours reduced motion.
export function SwipeCard({ id, enterX = 44, reduce = false, onNext, onPrev, children }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.article
        key={id}
        className="min-w-0 touch-pan-y select-none lg:select-text"
        drag={reduce ? false : 'x'}
        dragDirectionLock
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={(e, info) => {
          if (info.offset.x <= -70 || info.velocity.x < -480) onNext?.()
          else if (info.offset.x >= 70 || info.velocity.x > 480) onPrev?.()
        }}
        whileDrag={{ cursor: 'grabbing' }}
        initial={{ opacity: 0, x: enterX }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: reduce ? 0 : -enterX }}
        transition={reduce ? { duration: 0.2 } : { duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.article>
    </AnimatePresence>
  )
}

// Small "swipe · N / total" affordance shown above the article on phones.
export function SwipeHint({ index, total }) {
  return (
    <div className="mb-5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-gray-400 lg:hidden" style={SANS}>
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      Swipe
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <span className="ml-1 text-gray-300">·</span>
      <span className="text-[#b8860b]">{index + 1} / {total}</span>
    </div>
  )
}

// Inline previous/next pager shown at the end of an article/case.
export function ReadNav({ prev, next, onPrev, onNext }) {
  if (!prev && !next) return null
  return (
    <div className="mt-12 grid gap-3 border-t border-gray-200 pt-6 sm:grid-cols-2" style={SANS}>
      {prev ? (
        <button onClick={onPrev} className="flex flex-col items-start rounded-2xl border border-gray-200 bg-white p-4 text-left transition-colors hover:border-gray-300">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#b8860b]">&larr; Previous</span>
          <span className="mt-1 line-clamp-2 text-[14px] font-semibold text-gray-800" style={SERIF}>{prev.headline}</span>
        </button>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <button onClick={onNext} className="flex flex-col items-end rounded-2xl border border-gray-200 bg-white p-4 text-right transition-colors hover:border-gray-300">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#b8860b]">Next &rarr;</span>
          <span className="mt-1 line-clamp-2 text-[14px] font-semibold text-gray-800" style={SERIF}>{next.headline}</span>
        </button>
      ) : (
        <span className="hidden sm:block" />
      )}
    </div>
  )
}

// Fixed bottom toolbar on phones: previous · browse · next (thumb-reach zone).
export function MobileReadBar({ prev, next, onPrev, onNext, onBrowse, label = 'Browse' }) {
  const arrow = 'flex h-11 w-11 items-center justify-center rounded-full text-[#5e1730] transition-colors hover:bg-white/60 disabled:opacity-30'
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden" style={SANS}>
      {/* Liquid-glass bar: translucent, blurred, with a soft top sheen + edge highlight. */}
      <div className="mx-auto flex max-w-sm items-center justify-between gap-2 rounded-full border border-white/60 bg-gradient-to-b from-white/55 to-white/20 p-1.5 shadow-[0_10px_34px_rgba(17,24,39,0.22)] ring-1 ring-black/[0.04] backdrop-blur-2xl backdrop-saturate-150">
        <button onClick={onPrev} disabled={!prev} aria-label="Previous" className={arrow}>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button onClick={onBrowse} className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/30 bg-[#7b1e3b]/90 px-4 text-[13px] font-semibold uppercase tracking-wide text-white shadow-sm backdrop-blur-md transition-colors hover:bg-[#5e1730]">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          {label}
        </button>
        <button onClick={onNext} disabled={!next} aria-label="Next" className={arrow}>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  )
}

// Bottom sheet listing every story/case for quick jumping (phones).
export function BrowseSheet({ open, onClose, items, currentId, onPick, title = 'All stories' }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="absolute inset-x-0 bottom-0 max-h-[82dvh] overflow-auto rounded-t-3xl border-t border-gray-200 bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            style={SANS}
          >
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-gray-200" />
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[18px] font-bold text-gray-900" style={SERIF}>{title}</h3>
              <button onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {items.map((a) => (
                <button
                  key={a.id}
                  onClick={() => onPick(a)}
                  className={`rounded-xl border p-3 text-left transition-colors ${a.id === currentId ? 'border-[#7b1e3b] bg-[#fff0d6]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                >
                  <h4 className="line-clamp-2 text-[14px] font-bold leading-snug text-gray-900" style={SERIF}>{a.headline}</h4>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
