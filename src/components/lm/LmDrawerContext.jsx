import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

// Global controller for the right-side drawers (auth/account + subscribe).
// Any component can call openAuth() / openSubscribe([...slugs]) — the drawers
// render once at the app root and slide over the current page (no navigation).
const Ctx = createContext(null)

export function LmDrawerProvider({ children }) {
  const [drawer, setDrawer] = useState(null) // { type: 'auth'|'subscribe', payload }

  const openAuth = useCallback(() => setDrawer({ type: 'auth' }), [])
  const openSubscribe = useCallback((slugs = []) => setDrawer({ type: 'subscribe', slugs }), [])
  const close = useCallback(() => setDrawer(null), [])

  const value = useMemo(() => ({ drawer, openAuth, openSubscribe, close }), [drawer, openAuth, openSubscribe, close])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useLmDrawer() {
  const ctx = useContext(Ctx)
  // Pages can render outside the provider (tests etc.) — degrade to no-ops.
  return ctx || { drawer: null, openAuth: () => {}, openSubscribe: () => {}, close: () => {} }
}
