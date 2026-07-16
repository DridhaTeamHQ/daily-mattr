import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollToTop from './components/ScrollToTop'
import ScrollTopButton from './components/ScrollTopButton'
import { LmDrawerProvider } from './components/lm/LmDrawerContext'
import LmDrawerHost from './components/lm/LmDrawerHost'
import NewsletterPage from './pages/NewsletterPage'
import CategoryNewsPage from './pages/CategoryNewsPage'
import NotFoundPage from './pages/NotFoundPage'
import { SubscribeRoute, AuthRoute } from './pages/DrawerRoutes'

function App() {
  const location = useLocation()
  return (
    <LmDrawerProvider>
      <ScrollToTop />
      {/* Light cross-page fade — keyed remount per path (no AnimatePresence
          exits, matching the app-wide convention), so navigation eases in
          instead of snapping. Drawer routes reuse the same page underneath, so
          the fade only fires on real page changes. */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<NewsletterPage />} />
          {/* Old page URLs now open the matching drawer over the home page */}
          <Route path="/subscribe" element={<SubscribeRoute />} />
          <Route path="/login" element={<AuthRoute />} />
          <Route path="/profile" element={<AuthRoute />} />
          {/* Category feed (unknown slugs render the 404 inside the page) */}
          <Route path="/:category" element={<CategoryNewsPage />} />
          <Route path="/:category/:articleId" element={<CategoryNewsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
      <ScrollTopButton />
      <LmDrawerHost />
    </LmDrawerProvider>
  )
}

export default App
