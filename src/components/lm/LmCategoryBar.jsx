import React from 'react'

// Sticky reading toolbar — sits under the fixed nav on category pages.
// Category chips removed as per user request (since category can be selected from header nav).
// The All / Long reads / Briefs filter is shifted to the left side.
const FILTERS = [
  ['all', 'All'],
  ['long', 'Long reads'],
  ['short', 'Briefs'],
]

export default function LmCategoryBar({ active, filter = 'all', onFilter, showFilter = true }) {
  if (!showFilter) return null

  return (
    <div className="sticky top-[70px] z-40 border-b border-lm-200 bg-white/90 backdrop-blur-[12.5px]">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-start px-4 py-[14px] sm:px-8 lg:px-[32px]">
        {/* Long / short filter moved to the left side with larger size */}
        <div className="flex shrink-0 items-center gap-[6px] rounded-[100px] border border-lm-200 bg-lm-50 p-[5px] shadow-sm">
          {FILTERS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => onFilter?.(id)}
              className={`rounded-[100px] px-[22px] py-[9px] font-bevietnam text-[15px] font-semibold transition-all duration-200 ${
                filter === id ? 'bg-lm-800 text-white shadow' : 'text-lm-500 hover:text-lm-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
