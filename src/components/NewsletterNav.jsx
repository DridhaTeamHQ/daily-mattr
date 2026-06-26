import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Daily Mattr top nav — a floating frosted-glass bar over the cream page.
//   DAILY MATTR wordmark · Newsletter / Themes / Subscribe · Login or Profile.
const ROBOTO = { fontFamily: "'Roboto', system-ui, sans-serif" }

export default function NewsletterNav() {
  const navigate = useNavigate()
  const { isAuthed, signOut } = useAuth()

  const goHash = (hash) => {
    if (window.location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 350)
    } else {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const linkClass =
    'px-4 py-2 text-[13px] font-medium uppercase tracking-[0.02em] text-black/80 whitespace-nowrap rounded-full transition-colors hover:bg-black/[0.04] hover:text-black'

  return (
    <header className="fixed inset-x-0 top-0 z-40 pt-3 sm:pt-4" style={ROBOTO}>
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between rounded-full border border-white/25 bg-[#efe6d4]/30 px-4 shadow-[0_8px_28px_rgba(17,12,5,0.07)] backdrop-blur-md sm:px-6">
          {/* Brand */}
          <Link to="/" className="text-[20px] font-extrabold tracking-[2px] text-[#010101]" style={ROBOTO} aria-label="Daily Mattr home">
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

          {/* Auth CTA */}
          <div className="flex items-center gap-2">
            {isAuthed ? (
              <>
                <Link
                  to="/profile"
                  className="rounded-[50px] px-5 py-2.5 text-[13px] font-semibold text-white whitespace-nowrap shadow-[0_8px_24px_rgba(216,27,96,0.35)] transition-transform hover:scale-[1.03]"
                  style={{ ...ROBOTO, background: 'linear-gradient(135deg, #F4A300, #D81B60)' }}
                >
                  Profile
                </Link>
                <button
                  onClick={signOut}
                  className="hidden rounded-full border border-black/15 px-3 py-2 text-[12px] font-medium text-black/70 hover:bg-black/[0.04] sm:block"
                  style={ROBOTO}
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/login?redirect=/subscribe"
                className="rounded-[50px] px-6 py-3 text-[14px] font-semibold text-white whitespace-nowrap shadow-[0_8px_24px_rgba(216,27,96,0.35)] transition-transform hover:scale-[1.03]"
                style={{ ...ROBOTO, background: 'linear-gradient(135deg, #F4A300, #D81B60)' }}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
