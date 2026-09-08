# AIelsen FDE Academy

The maintained learning-site source for this repository. It is an addition to the FDE service site, not a replacement. The root build publishes it at `/academy/zh/` and `/academy/en/` without mixing its CSS or runtime with the service application.

## Content and boundaries

- 12 weekly modules; 100 expanded Chinese lecture sections. English module pages contain overviews and workshops, with a clearly labeled link to the detailed Chinese notes.
- 24 bilingual visual teaching boards, four phase illustrations, 9 public cases + 10 synthetic field exercises, 30 concepts and 22 primary references.
- Every case has a bilingual problem brief, discovery steps, four-step delivery map, two key decisions, a worked example, three module-linked assignments, acceptance and reusable assets. Reported public context is separated from original FDE teaching exercises.
- 16 worksheets per language, a Python practice kit, six deterministic browser labs, and a 12-page marketing brochure.
- No LMS, account, automatic grading service, live AI endpoint, formal accreditation or performance guarantee. Notes and progress remain in the current browser; the new public origin does not automatically migrate localhost progress.
- Exercises are synthetic; public company references do not imply partnerships. Do not add source screenshots, private research, customer data or credentials.

## Maintain

| Concern | Source |
| --- | --- |
| Detailed Chinese lectures | `content/notes/01.md` through `12.md` |
| Course metadata / practice | `content/course.mjs`, `content/workshops.mjs`, `content/curriculum.mjs` |
| Case index / public context | `content/cases.mjs`, `content/sources.mjs` |
| Detailed public / field studies | `content/case-studies.mjs`, `content/field-studies.mjs` |
| Case pages / curriculum-linked reading | `scripts/case-study-render.mjs`, `scripts/reading-render.mjs` |
| Pages / teaching layout | `scripts/render.mjs`, `scripts/teaching-render.mjs` |
| Boards / phase illustrations | `scripts/visual-boards.mjs`, `scripts/field-illustrations.mjs` |
| Browser interaction / styles | `public/assets/` |
| Offline exercises | `practice-kit/` |
| Approved PDF and ZIP | `public/downloads/` |
| `/academy/` integration | `../scripts/build-academy.mjs` |

From the repository root, use `npm run build` and publish **only `dist/client`**. See `../DEPLOY-ACADEMY.md`. Do not copy the standalone `academy/dist` folder directly to a subpath: the root assembler adapts its URLs, search index, metadata and downloads.

For isolated content authoring: `npm --prefix academy run check`, then `npm --prefix academy run preview` (localhost:4183). No dependency install is required inside this folder. The root `npm run dev` also serves the integrated prefix; restart dev after editing academy source to rebuild it.

The existing PDF and practice ZIP are approved static assets. Production builds need no Python or local font source. If practice source changes, rebuild the public ZIP and run the Python tests before publishing; do not allow the downloadable copy to drift from the source. Font license: `public/assets/FONT-LICENSE.txt`. No open-source license is granted to original course materials by publishing this repository.

## Additional release checks

- `npm --prefix academy run check` covers all 19 detailed case schemas, both languages, expanded search text, lecture preservation, source-to-module mappings and retired authoring-only copy.
- From `academy/`, `node scripts/audit_html.mjs` checks heading order, control labels and primary contrast tokens. Browser inspection must also verify actual computed footer-button colors, search, case diagrams and 375/768/1280 layouts.
- Optional PDF-aware privacy check: `python scripts/audit-release-privacy.py dist` from `academy/` (requires `pypdf`). Use `../dist/client/academy` to check the combined export. It scans public text, PDF text/metadata/annotations and ZIP entries, reports locations rather than matched values, and does not certify privacy compliance.
- Optional brochure authoring: `python academy/scripts/refresh-case-brochure.py --font <licensed-CJK-TrueType-font>` from the repository root. Requires `reportlab`, `pypdf` and `pypdfium2`; regenerates only pages 8–9 and emits review images under `.generated/academy-review/pdf/`. Inspect both pages, rerun privacy checks and rebuild before publishing. Other PDF pages are preserved. This step is not needed on deployment hosts.
