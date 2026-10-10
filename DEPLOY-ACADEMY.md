# FDE 学院集成 · 给部署 Agent 的执行说明

## 目标与边界

仓库：`https://github.com/NewenergyEric/enterprise-ai-playbook`

交付分支：`feat/fde-academy-20260908`

目标域名：`https://fde.aielsen.com`

发布目录：**`dist/client`**

这是现有服务站的增量升级，不是替换。主站继续面对企业客户，学院独立承接 FDE 工程师、解决方案架构师和交付团队。用户安排另一位 Agent 执行部署；本次代码交付不修改生产服务器、域名或 DNS。

先读取 `AGENTS.md`。从该分支构建，或经过审核合并到主分支后构建；不要直接从旧 main 部署。先核对工作区与远端，存在其他更新时正常合并并重跑测试，不要强推或覆盖。

## 页面具体放在哪里

| 位置 | 这次已经实现的变更 | 保留不动的内容 |
| --- | --- | --- |
| 全站顶部导航末尾 | `FDE 学院 / FDE Academy` → 对应语言的学院首页 | 原价值、流程、Playbook 与语言切换 |
| 首页 `#resources` 后、`#faq` 前 | `#academy` 图文专区：课程插画、画板预览、12 周 / 24 画板 / 19 案例与实作；学院与课程大纲入口 | 首屏两个业务 CTA、原 PDF 资源、FAQ、试点简报 |
| 流程页六个阶段内 | 各有对应工程课程入口，分别映射 W01、W02、W05、W08、W07、W11 | 六阶段的原业务说明与验收内容 |
| Playbook 每个场景内 | 试点说明下方的“相关实训”：教学案例 + 对应工程课程，随选中场景切换 | 九个场景、66 个 More 应用、原标签与交互 |
| 全站页脚 | 学院、企业共训入口 | 原服务、资源、边界说明 |
| 学院顶部 / 页脚 | 返回对应语言的 FDE 服务页 | 学院自己的课程、案例、实验、搜索导航 |

学院页面不使用业务站的 CSS/JS；教学长文、24 张双语画板及放大交互保持独立。公开案例不被当作自有客户成绩；练习数据是合成示例。

## 部署命令

使用 Node 24 LTS。Windows 本地验证版本为 24.19.0；避免已知有 native shutdown 问题的 Windows 24.13.0。以下命令在仓库根目录运行，不需要进入任何原始参考项目。

保留本分支更新后的 `package-lock.json`。其中已补齐全新环境所需的可选 WASM 依赖；不要换回旧 main 的锁文件，也不要用跳过依赖检查的方式掩盖安装失败。

```powershell
git fetch origin
git switch --detach origin/feat/fde-academy-20260908
$env:SITE_URL='https://fde.aielsen.com'
# Optional, only after endpoint/privacy review:
# $env:TOOLKIT_LEAD_ENDPOINT='https://your-approved-endpoint.example/lead'
# $env:TOOLKIT_PRIVACY_URL='https://your-approved-site.example/privacy/'
npm ci --ignore-scripts
npm run security:check
npm run security:audit
npm run check
npm run build
npm test
npm run preview
```

在 Linux/macOS 上把环境变量行改成 `export SITE_URL=https://fde.aielsen.com`。如果工作区不干净，使用新的检出目录，不要丢弃或覆盖已有修改。若部署平台只监听 main，审核合并该分支后再从 main 构建；不要为此擅自修改生产分支策略。

本地组合预览默认 `http://127.0.0.1:4179/`；`PORT` 可覆盖端口。`npm run dev` 也支持 `/academy/`，但修改学院源文件后需重启 dev。原独立预览端口不是这次组合部署的验收对象。

构建会执行：主站静态导出 → 学院独立构建与回归测试 → `/academy/` 链接和搜索适配 → 合并 sitemap → 最后写入完整构建标记。可在 `dist/client/build-info.json` 核对 **92 条入口路由，其中学院有 82 个内容页面和一个语言入口**。不要手工复制页面或单独覆盖学院目录来代替组合构建。

## 实际发布

