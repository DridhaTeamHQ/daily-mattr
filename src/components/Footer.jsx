import React from 'react'
import { Link } from 'react-router-dom'

const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }

// Minimal Daily Mattr footer.
export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#faf9f6]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="text-xl font-extrabold tracking-[2px] text-gray-900" style={SERIF}>DAILY MATTR</div>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              A personal newsletter you actually want — pick your themes and when they land.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-10 gap-y-3 text-sm">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Browse</span>
              <Link to="/" className="text-gray-700 hover:text-[#d81b60]">Newsletter</Link>
              <Link to="/case-studies" className="text-gray-700 hover:text-[#d81b60]">Corporate Cases</Link>
              <Link to="/subscribe" className="text-gray-700 hover:text-[#d81b60]">Subscribe</Link>
              <Link to="/profile" className="text-gray-700 hover:text-[#d81b60]">Profile</Link>
            </div>
          </nav>
        </div>

        <div className="mt-10 border-t border-black/10 pt-6 text-xs text-gray-500">
          © {new Date().getFullYear()} Dridha Technologies. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
