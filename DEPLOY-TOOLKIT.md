# 工具包与业务网站隔离 · 给部署 Agent

更新于 2026-09-12：按项目所有者要求，**撤回工具包的网站入口**。工具包单独保留在私有 GitHub 仓库，不放进业务网站。本文替代此前的入口部署说明。

## 必须保留的边界

- 网站主导航、首页和页脚不展示 FDE Toolkit，不提供其 GitHub 或下载入口。
- 不把 Skill 正文、目录、ZIP、私有材料或工具包资产复制到网站发布物。
- 独立仓库 `NewenergyEric/AIelsen-FDE-Toolkit` 与业务网站分开维护。入库前先核对重复内容与隐私；不默认扩大公开范围。
- 保留服务页、学院、九个 Agent 案例、中英文切换、9 个 Play 和 66 个 More。总路由仍为 110。

## 正确的网站版本

使用 `NewenergyEric/enterprise-ai-playbook` 的 `feat/agent-cases-20260910` 分支最新提交，必须包含本次撤回。公开的是网站仓库，不是独立私有工具包。不要使用此前加入工具包入口的旧构建；也不要用 main 的旧业务代码替代完整网站分支。

沿用[完整部署说明](DEPLOY-AGENT-CASES.md)。本次只更新 GitHub 和本地预览，不部署生产、不修改 DNS 或服务器。

```sh
npm ci --ignore-scripts
npm run security:check
npm run security:audit
npm run build
npm run check
npm test
npm run preview
```

设置 `SITE_URL=https://fde.aielsen.com`，只在获得部署授权后发布完整 `dist/client/`。先重新构建可替换旧的本地导出，避免将上一个版本的工具包入口带到生产。

## 验收

`scripts/test-toolkit-boundary.mjs` 检查网站源文件和发布目录，禁止私有工具包 URL、组件与入口回流。预览中英文首页：主导航只保留原五项，不存在工具包专区或页脚入口；原有课程和案例照常可达；未知 URL 返回真实 404。
