# Enterprise AI Playbook: contributor and Agent instructions

## Start here

Read [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for the source map and [CONTRIBUTING.md](CONTRIBUTING.md) for contribution standards. `main` is the single maintained branch: services, Playbook, FDE Academy, Agent cases and the optional Toolkit request UI are integrated. Do not instruct readers to switch to retired feature branches.

Only read [DEPLOYMENT.md](DEPLOYMENT.md) when changing build or hosting behavior. Updating GitHub is not authorization to change production, DNS, the contact receiver or another repository.

## Boundaries

- Preserve service routes `/zh/`, `/en/`, `process/` and `playbook/`, nine plays, all 66 per-play More applications, filters, language/hash behavior and business CTAs.
- Academy is additive at `/academy/zh/` and `/academy/en/`. Preserve the full curriculum, illustrated boards, labs and downloads. Detailed expanded notes are currently Chinese, not fully translated.
- Agent cases are additive: Chinese `/agent-cases/`, English `/agent-cases/en/`. Preserve nine cases, 20 pages, comparison evidence, bilingual links and the white/navy/teal palette. Read `agent-cases/AGENTS.md` before editing that module.
- The owner approved combining the Toolkit contact-request UI with the full site. Keep `/zh/toolkit/` and `/en/toolkit/`, but do not expose private repository URLs, Skill bodies, packages or Toolkit downloads.
- Collection is optional and disabled without both valid, owner-approved `TOOLKIT_LEAD_ENDPOINT` and `TOOLKIT_PRIVACY_URL`. Public build-time URLs must contain no secrets, credentials, query strings or fragments. A receiving service, privacy notice, retention/deletion and anti-abuse controls require separate approval; none is supplied by this static site. Read `docs/TOOLKIT-LEAD-ENDPOINT.md` before changing this contract.
- Do not publish private project files, original curriculum screenshots, customer identities, internal paths, tokens, caches, local notes or raw research. Do not inspect unrelated source projects to build this repository.
- Do not invent a mailbox, learner account, accreditation, production AI service or measured ROI. Keep synthetic mechanisms distinct from real model-task results.
- Preserve the learning/evaluation license, commercial authorization boundary and third-party notices.

## Workflow

1. Inspect the working tree and remote state. Preserve unrelated changes; never force-push, reset a user checkout or delete an unmerged branch.
2. Use Node 24 LTS and the committed lockfile; install with `npm ci --ignore-scripts`. No separate install is needed in `academy/`.
3. Run `npm run security:check`, `npm run security:audit`, `npm run check`, `npm run build`, then `npm test`. Fail closed on nonzero exits. The combined build must have 112 entries: 9 service/request, 83 Academy, 20 Agent cases.
4. Preview the combined export. Check both languages, original CTAs, More, course deep links, search, image zoom, downloads, Toolkit disabled state, keyboard access and narrow layouts. Use synthetic contacts and local mocks only for form testing.
5. Publish only `dist/client/` when separately authorized. Never publish repository source, `dist/server/` or standalone `academy/dist/`. Unknown routes must return real HTTP 404.
6. Keep one maintained remote branch, `main`. Use contributor forks for PRs and remove temporary branches after reviewed merges. Ordinary version-update PRs are paused; retain automated security fixes, advisory alerts and scheduled security scans. Review routine upgrades manually without force fixes. Security fixes may use a temporary branch, removed after a reviewed merge.

## Editing map

- Business workflows and More scenarios: `lib/content.ts`, `lib/more-scenarios.ts`.
- Shared navigation: `components/fde/shell.tsx`; contextual learning: `lib/academy.ts`, `components/fde/academy.tsx`.
- Academy learner guide: `docs/FDE-ACADEMY.md`; content and board source map: `academy/README.md`.
- Academy integration: `scripts/build-academy.mjs`, `scripts/academy-dev.mjs`, `scripts/test-academy-integration.mjs`.
- Case paths and links: `lib/agent-cases.ts`, `components/fde/case-links.tsx`.
- Case assembly/tests: `scripts/assemble-agent-cases.mjs`, `scripts/test-agent-cases-integration.mjs`.
- Request UI/configuration: `components/fde/toolkit-access.tsx`, `lib/lead-endpoint.ts`; tests: `scripts/test-lead-endpoint.mjs`, `scripts/test-toolkit-boundary.mjs`.
- Public GitHub presentation: English `README.md`, Chinese `README.zh-CN.md`, and the identical English compatibility copy `README.en.md`; keep claims and language links aligned. `docs/FDE-ACADEMY*.md` are the learning guides. Verify with `node docs/studio/check-showcase.mjs`.

Academy runtime assets stay relative to `import.meta.url` or CSS. The assembler prefixes generated HTML and search URLs; return-to-service links intentionally leave the Academy prefix. Do not use blind global path replacements.
