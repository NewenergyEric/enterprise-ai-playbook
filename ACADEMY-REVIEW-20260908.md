# Academy content, privacy and readability revision

This is an additive revision on `feat/fde-academy-20260908`. Do not replace the service-site root with the Academy export. Continue following [DEPLOY-ACADEMY.md](DEPLOY-ACADEMY.md) and publish only `dist/client`.

## Changes for the deployment Agent

- All 19 cases now have complete Chinese and English teaching analyses: problem/context, discovery, four-step action map, key decisions, synthetic worked example, three module-linked assignments, acceptance and reusable assets. Publicly reported actions and original FDE exercises are distinguished without making editorial caveats the lesson.
- Cases and modules link in both directions. Search indexes contain the expanded case text. Existing URLs remain valid.
- The sources route is now a four-stage reading guide with 22 resources, each tied to a question and module. Attribution policy remains in a compact disclosure.
- Case discussions in W01, W02, W04, W06, W07, W08, W09 and W10 were improved. All 100 expanded Chinese teaching sections, 24 bilingual boards and existing assignments remain.
- Resources, assessment and team-training pages now use learner-facing language and consistently describe the FDE audience.
- The footer search control has explicit navy text on white, visible hover/focus states and a minimum 44px height. Its stylesheet is loaded by every Academy shell, including the error page.
- The brochure keeps 12 pages; pages 8–9 now explain case actions and concrete exercise outputs. Cards link to the relevant Academy case pages. Other pages and the practice archive are unchanged.

## Privacy review

Scope: the public Academy export, including HTML, downloaded Markdown, scripts, search JSON, SVGs, PDF text/metadata/links and the practice ZIP. Private reference projects were not accessed or changed for this revision.

- Pattern scan: 195 text assets, one 12-page PDF and one ZIP containing 16 members; no flagged values after the revision.
- A targeted identity/source-origin check found no private customer identifiers, private workspace paths or source-attachment references in the exported site. Public company names remain only as cited case subjects.
- Removed internal curriculum-processing descriptions from the reading page and lecture. No source screenshot, research working folder or internal project file is shipped.
- No new tracker, external API call, learner account, upload flow or data-collection endpoint was added. Search is local; progress and notes remain in browser storage. Exported notes can contain what a learner enters, so sharing and shared-device use still require care. Hosting access logs are outside this source review.

This is a scoped release review, not a claim of formal privacy certification or a guarantee against all re-identification risk. Future contributors must retain synthetic examples and source separation.

## Verification completed locally

- Root `npm run check`, `SITE_URL=https://fde.aielsen.com npm run build`, then `npm test` passed.
- Academy: 14 test groups; 84 standalone HTML files and 4,169 internal links/assets/anchors.
- Combined export: 98 HTML files, 90 public entry routes and 4,713 local links/assets/anchors. The existing service site's nine plays, 66 per-play applications and six stages still pass regression checks.
- Live local preview: 95 HTTP paths, slash normalization and true service/Academy 404 responses passed.
- Structural audit: 82 content pages, no heading/label/landmark issues.
- Offline practice kit: 37 Python tests passed; its source and downloadable ZIP were not modified.
- Browser: 375px, 768px and desktop layouts checked in Chinese and English; no horizontal page overflow on sampled case and reading pages. Footer text is `rgb(0,31,63)` on white, contrast about 16.56:1. Search opens and returns prefixed results; the contextual teaching board opens at its correct `/academy/assets/boards/...` URL.
- Brochure pages 8–9 rendered and visually inspected; no clipped text or overlapping cards. PDF-aware privacy scan passed again after regeneration.

## Deployment acceptance

1. Fetch the feature branch and review its latest commit. Preserve any deployment Agent changes; do not force-push or blindly reset.
2. Use Node 24.19+ and `npm ci`. Set `SITE_URL=https://fde.aielsen.com` (origin only).
3. Run root checks/build/tests and publish `dist/client` through the existing deployment mechanism. This revision does not change DNS, merge `main` or deploy production itself.
4. Refresh/revalidate unversioned Academy HTML, CSS, search JSON and the brochure so cached pages do not retain old content. Do not configure a wildcard SPA fallback.
5. Check these paths in both languages:
   - `/academy/zh/cases/`
   - `/academy/zh/cases/morgan/#solution`
   - `/academy/zh/cases/field-store-operations/#worked`
   - `/academy/zh/curriculum/07/`
   - `/academy/zh/sources/`
   - `/academy/zh/resources/`
   - `/academy/downloads/AIelsen-FDE-Academy-Brochure.pdf`
6. Check the footer search button, filter/search results, case-to-module links, board modal and actual 404 behavior. Confirm `/zh/`, `/en/`, process pages and per-play More sections are unchanged.

Optional PDF-aware audit commands and authoring dependencies are documented in [academy/README.md](academy/README.md). Python and font files are not needed by the production build.
