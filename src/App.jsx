import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import ScrollTopButton from './components/ScrollTopButton'
import { LmDrawerProvider } from './components/lm/LmDrawerContext'
import LmDrawerHost from './components/lm/LmDrawerHost'
import NewsletterPage from './pages/NewsletterPage'
import CategoryNewsPage from './pages/CategoryNewsPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import NotFoundPage from './pages/NotFoundPage'
import { SubscribeRoute, AuthRoute } from './pages/DrawerRoutes'

function App() {
  return (
    <LmDrawerProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<NewsletterPage />} />
        {/* Old page URLs now open the matching drawer over the home page */}
        <Route path="/subscribe" element={<SubscribeRoute />} />
        <Route path="/login" element={<AuthRoute />} />
        <Route path="/profile" element={<AuthRoute />} />
        {/* Case studies — must precede the /:category catch-all */}
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/case-studies/:id" element={<CaseStudiesPage />} />
        {/* Category feed (unknown slugs render the 404 inside the page) */}
        <Route path="/:category" element={<CategoryNewsPage />} />
        <Route path="/:category/:articleId" element={<CategoryNewsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ScrollTopButton />
      <LmDrawerHost />
    </LmDrawerProvider>
  )
}

export default App
