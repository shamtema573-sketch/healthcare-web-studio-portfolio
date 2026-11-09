# Design systems and page logic

The four demos were built to show different decisions for different healthcare businesses. Shared tooling lives in one React/Vite project; their visual systems do not share a site template.

## Portfolio — AI Digital Studio

- **Job:** help a clinic owner scan the work, open a relevant demo, and understand what is already functional.
- **Direction:** dark editorial folio; charcoal field, warm gray text, chartreuse `#d5ea42`, large condensed-feeling display scale, project imagery used as evidence.
- **Flow:** direct studio statement → four project previews → capability summary → studio contact path.
- **Signature detail:** project index rows and oversized type. The image previews link to live demos.
- **Copy rule:** capability language only; no fabricated client, conversion, revenue, or clinical results.

## Aurelia Aesthetic Clinic

- **Job:** make sample procedures easy to compare and let a visitor try a non-binding selection and booking flow.
- **Direction:** warm gallery-like beauty studio; ivory and stone, dark brown-green text, quiet botanical shades, serif headlines, close original still-life/skin-care imagery.
- **Flow:** brand and appointment path → treatment catalogue → care approach → three-step explanation → FAQ → local booking demo.
- **Signature detail:** catalog rows rather than a uniform grid, with search/filter/sort, a detail dialog, and a basket drawer.
- **Languages:** Russian, English, German, French. Visible strings and price labels change with the chosen language; sample prices remain denominated in RUB.

## Forma Dental

- **Job:** orient a visitor around sample dental services, fictional practitioners, and the first visit.
- **Direction:** tactile paper and ink; pale sand, dark cocoa, muted terracotta, editorial serif titles, larger full-bleed imagery, short unboxed service rows.
- **Flow:** practice concept → service overview → sample team profiles → price information → FAQ → local appointment form.
- **Signature detail:** typographic, newspaper-like hierarchy. The fictional team is explicitly presented as a concept; no credentials or patient reviews are invented.
- **Languages:** Russian and English.

## Clarity Diagnostics

- **Job:** help someone find an example test and inspect its sample description without presenting medical results.
- **Direction:** clean laboratory index; cool white, dark navy/teal ink, clear numeric hierarchy, compact tabular rows, restrained pale blue/green surfaces.
- **Flow:** purpose and search → category filters → test rows and detail → sample visit-plan steps → FAQ → local appointment demonstration.
- **Signature detail:** searchable catalog with a selected-test plan. Search and category state are easy to reset.
- **Languages:** Russian and English.

## MoveWell Physiotherapy

- **Job:** explain a fictional movement studio's service types and the steps in an initial consultation.
- **Direction:** daylight and natural materials; pale sage, clay, cream, generous photography, active display typography, lighter transitions between sections.
- **Flow:** introduction → service list and filter → process → fictional practitioners → sample pricing → FAQ → local consultation form.
- **Signature detail:** movement-oriented service index and a plain sequence for the first visit.
- **Languages:** English and Russian.

## Shared implementation rules

- One `src/main.tsx` dispatches to distinct page trees; content remains in the relevant concept's view/data blocks. `src/styles.css` contains separate namespaces and responsive rules for each concept.
- React 19, TypeScript, Vite, authored CSS, and Lucide icons. No UI template library or remote font service is used. The CSS names display/system font stacks, but the font files are not bundled; a client production build should choose and license web fonts explicitly.
- Vite emits a multi-page static build. Each project has its own HTML entry at `/sites/<slug>/index.html`.
- Shared accessibility baseline: semantic sections and buttons, visible focus, labeled controls, keyboard-operable dialogs, responsive menu behavior, and reduced-motion support.
- The concepts share factual boundaries and interaction behavior, not a repeated hero/card template. No real medical service, credential, patient story, price, appointment, or outcome is implied.

## Original artwork

The concept board was generated for Aurelia and kept in `assets/concepts/`. Four original, optimized WebP hero images are used by the demos. See [09_ASSETS_AND_LICENSES.md](09_ASSETS_AND_LICENSES.md) for attribution and reuse notes.

## R09.1 refinements

- The four booking demonstrations use different interaction structures: Aurelia is a photo-led care and time selection; Forma is a visit/practitioner board; Clarity is a route ticket for a sample collection visit; MoveWell is a session, format, and time planner.
- Portfolio cards now pair people photography with actual screenshots from the running interfaces. Hero art uses fictional adults and practitioners; the Aurelia and Forma consultations show direct conversation without a tablet, and Clarity shows a fictional laboratory scientist.
- Small navigation and filter actions have larger type and touch targets. Aurelia's mobile catalog keeps the name and description grouped while duration, price, and add action sit in a distinct row.
- The independent concepts keep their different page structures and palettes. No demographic cues are used to imply a real clinician's credentials or identity.

See [R09.1_HANDOFF.md](R09.1_HANDOFF.md) for QA details and media.
