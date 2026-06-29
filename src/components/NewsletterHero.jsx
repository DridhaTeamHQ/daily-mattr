import React from 'react'

// Newsletter hero (Figma 1:1308): textured cream bg, 186px Source-Serif
// "NEWSLETTER", a fanned stack of 7 category cover cards with a floating
// "Tech & AI" pill, a tagline, and a #7900d9 SUBSCRIBE pill.

const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }
const SANS = { fontFamily: "'Roboto', system-ui, sans-serif" }

// left/top in px within an 855x232 stage; rot in degrees. Matches the Figma.
const FAN = [
  { img: '/newsletter/hero/card1.png', left: -13, top: 18, rot: -14.14 },
  { img: '/newsletter/hero/card2.png', left: 94, top: 7, rot: -8.55 },
  { img: '/newsletter/hero/card3.png', left: 214, top: -28, rot: -5.3 },
  { img: '/newsletter/hero/card4.png', left: 361, top: -1, rot: 0 },
  { img: '/newsletter/hero/card5.png', left: 484, top: -4, rot: 1.01 },
  { img: '/newsletter/hero/card6.png', left: 573, top: -2, rot: 6.5 },
  { img: '/newsletter/hero/card7.png', left: 699, top: 11, rot: 10.99 },
]

export default function NewsletterHero() {
  return (
    <section className="relative overflow-hidden bg-[#faf9f6] pt-28 pb-16 sm:pt-32">
      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        {/* Title */}
        <h1
          className="text-center font-extrabold leading-none text-black tracking-tight text-[clamp(2.75rem,12vw,186px)]"
          style={{
            ...SERIF,
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
            textRendering: 'geometricPrecision',
          }}
        >
          NEWSLETTER
        </h1>

        {/* Tagline */}
        <p className="max-w-2xl text-center text-[18px] leading-[1.56] text-black" style={SANS}>
          A distilled, premium curation of the world&rsquo;s most significant movements in
          culture, technology, and finance. Crafted with cinematic precision.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#subscribe"
            className="inline-flex items-center justify-center rounded-full border border-[#c9a227] bg-[#7b1e3b] px-7 py-3.5 text-[15px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#5e1730]"
            style={SANS}
          >
            Subscribe
          </a>
          <a
            href="#stories"
            className="relative inline-flex items-center justify-center rounded-[50px] border border-[#7b1e3b]/40 bg-white/40 px-6 py-4 text-[15px] font-semibold uppercase tracking-wide text-[#7b1e3b] backdrop-blur-sm transition-transform hover:scale-[1.03]"
            style={SANS}
          >
            Read today&rsquo;s edition
          </a>
        </div>
      </div>
    </section>
  )
}
