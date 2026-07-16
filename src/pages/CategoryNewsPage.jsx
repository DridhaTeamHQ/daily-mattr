import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import LmNav from '../components/lm/LmNav'
import LmCategoryHero from '../components/lm/LmCategoryHero'
import LmCategoryBar from '../components/lm/LmCategoryBar'
import LmArticleFeed from '../components/lm/LmArticleFeed'
import LmNewsStudio from '../components/lm/LmNewsStudio'
import LmTopicRail from '../components/lm/LmTopicRail'
import LmTopicTimeline from '../components/lm/LmTopicTimeline'
import LmFaq from '../components/lm/LmFaq'
import LmFooter from '../components/lm/LmFooter'
import { lmCategoryBySlug } from '../components/lm/lmCategories'
import { fetchApproved, fetchFeaturesByCategory, fetchTrendingTopics } from '../lib/content'
import { useLiveData } from '../lib/useLiveData'
import NotFoundPage from './NotFoundPage'

// Category reading page — Figma "Home" frame 1:5336: dark hero + date-grouped
// article briefs. Handles the 5 agent topics (each mixing short briefs with
// its long-read case studies from editorial_drafts) plus the /general feed.
const AGENT_SLUGS = new Set(['real-estate', 'automobile', 'health-wellness', 'tech-ai', 'markets-startups'])

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
        if (feed.general && a.slug === 'general') return true
        if (feed.category && a.slug === slug) return true
        if (feed.topics && a.slug === 'general' && feed.topics.includes(a.topic)) return true
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

  // Trending topics — General feed only. Fetched on mount and whenever the slug
  // changes; fetchTrendingTopics swallows its own errors (returns []), so this
  // never breaks the page. Opening a topic reveals its timeline overlay.
  const [topics, setTopics] = useState([])
  const [openTopic, setOpenTopic] = useState(null)
  useEffect(() => {
    if (slug !== 'general') { setTopics([]); return }
    let alive = true
    fetchTrendingTopics().then((t) => { if (alive) setTopics(t) })
    return () => { alive = false }
  }, [slug])

  // Filter pills. News Studio filters by SECTION (the scraper's feed topic —
  // National / International / Politics / …); category pages keep the
  // content-kind pills (All / Long reads / Briefs / Fact checked).
  const STUDIO_FILTERS = [
    ['all', 'All'],
    ['India', 'National'],
    ['World', 'International'],
    ['Politics', 'Politics'],
    ['Business', 'Business'],
    ['Sports', 'Sports'],
    ['Technology', 'Tech'],
    ['Science', 'Science'],
    ['Explained', 'Explained'],
  ]
  const [filter, setFilter] = useState('all')
  useEffect(() => { setFilter('all') }, [slug])
  const filtered = useMemo(() => {
    const list = items || []
    if (filter === 'all') return list
    if (slug === 'general') return list.filter((a) => a.topic === filter)
    if (filter === 'long') return list.filter((a) => a.kind === 'feature' || a.kind === 'case_study')
    if (filter === 'short') return list.filter((a) => a.kind === 'article')
    if (filter === 'fact') {
      return list
        .filter((a) => a.factScore != null)
        .slice()
        .sort((a, b) => b.factScore - a.factScore)
    }
    return list
  }, [items, filter, slug])

  // Unknown category → 404 (the /:category route matches any single segment).
  if (!cat && slug !== 'general') return <NotFoundPage />

  const heroTitle = cat?.hero || cat?.title || (slug === 'general' ? 'News Studio' : slug)
  const tagline = cat?.desc || 'The stories worth knowing — curated, summarized, and grouped by day.'
  const heroImage = cat?.poster || cat?.image || '/figma/hero-tech-ai-bg.png'

  return (
    <div className="min-h-screen bg-white font-bevietnam text-lm-800">
      <LmNav tone="dark" />
      <LmCategoryHero title={heroTitle} tagline={tagline} image={heroImage} slug={slug} />
      <LmCategoryBar
        active={slug}
        filter={filter}
        onFilter={setFilter}
        filters={slug === 'general' ? STUDIO_FILTERS : undefined}
      />
      {slug === 'general' && topics.length > 0 && (
        <div className="pt-[32px] sm:pt-[48px]">
          <LmTopicRail topics={topics} onOpen={setOpenTopic} />
        </div>
      )}
      {/* General = the image-led News Studio front page; category pages keep
          the original date-grouped brief feed. */}
      {slug === 'general' ? (
        <LmNewsStudio
          items={filtered}
          loading={loading}
          emptyLabel={
            filter === 'all'
              ? 'No stories here yet — check back soon.'
              : 'No stories in this section right now — check back soon.'
          }
        />
      ) : (
        <LmArticleFeed
          items={filtered}
          loading={loading}
          emptyLabel={
            filter === 'long'
              ? 'No long reads here yet — switch to Briefs or check back soon.'
              : filter === 'short'
                ? 'No briefs here yet — switch to Long reads or check back soon.'
                : filter === 'fact'
                  ? 'No fact-scored stories here yet — new approvals are scored automatically.'
                  : 'No stories here yet — check back soon.'
          }
        />
      )}
      <LmFaq />
      <LmFooter />
      {openTopic && (
        <LmTopicTimeline topic={openTopic} onClose={() => setOpenTopic(null)} />
      )}
    </div>
  )
}
