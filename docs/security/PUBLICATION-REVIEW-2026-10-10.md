# Publication security review — 2026-10-10

## Decision and scope

**Source-available learning/evaluation release, not a production security certification.** Repository publication does not authorize commercial reuse and does not deploy the hosted site. This review covers the service site, Academy, Agent cases, repository metadata/history, downloadable materials and the optional lead-form source added during the review. It does not cover the independently maintained private Toolkit or the lead receiver/CRM/hosting infrastructure.

Baseline heads: `main` at `05781e8`; Academy initially `6de03f1`, then concurrent `48baca1`; Agent cases `0846ea2`. Security changes are applied independently to these branches, preserving their application boundaries. No force push, history rewrite, unrelated checkout reset, domain change or production release is part of this work.

## Findings and treatment

| Area | Evidence and action | Residual boundary |
| --- | --- | --- |
| Dependencies | Initial npm audit: 28 affected entries (3 critical, 19 high, 5 moderate, 1 low). Updated React/RSC to 19.2.8, Vinext to 1.1.0, Vite to 8.3.4, RSC plugin and formatter; patched fflate to 0.7.5 and refreshed compatible transitive packages. Removed unused Cloudflare deploy tooling and the shadcn generation CLI; retained its identical MIT CSS locally. | 6 high entries remain, all caused by one upstream-unpatched braces advisory. See below; this is not a zero-advisory release. |
| Build compatibility | Explicitly declared `ipaddr.js@2.5.0`, used by the updated framework's prerendered image module, rather than relying on accidental dependency hoisting. | Rebuild and test from the committed lockfile. Never serve generated Node server output. |
| Secrets and history | Gitleaks 8.30.1, checksum verified, scans full reachable Git history with full redaction and no text-conversion hooks. Initial baseline: 16 commits and 411 distinct blobs. Supplemental scan covers the concurrent Academy change and final commits. | Pattern scanning does not establish absence of all secrets; no discovered credentials were tested against external systems. |
| Downloadable/binary material | Initial unique-object pass: 384 text versions (including ZIP text), 6 PDF versions / 92 pages including metadata and links, 1 ZIP / 16 members, 33 image versions' metadata; remaining binaries were font subsets. No extraction errors. Added LICENSE to the regenerated practice ZIP. | Image review was sampled, not exhaustive OCR. Public film/product assets can identify their source. |
| Privacy findings | One scanner-rule example matched its own private-thread pattern; reviewed as a false positive. Historical private Toolkit repository links are references, not credentials or access grants; public README no longer advertises private downloads. No confirmed private customer name, personal contact or local workspace path was found in the scanned project content. | The owner explicitly confirmed that retained Bella/Iris assets may be published in the repository and accepted possible source re-identification. Their third-party reuse rights remain excluded. |
| Actions and release surfaces | Reviewed available historical Actions logs; tokens were masked. No releases, release assets, PR/issue conversations, active artifacts or webhooks were present at the initial inventory. | GitHub settings and later logs can change. Hosting secrets, deployment logs and unrelated repositories are outside scope. |
| Workflow trust | Added full-history secret scanning, dependency-policy tests and CodeQL configuration; actions pinned to verified full commit IDs, read-only tokens by default, checkout credentials not persisted, job time limits, no privileged PR trigger. | CodeQL requires the public-repository feature or an appropriate private plan. Configuration is not evidence that the first scan completed; check Actions/Security. |
| License | Added explicit learning/evaluation license, Chinese usage guide, commercial-request process, contribution terms and third-party notices; builds carry dependency attribution. | Custom restrictive license, not OSI open source. No legal enforceability warranty; commercial agreements merit qualified counsel. |
| Optional lead collection | The concurrent Academy form is kept. Added build-side configuration filtering before serialization, mandatory privacy-notice configuration, no credentialed URLs/query tokens, production loopback rejection, omitted cookies, no redirects, timeout and explicit JSON acknowledgement. | Receiver is not in this repo and has not been audited. Collection remains disabled without valid configuration. Real operation requires retention/deletion, validation, consent, rate limits and separate owner approval. |

## Remaining dependency advisory — not hidden or marked fixed

[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) affects `braces@3.0.3`. As of this review, the upstream advisory reports no patched release. The dependency path is:

`vinext → vite-plugin-commonjs → vite-plugin-dynamic-import → fast-glob → micromatch → braces`

Deeply nested attacker-controlled brace patterns can exhaust the Node call stack. This project uses that path to analyze build-time source import patterns, not browser form values, visitor queries or public runtime requests. Only static `dist/client/` is supported for hosting. A local build of hostile source can still fail; unreviewed PRs must run on isolated, unprivileged runners without secrets. Local dev servers must remain on loopback.

The [exception](dependency-exceptions.json) is limited to this exact advisory, package version and dependency chain and **expires 2026-10-24**. A new advisory, changed root version or expired review fails `npm run security:audit`. Tests verify failure behavior. This is a documented contextual mitigation, not a vulnerability fix. Do not run `npm audit fix --force`: its proposed rollback to obsolete Vinext would discard relevant fixes and compatibility.

GitHub labels this dependency as `runtime` because Vinext is declared in npm's `dependencies`. The narrower exposure assessment above comes from inspecting the build-plugin call path and the supported static-only deployment, not from relabeling the advisory. The Dependabot alert remains open.

