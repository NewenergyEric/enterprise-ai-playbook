# Single-branch consolidation review — 2026-10-10

The owner requested one public maintained branch and explicitly selected the complete service/Academy/case site **with** the existing Toolkit request form. This is a repository update, not a production release or permission to expose private Toolkit contents.

## History and content

- The former `main`, Academy and Agent-case heads are preserved as ancestors through ordinary merge commits. No history rewrite or force push is used.
- The nine plays, 66 contextual applications, 12-week Academy and nine bilingual Agent cases are preserved. Course and case source is unchanged apart from the Academy's reader-facing README.
- The existing hardened request UI, URL validation and tests are integrated, not replaced by an unreviewed receiver. Both endpoint and privacy notice remain unconfigured and collection is disabled.
- Shared service navigation retains Academy, Agent cases and Toolkit. Narrow layouts were corrected for the combined six-item navigation.
- Public README pages lead with the website and expand the FDE workflow, weekly decisions, artifacts, role-specific learning and practice boundaries. Technical hosting instructions remain separate.

## Local verification

| Check | Result |
| --- | --- |
| `security:check` | Publication checks plus audit-policy and endpoint configuration tests passed |
| `build`, `check`, `test` | Passed; 112 unique entry routes, 122 generated HTML documents |
| Academy integrated links | 5,914 local references, both search indexes and downloads checked |
| Agent case integration | 20 bilingual pages, 18 workbooks, 1,058 references checked |
| HTTP regression | 117 service/Academy URLs; 109 case/service resources; negative routes and redirects checked |
| Python practice | 37 offline tests passed |
| Academy publication scan | 195 text files, 12 PDF pages and 17 ZIP members; no pattern findings |
| Repository reader guides | Nine documents and 74 local references checked; website-first CTA and all 12 weekly entrances verified |
| Browser spot checks | Both request-page languages; disabled submission; 375px navigation overflow corrected |
| Dependency audit | Existing `GHSA-vfj7-8cjw-p6xm` exception unchanged: one advisory, six affected entries; expires 2026-10-24 |

These are scoped checks, not a security certification. The contact receiver, private Toolkit, hosting infrastructure and live production deployment remain outside this change. See the [publication review](PUBLICATION-REVIEW-2026-10-10.md) for historical binary/history checks and asset authorization limits. Current CI must be read from the exact commit's Actions results, not inferred from this local record.

## Branch maintenance policy

`main` is the only long-lived branch. Retired feature refs can be removed after verifying ancestry and current CI. The 21 ordinary Dependabot proposals are not silently merged: close them as deferred maintenance and retain their PR records. A verified local Git bundle and ref inventory preserve the pre-consolidation state without adding public archive branches.

The owner chose to **keep automated security fixes**. Vulnerability alerts, secret scanning, push protection, CodeQL and the scheduled dependency audit remain enabled. Ordinary version-update PR creation is paused. Future security updates may create a temporary branch; review, test, merge and remove it. Main's deletion and non-fast-forward protection remain in place.
