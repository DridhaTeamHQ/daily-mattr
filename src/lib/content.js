// Live content layer — reads APPROVED content straight from the email agent's
// Supabase `articles` table, so anything the team approves (and any edits they
// make via edited_title / edited_summary) shows on the site automatically.
//
// The agent funnels everything into one table:
//   • Case studies        -> category = 'Corporate Case'   (kind: 'case_study')
//   • Topic short articles -> category in Real Estate / Policy Partner /
//                             Money Matters / Wellness Daily (kind: 'article')
//   • General news         -> category null, topic in India/World/Business/...
// We only ever read status in ('approved','sent') — drafts/pending never show.

import { supabase } from './supabaseClient'

export const CASE_STUDY_CATEGORY = 'Corporate Case'

// The four topic categories map 1:1 to their own pages. Everything else that
// isn't a case study (general news tagged India/World/Business/Explained/… )
// falls into the single "General" feed. Case studies are unmapped — they live
// on their own /case-studies page, not inside a category feed.
const TOPIC_SLUG = {
  'Real Estate': 'real-estate',
  'Policy Partner': 'policy-partner',
  'Money Matters': 'money-matters',
  'Wellness Daily': 'wellness-daily',
}
function slugFor(category) {
  if (category === CASE_STUDY_CATEGORY) return null
  return TOPIC_SLUG[category] || 'general'
}

// Drop the synthetic fragment the agent appends to make synced rows unique
// (e.g. "…/article#shortly-corporate-case-<uuid>").
const cleanUrl = (u) => (u ? u.split('#shortly')[0] || u : '')

function normalize(row) {
  const bucket = row.category || row.topic || ''
  const isCase = row.category === CASE_STUDY_CATEGORY
  return {
    id: row.id,
    kind: isCase ? 'case_study' : 'article',
    headline: row.edited_title || row.title,
    summary: row.edited_summary || row.summary || '',
    body: row.edited_summary || row.summary || '',
    source: row.source || '',
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

// Approved case studies, read from the source of truth: corporate_cases.
// (The agent does not reliably mirror approved cases into `articles`, so reading
// them from there missed them entirely.) Requires public read access to
// corporate_cases (status approved/published).
export async function fetchCaseStudies() {
  const { data, error } = await supabase
    .from('corporate_cases')
    .select('id,headline,company,case_type,summary,detail,source,source_url,generated_at,updated_at,status')
    .in('status', ['approved', 'published'])
    .order('generated_at', { ascending: false })
  if (error) throw error
  return (data || []).map((c) => ({
    id: c.id,
    kind: 'case_study',
    headline: c.headline,
    summary: c.summary || '',
    body: c.detail || c.summary || '',
    source: c.source || '',
    sourceUrl: c.source_url || '',
    publishedAt: c.generated_at,
    company: c.company || null,
    caseType: c.case_type || null,
  }))
}

// Long-form topic FEATURES (the in-depth "thesis" per category) — the long
// counterpart to the short briefs in `articles`. Read from editorial_drafts.
// topic_slug already matches our website slugs (real-estate / policy-partner /
// money-matters / wellness-daily).
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
    headline: d.headline,
    summary: d.summary || '',
    body: d.detail || d.summary || '',
    source: d.primary_source_title || '',
    sourceUrl: d.primary_source_url || '',
    publishedAt: d.generated_at,
    bucket: d.topic_name,
  }))
}

export async function fetchFeaturesByCategory(slug) {
  const all = await fetchFeatures()
  return all.filter((f) => f.slug === slug)
}

// One pass for the home page: latest approved news stories + the case studies.
export async function fetchEdition() {
  const [articles, caseStudies] = await Promise.all([
    fetchApproved(),
    fetchCaseStudies().catch(() => []),
  ])
  return {
    latest: articles.filter((a) => a.kind === 'article'),
    caseStudies,
  }
}

// Pretty label for a category slug (for chips/sections on the home page).
export const SLUG_LABEL = {
  general: 'General',
  'real-estate': 'Real Estate',
  'policy-partner': 'Policy Partner',
  'money-matters': 'Money Matters',
  'wellness-daily': 'Wellness Daily',
}
