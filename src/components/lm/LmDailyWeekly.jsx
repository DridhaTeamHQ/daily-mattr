import React from 'react'
import Reveal from './Reveal'

// "The Daily / The Weekly" section — redesigned into two separate sleek cards matching Image 2.
export default function LmDailyWeekly() {
  return (
    <section className="px-4 pt-6 pb-4 sm:px-8 sm:pt-8">
      <Reveal className="mx-auto grid w-full max-w-[1424px] grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {/* The Daily Card */}
        <div className="flex flex-col justify-between gap-6 rounded-[32px] bg-[#F4F4F6] p-6 transition-all duration-300 hover:shadow-lg sm:flex-row sm:items-center sm:gap-8 sm:p-8 md:p-10">
          <div className="flex flex-1 flex-col items-start gap-4">
            {/* Top Icon Badge */}
            <div className="flex size-[48px] shrink-0 items-center justify-center rounded-full bg-[#E5E5EB] text-lm-800">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                <line x1="8" y1="8" x2="16" y2="8" strokeWidth="2.2" />
                <line x1="8" y1="12" x2="16" y2="12" />
                <line x1="8" y1="16" x2="13" y2="16" />
              </svg>
            </div>

            {/* Title */}
            <h3 className="font-bevietnam text-[32px] font-medium leading-tight text-lm-800 sm:text-[38px] md:text-[42px]">
              The Daily
            </h3>

            {/* Description */}
            <p className="max-w-[320px] font-bevietnam text-[16px] font-normal leading-[1.5] text-[#52525B] sm:text-[17px]">
              One case study everyday. Thoughtfully curated.
            </p>
          </div>

          {/* Right Side: Divider + Illustration Circle */}
          <div className="flex shrink-0 items-center gap-6 self-center sm:self-auto sm:gap-8">
            <div className="hidden h-[120px] w-[1px] bg-[#E2E2E8] sm:block" />

            <div className="flex size-[140px] shrink-0 items-center justify-center rounded-full bg-[#E6E6EC] shadow-inner sm:size-[160px] md:size-[170px]">
              {/* Coffee Mug on Book SVG */}
              <svg width="120" height="120" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Wavy bookmark ribbon */}
                <path d="M70 118 Q72 126 68 132" stroke="#141417" strokeWidth="2" strokeLinecap="round" />
                {/* Book pages (side thickness) */}
                <path d="M38 108 L122 108 L120 118 L40 118 Z" fill="#E8E8EC" stroke="#141417" strokeWidth="2.2" strokeLinejoin="round" />
                {/* Book bottom cover line */}
                <path d="M40 118 L120 118 L118 122 L42 122 Z" fill="#FFFFFF" stroke="#141417" strokeWidth="2.2" strokeLinejoin="round" />
                {/* Top cover surface */}
                <path d="M45 98 L115 98 L122 108 L38 108 Z" fill="#FFFFFF" stroke="#141417" strokeWidth="2.2" strokeLinejoin="round" />
                {/* Mug handle */}
                <path d="M99 68 C112 68 112 86 97 88" stroke="#141417" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M99 73 C106 73 106 82 97 83" stroke="#141417" strokeWidth="1.8" />
                {/* Mug cylinder body */}
                <path d="M60 62 L100 62 C100 88 96 98 80 98 C64 98 60 88 60 62 Z" fill="#FFFFFF" stroke="#141417" strokeWidth="2.5" strokeLinejoin="round" />
                {/* Mug top rim ellipse */}
                <ellipse cx="80" cy="62" rx="20" ry="5" fill="#FFFFFF" stroke="#141417" strokeWidth="2.5" />
                {/* Coffee liquid inside rim */}
                <ellipse cx="80" cy="63" rx="16" ry="3.5" fill="#141417" />
                {/* Steam rising */}
                <path d="M71 52 Q68 44 72 36 Q75 28 71 22" stroke="#141417" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M80 50 Q77 41 81 33 Q84 25 80 18" stroke="#141417" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M89 52 Q86 44 90 36 Q93 28 89 22" stroke="#141417" strokeWidth="2.2" strokeLinecap="round" />
                {/* Sparkle dots */}
                <circle cx="55" cy="45" r="1.5" fill="#141417" />
                <circle cx="105" cy="35" r="1.5" fill="#141417" />
              </svg>
            </div>
          </div>
        </div>

        {/* The Weekly Card */}
        <div className="flex flex-col justify-between gap-6 rounded-[32px] bg-[#F4F4F6] p-6 transition-all duration-300 hover:shadow-lg sm:flex-row sm:items-center sm:gap-8 sm:p-8 md:p-10">
          <div className="flex flex-1 flex-col items-start gap-4">
            {/* Top Icon Badge */}
            <div className="flex size-[48px] shrink-0 items-center justify-center rounded-full bg-[#E5E5EB] text-lm-800">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2.2" />
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2.2" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Title */}
            <h3 className="font-bevietnam text-[32px] font-medium leading-tight text-lm-800 sm:text-[38px] md:text-[42px]">
              The Weekly
            </h3>

            {/* Description */}
            <p className="max-w-[340px] font-bevietnam text-[16px] font-normal leading-[1.5] text-[#52525B] sm:text-[17px]">
              Five short stories that shaped the week, delivered on the day you pick.
            </p>
          </div>

          {/* Right Side: Divider + Illustration Circle */}
          <div className="flex shrink-0 items-center gap-6 self-center sm:self-auto sm:gap-8">
            <div className="hidden h-[120px] w-[1px] bg-[#E2E2E8] sm:block" />

            <div className="flex size-[140px] shrink-0 items-center justify-center rounded-full bg-[#E6E6EC] shadow-inner sm:size-[160px] md:size-[170px]">
              {/* Open Envelope with Newsletter Sheet SVG */}
              <svg width="120" height="120" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Back wall of envelope */}
                <path d="M38 72 L122 72 L122 126 C122 129 119 132 116 132 L44 132 C41 132 38 129 38 126 Z" fill="#E8E8EC" stroke="#141417" strokeWidth="2.5" strokeLinejoin="round" />
                {/* Open top flap */}
                <path d="M38 72 L80 42 L122 72" stroke="#141417" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Paper sheet inside pocket */}
                <path d="M48 48 L112 48 L112 100 L48 100 Z" fill="#FFFFFF" stroke="#141417" strokeWidth="2.2" strokeLinejoin="round" />
                {/* Document header line */}
                <line x1="58" y1="60" x2="85" y2="60" stroke="#141417" strokeWidth="2.5" strokeLinecap="round" />
                {/* Document body text lines */}
                <line x1="58" y1="70" x2="102" y2="70" stroke="#141417" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="58" y1="78" x2="102" y2="78" stroke="#141417" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="58" y1="86" x2="90" y2="86" stroke="#141417" strokeWidth="1.8" strokeLinecap="round" />
                {/* Front V-flaps of envelope */}
                <path d="M38 72 L80 106 L122 72 L122 126 C122 129 119 132 116 132 L44 132 C41 132 38 129 38 126 Z" fill="#FFFFFF" stroke="#141417" strokeWidth="2.5" strokeLinejoin="round" />
                {/* Diagonal crease lines */}
                <path d="M38 132 L68 102 M122 132 L92 102" stroke="#141417" strokeWidth="2" strokeLinecap="round" />
                {/* Sparkle rays above paper */}
                <path d="M62 38 L54 26" stroke="#141417" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M80 34 L80 20" stroke="#141417" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M98 38 L106 26" stroke="#141417" strokeWidth="2.2" strokeLinecap="round" />
                {/* Little sparkle dots */}
                <circle cx="45" cy="35" r="1.5" fill="#141417" />
                <circle cx="115" cy="40" r="1.5" fill="#141417" />
              </svg>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
