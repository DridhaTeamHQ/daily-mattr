// Shortly newsletter ingestion — the intelligent ranking pipeline.
// (Runs locally now; the same logic moves into the AWS Lambda later.)
//
//   1. Fetch each category from MULTIPLE Indian news sources (RSS).
//   2. Embed every article (OpenAI embeddings) and CLUSTER near-duplicates —
//      i.e. detect when the same story is reported by several outlets.
//   3. RANK clusters by how many distinct sources cover them (Perplexity-style):
//      more outlets = more important = shown first. Breaking / Major / normal.
//   4. GPT (gpt-4o-mini) writes ONE merged headline + a 360-400 char summary
//      per story, grounded only in the collected snippets.
//   5. Write public/data/newsletter/<category>.json — title + summary only,
//      no source names, no links.
//
// Run:  npm run news     (loads OPENAI_API_KEY from .env via --env-file)

import { writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'public', 'data', 'newsletter')

const API_KEY = process.env.OPENAI_API_KEY
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini'
const EMBED_MODEL = process.env.OPENAI_EMBED_MODEL || 'text-embedding-3-small'
const CLUSTER_THRESHOLD = Number(process.env.CLUSTER_THRESHOLD || 0.62) // cosine sim to merge
const PER_FEED = 14       // items pulled per feed
const MAX_ITEMS = 70      // cap items embedded per category
const CANDIDATES = 20     // clusters scored by GPT before curation
const TOP_CLUSTERS = 14   // stories kept per category after curation

const SUMMARY_MIN = 360
const SUMMARY_MAX = 400

const VALID = ['National','International','Finance','Sports','Entertainment','Lifestyle','Technology']

// ---- Multi-source feeds per category (best-effort; failures are skipped) ----
// Keys are the SITE's canonical category slugs (see src/lib/newsletterThemes.js)
// so each run writes public/data/newsletter/<slug>.json that the page fetches.
const FEEDS = {
  national: [
    ['Times of India', 'https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms'],
    ['NDTV',           'https://feeds.feedburner.com/ndtvnews-india-news'],
    ['The Hindu',      'https://www.thehindu.com/news/national/feeder/default.rss'],
    ['Indian Express', 'https://indianexpress.com/section/india/feed/'],
    ['Hindustan Times','https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml'],
  ],
  international: [
    ['Times of India', 'https://timesofindia.indiatimes.com/rssfeeds/296589292.cms'],
    ['NDTV',           'https://feeds.feedburner.com/ndtvnews-world-news'],
    ['The Hindu',      'https://www.thehindu.com/news/international/feeder/default.rss'],
    ['Indian Express', 'https://indianexpress.com/section/world/feed/'],
    ['Hindustan Times','https://www.hindustantimes.com/feeds/rss/world-news/rssfeed.xml'],
  ],
  finance: [
    ['Times of India', 'https://timesofindia.indiatimes.com/rssfeeds/1898055.cms'],
    ['NDTV',           'https://feeds.feedburner.com/ndtvprofit-latest'],
    ['The Hindu',      'https://www.thehindu.com/business/feeder/default.rss'],
    ['Indian Express', 'https://indianexpress.com/section/business/feed/'],
    ['Hindustan Times','https://www.hindustantimes.com/feeds/rss/business/rssfeed.xml'],
  ],
  sports: [
    ['Times of India', 'https://timesofindia.indiatimes.com/rssfeeds/4719148.cms'],
    ['NDTV',           'https://feeds.feedburner.com/ndtvsports-latest'],
    ['The Hindu',      'https://www.thehindu.com/sport/feeder/default.rss'],
    ['Indian Express', 'https://indianexpress.com/section/sports/feed/'],
    ['Hindustan Times','https://www.hindustantimes.com/feeds/rss/sports/rssfeed.xml'],
  ],
  entertainment: [
    ['Times of India', 'https://timesofindia.indiatimes.com/rssfeeds/1081479906.cms'],
    ['NDTV',           'https://feeds.feedburner.com/ndtvmovies-latest'],
    ['The Hindu',      'https://www.thehindu.com/entertainment/feeder/default.rss'],
    ['Indian Express', 'https://indianexpress.com/section/entertainment/feed/'],
    ['Hindustan Times','https://www.hindustantimes.com/feeds/rss/entertainment/rssfeed.xml'],
  ],
  lifestyle: [
    ['Times of India', 'https://timesofindia.indiatimes.com/rssfeeds/2886704.cms'],
    ['The Hindu',      'https://www.thehindu.com/life-and-style/feeder/default.rss'],
    ['Hindustan Times','https://www.hindustantimes.com/feeds/rss/lifestyle/rssfeed.xml'],
    ['Indian Express', 'https://indianexpress.com/section/lifestyle/feed/'],
  ],
  technology: [
    ['Times of India', 'https://timesofindia.indiatimes.com/rssfeeds/66949542.cms'],
    ['NDTV',           'https://feeds.feedburner.com/gadgets360-latest'],
    ['Indian Express', 'https://indianexpress.com/section/technology/feed/'],
    ['Hindustan Times','https://www.hindustantimes.com/feeds/rss/technology/rssfeed.xml'],
  ],
}
const CATEGORY_LABEL = {
  national: 'National', international: 'International', finance: 'Finance',
  sports: 'Sports', entertainment: 'Entertainment', lifestyle: 'Lifestyle',
  technology: 'Technology',
}

