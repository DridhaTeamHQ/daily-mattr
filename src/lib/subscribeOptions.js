// Canonical options for the newsletter subscribe form.
// These MUST stay in sync with the email agent's _shared/news-categories.ts.

export const SUBSCRIBE_CATEGORIES = [
  { slug: 'national', label: 'National' },
  { slug: 'international', label: 'International' },
  { slug: 'finance', label: 'Finance' },
  { slug: 'sports', label: 'Sports' },
  { slug: 'entertainment', label: 'Entertainment' },
  { slug: 'lifestyle', label: 'Lifestyle' },
  { slug: 'technology', label: 'Technology' },
]

export const RHYTHMS = [
  { id: 'daily', label: 'Daily', desc: 'Get your newsletter every day.' },
  { id: 'weekly', label: 'Weekly', desc: 'Pick one or more days in the week.' },
  { id: 'bi-weekly', label: 'Bi Weekly', desc: 'Receive updates two times every week.' },
  { id: 'monthly', label: 'Monthly', desc: 'Get one curated edition every month.' },
]

export const WEEKDAYS = [
  { id: 'mon', label: 'Monday' },
  { id: 'tue', label: 'Tuesday' },
  { id: 'wed', label: 'Wednesday' },
  { id: 'thu', label: 'Thursday' },
  { id: 'fri', label: 'Friday' },
  { id: 'sat', label: 'Saturday' },
  { id: 'sun', label: 'Sunday' },
]

export const SOURCE_PREFERENCES = [
  { id: 'top', label: 'Top sources only', desc: 'Curated from trusted major publishers.' },
  { id: 'mixed', label: 'Mixed sources', desc: 'Balanced mix of national, regional, and niche sources.' },
  { id: 'wide', label: 'Wide coverage', desc: 'More sources, more variety, wider viewpoints.' },
]
