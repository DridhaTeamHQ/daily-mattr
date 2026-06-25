import { useEffect, useRef, useState } from 'react'

// Near-real-time data without touching the backend.
//
// True push (Supabase Realtime) would need the `articles` table added to the
// realtime publication on the agent's database — which we intentionally do NOT
// change. Instead we poll: fetch on mount, refetch on an interval, and refetch
// immediately whenever the tab regains focus/visibility. State only updates when
// the payload actually changes, so approvals, new case studies, and edits to
// approved articles surface within `intervalMs` (and instantly on tab focus)
// with no manual reload — and unchanged polls cause no re-render.
export function useLiveData(fetcher, deps = [], { intervalMs = 20000 } = {}) {
  const [data, setData] = useState(null)
  const sigRef = useRef(null)
  const fetcherRef = useRef(fetcher)
  fetcherRef.current = fetcher

  useEffect(() => {
    let alive = true
    // Reset on dependency change (e.g. switching category) so the page shows a
    // fresh load instead of flashing the previous selection's stale data.
    sigRef.current = null
    setData(null)

    const load = async () => {
      try {
        const next = await fetcherRef.current()
        if (!alive) return
        let sig
        try { sig = JSON.stringify(next) } catch { sig = null }
        if (sig === null || sig !== sigRef.current) {
          sigRef.current = sig
          setData(next)
        }
      } catch {
        /* keep last good data on a transient failure */
      }
    }

    load()
    const timer = setInterval(load, intervalMs)
    const onVisible = () => { if (document.visibilityState === 'visible') load() }
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('focus', load)

    return () => {
      alive = false
      clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('focus', load)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return data
}
