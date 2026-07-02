import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { readTime } from '../../lib/readTime'
import LmReader from './LmReader'

// Date-grouped article feed — Figma node 1:5453. Each date group: bold header
// with hairline divider, then a two-column grid — left 895px (2 featured +
// 2 half cards), right 473px (3 compact cards). White cards, radius 16;
// the day's lead card carries a solid #141417 border.
const rb = { fontVariationSettings: '"wdth" 100' }
const IST = 'Asia/Kolkata'

const dayKey = (iso) => new Date(iso).toLocaleDateString('en-IN', { timeZone: IST })
const ordinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}
function headerLabel(iso) {
  const d = new Date(iso)
  const today = dayKey(new Date().toISOString()) === dayKey(iso)
  const day = Number(d.toLocaleDateString('en-IN', { timeZone: IST, day: 'numeric' }))
  const month = d.toLocaleDateString('en-IN', { timeZone: IST, month: 'long' })
  const year = d.toLocaleDateString('en-IN', { timeZone: IST, year: 'numeric' })
  const weekday = d.toLocaleDateString('en-IN', { timeZone: IST, weekday: 'long' })
  return { label: `${today ? 'Today' : weekday}, ${ordinal(day)} ${month}, ${year}`, today }
}

function favicon(url) {
  try { return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=32` } catch { return '' }
}

function SourceRow({ item }) {
  const ico = favicon(item.sourceUrl)
  return (
    <div className="flex items-center gap-[8px]">
      {ico && <img alt="" src={ico} className="size-[16px] rounded-full border border-white bg-white" loading="lazy" />}
      <a
        href={item.sourceUrl || '#'}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="font-roboto text-[16px] leading-[25px] text-lm-500 hover:text-lm-800"
        style={rb}
      >
        {item.source || 'Source'}
      </a>
    </div>
  )
}

function Tags({ item }) {
  const mins = readTime(item.headline, item.body)
  const long = item.kind === 'case_study' || item.kind === 'feature'
  return (
    <div className="flex items-center gap-[8px]">
      {long && (
        <span className="rounded-[34px] bg-[rgba(153,51,255,0.1)] px-[16px] py-[8px] font-roboto text-[12px] font-bold uppercase text-[#7900D9]" style={rb}>
          Long story
        </span>
      )}
      <span className="rounded-[34px] bg-black/5 px-[16px] py-[8px] font-roboto text-[12px] font-bold uppercase text-lm-800" style={rb}>
        {mins} min read
      </span>
    </div>
  )
}

function Excerpt({ item, size = 'lg', onOpen }) {
  const text = item.body || item.summary || ''
  const cls = size === 'lg' ? 'text-[18px] leading-[30px]' : 'text-[16px] leading-[25px]'
  const limit = size === 'lg' ? 260 : 150
  const clipped = text.length > limit
  return (
    <p className={`font-roboto ${cls} text-lm-500`} style={rb}>
      {clipped ? `${text.slice(0, limit).trimEnd()}… ` : `${text} `}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onOpen?.() }}
        className="font-roboto font-medium text-lm-700 hover:underline"
        style={rb}
      >
        Read more
      </button>
    </p>
  )
}

function FeaturedCard({ item, lead = false, half = false, onOpen }) {
  return (
    <article
      onClick={onOpen}
      className={`flex cursor-pointer flex-col gap-[24px] rounded-[16px] bg-white p-[20px] transition-shadow hover:shadow-[0px_10px_30px_rgba(0,0,0,0.07)] sm:p-[32px] ${
        lead ? 'border border-lm-800' : 'border border-[rgba(28,28,30,0.1)]'
      }`}
    >
      {!half && <Tags item={item} />}
      <h3 className={`font-roboto font-bold text-black ${half ? 'text-[21px] leading-normal' : 'text-[24px] leading-[34px] sm:text-[32px] sm:leading-[44px]'}`} style={rb}>
        {item.headline}
      </h3>
      <Excerpt item={item} size={half ? 'sm' : 'lg'} onOpen={onOpen} />
      <SourceRow item={item} />
    </article>
  )
}

function CompactCard({ item, onOpen }) {
  return (
    <article onClick={onOpen} className="flex cursor-pointer flex-col gap-[8px] rounded-[16px] border border-[rgba(28,28,30,0.1)] bg-white p-[16px] transition-shadow hover:shadow-[0px_10px_30px_rgba(0,0,0,0.07)]">
      <h3 className="font-roboto text-[21px] font-semibold leading-[1.36] text-black" style={rb}>{item.headline}</h3>
      <Excerpt item={item} size="sm" onOpen={onOpen} />
      <SourceRow item={item} />
    </article>
  )
}

// One "block" = up to 7 items laid out per the design.
function Block({ items, onOpen }) {
  const [lead, second, halfA, halfB, ...compacts] = items
  return (
    // 895:473 columns in the 1440 design — keep the ratio fluid on laptops.
    <div className="flex flex-col gap-[8px] lg:grid lg:grid-cols-[minmax(0,1.89fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-[8px]">
        {lead && <FeaturedCard item={lead} lead onOpen={() => onOpen(lead)} />}
        {second && <FeaturedCard item={second} onOpen={() => onOpen(second)} />}
        {(halfA || halfB) && (
          <div className="flex flex-col gap-[8px] sm:flex-row">
            {halfA && <div className="flex-1"><FeaturedCard item={halfA} half onOpen={() => onOpen(halfA)} /></div>}
            {halfB && <div className="flex-1"><FeaturedCard item={halfB} half onOpen={() => onOpen(halfB)} /></div>}
          </div>
        )}
      </div>
      {compacts.length > 0 && (
        <div className="flex flex-col gap-[8px]">
          {compacts.map((c) => <CompactCard key={c.id} item={c} onOpen={() => onOpen(c)} />)}
        </div>
      )}
    </div>
  )
}

export default function LmArticleFeed({ items = [], loading = false, emptyLabel = 'No stories here yet — check back soon.' }) {
  const groups = useMemo(() => {
    const byDay = new Map()
    for (const it of items) {
      if (!it.publishedAt) continue
      const k = dayKey(it.publishedAt)
      if (!byDay.has(k)) byDay.set(k, [])
      byDay.get(k).push(it)
    }
    return [...byDay.entries()]
      .sort((a, b) => new Date(b[1][0].publishedAt) - new Date(a[1][0].publishedAt))
      .map(([k, arr]) => ({ key: k, items: arr, ...headerLabel(arr[0].publishedAt) }))
  }, [items])

  const [visible, setVisible] = useState(2)
  const shown = groups.slice(0, visible)
  const hasMore = groups.length > visible

  // Full-screen reader: opened from any card; swipes through `items` in
  // display order.
  const [readerIdx, setReaderIdx] = useState(null)
  const openItem = (it) => setReaderIdx(items.findIndex((x) => x.id === it.id))

  if (loading && items.length === 0) {
    return <div className="px-[32px] py-[80px] text-center font-roboto text-[18px] text-lm-500" style={rb}>Loading stories…</div>
  }
  if (!loading && items.length === 0) {
    return <div className="px-[32px] py-[80px] text-center font-roboto text-[18px] text-lm-500" style={rb}>{emptyLabel}</div>
  }

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[40px] px-4 py-[32px] sm:gap-[64px] sm:px-8 sm:py-[48px] lg:px-[32px]">
      {shown.map((g, gi) => (
        <motion.section
          key={g.key}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Date header */}
          <div className="mb-[16px] flex items-center gap-[16px]">
            <h2 className={`whitespace-nowrap font-roboto text-[18px] font-bold leading-[44px] sm:text-[24px] sm:leading-[64px] ${g.today ? 'text-[#0F0F11]' : 'text-lm-500'}`} style={rb}>
              {g.label}
            </h2>
            <div className="h-px flex-1 bg-lm-400" />
          </div>
          {/* Blocks of 7 */}
          <div className="flex flex-col gap-[8px]">
            {Array.from({ length: Math.ceil(g.items.length / 7) }, (_, i) => (
              <Block key={i} items={g.items.slice(i * 7, i * 7 + 7)} onOpen={openItem} />
            ))}
          </div>
        </motion.section>
      ))}

      {readerIdx != null && readerIdx >= 0 && (
        <LmReader
          items={items}
          index={readerIdx}
          onIndex={setReaderIdx}
          onClose={() => setReaderIdx(null)}
        />
      )}

      {hasMore && (
        <div className="flex justify-center">
          <button type="button" onClick={() => setVisible((v) => v + 2)} className="flex items-center">
            <span className="rounded-[50px] border border-lm-700 bg-white/10 px-[16px] py-[8px] font-roboto text-[15px] font-semibold text-lm-800" style={rb}>
              Load more
            </span>
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[50px] bg-lm-700">
              <img alt="" src="/figma/icon-load-more-arrow-down.svg" className="h-[12px] w-[10px]" />
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
