# Agent 案例集接入 · 给部署 Agent 的执行说明

## 这次代码已经接好了什么

仓库：`https://github.com/NewenergyEric/FDE-web`  
完整交付分支：`feat/agent-cases-20260910`  
基线：`feat/fde-academy-20260908` 的 `6de03f1`（包含已交付的学院）  
正式 origin：`https://fde.aielsen.com`  
唯一发布目录：**`dist/client/`**

主导航增加「Agent 案例 / Agent Cases」，中文进入 `/agent-cases/`，英文进入 `/agent-cases/en/`。这是网站的新增栏目，不替代服务、Playbook 或学院；不是 iframe，也没有新的服务端或 Agent 执行环境。

原主站和学院代码已经与案例模块统一构建，无需重新执行源码接入补丁。GitHub 推送不是生产发布授权；本次不改服务器、DNS、TLS、主分支策略或线上内容。

| 区域 | 保留或新增 |
| --- | --- |
| 服务站 | 原 `/zh/`、`/en/`、流程与 Playbook，原业务 CTA、九场景和 66 个 More 应用保留 |
| 学院 | 保留 `/academy/`、双语课程、画板、实验、搜索和下载 |
| 主导航与页脚 | 新增对应当前语言的案例入口 |
| Playbook 场景 | 客服 → Oliva；创作者合作 → Ruby；内容生产 → Bella / Velia；经营分析 → Steve |
| 案例集 | 两个首页、九案各两种语言，共 20 页；18 份工作表、28 张双语图解 |
| 共用发布 | 服务 → 学院 → 案例集 → sitemap → 完整构建标记；当前 110 条入口 |

## 部署前必须核对分支

`main` 在本次开始时只包含服务站和仓库介绍，尚未合并学院；不能仅拉取旧 `main` 就认为拿到了完整版本。请明确检出上述完整交付分支，或者经审核将其合并到生产使用的分支。

使用新检出目录；如果已有其他修改，不重置或覆盖。示例：

```sh
git clone --branch feat/agent-cases-20260910 https://github.com/NewenergyEric/FDE-web.git
cd FDE-web
git log -1 --oneline
```

仓库是私有仓库，使用自己的获授权凭据。不要复制作者电脑中的 token、原项目、私有附件或制作目录。

## 构建与完整预览

使用 **Node 24 LTS，Windows 建议 24.19.0 或更高的已验证补丁版本**；保留 lockfile，不添加新的依赖或执行强制升级来绕过失败。

PowerShell：

```powershell
$env:SITE_URL='https://fde.aielsen.com'
npm ci
npm run check
npm run build
npm test
npm run preview
```

Linux/macOS 的环境变量行为 `export SITE_URL=https://fde.aielsen.com`。没有模型密钥、数据库、表单或额外后端要求。

默认组合预览 `http://127.0.0.1:4179/`；`PORT` 可改端口。不要以独立案例预览替代此组合验收。首轮 `npm run check` 在没有构建产物时会跳过产物测试；因此 **构建后的 `npm test` 必须再次通过**，不能忽略非零退出。

`npm run dev` 也接入了 `/agent-cases/`，只提供生成的公开文件；修改案例或学院源内容后重启开发服务。部署验收仍以 `npm run build` 后的完整静态预览为准。

`dist/client/build-info.json` 应包含：

- `routes`：110 条唯一入口（7 服务入口 + 83 学院入口 + 20 案例入口）。
- `academy.contentRoutes`：82。
- `agentCases.prefix`：`/agent-cases/`。
- `agentCases.contentRoutes`：20。
- `agentCases.languages`：`["zh-CN", "en"]`。

CI 为只读验证与静态产物打包，不负责生产部署。该分支的验证 workflow 上传 `fde-services-academy-agent-cases`，内容为完整的 `dist/client/`，不是源码。

可对正在运行的本地组合预览增加 HTTP 验收：

```powershell
$env:TEST_BASE_URL='http://127.0.0.1:4179'
npm test
```

## 发布契约

