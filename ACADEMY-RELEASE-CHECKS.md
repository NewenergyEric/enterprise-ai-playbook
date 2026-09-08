# Academy integration — release checks

Checked locally on 2026-09-08, Windows, Node 24.19.0. This is a code handoff, not evidence of a production deployment.

## Passed

- `npm run check`: TypeScript, source lint, service content/interaction tests and integration tests.
- `SITE_URL=https://fde.aielsen.com npm run build`: both sites exported successfully; Academy's 13 regression groups passed.
- Integrated export: 98 HTML files (including flat/index mirrors and error documents), 90 public entry routes, 3,946 local links/assets/anchors checked.
- HTTP preview: 95 route/resource requests returned 200, missing service/Academy paths returned 404, and a slashless course path redirected correctly.
- Existing nine plays, 66 contextual More applications, six process stages and original business CTAs retained. Browser checks cycled through all nine plays and confirmed the case/module links updated; the existing More panel opened normally.
- Main-site Academy teaser links to the 24-board atlas. Chinese search returned prefixed Academy deep links. The SVG viewer loaded a `/academy/assets/boards/` image, switched sizing, closed with Escape, restored focus and released body scrolling.
- Chinese/English Academy language switching and the return link to the corresponding service homepage worked.
- Responsive checks at 1280, 768 and 375 CSS viewport widths: observed document widths 1265, 753 and 360 with scrollbars, respectively. No document-level horizontal overflow in the reviewed service/Academy pages. The original-size diagram intentionally scrolls inside its modal canvas.
- Development middleware served the Academy course directly, independently of the service router. The static production preview is the definitive combined-release check.
- Offline practice kit: all 37 Python unit tests passed from `academy/practice-kit/`.
- Public source/build scans found no known private client identifiers, original attachment references, local author paths or credential patterns. Only the approved course source, public assets, PDF and synthetic practice ZIP were imported; private research directories were excluded.

## Deployment Agent must still verify

- Actual hosting rules, direct deep-link refresh, MIME types, cache behavior and production domain metadata.
- Production URL tests after publishing. Local passing tests do not prove the host was updated.
- Navigation and modal behavior in the user's target mobile browsers; this was not a full WCAG, screen-reader or browser-matrix certification.
- If updates change the Python practice source, regenerate and inspect the downloadable ZIP. The existing PDF and ZIP were retained for this integration, not newly authored.

Expanded practitioner notes are currently Chinese; English overviews/workshops and bilingual diagrams remain available. There is no learner login, online assessment service or automatic migration of localhost learning progress.
