import React from 'react'

// Sticky reading toolbar — sits under the fixed nav on category pages.
// Category chips removed as per user request (since category can be selected from header nav).
// The All / Long reads / Briefs filter is shifted to the left side.
const FILTERS = [
  ['all', 'All'],
  ['long', 'Long reads'],
  ['short', 'Briefs'],
  ['fact', 'Fact checked'],
]

export default function LmCategoryBar({ active, filter = 'all', onFilter, showFilter = true }) {
  if (!showFilter) return null

  return (
    <div className="sticky top-[70px] z-40 border-b border-lm-200 bg-white/90 backdrop-blur-[12.5px]">
      {/* Scrollable on small screens so the pill row never forces page overflow */}
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-start overflow-x-auto px-4 py-[12px] [scrollbar-width:none] sm:py-[14px] sm:px-8 lg:px-[32px] [&::-webkit-scrollbar]:hidden">
        {/* Long / short filter moved to the left side with larger size */}
        <div className="flex shrink-0 items-center gap-[4px] rounded-[100px] border border-lm-200 bg-lm-50 p-[4px] shadow-sm sm:gap-[6px] sm:p-[5px]">
          {FILTERS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => onFilter?.(id)}
              className={`whitespace-nowrap rounded-[100px] px-[13px] py-[7px] font-bevietnam text-[13px] font-semibold transition-all duration-200 sm:px-[22px] sm:py-[9px] sm:text-[15px] ${
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
