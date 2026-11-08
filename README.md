# Healthcare Web Portfolio

**Live portfolio:** https://healthcare-web-studio-portfolio-20261108.cocoapause1.chatgpt.site/  
**Source repository:** https://github.com/shamtema573-sketch/healthcare-web-studio-portfolio

Five responsive static pages: four distinct healthcare demo concepts and a portfolio page. The demos use fictional clinic names, staff, prices, and locations. Forms, booking flows, and the Aurelia basket are local demonstrations; they do not send data or process payments.

## Live demos

- [Aurelia Aesthetic Clinic](https://healthcare-web-studio-portfolio-20261108.cocoapause1.chatgpt.site/sites/aurelia/index.html) — four languages, searchable service catalog, sample basket, and booking demo.
- [Forma Dental](https://healthcare-web-studio-portfolio-20261108.cocoapause1.chatgpt.site/sites/forma/index.html) — editorial private-dentistry concept with sample services and team profiles.
- [Clarity Diagnostics](https://healthcare-web-studio-portfolio-20261108.cocoapause1.chatgpt.site/sites/clarity/index.html) — searchable sample catalog with a visit-plan interaction.
- [MoveWell Physiotherapy](https://healthcare-web-studio-portfolio-20261108.cocoapause1.chatgpt.site/sites/movewell/index.html) — movement-focused service page and local consultation demo.

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

The production build creates five HTML entry points in dist/. The last recorded QA run passed 25 viewport checks and 15 browser journeys with no console errors; see docs/05_TEST_REPORT.md.

## Project materials

- docs/01_REFERENCE_RESEARCH.md — observed patterns from public healthcare sites.
- docs/02_DESIGN_SYSTEMS.md — the four visual directions and portfolio system.
- docs/03_PROJECT_CASE_STUDIES.md — scope and implemented behavior for each demo.
- docs/04_GITHUB_AND_DEPLOY.md — repository and hosting notes.
- docs/08_WORDPRESS_ADAPTATION.md — status of the Aurelia WordPress starter.
- docs/09_ASSETS_AND_LICENSES.md — asset provenance and dependency notes.
- skills/healthcare-web-studio/SKILL.md — reusable review and implementation skill.
- wordpress-theme/aurelia/ — uninstalled block-theme starter source.

## Use and claims

These are self-initiated portfolio concepts, not paid client work. No clinical advice, practitioner credentials, patient results, real appointment system, CRM, or payments are provided. Replace and verify all sample content before production use.

No project-level open-source license is granted. Public availability of the repository does not grant permission to reuse its code, assets, or sample content.

