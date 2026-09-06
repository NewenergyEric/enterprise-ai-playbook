# Verification record / 验证记录

Date: 2026-09-04

Update 2026-09-06: removed the visible generated-image caption from the Chinese and English homepage hero, and reclaimed its reserved spacing. The synthetic-sample boundary statement remains in the site footer.

Update 2026-09-06: added a separate bilingual Opportunity Atlas with 12 candidate directions across four business systems. The existing nine detailed plays, filters, deep links and artifacts remain unchanged.

## Passed / 已通过

- Production static build with Node 24.19.0: all seven content routes rendered, none skipped; bilingual 404 included.
- TypeScript project checks.
- Authored-source lint; generated shadcn library and unused hooks retain their upstream lint baseline, as documented in README.md.
- Nine Playbook entries, six process stages, Chinese/English field parity, English content checks, search and category-filter cases.
- Canonical URLs, language alternates and social-image URLs with a configured test origin; no fake production origin is embedded in the delivered build.
- Exported document language, page titles, social title metadata, one main heading per page and local resource-link existence.
- HTTP checks against the static preview: seven page routes, both pilot briefs, all four PDFs, social image, favicon and robots returned 200 with appropriate content types. An unknown page returned 404.
- All Chinese characters currently used in authored page/component/content sources are covered by the bundled font subset.
- Text-pattern checks across authored website assets and all four PDFs found no scoped confidential project/client identifiers or local reference paths. The PDFs contain no embedded URI annotations.

## Not represented as verified / 未冒充已验证的部分

- Follow-up browser checks now cover actual Chinese/English homepage CTA clicks, process language switching and narrow-screen navigation; these paths produced no browser errors or HTTP failures. A full accessibility audit remains a separate release step.
- No live customer workflow, AI execution, external integration or business ROI was tested by this marketing website build.
- A pattern scan is not a guarantee against every possible confidential detail. Publication still requires the owner's content review.
- No deployment was performed. Repository publication is handled separately from hosting.
- SITE_URL is unset in the delivered local build. Set the actual domain and rebuild before public release to generate canonical URLs, a sitemap and absolute social-image references.

The reference projects were used read-only. All authored website work is isolated in this repository.

## Preview 404 follow-up

The user's reported 404 did not reproduce in a fresh isolated Chromium session on the complete build: both Chinese and both English homepage CTAs worked. The original failing URL/browser state is still needed to attribute that report definitively.

A separate reproducible risk was identified in the preview server: reading build files directly while the exporter replaces its output can expose incomplete routes. The preview now retains the last complete in-memory snapshot and switches only after a finished build. The route, redirect and invalid-path behavior has regression coverage in scripts/test.mjs. This mitigation is not presented as proof of the original browser-specific cause.

A confirmed deep-link bug was also corrected: an initial hydration effect reset a requested scenario to the server's default. URL updates now happen only on explicit filter actions, and language links reflect the current fragment. Browser checks verified a non-default scenario on direct entry, after switching languages and after refresh. Continuous CTA clicks during a rebuild completed without HTTP failures.

## AIelsen brand update

- The owner explicitly authorized AIelsen branding. The existing public-portal symbol and wordmark treatment are reused before the FDE service label in a shared header/footer component. The reference project was read only; no reference-project files were changed.
- The favicon matches the existing AIelsen asset. Both languages now include AIelsen FDE in page titles and the social site name. Existing downloadable brochures and social-preview artwork are unchanged.
- Rebuilt all seven content routes; TypeScript, lint and regression tests passed, including branded titles and two accessible brand links per exported page.
- Isolated Chromium checks covered all six localized pages at 1440, 768, 375 and 320 pixels (24 layout checks). No horizontal overflow or brand/language overlap was observed; branding and language controls remain on one row. Brand links have a 44-pixel minimum height. Desktop, mobile and inverse footer treatments were inspected visually.
- Clicked all three header navigation links in both languages, both homepage CTAs in both languages, both footer brand links, the header brand links and the process-page language switch. All reached their expected local destinations; no JavaScript errors or HTTP failures were observed. Keyboard focus on the brand link and the updated favicon response were checked.
- This was a focused branding regression check, not a full accessibility or performance audit. No hosting deployment was performed.

## More opportunities update

- Reference project folders and the enterprise Skill library were reviewed read-only. Public copy contains no source paths, customer identities, credentials, private metrics or proprietary implementation details.
- Candidate entries are visibly labeled either as an anonymized project pattern or an adaptable enterprise Skill. The page also states that they are not out-of-the-box products and require data, permission, integration and business-acceptance scoping.
- Production build, TypeScript, lint and regression checks passed. Both exported Playbook pages contain exactly 12 candidate entries in addition to the nine detailed plays, and no removed homepage image caption.
- Browser checks covered the Opportunity Atlas at 1280×720, 768×900 and 375×812. The layout changed from three to two to one column without horizontal overflow; Chinese and English anchor navigation and language switching retained `#more`; browser console errors and warnings were zero.
- This was a focused feature and responsive-layout check, not a full accessibility or performance audit. Deployment remains separate from local verification.
