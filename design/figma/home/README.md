# Daily Mattr — category/article reading page ("Home", Figma frame 1:5336, 1440x8523)

Figma file: R0PWgZZF2fEQt7bn6V6KPx. Desktop 1440px. This folder covers the two page-specific sections of the Home (category reading) page; the top nav, FAQ and footer repeat the Newsletter landing design and are documented elsewhere.

## Files

| File | Node | What |
|---|---|---|
| 01-category-hero.md | 1:5342 (1440x508) | Dark category hero "Tech & AI" |
| 02-article-content-group-1.md | 1:5455 (1440x1161) | Date group "Today" — featured + compact cards |
| 03-article-content-group-2.md | 1:5661 (1440x1161) | Date group "Monday 27th" — past-day header variant |
| 04-load-more-button.md | 1:5863 (138x34) | "Load more" split pill button |
| full-home.png | 1:5336 | Full-page reference screenshot |
| home-variant-2.png | 1:5869 | Alternate Home state (variant 2) |
| home-variant-3.png | 1:6425 | Alternate Home state (variant 3) |

Page vertical structure (frame 1:5336): nav (y=0..70) → category hero 1:5342 (y=70..578) → article content 1:5453 (y=578..3062, page bg is light grey/white) → landing-repeat sections (FAQ, subscribe, footer) below.

## Section 1 — Category hero (1:5342, 1440x508)

- Solid black background; full-bleed photo (hero-tech-ai-bg.png) rendered rotated -90deg at 40% opacity over it.
- Content row at left:72px, top:292px, width:1294px, justify-between:
  - Category title "Tech & AI": Be Vietnam Pro SemiBold 126px, white, letter-spacing -10.08px (-0.08em), line-height 1.
  - Right stack (w=433, gap 32, right-aligned): tagline Be Vietnam Pro Regular 18px / 1.46, white, text-right; button row:
    - "Subscribe" pill: bg white, border rgba(255,255,255,0.1), radius 50, px-24 py-16, text Roboto SemiBold 15px #141417, shadow 0 6 25 rgba(0,0,0,0.25). Contains decorative glow strip (button-glow-ellipse.png).
    - Round icon button: same style, p-16, 18px inbox icon (icon-direct-inbox.svg).

## Section 2 — Article content (1:5453, 1440x2484)

Repeating "date group" blocks (1161px each, 64px gap between groups, 16px gap header→cards, horizontal page padding 32px), followed by a centered Load more button (y=2418). "Rectangle 5" (1:5862) inside this section has a 0-opacity fill — ignore.

### Date header row
- "Today, 28th June, 2026": Roboto Bold 24px, line-height 64px, color #0F0F11 (today) / #6B6B73 (past days, e.g. "Monday, 27th June, 2026").
- A 1px horizontal divider line (article-date-divider-line.svg, color ≈ Neutral 400 #B8B8C0) fills the remaining row width, 16px gap after the text.
- Past-day headers have a HIDDEN pair of 48x48 prev/next chevron buttons (radius 12, border rgba(0,0,0,0.1)) — visible:false in Figma, don't render.

### Two-column card grid (gap 8px)
- LEFT column: fixed 895px. Contains, stacked with 8px gaps:
  1. Full-width Featured Card (highlighted: border #141417 1px — the "lead" card; subsequent ones use border rgba(28,28,30,0.1))
  2. Second full-width Featured Card
  3. Row of two half-width Featured Cards (flex 1 each, 8px gap)
- RIGHT column: flex-1 (473px). Three compact Cards stacked, 8px gap.

### Card specs
Featured Card (full width): bg white, radius 16, padding 32, inner column gap 24.
- Tag row (gap 8): "LONG STORY" pill — bg rgba(153,51,255,0.1), text #7900D9 (brand Primary 500), Roboto Bold 12px uppercase, px-16 py-8, radius 34/100. "10 MIN READ" pill — bg rgba(0,0,0,0.05), text #141417.
- Title: Roboto Bold 32px / 44px, black. (Half-width variant: Roboto Bold 21px / normal, no tag row.)
- Excerpt: Roboto Regular 18px / 30px, #6B6B73, ends with inline "Read more" in Roboto Medium #1C1C1E. (Half-width: 16px / 25px.)
- Source row: overlapped 16px circular favicons (YouTube icon-youtube-color.svg, X icon-x-social.svg, Facebook icon-facebook.svg; each with 1px white border, -4px overlap) + "5 sources" Roboto Regular 16px / 25px #6B6B73.

Compact Card (right column): bg white, border rgba(28,28,30,0.1), radius 16, outer padding 16, content padding 12 h / 8 top / 16 bottom, gap 8.
- Title: Roboto SemiBold 21px / 1.36, black.
- Body: Roboto Regular 16px / 25px, #6B6B73 (no "Read more").
- Same source row.

### Load more (1:5863, centered at bottom)
- Text pill: bg rgba(255,255,255,0.1), border #1C1C1E 1px, radius 50, px-16 py-8, "Load more" Roboto SemiBold 15px #141417.
- Attached round chip: bg #1C1C1E, 34px wide, radius 50, 10x12 white down arrow (icon-load-more-arrow-down.svg).

## Page variants
- home-variant-2.png (frame 1:5869) and home-variant-3.png (frame 1:6425): same layout with alternate states (image strip / open menu). Use screenshots as reference; components are identical to those specced above.

## Typography
- Be Vietnam Pro: SemiBold (hero title 126px), Regular (hero tagline 18px).
- Roboto (variable, fontVariationSettings "wdth" 100): Bold (date headers 24px, card titles 32/21px, tag labels 12px), SemiBold (buttons 15px, compact titles 21px), Medium ("Read more"), Regular (body 18/16px).

## Colors
- #000000 hero bg, #FFFFFF cards/buttons (Neutral 0)
- Neutral 900 #0F0F11 (today date), Neutral 800 #141417, Neutral 700 #1C1C1E, Neutral 500 #6B6B73, Neutral 400 #B8B8C0 (divider), Brand Primary 500 #7900D9 (+ 10% tint rgba(153,51,255,0.1))
- Card borders: #141417 (lead card) / rgba(28,28,30,0.1) (default)

## Radii / shadows
- Cards 16px; tags 34–100px (fully rounded); buttons/pills 50px; hidden nav buttons 12px.
- Button shadow: 0 6px 25px rgba(0,0,0,0.25).

## Asset map (in /public/figma/)
| File | Used in |
|---|---|
| hero-tech-ai-bg.png | hero background photo (render rotated -90deg, opacity 0.4) |
| button-glow-ellipse.png | decorative glow inside white pills |
| icon-direct-inbox.svg | hero round icon button |
| article-date-divider-line.svg | date header divider |
| icon-youtube-color.svg, icon-youtube-color-2.svg | source favicon |
| icon-x-social.svg | source favicon |
| icon-facebook.svg | source favicon |
| icon-load-more-arrow-down.svg | load-more arrow chip |
