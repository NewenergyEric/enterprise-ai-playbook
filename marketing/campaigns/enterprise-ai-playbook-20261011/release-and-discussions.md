---
type: release-and-discussion-drafts
campaign: enterprise-ai-playbook-20261011
date: 2026-10-11
status: draft
---

# Release 与 Discussion 草稿

**尚未创建 tag、Release 或 Discussion，未启用 Discussions。** 用户确认发布动作后才执行。`v1.0.0` 仅为 Brief 提出的候选标签；发布时由维护者确认标签名、目标提交及该提交的 CI，不改变当前包版本，也不代表生产认证。

## Release title · 候选标题

Enterprise AI Playbook — workflows and FDE Academy / 企业 AI 工作流程与 FDE 学院

## Release notes · English

Enterprise AI Playbook connects enterprise AI tasks with the decisions, artifacts and reviews needed to carry the work through. [Read the guide](https://fde.aielsen.com/en/?utm_source=github_release&utm_medium=referral&utm_campaign=enterprise_ai_playbook) or [start FDE Academy](https://fde.aielsen.com/academy/en/?utm_source=github_release&utm_medium=referral&utm_campaign=enterprise_ai_playbook).

This repository presentation update makes English the default README, keeps a full Chinese edition and preserves the previous English link. The opening explains the curator's purpose, practical learning paths and the learning/commercial-use boundary. Website source includes clearer bilingual metadata, Academy language alternates, social previews and GitHub footer links; these changes require a separate deployment to appear on the live site.

The integrated learning materials include:

- A six-step workflow with critical decisions and handoff artifacts.
- Nine business plays and 66 application scenarios for learning and analysis.
- A 12-week FDE Academy with a synthetic project, exercises, worksheets and capstone review guidance.
- Nine anonymized Agent workflow cases, with their existing evidence and limitations.

The 66 scenarios are not 66 validated customer deployments. Expanded lecture notes are currently Chinese; English pages provide summaries, cases, boards and practice guidance. Exercises use synthetic data and local simulations. There is no hosted model service, LMS, formal accreditation or guaranteed business result. Optional Toolkit contact collection remains disabled without separately approved endpoint and privacy URLs; private Toolkit materials are not included.

Original materials retain **AIelsen Learning and Evaluation License 1.0**. Personal learning, corporate internal learning and non-production evaluation are permitted. Production, paid training/consulting deliverables, resale and SaaS require written commercial authorization. This is source-available, not MIT or OSI open source. Third-party materials retain their own rights.

Known risk: [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) remains documented under a scoped build-only exception expiring **2026-10-24**. It is not fixed by this presentation update. Recheck advisories and exact-commit CI before publishing this release. Publishing a GitHub release does not deploy the production website.

## Release notes · 中文

Enterprise AI Playbook 把一项企业 AI 任务，与推进它所需的判断、产物和评审连接起来。[在线阅读指南](https://fde.aielsen.com/zh/?utm_source=github_release&utm_medium=referral&utm_campaign=enterprise_ai_playbook)，或[进入 FDE 学院](https://fde.aielsen.com/academy/zh/?utm_source=github_release&utm_medium=referral&utm_campaign=enterprise_ai_playbook)。

本次仓库展示调整将英文设为默认 README，保留完整中文版及旧英文链接。开头补充整理目的、学习路径和学习/商业使用边界。网站源码补充双语元数据、学院语言声明、分享预览和 GitHub 页脚入口；这些网站改动须另行部署才会在线上生效。

已整合的学习材料包括：

- 六步工作流程，以及各步的关键判断与交接产物。
- 9 个业务 Play、66 个学习与分析用应用场景。
- 12 周 FDE 学院：合成项目、实训、工作表与答辩评审指南。
- 9 个匿名 Agent 工作案例，保留原有证据与能力边界。

66 个场景不是 66 个已验证客户案例。扩展详细讲义当前为中文；英文提供概要、案例、画板和实作指导。练习采用合成数据和本地模拟，不提供线上模型服务、LMS、认证或业务成效保证。Toolkit 联系收集在未经单独确认的 endpoint 与 privacy URL 缺失时保持禁用，私有 Toolkit 材料不在公开内容中。

原创内容继续采用 **AIelsen Learning and Evaluation License 1.0**。个人学习、企业内部学习及非生产评估获许可；生产、收费培训或咨询交付、转售、SaaS 须书面商业授权。项目源码可见，不是 MIT 或 OSI 开源许可；第三方材料权利另行保留。

已知风险 [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) 的构建专用例外到期日仍为 **2026-10-24**，本次展示优化没有修复该漏洞。正式发布前必须复核依赖公告和目标提交的 CI。发布 GitHub Release 不等于部署生产网站。

## Discussion 1 · 从哪项工作开始 / Choose a first task

**English title:** What is the first enterprise task you would connect with AI?

Pick one repeatable task you can describe without sharing customer information. What starts it? What inputs are available? Where is judgment required? Who takes the next step, and what observable state means the work is complete?

Try this structure:

- Task and intended user:
- Inputs and evidence available:
- Critical decision or exception:
- Human handoff:
- Acceptance evidence:
- What remains unverified:

You can use the [six-step workflow](https://fde.aielsen.com/en/process/?utm_source=github_discussion&utm_medium=community&utm_campaign=enterprise_ai_playbook) or the W01 project-fit exercise to frame your answer. Use a synthetic or safely anonymized example. The goal is a task we can inspect together; please leave out customer records, credentials and private materials.

**中文标题：** 你想先用 AI 接起哪一项企业工作？

选一项反复发生、可以在不暴露客户信息的前提下说明的任务。它由什么触发？有哪些输入？哪一步需要判断？谁接下一步？出现什么可观察的结果，才算完成？

- 任务与使用者：
- 可用输入与证据：
- 关键判断或异常：
- 人工交接：
- 验收证据：
- 尚未验证的部分：

可以参考[六步工作流程](https://fde.aielsen.com/zh/process/?utm_source=github_discussion&utm_medium=community&utm_campaign=enterprise_ai_playbook)或 W01 项目判断练习，使用合成或安全匿名化的例子。希望把问题写成大家能够一起检查的任务，请勿提交客户记录、凭据或私有材料。

## Discussion 2 · 评审一个产物 / Review an artifact

**English title:** Which evidence would let someone else reproduce your AI delivery exercise?

Choose one Academy exercise and one artifact: a metric contract, tool trace, failure test or handoff note. Describe what you tested, the result you observed, and what you have not established yet.

In particular, distinguish a mechanism test from a model-task result and from a business outcome. What evidence is missing for the next person to reproduce the work? Use the [capstone guide](https://fde.aielsen.com/academy/en/guide/?utm_source=github_discussion&utm_medium=community&utm_campaign=enterprise_ai_playbook) as a review aid. Synthetic examples and concise, non-sensitive excerpts are enough.

**中文标题：** 哪些证据能让别人复现你的 AI 交付练习？

选一项学院练习和一份产物，例如指标契约、工具轨迹、失败测试或交接说明。说明你测了什么、观察到什么，以及还没有证明什么。

请把机制测试、模型任务结果和业务效果区分开。下一位实践者要复现这项工作，还缺哪些证据？可以使用[答辩评审指南](https://fde.aielsen.com/academy/zh/guide/?utm_source=github_discussion&utm_medium=community&utm_campaign=enterprise_ai_playbook)辅助检查。提供合成例子和不含敏感信息的简短片段即可。
