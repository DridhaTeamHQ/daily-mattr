// Single swap-point between local sample data and the live AWS pipeline.
//
// LOCAL / DEMO (now): returns curated sample articles so the UI runs offline.
// PRODUCTION (later): set VITE_NEWS_BASE_URL to where the ingestion Lambda
//   publishes per-category JSON (e.g. https://www.shortlyindia.com/data/newsletter)
//   and this fetches `${base}/<category>.json` — no other code changes needed.
//
// The JSON shape is identical in both cases:
//   { category, updatedAt, articles: [{ id, headline, summary, source,
//     sourceUrl, imageUrl, publishedAt, tags }] }

import { sampleNewsletter } from '../data/sampleNewsletter'

// Where the published per-category JSON lives.
//  - Local: `npm run news` writes to public/data/newsletter/ → served at /data/newsletter
//  - Production: set VITE_NEWS_BASE_URL to the CloudFront path the AWS Lambda publishes to
const NEWS_BASE = import.meta.env.VITE_NEWS_BASE_URL || '/data/newsletter'

export async function fetchNewsletter(category) {
  // 1. Try the real (GPT-written) published data.
  try {
    const res = await fetch(`${NEWS_BASE}/${category}.json`, { cache: 'no-store' })
    if (res.ok) return await res.json()
  } catch {
    /* not generated yet — fall back to sample below */
  }

  // 2. Fallback: bundled sample data so the UI always works.
  await new Promise((r) => setTimeout(r, 250))
  const articles = sampleNewsletter[category] || sampleNewsletter.top || []
  return { category, updatedAt: new Date().toISOString(), articles, sample: true }
}
