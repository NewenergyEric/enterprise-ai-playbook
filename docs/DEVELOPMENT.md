# Source and local learning / 源文件与本地学习

[Read the guide online / 在线阅读](https://fde.aielsen.com/) · [FDE Academy / 学院学习指南](FDE-ACADEMY.md) · [Contributing / 贡献指南](../CONTRIBUTING.md)

`main` is the single maintained branch and includes the service workflow and Playbook, FDE Academy, bilingual Agent cases, and the optional Toolkit request page. You do not need to assemble several branches to study or contribute.

`main` 是唯一维护分支，包含工作流程与 Playbook、FDE 学院、双语 Agent 案例及可选的 Toolkit 申请页。不再需要从多个分支挑选完整版本。

## Find the source / 找到要读的源文件

| What you want to study or improve | Source |
| --- | --- |
| Business workflows and scenario descriptions / 工作流程与场景 | `lib/content.ts`, `lib/more-scenarios.ts` |
| FDE learning path, lectures and cases / 学院课程与讲义 | [Academy source map](../academy/README.md), `academy/content/notes/01.md` through `12.md` |
| Synthetic engineering exercises / 合成工程实训 | [Practice kit](../academy/practice-kit/README.en.md) · [中文说明](../academy/practice-kit/README.zh.md) |
| Teaching diagrams and interactive labs / 画板与实验 | `academy/scripts/visual-boards.mjs`, `academy/public/assets/lab-logic.js` |
| Agent workflow cases / Agent 工作案例 | [Case module guide](../agent-cases/README.md), `agent-cases/content/`, `agent-cases/content/en/` |
| Service/learning/case navigation / 导航与关联 | `components/fde/`, `lib/academy.ts`, `lib/agent-cases.ts` |
| Optional request UI and URL safeguards / 可选申请界面与安全校验 | `components/fde/toolkit-access.tsx`, `lib/lead-endpoint.ts` |
| GitHub reader experience / 仓库读者入口 | `README.md`, `README.en.md`, `docs/media/`, [motion source](studio/README.md) |

## Run a non-production copy / 本地学习预览

Use Node 24 LTS and the committed lockfile. Python 3.10+ is needed for the separate practice exercises. The documented Windows validation runtime is Node 24.19.0.

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

Open the loopback URL printed by the preview (default `http://127.0.0.1:4179`). The complete build has 112 entry routes: nine service/request entries, 83 Academy entries and 20 Agent case entries. The root build assembles all modules; do not replace it with a standalone Academy preview.

No model API key or customer data is required. Leave `TOOLKIT_LEAD_ENDPOINT` and `TOOLKIT_PRIVACY_URL` unset during ordinary study; contact collection stays disabled. No receiving backend or private Toolkit contents are included. Do not add real contact details to test submissions.

The practice kit runs independently with Python; follow its README. It provides mechanisms and synthetic examples, not a production agent or authorization service. Expanded lecture notes are currently Chinese.

## Before contributing / 提交前

Read [AGENTS.md](../AGENTS.md), [CONTRIBUTING.md](../CONTRIBUTING.md) and [SECURITY.md](../SECURITY.md). Test changes in both languages, preserve the original workflows and diagrams, and use synthetic data for reproductions. Do not edit generated HTML or commit build outputs, personal paths, credentials or client records.

The repository maintains only `main`. External contributors can use a branch in their own fork and target a pull request at `main`; this does not add a permanent branch here. Ordinary dependency-update PRs are paused and routine upgrades are reviewed manually. Vulnerability alerts and automated security fixes remain enabled; a security PR may temporarily create a branch, removed after review and merge. Run the security audit before proposing a version change.

Source availability does not grant production or commercial-use rights; see [LICENSING.md](../LICENSING.md). Maintainers who have separate publication authority can consult the [static hosting contract](../DEPLOYMENT.md). A repository update alone is not a production deployment.
