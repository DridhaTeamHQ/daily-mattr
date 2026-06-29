import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

// Daily Mattr top nav — a floating frosted-glass bar over the cream page.
// On phones the hamburger opens a full-screen desi takeover menu with oversized
// links (inspired by editorial mastheads), staggered in.
const ROBOTO = { fontFamily: "'Roboto', system-ui, sans-serif" }
const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }

const NAV_LINKS = [
  { label: 'Newsletter', to: '/' },
  { label: 'Corporate Cases', to: '/case-studies' },
  { label: 'Themes', hash: 'themes' },
  { label: 'Subscribe', to: '/subscribe' },
]

const overlayV = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.28, when: 'beforeChildren', staggerChildren: 0.06 } },
  exit: { opacity: 0, transition: { duration: 0.22 } },
}
const itemV = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function NewsletterNav() {
  const navigate = useNavigate()
  const { isAuthed, signOut } = useAuth()
  const [open, setOpen] = useState(false)

  const goHash = (hash) => {
    setOpen(false)
    if (window.location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 350)
    } else {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Lock scroll + close on Escape while the takeover is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
  }, [open])

  const linkClass =
    'px-4 py-2 text-[13px] font-medium uppercase tracking-[0.02em] text-black/80 whitespace-nowrap rounded-full transition-colors hover:bg-black/[0.04] hover:text-black'

  return (
    <header className="fixed inset-x-0 top-0 z-40 pt-3 sm:pt-4" style={ROBOTO}>
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between rounded-full border border-white/25 bg-[#efe6d4]/30 px-4 shadow-[0_8px_28px_rgba(17,12,5,0.07)] backdrop-blur-md sm:px-6">
          {/* Brand */}
          <Link to="/" onClick={() => setOpen(false)} className="text-[18px] sm:text-[20px] font-extrabold tracking-[2px] text-[#010101]" style={ROBOTO} aria-label="Daily Mattr home">
            DAILY MATTR
          </Link>

          {/* Center nav (desktop) */}
          <nav className="hidden items-center lg:flex">
            <Link to="/" className={linkClass} style={ROBOTO}>Newsletter</Link>
            <Link to="/case-studies" className={linkClass} style={ROBOTO}>Corporate Cases</Link>
            <button onClick={() => goHash('themes')} className={linkClass} style={ROBOTO}>Themes</button>
            <Link
              to="/subscribe"
              className="ml-1 rounded-full border border-[#7b1e3b]/60 bg-white/40 px-4 py-2 text-[13px] font-medium uppercase tracking-[0.02em] text-[#7b1e3b] whitespace-nowrap shadow-sm"
              style={ROBOTO}
            >
              Subscribe
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {isAuthed ? (
              <Link to="/profile" onClick={() => setOpen(false)} className="rounded-[50px] border border-[#c9a227] bg-[#7b1e3b] px-4 py-2 text-[13px] font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#5e1730] sm:px-5 sm:py-2.5" style={ROBOTO}>
                Profile
              </Link>
            ) : (
              <Link to="/login?redirect=/subscribe" onClick={() => setOpen(false)} className="rounded-[50px] border border-[#c9a227] bg-[#7b1e3b] px-4 py-2 text-[13px] font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#5e1730] sm:px-6 sm:py-3 sm:text-[14px]" style={ROBOTO}>
                Login
              </Link>
            )}

            {/* Hamburger (mobile only) */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#7b1e3b]/30 bg-white/50 text-[#7b1e3b] transition-colors hover:bg-white/80 lg:hidden"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen takeover menu (phones) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex min-h-dvh flex-col overflow-hidden lg:hidden"
            style={{ ...ROBOTO, background: 'linear-gradient(160deg, #7b1e3b 0%, #5e1730 45%, #3a1206 100%)' }}
            variants={overlayV}
            initial="hidden"
            animate="show"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            {/* faint dot texture */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.4px)', backgroundSize: '22px 22px' }} />

            {/* top bar */}
            <motion.div variants={itemV} className="relative flex items-center justify-between px-5 pt-6">
              <span className="text-[16px] font-extrabold tracking-[2px] text-[#f6e7c9]">DAILY MATTR</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex items-center gap-2 rounded-full border border-[#f4a300]/60 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#f4a300] transition-colors hover:bg-[#f4a300]/10"
              >
                Close
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </motion.div>

            {/* big links */}
            <nav className="relative flex flex-1 flex-col justify-center gap-1 px-6">
              {NAV_LINKS.map((l) => (
                <motion.div key={l.label} variants={itemV}>
                  {l.hash ? (
                    <button
                      onClick={() => goHash(l.hash)}
                      className="block w-full py-2 text-left text-[clamp(2.25rem,11vw,3.5rem)] font-extrabold leading-[1.05] text-[#fdf6e7] transition-colors hover:text-[#f4a300]"
                      style={SERIF}
                    >
                      {l.label}
                    </button>
                  ) : (
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-[clamp(2.25rem,11vw,3.5rem)] font-extrabold leading-[1.05] text-[#fdf6e7] transition-colors hover:text-[#f4a300]"
                      style={SERIF}
                    >
                      {l.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* footer */}
            <motion.div variants={itemV} className="relative flex flex-wrap items-center gap-x-6 gap-y-2 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 text-[12px] uppercase tracking-[0.16em] text-[#f6e7c9]/75">
              {isAuthed ? (
                <button onClick={() => { setOpen(false); signOut() }} className="hover:text-[#f4a300]">Sign out</button>
              ) : (
                <Link to="/login?redirect=/subscribe" onClick={() => setOpen(false)} className="hover:text-[#f4a300]">Log in</Link>
              )}
              <a href="mailto:aitools@dridhatechnologies.com" className="hover:text-[#f4a300]">Contact</a>
              <span className="text-[#f6e7c9]/45">India, in full colour</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
