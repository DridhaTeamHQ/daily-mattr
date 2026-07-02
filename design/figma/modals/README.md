# Daily Mattr — auth / subscription overlay states (Figma file R0PWgZZF2fEQt7bn6V6KPx)

The 11 "Newsletter" landing variant frames differ from the base landing (frame 1:59) only by a scrim rectangle + one right-side overlay panel. There are 10 unique overlay designs; each has a spec .md (verbatim Figma design context) and a .png screenshot in this folder.

## Two overlay systems

1. SUBSCRIBE DRAWER — "Frame 251", 589px wide, docked at x=851, y=0. Scrim: "Rectangle 13", black at 70% fill opacity, covers top 1894px of the page. Background #F4F4F6. Header/footer bars white with #E5E5EA borders.
2. AUTH/ACCOUNT DRAWER — "Frame 180", 564px wide, docked at x=876, y=0, rounded top-left 12px. Scrim: "Rectangle 12", black, node opacity 0.5, covers top 833px. Auth states use bg #F4F4F6 with a centered "DailyMattr'." Playfair wordmark header; account states use white bg with an avatar header + pill tabs.

## Unique overlays

| # | File | Overlay node | Shown on frame(s) | State |
|---|---|---|---|---|
| 01 | 01-setup-edition-step1.md/.png | 1:1193 (589x820) | 1:820 | Subscribe step 1: choose Daily Deep Dive vs Weekly Round-up per topic; one topic incomplete; disabled "Review 2 editions" CTA |
| 02 | 02-setup-edition-step1-delivery-days.md/.png | 1:1608 (589x992); card 1:1618 | 1:1235, 1:1695 (Friday selected — same design, different fill) | Subscribe step 1 expanded: Weekly Round-up selected → "Choose a delivery day" Mon–Sun pills; close X icons |
| 03 | 03-setup-edition-step2-email.md/.png | 1:2528 (589x992) | 1:2155 | Subscribe step 2: review of chosen editions + name/email inputs + consent tick; active dark "Confirm subscription" CTA |
| 04 | 04-added-to-editions-success.md/.png | 1:2940 (589x992) | 1:2567 | Success: green 96px tick, "Added to My Editions", edition list with blue day labels, "Explore more topics" + "View my editions" |
| 05 | 05-login.md/.png | 1:3338 (564x1196) | 1:2965 | Log in: "Continue with Google" (#5673E5) / "Continue with email" + "Sign up" link |
| 06 | 06-login-email-step.md/.png | 1:3732 (564x1196); body 1:3733 | 1:3359 | Log in, email entry: email pill input + dark "Continue with email" |
| 07 | 07-signup.md/.png | 1:5308 (564x1196); body 1:5309 | 1:4935 | Create an account: email/name/mobile inputs, T&C line, "Create account", Google button |
| 08 | 08-account-created-success.md/.png | 1:4926 (564x1196); body 1:4927 | 1:4553 | Account created successfully: green tick + copy + "Continue" |
| 09 | 09-account-panel-general.md/.png | 1:4517 (564x1196) | 1:4144 | Logged-in account drawer, General tab: avatar header, tab pills, editable fields, "Save Changes" |
| 10 | 10-account-panel-my-editions.md/.png | 1:4125 (564x2228) | 1:3752 | Account drawer, My Editions tab active (body empty in Figma — see note in the .md) |

Dedup note: frames 1:1235 and 1:1695 share overlay design 02 (only the selected weekday differs).

## Typography
- Be Vietnam Pro — primary UI font of all overlays: Medium (titles 18–24px, labels, buttons 15px), SemiBold (card titles 15px, uppercase labels 13px), Regular (body 13–19px). "STEP X OF 2" eyebrow: Medium 15px, tracking 1.5px, #6B6B73.
- Playfair (variable, opsz 12) — "DailyMattr'." wordmark: ExtraBold 35.37px "Daily" + Black 47.16px "Mattr'.", negative tracking, apostrophe #6B6B73.
- Roboto — secondary: Medium ("Where should we send it?" 18px), Regular (inputs 15/16px, consent 13px), SemiBold (dark pill CTAs 15px).

## Colors
- Neutral 0 #FFFFFF, 100 #F4F4F6 (drawer bg), 200 #E5E5EA (borders), 300 #D1D1D6 (list borders/tabs), 500 #6B6B73, 600 #4A4A52, 700 #1C1C1E (dark CTAs), 800 #141417 (active pills/CTAs)
- Info/Dark #2563EB (confirmation lines, delivery-day labels)
- Success/Dark #0E9F5A (success tick)
- Google blue #5673E5
- Scrims: black @ 0.7 (subscribe) / 0.5 (auth)

## Spacing / radii
- Drawer header/footer: px-32 py-16; body cards inset 24px.
- Topic cards & value boxes: radius 16. Option rows: radius 16, px-16 py-11; selected = bg #F4F4F6 + border #1C1C1E, unselected = border #E5E5EA.
- Weekday pills: radius 40, px-16 py-8; selected = bg/border #141417 white text.
- CTA pills: radius 35–60 (footer buttons h=50 radius 35; auth buttons w=283/337 radius 60 py-14.5; dark pills radius 50 px-24 py-15, shadow 0 6 25 rgba(0,0,0,.15–.25)).
- Tab pills (account): radius 100, px-12 py-8, 13px.

## Asset map (in /public/figma/)
| File | Used in |
|---|---|
| icon-tick-circle-selected.svg / icon-tick-circle-unselected.svg | option radio states (01) |
| icon-tick-circle-selected-dark.svg | selected option on highlighted row (02) |
| icon-cross-28.svg / icon-cross-32.svg / icon-cross-40.svg | close X at card / drawer-header / auth-header sizes |
| icon-tick-24.svg | consent checkbox (03) |
| icon-tick-circle-success-96.svg | success check (04, 08) |
| avatar-account-56.png | account drawer avatar (09, 10) |
