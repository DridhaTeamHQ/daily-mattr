import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import NewsletterPage from './pages/NewsletterPage'
import CategoryNewsPage from './pages/CategoryNewsPage'
import SubscribePage from './pages/SubscribePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<NewsletterPage />} />
        <Route path="/subscribe" element={<SubscribePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
        {/* Category feed + article reading (e.g. /finance, /finance/finance-0) */}
        <Route path="/:category" element={<CategoryNewsPage />} />
        <Route path="/:category/:articleId" element={<CategoryNewsPage />} />
      </Routes>
    </>
  )
}

export default App
