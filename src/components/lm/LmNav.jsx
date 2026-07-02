import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LmLogo from './LmLogo'
import { LM_CATEGORIES } from './lmCategories'
import { useAuth } from '../../context/AuthContext'
import { useLmDrawer } from './LmDrawerContext'

// Top nav — Figma node 1:412 (1440x70). Fixed, backdrop-blurred, white-glass.
// Left: DailyMattr'. wordmark. Center: links + "Long Mattrs" dropdown.
// Right: dark pills (Download App + user) with the signature glow ellipse.
const GLOW = '/figma/nav-button-glow.svg'

function Glow() {
  return (
    <span aria-hidden className="pointer-events-none absolute left-[-70px] top-[63px] h-[8px] w-[251px]">
      <img alt="" src={GLOW} className="block size-full max-w-none" />
    </span>
  )
}

export default function LmNav({ tone = 'light' }) {
  const { isAuthed } = useAuth()
  const { openAuth, openSubscribe } = useLmDrawer()
  const navigate = useNavigate()
  const [catsOpen, setCatsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const ddRef = useRef(null)

  useEffect(() => {
    const close = (e) => { if (ddRef.current && !ddRef.current.contains(e.target)) setCatsOpen(false) }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])

  // On the dark category hero the bar sits over near-black — flip link tones.
  const linkColor = tone === 'dark' ? 'text-white/70 hover:text-white' : 'text-lm-500 hover:text-lm-800'
  const pillBorder = tone === 'dark' ? 'border-white/40 text-white' : 'border-lm-400 text-lm-800'

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Features', to: '/#categories' },
    { label: 'What is Mattr', to: '/#faq' },
    { label: 'Contact Us', to: '/#footer' },
  ]

  return (
    <header className={`fixed inset-x-0 top-0 z-50 backdrop-blur-[12.5px] ${tone === 'dark' ? 'bg-black/30' : 'bg-white/70'}`}>
      <div className="flex h-[70px] items-center justify-between px-4 sm:px-8 lg:px-[56px]">
        <LmLogo className={tone === 'dark' ? '[&_span]:!text-white [&_span:nth-child(5)]:!text-white/60' : ''} />

        {/* Center links — desktop */}
        <nav className="hidden items-center lg:flex">
          {links.map((l) => (
            <Link key={l.label} to={l.to} className={`rounded-[100px] px-[12px] py-[8px] font-bevietnam text-[13px] font-medium ${linkColor}`}>
              {l.label}
            </Link>
          ))}
          <div ref={ddRef} className="relative">
            <button
              type="button"
              onClick={() => setCatsOpen((v) => !v)}
              className={`flex items-center gap-[4px] rounded-[40px] border border-solid px-[12px] py-[8px] font-bevietnam text-[13px] font-semibold ${pillBorder}`}
            >
              Long Mattrs
              <img alt="" src="/figma/nav-icon-arrow-down.svg" className={`size-[16px] transition-transform ${catsOpen ? 'rotate-180' : ''} ${tone === 'dark' ? 'invert' : ''}`} />
            </button>
            {catsOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] w-[260px] rounded-[16px] border border-lm-200 bg-white p-[8px] shadow-[0px_16px_40px_rgba(0,0,0,0.12)]">
                {LM_CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    to={c.slug === 'case-studies' ? '/case-studies' : `/${c.slug}`}
                    onClick={() => setCatsOpen(false)}
                    className="block rounded-[10px] px-[12px] py-[9px] font-bevietnam text-[14px] font-medium text-lm-800 hover:bg-lm-50"
                  >
                    {c.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right pills */}
        <div className="flex items-center gap-[8px]">
          <button
            type="button"
            onClick={() => openSubscribe([])}
            className="relative hidden items-center justify-center overflow-hidden rounded-[50px] bg-[rgba(28,28,17,0.93)] px-[16px] py-[8px] font-bevietnam text-[14px] font-semibold text-white sm:flex"
          >
            <Glow />
            Download App
          </button>
          <button
            type="button"
            aria-label={isAuthed ? 'Your account' : 'Sign in'}
            onClick={() => openAuth()}
            className="relative flex items-center justify-center overflow-hidden rounded-[50px] bg-[rgba(28,28,17,0.93)] p-[9px]"
          >
            <Glow />
            <img alt="" src="/figma/nav-icon-user.svg" className="size-[16px]" />
          </button>
          {/* Mobile menu trigger */}
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className={`flex size-[34px] items-center justify-center rounded-[50px] border lg:hidden ${tone === 'dark' ? 'border-white/40' : 'border-lm-400'}`}
          >
            <span className="flex flex-col gap-[4px]">
              <span className={`h-[1.5px] w-[14px] ${tone === 'dark' ? 'bg-white' : 'bg-lm-800'}`} />
              <span className={`h-[1.5px] w-[14px] ${tone === 'dark' ? 'bg-white' : 'bg-lm-800'}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="border-t border-lm-200 bg-white px-4 pb-6 pt-2 lg:hidden">
          {links.map((l) => (
            <Link key={l.label} to={l.to} onClick={() => setMobileOpen(false)} className="block py-[10px] font-bevietnam text-[15px] font-medium text-lm-800">
              {l.label}
            </Link>
          ))}
          <p className="pb-[4px] pt-[12px] font-bevietnam text-[11px] font-semibold uppercase tracking-[2px] text-lm-500">Long Mattrs</p>
          <div className="grid grid-cols-2 gap-x-3">
            {LM_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to={c.slug === 'case-studies' ? '/case-studies' : `/${c.slug}`}
                onClick={() => setMobileOpen(false)}
                className="block py-[8px] font-bevietnam text-[14px] text-lm-600"
              >
                {c.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
