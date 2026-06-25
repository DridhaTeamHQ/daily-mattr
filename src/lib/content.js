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

// Agent bucket (articles.category, else articles.topic) -> website theme slug.
const BUCKET_TO_SLUG = {
  // general news (articles.topic)
  India: 'national',
  Explained: 'national',
  World: 'international',
  Business: 'finance',
  Science: 'technology',
  // topic categories (articles.category)
  'Money Matters': 'finance',
  'Policy Partner': 'national',
  'Real Estate': 'lifestyle',
  'Wellness Daily': 'lifestyle',
  // 'Corporate Case' is intentionally unmapped — case studies live on their own
  // /case-studies page, not inside a category feed.
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
    body: row.raw_content || row.summary || '',
    source: row.source || '',
    sourceUrl: cleanUrl(row.url),
    publishedAt: row.reviewed_at || row.scraped_at || row.created_at,
    category: row.category || null,
    topic: row.topic || null,
    bucket,                                   // raw agent label, used as a chip
    slug: BUCKET_TO_SLUG[bucket] || null,
    edited: !!(row.edited_title || row.edited_summary),
    // prominence 1 = lead story -> treat as a "deep" read
    importance: row.prominence === 1 ? 9 : null,
  }
}

const SELECT =
  'id,title,edited_title,summary,edited_summary,raw_content,source,url,topic,category,section,prominence,status,reviewed_at,scraped_at,created_at'

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
  national: 'National',
  international: 'International',
  finance: 'Finance',
  sports: 'Sports',
  entertainment: 'Entertainment',
  lifestyle: 'Lifestyle',
  technology: 'Technology',
}
