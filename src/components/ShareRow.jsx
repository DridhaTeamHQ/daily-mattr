import React, { useState } from 'react'

// Compact share row for an article/case: copy link, WhatsApp, X.
const SANS = { fontFamily: "'Roboto', system-ui, sans-serif" }

export default function ShareRow({ title }) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const text = title ? `${title} — Daily Mattr` : 'Daily Mattr'

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable */
    }
  }

  const btn = 'inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3.5 py-2 text-[12px] font-semibold text-gray-700 transition-colors hover:border-[#c9a227] hover:text-[#7b1e3b]'

  return (
    <div className="mt-8 flex flex-wrap items-center gap-2" style={SANS}>
      <span className="mr-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">Share</span>
      <button type="button" onClick={copy} className={btn} aria-label="Copy link">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" strokeLinecap="round" strokeLinejoin="round" /></svg>
        {copied ? 'Copied!' : 'Copy link'}
      </button>
      <a
        className={btn}
        href={`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.8-4.5-4-.1-.2-1-1.4-1-2.6 0-1.2.6-1.8.9-2.1.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.5c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.4.3.1.2.1.6-.1 1Z" /></svg>
        WhatsApp
      </a>
      <a
        className={btn}
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 2H21l-6.5 7.4L22 22h-6.8l-4.6-6-5.3 6H2.5l7-8L2 2h7l4.2 5.5L18.2 2Zm-2.4 18h1.6L8.3 3.8H6.6L15.8 20Z" /></svg>
        Post
      </a>
    </div>
  )
}
