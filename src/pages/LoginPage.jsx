import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/desi.css'

const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }
const PROMISES = [
  'One sharp edition every morning',
  'Headlines, money, policy & corporate cases',
  'Pick your topics and the days they land',
]

// /login — split-screen Google sign-in. Left: editorial wine brand panel.
// Right: the sign-in. Honours ?redirect=/path so the user returns where they were.
export default function LoginPage() {
  const { isAuthed, loading, signInWithGoogle } = useAuth()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const redirect = params.get('redirect') || '/profile'

  useEffect(() => {
    if (!loading && isAuthed) navigate(redirect, { replace: true })
  }, [loading, isAuthed, redirect, navigate])

  const onGoogle = async () => {
    setBusy(true)
    setErr('')
    const back = `${window.location.origin}${redirect}${window.location.hash || ''}`
    const { error } = await signInWithGoogle(back)
    if (error) {
      setBusy(false)
      setErr(error.message || 'Could not start Google sign-in. Is the provider enabled in Supabase?')
    }
  }

  return (
    <div className="min-h-dvh bg-[#faf9f6] text-gray-900 lg:grid lg:grid-cols-2">
      {/* LEFT — editorial brand panel (desktop) */}
      <aside
        className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16"
        style={{ background: 'linear-gradient(160deg, #7b1e3b 0%, #5e1730 45%, #3a1206 100%)' }}
      >
        <img src="/auth-bg.jpg" alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.4px)', backgroundSize: '22px 22px' }} />

        <div className="relative text-[15px] font-extrabold tracking-[2px] text-[#f6e7c9]">DAILY MATTR</div>

        <div className="relative">
          <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#f4a300]">✦ India, in full colour ✦</span>
          <h2 className="mt-5 text-[clamp(2.5rem,4vw,58px)] font-bold leading-[1.02] text-[#fdf6e7]" style={SERIF}>
            India&rsquo;s day,<br />decoded.
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[#f6e7c9]/80">
            The headlines, the deals, and the corporate cases that actually matter — curated every morning.
          </p>
          <ul className="mt-9 space-y-3.5">
            {PROMISES.map((t) => (
              <li key={t} className="flex items-center gap-3 text-[14px] text-[#fdf6e7]/90">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#f4a300]/20 text-[#f4a300]">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative text-[12px] text-[#f6e7c9]/50">© {new Date().getFullYear()} Dridha Technologies</div>
      </aside>

      {/* RIGHT — sign in */}
      <main className="flex min-h-dvh flex-col items-center justify-center px-5 py-12">
        <div className="mb-8 lg:hidden">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-[#c9a227] bg-[#7b1e3b] text-xl font-extrabold text-[#f6e7c9]" style={SERIF}>DM</div>
        </div>

        <div className="w-full max-w-sm">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d81b60]">✦ Daily Mattr ✦</span>
          <h1 className="mt-3 text-[30px] font-bold leading-tight text-gray-900" style={SERIF}>Welcome back</h1>
          <p className="mt-2 text-[15px] text-gray-600">Sign in to save and manage your newsletter editions.</p>

          <button
            onClick={onGoogle}
            disabled={busy}
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl border border-[#c9a227]/50 bg-white py-3.5 font-semibold text-gray-800 transition-colors hover:border-[#c9a227] hover:bg-[#fff7e6] disabled:opacity-60"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z" />
              <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 010-4.2V7.06H2.18a11 11 0 000 9.88l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 002.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
            </svg>
            {busy ? 'Opening Google…' : 'Continue with Google'}
          </button>

          {err && <p className="mt-4 text-sm text-red-500">{err}</p>}

          <p className="mt-6 text-xs leading-relaxed text-gray-500">
            You can browse everything without an account — sign-in is only needed to subscribe.
          </p>
          <Link to="/" className="mt-4 inline-block text-[12px] font-semibold text-[#7b1e3b] hover:text-[#d81b60]">
            ← Back to Daily Mattr
          </Link>
        </div>
      </main>
    </div>
  )
}
