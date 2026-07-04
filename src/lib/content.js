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
    // prominence 1 = lead story -> treat as a "deep" read
    importance: row.prominence === 1 ? 9 : null,
  }
}

// Light list payload — NO raw_content (the full scraped article text). Pulling
// it for every approved row on every poll is large enough to hit the anon role's
// statement timeout and fail the whole fetch; the list/reading views don't use
// it (case-study bodies come from corporate_cases). Keeping this lean makes the
// pull fast and reliable.
const SELECT =
  'id,title,edited_title,summary,edited_summary,source,url,topic,category,section,prominence,status,reviewed_at,scraped_at,created_at'

// Every approved item, newest first.
export async function fetchApproved() {
  const { data, error } = await supabase
    .from('articles')
    .select(SELECT)
    .in('status', ['approved', 'sent'])
    .order('reviewed_at', { ascending: false, nullsFirst: false })
    .order('scraped_at', { ascending: false })
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
  const { data, error } = await supabase
    .from('editorial_drafts')
    .select('id,topic_slug,topic_name,headline,summary,detail,primary_source_url,primary_source_title,generated_at,status')
    .in('status', ['approved', 'published'])
    .order('generated_at', { ascending: false })
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
  }))
}

export async function fetchFeaturesByCategory(slug) {
  const all = await fetchFeatures()
  return all.filter((f) => f.slug === slug)
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
