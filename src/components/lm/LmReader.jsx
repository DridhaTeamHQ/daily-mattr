import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { readTime } from '../../lib/readTime'
import { SLUG_LABEL } from '../../lib/content'
import { FactChip, FactPanel } from './LmFactBadge'

// Full-screen story reader — tap a card to enter, then swipe left/right
// (or arrow keys / prev-next pills) to move through the feed in order.
// Navigation uses plain keyed remounts (initial -> animate) — deliberately no
// AnimatePresence exits, which proved unreliable here.
const rb = { fontVariationSettings: '"wdth" 100' }
const SWIPE_DISTANCE = 80
const SWIPE_VELOCITY = 500

function dateLabel(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function LmReader({ items = [], index = 0, onIndex, onClose }) {
  const [dir, setDir] = useState(0)
  const [hinted, setHinted] = useState(false)
  // Reading mode — Original plus whatever alternate versions were generated at
  // approval time ({ eli5, tldr[], deep_dive, key_numbers[] }).
  const [mode, setMode] = useState('original')
  // 0..1 scroll progress of the CURRENT story, shown as the thin bar under the
  // header. Resets on every story change (the article remounts via key).
  const [progress, setProgress] = useState(0)
  const scrollRef = useRef(null)
  const item = items[index]
  const canPrev = index > 0
  const canNext = index < items.length - 1

  useEffect(() => {
    setMode('original')
    setProgress(0)
  }, [item?.id])

  const go = (delta) => {
    const next = index + delta
    if (next < 0 || next >= items.length) return
    setDir(delta)
    setHinted(true)
    onIndex(next)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, items.length]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!item) return null
  const long = item.kind === 'case_study' || item.kind === 'feature'

  const versions = item.versions || {}
  const MODES = [
    ['original', 'Original', true],
    ['eli5', "Explain like I'm 5", !!versions.eli5],
    ['tldr', '60-sec TL;DR', Array.isArray(versions.tldr) && versions.tldr.length > 0],
    ['deep_dive', 'Deep dive', !!versions.deep_dive],
    ['key_numbers', 'Key numbers', Array.isArray(versions.key_numbers) && versions.key_numbers.length > 0],
  ].filter(([, , available]) => available)
  const activeMode = MODES.some(([id]) => id === mode) ? mode : 'original'

  const bodyText =
    activeMode === 'eli5' ? versions.eli5
    : activeMode === 'deep_dive' ? versions.deep_dive
    : String(item.body || item.summary || '')
  const bullets =
    activeMode === 'tldr' ? versions.tldr
    : activeMode === 'key_numbers' ? versions.key_numbers
    : null
  const paragraphs = String(bodyText || '').split(/\n{2,}/).filter(Boolean)
  const nextItem = canNext ? items[index + 1] : null

  const onArticleScroll = (e) => {
    const el = e.currentTarget
    const track = el.scrollHeight - el.clientHeight
    setProgress(track > 0 ? Math.min(1, el.scrollTop / track) : 0)
  }

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col bg-white"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Reader header */}
      <div className="relative flex items-center justify-between border-b border-lm-200 px-4 py-[12px] sm:px-8">
        <button type="button" onClick={onClose} aria-label="Close reader" className="flex size-[36px] items-center justify-center rounded-full border border-lm-300 text-[20px] leading-none text-lm-800 transition-colors hover:bg-lm-50">
          ×
        </button>
        <p className="font-roboto text-[11px] font-bold uppercase tracking-[0.14em] text-lm-500" style={rb}>
          {/* Site category name — not the scraper's internal feed tag (Business/Explained/…) */}
          {SLUG_LABEL[item.slug] || item.category || 'Story'}
          <span className="px-[8px] text-lm-300">·</span>
          <span className="text-lm-800">{index + 1}</span> / {items.length}
        </p>
        {item.sourceUrl ? (
          <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="rounded-[100px] bg-lm-800 px-[14px] py-[8px] font-roboto text-[12px] font-semibold text-white transition-colors hover:bg-black" style={rb}>
            Source ↗
          </a>
        ) : <span className="w-[36px]" />}
        {/* Reading progress for the current story */}
        <div className="absolute inset-x-0 -bottom-[1px] h-[3px] bg-transparent">
          <div className="h-full bg-black transition-[width] duration-150 ease-out" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      {/* Swipeable article — keyed remount slides the new story in */}
      <div className="relative flex-1 overflow-hidden">
        <motion.article
          key={item.id}
          ref={scrollRef}
          onScroll={onArticleScroll}
          initial={dir === 0 ? { opacity: 0, y: 16 } : { opacity: 0, x: dir > 0 ? 120 : -120 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.55}
          onDragEnd={(e, info) => {
            if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) go(1)
            else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) go(-1)
          }}
          className="h-full cursor-grab overflow-y-auto px-4 pb-[120px] pt-[32px] active:cursor-grabbing sm:px-8"
        >
          <div className="mx-auto w-full max-w-[720px]">
            <div className="flex flex-wrap items-center gap-[8px]">
              {long && (
                <span className="rounded-[34px] bg-[rgba(153,51,255,0.1)] px-[14px] py-[7px] font-roboto text-[11px] font-bold uppercase text-[#7900D9]" style={rb}>
                  Long story
                </span>
              )}
              <span className="rounded-[34px] bg-black/5 px-[14px] py-[7px] font-roboto text-[11px] font-bold uppercase text-lm-800" style={rb}>
                {readTime(item.headline, item.body)} min read
              </span>
              <FactChip item={item} small />
            </div>
            <h1 className="pt-[20px] font-roboto text-[30px] font-bold leading-[1.15] tracking-[-0.01em] text-black sm:text-[42px]" style={rb}>
              {item.headline}
            </h1>
            <p className="pt-[14px] font-bevietnam text-[14px] text-lm-500">
              {item.source ? <>via <span className="font-semibold text-lm-700">{item.source}</span>{item.company ? ` · ${item.company}` : ''}</> : null}
              {item.source && item.publishedAt ? <span className="px-[8px] text-lm-300">·</span> : null}
              {dateLabel(item.publishedAt)}
            </p>
            {/* Editorial rule between the headline block and the body */}
            <div className="mt-[20px] h-[3px] w-[56px] bg-black" />

            {/* Reading-mode switcher — only when alternate versions exist */}
            {MODES.length > 1 && (
              <div className="mt-[24px]">
                <p className="font-roboto text-[11px] font-bold uppercase tracking-[0.14em] text-lm-400" style={rb}>Read it as</p>
                <div className="mt-[8px] flex flex-wrap items-center gap-[6px] rounded-[24px] border border-lm-200 bg-lm-50 p-[5px] sm:w-fit sm:rounded-[100px]">
                  {MODES.map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setMode(id)}
                      className={`rounded-[100px] px-[14px] py-[7px] font-bevietnam text-[13px] font-semibold transition-all duration-200 ${
                        activeMode === id ? 'bg-lm-800 text-white shadow' : 'text-lm-500 hover:text-lm-800'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-[18px] pt-[26px]">
              {bullets ? (
                <ul className="flex flex-col gap-[14px]">
                  {bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-[12px] font-roboto text-[17px] leading-[1.7] text-lm-700 sm:text-[18px]" style={rb}>
                      <span className="mt-[11px] size-[7px] shrink-0 rounded-full bg-lm-800" />
                      {b}
                    </li>
                  ))}
                </ul>
              ) : (
                paragraphs.map((p, i) => (
                  // First paragraph is the lede — larger and darker, the rest settle
                  // into comfortable body copy.
                  <p
                    key={i}
                    className={i === 0
                      ? 'font-roboto text-[19px] leading-[1.65] text-lm-800 sm:text-[21px]'
                      : 'font-roboto text-[17px] leading-[1.7] text-lm-700 sm:text-[18px]'}
                    style={rb}
                  >
                    {p}
                  </p>
                ))
              )}
            </div>
            <FactPanel item={item} />
            {item.sourceUrl && (
              <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="mt-[32px] inline-flex items-center gap-[8px] rounded-[50px] border border-lm-300 px-[20px] py-[12px] font-roboto text-[14px] font-semibold text-lm-800 transition-colors hover:border-lm-800" style={rb}>
                Read the full source ↗
              </a>
            )}

            {/* Up-next teaser — keeps the feed flowing without hunting for the button */}
            {nextItem && (
              <button
                type="button"
                onClick={() => go(1)}
                className="group mt-[40px] w-full rounded-[16px] border border-lm-200 p-[18px] text-left transition-colors hover:border-lm-800 sm:p-[22px]"
              >
                <span className="flex items-center justify-between">
                  <span className="font-roboto text-[11px] font-bold uppercase tracking-[0.14em] text-lm-400" style={rb}>Up next</span>
                  <span className="font-roboto text-[16px] text-lm-400 transition-transform duration-200 group-hover:translate-x-[4px] group-hover:text-lm-800">→</span>
                </span>
                <span className="mt-[8px] block font-roboto text-[17px] font-bold leading-[1.4] text-lm-800 sm:text-[19px]" style={rb}>
                  {nextItem.headline}
                </span>
              </button>
            )}
          </div>
        </motion.article>

        {/* Desktop side arrows — mirror the swipe gesture without reaching for the bottom bar */}
        {canPrev && (
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous story"
            className="absolute left-[20px] top-1/2 hidden size-[46px] -translate-y-1/2 items-center justify-center rounded-full border border-lm-300 bg-white text-[18px] text-lm-800 shadow-sm transition-colors hover:border-lm-800 lg:flex"
          >
            ←
          </button>
        )}
        {canNext && (
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next story"
            className="absolute right-[20px] top-1/2 hidden size-[46px] -translate-y-1/2 items-center justify-center rounded-full border border-lm-300 bg-white text-[18px] text-lm-800 shadow-sm transition-colors hover:border-lm-800 lg:flex"
          >
            →
          </button>
        )}

        {/* First-time swipe hint (touch devices) */}
        {!hinted && items.length > 1 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pointer-events-none absolute bottom-[92px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[100px] bg-lm-800/90 px-[14px] py-[7px] font-bevietnam text-[12px] text-white sm:hidden"
          >
            ← Swipe to move between stories →
          </motion.p>
        )}
      </div>

      {/* Prev / next controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-[10px] bg-gradient-to-t from-white via-white/90 to-transparent px-4 pb-[20px] pt-[36px]">
        <button
          type="button"
          disabled={!canPrev}
          onClick={() => go(-1)}
          className={`pointer-events-auto flex h-[44px] items-center gap-[6px] rounded-[50px] border px-[18px] font-roboto text-[14px] font-semibold transition-colors ${canPrev ? 'border-lm-800 bg-white text-lm-800 hover:bg-lm-50' : 'border-lm-200 bg-white text-lm-300'}`}
          style={rb}
        >
          ← Prev
        </button>
        <button
          type="button"
          disabled={!canNext}
          onClick={() => go(1)}
          className={`pointer-events-auto flex h-[44px] items-center gap-[6px] rounded-[50px] px-[18px] font-roboto text-[14px] font-semibold transition-colors ${canNext ? 'bg-lm-800 text-white hover:bg-black' : 'bg-lm-200 text-lm-400'}`}
          style={rb}
        >
          Next →
        </button>
      </div>
    </motion.div>
  )
}
