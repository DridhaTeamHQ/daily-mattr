import React from 'react'
import LmNav from '../components/lm/LmNav'
import LmCategoryHero from '../components/lm/LmCategoryHero'
import LmCategoryBar from '../components/lm/LmCategoryBar'
import LmArticleFeed from '../components/lm/LmArticleFeed'
import LmFaq from '../components/lm/LmFaq'
import LmFooter from '../components/lm/LmFooter'
import { lmCategoryBySlug } from '../components/lm/lmCategories'
import { fetchCaseStudies } from '../lib/content'
import { useLiveData } from '../lib/useLiveData'

// Corporate case studies — same "Home" reading design as the category pages,
// fed from corporate_cases. Every card is a LONG STORY.
export default function CaseStudiesPage() {
  const { data: items, loading } = useLiveData(() => fetchCaseStudies(), [], { intervalMs: 30000 })
  const cat = lmCategoryBySlug('case-studies')

  return (
    <div className="min-h-screen bg-white font-bevietnam text-lm-800">
      <LmNav tone="dark" />
      <LmCategoryHero
        title={cat?.hero || 'Corporate Cases'}
        tagline={cat?.desc}
        image={cat?.poster || cat?.image}
        slug="case-studies"
      />
      {/* Everything here is a long read — no filter needed */}
      <LmCategoryBar active="case-studies" showFilter={false} />
      <LmArticleFeed items={items || []} loading={loading} emptyLabel="No case studies published yet — check back soon." />
      <LmFaq />
      <LmFooter />
    </div>
  )
}
