import React from 'react'

// AI fact-check badge + breakdown panel. Score bands mirror the email agent's
// _shared/fact-check.ts: >=85 verified, >=65 mostly factual, >=40 mixed,
// <40 unverified. Chip colors follow the site's tinted-pill pattern (see the
// purple "Long story" chip in LmArticleFeed).
const rb = { fontVariationSettings: '"wdth" 100' }

export function factBand(score) {
  if (score >= 85) return { key: 'verified', label: 'Verified', text: '#0F7A52', bg: 'rgba(15,157,105,0.10)' }
  if (score >= 65) return { key: 'mostly', label: 'Mostly factual', text: '#8A6D00', bg: 'rgba(196,159,23,0.12)' }
  if (score >= 40) return { key: 'mixed', label: 'Mixed', text: '#9A4A0F', bg: 'rgba(217,126,66,0.12)' }
  return { key: 'unverified', label: 'Unverified', text: '#9D1F1F', bg: 'rgba(224,96,96,0.12)' }
}

// Small pill for article cards. Renders nothing when the story has no score
// (older approvals predate fact checking).
export function FactChip({ item, small = false }) {
  if (item?.factScore == null) return null
  const score = Math.round(item.factScore)
  const band = factBand(score)
  const pad = small ? 'px-[10px] py-[4px] text-[11px]' : 'px-[16px] py-[8px] text-[12px]'
  return (
    <span
      className={`inline-flex items-center gap-[6px] rounded-[34px] font-roboto font-bold uppercase ${pad}`}
      style={{ ...rb, color: band.text, background: band.bg }}
      title={item.factNotes?.rationale || band.label}
    >
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M6 0.5L10.5 2.5V5.5C10.5 8.3 8.6 10.6 6 11.5C3.4 10.6 1.5 8.3 1.5 5.5V2.5L6 0.5Z" fill="currentColor" opacity="0.25" />
        <path d="M4 5.8L5.4 7.2L8 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Fact {score}
    </span>
  )
}

const VERDICT_STYLE = {
  supported: { label: 'Supported', text: '#0F7A52', bg: 'rgba(15,157,105,0.10)' },
  'partially-supported': { label: 'Partially supported', text: '#8A6D00', bg: 'rgba(196,159,23,0.12)' },
  unsupported: { label: 'Unsupported', text: '#9A4A0F', bg: 'rgba(217,126,66,0.12)' },
  contradicted: { label: 'Contradicted', text: '#9D1F1F', bg: 'rgba(224,96,96,0.12)' },
}

const SIGNAL_LABEL = { attribution: 'Attribution', specificity: 'Specificity', tone: 'Tone' }

// Full transparency panel for the reader overlay: score dial, rationale,
// per-claim verdicts, and source signals — the "why" behind the number.
export function FactPanel({ item }) {
  if (item?.factScore == null) return null
  const score = Math.round(item.factScore)
  const band = factBand(score)
  const notes = item.factNotes || {}
  const claims = Array.isArray(notes.claims) ? notes.claims : []
  const signals = notes.signals || null

  return (
    <section className="mt-[32px] rounded-[16px] border border-[rgba(28,28,30,0.1)] bg-lm-50 p-[20px] sm:p-[24px]">
      <div className="flex flex-wrap items-center gap-[12px]">
        <span
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full font-roboto text-[18px] font-bold"
          style={{ ...rb, color: band.text, background: band.bg, border: `2px solid ${band.text}` }}
        >
          {score}
        </span>
        <div className="flex flex-col">
          <span className="font-roboto text-[15px] font-bold uppercase tracking-wide" style={{ ...rb, color: band.text }}>
            {band.label} · AI fact check
          </span>
          <span className="font-roboto text-[13px] text-lm-500" style={rb}>
            Every claim graded against the original source at publish time.
          </span>
        </div>
      </div>

      {notes.rationale && (
        <p className="mt-[14px] font-roboto text-[15px] leading-[24px] text-lm-700" style={rb}>
          {notes.rationale}
        </p>
      )}

      {claims.length > 0 && (
        <ul className="mt-[14px] flex flex-col gap-[10px]">
          {claims.map((c, i) => {
            const v = VERDICT_STYLE[c.verdict] || VERDICT_STYLE.unsupported
            return (
              <li key={i} className="flex flex-col gap-[4px] rounded-[12px] bg-white p-[12px]">
                <span
                  className="self-start rounded-[34px] px-[10px] py-[3px] font-roboto text-[11px] font-bold uppercase"
                  style={{ ...rb, color: v.text, background: v.bg }}
                >
                  {v.label}
                </span>
                <span className="font-roboto text-[14px] leading-[22px] text-lm-800" style={rb}>{c.claim}</span>
              </li>
            )
          })}
        </ul>
      )}

      {signals && (
        <div className="mt-[14px] flex flex-wrap gap-[8px]">
          {Object.entries(SIGNAL_LABEL).map(([key, label]) => (
            signals[key] != null && (
              <span key={key} className="rounded-[34px] bg-black/5 px-[12px] py-[5px] font-roboto text-[12px] font-medium text-lm-700" style={rb}>
                {label} {signals[key]}/2
              </span>
            )
          ))}
        </div>
      )}
    </section>
  )
}
