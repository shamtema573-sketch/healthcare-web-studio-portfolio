# Medical website reference research

**Observed:** 8 November 2026  
**Method:** live homepage content/navigation fetch. Notes below distinguish observed information architecture from design interpretation. This pass did not establish exact hex values, font files, mobile breakpoint behavior, or full booking functionality; those require visual/browser checks and are not asserted here.

## Russia

| Site | What is visible in the live homepage | Useful pattern for this portfolio | Limit / detail to verify |
|---|---|---|---|
| [Dental Fantasy](https://www.dentalfantasy.ru/) | Pediatric dentistry; search; prominent booking action; grouped service navigation for prevention, treatment, orthodontics, anesthesia/adaptation, and surgery. | Make service discovery understandable before long explanations; provide clear parent-facing next step. | Desktop color/type and mobile menu not recorded in the text fetch. Use child-friendly tone without copying brand style. |
| [Dentol](https://www.dentol.ru/) | Moscow dental network; clinic finder, phone, personal account, and a broad service/price index with popular categories. | A dense catalog benefits from category labels, search, and price access close to the service list. | Network-scale navigation can overwhelm a small clinic; do not duplicate its catalog density. |
| [Dental Belgravia](https://belgraviadent.ru/) | Premium dental network; service groups include digital dentistry, diagnosis, therapy, surgery, prosthetics, orthodontics, preventive care, and online services. | Put service families and the route to treatment planning in a clear hierarchy; keep the premium visual layer quiet. | Page is very long and service-rich; avoid copying the layout or implied trust claims. |
| [SM Clinic](https://www.smclinic.ru/) | Multidisciplinary clinic; doctor, service, diagnostics, lab, patient, contact, and language navigation; online appointment and search; linked imaging and analysis paths. | Search and category navigation help visitors orient in a broad catalog; separate doctor lookup from service lookup. | Large network functions need not be simulated in a small demo. Confirm responsive navigation in browser. |
| [MEDSI](https://medsi.ru/) | Region selection, online appointment, phone, RU/EN control, service/doctor/clinic navigation, and routes to labs, check-ups, and pediatric care. | Location is an early decision in multi-branch care; language and appointment actions should stay findable. | The demo has one fictional location only; do not imply a real provider directory. |
| [KDL](https://kdl.ru/) | Lab ordering journey starts with city selection, addresses/results, basket, and a search field for tests. | Fast search and a visible basket make a diagnostic catalog easier to use; the next step should be explicit. | Reuse only the interaction idea; the demo must not display or return medical results. |

## International

| Site | What is visible in the live homepage | Useful pattern for this portfolio | Limit / detail to verify |
|---|---|---|---|
| [One Medical](https://www.onemedical.com/) | Primary care with office and virtual visits; navigation separates locations, user groups, business, providers, services, and resource center; appointment CTA. | Route users by the kind of care or audience they need, then present a direct appointment action. | Membership and Amazon-linked service details are provider-specific and not copied. |
| [Mayo Clinic](https://www.mayoclinic.org/) | Navigation separates care, appointment requests, doctors, locations, patient services, billing, departments, health library, and professional resources. | Strong information architecture serves visitors, patients, and professionals without pretending every visitor has the same task. | Dense institutional navigation is too broad for a small clinic demo; exact visual properties require screenshot inspection. |
| [Cleveland Clinic](https://my.clevelandclinic.org/) | Location choices and visible routes to providers, directions, services, patient information, and health library. | Keep provider search, directions, and patient help distinct; give the main navigation predictable language. | Large service scope should not be reproduced as fake data. |
| [Zocdoc](https://www.zocdoc.com/) | Doctor-discovery marketplace; specialty navigation, booking proposition, sign-in, provider onboarding, and clearly separated consumer/provider paths. | Filters and specialty search can be the first useful action; marketplace trust signals should be explicit and sourced. | Verified reviews are real platform data and must not be fabricated in the demos. |
| [Hospital for Special Surgery](https://www.hss.edu/) | Orthopedic specialty institution; doctor search, locations, patient care, health library, research/education, phone, and appointment CTA. | A specialty clinic can make its focus clear while keeping appointment and provider lookup near the top. | Do not borrow rankings, awards, patient stories, or clinical claims. |
| [Physio.co.uk](https://www.physio.co.uk/) | Physiotherapy navigation groups about, services, treatments, clinics, and booking; “Book Now” is repeated near the primary paths. | Use plain treatment/service labels and keep booking visible through the discovery flow. | The page includes provider-specific credentials and geographic claims; not relevant to the fictional concept. |

## Cross-reference decisions

1. Make Aurelia's catalog filter and local basket easier to scan than a long, unfiltered price list.
2. Use a single, visible primary action per site; provide secondary paths through service discovery rather than repeating competing booking buttons.
3. Keep search useful for real sample data. Empty results need a clear reset action.
4. Treat doctor profiles, locations, prices, results, reviews, and credentials as sourced data in a real build; use an explicit demo marker in this portfolio.
5. Keep appointment and cart demonstrations local. A static prototype must say when nothing was sent.
6. Use region/language selection only where the product supports it. Do not imply a real directory or backend.

## Sources inspected

The six Russian and six international links above were fetched from their own live homepages. Extracted navigation and service details are observations. The interaction and design recommendations are analysis, not claims about the providers' internal systems.

