# Verification record / 验证记录

Date: 2026-09-04

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
