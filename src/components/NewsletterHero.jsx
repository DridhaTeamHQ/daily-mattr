import React from 'react'

// Daily Mattr hero — a Higgsfield desi masthead (ornate gold jhalar crown over
// ivory handmade paper) with the wordmark, a true-to-product tagline, and
// wine+gold CTAs. Replaces the old generic "NEWSLETTER" Tech template.

const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }
const SANS = { fontFamily: "'Roboto', system-ui, sans-serif" }

export default function NewsletterHero() {
  return (
    <section className="relative overflow-hidden bg-[#faf9f6]">
      {/* Desi masthead backdrop (Higgsfield) */}
      <img
        src="/newsletter/hero/hero-desi.jpg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
      />
      {/* Fade the bottom into the page cream so the section flows on */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-[#faf9f6]" />

      <div className="relative z-10 flex flex-col items-center px-4 pb-[clamp(3rem,7vw,6rem)] pt-[clamp(9rem,20vw,15rem)] text-center">
        {/* Eyebrow */}
        <span className="text-[11px] font-semibold uppercase tracking-[0.42em] text-[#b8860b]" style={SANS}>
          &#9670;&ensp;India, in full colour&ensp;&#9670;
        </span>

        {/* Wordmark */}
        <h1
          className="mt-4 font-extrabold leading-[0.95] tracking-tight text-[#7b1e3b] text-[clamp(3rem,12vw,150px)]"
          style={{ ...SERIF, textRendering: 'geometricPrecision', WebkitFontSmoothing: 'antialiased' }}
        >
          Daily Mattr
        </h1>

        {/* Gold rule */}
        <div className="mt-5 h-[3px] w-28 rounded-full" style={{ background: '#C9A227' }} />

        {/* Tagline — true to the product */}
        <p className="mt-6 max-w-2xl text-[18px] leading-[1.6] text-[#3a2a22]" style={SANS}>
          India&rsquo;s day, decoded. The headlines, the deals, and the corporate cases that
          actually matter &mdash; real estate, policy, money and wellness, delivered with
          colour and clarity.
        </p>

        {/* CTAs — wine + gold, no gradient */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#subscribe"
            className="inline-flex items-center justify-center rounded-full border border-[#c9a227] bg-[#7b1e3b] px-7 py-3.5 text-[15px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#5e1730]"
            style={SANS}
          >
            Subscribe
          </a>
          <a
            href="#stories"
            className="inline-flex items-center justify-center rounded-full border border-[#7b1e3b]/40 bg-white/50 px-7 py-3.5 text-[15px] font-semibold uppercase tracking-wide text-[#7b1e3b] backdrop-blur-sm transition-colors hover:bg-white/80"
            style={SANS}
          >
            Read today&rsquo;s edition
          </a>
        </div>
      </div>
    </section>
  )
}
