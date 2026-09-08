// Practitioner-focused editorial metadata. No customer data or private identifiers.
import {readFileSync} from 'node:fs';
export const courseMeta = [
 ['01','FDE 职责与项目判断','FDE role and project qualification','立项评估 · 客户决策链 · Fit/Gap · 环境自检','Qualification · Stakeholders · Fit/gap · Environment','项目判断书、适配清单与自检记录'],
 ['02','现场访谈与业务建模','Discovery and business modeling','访谈设计 · 事实账本 · 角色地图 · 本体草图','Interviews · Evidence ledger · Stakeholders · Ontology draft','访谈记录、事实账本与本体草图'],
 ['03','业务指标与交付范围','Metrics and delivery scope','指标契约 · 可执行口径 · SOW · 变更边界','Metric contracts · Executable definitions · SOW · Change','指标契约、计算测试与范围说明'],
 ['04','数据画像与客户适配','Data profiling and tenant adaptation','质量检查 · 异常隔离 · 数据契约 · 最小链路演示','Profiling · Quarantine · Data contracts · Thin-slice demo','数据适配器、质量报告与对账结果'],
 ['05','业务本体与建议型 Agent','Ontology and the advisory agent','实体消歧 · 语义层 · 知识检索 · 分群与建议工具','Identity · Semantic layer · Retrieval · Advisory tools','本体与指标配置、业务工具、Agent v1 轨迹'],
 ['06','数据安全与部署选型','Data security and deployment design','数据流 · 字段权限 · 脱敏效用 · 部署责任','Data flows · Field access · Utility tests · Deployment','权限模块、安全测试与部署决策'],
 ['07','Agent 评估与需求变更','Agent evaluation and scope change','评估集 · 评分器 · 回归测试 · 发布门槛','Datasets · Graders · Regression · Release gates','评估运行器、版本报告与变更方案'],
 ['08','执行型 Agent 与业务闭环','Action agents and operational integration','发券与标签 · 参数确认 · 幂等与回查 · 用户反馈','Coupons and tags · Confirmation · Idempotency · Feedback','动作连接器、Agent v2、执行与拒绝轨迹'],
 ['09','生产工程与上线评审','Production engineering and launch review','防护 · 可观测性 · 灰度回退 · 成本 · 运行交接','Guardrails · Observability · Rollout · Cost · Handover','上线配置、故障演练与运行手册'],
 ['10','效果归因与项目验收','Attribution and project acceptance','三层验收 · 观察窗 · 对照设计 · 结果约定','Acceptance · Observation windows · Controls · Outcomes','分析脚本、验收材料与汇报结构'],
 ['11','交付复盘与产品化沉淀','Retrospective and product feedback','失败模式 · 资产分层 · 产品反馈 · 行业迁移','Failure modes · Asset layers · Product feedback · Transfer','复盘报告、资产清单与迁移分析'],
 ['12','结业答辩与能力复评','Capstone defense and competency review','独立复现 · 客户质询 · 技术决策 · 作品集','Reproduction · Stakeholder review · Decisions · Portfolio','完整证据包、能力复评与作品说明']
].map(([id,zh,en,sz,se,deliverable])=>({id,title:{zh,en},subtitle:{zh:sz,en:se},deliverable}));
export const metaById=Object.fromEntries(courseMeta.map(x=>[x.id,x]));
export const notes=Object.fromEntries(courseMeta.map(w=>[w.id,readFileSync(new URL(`./notes/${w.id}.md`,import.meta.url),'utf8')]));
export const sectionCount=id=>(notes[id].match(/^## /gm)||[]).length;
export const totalSections=courseMeta.reduce((n,w)=>n+sectionCount(w.id),0);
export const competencies=[
 {zh:'业务语义建模',en:'Business semantics',detail:{zh:'从访谈中的对象、关系与规则，形成可查询指标和可执行工具。',en:'Translate field evidence into objects, metrics and tool contracts.'},weeks:['02','03','04','05']},
 {zh:'技术与生产工程',en:'Engineering depth',detail:{zh:'数据适配、模型与工具、权限、评估、可靠性、部署和成本。',en:'Data adaptation, models, tools, permissions, evaluation and operations.'},weeks:['04','05','06','07','08','09']},
 {zh:'现场交付与商业判断',en:'Field delivery and commercial judgment',detail:{zh:'判断项目、界定范围、处理变更、解释结果并组织验收。',en:'Qualify projects, define scope, manage change and defend outcomes.'},weeks:['01','02','03','07','10']},
 {zh:'跨职能协作与产品化',en:'Cross-functional delivery and productization',detail:{zh:'协调业务与研发，把客户适配、行业模板和产品改进分开。',en:'Coordinate specialists and separate tenant work from reusable product capability.'},weeks:['01','09','11','12']}
];
export const preparation=[
 {id:'software',zh:'软件工程背景',en:'Software engineering',need:{zh:'重点补充业务访谈、指标定义、客户协作和结果归因。不要把“接口完成”当成项目完成。',en:'Strengthen discovery, metrics, stakeholder work and attribution.'},proof:{zh:'能从一个业务事件写出对象、口径、责任与验收。',en:'Turn a business incident into objects, definitions, ownership and acceptance.'}},
 {id:'data-ai',zh:'数据 / AI 工程背景',en:'Data / AI engineering',need:{zh:'重点补充动作状态、系统集成、生产运行和交付范围。评估分数之外，还要解释实际执行。',en:'Strengthen action states, integration, operations and scope management.'},proof:{zh:'能演示重复请求、结果未知、权限拒绝和恢复。',en:'Demonstrate replay, unknown outcomes, denial and recovery.'}},
 {id:'solutions',zh:'解决方案 / 实施背景',en:'Solutions / implementation',need:{zh:'重点补充 Python、SQL、API、Git、测试与模型工具调用。工程作业不能全部以文档替代。',en:'Strengthen Python, SQL, APIs, Git, tests and model tool use; documents do not replace code.'},proof:{zh:'能独立运行、修改并解释一个数据适配器和业务工具。',en:'Independently run, change and explain an adapter and business tool.'}}
];
