# Static build and hosting contract / 静态构建与托管契约

This is maintainer documentation. Readers should start with the [guide](README.md) and [FDE Academy](docs/FDE-ACADEMY.md).

`main` is the only maintained branch and contains all four areas: business workflows/Playbook, Academy, Agent cases and the optional Toolkit request UI. Older branch-specific instructions are superseded. Production or commercial use needs the rights described in [LICENSING.md](LICENSING.md); a GitHub update is not production deployment authorization.

## Build a complete release

Use Node 24 LTS, the committed lockfile, and a clean or otherwise safely isolated checkout. Do not reset unrelated work.

```sh
git clone https://github.com/NewenergyEric/enterprise-ai-playbook.git
cd enterprise-ai-playbook
npm ci --ignore-scripts
npm run security:check
npm run security:audit
npm run check
npm run build
npm test
npm run preview
```

For an authorized release, set `SITE_URL` to the real HTTPS origin before building. It must have no path: the assembler adds `/academy/` and `/agent-cases/`. Without a configured origin, local preview still works and does not invent a production sitemap. On PowerShell use `$env:SITE_URL='https://your-approved-origin.example'`; on POSIX shells use `export SITE_URL=https://your-approved-origin.example`.

Check `dist/client/build-info.json`:

| Area | Entries |
| --- | ---: |
| Service pages, root and two request pages | 9 |
| Academy, including its language entry | 83 |
| Agent cases, both languages | 20 |
| **Unique entry routes** | **112** |

The full build runs services → Academy → Agent cases → sitemap → readiness marker. A first check may skip absent generated files; the post-build `npm test` is mandatory. Do not suppress nonzero exits. The validated Windows runtime is Node 24.19.0; avoid the older 24.13.0 native shutdown issue.

## Optional contact collection: separate approval required

Both `TOOLKIT_LEAD_ENDPOINT` and `TOOLKIT_PRIVACY_URL` must be valid public HTTPS URLs and approved for collection. Leave them unset for ordinary study or review; the request pages remain visible but cannot submit.

The static UI is **not** a receiving service, CRM, payment system or private Toolkit download. Configuration is embedded in public output, so it must never contain tokens, credentials, signed query strings or private routing data. Read [the receiver contract](docs/TOOLKIT-LEAD-ENDPOINT.md); review server-side validation, rate limits, consent, retention and deletion before enabling collection. No endpoint or privacy notice has been created by this integration.

## Static host requirements

- Publish only the complete `dist/client/` through an authorized atomic release/rollback mechanism.
- Never publish source, `dist/server/`, `.git`, `.env`, logs or standalone module outputs.
- Serve directory paths through `index.html`; preserve queries on trailing-slash redirects.
- Unknown service, Academy and case paths must return HTTP 404. Do not use a wildcard SPA-homepage fallback.
- Preserve MIME types for HTML, JS, CSS, SVG, WebP, WOFF2, Markdown, ZIP and PDF; use `text/x-component` for `.rsc` if needed.
- Keep long immutable caching limited to hashed assets. HTML and unversioned course assets need revalidation. Translate `public/_headers` into equivalent host settings where necessary.
- Preview binds loopback by default and is not an internet-facing production server. Do not expose Vite or Vinext development servers.
- Retain static directory mirrors: the pinned exporter requests bare paths during prerender, while public links use trailing slashes.

## Acceptance checklist

| Check | Expected result |
| --- | --- |
| Service / process / Playbook, both languages | Original CTAs, nine plays, 66 More applications, filters and language/hash behavior preserved |
| Academy | 12 weeks, course deep links, search, 24 boards, zoom/Escape/focus return, labs and downloads work |
| Agent cases | Nine cases in both languages, comparisons, diagrams, worksheets and related links remain present |
| Toolkit request pages | Both languages and the six-item service navigation are present; missing configuration visibly disables submission |
| Configured form, when separately authorized | Use synthetic contacts and a local mock; test consent, missing fields, errors, timeouts and explicit acknowledgement |
| Sitemap and metadata | Approved origin, prefixed paths, matching canonical/hreflang, no localhost in release metadata |
| Unknown or private paths | Real HTTP 404, including missing Academy/case paths, `.env` and module source files |
| Desktop, tablet, phone and keyboard | No whole-page overflow, readable buttons, visible focus and usable navigation |

For local HTTP regression, set `TEST_BASE_URL` to the loopback preview origin and run `npm test` again.

CI validates and uploads `fde-static-site`; it does not deploy production. Record the exact commit, CI, build, browser checks and rollback artifact. An external deployment system must be separately pointed at the reviewed `main` version by its operator.

## Security

Read [SECURITY.md](SECURITY.md) and the [dated publication review](docs/security/PUBLICATION-REVIEW-2026-10-10.md). The time-limited build-dependency exception remains in force until its stated expiry; it is not a fix or a safety guarantee. Re-run the audit before release and do not use `npm audit fix --force` to bypass it.
