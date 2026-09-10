# Agent cases integration · 2026-09-10

This release adds a bilingual **Agent 案例 / Agent Cases** navigation entry and an independently maintained case module. It retains the complete Academy branch (`6de03f1`), the service content, 9 Playbook scenarios and 66 contextual applications. It does not publish production or change DNS.

## Scope

- Source: `agent-cases/`; Chinese entry `/agent-cases/`, English entry `/agent-cases/en/`.
- Shared output: `dist/client/`; 110 entry routes across services, Academy and cases.
- 20 case pages, 18 workbooks, 28 localized SVG diagrams; white/navy/teal theme retained.
- 4 Playbook mappings provide 5 related case links: Oliva, Ruby, Bella, Velia and Steve.
- 16 case content modules compare equal to the reviewed handoff; all 37 reference files are byte-identical. Builder-only lint compatibility changes do not alter the published narrative or comparison images.
- Source files, original inputs, private records, generated sites and dependencies are not copied into the public deployment.

## Local verification

Node 24.19.0, existing committed lockfile, no new external dependency.

- `npm ci` completed; `npm run check`, `npm run build` and post-build `npm test` passed.
- Type checking and lint have no errors. The imported data-only modules retain 16 non-blocking anonymous-default-export style warnings.
- Existing service checks: 9 plays, 66 applications, 6 stages, nested search, filters, routes, downloads and metadata passed.
- Academy source: all 14 groups passed, including curriculum, 24 teaching boards, exercises, content privacy and downloads.
- Combined export: 118 HTML documents (including mirrors and error pages), 5717 local references, 110 entry routes, both search indexes and service returns passed.
- Agent integration: 20 bilingual routes, 18 workbooks, 1058 references, canonical/hreflang and 10 negative routes passed.
- HTTP: 115 service/Academy URLs plus 109 case/service resources, true 404s and query-preserving directory redirects passed. These test sets overlap; they are not a count of unique public pages.
- Development middleware: sampled Chinese/English entries, CSS, workbook download, directory redirect and source-denying 404s passed. Complete release acceptance uses the static preview, not the development server.

## Browser review

- 13 representative routes at 375 / 768 / 1440 widths: 39 checks; no full-page horizontal overflow, one H1 per page, no broken already-loaded images.
- All five service navigation entries remain visible and have at least 44px height. Academy's existing collapsed navigation at smaller widths remains separate and unchanged.
- Visually reviewed main navigation, desktop/tablet service entry and phone navigation. Existing case artwork and content are unchanged.
- Clicked Chinese and English service navigation into their corresponding case indexes; confirmed nine cases per language.
- Clicked the service-return link from the English case index: it stays in the current tab and returns to this host's `/en/`.
- Clicked Playbook support → Oliva and creator partnerships → Ruby; checked the existing More panel still opens and service language switching preserves `#frontline-support` with the English related case link.
- Keyboard navigation retains a visible electric-blue focus outline.
- This is focused integration regression, not a complete axe/WCAG, Core Web Vitals or new audit of the underlying commercial projects.

## Known dependency maintenance

`npm audit` on the full existing dependency tree reported 17 advisories (9 high, 7 moderate, 1 low). No lockfile or dependency versions changed; no force-fix was run. The static deployment has no Node/RSC service, but development and build dependencies still require separate security maintenance. Do not expose development servers or deploy `dist/server`. Details and deployment boundaries are in `DEPLOY-AGENT-CASES.md`.

## GitHub and production

The delivery branch is `feat/agent-cases-20260910`. Use its actual CI run and commit when handing off; this local report does not assert remote CI success or production deployment. The workflow builds and uploads the complete static export only. Follow `DEPLOY-AGENT-CASES.md` for the authorized deployment and rollback procedure.