// ---------------- RSS parsing ----------------
function decodeEntities(s) {
  return s.replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>').replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'").replace(/&#\d+;/g, ' ')
}
function clean(input) {
  let s = String(input).replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '')
  s = s.replace(/<[^>]+>/g, ' '); s = decodeEntities(s); s = s.replace(/<[^>]+>/g, ' '); s = decodeEntities(s)
  return s.replace(/\s+/g, ' ').trim()
}
function pick(block, tag) {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))
  return m ? clean(m[1]) : ''
}
function parseRss(xml, max) {
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || []
  const out = []
  for (const b of blocks) {
    const title = pick(b, 'title')
    if (!title) continue
    out.push({ title, description: pick(b, 'description'), link: pick(b, 'link') || pick(b, 'guid'), pubDate: pick(b, 'pubDate') })
    if (out.length >= max) break
  }
  return out
}
function toMs(pubDate) { const t = Date.parse(pubDate); return Number.isNaN(t) ? Date.now() : t }

async function fetchFeed(source, url) {
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 ShortlyNewsBot' }, redirect: 'follow' })
    if (!r.ok) return []
    return parseRss(await r.text(), PER_FEED).map((it) => ({ ...it, source }))
  } catch { return [] }
}

// When the RSS snippet is too thin to summarize, pull real text from the article
// page itself (og:description + first paragraphs) so GPT has something to work from.
async function fetchArticleText(url) {
  if (!url || !/^https?:/i.test(url)) return ''
  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ShortlyNewsBot/1.0)' },
      redirect: 'follow',
      signal: AbortSignal.timeout(8000),
    })
    if (!r.ok) return ''
    const html = await r.text()
    const parts = []
    const og = html.match(/<meta[^>]+(?:property|name)=["']og:description["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']og:description["']/i)
    const md = html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']+)["']/i)
    if (og) parts.push(decodeEntities(og[1]))
    else if (md) parts.push(decodeEntities(md[1]))
    const paras = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map((m) => clean(m[1]))
      .filter((p) => p.length > 60 && !/cookie|subscribe|sign ?in|advertisement|newsletter|©/i.test(p))
      .slice(0, 4)
    parts.push(...paras)
    return parts.join(' ').replace(/\s+/g, ' ').trim().slice(0, 1200)
  } catch { return '' }
}