1. 获得当前生产发布授权后，确认现有托管方式和可回滚版本。
2. **只发布完整 `dist/client/`**。不要用独立的 `agent-cases/site/` 覆盖域名根目录，不发布仓库源码、`dist/server/` 或 `academy/dist/`。
3. 目录请求通过 `index.html` 提供页面；无尾斜线的目录跳转保留 query。深层案例刷新不能 404。
4. 主站、学院和案例未知路径都必须返回 HTTP 404；禁止任何将未知路径作为首页 200 返回的 SPA fallback。案例可使用根 `404.html`。
5. HTML、CSS、JS、SVG、WebP、字体、Markdown、PDF、ZIP 类型正确。没有文件名 hash 的案例资源不可设置长期 immutable 缓存。
6. 使用既有原子发布/回滚机制，不改变域名、TLS、现有服务路由或无关系统。构建失败时不上传半成品。

## 上线验收清单

| 检查 | 预期 |
| --- | --- |
| 主站双语导航和页脚 | 「Agent 案例 / Agent Cases」按当前语言进入正确首页 |
| 原首页两个主 CTA | 仍进入流程 / Playbook，不被案例替换 |
| 九个 Play 与 66 个 More | 搜索、筛选、标签、深链和语言切换保留 |
| 四类关联案例入口 | 随 Play 变化，进入 Oliva、Ruby、Bella / Velia、Steve 的对应语言 |
| `/agent-cases/`、`/agent-cases/en/` | 各九案，分类筛选可恢复全部 |
| `/agent-cases/cases/bella/` 及八案；英文对应路径 | 直接打开、刷新、返回及相关推荐可用 |
| 案例中英文切换 | 保留案例与章节；图解和 18 份工作表跟随语言 |
| 图解与报告 | 放大、缩放、Escape 关闭/焦点返回、展开报告和 Ruby pitch 正常 |
| 返回 FDE 服务 | 仍在当前域名的对应服务语言；本地预览不会跳到生产域名 |
| 学院课程、搜索、画板、实验与下载 | 原有交互及深链均保留，搜索结果在 `/academy/` 内 |
| sitemap / canonical / hreflang | 20 条案例路径加入根站点地图，正确正式域名，无 localhost |
| `/missing/`、`/academy/missing/`、`/agent-cases/missing/`、`/agent-cases/fr/` | 真正 HTTP 404 |
| 私有与源码路径 | `/agent-cases/tools/build.mjs`、`/agent-cases/content/cases.mjs`、`/.env` 不公开 |
| 375 / 768 / 1440 与键盘 | 新标签无整页溢出，按钮文字清楚，可通过 Tab / Enter 操作 |

## 后续维护入口

- `agent-cases/README.md`、`agent-cases/AGENTS.md`：案例模块规则。
- `agent-cases/content/` 与 `content/en/`：中英文业务叙事、图注、提案与报告选读。
- `agent-cases/reference/series/brand-palette.css`：最后加载的共享配色层。
- `agent-cases/tools/case-boards.mjs`：双语 SVG 配色与图解内容。
- `lib/agent-cases.ts`：语言路径和场景关联。
- `components/fde/shell.tsx`、`case-links.tsx`：导航与场景入口。
- `scripts/assemble-agent-cases.mjs`、`finalize-static.mjs`：组合构建与元信息。
- `scripts/test-agent-cases-integration.mjs`：组合路由、下载、语言、引用及 HTTP 测试。

正文只使用已审查的匿名案例与公开素材；不恢复客户或真实 Agent 身份。图解和重写提案用于解释方法，不冒充客户原系统、历史邮件或效果证明。不能将交付材料当作销售业绩。

保留原依赖版本与锁文件。依赖安装若报告安全公告，先评估受影响路径，单独安排升级与回归；不将“构建通过”描述为全量安全认证。记录真实 commit、CI、完整构建、浏览器验收、实际发布状态及可回滚版本。

本轮 `npm audit`（2026-09-10，完整依赖树）报告 17 项：9 high、7 moderate、1 low，来自既有 Vinext/Vite、RSC、图像处理及网络构建依赖链。本次没有新增外部依赖或修改 lockfile；没有运行 `npm audit fix --force`。当前发布物是静态文件，不能据此认定这些构建/开发依赖已无风险。不要公开开发服务器或发布 `dist/server`；部署负责人应将依赖升级作为单独的安全维护工作处理。
