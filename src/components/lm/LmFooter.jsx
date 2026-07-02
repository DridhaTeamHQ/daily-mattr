import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Footer — Figma node 1:202 (1440x799). #E5E5EA panel: brand blurb + link
// columns, right-aligned copyright, and the giant cropped "DailyMattr'."
// Playfair wordmark bleeding off the bottom.
const pf = { fontVariationSettings: '"opsz" 12, "wdth" 100' }
const rb = { fontVariationSettings: '"wdth" 100' }

const PRODUCT_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'What is Mattr', to: '/#faq' },
  { label: 'Contact Us', href: 'mailto:aitools@dridhatechnologies.com' },
  { label: 'Download APP', to: '/subscribe' },
]
const LONGMATTR_LINKS = [
  { label: 'What is LONG MATTR', to: '/#faq' },
  { label: 'Categories', to: '/#categories' },
  { label: 'Subscribe', to: '/subscribe' },
]

function FooterLink({ item }) {
  const cls = 'font-roboto text-[14px] font-medium leading-[1.46] text-lm-800 hover:text-black'
  return item.href
    ? <a href={item.href} className={cls} style={rb}>{item.label}</a>
    : <Link to={item.to} className={cls} style={rb}>{item.label}</Link>
}

export default function LmFooter() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-lm-200">
      <div className="mx-auto flex w-full max-w-[1317px] flex-col gap-[32px] px-4 pt-[48px] sm:px-8 sm:pt-[69px]">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          {/* Brand block */}
          <div className="flex w-full max-w-[343px] flex-col gap-[16px]">
            <div className="flex items-center gap-[4px] whitespace-nowrap text-lm-800">
              <p className="leading-none">
                <span className="font-playfair font-extrabold text-[24px] tracking-[-1.2px]" style={pf}>the</span>
                <span className="font-playfair font-black text-[32px] tracking-[-1.6px]" style={pf}>Ma</span>
                <span className="font-playfair font-black text-[32px] tracking-[-2.56px]" style={pf}>tt</span>
                <span className="font-playfair font-black text-[32px]" style={pf}>r</span>
                <span className="font-playfair font-black text-[32px] text-lm-500" style={pf}>’</span>
                <span className="font-playfair font-black text-[32px]" style={pf}>.</span>
              </p>
              <p className="font-roboto text-[24px] font-semibold leading-[1.26] sm:text-[32px]" style={rb}>your deeper read.</p>
            </div>
            <p className="font-roboto text-[18px] leading-[1.46] text-lm-600" style={rb}>
              Long Matters brings you the story behind the headline — with context, clarity, and perspective that help you understand what really matters.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-10 text-[14px] sm:gap-[63px]">
            <div className="flex w-[133px] flex-col gap-[16px]">
              <p className="font-roboto uppercase leading-[1.26] tracking-[0.7px] text-lm-500" style={rb}>Product</p>
              <div className="flex flex-col gap-[12px]">
                {PRODUCT_LINKS.map((l) => <FooterLink key={l.label} item={l} />)}
              </div>
            </div>
            <div className="flex flex-col gap-[16px]">
              <p className="font-roboto uppercase leading-[1.26] tracking-[0.7px] text-lm-500" style={rb}>Long Mattr</p>
              <div className="flex flex-col gap-[12px]">
                {LONGMATTR_LINKS.map((l) => <FooterLink key={l.label} item={l} />)}
              </div>
            </div>
          </div>
        </div>
        <p className="self-end whitespace-nowrap font-roboto text-[14px] leading-[1.46] text-lm-600 sm:text-[18px]" style={rb}>
          © 2026 Dridhatechnologies. All rights reserved.
        </p>
      </div>

      {/* Giant cropped wordmark — 251/335px on desktop, scaled down responsively */}
      <motion.p
        aria-hidden
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none mt-[40px] block select-none whitespace-nowrap pl-[24px] leading-[0.82] text-lm-800 sm:pl-[44px] lg:mt-[60px]">
        <span className="font-playfair font-extrabold text-[17.5vw] tracking-[-0.05em]" style={pf}>Daily</span>
        <span className="font-playfair font-black text-[23.3vw] tracking-[-0.05em]" style={pf}>Ma</span>
        <span className="font-playfair font-black text-[23.3vw] tracking-[-0.08em]" style={pf}>tt</span>
        <span className="font-playfair font-black text-[23.3vw]" style={pf}>r</span>
        <span className="font-playfair font-black text-[23.3vw] text-lm-500" style={pf}>’</span>
        <span className="font-playfair font-black text-[23.3vw]" style={pf}>.</span>
      </motion.p>
    </footer>
  )
}
