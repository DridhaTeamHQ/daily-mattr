// Live content layer — reads APPROVED content straight from the email agent's
// Supabase `articles` table, so anything the team approves (and any edits they
// make via edited_title / edited_summary) shows on the site automatically.
//
// The agent funnels everything into one table:
//   • Topic short articles -> category in Real Estate / Automobile /
//                             Health & Wellness / Tech & AI / Markets & Startups
//                             (kind: 'article')
//   • General news         -> category null, topic in India/World/Business/...
// Long reads per topic come from editorial_drafts (kind: 'feature').
// We only ever read status in ('approved','sent') — drafts/pending never show.

import { supabase } from './supabaseClient'

// The five topic categories map 1:1 to their own pages. Everything else
// (general news tagged India/World/Business/Explained/…) falls into the
// single "General" feed.
const TOPIC_SLUG = {
  'Real Estate': 'real-estate',
  'Automobile': 'automobile',
  'Health & Wellness': 'health-wellness',
  'Tech & AI': 'tech-ai',
  'Markets & Startups': 'markets-startups',
}
function slugFor(category) {
  return TOPIC_SLUG[category] || 'general'
}

// Drop the synthetic fragment the agent appends to make synced rows unique
// (e.g. "…/article#shortly-corporate-case-<uuid>").
const cleanUrl = (u) => (u ? u.split('#shortly')[0] || u : '')

// Source feeds sometimes hand us HTML entities in titles/summaries (e.g.
// "&#124;", "UK&#8217;s", "&amp;"). Decode them so headlines read cleanly.
const NAMED_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  hellip: '…', mdash: '—', ndash: '–', lsquo: '‘', rsquo: '’',
  ldquo: '“', rdquo: '”', deg: '°', eacute: 'é',
}
function decodeEntities(s) {
  if (!s || typeof s !== 'string' || s.indexOf('&') === -1) return s || ''
  return s.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (m, code) => {
    if (code[0] === '#') {
      const n = code[1] === 'x' || code[1] === 'X' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10)
      return Number.isFinite(n) ? String.fromCodePoint(n) : m
    }
    return Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, code) ? NAMED_ENTITIES[code] : m
  })
}

