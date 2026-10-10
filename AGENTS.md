# FDE service site + FDE Academy

## Read first

Read `DEPLOY-ACADEMY.md` for the integration release and `DEPLOYMENT.md` for the static host contract. Follow the user's authority: updating GitHub is not permission to change DNS or deploy production.

## Boundaries

- Existing service pages stay at `/zh/`, `/en/`, and their `process/` and `playbook/` children. Preserve the nine plays, all 66 per-play More applications, filters, language/hash behavior, and original business CTAs.
- Academy is additive: `/academy/zh/` and `/academy/en/`. Its authored source is `academy/`; its public output is `dist/client/academy/`.
- Preserve the established navy/teal editorial style and the illustrated teaching boards. Do not replace the Academy with summaries or claim all expanded notes are translated; detailed notes are currently Chinese.
- Do not publish private source projects, original curriculum screenshots, client identities, internal paths, tokens, caches, authoring work or local notes. Do not read other local project directories to deploy this repository.
- No hardcoded mailbox, learner account, accreditation, production AI service or measured ROI claim. The approved Toolkit request page may collect an email or WeChat ID only when both build-time `TOOLKIT_LEAD_ENDPOINT` and `TOOLKIT_PRIVACY_URL` are valid and owner-approved; keep them public HTTPS URLs without credentials, query strings or fragments. The receiver must be rate-limited and privacy-reviewed separately. Missing configuration must disable collection. Never collect payment-card data or expose Toolkit files.

## Workflow

1. Inspect `git status` and remote branch state. Preserve unrelated edits. Never force-push or reset a user worktree.
2. Use Node 24 LTS (validated Windows runtime 24.19.0), `npm ci`, and the committed lockfile. No install is needed inside `academy/`.
3. Set `SITE_URL=https://fde.aielsen.com` for this deployment. Do not append `/academy` to the origin.
4. Run `npm run check`, `npm run build`, and `npm test`. The build assembles both sites and runs the Academy regression tests. Fail closed on any nonzero exit.
5. Preview the combined export, not a stale independent Academy preview. Verify main CTAs, More tabs, 9 related-learning links, Chinese/English course deep links, search, image modal and downloads.
6. Deploy only `dist/client` when authorized. No SPA wildcard fallback, and never deploy `dist/server`, repository root or `academy/dist` directly.

## Editing map

- Service content: `lib/content.ts`, `lib/more-scenarios.ts`.
- Entrances and mappings: `lib/academy.ts`, `components/fde/academy.tsx`, `components/fde/shell.tsx`.
- Course contents and board implementation: `academy/README.md`.
- Prefix adapter and development serving: `scripts/build-academy.mjs`, `scripts/academy-dev.mjs`.
- Integrated route tests: `scripts/test-academy-integration.mjs`.

Keep Academy runtime assets relative to `import.meta.url` or the CSS file. Generated HTML and search result URLs are prefixed by the assembler. Service-return links intentionally lead outside the Academy prefix. Do not perform a blind global `/zh/` replacement.
