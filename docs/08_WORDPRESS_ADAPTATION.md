# Aurelia → WordPress: implementation map

## Current deliverable

`../wordpress-theme/aurelia/` is a starter WordPress block theme with native blocks, a front-page template, header/footer parts, and one reusable service-catalog pattern. The local R09.1 installation test is described below. Its sample list is not connected to a product, booking, or payment service.

### R09.1 local installation check — 9 November 2026

The starter was mounted into a temporary local WordPress Playground using its CLI. The `Aurelia Concept` theme became active; the front page rendered a heading and returned HTTP 200; the theme stylesheet returned HTTP 200; and the WordPress theme-admin screen returned HTTP 200. The browser recorded no failed HTTP responses. Evidence is in [wordpress-playground-r09-1.json](../assets/screenshots/wordpress-playground-r09-1.json) and [the screenshot](../assets/screenshots/r09-1-wordpress-playground.jpg).

**What this proves:** the current theme source can be recognized, activated, and rendered in a local WordPress 7.1.4 / PHP 8.3 Playground session.

**What it does not prove:** installation on KD-8, a client host, or a production WordPress/MySQL stack; editor coverage for every block; persistence after the temporary Playground ends; or a live booking, CRM, product, or payment integration. An SSH attempt to the user-designated KD-8 alias was rejected with `Permission denied (publickey)`, so no server-side Docker test ran. No credential material was inspected.

## Recommended production structure

| Content | WordPress model | Editor |
|---|---|---|
| Treatments/procedures | Custom post type `treatment` with `treatment_category` taxonomy | Native editor plus approved custom fields |
| Price and duration | Structured fields attached to treatment | Required fields with currency and duration validation |
| Treatment details | Single `treatment` template | Shared design, editable body content |
| Main navigation/footer | Site Editor template parts | Site Editor |
| FAQ | FAQ block/pattern or structured post type if reused | Editor-managed content |
| Brand page and service intro | Page/template patterns | Block editor |

If the catalog only needs information and a request form, an inquiry workflow may be simpler than a cart. If the visitor must buy a defined product and pay online, use WooCommerce after confirming tax, stock/availability, returns, payment provider, notifications, and order ownership. Appointment scheduling is a separate problem; do not treat a product cart as a calendar.

## Four-language content

1. Confirm which language owns each source and who approves translations.
2. Choose a maintained multilingual plugin after checking its current license, WordPress version support, WooCommerce compatibility, and URL/SEO rules. Polylang and WPML are examples to evaluate, not dependencies in this starter.
3. Decide whether translations are separate linked entries or localized fields; define what happens when a service is unpublished in one language.
4. Localize menus, forms, validation, confirmation screens, legal notices, emails, currency, date, and decimal formats—not just headings.
5. Test a full visitor journey in every language, including an empty catalog and a booking error.

## Integration boundary and data flow

For a real booking or purchase, document the exact fields and destination before implementation. Collect only what the agreed flow requires. A typical booking handoff is:

`Visitor → consent and validated form → WordPress server → selected calendar or CRM API → status returned to visitor`

Use server-side credentials in environment configuration; never put CRM or payment keys in browser code. Confirm error handling, duplicate submissions, retention, access roles, and test/staging data with the clinic. Payment requires a separately approved provider and a server-side confirmation path. No integration is present in this sample.

## Delivery stages

1. Back up the existing site and create a staging copy.
2. Confirm theme, WordPress/PHP versions, catalog model, languages, booking/payment route, and plugin licenses.
3. Build and review the block theme and edit screens with sample data.
4. Connect one external service in test mode and verify success, errors, and duplicate submissions.
5. Import approved content, check every translation, and test keyboard/mobile flows.
6. Deploy through the client's normal release and backup procedure.

## Starter files

- `../wordpress-theme/aurelia/style.css` — theme header and authored base styles.
- `../wordpress-theme/aurelia/theme.json` — editor color and typography presets.
- `../wordpress-theme/aurelia/templates/front-page.html` — editable front-page block layout.
- `../wordpress-theme/aurelia/parts/` — header and footer template parts.
- `../wordpress-theme/aurelia/patterns/services.php` — reusable service-list pattern.
- `../wordpress-theme/aurelia/functions.php` — local stylesheet and pattern registration.

This starter uses no third-party plugin or external font request. It needs installation and compatibility testing in the client's actual WordPress environment before it can be called production-ready.
