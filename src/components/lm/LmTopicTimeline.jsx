import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import LmReader from './LmReader'
import { FactChip } from './LmFactBadge'
import { fetchArticlesByIds } from '../../lib/content'

// Full-screen "trending topic → timeline" overlay. Opened from LmTopicRail with
// a topic; fetches the topic's member articles, orders them oldest-first, and
// lays them out as a vertical timeline grouped by day. Tapping an entry opens
// the shared LmReader on top, scoped to this topic's stories.
// Entry/exit uses a keyed remount (initial -> animate) — deliberately no
// AnimatePresence exits, matching LmReader / LmBreakingCarousel.
const rb = { fontVariationSettings: '"wdth" 100' }
const IST = 'Asia/Kolkata'

const dayKey = (iso) => new Date(iso).toLocaleDateString('en-IN', { timeZone: IST })
const ordinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}
function dayLabel(iso) {
  const d = new Date(iso)
  const today = dayKey(new Date().toISOString()) === dayKey(iso)
  const day = Number(d.toLocaleDateString('en-IN', { timeZone: IST, day: 'numeric' }))
  const month = d.toLocaleDateString('en-IN', { timeZone: IST, month: 'long' })
  const year = d.toLocaleDateString('en-IN', { timeZone: IST, year: 'numeric' })
  const weekday = d.toLocaleDateString('en-IN', { timeZone: IST, weekday: 'long' })
  return `${today ? 'Today' : weekday}, ${ordinal(day)} ${month}, ${year}`
}

export default function LmTopicTimeline({ topic, onClose }) {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [readerIdx, setReaderIdx] = useState(null)

  // Fetch the topic's member articles once (members can predate the main feed
  // window, so this dedicated by-id fetch is required).
  useEffect(() => {
    let alive = true
    setLoading(true)
    const ids = topic?.memberIds || []
    fetchArticlesByIds(ids)
      .then((rows) => {
        if (!alive) return
        // Oldest first — a timeline reads forward in time.
        const sorted = [...rows].sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt))
        setMembers(sorted)
      })
      .catch(() => { if (alive) setMembers([]) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [topic?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Escape closes the timeline — but only when the reader isn't the top layer
  // (the reader handles its own Escape).
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && readerIdx == null) onClose?.()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [readerIdx, onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Group members by day (already oldest-first, so groups come out ascending).
  const groups = useMemo(() => {
    const byDay = new Map()
    for (const it of members) {
      if (!it.publishedAt) continue
      const k = dayKey(it.publishedAt)
      if (!byDay.has(k)) byDay.set(k, [])
      byDay.get(k).push(it)
    }
    return [...byDay.entries()].map(([k, arr]) => ({ key: k, label: dayLabel(arr[0].publishedAt), items: arr }))
  }, [members])

  return (
    <motion.div
      className="fixed inset-0 z-[95] flex flex-col bg-white"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="relative flex items-center justify-between border-b border-lm-200 px-4 py-[12px] sm:px-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close timeline"
          className="flex size-[36px] items-center justify-center rounded-full border border-lm-300 text-[20px] leading-none text-lm-800 transition-colors hover:bg-lm-50"
        >
          ×
        </button>
        <p className="pointer-events-none absolute inset-x-0 mx-auto max-w-[72%] truncate text-center font-roboto text-[11px] font-bold uppercase tracking-[0.14em] text-lm-500" style={rb}>
          <span className="text-lm-800">{topic?.title}</span>
          <span className="px-[8px] text-lm-300">·</span>
          Timeline
        </p>
        <span className="w-[36px]" />
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 pb-[80px] pt-[28px] sm:px-8">
        <div className="mx-auto w-full max-w-[720px]">
          {loading ? (
            <div className="flex items-center justify-center gap-[12px] py-[80px]">
              <motion.span
                className="size-[22px] rounded-full border-[3px] border-lm-200 border-t-lm-800"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
              />
              <span className="font-roboto text-[16px] text-lm-500" style={rb}>Loading timeline…</span>
            </div>
          ) : members.length === 0 ? (
            <div className="py-[80px] text-center font-roboto text-[18px] text-lm-500" style={rb}>
              No stories yet — check back soon.
            </div>
          ) : (
            <>
              {topic?.description && (
                <p className="mb-[28px] font-roboto text-[18px] leading-[1.6] text-lm-700 sm:text-[19px]" style={rb}>
                  {topic.description}
                </p>
              )}
              <div className="relative border-l border-lm-200 pl-[24px] sm:pl-[32px]">
                {groups.map((g) => (
                  <div key={g.key} className="mb-[8px]">
                    {/* Day label */}
                    <div className="relative mb-[12px] pt-[4px]">
                      <span className="absolute -left-[24px] top-[10px] size-[9px] -translate-x-1/2 rounded-full bg-lm-800 ring-4 ring-white sm:-left-[32px]" />
                      <p className="font-roboto text-[13px] font-bold uppercase tracking-[0.14em] text-lm-500" style={rb}>
                        {g.label}
                      </p>
                    </div>
                    {/* Entries for the day */}
                    <div className="flex flex-col gap-[8px] pb-[24px]">
                      {g.items.map((it) => {
                        const idx = members.findIndex((m) => m.id === it.id)
                        return (
                          <button
                            key={it.id}
                            type="button"
                            onClick={() => setReaderIdx(idx)}
                            className="group relative rounded-[16px] border border-[rgba(28,28,30,0.1)] bg-white p-[16px] text-left transition-shadow hover:shadow-[0px_10px_30px_rgba(0,0,0,0.07)] sm:p-[18px]"
                          >
                            <span className="absolute -left-[24px] top-[24px] size-[7px] -translate-x-1/2 rounded-full bg-lm-300 ring-4 ring-white transition-colors group-hover:bg-lm-800 sm:-left-[32px]" />
                            <h3 className="font-roboto text-[19px] font-bold leading-[1.3] text-black sm:text-[21px]" style={rb}>
                              {it.headline}
                            </h3>
                            {(it.summary || it.body) && (
                              <p className="mt-[8px] line-clamp-2 font-roboto text-[15px] leading-[24px] text-lm-500" style={rb}>
                                {it.body || it.summary}
                              </p>
                            )}
                            <div className="mt-[12px] flex flex-wrap items-center gap-[8px]">
                              {it.source && (
                                <span className="rounded-[100px] bg-black/5 px-[12px] py-[5px] font-roboto text-[12px] font-semibold text-lm-700" style={rb}>
                                  {it.source}
                                </span>
                              )}
                              <FactChip item={it} small />
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Reader overlay — scoped to this topic's members, on top of the timeline */}
      {readerIdx != null && readerIdx >= 0 && (
        <LmReader
          items={members}
          index={readerIdx}
          onIndex={setReaderIdx}
          onClose={() => setReaderIdx(null)}
        />
      )}
    </motion.div>
  )
}
