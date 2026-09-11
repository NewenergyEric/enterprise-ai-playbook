# FDE Toolkit 入口 · 给部署 Agent

这是现有完整网站上的增量入口，不复制 Skill 正文进营销网站，不替代学院、案例或 Playbook。

## 仓库与分支

- 网站：`NewenergyEric/FDE-web`，完整交付分支仍为 `feat/agent-cases-20260910`。
- 工具包：`NewenergyEric/AIelsen-FDE-Toolkit`，独立维护与发布。
- 网站唯一发布物仍为 `dist/client/`；入口路由总数仍为 110。
- 主站 `main` 的 README 只更新工具包链接，不能拿旧业务代码替换完整交付分支。

## 已接入位置

主导航和页脚新增「FDE 工具包 / FDE Toolkit」，进入当前语言首页 `#toolkit`。首页在学院专区之后、FAQ 之前加入两条工作流程说明与工具包仓库入口。

中文仓库入口打开 README 首页；英文打开 `README.en.md`。**工具包当前为私有协作预览**，按钮旁已注明 GitHub 访问权限要求。普通访客可阅读站内介绍，但不宣称所有人都能打开私有仓库。以后是否公开由维护者决定，不自动改可见性。

## 更新与验证

沿用 [完整发布说明](DEPLOY-AGENT-CASES.md) 的干净检出与构建方法：

```sh
npm ci
npm run check
npm run build
npm test
npm run preview
```

设置 `SITE_URL=https://fde.aielsen.com`。只在获得生产部署授权后发布完整 `dist/client/`；本次 GitHub 更新不包含部署、DNS 或服务器修改。

额外验收：中英文导航到达本语言 `#toolkit`；两条工作路径完整；按钮目的地和权限说明正确；375/768/1440 布局无横向溢出；原首页 CTA、九个 Play、66 个 More、学院与九案保留；未知 URL 仍为真实 404。

维护文件：`components/fde/toolkit.tsx`、`home.tsx`、`shell.tsx` 和 `app/globals.css` 的 toolkit 样式段。没有新增运行依赖或修改 lockfile。

## 本次已验证（2026-09-12）

- 构建及项目检查通过；仍有此前案例模块的 16 项匿名默认导出 lint 警告，本次没有修改这些内容。
- 中英文、375 / 768 / 1440 六个布局通过本地 Chrome 检查，无页面报错、失败资源请求或横向溢出；六个主导航目的页均返回 200，未知页返回 404。
- 工具包导航跳转、键盘离开 CTA、语言切换与 GitHub 目标链接检查通过；正文、说明、卡片正文和 CTA 的计算对比度达到普通文本 4.5:1。
- 人工查看截图后修正了一处背景色值被用作文字色的问题，并补入回归检查。
- 以上为本地预览检查；没有宣称真实用户 Core Web Vitals、全站 WCAG 认证或已部署线上。
