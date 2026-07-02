import React from 'react'
import { Link } from 'react-router-dom'
import { LM_CATEGORIES } from './lmCategories'

// Sticky reading toolbar — sits under the fixed nav on category pages:
// horizontally-scrollable category chips (active = dark pill) + an
// All / Long reads / Briefs filter. One tap to switch feeds anywhere.
const FILTERS = [
  ['all', 'All'],
  ['long', 'Long reads'],
  ['short', 'Briefs'],
]

export default function LmCategoryBar({ active, filter = 'all', onFilter, showFilter = true }) {
  return (
    <div className="sticky top-[70px] z-40 border-b border-lm-200 bg-white/90 backdrop-blur-[12.5px]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[8px] px-4 py-[10px] sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-[32px]">
        {/* Category chips */}
        <div className="scrollbar-none -mx-4 flex gap-[8px] overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {LM_CATEGORIES.map((c) => {
            const on = c.slug === active
            return (
              <Link
                key={c.slug}
                to={c.slug === 'case-studies' ? '/case-studies' : `/${c.slug}`}
                className={`whitespace-nowrap rounded-[100px] border px-[14px] py-[8px] font-bevietnam text-[13px] font-medium transition-colors ${
                  on ? 'border-lm-800 bg-lm-800 text-white' : 'border-lm-300 bg-white text-lm-500 hover:border-lm-500 hover:text-lm-800'
                }`}
              >
                {c.hero || c.title}
              </Link>
            )
          })}
        </div>

        {/* Long / short filter */}
        {showFilter && (
          <div className="flex shrink-0 items-center gap-[4px] self-start rounded-[100px] border border-lm-200 bg-lm-50 p-[3px] lg:self-auto">
            {FILTERS.map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => onFilter?.(id)}
                className={`rounded-[100px] px-[12px] py-[6px] font-bevietnam text-[12px] font-semibold transition-colors ${
                  filter === id ? 'bg-lm-800 text-white' : 'text-lm-500 hover:text-lm-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
