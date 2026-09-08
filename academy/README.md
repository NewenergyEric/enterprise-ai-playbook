# AIelsen FDE Academy

The maintained learning-site source for this repository. It is an addition to the FDE service site, not a replacement. The root build publishes it at `/academy/zh/` and `/academy/en/` without mixing its CSS or runtime with the service application.

## Content and boundaries

- 12 weekly modules; 100 expanded Chinese lecture sections. English module pages contain overviews and workshops, with a clearly labeled link to the detailed Chinese notes.
- 24 bilingual visual teaching boards, four phase illustrations, 19 public cases and anonymized teaching exercises, 30 concepts and 21 primary references.
- 16 worksheets per language, a Python practice kit, six deterministic browser labs, and a 12-page marketing brochure.
- No LMS, account, automatic grading service, live AI endpoint, formal accreditation or performance guarantee. Notes and progress remain in the current browser; the new public origin does not automatically migrate localhost progress.
- Exercises are synthetic; public company references do not imply partnerships. Do not add source screenshots, private research, customer data or credentials.

## Maintain

| Concern | Source |
| --- | --- |
| Detailed Chinese lectures | `content/notes/01.md` through `12.md` |
| Course metadata / practice | `content/course.mjs`, `content/workshops.mjs`, `content/curriculum.mjs` |
| Cases / sources | `content/cases.mjs`, `content/sources.mjs` |
| Pages / teaching layout | `scripts/render.mjs`, `scripts/teaching-render.mjs` |
| Boards / phase illustrations | `scripts/visual-boards.mjs`, `scripts/field-illustrations.mjs` |
| Browser interaction / styles | `public/assets/` |
| Offline exercises | `practice-kit/` |
| Approved PDF and ZIP | `public/downloads/` |
| `/academy/` integration | `../scripts/build-academy.mjs` |

From the repository root, use `npm run build` and publish **only `dist/client`**. See `../DEPLOY-ACADEMY.md`. Do not copy the standalone `academy/dist` folder directly to a subpath: the root assembler adapts its URLs, search index, metadata and downloads.

For isolated content authoring: `npm --prefix academy run check`, then `npm --prefix academy run preview` (localhost:4183). No dependency install is required inside this folder. The root `npm run dev` also serves the integrated prefix; restart dev after editing academy source to rebuild it.

The existing PDF and practice ZIP are approved static assets. Production builds need no Python or local font source. If practice source changes, rebuild the public ZIP and run the Python tests before publishing; do not allow the downloadable copy to drift from the source. Font license: `public/assets/FONT-LICENSE.txt`. No open-source license is granted to original course materials by publishing this repository.
