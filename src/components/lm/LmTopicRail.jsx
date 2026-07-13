import React from 'react'
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
  return (
    <motion.button
      key={topic.id}
      type="button"
      onClick={() => onOpen?.(topic)}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-[280px] shrink-0 snap-start flex-col gap-[12px] rounded-[16px] border border-[rgba(28,28,30,0.1)] bg-white p-[18px] text-left transition-shadow hover:shadow-[0px_10px_30px_rgba(0,0,0,0.07)] sm:w-[320px]"
      title={topic.title}
    >
      <span
        className="self-start rounded-[100px] bg-[rgba(153,51,255,0.1)] px-[12px] py-[6px] font-roboto text-[11px] font-bold uppercase tracking-wide text-[#7900D9]"
        style={rb}
      >
        Trending
      </span>
      <h3 className="line-clamp-2 font-roboto text-[19px] font-bold leading-[1.3] text-black sm:text-[21px]" style={rb}>
        {topic.title}
      </h3>
      <p className="mt-auto font-bevietnam text-[13px] text-lm-500">
        {count} {count === 1 ? 'story' : 'stories'}
        {when ? <> · latest {when}</> : null}
      </p>
    </motion.button>
  )
}

export default function LmTopicRail({ topics = [], onOpen }) {
  if (!topics.length) return null
  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-8">
      <div className="mb-[16px] flex items-center gap-[16px]">
        <h2 className="whitespace-nowrap font-roboto text-[18px] font-bold leading-[44px] text-[#0F0F11] sm:text-[24px] sm:leading-[64px]" style={rb}>
          Trending topics
        </h2>
        <div className="h-px flex-1 bg-lm-400" />
      </div>
      <div className="flex snap-x snap-mandatory gap-[8px] overflow-x-auto pb-[8px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {topics.map((t) => (
          <TopicCard key={t.id} topic={t} onOpen={onOpen} />
        ))}
      </div>
    </section>
  )
}
