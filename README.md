<h1 align="center">Enterprise AI Playbook</h1>
<h2 align="center"><a href="https://fde.aielsen.com/">在线阅读完整指南 ↗ fde.aielsen.com</a></h2>
<p align="center"><strong>企业 AI 应用与落地指南 · 工作流程、关键判断与 FDE 实战训练</strong></p>
<p align="center"><strong>中文</strong> · <a href="README.en.md">English</a></p>

<p align="center">
  <a href="https://fde.aielsen.com/academy/zh/"><strong>进入 FDE 学院</strong></a> ·
  <a href="https://fde.aielsen.com/academy/zh/curriculum/">12 周课程</a> ·
  <a href="https://fde.aielsen.com/zh/process/">工作流程</a> ·
  <a href="https://fde.aielsen.com/zh/playbook/">业务 Playbook</a> ·
  <a href="https://fde.aielsen.com/agent-cases/">Agent 案例</a>
</p>

<p align="center">
  <a href="https://fde.aielsen.com/"><img src="docs/media/fde-motion-zh.gif" alt="进入完整指南：从资料和业务判断，到 Agent 工作链、可验收成果与可复用方法。" width="100%"></a>
</p>
<p align="center"><sub>工作方法动态示意 · <a href="docs/media/fde-motion-zh.png">静态版</a> · <a href="https://fde.aielsen.com/academy/zh/resources/#visual-atlas">浏览教学画板</a></sub></p>

企业里真正难的，往往不是让模型多答一个问题，而是把一项工作接起来：**输入从哪里来，关键判断依据什么，谁负责下一步，结果怎样才算完成。**

这份指南由 AIelsen 整理，把企业 AI 交付拆成可以学习、动手和检查的工作方法。你可以先找业务切入点，也可以沿 FDE 学院的项目主线，练习把已有产品适配成可验证的业务能力。

