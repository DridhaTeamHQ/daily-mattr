import React from 'react'
import LmNav from '../components/lm/LmNav'
import LmHero from '../components/lm/LmHero'
import LmDailyWeekly from '../components/lm/LmDailyWeekly'
import LmCategoryGrid from '../components/lm/LmCategoryGrid'
import LmFaq from '../components/lm/LmFaq'
import LmFooter from '../components/lm/LmFooter'

// Landing — LONG MATTR design (Figma R0PWgZZF2fEQt7bn6V6KPx, frame 1:59):
// nav -> hero (video panel + LONG MATTR) -> The Daily/The Weekly strip ->
// category grid -> FAQ -> footer with giant wordmark.
const NewsletterPage = () => {
  return (
    <div className="min-h-screen bg-white font-bevietnam text-lm-800">
      <LmNav />
      <LmHero />
      <LmDailyWeekly />
      <LmCategoryGrid />
      <LmFaq />
      <LmFooter />
    </div>
  )
}

export default NewsletterPage
