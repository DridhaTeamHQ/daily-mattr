import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import LmReader from './LmReader'
import LmBreakingCarousel from './LmBreakingCarousel'
import { FactChip } from './LmFactBadge'
import { breakingScore, isBreaking, topicLabel } from '../../lib/content'
import {
  dayKey,
  headerLabel,
  Excerpt,
  availableLenses,
  LensPills,
  ContentSwap,
} from './LmArticleFeed'

// News Studio — the image-led front page for /general, styled after a classic
// broadsheet news front (BBC reference): serif headlines that underline on
// hover, FLAT borderless cards separated by hairline rules and column gutters,
// uppercase section kickers under a full-width rule, and "2 hrs ago | Topic"
// meta lines. Cards without an image degrade to text; broken hotlinks hide
// themselves (onError). Category pages keep the original LmArticleFeed.
const rb = { fontVariationSettings: '"wdth" 100' }
const serif = { fontFamily: "Georgia, 'Times New Roman', serif" }

const hideOnError = (e) => { e.currentTarget.style.display = 'none' }

// ---- Same-story dedupe ----
// Different outlets file the same story under DIFFERENT headlines ("Cabinet
// approves Rs 25,000 cr Ganga, Varuna corridors" vs "Varanasi to get two
// elevated highway corridors…"), so headline comparison alone can't catch them.
// The pipeline already links these semantically: the fact-check corroborator
// matches title embeddings and records each sibling's URL in
// fact_notes.sources[] (surfaced as item.relatedUrls). Two stories where either
// lists the other's URL ARE the same story. Headline-token overlap stays only
// as a fallback for near-identical twins ("US" vs "U.S.") on rows whose source
// list is missing. The better-corroborated copy survives (more sources, then
// higher fact score); comparison is against already-kept stories only — no
// transitive chain-merging of loosely related coverage.
const STOP = new Set(['the', 'a', 'an', 'and', 'or', 'for', 'to', 'of', 'in', 'on', 'at', 'by', 'with', 'from', 'as', 'is', 'are', 'was', 'were', 'has', 'have', 'had', 'his', 'her', 'their', 'any', 'after', 'over', 'into', 'says', 'said', 'new'])
function titleTokens(headline) {
  const out = new Set()
  for (const t of String(headline || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/)) {
    if (t && (t.length >= 3 || /\d/.test(t)) && !STOP.has(t)) out.add(t)
  }
  return out
}
function similarTitles(aTokens, bTokens) {
  if (aTokens.size === 0 || bTokens.size === 0) return false
  let inter = 0
  for (const t of aTokens) if (bTokens.has(t)) inter++
  const jaccard = inter / (aTokens.size + bTokens.size - inter)
  return jaccard >= 0.5 || inter >= 7
}
function sameStory(a, b) {
  if (a.url && b.item.relatedUrls?.includes(a.url)) return true
  if (b.url && a.item.relatedUrls?.includes(b.url)) return true
  return similarTitles(a.tokens, b.tokens)
}
function corroboration(it) {
  return (it.factNotes?.source_count ?? 1) * 1000 + (it.factScore ?? 0)
}
function dedupeStories(items) {
  // Prefer the better-corroborated duplicate, but keep the FEED's order.
  const ranked = [...items].sort((a, b) => corroboration(b) - corroboration(a))
  const kept = new Set()
  const picked = []
  for (const it of ranked) {
    const entry = { item: it, url: it.sourceUrl || '', tokens: titleTokens(it.headline) }
    if (picked.some((p) => sameStory(entry, p))) continue
    picked.push(entry)
    kept.add(it.id)
  }
  return items.filter((it) => kept.has(it.id))
}

