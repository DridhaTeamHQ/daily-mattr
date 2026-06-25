import React, { useState } from 'react'
import NewsletterNav from '../components/NewsletterNav'
import Footer from '../components/Footer'
import NewsletterHero from '../components/NewsletterHero'
import ThemeSelector from '../components/ThemeSelector'
import NewsletterSubscribe from '../components/NewsletterSubscribe'
import EditionStories from '../components/EditionStories'
import './NewsletterPage.css'

// The newsletter page follows the light Figma design (frame 1:1292):
//   Hero (pins + recedes)  ->  collage banner rises over it  ->  Select Your
//   Theme  ->  Subscribe  ->  Footer.
const NewsletterPage = () => {
  const [subCategories, setSubCategories] = useState([])
  const toggleSubCategory = (slug) =>
    setSubCategories((c) => (c.includes(slug) ? c.filter((x) => x !== slug) : [...c, slug]))

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900">
      <NewsletterNav />

      {/* Hero pins (native sticky) and gently recedes while the collage banner
          rises and covers it — see NewsletterPage.css. */}
      <div className="nl-stack">
        <div className="nl-hero-pin">
          <NewsletterHero />
        </div>

        <div className="nl-banner">
          {/* Edge-to-edge collage banner (full-bleed) */}
          <img
            src="/newsletter/banner.png"
            alt="Daily Mattr — national, finance, sports, lifestyle, tech and more"
            className="block w-full h-auto"
          />
        </div>
      </div>

      <main className="nl-after">
        {/* Live: today's approved stories + the case-study spotlight */}
        <div id="stories" className="mt-16 scroll-mt-24">
          <EditionStories />
        </div>

        <div id="themes" className="mt-20 scroll-mt-24">
          <ThemeSelector selected={subCategories} onToggle={toggleSubCategory} />
        </div>

        <section id="subscribe" className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 scroll-mt-28">
          <div className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d81b60]">✦ Make it yours ✦</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#7b1e3b]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>Build your edition</h2>
            <p className="mt-2 text-gray-600">Pick when it lands, what it covers, and how broadly we curate — watch it come together on the right.</p>
          </div>
          <NewsletterSubscribe categories={subCategories} onCategoriesChange={setSubCategories} />
        </section>

        <div className="mt-16">
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default NewsletterPage
