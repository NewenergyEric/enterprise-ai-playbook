<p align="center">
  <img src="docs/media/fde-cover.png" alt="AIelsen FDE — 从业务现场到可验收的 AI 交付：发现问题、工程实现、验证结果、复用能力。" width="100%">
</p>

<p align="center">
  <strong>中文</strong> · <a href="README.en.md">English</a><br>
  <a href="https://fde.aielsen.com/zh/">FDE 服务站</a> ·
  <a href="https://github.com/NewenergyEric/FDE-web/tree/feat/fde-academy-20260908/academy">学院课程源码</a> ·
  <a href="https://github.com/NewenergyEric/FDE-web/blob/feat/fde-academy-20260908/DEPLOY-ACADEMY.md">部署指南</a> ·
  <a href="https://github.com/NewenergyEric/FDE-web/actions/workflows/verify.yml?query=branch%3Afeat%2Ffde-academy-20260908">构建验证</a>
</p>

# AIelsen FDE

**把业务问题讲清楚，把系统做进真实工作，把交付变成团队能力。**

FDE（Forward Deployed Engineer，前线部署工程师）的工作，不止于让模型回答问题：还要理解现场、定义指标、接通数据与工具，并拿出业务和工程都能检验的结果。

这个项目把这套工作方式做成两个相互连接的入口：面向企业的 **FDE 服务与 Playbook**，以及面向工程师和交付团队的 **FDE Academy**。前者说明值得做什么、怎样交付；后者训练如何判断、实现、验证和复盘。

