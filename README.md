# FDE · Business Capability

**FDE Academy integration:** the additive training site now lives in `academy/` and is assembled under `/academy/zh/` and `/academy/en/`. Both sites use one build and one static publish directory. Start with [DEPLOY-ACADEMY.md](DEPLOY-ACADEMY.md) for the exact entrances, deployment steps and acceptance checklist. The existing service pages and per-play More applications are preserved.

独立的中英文企业营销网站：品牌价值首页、FDE 交付流程、可交互的企业 Playbook。不会连接或修改任何参考项目，也不包含客户数据、内部系统入口、真实专家背书或未经验证的 ROI。

A standalone bilingual marketing website with a value-led homepage, a dedicated FDE process and an interactive enterprise Playbook. No client data, internal system links, real-person endorsements or unverified ROI claims are included.

## Run locally / 本地运行

Use Node.js **24.19+** (24 LTS recommended), and npm. The scaffold supports Node 22.13+, but the validated Windows build used 24.19; an older 24.13 runtime produced a native shutdown error.

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4178
```

Production export / 生产静态构建：

```sh
npm run check
npm run build
npm run preview
```

Preview: http://127.0.0.1:4179/ · Publish directory: **dist/client**

The website requires **no API key, model service, database, authentication or backend**. Deployment was not performed as part of this handoff.

## Pages / 页面

| 中文          | English       | Purpose                                                                                  |
| ------------- | ------------- | ---------------------------------------------------------------------------------------- |
| /zh/          | /en/          | Positioning, sample brief, modular services, resources                                   |
| /zh/process/  | /en/process/  | Six-stage FDE process, tangible deliverables, field lessons                              |
| /zh/playbook/ | /en/playbook/ | Nine detailed plays with 66 contextual More applications, output samples and pilot evaluation |

The root path / shows the Chinese homepage. Language switching retains the page and the selected Playbook hash.

## What is included / 包含内容

- A restrained editorial visual system: navy, white, teal and cobalt; local Chinese/Latin variable font.
- Nine detailed bilingual plays: market entry, prospecting, creator partnerships, content, frontline support, business analysis, inventory/planning, intelligence and knowledge capability.
- Each play has its own More tab with expandable applications in the existing visual system. The 66 applications include the business question, inputs, method, representative outputs and source-basis label. Search covers nested applications and opens matching More content.
- Interactive decision-brief tabs, scenario selection, category filtering, search and detailed method/output/evaluation tabs.
- A four-layer proposed service architecture: products/runtime → enterprise Skills → role Agents → FDE delivery.
- Four previously prepared reference PDFs: separate Chinese/English Process and Playbook guides. These guides contain 14/20 pages and the Playbook PDFs cover eight earlier plays; the website adds market entry as the ninth.
- Two editable pilot-brief templates. No submission form or online AI execution.
- A generated social image, favicon, bilingual 404 page, reduced-motion styling and keyboard-accessible controls.

## Edit / 维护

- Core business content: lib/content.ts
- Contextual applications and search: lib/more-scenarios.ts, lib/playbook.ts
- Localized routing and metadata: lib/site.ts, lib/metadata.ts
- Page components and sample artifacts: components/fde/
- Visual styles: app/globals.css, app/site.css
- Downloadable resources and images: public/
- Build finalization, static preview and tests: scripts/

English is written as business copy, not word-for-word UI translation. Keep both language fields populated when updating a play.

The bundled font is already subsetted and ready for deployment. After adding new Chinese characters, regenerate it using an appropriately licensed Noto Sans SC variable TTF:

```sh
node scripts/subset-font.mjs /path/to/NotoSansSC-VF.ttf
```

This optional authoring utility requires Python with fonttools and brotli; production builds do not.

## Checks / 检查

npm run check runs:

1. TypeScript checks across the project.
2. Source lint for authored site code.
3. Content parity, search/filter, route and resource tests; exported HTML tests when a build exists.

The generated shadcn component library and its unused hooks are retained without bulk rewrites; their upstream lint baseline is excluded from the site lint. They remain part of TypeScript checking.

Read DEPLOYMENT.md for the deployment Agent handoff and release checks. Read CONTENT-NOTES.md for claim boundaries and ASSETS.md for asset provenance.

No open-source license has been assigned to the original website or marketing copy. Third-party packages and fonts retain their respective licenses.