// Older approved rows carry raw CMS artifacts in their summaries
// ("Published on: …", "3 min read", "Listen to this article"). Strip them at
// display time; new agent-written summaries are already clean.
function stripArtifacts(s) {
  if (!s) return ''
  return s
    .replace(/Published on:\s*\d{1,2}\s+\w+\s+\d{4},?\s*\d{1,2}:\d{2}\s*[ap]m/gi, ' ')
    .replace(/Updated:\s*\w+\s+\d{1,2},\s*\d{4}[^.]*?(IST)?/gi, ' ')
    .replace(/\b\d+\s*min read\b/gi, ' ')
    .replace(/\bListen to this article\b/gi, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function normalize(row) {
  const bucket = row.category || row.topic || ''
  return {
    id: row.id,
    kind: 'article',
    headline: decodeEntities(row.edited_title || row.title),
    summary: stripArtifacts(decodeEntities(row.edited_summary || row.summary || '')),
    body: stripArtifacts(decodeEntities(row.edited_summary || row.summary || '')),
    source: decodeEntities(row.source || ''),
    sourceUrl: cleanUrl(row.url),
    publishedAt: row.reviewed_at || row.scraped_at || row.created_at,
    category: row.category || null,
    topic: row.topic || null,
    bucket,                                   // raw agent label, used as a chip
    slug: slugFor(row.category),
    edited: !!(row.edited_title || row.edited_summary),
    // Editor prominence, 1-5 where 5 = breaking (was wrongly read as 1 = lead).
    prominence: row.prominence ?? null,
    importance: row.prominence != null && row.prominence >= 4 ? row.prominence : null,
    // AI fact check (see email agent docs/FACT_CHECKING.md): 0-100 score,
    // band label, and the per-claim audit trail rendered in the reader.
    factScore: row.fact_score ?? null,
    factLabel: row.fact_label || null,
    factNotes: row.fact_notes || null,
    // Alternate reader versions generated at approval:
    // { eli5, tldr[], deep_dive, key_numbers[] }
    versions: row.versions || null,
  }
}

// Light list payload — NO raw_content (the full scraped article text). Pulling
// it for every approved row on every poll is large enough to hit the anon role's
// statement timeout and fail the whole fetch; the list/reading views don't use
// it (case-study bodies come from corporate_cases). Keeping this lean makes the
// pull fast and reliable.
const SELECT_BASE =
  'id,title,edited_title,summary,edited_summary,source,url,topic,category,section,prominence,status,reviewed_at,scraped_at,created_at'
// Fact check + alternate versions arrived later; fall back to the base list if
// the DB migration hasn't been applied yet so the feed never breaks on deploy order.
const SELECT = `${SELECT_BASE},fact_score,fact_label,fact_notes,versions`

const missingColumn = (error) => error && /column|does not exist/i.test(error.message || '')

// Every approved item, newest first.
export async function fetchApproved() {
  const query = (cols) => supabase
    .from('articles')
    .select(cols)
    .in('status', ['approved', 'sent'])
    .order('reviewed_at', { ascending: false, nullsFirst: false })
    .order('scraped_at', { ascending: false })
  let { data, error } = await query(SELECT)
  if (missingColumn(error)) ({ data, error } = await query(SELECT_BASE))
  if (error) throw error
  return (data || []).map(normalize)
}

// Approved items mapped to a single website category slug.
export async function fetchApprovedByCategory(slug) {
  const all = await fetchApproved()
  return all.filter((a) => a.slug === slug)
}

// Long-form topic FEATURES (the daily case study per topic) — the long
// counterpart to the short briefs in `articles`. Read from editorial_drafts.
// topic_slug already matches our website slugs (real-estate / automobile /
// health-wellness / tech-ai / markets-startups).
export async function fetchFeatures() {
  const FEATURE_BASE = 'id,topic_slug,topic_name,headline,summary,detail,primary_source_url,primary_source_title,generated_at,status'
  const query = (cols) => supabase
    .from('editorial_drafts')
    .select(cols)
    .in('status', ['approved', 'published'])
    .order('generated_at', { ascending: false })
  let { data, error } = await query(`${FEATURE_BASE},fact_score,fact_label,fact_notes,versions`)
  if (missingColumn(error)) ({ data, error } = await query(FEATURE_BASE))
  if (error) throw error
  return (data || []).map((d) => ({
    id: `feature-${d.id}`,         // prefixed so it never collides with a brief id
    kind: 'feature',
    slug: d.topic_slug,
    headline: decodeEntities(d.headline),
    summary: decodeEntities(d.summary || ''),
    body: decodeEntities(d.detail || d.summary || ''),
    source: decodeEntities(d.primary_source_title || ''),
    sourceUrl: d.primary_source_url || '',
    publishedAt: d.generated_at,
    bucket: d.topic_name,
    factScore: d.fact_score ?? null,
    factLabel: d.fact_label || null,
    factNotes: d.fact_notes || null,
    versions: d.versions || null,
  }))
}

export async function fetchFeaturesByCategory(slug) {
  const all = await fetchFeatures()
  return all.filter((f) => f.slug === slug)
}

// Breaking score — MIRRORS the SQL single source of truth
// (supabase/migrations breaking_score fn in the agent repo):
// prominence x cross-outlet velocity x fact trust, decayed with ~5.5h half-life.
export function breakingScore(item) {
  const prominence = item.prominence ?? 2
  const sources = Number(item?.factNotes?.source_count ?? 1)
  const fact = item.factScore ?? 60
  const ageHours = Math.max((Date.now() - new Date(item.publishedAt).getTime()) / 3_600_000, 0)
  const raw = (prominence / 5) * 45 + (Math.min(Math.max(sources - 1, 0), 3) / 3) * 30 + (fact / 100) * 25
  return raw * Math.exp(-ageHours / 8)
}

// True for stories worth the BREAKING banner: editor-rated high, corroborated
// by 2+ outlets (or rated 5), fresh, and not in the unverified band.
export function isBreaking(item) {
  const prominence = item.prominence ?? 0
  const sources = Number(item?.factNotes?.source_count ?? 1)
  const ageHours = (Date.now() - new Date(item.publishedAt).getTime()) / 3_600_000
  const factOk = item.factScore == null || item.factScore >= 40
  return prominence >= 4 && (sources >= 2 || prominence === 5) && ageHours < 24 && factOk
}

// Pretty label for a category slug (for chips/sections on the home page).
export const SLUG_LABEL = {
  general: 'General',
  'real-estate': 'Real Estate',
  'automobile': 'Automobile',
  'health-wellness': 'Health & Wellness',
  'tech-ai': 'Tech & AI',
  'markets-startups': 'Markets & Startups',
}
