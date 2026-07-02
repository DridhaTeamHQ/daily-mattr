# Daily Mattr — Landing page ("Newsletter" frame) implementation spec

Figma file: R0PWgZZF2fEQt7bn6V6KPx · Frame: "Newsletter" node **1:59**, 1440 x 5262, bg white.
Full-frame reference screenshot: `full-landing.png` (411x1500 scaled render of the 1440x5262 frame).

## Page structure, top → bottom (exact frame positions inside 1:59)

| # | Section | Node | x, y | Size | Spec file |
|---|---|---|---|---|---|
| 1 | Top nav | 1:412 | 0, 0 | 1440 x 70 | `01-top-nav.md` |
| 2 | Hero media (video) | 1:60 | 8, 82 | 1424 x 738 | `02-hero-media.md` |
| 3 | Hero copy overlay | 1:64 | 267, 279 | 905 x 373 | `03-hero-copy.md` |
| 4 | Daily/Weekly strip | 1:404 | 8, 836 | 1424 x 225 | `04-daily-weekly-strip.md` |
| 5 | Categories | 1:282 | 0, 1079 | 1440 x 2389 | `05-categories.md` |
| 6 | FAQ | 1:226 | 0, 3714 | 1440 x 749 | `06-faq.md` |
| 7 | Footer | 1:202 | 0, 4463 | 1440 x 799 | `07-footer.md` |

Ignored duplicates (identical understack copies behind the real sections): 1:274 (copy of strip), 1:80 (copy of categories).

Layout rhythm: 12px gap between nav bottom (70) and hero (82); hero copy overlays the video (hero copy top 279 = 197px into the video); the strip overlaps nothing but sits 16px after the hero (820→836); 18px gap strip→categories (1061→1079); categories run 1079→3468, then 246px whitespace before FAQ (3714); FAQ ends 4463 where footer begins; footer ends flush at 5262.

## Fonts

| Font | Usage |
|---|---|
| **Playfair** (variable: opsz 12, wdth 100) ExtraBold + Black | Wordmark only ("DailyMattr'." / "theMattr'."). Nav: "Daily" EB 24px tr -1.2px, "Mattr'." Black 32px tr -1.6px (-2.56px on "tt"), apostrophe #6B6B73. Footer giant: "Daily" EB 251.347px tr -12.5674px, "Mattr'." Black 335.129px tr -16.7565px (-26.8103px on "tt") |
| **Be Vietnam Pro** | Primary UI font. Bold 166px tr -13.28px lh 1.2 (hero headline, uppercase). Medium 56px tr -2.8px lh 1.26 (section H2s). Regular 48px (strip titles). Medium 32px tr -1.6px lh 1.46 (card titles). SemiBold 18px tr 2.7px lh 1.26 (eyebrows). Regular/Medium 18px lh 1.46–1.55 (body). SemiBold 18px (Subscribe CTA label). SemiBold 14px (Download App). Medium/SemiBold 13px (nav links, chips) |
| **Roboto** (wdth 100) | Buttons + FAQ + footer. SemiBold 15px (pill button labels). Medium 21px (FAQ questions), Regular 21px lh 1.46 (FAQ answers). SemiBold 32px lh 1.26 (footer tagline). Regular 18px lh 1.46 (footer blurb/copyright). Regular 14px uppercase tr 0.7px (footer column headings), Medium 14px lh 1.46 (footer links) |

## Colors

Figma variables (Neutral colors | Light Mode — see `00-variables.md`):
- Neutral 0 `#FFFFFF` · 50 `#FAFAFB` · 200 `#E5E5EA` · 300 `#D1D1D6` · 400 `#B8B8C0` · 500 `#6B6B73` · 600 `#4A4A52` · 700 `#1C1C1E` · 800 `#141417`

Other literals:
- Dark button bg: `rgba(28,28,17,0.93)` (nav) / `#1C1C1E` (cards, FAQ)
- CTA label dark: `#1B1810`
- Hero gradient: to-bottom `rgba(123,96,67,0.09)` → `rgba(13,21,11,0.9)` at 101.88%
- Card image placeholder: `#D9D9D9`
- Card pastels: tech `#EBF3FF`, money `#F5F0FF`, sports `#EDF7F1`, entertainment `#F4F4F6`, national `#EFF0E6`, international `#FFF2EB`, wellness `#E9F4EB`, politics `#ECE6F0`, real estate `#EBF4FF`
- Borders: `rgba(0,0,0,0.1)` (card buttons), `rgba(255,255,255,0.1)` (FAQ dark buttons), `#D1D1D6` (chips), `#B8B8C0` (dashed FAQ dividers, nav pill)