// ---------------- Embeddings + clustering ----------------
async function embed(texts) {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({ model: EMBED_MODEL, input: texts }),
  })
  if (!res.ok) throw new Error(`embeddings ${res.status}: ${(await res.text()).slice(0, 160)}`)
  const data = await res.json()
  return data.data.sort((a, b) => a.index - b.index).map((d) => d.embedding)
}
function cosine(a, b) {
  let dot = 0, na = 0, nb = 0
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i] }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1)
}
// Greedy clustering: assign each item to the most similar existing cluster (centroid), else start a new one.
function cluster(items, embeddings, threshold) {
  const clusters = []
  for (let i = 0; i < items.length; i++) {
    const e = embeddings[i]
    let best = null, bestSim = threshold
    for (const c of clusters) {
      const sim = cosine(e, c.centroid)
      if (sim > bestSim) { bestSim = sim; best = c }
    }
    if (best) {
      best.members.push(items[i])
      for (let k = 0; k < e.length; k++) best.sum[k] += e[k]
      best.centroid = best.sum.map((v) => v / best.members.length)
    } else {
      clusters.push({ members: [items[i]], sum: e.slice(), centroid: e.slice() })
    }
  }
  return clusters
}

// ---------------- GPT: merged headline + 360-400 char summary ----------------
async function writeStories(stories, label) {
  const system = [
    'You are a senior wire-service news editor (think Reuters / AP / PTI) writing concise briefs for "Shortly", a fast Indian news app.',
    'Each input "story" is a cluster of headlines/snippets from one or more outlets about the SAME event.',
    'Write in professional news style, using ONLY the provided text. Never invent facts, numbers, names or quotes.',
    'For each story return:',
    '  "headline": a sharp, specific news headline in active voice, max ~12 words. No outlet names, no clickbait, no questions.',
    `  "summary": 3-4 sentences in inverted-pyramid news style (most important fact first), neutral and concrete, about ${SUMMARY_MIN}-${SUMMARY_MAX} characters. Add real detail from the snippet; never merely restate the headline. MUST end on a complete sentence with proper punctuation; never an ellipsis; never exceed ${SUMMARY_MAX} characters.`,
    '  "tags": 2-3 short topical tags (1-2 words).',
    `  "category": exactly one of ${VALID.join(', ')}.`,
    '  "importance": integer 1-10 judged like a front-page editor. 9-10 = major national/international significance (government, policy, economy, conflict, major incidents, courts, big business). 5-7 = solid everyday news. 1-3 = soft trivia, listicles, evergreen explainers, how-tos, promotional pieces, minor local events or celebrity gossip.',
    '  "kind": "news" for genuine news events, "feature" for human-interest features, or "filler" for listicles / explainers / evergreen / how-to / trivia / promotional content.',
    'Respond ONLY as JSON: {"stories":[{"id":number,"headline":string,"summary":string,"tags":string[],"category":string,"importance":number,"kind":string}]}.',
  ].join('\n')
  const user = JSON.stringify({
    requestedCategory: label,
    stories: stories.map((s, i) => ({
      id: i,
      headlines: s.headlines.slice(0, 4),
      snippet: s.snippet.slice(0, 900),
    })),
  })

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
        body: JSON.stringify({
          model: MODEL, temperature: 0.4, max_tokens: 8000, response_format: { type: 'json_object' },
          messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
        }),
      })
      if (!res.ok) throw new Error(`chat ${res.status}: ${(await res.text()).slice(0, 160)}`)
      const data = await res.json()
      const parsed = JSON.parse(data.choices?.[0]?.message?.content ?? '{}')
      const byId = new Map()
      for (const s of parsed.stories ?? []) if (typeof s?.id === 'number') byId.set(s.id, s)
      return stories.map((s, i) => byId.get(i) || {})
    } catch (err) {
      if (attempt === 1) throw err
      await new Promise((r) => setTimeout(r, 1200))
    }
  }
}

