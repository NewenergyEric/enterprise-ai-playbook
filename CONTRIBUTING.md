# 维护与协作 / Contributing

本仓库用于 AIelsen FDE 服务站与学院的内容、工程维护。欢迎有仓库权限的协作者提交可验证的改进；这份说明不改变仓库访问权限或材料许可。

This guide is for authorized repository collaborators. It does not grant repository access or a license to redistribute the original course materials.

## 先确认版本 / Start with the right branch

完整集成版本目前在 `feat/fde-academy-20260908`。默认分支的项目介绍包含学院预览，但展示文档不等于学院代码已合并。

Read the [agent instructions](https://github.com/NewenergyEric/FDE-web/blob/feat/fde-academy-20260908/AGENTS.md), [Academy deployment guide](https://github.com/NewenergyEric/FDE-web/blob/feat/fde-academy-20260908/DEPLOY-ACADEMY.md) and [hosting contract](https://github.com/NewenergyEric/FDE-web/blob/feat/fde-academy-20260908/DEPLOYMENT.md) before changing deployment behavior. Inspect the working tree and remote state; preserve unrelated work and never force-push.

## 内容改进标准 / Editorial standard

1. **标题与读者任务一致。** 案例讲清问题、发现、行动、判断和结果；不把作者的检索备忘录当作案例正文。 / Match the title and the learner's task; research notes are not a case study.
2. **让读者能动手。** 关联课程、输入、交付物、失败模式和验收标准。 / Include inputs, outputs, failure modes, acceptance and module links.
3. **区分事实与推演。** 引用一手公开资料，标明教学推演与合成数据；不暗示未证实的客户效果。 / Separate reported facts, teaching inferences and synthetic exercises.
4. **保持视觉与语言。** 延续深蓝、青绿和教学画板风格；中英文保持范围一致，不声称中文详细讲义已全部英译。 / Preserve the editorial visual system and accurately describe language coverage.
5. **保护隐私。** 不上传客户姓名、业务记录、内部地址、截图、原始研究、密钥或本机路径。只使用可公开的材料和最小合成复现。 / Use publication-safe material and minimal synthetic reproductions only.

Use the content-improvement issue form for a learning problem. Use the bug form for a reproducible interface or build defect. Do not put suspected secrets or customer records in an issue; use an existing owner-approved private channel, not an invented contact address.

## 编辑地图 / Editing map

| Work | Location in the integration branch |
| --- | --- |
| 服务内容 / Service copy | `lib/content.ts`, `lib/more-scenarios.ts` |
| 场景检索 / Playbook behavior | `lib/playbook.ts`, `components/fde/` |
| 路由与元信息 / Routing and metadata | `lib/site.ts`, `lib/metadata.ts` |
| 学院导航与主站关联 / Academy integration | `lib/academy.ts`, `scripts/build-academy.mjs` |
| 讲义、案例、画板 / Lectures, cases and boards | [Academy editing map](https://github.com/NewenergyEric/FDE-web/blob/feat/fde-academy-20260908/academy/README.md) |
| 服务站样式 / Service styles | `app/globals.css`, `app/site.css` |
| GitHub 展示 / Repository presentation | `README.md`, `README.en.md`, `docs/media/`, `docs/brand/` |

不要直接维护构建生成的 HTML。当前四份服务 PDF 是较早的参考版：其中 Playbook 为 8 个场景，网站为 9 个；不能把它们描述成当前网站的逐页导出。

Do not edit generated HTML. The four service PDFs are earlier reference editions, not exports of the current website. Their Playbook contains eight plays; the website contains nine.

## 验证与交接 / Validate and hand off

For application or content changes, use Node 24.19+ and the committed lockfile:

```sh
npm ci
npm run check
npm run build
npm test
```

Then review the combined preview in both languages: original service CTAs and More tabs, Academy deep links, search, board zoom, keyboard controls and downloads. Check mobile layouts, visible button text and real 404 responses. Changes to practice-kit source require updated tests and a rebuilt downloadable ZIP. Do not claim that a push to GitHub deployed the website.

For a documentation-only change, verify Markdown links and image rendering, bilingual claims, privacy, and that the diff contains no application or deployment changes. Keep repository visual assets outside `public/` so repository decoration does not change the website build.

The bundled service font is ready for deployment. When authoring new Chinese copy, its optional regeneration command is `node scripts/subset-font.mjs /path/to/NotoSansSC-VF.ttf`, with an appropriately licensed font and Python `fonttools` / `brotli`. Production builds do not require those font-authoring dependencies. Preserve upstream component code unless a task specifically calls for changing it.

Pull requests should include scope, affected pages or documents, validation, and any limits. Use synthetic screenshots; record the exact commit and publish directory in a deployment handoff. A repository update is not permission to change hosting, DNS, access settings or production data.
