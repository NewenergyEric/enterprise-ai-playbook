# AIelsen FDE / 离线工程练习包

这是完全独立的教学脚手架。没有真实客户数据，没有凭据，不会调用模型、发消息或连接业务系统。网站实验台使用另一组便于理解的合成数字；不要把两组数据当作同一个客户 cohort。

## 快速开始

解压，在本目录打开终端。需要 Python 3.10+，无需安装第三方包。

```sh
python -m unittest discover -s tests -v
python tenant_extension.py
python demo.py
python evaluate.py
python analysis.py
```

预期：37 个测试通过（原有机制 21 项 + 客户扩展 16 项）；5 个机制评估通过；原始 14 条订单 = 接受 11 条 + 重复 1 条 + 隔离 2 条。A 店完整观察会员 5 人，30 天复购 2 人，指标 40%。DiD 教学示例为 3 个百分点，不计算统计显著性。

`tenant_extension.py` 使用另一份独立合成快照：在 A 店、2026-09-01、30–90 天未购买口径下选中 p01、p04；退订、未知购买和窗口外记录分别计数。建议工具没有发券副作用；演示将允许标签写入内存，再重放同一个请求。此数据不能与 orders.csv 的复购 cohort 混算。

## 已实现 / 未实现

已实现：只读 CSV 导入、精确重复检测、错误隔离、门店范围校验、完整窗口指标、合成权益资格、预算、确认绑定、过期、幂等、内存审计和有限步只读工具循环。

未实现：真实身份认证、真实模型规划、向量检索、实际 MCP 服务、数据库事务、持久存储、跨进程并发控制、真实发券、监控平台、SSO、企业安全认证。这里的单进程锁不代表分布式事务。

`ScriptedPlanner` 是固定脚本，不是 Agent 智能；测试通过只证明列出的机制，不证明模型理解、提示注入防护或真实生产可靠性。

## 文件地图

- `engine.py`：数据、指标、动作契约与教学循环。
- `tenant_extension.py`：分群、活动建议、发券/标签模拟、参数绑定、请求幂等、回查与写动作停用；对应 W05、W08、W09。
- `tests/test_tenant_extension.py`：客户扩展契约与边界的 16 项测试。
- `data/orders.csv`：合成订单，包含重复、退款、短窗口和错误行。
- `data/ontology.json`：业务对象、关系和动作草图。
- `data/identity-candidates.csv`：实体消歧练习，不被程序自动合并。
- `data/ad-report-a.csv`、`ad-report-b.csv`：报表口径对齐练习。
- `exercises/knowledge-packet.md`：两份合成手册及测试问题。
- `exercises/eval-design.json`：正常、边界、对抗测试规格，需学员接入自己的运行器。
- `tests/test_engine.py`：可执行工程测试。

## 接入真实模型的作业

1. 在获授权环境选择模型与供应商，复核当前官方工具调用文档。密钥只放本地环境变量，不写入仓库，不放浏览器。
2. 实现具有 `choose(context)` 方法的适配器。给模型任务与已经授权、已最小化的工具结果，返回 `{"tool":"read_metric","arguments":{"store":"A"}}` 或 `{"done":true,"summary":"..."}`。
3. 模型只能提出调用，执行层仍须验证工具 allowlist、参数 schema 和用户范围；不得使用 `eval`、任意 shell 或模型生成的未审查 SQL。
4. 用 `run_teaching_loop(your_planner, task, service)` 接入；为超时、格式错误、限流、预算和最大步数定义停止行为。模型返回错误格式时不要默默执行。
5. 保留脱敏输入摘要、模型版本、工具轨迹、实际最终状态与成本。不要要求或保存模型内部私密推理。
6. 使用评估规格补足澄清、拒答、注入文档、工具失败等测试；重复试验并保留 holdout。单次运行不能证明稳定能力。

参考：OpenAI Function calling https://developers.openai.com/api/docs/guides/function-calling 、Anthropic Building effective agents https://www.anthropic.com/engineering/building-effective-agents 。供应商 API 会变化，接入前复核。

## 每阶段建议作业

W1–W3：先写问题、角色和指标契约。解释为何 A 店指标是 2/5，不是 2/6；不要直接改代码迎合结果。

W4–W6：增加未知字段、乱序事件和同名不同实体样例。保存隔离账与规则版本。将真实权限边界与合成 eligibility 区分。

W7–W9：增加最终状态断言，模拟超时后重试，测试两份预览共同超预算的情况。说明当前内存审计、认证与部署的局限。

W10–W12：提交三层验收，解释因果不可识别的场景，分类可复用资产。若没有接入模型，就把作品标为工程机制沙盘，不宣称完整 Agent 能力。

## 知识产权与保密

本包为 AIelsen 教学编写，不含原始项目文件或第三方课程截图。练习可在团队中改作内部教学；真实数据、第三方材料与实际商业合同有各自的使用权和专业审查要求。无生产可用性、法律合规、认证或效果保证。
