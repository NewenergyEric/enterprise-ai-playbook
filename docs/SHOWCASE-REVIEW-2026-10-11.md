# Repository presentation review · 2026-10-11

Reviewed against `main` at `f10c5b0a90c7098296609e84fc8e220fae3a8f9e`. The checkout was clean before this work. Scope: repository presentation, bilingual metadata, a GitHub footer entrance and publication drafts. This is not a production deployment.

## Changes

- English is the default [README](../README.md); [简体中文](../README.zh-CN.md) retains the full Chinese guide. `README.en.md` remains an identical English compatibility copy, including the old section anchors, enforced by the showcase check.
- The website remains the first prominent call to action. The opening explains Eric's editorial purpose without invented professional history, gives learning/application paths, and makes the learning/evaluation license explicit before the hero.
- Existing workflow, Academy and Agent-case README sections were compared with the previous revision and preserved verbatim. Course content, cases, diagrams, practice code, Toolkit behavior, root LICENSE, lockfile and security exception are unchanged.
- Source metadata now names the enterprise workflow and FDE Academy clearly. Academy pages have localized titles/descriptions, `x-default`, locale and social-image metadata. Agent cases use the existing public social image. All internal/canonical/sitemap URLs remain free of UTM parameters.
- Service and Academy footers link to this public repository. These website changes are in source and the local export; they require a separately authorized production deployment.
- GitHub About/topics were updated and read back. The homepage remains `https://fde.aielsen.com/`. `ai-workflows` replaces `non-commercial` to avoid reducing the corporate internal-learning grant to a misleading label.
- [Channel copy, release/discussion drafts and profile suggestions](../marketing/campaigns/enterprise-ai-playbook-20261011/README.md) are supplied. No tag, Release, Discussion, independent profile change or external post was created. HN's current rules require the author to write the actual submission, so its section provides verified preparation material.

## Validation

Node 24.19.0 and the committed lockfile were used. `npm ci --ignore-scripts` did not change dependency versions. Failed checks were corrected and rerun before this record was finalized.

| Check | Result |
| --- | --- |
| `npm run security:check` | Publication-boundary checks and all 14 audit-policy/endpoint tests passed |
| `npm run security:audit` | Known advisory remains: six affected entries, no additional advisory reported; scoped exception unchanged |
| `npm run check` | Typecheck, lint and tests passed; 16 pre-existing anonymous-export lint warnings remain in case content |
| `npm run build` and post-build `npm test` | Passed: 112 entries, 122 generated HTML documents; 9 plays, 66 scenarios, 12 weeks and 9 Agent cases preserved |
| Academy/case references | 5,915 integrated Academy/local references and 1,058 case references checked; search indexes, downloads and 18 case workbooks passed |
| `node docs/studio/check-showcase.mjs` | English default, Chinese edition, compatibility copy, website-first CTA, 12 weekly entrances, local links and usage boundaries passed; GIF binary timing was not rechecked because media are unchanged |
| `SITE_URL=https://fde.aielsen.com node scripts/check-presentation-seo.mjs` after build | All 110 content pages: title, description, OG fields, locale, image, canonical, reciprocal language alternates, sitemap and robots passed; two language-entry redirects bring the total to 112 |
| Loopback HTTP regression | 117 service/Academy URLs and 109 case/service resources passed, including negative routes, slash redirects and query retention |
| Browser spot checks | 1280px desktop and 375px phone; service/Academy GitHub footer links readable; no page overflow on checked views; Chinese search → W08 deep link, diagram zoom, Escape/focus return, English course switch and More tab passed |
| Toolkit | Both language submit buttons disabled; no endpoint, privacy URL or private package added |
| Copy | Four X posts checked at 214/261/193/191 weighted characters including a shortened URL; Chinese punctuation, factual counts and bilingual boundaries checked |

CI must be checked on the delivered commit through [GitHub Actions](https://github.com/NewenergyEric/enterprise-ai-playbook/actions); these local results do not assert the outcome of a later run. The build workflow now includes the assembled SEO check. The security workflow and dependency policy are unchanged.

## Production snapshot, before deployment

Read-only checks on 2026-10-11 fetched all **108 content URLs** in the live sitemap: six service pages, 82 Academy pages and 20 Agent-case pages. All returned HTTP 200 with titles, descriptions, OG titles/descriptions, canonical and Chinese/English alternates. The live robots file points to the production sitemap.

The existing live artifact lacks social images on 102 Academy/case pages and `x-default` on 82 Academy pages. The source changes above address those metadata gaps in the verified local export. The live `/zh/toolkit/` and `/en/toolkit/` paths return 404 and are absent from that live sitemap, while current `main` and its complete local export contain both. Do not infer that a GitHub push has deployed either the metadata updates or the integrated request pages.

## Security and permission boundaries

[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) remains open for `braces@3.0.3`; the upstream advisory still lists no patched version at this review. The [build-only exception](security/dependency-exceptions.json) still expires **2026-10-24**. This is a mitigation record, not a vulnerability fix or zero-risk claim.

Authenticated repository checks confirmed automated security fixes enabled and unpaused, vulnerability alerts enabled, secret scanning and push protection enabled. The main-history ruleset remains active. CodeQL remains in the unchanged security workflow. No security setting was weakened.

No production deployment, DNS/hosting change, contact receiver, privacy service or collection activation was authorized or performed. No third-party asset rights were broadened. The original [LICENSE](../LICENSE), [commercial boundary](../COMMERCIAL.md) and [third-party notices](../THIRD_PARTY_NOTICES.md) continue to govern.
