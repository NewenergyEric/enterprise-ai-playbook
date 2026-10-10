# Agent case module: maintenance rules

Read the repository root instructions and deployment guide before integration.

- Edit only this module unless the current task authorizes a host-site integration.
- Maintain the existing service and Academy routes, language behavior, calls to action and true 404 handling.
- Case facts and actual delivery stages must remain distinct from illustrative methods and proposed measures.
- Maintain both existing locales: Chinese at `/agent-cases/` and English at `/agent-cases/en/`. Every case has matching content, diagrams, interface text and downloads. Keep schema keys, IDs, evidence boundaries and case slugs aligned.
- Language switches retain the current case and hash. Internal links and downloads remain in the selected language. Verify both locales after changing shared components. Never send an English page back to a Chinese case by accident.
- The fictional public Agent names are presentation names. Do not infer or restore private identities.
- Only reviewed public assets belong here. Do not copy original client reports, correspondence, recordings, credentials, private workspace references or production caches.
- Keep scenario images separate from genuine comparison evidence; read their captions and centralized explanation before reuse.
- Preserve Bella's existing comparison content unless the user asks to change it.
- Keep the case palette aligned with the FDE service site: white surfaces, navy text and primary buttons, teal highlights, and electric-blue interactions. `reference/series/brand-palette.css` is the final shared color layer; keep the SVG palette in `tools/case-boards.mjs` consistent. Do not tint photographs or alter comparison evidence when changing interface colors. Check text contrast in both locales, including Bella, dialogs and mobile headers.
- Use the existing source-driven builder. Verify with `npm run build` and `npm test`, then browser-test major changes at desktop and phone widths.
- Integration output belongs in `dist/client/agent-cases/`. Never publish repository root or use a successful-homepage fallback for missing routes.
- Do not push, merge, change hosting, or deploy without the corresponding task authorization.
