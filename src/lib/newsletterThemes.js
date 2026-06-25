// The 7 canonical categories shown as "Select Your Theme" cover cards.
// `image` is a static cover asset under /public/newsletter/themes (null = use the
// styled placeholder until a cover is supplied). slugs match the agent taxonomy.
//
// `desi` carries the desi-maximalism jewel palette for each category — drawn from
// the saturated Bollywood-hoarding range (marigold, burnt orange, wine, rani
// pink, cobalt, emerald, indigo). `from`/`to` build the hero gradient, `accent`
// is the card top-band + ornament colour.

export const NEWSLETTER_THEMES = [
  {
    slug: 'national',
    label: 'National',
    desc: 'The biggest stories shaping India today — politics, policy, and people.',
    image: '/newsletter/themes/national.jpg',
    gradient: 'from-orange-500 to-pink-500',
    desi: { from: '#C2410C', to: '#7B1E3B', accent: '#F4A300' },
  },
  {
    slug: 'international',
    label: 'International',
    desc: 'World events, diplomacy, and the shifts that ripple across borders.',
    image: '/newsletter/themes/international.jpg',
    gradient: 'from-blue-500 to-cyan-500',
    desi: { from: '#0E3A8A', to: '#0E7C7B', accent: '#F4A300' },
  },
  {
    slug: 'finance',
    label: 'Finance',
    desc: 'Markets, money, and the macro forces moving your wallet.',
    image: '/newsletter/themes/finance.jpg',
    gradient: 'from-emerald-500 to-teal-500',
    desi: { from: '#1B5E3F', to: '#0B3D2E', accent: '#D4AF37' },
  },
  {
    slug: 'sports',
    label: 'Sports',
    desc: 'Results, rivalries, and the moments that defined the day in sport.',
    image: '/newsletter/themes/sports.jpg',
    gradient: 'from-amber-500 to-orange-500',
    desi: { from: '#E2571E', to: '#8A1C1C', accent: '#F4A300' },
  },
  {
    slug: 'entertainment',
    label: 'Entertainment',
    desc: 'Film, music, streaming, and the culture everyone is talking about.',
    image: '/newsletter/themes/entertainment.jpg',
    gradient: 'from-pink-500 to-rose-500',
    desi: { from: '#D81B60', to: '#6A1B9A', accent: '#F4A300' },
  },
  {
    slug: 'lifestyle',
    label: 'Lifestyle',
    desc: 'Health, work, food, and living well in a fast-moving world.',
    image: '/newsletter/themes/lifestyle.jpg',
    gradient: 'from-green-500 to-emerald-500',
    desi: { from: '#0E7C7B', to: '#1B5E3F', accent: '#F4A300' },
  },
  {
    slug: 'technology',
    label: 'Technology',
    desc: 'AI, startups, gadgets, and the tech reshaping how we live.',
    image: '/newsletter/themes/technology.jpg',
    gradient: 'from-violet-500 to-fuchsia-500',
    desi: { from: '#5B2A86', to: '#C2185B', accent: '#F4A300' },
  },
]