// Keep only WHOLE sentences, packed up to the max. Never cut mid-sentence.
function clampSummary(text) {
  let s = (text || '').trim().replace(/\s+/g, ' ')
  s = s.replace(/\s*(?:\.\.\.|…)\s*$/, '') // drop any trailing ellipsis from the model

  // Already clean and within range, and ends on a real sentence? keep it.
  if (s.length <= SUMMARY_MAX && /[.!?]["')\]]?$/.test(s)) return s

  // Split into sentences and add them while they fit.
  const sentences = s.match(/[^.!?]+[.!?]+["')\]]*/g) || [s]
  let out = ''
  for (const sentence of sentences) {
    const next = (out ? out + ' ' : '') + sentence.trim()
    if (next.length > SUMMARY_MAX) break
    out = next
  }

  // First sentence alone exceeded the max: hard-trim at a word boundary and end cleanly.
  if (!out) {
    const slice = s.slice(0, SUMMARY_MAX)
    out = slice.slice(0, slice.lastIndexOf(' ') > 0 ? slice.lastIndexOf(' ') : SUMMARY_MAX).trim()
  }
  // Guarantee the summary ends on a sentence (covers short, punctuation-less fragments).
  if (!/[.!?]["')\]]?$/.test(out)) out += '.'
  return out
}
function levelFor(sourceCount) {
  if (sourceCount >= 3) return 'breaking'
  if (sourceCount >= 2) return 'major'
  return 'normal'
}

// ---------------- per-category run ----------------
async function runCategory(catId) {
  const feeds = FEEDS[catId] || []
  const label = CATEGORY_LABEL[catId]

  // 1. fetch all sources in parallel
  const lists = await Promise.all(feeds.map(([s, u]) => fetchFeed(s, u)))
  let items = lists.flat()
  // de-duplicate exact same (source + title)
  const seen = new Set()
  items = items.filter((it) => {
    const k = it.source + '|' + it.title.toLowerCase()
    if (seen.has(k)) return false
    seen.add(k); return true
  })
  // Freshness: keep only today's news (last MAX_AGE_HOURS). Fall back to all if a
  // slow feed has too few recent items, so a category is never left empty.
  const maxAgeMs = (Number(process.env.MAX_AGE_HOURS) || 30) * 3600 * 1000
  const fresh = items.filter((it) => Date.now() - toMs(it.pubDate) <= maxAgeMs)
  items = (fresh.length >= 8 ? fresh : items).slice(0, MAX_ITEMS)
  if (items.length === 0) throw new Error('no items from any source')

  const sourcesUsed = new Set(items.map((i) => i.source)).size

  // 2. embed + cluster
  const embeddings = await embed(items.map((i) => `${i.title}. ${i.description}`.slice(0, 500)))
  const clusters = cluster(items, embeddings, CLUSTER_THRESHOLD)

  // 3. score each cluster: distinct sources dominate, recency breaks ties
  const now = Date.now()
  const scored = clusters.map((c) => {
    const sources = new Set(c.members.map((m) => m.source))
    const latest = Math.max(...c.members.map((m) => toMs(m.pubDate)))
    const ageMin = (now - latest) / 60000
    return {
      members: c.members,
      sourceCount: sources.size,
      latest,
      score: sources.size * 100000 - ageMin,
      headlines: [...new Set(c.members.map((m) => m.title))],
      snippet: c.members.map((m) => m.description).filter(Boolean).join(' \n ').slice(0, 1200),
    }
  }).sort((a, b) => b.score - a.score).slice(0, CANDIDATES)

  // 3b. For thin clusters, fetch the real article body so GPT can actually summarize.
  await Promise.all(scored.map(async (s) => {
    if (s.snippet.length >= 240) return
    const m = s.members.find((x) => x.link)
    if (!m) return
    const body = await fetchArticleText(m.link)
    if (body) s.snippet = (s.snippet + ' ' + body).replace(/\s+/g, ' ').trim().slice(0, 1200)
  }))

  // 4. GPT writes each story AND scores its newsworthiness.
  const written = await writeStories(scored, label)
  const tnow = Date.now()

  let articles = scored.map((s, i) => {
    const w = written[i] || {}
    // Distinct outlets that covered this story (first link kept per outlet).
    const srcMap = new Map()
    for (const m of s.members) if (m.source && !srcMap.has(m.source)) srcMap.set(m.source, m.link || '')
    const sources = [...srcMap.entries()].map(([name, url]) => ({ name, url }))
    // A real summary: present, substantial, and not just an echo of the headline.
    const hn = String(w.headline || s.headlines[0]).replace(/[^a-z0-9]/gi, '').toLowerCase()
    const sn = String(w.summary || '').replace(/[^a-z0-9]/gi, '').toLowerCase()
    const hasSummary = sn.length >= 80 && sn !== hn && sn.length > hn.length + 15
    const category = VALID.includes(w.category) ? w.category : label
    const importance = Math.max(1, Math.min(10, Math.round(Number(w.importance) || 4)))
    const kind = ['news', 'feature', 'filler'].includes(w.kind) ? w.kind : 'news'
    const ageMin = (tnow - s.latest) / 60000
    return {
      id: `${catId}-${i}`,
      written: hasSummary,
      headline: (w.headline || s.headlines[0]).trim(),
      // Never show raw article text: only a GPT-written summary, else fall back to the headline.
      summary: clampSummary(hasSummary ? w.summary : s.headlines[0]),
      category,
      tags: Array.isArray(w.tags) ? w.tags.slice(0, 3) : [],
      sourceCount: s.sourceCount,
      sources,
      level: levelFor(s.sourceCount),
      importance,
      kind,
      // Importance leads the ranking, cross-source coverage next, recency breaks ties.
      score: Math.round(importance * 1_000_000 + s.sourceCount * 100_000 - ageMin),
      publishedAt: new Date(s.latest).toISOString(),
    }
  })

  // 5. Curate: only show GPT-written stories (never raw text), drop clear filler, then rank.
  const written2 = articles.filter((a) => a.written)
  const pool = written2.length >= 5 ? written2 : articles
  const strong = pool.filter((a) => !(a.kind === 'filler' && a.importance < 5 && a.sourceCount < 2))
  articles = (strong.length >= 5 ? strong : pool)
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_CLUSTERS)
    .map((a, i) => {
      const { written, ...rest } = a
      return { ...rest, rank: i + 1 }
    })

  const dropped = scored.length - articles.length
  return { sourcesUsed, total: items.length, clusters: clusters.length, dropped, articles }
}

// ---------------- main ----------------
async function run() {
  if (!API_KEY) { console.error('✖ OPENAI_API_KEY not set. Run via `npm run news`.'); process.exit(1) }
  await mkdir(OUT_DIR, { recursive: true })
  console.log(`\n🧠 Shortly intelligent ingestion — chat:${MODEL} embed:${EMBED_MODEL} threshold:${CLUSTER_THRESHOLD}\n`)

  let ok = 0
  for (const catId of Object.keys(FEEDS)) {
    process.stdout.write(`• ${CATEGORY_LABEL[catId].padEnd(14)} `)
    try {
      const r = await runCategory(catId)
      const breaking = r.articles.filter((a) => a.level === 'breaking').length
      const avgImp = (r.articles.reduce((s, a) => s + a.importance, 0) / (r.articles.length || 1)).toFixed(1)
      await writeFile(join(OUT_DIR, `${catId}.json`),
        JSON.stringify({ category: catId, updatedAt: new Date().toISOString(), articles: r.articles }, null, 2))
      console.log(`✓ ${r.articles.length} stories from ${r.sourcesUsed} sources (avg importance ${avgImp}, ${breaking} breaking, ${r.dropped} filler dropped)`)
      ok++
    } catch (err) {
      console.log(`✖ ${err.message}`)
    }
  }
  console.log(`\n✅ Done: ${ok}/${Object.keys(FEEDS).length} categories → public/data/newsletter/\n`)
}

run().catch((e) => { console.error(e); process.exit(1) })