1. 先确认现有托管方式与当前可回滚版本，不改域名、TLS、服务站根路由和无关服务。
2. **只发布 `dist/client` 的内容到现有站点的静态根目录。** 使用完整版本的原子切换或平台的版本发布，避免旧 HTML 与新 JS 混用。不要发布 `dist/server`、仓库源码、`academy/dist`、`work` 或 `tmp`。
3. 目录请求使用 `index.html`。直接打开/刷新课程深层 URL 必须工作；不要配置 `/* → /index.html` 的 SPA 兜底。
4. 不存在的主站和学院 URL 均返回真正的 HTTP 404。可对 `/academy/` 使用其 `404.html`，主站沿用根 `404.html`。若托管平台只支持一个错误页，可统一使用根错误页，但必须保留 404 状态。
5. 正确提供 `.js`、`.css`、`.svg`、`.woff2`、`.pdf`、`.zip` 的 MIME 类型。新学院脚本、搜索 JSON、SVG 和 PDF 没有文件名 hash，不能设置长期 immutable 缓存。`public/_headers` 包含建议规则；不支持该文件的平台需配置等价规则。
6. `SITE_URL` 必须只有域名，不能设置成 `https://fde.aielsen.com/academy`。根 `sitemap.xml` 已同时覆盖 8 个服务 / Toolkit 内容页和 82 个学院内容页；学院 canonical/hreflang 都包含 `/academy/`。不需要第二个子域名或第二套运行服务。

## 上线必须逐项验收

| 类型 | 地址 / 动作 | 预期 |
| --- | --- | --- |
| 原服务 | `/zh/`、`/en/` | 两个首屏 CTA 分别进入场景 / 流程，不是学院 |
| 原交付流程 | `/zh/process/`、`/en/process/` | 六个阶段保留，对应课程可打开 |
| 原 Playbook | `/zh/playbook/#business-analysis` | 原 More 与搜索正常，相关实训随场景变化 |
| 私有工具箱申请 | `/zh/toolkit/`、`/en/toolkit/` | 接收端或隐私说明 URL 缺失、无效时均不可提交；两项经审查配置后，只发送明确填写的联系方式与申请信息，不提供下载 |
| 场景切换 | 九个场景逐一选择，切换中文/英文 | 原场景 hash 保留，两个相关学习入口均有效 |
| 学院入口 | `/academy/` | 进入中文学院，有英文入口 |
| 双语首页 | `/academy/zh/`、`/academy/en/` | 图片、字体、样式正常，返回主站正常 |
| 深层课程 | `/academy/zh/curriculum/05/`、英文对应页 | 直接打开及刷新不 404；完整中文讲义保留 |
| 教学画板 | `/academy/zh/resources/#visual-atlas` | 24 张画板；放大、原尺寸、关闭/Esc、SVG 下载正常 |
| 全站搜索 | 学院 Ctrl K / 搜索按钮，搜索“语义”或 `ontology` | 加载 `/academy/assets/search-*.json`，结果仍进入 `/academy/` |
| 实验 | `/academy/zh/labs/` | 交互运算、拒绝/重放等演示正常，无外部模型请求 |
| 营销 PDF | `/academy/downloads/AIelsen-FDE-Academy-Brochure.pdf` | 真实 PDF，可打开与下载 |
| 工程实训 ZIP | `/academy/downloads/fde-practice-kit.zip` | 可下载解压，不是 HTML 错误页 |
| 企业共训 | `/academy/zh/enterprise/` | 本地需求简报生成，不冒充在线提交 |
| SEO | `/sitemap.xml`、课程与 Toolkit canonical/hreflang | 正式域名 + 正确路径，无 localhost |
| 错误页 | `/not-a-page/`、`/academy/not-a-page/` | HTTP 404，不伪装为首页 200 |
| 设备 | 桌面、平板、手机；键盘 Tab / Enter / Esc | 可见入口、无横向溢出、画板可关闭 |

可选自动 HTTP 验收（对本地或获授权的预发布站）：

```powershell
$env:TEST_BASE_URL='http://127.0.0.1:4179'
npm test
```

记录实际构建 commit、部署地址、验收结果与回滚版本；不要把仅完成 GitHub 推送描述为已经上线。发布失败时切回前一份完整部署产物，不删除原服务站，不重置其他人的代码。

## 以后如何更新

学院的后续内容维护以本仓库 `academy/` 为准。页面源文件、画板源文件和构建脚本都已提供，部署 Agent 不需要访问原作者电脑上的资料目录。详细编辑位置见 `academy/README.md`。

本次保留现有营销 PDF 和课程细节，不宣称完整英文详细讲义、账号系统、在线评审或正式认证已经存在。浏览器学习进度属于本地存储：从本地预览换到正式域名时不会自动迁移。