> **完整版本入口：** 服务站与学院的集成代码位于 [`feat/fde-academy-20260908`](https://github.com/NewenergyEric/FDE-web/tree/feat/fde-academy-20260908)。本次 `main` 的更新仅涉及仓库展示文档，不代表学院代码已合并或线上站点已更新。请按下方命令获取完整版本。

## 从你关心的问题开始

| 你是谁 | 你想解决什么 | 从这里开始 |
| --- | --- | --- |
| 企业业务负责人 | 哪些 AI 应用能进入真实工作？如何界定试点与验收？ | [业务 Playbook](https://fde.aielsen.com/zh/playbook/) · [六阶段交付流程](https://fde.aielsen.com/zh/process/) |
| FDE / AI / 数据工程师 | 怎样把访谈、数据、Agent、评估与生产交付连起来？ | [12 周课程与讲义](https://github.com/NewenergyEric/FDE-web/tree/feat/fde-academy-20260908/academy/content/notes) · [工程实训包](https://github.com/NewenergyEric/FDE-web/tree/feat/fde-academy-20260908/academy/practice-kit) |
| 解决方案负责人 / 培训组织者 | 如何培养可独立交付的人，而不只培训工具操作？ | [培训介绍 PDF](https://github.com/NewenergyEric/FDE-web/blob/feat/fde-academy-20260908/academy/public/downloads/AIelsen-FDE-Academy-Brochure.pdf) · [学院内容说明](https://github.com/NewenergyEric/FDE-web/blob/feat/fde-academy-20260908/academy/README.md) |
| 开发者 / 部署 Agent | 如何接手、验证和增量发布，同时保留业务站？ | [部署与验收清单](https://github.com/NewenergyEric/FDE-web/blob/feat/fde-academy-20260908/DEPLOY-ACADEMY.md) · [协作规范](CONTRIBUTING.md) |

## 一个项目，两条路径

| FDE 服务与 Playbook | FDE Academy |
| --- | --- |
| **从业务价值进入** | **沿完整交付过程训练** |
| 6 阶段交付流程，明确各阶段的工作和交付物 | 12 周课程，100 节中文详细讲义 |
| 9 个核心场景，66 个嵌入场景内的 More 应用 | 19 个双语案例与实作：9 个公开案例 + 10 个合成场景 |
| 业务问题 → 输入 → 工作方法 → 产出 → 试点评估 | 24 张双语教学画板，6 个交互实验 |
| 市场进入、客户开发、达人合作、内容生产、一线服务、经营分析、库存规划、情报和知识复用 | 30 个概念、22 项一手阅读资料、每种语言 16 份可编辑工作表 |
| 独立的流程 / Playbook 参考 PDF 与试点简报模板 | 57 项案例关联作业、离线 Python 工程包与 12 页培训介绍 PDF |

这些数字是内容规模，不是客户数量、落地项目数量或效果承诺。学院有中英文页面、案例和画板；**100 节扩展讲义目前为中文**，英文课程提供概要与实作指导。

## 学的是交付，不只是知识点

课程沿着一个合成的业务任务推进：从会员运营问题与数据核对，走到建议型 Agent、受控业务动作、上线验收与资产复用。

| 阶段 | 关键判断 | 要交出的东西 |
| --- | --- | --- |
| **W01–03 · 判断问题** | 值不值得做？谁在做决定？指标与范围是否说清楚？ | 项目判断书、事实账本、指标契约、范围说明 |
| **W04–06 · 建立链路** | 数据能否支持判断？业务语义是否一致？边界放在哪里？ | 数据适配器、质量报告、本体与工具、安全测试 |
| **W07–09 · 工程交付** | 如何定位失败？写入结果未知怎么办？上线后谁来处理故障？ | 评估集与运行器、动作连接器、执行轨迹、运行手册 |
| **W10–12 · 验收与复用** | 效果如何解释？哪些工作只属于这次客户适配？ | 验收证据包、复盘报告、分层资产清单、结业作品 |

### 教学画板预览

下面是课程中的原始画板，可点击查看完整尺寸。它们把数据、工具和工程判断的关系画出来，再回到讲义中实现和验证。

| Agent 评估：把失败定位到正确的一层 | 执行动作：超时不等于没有执行 |
| --- | --- |
| [![课程画板：数据、工具、模型任务与业务使用分层评估](docs/media/evals-zh.svg)](docs/media/evals-zh.svg) | [![课程画板：提交后的成功、失败、未知与回查状态](docs/media/states-zh.svg)](docs/media/states-zh.svg) |
| 对应 **W07**：不同层的通过条件不同，不能只看一个总分。 | 对应 **W08**：区分状态，先回查，再决定是否重试。 |

### 案例如何使用

每个案例都按 **业务问题 → 发现过程 → 关键行动 → 判断取舍 → 示例 → 章节作业 → 验收 → 可复用资产** 展开。

例如：从航空运营的数据协同讨论业务对象与适配边界；从企业知识应用讨论检索和分层评估；从服务型助手讨论任务解决率与升级路径。配套实作覆盖市场研究、客户研究、投放复盘、经营分析、服务与知识反馈等工作。

公开事实保留来源，课堂推演明确标注；合成数据用于练习，不冒充真实客户记录。[查看案例内容](https://github.com/NewenergyEric/FDE-web/tree/feat/fde-academy-20260908/academy/content) · [下载培训介绍 PDF](https://github.com/NewenergyEric/FDE-web/blob/feat/fde-academy-20260908/academy/public/downloads/AIelsen-FDE-Academy-Brochure.pdf)

## 本地启动完整版本

使用 **Node.js 24.19+** 和 npm。建议检出到新目录，不覆盖已有工作区。

```sh
git clone --branch feat/fde-academy-20260908 https://github.com/NewenergyEric/FDE-web.git
cd FDE-web
npm ci
npm run check
npm run build
npm test
npm run preview
```

仓库目前为私有，克隆需要访问权限。预览地址为 `http://127.0.0.1:4179`。

| 内容 | 中文路径 | English path |
| --- | --- | --- |
| 服务站 | `/zh/` | `/en/` |
| 交付流程 | `/zh/process/` | `/en/process/` |
| 业务 Playbook | `/zh/playbook/` | `/en/playbook/` |
| 学院 | `/academy/zh/` | `/academy/en/` |
| 课程 / 案例 / 教学资源 | `/academy/zh/curriculum/` · `/academy/zh/cases/` · `/academy/zh/resources/` | 对应 `/academy/en/` 下的同名路径 |

开发模式：`npm run dev -- --host 127.0.0.1 --port 4178`。修改学院源文件后重启开发服务；完整验收以组合静态构建为准。

## 给维护者和部署 Agent

- **一次构建，一个发布目录：`dist/client`。** 学院增量接入 `/academy/`，与业务站的样式、脚本保持独立。保留原业务 CTA、9 个场景和 66 个 More 应用。
- 正式构建前设置 `SITE_URL` 为 HTTPS 域名，不附加 `/academy`。深层路由直接访问应可用，未知路径必须返回真实 404，不用 SPA 首页兜底。
- 技术构成：React / TypeScript / Vinext 服务站 + 原生 JavaScript 静态学院。运行网站无需模型密钥、数据库或后端服务；Python 仅用于离线工程练习和可选 PDF 维护。
- 内容、站内链接、双语字段、画板和静态输出由自动测试检查；视觉、键盘交互和实际部署仍需按清单验收。

[部署操作与验收](https://github.com/NewenergyEric/FDE-web/blob/feat/fde-academy-20260908/DEPLOY-ACADEMY.md) · [静态托管要求](https://github.com/NewenergyEric/FDE-web/blob/feat/fde-academy-20260908/DEPLOYMENT.md) · [学院编辑地图](https://github.com/NewenergyEric/FDE-web/blob/feat/fde-academy-20260908/academy/README.md) · [协作规范](CONTRIBUTING.md)

## 内容使用与边界

这是服务介绍与工程培训网站，不是生产 Agent 执行平台，也不包含学员账号、云端学习记录或正式认证服务。学习进度和笔记保存在当前浏览器。

仓库不收录私有客户资料或原始研究材料；公开案例不代表与相关企业存在合作或背书。服务分层是模块化交付设计，不表示所有模块都已成为可直接购买的标准产品。

原始课程、文案与设计**尚未授予开源许可**；第三方依赖和字体保留各自许可。[内容规范](CONTENT-NOTES.md) · [素材来源](ASSETS.md)
