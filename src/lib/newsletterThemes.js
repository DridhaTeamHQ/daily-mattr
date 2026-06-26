// The categories shown as "Select Your Theme" cover cards — these mirror the
// content the agent actually produces: one General feed (the daily headlines /
// general news) plus the four topic categories. Case Studies live on their own
// /case-studies page. Slugs match the routes in content.js / CategoryNewsPage.
//
// `image` is a static cover under /public/newsletter/themes (null = styled
// placeholder). `desi` carries the jewel palette: `from`/`to` build the hero
// gradient, `accent` is the card top-band + ornament colour.

export const NEWSLETTER_THEMES = [
  {
    slug: 'general',
    label: 'General',
    desc: 'The day’s biggest headlines across India and the world — politics, business, and what everyone is talking about.',
    image: '/newsletter/themes/national.jpg',
    gradient: 'from-orange-500 to-pink-500',
    desi: { from: '#C2410C', to: '#7B1E3B', accent: '#F4A300' },
  },
  {
    slug: 'real-estate',
    label: 'Real Estate',
    desc: 'Launches, handovers, builder moves, infrastructure and regulation across India’s property market.',
    image: null,
    gradient: 'from-teal-500 to-emerald-600',
    desi: { from: '#0E7C7B', to: '#0B3D2E', accent: '#D4AF37' },
  },
  {
    slug: 'policy-partner',
    label: 'Policy Partner',
    desc: 'Indian policy in plain English — what changed, who it touches, and what to watch next.',
    image: null,
    gradient: 'from-violet-500 to-indigo-600',
    desi: { from: '#5B2A86', to: '#0E3A8A', accent: '#F4A300' },
  },
  {
    slug: 'money-matters',
    label: 'Money Matters',
    desc: 'The money developments that actually change your week — markets, regulation, and personal finance.',
    image: '/newsletter/themes/finance.jpg',
    gradient: 'from-emerald-500 to-teal-600',
    desi: { from: '#1B5E3F', to: '#0B3D2E', accent: '#D4AF37' },
  },
  {
    slug: 'wellness-daily',
    label: 'Wellness Daily',
    desc: 'Evidence-led wellness for desk-bound professionals — movement, sleep, nutrition, and focus.',
    image: '/newsletter/themes/lifestyle.jpg',
    gradient: 'from-green-500 to-emerald-500',
    desi: { from: '#0E7C7B', to: '#1B5E3F', accent: '#F4A300' },
  },
]
