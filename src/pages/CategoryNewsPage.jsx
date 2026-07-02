import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import LmNav from '../components/lm/LmNav'
import LmCategoryHero from '../components/lm/LmCategoryHero'
import LmArticleFeed from '../components/lm/LmArticleFeed'
import LmFaq from '../components/lm/LmFaq'
import LmFooter from '../components/lm/LmFooter'
import { lmCategoryBySlug } from '../components/lm/lmCategories'
import { fetchApproved, fetchFeaturesByCategory } from '../lib/content'
import { useLiveData } from '../lib/useLiveData'
import NotFoundPage from './NotFoundPage'

// Category reading page — Figma "Home" frame 1:5336: dark hero + date-grouped
// article briefs. Handles both agent categories (real-estate, policy-partner,
// money-matters, wellness-daily) and general-news topic slugs (technology-ai,
// sports, national, international) plus the legacy /general feed.
const AGENT_SLUGS = new Set(['real-estate', 'policy-partner', 'money-matters', 'wellness-daily'])

export default function CategoryNewsPage() {
  const { category: slug = 'general' } = useParams()
  const cat = lmCategoryBySlug(slug)

  const fetcher = useMemo(() => {
    return async () => {
      const [articles, features] = await Promise.all([
        fetchApproved(),
        AGENT_SLUGS.has(slug) ? fetchFeaturesByCategory(slug).catch(() => []) : Promise.resolve([]),
      ])
      const feed = cat?.feed || {}
      const matches = (a) => {
        if (feed.category && a.slug === slug) return true
        if (feed.topics && a.slug === 'general' && feed.topics.includes(a.topic)) return true
        if (!cat && slug === 'general' && a.slug === 'general') return true
        return false
      }
      const list = [...features, ...articles.filter(matches)]
      // Newest first; within the same day, long stories lead.
      const weight = (x) => (x.kind === 'feature' || x.kind === 'case_study' ? 1 : 0)
      list.sort((a, b) => {
        const dayA = new Date(a.publishedAt).toDateString()
        const dayB = new Date(b.publishedAt).toDateString()
        if (dayA === dayB) return weight(b) - weight(a) || (new Date(b.publishedAt) - new Date(a.publishedAt))
        return new Date(b.publishedAt) - new Date(a.publishedAt)
      })
      return list
    }
  }, [slug, cat])

  const { data: items, loading } = useLiveData(fetcher, [slug], { intervalMs: 30000 })

  // Unknown category → 404 (the /:category route matches any single segment).
  if (!cat && slug !== 'general') return <NotFoundPage />

  const heroTitle = cat?.hero || cat?.title || (slug === 'general' ? 'The Daily' : slug)
  const tagline = cat?.desc || 'The stories worth knowing — curated, summarized, and grouped by day.'
  const heroImage = cat?.poster || cat?.image || '/figma/hero-tech-ai-bg.png'

  return (
    <div className="min-h-screen bg-white font-bevietnam text-lm-800">
      <LmNav tone="dark" />
      <LmCategoryHero title={heroTitle} tagline={tagline} image={heroImage} slug={slug} />
      <LmArticleFeed items={items || []} loading={loading} />
      <LmFaq />
      <LmFooter />
    </div>
  )
}
