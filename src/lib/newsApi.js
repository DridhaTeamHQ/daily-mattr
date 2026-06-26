// Live newsletter feed — reads APPROVED articles for a category straight from
// the email agent's Supabase table (see lib/content.js). Editor edits and new
// approvals reflect on the next load; nothing unapproved is ever returned.

import { fetchApprovedByCategory, fetchFeaturesByCategory } from './content'

export async function fetchNewsletter(category) {
  try {
    const [articles, features] = await Promise.all([
      fetchApprovedByCategory(category),
      fetchFeaturesByCategory(category).catch(() => []),
    ])
    return { category, articles, features }
  } catch (err) {
    // Network/DB hiccup — fail soft to an empty feed rather than crash the page.
    console.error('fetchNewsletter failed:', err?.message || err)
    return { category, articles: [], features: [], error: true }
  }
}
