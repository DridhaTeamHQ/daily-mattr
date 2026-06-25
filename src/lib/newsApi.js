// Live newsletter feed — reads APPROVED articles for a category straight from
// the email agent's Supabase table (see lib/content.js). Editor edits and new
// approvals reflect on the next load; nothing unapproved is ever returned.

import { fetchApprovedByCategory } from './content'

export async function fetchNewsletter(category) {
  try {
    const articles = await fetchApprovedByCategory(category)
    return { category, articles }
  } catch (err) {
    // Network/DB hiccup — fail soft to an empty feed rather than crash the page.
    console.error('fetchNewsletter failed:', err?.message || err)
    return { category, articles: [], error: true }
  }
}
