# FDE service site + FDE Academy + Agent cases

## Read first

Read `DEPLOY-AGENT-CASES.md` for the current combined release, `DEPLOY-ACADEMY.md` for the earlier Academy integration and `DEPLOYMENT.md` for the static host contract. Follow the user's authority: updating GitHub is not permission to change DNS or deploy production.

The owner's decision is to keep the FDE Toolkit off this website. Read `DEPLOY-TOOLKIT.md` for this separation boundary. Do not add Toolkit navigation, homepage sections, footer links, download links, repository URLs or bundled skill files to the public website. The separate private GitHub repository remains independent. Entry routes remain 110.

## Boundaries

- Existing service pages stay at `/zh/`, `/en/`, and their `process/` and `playbook/` children. Preserve the nine plays, all 66 per-play More applications, filters, language/hash behavior, and original business CTAs.
- Academy is additive: `/academy/zh/` and `/academy/en/`. Its authored source is `academy/`; its public output is `dist/client/academy/`.
- Agent cases are additive: Chinese `/agent-cases/`, English `/agent-cases/en/`. Authored source is `agent-cases/`; never publish that source directory. Preserve the existing bilingual cases, original comparisons, anonymization, white/navy/teal palette and language/hash behavior. Read the module's `AGENTS.md` before editing it.
- Preserve the established navy/teal editorial style and the illustrated teaching boards. Do not replace the Academy with summaries or claim all expanded notes are translated; detailed notes are currently Chinese.
- Do not publish private source projects, original curriculum screenshots, client identities, internal paths, tokens, caches, authoring work or local notes. Do not read other local project directories to deploy this repository.
- No invented lead form, mailbox, learner account, accreditation, production AI service or measured ROI claim.

## Workflow

1. Inspect `git status` and remote branch state. Preserve unrelated edits. Never force-push or reset a user worktree.
2. Use Node 24 LTS (validated Windows runtime 24.19.0), `npm ci`, and the committed lockfile. No install is needed inside `academy/`.
3. Set `SITE_URL=https://fde.aielsen.com` for this deployment. Do not append `/academy` to the origin.
4. Run `npm run check`, `npm run build`, and `npm test`. The build assembles services, Academy and Agent cases. Expected combined entries: 110. Fail closed on any nonzero exit.
5. Preview the combined export, not a stale independent Academy preview. Verify main CTAs, More tabs, 9 related-learning links, Chinese/English course deep links, search, image modal and downloads.
6. Deploy only `dist/client` when authorized. No SPA wildcard fallback, and never deploy `dist/server`, repository root or `academy/dist` directly.

## Editing map

- Service content: `lib/content.ts`, `lib/more-scenarios.ts`.
- Entrances and mappings: `lib/academy.ts`, `components/fde/academy.tsx`, `components/fde/shell.tsx`.
- Course contents and board implementation: `academy/README.md`.
- Prefix adapter and development serving: `scripts/build-academy.mjs`, `scripts/academy-dev.mjs`.
- Integrated route tests: `scripts/test-academy-integration.mjs`.
- Agent case paths and contextual links: `lib/agent-cases.ts`, `components/fde/case-links.tsx`.
- Agent case assembly and integrated checks: `scripts/assemble-agent-cases.mjs`, `scripts/test-agent-cases-integration.mjs`.

Keep Academy runtime assets relative to `import.meta.url` or the CSS file. Generated HTML and search result URLs are prefixed by the assembler. Service-return links intentionally lead outside the Academy prefix. Do not perform a blind global `/zh/` replacement.
