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
      {/* Vintage newspaper texture (Figma node 1:1293) faded into the cream bg */}
      <img
        src="/newsletter/hero/newspaper.jpg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-multiply"
      />
      {/* Soften it toward the top and fade to cream at the bottom so the type stays crisp */}
      <div className="pointer-events-none absolute inset-0 bg-[#faf9f6]/35" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[#faf9f6]" />

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
        <a
          href="#subscribe"
          className="relative inline-flex items-center justify-center rounded-[50px] border border-white/10 bg-[#7900d9] px-6 py-4 text-[15px] font-semibold uppercase tracking-wide text-white shadow-[0_10px_30px_rgba(121,0,217,0.45)] transition-transform hover:scale-[1.03]"
          style={SANS}
        >
          Subscribe
        </a>
      </div>
    </section>
  )
}
