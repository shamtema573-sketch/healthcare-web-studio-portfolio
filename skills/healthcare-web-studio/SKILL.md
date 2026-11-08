---
name: healthcare-web-studio
description: Create or improve original, responsive websites and interactive demos for clinics, laboratories, dental practices, aesthetics, and rehabilitation services. Use when a brief needs visual direction, careful healthcare copy, accessible frontend interactions, or a credible launch handoff. Do not use for diagnosis or treatment advice.
---

# Healthcare Web Studio

Use this skill to turn a healthcare website brief into a specific, trustworthy, usable, and technically reviewable web experience. Keep the client's business goal visible while protecting patient trust and keeping demo behavior honest.

## 1. Read the brief before designing

- Extract the audience, business outcome, required pages or sections, language needs, content sources, interactions, integrations, technical stack, hosting, and deliverables.
- Separate confirmed facts, invented demo content, implementation, and future integrations.
- Preserve explicit constraints: do not invent credentials, licenses, testimonials, outcome rates, medical guarantees, or active commercial deployments.
- If the request includes several sites, give every site its own audience, business job, visual thesis, content rhythm, and signature detail.
- Continue with sensible assumptions when a small detail is missing. Ask only when the missing fact changes a consequential decision.

## 2. Research the actual category

- For substantial new work, inspect relevant live sites and keep their URLs and inspection date in the project notes. Include both local and international examples when they serve the audience.
- Record what was actually observed: navigation, search, service discovery, clinician presentation, booking path, trust signals, responsive behavior, and visible content hierarchy.
- If the available view does not expose color, type, mobile behavior, or an interaction, mark it unknown and verify it in a browser when practical. Do not fill evidence gaps from assumptions.
- Borrow reusable patterns, not brand expression. Never copy a site's name, copy, logo, distinctive layout, photography, or branded asset.

## 3. Set a visual thesis before components

Write one sentence describing the mood, material, and energy. Then state the section sequence and two or three interactions that make the page feel considered.

- Give each project one dominant visual idea and one strong visual anchor.
- Use scale, type, crop, whitespace, alignment, and image placement before adding controls or decoration.
- Use no more than two type families without a clear reason. Give navigation and form controls a deliberate type scale too.
- Prefer open sections, editorial columns, rails, lists, and clear bands. Use cards only when grouping or comparison needs them.
- For brand-led pages, keep the first view direct: identity, plain-language headline, one sentence of support, one primary action, and a strong visual.
- Use an original, licensed, or explicitly generated asset. Do not pass an image of a model off as a real doctor or patient. Put meaningful text in HTML, not in raster artwork.
- If the request needs an art-directed new frontend and the official OpenAI frontend-app-builder skill is available, use its concept-first and browser-comparison workflow. Use image generation for visual assets when it materially improves the page; use code-native SVG/CSS for marks and diagrams that benefit from deterministic geometry.

## 4. Remove template and machine-written signals

Before implementation, read references/anti-template-checklist.md.

- Do not start from a familiar generic hero plus three equal feature cards. Choose composition from the business and content.
- Avoid decorative eyebrow badges, pills, fake statistics, logo clouds, stacked gradients, blurred orbs, fake dashboards, redundant icon rows, and filler testimonials unless a documented requirement gives them a real job.
- Do not reuse one section formula across every project. Change the type scale, spacing rhythm, image treatment, and content architecture between brands.
- Replace vague promises with the visitor's next useful step. Avoid claims such as “best”, “revolutionary”, “effortless”, “guaranteed”, and “the future of care” without substantiation.
- Read the copy aloud. Remove repeated benefits, abstract nouns, inflated adjectives, and sentences that could belong to any clinic.
- Check for copy patterns that sound generated: “where X meets Y,” “more than a [service],” “your journey starts here,” “we believe in,” a row of three generic one-word benefits, or the same three-beat sentence on every page. Keep only a phrase that carries a concrete fact; replace the rest with plain language about the actual service or next action.
- Vary sentence length and section openings. Do not repeat the same CTA, benefit list, or headline structure across the portfolio just to make the pages feel consistent.
- Remove false certainty and fake specificity: made-up response times, round-number outcome claims, invented location details, stock-sounding first-person brand manifestos, and unnecessary “AI-powered” labels.
- Prefer an ordinary sentence over a slogan. If a line could be pasted onto any clinic site without changing a word, make it specific or remove it.
- Keep the page calm and specific. Every section should explain, orient, prove something that is actually known, or offer a next step.

## 5. Keep medical demos honest

- Mark fictional businesses and people as portfolio concepts in a visible but unobtrusive way.
- Use neutral, informational medical language. Do not diagnose, prescribe, promise outcomes, or imply that a demo is a real provider.
- Use only explicitly fictional names, prices, locations, opening hours, and schedules; label them as examples.
- Do not collect or transmit medical or identifying data. Demo forms should validate locally, request no sensitive details, and say clearly that nothing was sent or saved.
- Do not connect real payments, appointment systems, medical records, CRM, email, or messaging unless the user explicitly authorizes the integration and its data flow.
- Keep planned integrations in a separate “possible next step” state until a real connector has been implemented and verified.

## 6. Build an accessible, functional interface

- Prefer the simplest maintainable stack that meets the requested output. Keep sample data separate from rendering and state logic.
- Use semantic HTML, a logical heading order, explicit input labels, useful alt text, keyboard-operable controls, visible focus, and status messages announced to assistive technology.
- Keep touch targets around 44 CSS pixels or larger. Check contrast, zoom, small screens, reduced-motion preferences, and focus behavior in overlays.
- Every visible control must work or be visibly labeled as a demo. Do not use hover as the only way to reveal content.
- Use native controls when they suffice. Add a component library only when it improves accessible behavior or materially reduces maintenance.
- Keep animations short and purposeful, and disable nonessential movement for prefers-reduced-motion.

## 7. Plan integrations before connecting them

- Separate user-visible UI from a real external action. A button labelled “send,” “book,” or “pay” must have a verified destination or be clearly marked as a demo.
- Before connecting a CRM, calendar, payment, email, or analytics service, write down the event, minimum payload fields, receiving system, authentication location, consent/retention needs, error state, duplicate handling, and test environment.
- Keep credentials server-side. Never place secrets in front-end bundles, sample data, screenshots, or handoff documents.
- Prefer a test account and synthetic records. Verify both success and failure responses and the visitor's confirmation message.
- Record the actual connector, data fields, status, and remaining owner tasks. Do not describe a proposed integration as complete.

## 8. Verify and report

- Run the build, type check, lint, and user-requested tests. Do not claim checks that were not run.
- Test the required user journeys, forms, translations, error and empty states, navigation, and 375, 390, 768, 1024, and 1440 pixel layouts.
- Inspect the rendered page in a browser, including keyboard use and a mobile viewport when available. Fix broken images, overflow, dead links, inaccessible controls, and mismatches before handoff.
- Review source files and built output for secrets, external calls, tracking, and real data collection.
- Verify the hosting terms and current free-tier limits before deployment. Do not buy a domain, paid service, subscription, or plugin without explicit approval. Do not claim deployment until the public URL opens successfully.
- Finish with a fact-based ledger: working behavior, demo-only behavior, unimplemented integrations, tests run, deployment state, file paths, and references.