## Spacing and radii

- Page gutter: 56px (nav padding, strip padding); content wrappers centered at 1326–1329px (categories) and 1253px (footer)
- Radii: 24px (hero, strip, cards, FAQ accordion), 25px (hero gradient), 35px (hero CTA), 40px (nav dropdown pill), 50px (dark pill buttons), 100px (chips/nav links/icon circle)
- Card grid: 3 cols, gap 24; card image band 263px tall; card content padding 16
- Pill buttons: px 24 / py 16 (cards, FAQ), px 16 / py 8 (nav CTA), px 12 / py 8 (links/chips)
- Shadows: `0 6 25 rgba(0,0,0,0.15)` (selected card button), `0 6 25 rgba(0,0,0,0.25)` (FAQ subscribe)
- Signature "glow" detail: every dark pill contains a decorative blurred ellipse (251x8) absolutely positioned near its bottom edge (left ≈ -70, top ≈ 62) — assets `nav-button-glow.svg` / `cat-button-glow.svg` / `faq-button-glow.svg`
- Eyebrow pattern: uppercase tracked label where one word sits on a black 144x17 rect and renders white (marker-highlight)

## Saved assets → usage map (all in `daily-mattr/public/figma/`)

| File | Used in |
|---|---|
| nav-icon-user.svg | Nav user icon button (16px) |
| nav-icon-arrow-down.svg | Nav "Long Mattrs" dropdown chevron (16px) |
| nav-button-glow.svg | Nav dark pill glow ellipse |
| hero-video-poster.png | Hero 1:60 flattened export — video poster fallback |
| hero-video-frame-dark.png | Raw dark video frame fill of "Hero Video 1" (1:63) |
| hero-collage-art.png | Indian-collage art layer found inside hero subtree (alternate hero art) |
| hero-arrow-up-right.svg | Subscribe CTA arrow icon (20px in 34px black circle) |
| cat-icon-tick.svg | "Selected" card button tick (20px) |
| cat-icon-add.svg | "Subscribe" card button plus (16px) |
| cat-button-glow.svg | Card pill glow ellipse |
| category-tech-ai.png | Technology & AI card image |
| category-money-markets.png | Money & Stock Markets card image |
| category-sports.gif (+ category-sports-still.png) | Sports card — ANIMATED GIF |
| category-entertainment.gif (+ category-entertainment-still.png) | Entertainment card — ANIMATED GIF |
| category-national-politics.png | National + Politics & Power cards (shared collage) |
| category-international.png (+ -base.png) | International card (top layer + base layer) |
| category-wellness.png | Wellness Daily card image |
| category-real-estate.png (+ -alt.png) | Real Estate card image (+ alternate source) |
| category-money-bull-alt.png | Alternate money-markets art (bull newspaper) found in subtree |
| categories-section-export.png | Flattened render of the whole categories section (reference) |
| faq-icon-plus.svg / faq-icon-minus.svg | FAQ accordion closed/open indicators (16px) |
| faq-icon-direct-inbox.svg | FAQ icon-only dark pill (18px) |
| faq-button-glow.svg | FAQ dark pill glow ellipse |
| design/figma/landing/full-landing.png | Full-frame screenshot of 1:59 |

(Other icon-*/article-* files in the folder predate this extraction — not part of the landing frame.)

## Implementation notes
- "Hero Video 1" (1:63) is a video slot: implement `<video autoplay muted loop playsinline poster=hero-video-poster.png>`; the design's fill is a near-black clip with floating dust particles. The warm-brown→black gradient (1:61) overlays it.
- The hero headline in the design reads "Long Mattr" styled uppercase (renders "LONG MATTR").
- Sports/Entertainment card media are animated GIFs — render as `<img>` with the .gif, or convert to looping video for performance.
- FAQ first item is shown open with a minus icon; remaining items closed with plus.
- Footer giant wordmark bleeds below the section bottom — clip with overflow hidden.
- Several category descriptions are placeholder-duplicated in the design (International/Real Estate reuse the Sports copy; Wellness reuses Entertainment copy) — flag to content owner.