The prior [RSC denial-of-service advisory](https://github.com/advisories/GHSA-wx67-qw84-cm4g) is addressed by 19.2.8. That server-endpoint attack path does not exist in a correctly deployed static export, but patched development/build dependencies are still required.

## Verified publication state — 2026-10-10

The renamed [enterprise-ai-playbook repository](https://github.com/NewenergyEric/enterprise-ai-playbook) is **public**. The old repository URL redirects; the production website, DNS and deployment configuration were not changed. The following are executable-source checkpoints verified before the final documentation/showcase-check follow-up:

| Maintained branch | Audited checkpoint | Build / regression CI | Security CI including CodeQL | Public entry routes |
| --- | --- | --- | --- | --- |
| `main` | `b9d3743` | [Passed](https://github.com/NewenergyEric/enterprise-ai-playbook/actions/runs/38038203317) | [Passed](https://github.com/NewenergyEric/enterprise-ai-playbook/actions/runs/38038203335) | 7 |
| `feat/fde-academy-20260908` | `d1fcfb9` | [Passed](https://github.com/NewenergyEric/enterprise-ai-playbook/actions/runs/38038203410) | [Passed](https://github.com/NewenergyEric/enterprise-ai-playbook/actions/runs/38038203350) | 92 |
| `feat/agent-cases-20260910` | `76de3c7` | [Passed](https://github.com/NewenergyEric/enterprise-ai-playbook/actions/runs/38038230573) | [Passed](https://github.com/NewenergyEric/enterprise-ai-playbook/actions/runs/38038230512) | 110 |

CodeQL's JavaScript/TypeScript and Python analyses at these checkpoints returned zero findings, with no analysis errors or warnings. Branch-specific open-alert queries were also empty. The first public scan had flagged `js/incomplete-multi-character-sanitization` in Academy's font-text collection: deleting tags with an empty replacement could join fragments. That output was a local font-character file, not a browser HTML sink; search results use DOM text properties. The implementation now preserves boundaries with spaces, documents that text extraction is **not** sanitization, and tests nested fragments and multilingual word boundaries. Both feature-branch rescans returned zero findings; the finding was not manually dismissed to obtain a green result.

The final full-history snapshot fetched remote branches, including Dependabot proposals: **44 commits; 517 distinct blobs; 506 text versions including archive text; 6 PDF versions / 92 pages; 2 ZIP versions / 33 members; 33 image-metadata versions; 3 font binaries**. Gitleaks reported no secrets; the content audit had zero extraction errors. The only supplemental pattern categories were the known private-Toolkit repository references and a privacy scanner matching its own thread-URL rule. Eight historical Actions logs were separately scanned with no secret matches. This does not turn pattern matching or sampled image review into an exhaustive privacy guarantee.

Confirmed through GitHub's API:

- Private vulnerability reporting, Dependabot alerts/security updates, secret scanning and secret push protection are enabled. No open secret-scanning alerts were returned at verification.
- Default Actions token permissions are read-only; Actions cannot approve pull requests. Workflow actions are commit-pinned and PR jobs have no production secrets.
- An active ruleset blocks deletion and non-fast-forward updates for all three maintained branches. It does **not** require every change to pass a mandatory PR/status gate; authorized fast-forward pushes remain possible.
- Advanced non-provider secret patterns and validity checks were **not** enabled. Asset-rights verification, credential validity and hosting penetration tests were not performed.
- Dependabot's generated update PRs are proposals, not approved releases. None were automatically merged in this review; each needs compatibility and security review before adoption.

For the next Agent: fetch the renamed remote and inspect the intended branch before working. Do not deploy `main` as if it contained the full Academy/cases release. The Academy branch retains its independently approved lead form, disabled unless both receiver and privacy-notice URLs are valid; the complete Agent-cases branch intentionally has no Toolkit entry. Do not merge that policy difference implicitly. Keep the reviewed asset boundary, obtain production authority separately, and revisit the remaining dependency advisory no later than **2026-10-24**.

## Reproduce the checks

```sh
npm ci --ignore-scripts
npm run security:check
npm run security:audit
npm run check
npm run build
npm test
```

Use Node 24.19+ and set `SITE_URL` for the intended hostname. For a branch containing Academy, additionally run the standard-library Python practice tests and the read-only public-export PDF/ZIP privacy check in `academy/scripts/audit-release-privacy.py`. Scan Git history separately with Gitleaks; the source check alone does not scan binaries or previous commits. Avoid uploading raw scanner output publicly.

## Release and operator boundary

Repository rename: `FDE-web` → `enterprise-ai-playbook`. Update clones with `git remote set-url origin https://github.com/NewenergyEric/enterprise-ai-playbook.git`. Do not recreate the old repository name: that can invalidate GitHub redirects. No change to `fde.aielsen.com` or its deployment branch is implied.

Before switching visibility, review all branch heads and any concurrent additions again, verify CI, confirm the owner-approved asset boundary, and verify there are no unresolved secret/privacy blockers. After switching, verify private vulnerability reporting, Dependabot and secret-protection availability in GitHub settings; features requiring additional token scopes must not be falsely reported as enabled. Public forks/copies cannot be recalled by changing the repository back to private.

This is an AI-assisted, evidence-based repository review, not an independent penetration test, exhaustive manual source review, rights audit or legal opinion. Production infrastructure, live TLS/headers, endpoint ownership, data retention, reverse-image search and unpublished external state have not been certified. Remaining uncertainty is intentional and must be part of a deployment handoff.
