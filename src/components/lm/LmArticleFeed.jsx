import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { readTime } from '../../lib/readTime'
import LmReader from './LmReader'
import { FactChip } from './LmFactBadge'

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
    <div className="flex flex-wrap items-center gap-[8px]">
      {long && (
        <span className="rounded-[34px] bg-[rgba(153,51,255,0.1)] px-[16px] py-[8px] font-roboto text-[12px] font-bold uppercase text-[#7900D9]" style={rb}>
          Long story
        </span>
      )}
      <span className="rounded-[34px] bg-black/5 px-[16px] py-[8px] font-roboto text-[12px] font-bold uppercase text-lm-800" style={rb}>
        {mins} min read
      </span>
      <FactChip item={item} />
    </div>
  )
}

function Excerpt({ item, size = 'lg', onOpen, full = false }) {
  const text = item.body || item.summary || ''
  const cls = size === 'lg' ? 'text-[18px] leading-[30px]' : 'text-[16px] leading-[25px]'
  const limit = size === 'lg' ? 260 : 150
  const clipped = !full && text.length > limit
  // General cards show the WHOLE brief (they're 55-85 words) — no "Read more".
  if (full) {
    return (
      <p className={`font-roboto ${cls} text-lm-600`} style={rb}>{text}</p>
    )
  }
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

// ---- Alternate reading lenses (General only — versions exist only there) ----
// A small pill row on the card ("✦ Explain like I'm 5", …). Picking one expands
// the card in place: original stays put, the chosen version renders in a tinted
// panel — side by side on wide cards, stacked on narrow ones.
const LENSES = [
  ['eli5', "Explain like I'm 5"],
  ['tldr', '60-sec TL;DR'],
  ['key_numbers', 'Key numbers'],
  ['deep_dive', 'Deep dive'],
]

function availableLenses(item) {
  const v = item?.versions || {}
  return LENSES.filter(([id]) =>
    id === 'tldr' || id === 'key_numbers'
      ? Array.isArray(v[id]) && v[id].length > 0
      : typeof v[id] === 'string' && v[id].trim().length > 0
  )
}

function LensPills({ lenses, active, onPick, compact = false }) {
  return (
    <div className="flex flex-wrap items-center gap-[6px]" onClick={(e) => e.stopPropagation()}>
      <span className="font-roboto text-[12px] font-bold uppercase tracking-wide text-lm-400" style={rb}>✦</span>
      {lenses.map(([id, label]) => (
        <button
          key={id}
          type="button"
          onClick={(e) => { e.stopPropagation(); onPick(active === id ? null : id) }}
          className={`rounded-[100px] border font-bevietnam font-semibold transition-all duration-200 ${
            compact ? 'px-[10px] py-[4px] text-[11px]' : 'px-[12px] py-[5px] text-[12px]'
          } ${
            active === id
              ? 'border-lm-800 bg-lm-800 text-white shadow'
              : 'border-lm-300 bg-white text-lm-500 hover:border-lm-500 hover:text-lm-800'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function LensPanel({ item, lens, onClose }) {
  const v = item.versions || {}
  const label = (LENSES.find(([id]) => id === lens) || [])[1] || ''
  const bullets = lens === 'tldr' ? v.tldr : lens === 'key_numbers' ? v.key_numbers : null
  const text = lens === 'eli5' ? v.eli5 : lens === 'deep_dive' ? v.deep_dive : ''
  const paragraphs = String(text || '').split(/\n{2,}/).filter(Boolean)
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-[10px] self-start rounded-[12px] border border-[rgba(28,28,30,0.08)] bg-lm-50 p-[16px]"
    >
      <div className="flex items-center justify-between gap-[8px]">
        <span className="font-roboto text-[12px] font-bold uppercase tracking-wide text-lm-500" style={rb}>
          ✦ {label}
        </span>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClose() }}
          aria-label="Close alternate view"
          className="flex size-[24px] items-center justify-center rounded-full text-[16px] leading-none text-lm-500 hover:bg-lm-200 hover:text-lm-800"
        >
          ×
        </button>
      </div>
      {bullets ? (
        <ul className="flex flex-col gap-[10px]">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-[10px] font-roboto text-[15px] leading-[24px] text-lm-700" style={rb}>
              <span className="mt-[9px] size-[6px] shrink-0 rounded-full bg-lm-800" />
              {b}
            </li>
          ))}
        </ul>
      ) : (
        paragraphs.map((p, i) => (
          <p key={i} className="font-roboto text-[15px] leading-[24px] text-lm-700" style={rb}>{p}</p>
        ))
      )}
    </motion.div>
  )
}

function FeaturedCard({ item, lead = false, half = false, onOpen, fullStories = false }) {
  const lenses = fullStories ? availableLenses(item) : []
  const [lens, setLens] = useState(null)
  const activeLens = lens && lenses.some(([id]) => id === lens) ? lens : null
  // Wide cards show original + version SIDE BY SIDE; half cards stack.
  const sideBySide = activeLens && !half
  return (
    <article
      onClick={onOpen}
      className={`flex cursor-pointer flex-col gap-[24px] rounded-[16px] bg-white p-[20px] transition-shadow hover:shadow-[0px_10px_30px_rgba(0,0,0,0.07)] sm:p-[32px] ${
        lead ? 'border border-lm-800' : 'border border-[rgba(28,28,30,0.1)]'
      }`}
    >
      {half ? <div><FactChip item={item} small /></div> : <Tags item={item} />}
      <h3 className={`font-roboto font-bold text-black ${half ? 'text-[21px] leading-normal' : 'text-[24px] leading-[34px] sm:text-[32px] sm:leading-[44px]'}`} style={rb}>
        {item.headline}
      </h3>
      <div className={sideBySide ? 'grid gap-[16px] lg:grid-cols-2' : 'flex flex-col gap-[16px]'}>
        <Excerpt item={item} size={half ? 'sm' : 'lg'} onOpen={onOpen} full={fullStories} />
        {activeLens && <LensPanel item={item} lens={activeLens} onClose={() => setLens(null)} />}
      </div>
      {lenses.length > 0 && <LensPills lenses={lenses} active={activeLens} onPick={setLens} compact={half} />}
      <SourceRow item={item} />
    </article>
  )
}

function CompactCard({ item, onOpen, fullStories = false }) {
  const lenses = fullStories ? availableLenses(item) : []
  const [lens, setLens] = useState(null)
  const activeLens = lens && lenses.some(([id]) => id === lens) ? lens : null
  return (
    <article onClick={onOpen} className="flex cursor-pointer flex-col gap-[8px] rounded-[16px] border border-[rgba(28,28,30,0.1)] bg-white p-[16px] transition-shadow hover:shadow-[0px_10px_30px_rgba(0,0,0,0.07)]">
      {item.factScore != null && <div><FactChip item={item} small /></div>}
      <h3 className="font-roboto text-[21px] font-semibold leading-[1.36] text-black" style={rb}>{item.headline}</h3>
      <Excerpt item={item} size="sm" onOpen={onOpen} full={fullStories} />
      {activeLens && <LensPanel item={item} lens={activeLens} onClose={() => setLens(null)} />}
      {lenses.length > 0 && <LensPills lenses={lenses} active={activeLens} onPick={setLens} compact />}
      <SourceRow item={item} />
    </article>
  )
}

// One "block" = up to 7 items laid out per the design.
function Block({ items, onOpen, fullStories }) {
  const [lead, second, halfA, halfB, ...compacts] = items
  return (
    // 895:473 columns in the 1440 design — keep the ratio fluid on laptops.
    <div className="flex flex-col gap-[8px] lg:grid lg:grid-cols-[minmax(0,1.89fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-[8px]">
        {lead && <FeaturedCard item={lead} lead onOpen={() => onOpen(lead)} fullStories={fullStories} />}
        {second && <FeaturedCard item={second} onOpen={() => onOpen(second)} fullStories={fullStories} />}
        {(halfA || halfB) && (
          <div className="flex flex-col gap-[8px] sm:flex-row">
            {halfA && <div className="flex-1"><FeaturedCard item={halfA} half onOpen={() => onOpen(halfA)} fullStories={fullStories} /></div>}
            {halfB && <div className="flex-1"><FeaturedCard item={halfB} half onOpen={() => onOpen(halfB)} fullStories={fullStories} /></div>}
          </div>
        )}
      </div>
      {compacts.length > 0 && (
        <div className="flex flex-col gap-[8px]">
          {compacts.map((c) => <CompactCard key={c.id} item={c} onOpen={() => onOpen(c)} fullStories={fullStories} />)}
        </div>
      )}
    </div>
  )
}

// fullStories: General mode — cards carry the complete brief (no Read more)
// plus the alternate-reading lens pills.
export default function LmArticleFeed({ items = [], loading = false, emptyLabel = 'No stories here yet — check back soon.', fullStories = false }) {
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
              <Block key={i} items={g.items.slice(i * 7, i * 7 + 7)} onOpen={openItem} fullStories={fullStories} />
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
