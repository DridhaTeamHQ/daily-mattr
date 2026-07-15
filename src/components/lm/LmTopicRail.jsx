import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Trending-topic rail for the General feed — a horizontal strip of light white
// cards, each a cluster the agent has approved. Tapping a card opens the
// full-screen timeline (LmTopicTimeline). Cards enter with a keyed remount
// (initial -> animate) — deliberately no AnimatePresence exits, matching the
// rest of the app (see LmReader / LmBreakingCarousel).
const rb = { fontVariationSettings: '"wdth" 100' }

function latestDate(topic) {
  // memberIds carry no timestamps; fall back to the topic's approved_at so the
  // meta line still reads a real "latest" moment.
  const iso = topic?.approvedAt
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function TopicCard({ topic, onOpen }) {
  const count = topic?.memberIds?.length || 0
  const when = latestDate(topic)
  const dots = Math.min(count, 6)
  return (
    <motion.button
      key={topic.id}
      type="button"
      onClick={() => onOpen?.(topic)}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex w-[258px] shrink-0 snap-start flex-col gap-[16px] overflow-hidden rounded-[18px] border border-[rgba(28,28,30,0.1)] bg-white p-[18px] text-left transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:border-lm-800 hover:shadow-[0px_16px_40px_rgba(0,0,0,0.10)] sm:w-[296px]"
      title={topic.title}
    >
      {/* accent bar that draws in from the left on hover */}
      <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-lm-800 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
      <div className="flex items-center justify-between">
        <span
          className="inline-flex items-center gap-[6px] rounded-full bg-lm-800 px-[10px] py-[3px] font-roboto text-[10px] font-bold uppercase tracking-[0.07em] text-white"
          style={rb}
        >
          <span className="size-[5px] animate-pulse rounded-full bg-[#E33B3B]" />
          Trending
        </span>
        <span className="font-roboto text-[16px] leading-none text-lm-300 transition-all duration-300 group-hover:translate-x-[3px] group-hover:text-lm-800">↗</span>
      </div>
      <h3 className="line-clamp-3 font-roboto text-[19px] font-bold leading-[1.28] text-black sm:text-[21px]" style={rb}>
        {topic.title}
      </h3>
      <div className="mt-auto flex flex-col gap-[10px]">
        {/* a little timeline: one dot per story, filling in on hover */}
        <div className="flex items-center gap-[5px]">
          {Array.from({ length: dots }).map((_, i) => (
            <span
              key={i}
              className="size-[5px] rounded-full bg-lm-200 transition-colors duration-300 group-hover:bg-lm-800"
              style={{ transitionDelay: `${i * 45}ms` }}
            />
          ))}
          {count > dots && <span className="font-roboto text-[11px] font-medium text-lm-400" style={rb}>+{count - dots}</span>}
        </div>
        <div className="flex items-center justify-between">
          <span className="font-roboto text-[11px] font-semibold uppercase tracking-[0.06em] text-lm-400" style={rb}>
            {count} {count === 1 ? 'story' : 'stories'}{when ? ` · ${when}` : ''}
          </span>
          <span className="font-roboto text-[12px] font-semibold text-lm-400 transition-colors duration-200 group-hover:text-lm-800" style={rb}>
            View&nbsp;timeline
          </span>
        </div>
      </div>
    </motion.button>
  )
}

export default function LmTopicRail({ topics = [], onOpen }) {
  const scrollerRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  // Track scroll position so we can enable/disable the arrows and fade the edge
  // masks — the arrows only make sense while there's more to scroll to.
  const sync = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setAtStart(el.scrollLeft <= 1)
    setAtEnd(el.scrollLeft >= max - 1)
  }, [])

  useEffect(() => {
    sync()
    const el = scrollerRef.current
    if (!el) return
    el.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      el.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [sync, topics.length])

  const nudge = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    // Scroll by roughly one card-and-a-bit so a click always reveals fresh cards.
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 320), behavior: 'smooth' })
  }

  if (!topics.length) return null
  const hasOverflow = !atStart || !atEnd

  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-8">
      <div className="mb-[16px] flex items-center gap-[16px]">
        <h2 className="whitespace-nowrap font-roboto text-[18px] font-bold leading-[44px] text-[#0F0F11] sm:text-[24px] sm:leading-[64px]" style={rb}>
          Trending topics
        </h2>
        <div className="h-px flex-1 bg-lm-400" />
        {/* Arrow controls — only shown when the rail actually overflows */}
        {hasOverflow && (
          <div className="hidden shrink-0 items-center gap-[8px] sm:flex">
            <button
              type="button"
              onClick={() => nudge(-1)}
              disabled={atStart}
              aria-label="Scroll trending topics left"
              className={`flex size-[38px] items-center justify-center rounded-full border transition-all duration-200 ${
                atStart
                  ? 'cursor-not-allowed border-lm-200 text-lm-300'
                  : 'border-lm-300 text-lm-800 hover:-translate-x-[1px] hover:border-lm-800 hover:shadow-[0px_6px_16px_rgba(0,0,0,0.08)]'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3.5 5.5 8l4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              disabled={atEnd}
              aria-label="Scroll trending topics right"
              className={`flex size-[38px] items-center justify-center rounded-full border transition-all duration-200 ${
                atEnd
                  ? 'cursor-not-allowed border-lm-200 text-lm-300'
                  : 'border-lm-300 text-lm-800 hover:translate-x-[1px] hover:border-lm-800 hover:shadow-[0px_6px_16px_rgba(0,0,0,0.08)]'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        )}
      </div>
      <div className="relative">
        {/* Edge fade masks hint at more content beyond the visible edge */}
        <div className={`pointer-events-none absolute inset-y-0 left-0 z-[1] w-[36px] bg-gradient-to-r from-lm-50 to-transparent transition-opacity duration-300 ${atStart ? 'opacity-0' : 'opacity-100'}`} aria-hidden="true" />
        <div className={`pointer-events-none absolute inset-y-0 right-0 z-[1] w-[36px] bg-gradient-to-l from-lm-50 to-transparent transition-opacity duration-300 ${atEnd ? 'opacity-0' : 'opacity-100'}`} aria-hidden="true" />
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-[8px] overflow-x-auto scroll-smooth pb-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {topics.map((t) => (
            <TopicCard key={t.id} topic={t} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  )
}
