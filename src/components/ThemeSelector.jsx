import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { triggerHaptic } from '../utils/haptics'
import { NEWSLETTER_THEMES } from '../lib/newsletterThemes'

// "Select Your Theme" — the category cover-card grid (Figma frame 1:1337).
// `selected` is an array of category slugs; `onToggle(slug)` adds/removes one.
export default function ThemeSelector({ selected = [], onToggle }) {
  // The newsletter page follows the light Figma design regardless of the site theme.
  const dark = false

  return (
    <section id="themes" className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 mt-16 scroll-mt-28">
      <div className="mb-8">
        <h2 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
          Select Your Theme
        </h2>
        <p className={`mt-2 text-base sm:text-lg ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
          Choose the editorial pillars for your personal wrap.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {NEWSLETTER_THEMES.map((cat, i) => {
          const active = selected.includes(cat.slug)
          return (
            <motion.div
              key={cat.slug}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className={`group text-left rounded-2xl p-4 flex flex-col gap-4 transition-colors bg-[#fbf7f0] border ${
                active ? 'border-[#7900d9]' : 'border-black/5 hover:border-black/15'
              }`}
            >
              {/* Cover + title link to the category's stories feed */}
              <Link to={`/${cat.slug}`} className="flex flex-col gap-4">
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

              {/* Add-to-wrap toggle (subscription selection) */}
              <button
                type="button"
                onClick={() => { triggerHaptic('light'); onToggle?.(cat.slug) }}
                className={`inline-flex items-center gap-2 py-1 text-base font-medium ${active ? 'text-purple-500' : 'text-gray-900 hover:text-purple-500'}`}
              >
                {active ? (
                  <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.7 7.7l-5.7 5.7a1 1 0 01-1.4 0L7.3 13a1 1 0 011.4-1.4l1.6 1.6 5-5a1 1 0 011.4 1.4z" /></svg>
                ) : (
                  <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" strokeLinecap="round" /></svg>
                )}
                {active ? 'Added to wrap' : 'Add to wrap'}
              </button>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
