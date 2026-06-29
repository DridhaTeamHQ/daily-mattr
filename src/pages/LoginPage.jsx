import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/desi.css'

const SERIF = { fontFamily: "'Source Serif 4', Georgia, serif" }

// /login — Google sign-in. Honours ?redirect=/path so the user returns to where
// they started (e.g. the newsletter page with a pending subscribe intent).
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 text-gray-900">
      {/* Desi-maximalism backdrop */}
      <img
        src="/auth-bg.jpg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      {/* warm readability veil — calmer so the card sits cleanly */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fffdf5]/85 via-[#fffdf5]/62 to-[#fffdf5]/88" />

      {/* Card */}
      <div className="desi-frame relative w-full max-w-md overflow-hidden rounded-3xl bg-[#fffdf5]/95 text-center backdrop-blur-sm">
        <div className="p-8 sm:p-11">
          <div
            className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl border border-[#c9a227] bg-[#7b1e3b] text-xl font-extrabold text-[#f6e7c9]"
            style={SERIF}
          >
            DM
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d81b60]">✦ Daily Mattr ✦</span>
          <h1 className="mt-3 text-[28px] font-bold leading-tight text-gray-900" style={SERIF}>Sign in to Daily Mattr</h1>
          <p className="mt-2 text-sm text-gray-600">Save and manage your newsletter preferences.</p>

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

          <div className="mt-7 border-t border-gray-200 pt-5">
            <p className="text-xs text-gray-500">
              You can browse everything without an account — sign-in is only needed to subscribe.
            </p>
            <Link to="/" className="mt-3 inline-block text-[12px] font-semibold text-[#7b1e3b] hover:text-[#d81b60]">
              ← Back to Daily Mattr
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
