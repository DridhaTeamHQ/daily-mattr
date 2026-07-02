import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import ScrollTopButton from './components/ScrollTopButton'
import { LmDrawerProvider } from './components/lm/LmDrawerContext'
import LmDrawerHost from './components/lm/LmDrawerHost'
import NewsletterPage from './pages/NewsletterPage'
import CategoryNewsPage from './pages/CategoryNewsPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import SubscribePage from './pages/SubscribePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <LmDrawerProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<NewsletterPage />} />
        <Route path="/subscribe" element={<SubscribePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
        {/* Case studies (list + reading) — must precede the /:category catch-all */}
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/case-studies/:id" element={<CaseStudiesPage />} />
        {/* Category feed + article reading (e.g. /finance, /finance/finance-0) */}
        <Route path="/:category" element={<CategoryNewsPage />} />
        <Route path="/:category/:articleId" element={<CategoryNewsPage />} />
      </Routes>
      <ScrollTopButton />
      <LmDrawerHost />
    </LmDrawerProvider>
  )
}

export default App
