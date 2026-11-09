# Healthcare Web Portfolio

**Live portfolio:** https://healthcare-web-studio-portfolio-20261108.cocoapause1.chatgpt.site/  
**Source repository:** https://github.com/shamtema573-sketch/healthcare-web-studio-portfolio

Nine responsive static routes: a bilingual portfolio, four distinct healthcare demo concepts, and four short case pages. The demos use fictional clinic names, staff, prices, and locations. Each has its own booking interaction. Forms, booking flows, and the Aurelia basket are local demonstrations; they do not send data or process payments.

## Live demos

- [Aurelia Aesthetic Clinic](https://healthcare-web-studio-portfolio-20261108.cocoapause1.chatgpt.site/sites/aurelia/index.html) — four languages, searchable service catalog, sample basket, and booking demo.
- [Forma Dental](https://healthcare-web-studio-portfolio-20261108.cocoapause1.chatgpt.site/sites/forma/index.html) — editorial private-dentistry concept with sample services and team profiles.
- [Clarity Diagnostics](https://healthcare-web-studio-portfolio-20261108.cocoapause1.chatgpt.site/sites/clarity/index.html) — searchable sample catalog with a visit-plan interaction.
- [MoveWell Physiotherapy](https://healthcare-web-studio-portfolio-20261108.cocoapause1.chatgpt.site/sites/movewell/index.html) — movement-focused service page and local consultation demo.

## Case pages and videos

Each concept has a short case page with task, design, functions, mobile behavior, technology, and its demo link. The case pages include silent 15–25 second recordings of the actual interfaces; see `cases/` and `assets/videos/`.

- [Aurelia case](https://healthcare-web-studio-portfolio-20261108.cocoapause1.chatgpt.site/cases/aurelia/index.html)
- [Forma Dental case](https://healthcare-web-studio-portfolio-20261108.cocoapause1.chatgpt.site/cases/forma/index.html)
- [Clarity Diagnostics case](https://healthcare-web-studio-portfolio-20261108.cocoapause1.chatgpt.site/cases/clarity/index.html)
- [MoveWell case](https://healthcare-web-studio-portfolio-20261108.cocoapause1.chatgpt.site/cases/movewell/index.html)

## Stack

React, TypeScript, Vite, authored CSS, static sample content, and Playwright browser QA.

## Run locally

Requires Node.js and npm.

```bash
npm ci
npm run dev
```

Production checks:

```bash
npm run typecheck
npm run build
npm run preview
```

With the preview server running at http://127.0.0.1:4173:

```bash
npm run qa
```

The production build creates nine HTML entry points in dist/. On 9 November 2026, the R09.1 QA run passed 54 responsive checks, six interaction journeys, four case pages, and four videos with no browser errors; see docs/05_TEST_REPORT.md and `assets/screenshots/qa-report-r09-1.json`.

## Project materials

- docs/01_REFERENCE_RESEARCH.md — observed patterns from public healthcare sites.
- docs/02_DESIGN_SYSTEMS.md — the four visual directions and portfolio system.
- docs/03_PROJECT_CASE_STUDIES.md — scope and implemented behavior for each demo.
- docs/04_GITHUB_AND_DEPLOY.md — repository and hosting notes.
- docs/08_WORDPRESS_ADAPTATION.md — status of the Aurelia WordPress starter.
- docs/09_ASSETS_AND_LICENSES.md — asset provenance and dependency notes.
- docs/R09.1_HANDOFF.md — current scope, decisions, QA evidence, and limits.
- skills/healthcare-web-studio/SKILL.md — reusable review and implementation skill.
- wordpress-theme/aurelia/ — uninstalled block-theme starter source.

## Use and claims

These are self-initiated portfolio concepts, not paid client work. No clinical advice, practitioner credentials, patient results, real appointment system, CRM, or payments are provided. Replace and verify all sample content before production use.

No project-level open-source license is granted. Public availability of the repository does not grant permission to reuse its code, assets, or sample content.