| 你要解决的问题 | 从这里开始 |
| --- | --- |
| 想系统学习企业 AI 交付 | [FDE 学院：课程、讲义、作业与工程实训](https://fde.aielsen.com/academy/zh/) |
| 已有原型，希望补齐数据、工具、评估与运行能力 | [12 周工程路线](#fde-academy) · [详细学习指南](docs/FDE-ACADEMY.md) |
| 想找到具体业务中的 AI 机会 | [9 类场景、66 个场景内 More 应用](https://fde.aielsen.com/zh/playbook/) |
| 想看工作怎样从需求走到产出 | [六步工作流程](#workflow) · [Agent 案例](#agent-cases) |

<a id="workflow"></a>

## 一条工作链，六个关键判断

FDE（Forward Deployed Engineer，前线部署工程师）连接业务现场、产品和工程。每一步都要留下能够被下一步使用的产物，而不只是会议结论。

| 阶段 | 具体工作 | 关键判断 | 留下什么 |
| --- | --- | --- | --- |
| **01 选准业务问题** | 回看一次真实任务，明确使用者、输入、现状与约束 | 问题值得做吗？简单规则或脚本是否已经足够？ | 机会与范围卡、基线、不做清单 |
| **02 还原真实工作** | 让使用者演示工作，记录事实、分歧、例外和交接 | 真正依赖经验的是哪一步？缺的是信息，还是判断？ | 工作图、事实账本、角色与责任 |
| **03 沉淀专业方法** | 将经验写成输入要求、判断规则、样例、反例与工具契约 | 方法能否在新样本上成立？哪些规则不能交给模型猜？ | Skill 规格、证据要求、验证样本 |
| **04 组装完整工作链** | 连接数据、业务语义、工具和工作入口 | 什么时候澄清、调用工具、停止或交给人？ | 数据适配器、业务工具、首份产物与运行轨迹 |
| **05 用任务验证** | 用相同材料比较质量、耗时、返工、成本与最终状态 | 是回答好看，还是任务真的完成？失败发生在哪一层？ | 评估集、版本报告、失败样本与改进清单 |
| **06 交接并复用** | 明确版本、依赖、维护责任，区分客户配置与通用能力 | 哪些可复用，哪些必须重配，哪些不应公开？ | 运行手册、资产清单、产品反馈与迁移条件 |

[展开六步流程与交付物 →](https://fde.aielsen.com/zh/process/)

<a id="fde-academy"></a>

## FDE 学院：用一个项目练完整交付

**从“会用模型”，到能解释并完成一次企业 AI 交付。**

学院面向 FDE、解决方案架构师、数据与 Agent 工程师，以及需要参与需求和验收的业务团队。主线是一个贯穿 12 周的**合成连锁零售会员运营项目**：

> 业务希望改善复购，但 CRM 与 POS 身份不一致，运营不信任人群，IT 关心权限和运行责任。你要先把数据与指标说清，再交付建议型 Agent，随后验证受控执行、故障恢复与项目验收。

这里的训练对象不是“做一个聊天页面”，而是一条可追溯链路：**业务问题 → 数据与语义 → Agent 工具 → 评估与受控执行 → 验收与产品反馈**。

<p align="center">
  <a href="https://fde.aielsen.com/academy/zh/curriculum/"><img src="docs/media/badge-academy.svg" alt="12 周 FDE 课程"></a>
  <img src="docs/media/badge-bilingual.svg" alt="中文与 English">
</p>

### 12 周，每周都有要交出的东西

| 周次 / 课程 | 要做出的关键判断 | 工程与交付成果 |
| --- | --- | --- |
| [W01 · FDE 职责与项目判断](https://fde.aielsen.com/academy/zh/curriculum/01/) | 值不值得做？标准产品适配在哪里，缺口在哪里？ | 项目判断书、Fit/Gap 清单、教学环境自检 |
| [W02 · 现场访谈与业务建模](https://fde.aielsen.com/academy/zh/curriculum/02/) | 如何把不同角色的说法转成事实、冲突和待验证项？ | 访谈证据账本、角色地图、业务对象草图 |
| [W03 · 业务指标与交付范围](https://fde.aielsen.com/academy/zh/curriculum/03/) | 分母、观察窗与排除规则是什么？什么不在本期？ | 指标契约、计算测试、范围与变更约定 |
| [W04 · 数据画像与客户适配](https://fde.aielsen.com/academy/zh/curriculum/04/) | 重复、缺失、退款、迟到数据怎样影响结果？ | 数据适配器、质量报告、隔离记录与对账结果 |
| [W05 · 业务本体与建议型 Agent](https://fde.aielsen.com/academy/zh/curriculum/05/) | 身份如何消歧？计算、检索与模型各负责什么？ | 本体与指标配置、分群/建议工具、Agent v1 任务轨迹 |
| [W06 · 数据安全与部署选型](https://fde.aielsen.com/academy/zh/curriculum/06/) | 哪些字段和工具允许被使用？权限在哪里真正执行？ | 数据流、权限模块、拒绝测试与架构取舍 |
| [W07 · Agent 评估与需求变更](https://fde.aielsen.com/academy/zh/curriculum/07/) | 怎样区分数据、工具、模型与业务标准的问题？ | 正常/边界/对抗评估集、运行器、版本比较与变更方案 |
| [W08 · 执行型 Agent 与业务闭环](https://fde.aielsen.com/academy/zh/curriculum/08/) | 如何避免重复执行？超时后怎样确认实际结果？ | 发券/标签模拟连接器、参数绑定、幂等与回查测试 |
| [W09 · 生产工程与上线评审](https://fde.aielsen.com/academy/zh/curriculum/09/) | 出错能否停下来、查清楚、恢复？成本是否算全？ | Trace、故障演练、灰度与回退方案、运行手册 |
| [W10 · 效果归因与项目验收](https://fde.aielsen.com/academy/zh/curriculum/10/) | 技术通过、业务采用和业务效果分别证明了什么？ | 分析脚本、对照与观察窗、三层验收材料 |
| [W11 · 交付复盘与产品化沉淀](https://fde.aielsen.com/academy/zh/curriculum/11/) | 什么属于客户专属、行业模板或产品通用改进？ | 复盘、资产分层、带复现的产品反馈、迁移分析 |
| [W12 · 结业答辩与能力复评](https://fde.aielsen.com/academy/zh/curriculum/12/) | 别人能否复现你的交付？新约束下还能否解释并修正？ | 完整证据包、正常与异常演示、作品说明与能力复评 |

### 看一个具体任务怎样被拆开

“找一批最近没来的会员，给运营一个建议。”在课程里，这句话会被拆成六项工作，而不是直接交给模型生成活动文案。

| 工作关键点 | 学员要完成的动作 |
| --- | --- |
| **先澄清业务含义** | 确认门店、截止日，以及“没来”按到店还是有效购买计算 |
| **再核对对象与数据** | 处理 CRM/POS 身份映射、退款与重复记录；未知值明确隔离 |
| **用业务工具提供证据** | `segment_members` 返回人群引用、排除原因、指标版本和证据快照 |
| **把建议和执行分开** | `propose_operation` 生成带约束的方案，不产生发券副作用 |
| **加入执行与异常处理** | 在本地模拟预览、确认、幂等、预算重检；超时先查状态，不盲目重发 |
| **最后证明结果** | 分开报告机制测试、真实模型轨迹、业务判断与尚未验证的部分 |

[进入 W05 建议型 Agent](https://fde.aielsen.com/academy/zh/curriculum/05/) · [继续 W08 执行动作](https://fde.aielsen.com/academy/zh/curriculum/08/)

### 两张画板，看清最容易混淆的工程问题

| 失败到底发生在哪一层？ | 请求超时，为什么不能直接重试？ |
| --- | --- |
| [![数据、工具、模型任务和业务使用的分层评估](docs/media/evals-zh.svg)](https://fde.aielsen.com/academy/zh/curriculum/07/) | [![执行状态、结果未知、回查与恢复](docs/media/states-zh.svg)](https://fde.aielsen.com/academy/zh/curriculum/08/) |

这对应课程中的两个要求：**不要用一段流畅回答代替最终状态检查；不要用平均质量分抵消越权或错误执行。**

### 不同角色，围绕同一份证据协作

| 角色 | 学习重点 | 应形成的成果 |
| --- | --- | --- |
| FDE / 解决方案 / 产品负责人 | 完整 12 周：诊断、适配、评估、交付与复用 | 可解释、可复现的交付作品 |
| 数据与 Agent 工程师 | W03–09、W12：契约、工具、模型接入、测试与运行 | 代码、测试、模型轨迹、故障恢复手册 |
| 营销 / 销售 / 运营 / 领域专家 | W02、03、05、07、08、10：任务规则与结果判断 | 任务规格、黄金样例、拒绝理由、业务评估表 |
| 业务负责人 / 管理者 | W01、03、09、10、11：投入、责任与验收 | 试点决策书、验收标准与责任约定 |
| 转型者 / 新进入企业 AI 交付者 | 补齐编程、SQL、API、Git 基础后进入主线 | 标明训练边界的作品集与能力差距清单 |

[学习前提与准备 →](https://fde.aielsen.com/academy/zh/paths/)

### 学习资料与工程实训

| 资料 | 怎样使用 |
| --- | --- |
| [100 个中文详细讲义单元](https://fde.aielsen.com/academy/zh/curriculum/) | 每周结合方法、接口、失败模式、必做作业与验收标准学习 |
| [19 个双语案例与业务实作](https://fde.aielsen.com/academy/zh/cases/) | 9 个公开案例 + 10 个合成实作，按问题、发现、行动、判断和课程作业拆解 |
| [24 张双语教学画板](https://fde.aielsen.com/academy/zh/resources/#visual-atlas) | 理解业务语义、工具、评估、执行状态、成本与资产分层，可放大和下载 |
| [6 个交互实验](https://fde.aielsen.com/academy/zh/labs/) | 修改合成输入，观察指标口径、安全门、成本、归因与动作边界 |
| [16 份双语工作表与 Python 实训包](https://fde.aielsen.com/academy/zh/resources/) | 从项目判断书做到证据索引；用 37 项离线测试检查工程机制 |
| [30 个概念与延伸阅读](https://fde.aielsen.com/academy/zh/glossary/) | 把术语放回业务与工程上下文，沿课程进入一手参考资料 |

工程包使用合成数据和本地模拟，不连接真实业务系统，也不内置真实模型。学员需自行在获授权环境完成模型接入，并把**机制测试结果与模型任务结果分开报告**。扩展讲义目前为中文；英文版提供课程概要、案例、画板与实作指导。

[阅读完整学习指南](docs/FDE-ACADEMY.md) · [查看结业答辩标准](https://fde.aielsen.com/academy/zh/guide/) · [下载学院介绍 PDF](https://fde.aielsen.com/academy/downloads/AIelsen-FDE-Academy-Brochure.pdf) · [规划团队共训](https://fde.aielsen.com/academy/zh/enterprise/)

<a id="agent-cases"></a>

## 从课程方法，回到具体工作

[业务 Playbook](https://fde.aielsen.com/zh/playbook/)围绕市场、获客、创作者合作、内容、客服、经营分析、门店运营、专家研究和企业知识展开。每个场景先回答“给谁用、用什么材料、交出什么”，再看场景内的 More 应用。

[Agent 案例集](https://fde.aielsen.com/agent-cases/)则展开连续工作过程：

| 案例 | 工作如何推进 | 值得复用的关键点 |
| --- | --- | --- |
| [Bella · 创意与整合营销](https://fde.aielsen.com/agent-cases/cases/bella/) | 需求 → 研究 → FAB → 策划与文案 → 分镜 → 成片对照 | 每轮修改如何回到原始需求与证据，而不只评价最后一张图 |
| [Ruby · 海外创作者合作](https://fde.aielsen.com/agent-cases/cases/ruby/) | 筛选频道 → 判断适配 → 个性化 pitch → 回复处理 → 商务交接 | 把“找到名单”推进到下一步可执行的合作判断 |
| [Oliva · 产品与售后客服](https://fde.aielsen.com/agent-cases/cases/oliva/) | 资料整理 → 检索依据 → 情境答复 → 人工修订 → 知识反馈 | 型号、版本与证据对应；纠错进入下一轮知识维护 |
| [Steve · 工程交接](https://fde.aielsen.com/agent-cases/cases/steve/) | 核对规则 → 找出差异 → 标明待验证项 → 留下交接材料 | 将“文档写了什么”与“系统实际上怎样做”分开验证 |

另有 Velia、Atlas、Nora、Leo、Iris，共 9 个匿名案例、20 个中英文页面、28 张双语图解与 18 份工作表。案例展示工作方法与产物，不将其等同于经独立验证的业务增益。

## 使用许可与参与

个人学习、企业内部学习及非生产评估可以使用；生产使用、收费培训/咨询交付、转售或 SaaS 须取得书面商业授权。项目采用 **AIelsen Learning and Evaluation License 1.0**，属于源码可见，不是 MIT 或 OSI 开源许可。

[使用边界](LICENSING.md) · [商业授权](COMMERCIAL.md) · [第三方材料](THIRD_PARTY_NOTICES.md) · [贡献指南](CONTRIBUTING.md) · [安全政策与私密报告](SECURITY.md)

已知依赖风险与审查范围见[安全审查记录](docs/security/PUBLICATION-REVIEW-2026-10-10.md)。课程使用合成练习；公开案例引用与第三方素材不代表合作关系或额外的素材再利用授权。

<details>
<summary>查看源文件、本地学习与贡献方式</summary>

[源文件与本地学习指南](docs/DEVELOPMENT.md)说明课程、案例和工具的维护位置、完整源码入口及非生产预览方法。[视觉素材说明](ASSETS.md)与[动效源码](docs/studio/README.md)供内容维护者使用。

</details>

<p align="center"><strong><a href="https://fde.aielsen.com/">从一项具体工作开始 → fde.aielsen.com</a></strong></p>
