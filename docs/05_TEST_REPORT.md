# Build, responsive, and interaction report

## Current run — R09.1 (9 November 2026)

| Check | Result |
|---|---|
| `npm run typecheck` | Passed |
| `npm run build` | Passed; 9 HTML routes generated (portfolio, 4 demos, 4 case pages) |
| Desktop/mobile browser QA | Passed against the local Vite preview at `http://127.0.0.1:4174` |
| Responsive checks | 54 of 54; nine routes at 360, 375, 390, 768, 1024, and 1440 CSS pixels; no horizontal overflow |
| Interactive journeys | 6 passed, including portfolio RU/EN and contact, Aurelia mobile row layout, and four different booking demos |
| Case pages / demos | 4 case pages with working demo links; 4 screen-recording videos load and are each 15–25 seconds |
| Browser errors / failed HTTP responses | 0 |
| Capture images | All page images loaded; desktop/mobile captures exist for the home page and each demo |

The machine-readable current report is [qa-report-r09-1.json](../assets/screenshots/qa-report-r09-1.json). Screenshots and videos are listed in [R09.1_HANDOFF.md](R09.1_HANDOFF.md). The video duration and page-image checks run against the local production build.

**Date:** 8 November 2026  
**Build target:** Vite production output in `dist/`  
**Browser base used by automated QA:** local production preview at `http://127.0.0.1:4173`  
**Raw report:** [qa-report.json](../assets/screenshots/qa-report.json)

## Previous baseline — 8 November 2026

| Check | Result |
|---|---|
| `npm run typecheck` | Passed |
| `npm run build` | Passed; 5 HTML entry points generated |
| `npm run qa` on production preview | Passed |
| Responsive viewport checks | 25 of 25; all five pages at 375, 390, 768, 1024, and 1440 CSS pixels; no horizontal overflow |
| Browser journeys | 15 recorded by the runner; main navigation, filtering, language changes, booking/cart/catalog interactions were exercised |
| Browser console errors | 0 |
| Screenshots | 12 files saved in `assets/screenshots/` |
| Production publish | Sites reported the current public deployment as `succeeded` and returned the URL in `04_GITHUB_AND_DEPLOY.md` |

## Journey coverage

- Each of the five pages loads in the production build; local page links return successfully and all displayed assets load.
- Portfolio and Clarity mobile navigation opens, follows an anchor, and closes.
- Aurelia: language update, category filter, add item, cart total, quantity update, remove, local checkout status, and date/time demo booking.
- Forma: service filter, fictional provider detail, English language state, date/time booking, and FAQ expansion.
- Clarity: catalog search and clear state, category filter, detail dialog, selected-test plan, demo booking, and English labels.
- MoveWell: service filter, FAQ expansion, Russian labels, and local consultation confirmation.

The automated QA runner is `scripts/qa.mjs`. It builds no test fixtures into the public experience. It checks the compiled site, not a production medical service.

## Previous visual review — 8 November 2026

The desktop portfolio and phone-width Aurelia and Clarity pages were inspected from screenshots. Distinct art directions read clearly, and no horizontal spill was visible. The generated screenshot set includes desktop and mobile captures for the portfolio and each demo, plus the Aurelia cart and Clarity detail states.

Selected files:

- [Portfolio desktop](../assets/screenshots/portfolio-desktop.jpg)
- [Portfolio mobile](../assets/screenshots/portfolio-mobile.jpg)
- [Aurelia basket demo](../assets/screenshots/aurelia-cart-demo.jpg)
- [Clarity test detail](../assets/screenshots/clarity-test-detail.jpg)

## Scope and limits

- The date/time and checkout flows are local interface demonstrations; they do not create an appointment, order, payment, or data record.
- No backend, CRM, calendar, e-commerce, analytics, or patient portal integration was requested or configured.
- A successful local production-preview run is not, by itself, proof that a remote URL is live. The Sites deployment result is checked separately.
- This is not a clinical or security certification. The portfolio contains no real patient data or treatment advice.
