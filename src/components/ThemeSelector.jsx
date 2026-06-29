import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { NEWSLETTER_THEMES } from '../lib/newsletterThemes'

// "Explore the editions" — the category cover-card grid. Each card links to its
// stories page (Case Studies has its own page via cat.href).
export default function ThemeSelector() {
  return (
    <section id="themes" className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 mt-16 scroll-mt-28">
      <div className="mb-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
          Explore the editions
        </h2>
        <p className="mt-2 text-base sm:text-lg text-gray-600">
          Browse every category — the day's headlines, the topics, and the case studies.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {NEWSLETTER_THEMES.map((cat, i) => {
          return (
            <motion.div
              key={cat.slug}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="group text-left rounded-2xl p-4 flex flex-col gap-4 transition-colors bg-[#fbf7f0] border border-[#c9a227]/20 hover:border-[#c9a227]/50"
            >
              {/* Cover + title link to the category's stories feed (or dedicated page) */}
              <Link to={cat.href || `/${cat.slug}`} className="flex flex-col gap-4">
                {/* Number label */}
                <div className="w-full">
                  <div className="h-px w-full bg-gray-200" />
                  <div className="pt-2">
                    <span className="text-sm font-medium text-gray-500">{String(i + 1).padStart(2, '0')}</span>
                    <div className="mt-1 h-px w-6 opacity-30 bg-gray-500" />
                  </div>
                </div>

                {/* Cover */}
                <div className="relative h-[236px] w-full overflow-hidden rounded-xl">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.label}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient}`}>
                      <div
                        className="absolute inset-0 opacity-25"
                        style={{
                          backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)',
                          backgroundSize: '16px 16px',
                        }}
                      />
                      <span className="absolute bottom-4 left-5 text-white/30 font-black leading-none text-6xl select-none">
                        {cat.label[0]}
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="text-3xl font-bold leading-[1.1] text-gray-900">{cat.label}</h3>
                <p className="text-base leading-relaxed text-gray-600">{cat.desc}</p>
              </Link>

              {/* Browse-only: link to the category's stories page (or the case-studies page). */}
              <Link
                to={cat.href || `/${cat.slug}`}
                className="inline-flex items-center gap-2 py-1 text-base font-medium text-[#7b1e3b] hover:text-[#d81b60]"
              >
                {cat.href ? 'Read case studies' : 'Read more'}
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
