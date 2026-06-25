import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

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
    // Bring the user back to the full intended URL (preserves intent/topic params).
    const back = `${window.location.origin}${redirect}${window.location.hash || ''}`
    const { error } = await signInWithGoogle(back)
    if (error) {
      setBusy(false)
      setErr(error.message || 'Could not start Google sign-in. Is the provider enabled in Supabase?')
    }
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-[#7900d9] text-white grid place-items-center font-extrabold text-lg">S</div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>Sign in to Daily Mattr</h1>
        <p className="mt-2 text-sm text-gray-600">Log in to save and manage your newsletter preferences.</p>

        <button
          onClick={onGoogle}
          disabled={busy}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-50 disabled:opacity-60"
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

        <p className="mt-6 text-xs text-gray-400">
          You can browse everything without an account — sign-in is only needed to subscribe.
        </p>
      </div>
    </div>
  )
}
