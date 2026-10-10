# 维护与协作 / Contributing

欢迎为企业 AI 应用、FDE 课程、匿名案例及工程质量提交可验证的改进。使用源文件遵循 [学习与评估许可](LICENSING.md)，生产及商业复用需另行授权。

Contributions are welcome under the [project license](LICENSE). Keep third-party permissions and notices intact. No customer records or secrets belong in an issue or pull request.

## 先确认版本 / Start with the right branch

完整集成版本在 `feat/agent-cases-20260910`；学院维护分支为 `feat/fde-academy-20260908`。对应用功能提交 PR 时请选择相应分支，默认分支介绍不代表所有模块已合并。安全修复须检查三个受支持分支。

Read the [agent instructions](https://github.com/NewenergyEric/FDE-web/blob/feat/fde-academy-20260908/AGENTS.md), [Academy deployment guide](https://github.com/NewenergyEric/FDE-web/blob/feat/fde-academy-20260908/DEPLOY-ACADEMY.md) and [hosting contract](https://github.com/NewenergyEric/FDE-web/blob/feat/fde-academy-20260908/DEPLOYMENT.md) before changing deployment behavior. Inspect the working tree and remote state; preserve unrelated work and never force-push.

## 内容改进标准 / Editorial standard

1. **标题与读者任务一致。** 案例讲清问题、发现、行动、判断和结果；不把作者的检索备忘录当作案例正文。 / Match the title and the learner's task; research notes are not a case study.
2. **让读者能动手。** 关联课程、输入、交付物、失败模式和验收标准。 / Include inputs, outputs, failure modes, acceptance and module links.
3. **区分事实与推演。** 引用一手公开资料，标明教学推演与合成数据；不暗示未证实的客户效果。 / Separate reported facts, teaching inferences and synthetic exercises.
4. **保持视觉与语言。** 延续深蓝、青绿和教学画板风格；中英文保持范围一致，不声称中文详细讲义已全部英译。 / Preserve the editorial visual system and accurately describe language coverage.
5. **保护隐私。** 不上传客户姓名、业务记录、内部地址、截图、原始研究、密钥或本机路径。只使用可公开的材料和最小合成复现。 / Use publication-safe material and minimal synthetic reproductions only.

Use the content-improvement issue form for a learning problem and the bug form for a reproducible defect. Follow [SECURITY.md](SECURITY.md) for private vulnerability reporting; never put suspected secrets or customer records in public reports.

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
npm ci --ignore-scripts
npm run security:check
npm run security:audit
npm run check
npm run build
npm test
```

Then review the combined preview in both languages: original service CTAs and More tabs, Academy deep links, search, board zoom, keyboard controls and downloads. Check mobile layouts, visible button text and real 404 responses. Changes to practice-kit source require updated tests and a rebuilt downloadable ZIP. Do not claim that a push to GitHub deployed the website.

For a documentation-only change, verify Markdown links and image rendering, bilingual claims, privacy, and that the diff contains no application or deployment changes. Keep repository visual assets outside `public/` so repository decoration does not change the website build.

The bundled service font is ready for deployment. When authoring new Chinese copy, its optional regeneration command is `node scripts/subset-font.mjs /path/to/NotoSansSC-VF.ttf`, with an appropriately licensed font and Python `fonttools` / `brotli`. Production builds do not require those font-authoring dependencies. Preserve upstream component code unless a task specifically calls for changing it.

Pull requests should include scope, affected pages or documents, validation, and any limits. Use synthetic screenshots; record the exact commit and publish directory in a deployment handoff. A repository update is not permission to change hosting, DNS, access settings or production data.

## Contribution rights / 投稿权利

Only contribute work you own or are authorized to provide. By intentionally submitting an original contribution for inclusion, you license it under the root LICENSE and additionally grant the project copyright holders a non-exclusive, worldwide, irrevocable, royalty-free right to use, modify and sublicense that contribution as part of this project under separate commercial agreements. You retain ownership. This additional permission does not apply to identified third-party works; disclose their provenance and preserve their terms. If you cannot grant this permission, discuss scope before submitting. Do not add a restrictive or incompatible upstream work without agreement.

提交原创贡献时，你保留著作权，并同意上述项目许可与商业再许可授权；第三方材料必须单独标识，不得声称代其授权。请在 PR 中明确确认。贡献不自动获得商用本项目全部内容的权利。