// "30 mins ago" / "5 hrs ago" / "2 days ago" — BBC-style relative timestamp.
function timeAgo(iso) {
  if (!iso) return ''
  const mins = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000))
  if (mins < 60) return `${mins} min${mins === 1 ? '' : 's'} ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? '' : 's'} ago`
  const days = Math.round(hrs / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

// Meta line: "2 hrs ago | National" + the fact chip as the only colour accent.
function Meta({ item }) {
  const label = topicLabel(item)
  return (
    <div className="flex flex-wrap items-center gap-x-[10px] gap-y-[6px]">
      <span className="font-roboto text-[12px] text-lm-500" style={rb}>
        {timeAgo(item.publishedAt)}
        {label && <span className="px-[8px] text-lm-300">|</span>}
        {label && <span className="font-medium text-lm-600">{label}</span>}
      </span>
      <FactChip item={item} small />
    </div>
  )
}

// Uppercase section kicker under a full-width dark rule — the broadsheet
// section divider ("TOP STORIES", "TODAY, 16TH JULY").
function Kicker({ children, light = false }) {
  return (
    <div className={`mb-[20px] border-t ${light ? 'border-lm-300' : 'border-lm-800'} pt-[10px]`}>
      <h2 className={`font-roboto text-[13px] font-bold uppercase tracking-[0.1em] ${light ? 'text-lm-500' : 'text-[#0F0F11]'}`} style={rb}>
        {children}
      </h2>
    </div>
  )
}

// Big lead story — image, large serif headline, standfirst, meta.
function LeadStory({ item, onOpen }) {
  return (
    <button type="button" onClick={onOpen} className="group flex w-full flex-col gap-[14px] text-left">
      {item.image && (
        <div className="aspect-video w-full overflow-hidden bg-lm-100">
          <img src={item.image} alt="" loading="lazy" onError={hideOnError} className="size-full object-cover" />
        </div>
      )}
      <h2 className="text-[28px] font-bold leading-[1.14] tracking-[-0.01em] text-black group-hover:underline sm:text-[34px]" style={serif}>
        {item.headline}
      </h2>
      <p className="line-clamp-3 font-roboto text-[15px] leading-[24px] text-lm-600" style={rb}>
        {item.body || item.summary}
      </p>
      <Meta item={item} />
    </button>
  )
}

// Secondary story — BBC mobile row (thumbnail left, headline + meta right);
// stacks into an image-top column from the sm breakpoint up.
function SideStory({ item, onOpen }) {
  return (
    <button type="button" onClick={onOpen} className="group flex w-full gap-[12px] text-left sm:flex-col sm:gap-[10px]">
      {item.image && (
        <div className="h-[82px] w-[124px] shrink-0 overflow-hidden bg-lm-100 sm:aspect-video sm:h-auto sm:w-full">
          <img src={item.image} alt="" loading="lazy" onError={hideOnError} className="size-full object-cover" />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-[8px] sm:gap-[10px]">
        <h3 className="text-[18px] font-bold leading-[1.22] text-black group-hover:underline sm:text-[21px]" style={serif}>
          {item.headline}
        </h3>
        <p className="hidden font-roboto text-[13px] leading-[20px] text-lm-500 sm:line-clamp-2" style={rb}>
          {item.body || item.summary}
        </p>
        <Meta item={item} />
      </div>
    </button>
  )
}

// Headline rail entry (right column) — text only.
function RailStory({ item, onOpen }) {
  return (
    <button type="button" onClick={onOpen} className="group flex w-full flex-col gap-[6px] py-[16px] text-left first:pt-0 last:pb-0">
      <h3 className="line-clamp-3 text-[17px] font-bold leading-[1.25] text-black group-hover:underline" style={serif}>
        {item.headline}
      </h3>
      <p className="line-clamp-2 font-roboto text-[13px] leading-[20px] text-lm-500" style={rb}>
        {item.body || item.summary}
      </p>
      <Meta item={item} />
    </button>
  )
}

// Flat feed card for the masonry below the band — image, serif headline, full
// brief, reading lenses, meta. No borders or shadows; a bottom hairline closes
// each card and column rules divide the gutters (broadsheet look).
function StudioCard({ item, onOpen }) {
  const lenses = availableLenses(item)
  const [lens, setLens] = useState(null)
  const activeLens = lens && lenses.some(([id]) => id === lens) ? lens : null
  return (
    <article onClick={onOpen} className="group cursor-pointer border-b border-lm-200 pb-[16px] sm:pb-[18px]">
      {/* BBC mobile list row: thumbnail left, headline + meta right. From sm up
          it stacks into the broadsheet column card (image top, brief, lenses). */}
      <div className="flex gap-[12px] sm:flex-col sm:gap-[10px]">
        {item.image && (
          <div className="h-[78px] w-[116px] shrink-0 overflow-hidden bg-lm-100 sm:aspect-video sm:h-auto sm:w-full">
            <img src={item.image} alt="" loading="lazy" onError={hideOnError} className="size-full object-cover" />
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-[6px] sm:gap-0">
          <h3 className="text-[17px] font-bold leading-[1.24] text-black group-hover:underline sm:text-[21px] sm:leading-[1.22]" style={serif}>
            {item.headline}
          </h3>
          <div className="sm:hidden"><Meta item={item} /></div>
        </div>
      </div>
      {/* Brief + reading lenses + full meta — desktop/tablet only; on mobile the
          row links straight into the reader (which carries the lenses). */}
      <div className="hidden sm:mt-[10px] sm:flex sm:flex-col sm:gap-[10px]">
        <ContentSwap item={item} lens={activeLens} size="sm" minH={56}>
          <Excerpt item={item} size="sm" onOpen={onOpen} full />
        </ContentSwap>
        {lenses.length > 0 && <LensPills lenses={lenses} active={activeLens} onPick={setLens} compact />}
        <div className="mt-[2px] flex flex-wrap items-center justify-between gap-[8px]">
          <Meta item={item} />
          <span className="font-roboto text-[12px] text-lm-400" style={rb}>{item.source}</span>
        </div>
      </div>
    </article>
  )
}

export default function LmNewsStudio({ items: rawItems = [], loading = false, emptyLabel = 'No stories here yet — check back soon.' }) {
  // Collapse near-identical headlines (same story from different outlets) —
  // everything below, including the reader, works on the deduped feed.
  const items = useMemo(() => dedupeStories(rawItems), [rawItems])

  // Full-screen reader over the complete feed, same flow as LmArticleFeed.
  const [readerIdx, setReaderIdx] = useState(null)
  const openItem = (it) => setReaderIdx(items.findIndex((x) => x.id === it.id))

  // Breaking banner — identical selection to the old General feed.
  const breaking = useMemo(() => {
    const hot = items.filter(isBreaking).sort((a, b) => breakingScore(b) - breakingScore(a)).slice(0, 6)
    if (hot.length > 0) return hot
    return [...items.slice(0, 10)].sort((a, b) => breakingScore(b) - breakingScore(a)).slice(0, 6)
  }, [items])

  // Hero band: hottest stories first; the lead must carry an image when any
  // story has one, the left pair prefers images, the rail is text-only.
  const { lead, side, rail, rest } = useMemo(() => {
    const ranked = [...items].sort((a, b) => breakingScore(b) - breakingScore(a))
    const lead = ranked.find((it) => it.image) || ranked[0] || null
    const used = new Set(lead ? [lead.id] : [])
    const withImg = ranked.filter((it) => !used.has(it.id) && it.image)
    const side = withImg.slice(0, 2)
    for (const it of ranked) {
      if (side.length >= 2) break
      if (!used.has(it.id) && !side.some((s) => s.id === it.id)) side.push(it)
    }
    side.forEach((it) => used.add(it.id))
    const rail = ranked.filter((it) => !used.has(it.id)).slice(0, 5)
    rail.forEach((it) => used.add(it.id))
    const rest = items.filter((it) => !used.has(it.id))
    return { lead, side, rail, rest }
  }, [items])

  // Date groups for everything below the band.
  const groups = useMemo(() => {
    const byDay = new Map()
    for (const it of rest) {
      if (!it.publishedAt) continue
      const k = dayKey(it.publishedAt)
      if (!byDay.has(k)) byDay.set(k, [])
      byDay.get(k).push(it)
    }
    return [...byDay.entries()]
      .sort((a, b) => new Date(b[1][0].publishedAt) - new Date(a[1][0].publishedAt))
      .map(([k, arr]) => ({ key: k, items: arr, ...headerLabel(arr[0].publishedAt) }))
  }, [rest])

  const [visible, setVisible] = useState(2)
  const shown = groups.slice(0, visible)
  const hasMore = groups.length > visible

  if (loading && items.length === 0) {
    return <div className="px-[32px] py-[80px] text-center font-roboto text-[18px] text-lm-500" style={rb}>Loading stories…</div>
  }
  if (!loading && items.length === 0) {
    return <div className="px-[32px] py-[80px] text-center font-roboto text-[18px] text-lm-500" style={rb}>{emptyLabel}</div>
  }

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[44px] px-4 py-[32px] sm:px-8 sm:py-[48px] lg:px-[32px]">
      {breaking.length > 0 && (
        <div className="-mb-[16px]">
          <LmBreakingCarousel items={breaking} onOpen={openItem} />
        </div>
      )}

      {/* ---- Top-stories band: [side pair | image lead | headline rail] ---- */}
      {lead && (
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Kicker>Top stories</Kicker>
          <div className="grid gap-[28px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)_minmax(0,1fr)]">
            {/* Lead first on mobile, centred on desktop, flanked by hairlines */}
            <div className="order-1 lg:order-2 lg:border-x lg:border-lm-200 lg:px-[28px]">
              <LeadStory item={lead} onOpen={() => openItem(lead)} />
            </div>
            <div className="order-2 flex flex-col gap-[20px] divide-y divide-lm-200 lg:order-1 [&>*+*]:pt-[20px]">
              {side.map((it) => (
                <SideStory key={it.id} item={it} onOpen={() => openItem(it)} />
              ))}
            </div>
            <div className="order-3 flex flex-col divide-y divide-lm-200">
              {rail.map((it) => (
                <RailStory key={it.id} item={it} onOpen={() => openItem(it)} />
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ---- The rest of the feed: date sections of flat masonry cards ---- */}
      {shown.map((g) => (
        <motion.section
          key={g.key}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Kicker light={!g.today}>{g.label}</Kicker>
          {/* Masonry via CSS columns with broadsheet column rules: an expanded
              card (open reading lens) only pushes down its OWN column. */}
          <div className="columns-1 gap-[32px] sm:columns-2 lg:columns-3 [column-rule:1px_solid_#E4E4E7]">
            {g.items.map((it) => (
              <div key={it.id} className="mb-[22px] break-inside-avoid">
                <StudioCard item={it} onOpen={() => openItem(it)} />
              </div>
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
          <button
            type="button"
            onClick={() => setVisible((v) => v + 2)}
            className="group inline-flex items-center gap-[10px] rounded-full border border-lm-300 bg-white py-[8px] pl-[20px] pr-[8px] font-roboto text-[14px] font-semibold text-lm-800 transition-all duration-200 hover:border-lm-800 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.08)]"
            style={rb}
          >
            Load more stories
            <span className="flex size-[30px] items-center justify-center rounded-full bg-lm-800 text-white transition-transform duration-300 group-hover:translate-y-[2px]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 2v8M2.5 6.5 6 10l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
