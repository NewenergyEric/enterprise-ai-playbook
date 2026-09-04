import type { Lang } from './site';
export type Copy<T = string> = Record<Lang, T>;
const t = (zh: string, en: string): Copy => ({ zh, en });
const a = (zh: string[], en: string[]): Copy<string[]> => ({ zh, en });
export type Category = 'decision' | 'growth' | 'operations' | 'capability';
export interface Play {
  id: string;
  number: string;
  category: Category;
  title: Copy;
  promise: Copy;
  question: Copy;
  value: Copy;
  method: Copy;
  steps: Copy<string[]>;
  inputs: Copy;
  outputs: Copy<string[]>;
  measures: Copy<string[]>;
  pilot: Copy;
  judgment: Copy;
  evidence: Copy;
}
export const categories: Record<Category, Copy> = {
  decision: t('市场与决策', 'Markets & decisions'),
  growth: t('营销与增长', 'Marketing & growth'),
  operations: t('经营与运营', 'Business operations'),
  capability: t('知识与能力', 'Knowledge & capability'),
};
export const plays: Play[] = [
  {
    id: 'market-entry',
    number: '01',
    category: 'decision',
    title: t('市场进入与本地增长', 'Market entry & local growth'),
    promise: t(
      '投入之前，先把关键假设做扎实。',
      'Test the important assumptions before you commit.',
    ),
    question: t(
      '一个新市场，值得进入、应该等待，还是先小规模验证？',
      'Should we enter a new market, wait, or run a focused pilot?',
    ),
    value: t(
      '把“市场看起来不错”拆成需求、渠道、竞争、服务与本地化的具体判断。让决策者知道哪些结论有依据，哪些还不能下注。',
      'Break an attractive market story into demand, channel, competition, service and localization questions. Show decision-makers what is supported and what still needs evidence.',
    ),
    method: t(
      '借助多个专业视角交叉校准，而不是把一份资料扩写成长报告。保留共识、分歧、证据类型和未知项，再收敛为下一步验证动作。',
      'Cross-check the problem through several professional perspectives. Retain agreement, disagreement, evidence types and unknowns, then translate them into the next validation step.',
    ),
    steps: a(
      [
        '明确目标市场、产品、约束与真正要做的决定',
        '整理公开材料与企业事实，区分直接证据和推断',
        '从需求、渠道和交付视角比较共识与分歧',
        '交付进入判断、风险边界和小规模验证方案',
      ],
      [
        'Define the market, product, constraints and actual decision',
        'Organize public material and business facts; separate evidence from inference',
        'Compare demand, channel and delivery perspectives',
        'Deliver an entry recommendation, risk boundaries and a focused test',
      ],
    ),
    inputs: t(
      '产品介绍、目标市场、渠道设想、已有调研和业务约束。',
      'Product facts, target market, channel hypothesis, prior research and business constraints.',
    ),
    outputs: a(
      [
        '结论先行的市场判断简报',
        '多视角讨论与证据索引',
        '待核实事项和首轮验证计划',
      ],
      [
        'A conclusion-led market brief',
        'Multi-perspective assessment and evidence index',
        'Open questions and a first validation plan',
      ],
    ),
    measures: a(
      [
        '关键结论可追溯、未知项明确',
        '业务审阅与补证耗时',
        '实际采用的验证动作',
      ],
      [
        'Traceable findings and explicit unknowns',
        'Review and evidence-gathering effort',
        'Validation actions actually adopted',
      ],
    ),
    pilot: t(
      '先聚焦一个市场、一个产品与一个决策问题，验证判断质量。',
      'Start with one market, one product and one decision. Test the quality of the judgment.',
    ),
    judgment: t(
      '公开材料形成的是专业视角，不是真人参与或背书；不能把 AI 推断写成专家原话。',
      'Public material informs a perspective, not a person’s participation or endorsement. Never present an AI inference as an expert quotation.',
    ),
    evidence: t(
      '编排方法与报告模板支撑',
      'Supported by orchestration methods & report templates',
    ),
  },
  {
    id: 'prospecting',
    number: '02',
    category: 'growth',
    title: t('客户开发与机会排序', 'Prospect intelligence'),
    promise: t(
      '让销售知道，这周应该先谈谁。',
      'Give sales a reason to know who comes first.',
    ),
    question: t(
      '同一批线索，哪些值得跟进，哪些还需要核实？',
      'Which prospects merit a conversation, and which need more verification?',
    ),
    value: t(
      '把线索名单变成销售行动的依据。少花时间在低匹配对象上，把精力留给需求更清晰、切入理由更具体的机会。',
      'Turn a lead list into a basis for sales action. Spend less time on poor-fit accounts and more on opportunities with a clearer need and a specific reason to engage.',
    ),
    method: t(
      '先识别主体、补信息、构建画像，再将机会价值与证据确定性分开判断。公司规模是信号，但不是优先级的全部。',
      'Resolve entities, enrich facts and build profiles. Assess opportunity value separately from confidence in the evidence. Company size is a signal, not a complete qualification rule.',
    ),
    steps: a(
      [
        '定义产品适配、目标场景和排除条件',
        '核对主体、业务活动与公开证据',
        '分别判断业务潜力和事实确定性',
        '输出优先清单、商务切入与会前材料',
      ],
      [
        'Define fit, target use cases and exclusions',
        'Verify entities, business activity and public evidence',
        'Assess potential and evidence confidence separately',
        'Prepare a shortlist, sales angles and meeting briefs',
      ],
    ),
    inputs: t(
      '脱敏线索、产品卖点、目标场景与已有筛选口径。',
      'Anonymized leads, product benefits, use cases and current qualification criteria.',
    ),
    outputs: a(
      [
        '可筛选的优先机会清单',
        '结构化画像与证据索引',
        '排除理由、补证项和沟通建议',
      ],
      [
        'A sortable priority shortlist',
        'Structured profiles and evidence index',
        'Exclusions, verification tasks and outreach suggestions',
      ],
    ),
    measures: a(
      ['优先清单采用情况', '人工核验与会前准备时间', '有效沟通和后续机会'],
      [
        'Shortlist adoption',
        'Verification and meeting-preparation time',
        'Meaningful conversations and follow-on opportunities',
      ],
    ),
    pilot: t(
      '选一个细分市场，用同一批候选比较人工与 Agent 产出。',
      'Choose one segment and compare manual and Agent-led work on the same prospects.',
    ),
    judgment: t(
      '高价值不等于高确定性。证据不足的对象进入核验，不因名字大就自动成为重点。',
      'High value does not mean high confidence. Weak evidence calls for verification, not automatic priority for a famous name.',
    ),
    evidence: t('项目产物与 SOP 支撑', 'Supported by project outputs & SOPs'),
  },
  {
    id: 'creator-partnerships',
    number: '03',
    category: 'growth',
    title: t('红人合作与个性化 Pitch', 'Creator partnerships'),
    promise: t(
      '找到合适的人，讲出真正相关的合作理由。',
      'Find the right creator. Make a relevant pitch.',
    ),
    question: t(
      '为什么这位创作者适合我们的产品，而不是只看粉丝数？',
      'Why is this creator right for the product, beyond follower count?',
    ),
    value: t(
      '交给运营的不只是名单，还有人选理由、内容证据、合作角度与跟进上下文，让合作开发更有针对性。',
      'Give the team selection reasons, content evidence, partnership angles and follow-up context, not just names on a list.',
    ),
    method: t(
      '组合品牌词、竞品词、品类词和标签寻找人选，再比较近期活跃、内容稳定性与同量级表现。Pitch 从已核实内容出发。',
      'Combine brand, competitor, category and tag-based discovery. Compare recent activity, content consistency and peer-tier performance. Ground the pitch in verified content.',
    ),
    steps: a(
      [
        '理解产品、受众与目标市场',
        '多层关键词发现创作者',
        '核对内容适配、活跃与同量级表现',
        '形成个性化提议并整理跟进',
      ],
      [
        'Understand the product, audience and market',
        'Discover creators with layered keywords',
        'Review fit, activity and peer-tier performance',
        'Draft a tailored proposal and organize follow-up',
      ],
    ),
    inputs: t(
      '产品事实、核实过的卖点、合作偏好、市场与可用渠道。',
      'Product facts, substantiated benefits, partnership preferences, markets and channels.',
    ),
    outputs: a(
      [
        '创作者短名单与适配说明',
        '带内容切入点的邮件草稿',
        '回复、异议和下一步跟进表',
      ],
      [
        'Creator shortlist and fit rationale',
        'Email drafts with specific content angles',
        'Reply, objection and next-action tracker',
      ],
    ),
    measures: a(
      ['人选采用率', '单个 Pitch 准备时间', '有效回复与合作推进'],
      [
        'Candidate adoption',
        'Pitch preparation time',
        'Meaningful replies and partnership progress',
      ],
    ),
    pilot: t(
      '从一个产品与一个目标市场开始，由运营核对人选和合作提议。',
      'Start with one product and one market. Have the team review the candidates and pitches.',
    ),
    judgment: t(
      '粉丝数不是合作效果；群发模板换个名字，也不是个性化。',
      'Follower count is not partnership impact. Changing a name in a bulk template is not personalization.',
    ),
    evidence: t('实际工作流材料支撑', 'Supported by workflow documentation'),
  },
  {
    id: 'content-production',
    number: '04',
    category: 'growth',
    title: t('内容生产与渠道适配', 'Content production'),
    promise: t(
      '让一份产品知识，长成一组营销资产。',
      'Turn product knowledge into a family of marketing assets.',
    ),
    question: t(
      '怎样持续产出可信、符合品牌、适合不同渠道的内容？',
      'How do we consistently produce credible, on-brand content for different channels?',
    ),
    value: t(
      '减少反复理解产品和从零起稿，让团队得到可挑选、可编辑、可持续迭代的文案、视觉方向与内容组合。',
      'Reduce repeated product briefings and blank-page work. Give the team editable copy, visual directions and reusable content options.',
    ),
    method: t(
      '先提炼可证明的卖点与使用场景，建立内容母本，再按渠道调整结构、形式和行动引导。事实一致，表达不机械复制。',
      'Establish substantiated benefits and use cases, then build a factual core. Adapt structure, format and calls to action by channel without changing the facts.',
    ),
    steps: a(
      [
        '整理产品事实、证据和品牌语气',
        '选择用户问题与传播角度',
        '生产图文、脚本、分镜或视觉资产',
        '适配渠道并记录采用与返工反馈',
      ],
      [
        'Organize product facts, evidence and brand voice',
        'Choose the user problem and communication angle',
        'Produce copy, scripts, storyboards or visual assets',
        'Adapt by channel and track adoption and rework',
      ],
    ),
    inputs: t(
      '产品资料、品牌示例、目标受众、现有素材和发布渠道。',
      'Product information, brand examples, audience, existing assets and intended channels.',
    ),
    outputs: a(
      [
        '核心主张与视觉方向',
        '邮件、社媒、落地页等渠道文案',
        '分镜或成片及可编辑素材包',
      ],
      [
        'Core message and visual direction',
        'Email, social and landing-page copy',
        'Storyboards or finished video and editable assets',
      ],
    ),
    measures: a(
      ['制作与返工总时间', '可用资产数量与采用率', '有效互动和业务询盘'],
      [
        'Total production and rework time',
        'Usable assets and adoption',
        'Meaningful engagement and business inquiries',
      ],
    ),
    pilot: t(
      '围绕一次新品或一个核心产品，完成一组跨渠道素材。',
      'Build one cross-channel asset set around a launch or a core product.',
    ),
    judgment: t(
      '成片能力取决于素材、模型与运行环境；不能编造产品效果和用户口碑。',
      'Finished-video capability depends on assets, models and runtime. Never invent product performance or testimonials.',
    ),
    evidence: t(
      'Skill 方法与工具适配方案',
      'Skill methods / Tool adaptation required',
    ),
  },
  {
    id: 'frontline-support',
    number: '05',
    category: 'growth',
    title: t('一线销售与咨询承接', 'Frontline sales support'),
    promise: t(
      '让一次咨询，更容易走向有效跟进。',
      'Turn an inquiry into a useful next step.',
    ),
    question: t(
      '怎样让产品知识进入回答，同时把购买意向留给业务？',
      'How can answers use product knowledge while buying intent reaches the business?',
    ),
    value: t(
      '帮助一线人员理解问题、找到依据并接住意向，让有价值的咨询不只停留在聊天记录中。',
      'Help frontline staff understand questions, find evidence and retain intent, so valuable inquiries become more than chat history.',
    ),
    method: t(
      '将可信产品知识、适用条件和需求字段接到工作入口。历史对话用于识别常见疑问和知识缺口，业务修正再回到方法中。',
      'Connect trusted product knowledge, fit criteria and need fields to the work surface. Use historical conversations to identify recurring questions and knowledge gaps.',
    ),
    steps: a(
      [
        '接入授权渠道或脱敏咨询记录',
        '识别用途、疑问、意向与缺失信息',
        '生成有依据的建议回复',
        '交接商机摘要并更新知识',
      ],
      [
        'Use an authorized channel or anonymized records',
        'Identify use cases, concerns, intent and missing facts',
        'Draft evidence-backed responses',
        'Hand over an opportunity summary and improve knowledge',
      ],
    ),
    inputs: t(
      '脱敏咨询样本、产品与服务资料、线索字段和业务交接规则。',
      'Anonymized inquiries, product and service material, lead fields and handover rules.',
    ),
    outputs: a(
      ['建议回复与知识依据', '需求标签与商机摘要', '待问问题和知识缺口清单'],
      [
        'Suggested replies and knowledge references',
        'Need tags and opportunity summaries',
        'Open questions and knowledge gaps',
      ],
    ),
    measures: a(
      ['建议采用与返工', '有效线索承接和响应时间', '实际问题解决情况'],
      [
        'Suggestion adoption and rework',
        'Lead handover and response time',
        'Actual issue resolution',
      ],
    ),
    pilot: t(
      '聚焦一个渠道和一类高频咨询，让真实使用者评价回答与摘要。',
      'Focus on one channel and one frequent inquiry type. Ask actual users to judge replies and summaries.',
    ),
    judgment: t(
      '回答了不等于解决了；生成草稿不等于发送、到达或转化。',
      'A reply does not prove resolution. A draft does not prove sending, delivery or conversion.',
    ),
    evidence: t(
      '渠道工程与知识产物支撑',
      'Supported by channel engineering & knowledge outputs',
    ),
  },
  {
    id: 'business-analysis',
    number: '06',
    category: 'operations',
    title: t('经营分析与事实对齐', 'Business analysis'),
    promise: t(
      '少花时间拼表，多花时间做经营判断。',
      'Less time reconciling tables. More time making decisions.',
    ),
    question: t(
      '客户、订单、回款与交付的数据，能否回答同一个经营问题？',
      'Can customer, order, collection and delivery data answer the same business question?',
    ),
    value: t(
      '围绕一致的业务事实讨论贡献、风险与优先级，减少找表、拼表和反复解释口径。',
      'Discuss contribution, risk and priorities on a consistent factual basis. Reduce time spent finding tables, joining data and debating definitions.',
    ),
    method: t(
      '先统一业务对象、身份、时间窗口、粒度和单位，再关联数据。累计快照不能被当成交易流水直接相加。',
      'Align entities, identities, time windows, grain and units before connecting data. Cumulative snapshots are not transaction records to be summed.',
    ),
    steps: a(
      [
        '定义要支持的经营决策',
        '对齐对象、口径与计算规则',
        '通过导出表或连接器关联数据',
        '交付可复核结论并进入业务讨论',
      ],
      [
        'Define the decision to support',
        'Align entities, definitions and calculation rules',
        'Connect exported tables or available connectors',
        'Deliver traceable findings for business discussion',
      ],
    ),
    inputs: t(
      '脱敏业务表、字段说明、常见问题和业务认可的对照结果。',
      'Anonymized tables, field definitions, recurring questions and agreed reference results.',
    ),
    outputs: a(
      ['口径卡与数据映射', '分析报告和比较图表', '取数依据与待核实项'],
      [
        'Definition cards and data mappings',
        'Analysis reports and comparison charts',
        'Source evidence and open checks',
      ],
    ),
    measures: a(
      [
        '结论正确性与可复核性',
        '分析准备和数据核对时间',
        '经营会议中的采用情况',
      ],
      [
        'Accuracy and traceability',
        'Preparation and reconciliation time',
        'Use in business meetings',
      ],
    ),
    pilot: t(
      '选一个常问问题，先对齐口径，再用同一组数据对照。',
      'Choose a recurring question, align definitions, then compare methods on the same data.',
    ),
    judgment: t(
      '销售、回款与生产额不能直接相加；相关趋势不等于因果。',
      'Do not add sales, collections and production values together. Correlation does not establish causation.',
    ),
    evidence: t(
      '数据模块与现场规则支撑',
      'Supported by data modules & field rules',
    ),
  },
  {
    id: 'inventory-planning',
    number: '07',
    category: 'operations',
    title: t('库存与生产计划', 'Inventory & production planning'),
    promise: t(
      '把需求、库存、交期和产能放在一起看。',
      'See demand, stock, deadlines and capacity together.',
    ),
    question: t(
      '如何在缺货、积压、换线与交期之间比较可行方案？',
      'How do we compare feasible options across stockouts, excess stock, changeovers and delivery dates?',
    ),
    value: t(
      '给计划人员可解释的备选方案与风险清单。先看清资源约束与取舍，再考虑执行。',
      'Give planners explainable options and a risk list. Make resource constraints and tradeoffs visible before considering execution.',
    ),
    method: t(
      '将需求分层、安全库存、促销影响和有限产能排程方法与企业数据适配，并通过历史回测检验。',
      'Adapt demand segmentation, safety stock, promotion effects and finite-capacity scheduling to business data, then test against history.',
    ),
    steps: a(
      [
        '整理需求、库存、在途与工单',
        '拆分稳定、季节、促销与间歇需求',
        '识别起订量、物料和瓶颈产能',
        '比较补货或排程方案并回测',
      ],
      [
        'Prepare demand, stock, inbound supply and work orders',
        'Segment stable, seasonal, promotional and intermittent demand',
        'Identify minimum-order, material and capacity constraints',
        'Compare replenishment or scheduling options and backtest',
      ],
    ),
    inputs: t(
      '历史需求、库存与在途；排产另需工序、物料、交期与可用产能。',
      'Demand history, stock and inbound supply; add routing, materials, due dates and capacity for scheduling.',
    ),
    outputs: a(
      ['需求分层与补货建议', '缺口清单和排程备选', '约束解释与影响范围'],
      [
        'Demand segments and replenishment options',
        'Shortage lists and alternative schedules',
        'Constraint explanations and impact scope',
      ],
    ),
    measures: a(
      ['预测误差、缺货与积压', '计划编制时间', '延期与换线影响'],
      [
        'Forecast error, stockouts and excess stock',
        'Planning time',
        'Lateness and changeover effects',
      ],
    ),
    pilot: t(
      '库存或排产二选一，从一个品类或一条产线的历史回测开始。',
      'Choose inventory or scheduling. Backtest one category or one production line first.',
    ),
    judgment: t(
      '这是专业 Skill 适配方向，不是已验证的客户收益案例；不假设无限产能。',
      'This is a specialist Skill adaptation, not a proven client-outcome case. Never assume unlimited capacity.',
    ),
    evidence: t('专业 Skill 适配方案', 'Proposed specialist Skill adaptation'),
  },
  {
    id: 'market-intelligence',
    number: '08',
    category: 'decision',
    title: t('市场与招标情报', 'Market & tender intelligence'),
    promise: t(
      '从海外信息中，筛出仍然有效的机会。',
      'Find the opportunities that are still actionable.',
    ),
    question: t(
      '哪些机会符合产品与资格要求，并且还来得及推进？',
      'Which opportunities fit our product and eligibility, and are still open to action?',
    ),
    value: t(
      '减少逐站搜索、翻译、去重和过期信息辨别，让团队聚焦有效机会与进入条件。',
      'Reduce site-by-site search, translation, deduplication and expired results. Focus the team on valid opportunities and entry requirements.',
    ),
    method: t(
      '围绕国家、品类和本地语言搜集公开材料，逐条核验截止时间、预算单位、资格与原始来源。',
      'Collect public material by country, category and local language. Verify closing dates, budget units, eligibility and original sources item by item.',
    ),
    steps: a(
      [
        '定义国家、品类与平台范围',
        '搜集并结构化公开信息',
        '去重、核验时效和商务条件',
        '输出机会卡与下一步核查',
      ],
      [
        'Define countries, categories and platforms',
        'Collect and structure public information',
        'Deduplicate and verify dates and business conditions',
        'Deliver opportunity briefs and next checks',
      ],
    ),
    inputs: t(
      '目标市场、产品能力、品类词、公开平台范围和资格限制。',
      'Target markets, product capability, category terms, public platforms and eligibility limits.',
    ),
    outputs: a(
      ['有效机会清单', '逐条核验的情报简报', '原文索引和后续核查项'],
      [
        'Valid opportunity list',
        'Item-level intelligence briefs',
        'Original-source index and open checks',
      ],
    ),
    measures: a(
      ['结果有效性', '人工筛查与资格核验耗时', '实际推进情况'],
      [
        'Result validity',
        'Screening and eligibility-check effort',
        'Actual business progress',
      ],
    ),
    pilot: t(
      '先选一个国家与一个品类，核对覆盖范围和每条结果的有效性。',
      'Start with one country and one category. Verify coverage and each result’s validity.',
    ),
    judgment: t(
      '发布时间不是截止时间。历史方法覆盖有限平台，持续监测需另做运行适配。',
      'Publication date is not closing date. Historical methods cover selected platforms; ongoing monitoring needs separate runtime work.',
    ),
    evidence: t(
      '情报方法与历史产出支撑',
      'Supported by intelligence methods & output records',
    ),
  },
  {
    id: 'knowledge-capability',
    number: '09',
    category: 'capability',
    title: t('专家经验产品化', 'Expertise into capability'),
    promise: t(
      '让已经做过的工作，成为下一次的起点。',
      'Make past work the starting point for the next task.',
    ),
    question: t(
      '如何让优秀产物和专家修正，不再只留在个人经验中？',
      'How can good outputs and expert corrections become more than personal know-how?',
    ),
    value: t(
      '减少重复讲解和同类工作的重新开始，让新同事、岗位 Agent 和后续项目沿用有效方法。',
      'Reduce repeated briefings and starting over. Help new colleagues, role Agents and future projects reuse effective methods.',
    ),
    method: t(
      '从真实任务中提取输入、步骤、决策启发式、反例与输出模板，并保留来源、依赖、版本和维护责任。',
      'Extract inputs, steps, decision heuristics, counterexamples and output templates from real work. Retain sources, dependencies, versions and maintenance ownership.',
    ),
    steps: a(
      [
        '收集工作记录、优秀结果与纠错',
        '提炼共同方法、条件和例外',
        '形成 Skill 与角色配置',
        '在新样本上验证并维护版本',
      ],
      [
        'Collect task records, good outputs and corrections',
        'Extract methods, conditions and exceptions',
        'Package Skills and role configurations',
        'Test on fresh examples and maintain versions',
      ],
    ),
    inputs: t(
      '脱敏项目资料、典型任务、优秀产物、纠错案例和可用工具。',
      'Anonymized project material, typical tasks, good outputs, correction cases and available tools.',
    ),
    outputs: a(
      ['知识卡与企业 Skill', '岗位 Agent 配置与验证题', '来源、依赖和维护说明'],
      [
        'Knowledge cards and enterprise Skills',
        'Role-Agent configurations and test cases',
        'Source, dependency and maintenance notes',
      ],
    ),
    measures: a(
      ['新任务复用成功情况', '重复讲解和返工变化', '产出质量与维护成本'],
      [
        'Successful reuse on new tasks',
        'Changes in repeat briefings and rework',
        'Output quality and maintenance effort',
      ],
    ),
    pilot: t(
      '选择一项反复做过的工作，让新使用者按能力包完成一个新样本。',
      'Choose a recurring task. Have a new user complete a fresh example using the capability pack.',
    ),
    judgment: t(
      '收录不等于原创，打包不等于有效。外部 Skill 的来源、授权与行为都需核查。',
      'Collected does not mean original; packaged does not mean effective. Verify external Skill sources, licenses and behavior.',
    ),
    evidence: t(
      '知识产物与能力包工程支撑',
      'Supported by knowledge outputs & Skill packaging',
    ),
  },
];

export const stages = [
  {
    title: t('选准业务问题', 'Frame the business problem'),
    detail: t(
      '不是先决定要上几个 Agent，而是明确谁会使用结果、现在如何完成、为什么值得改。',
      'Define who uses the result, how the work is done today and why improving it matters.',
    ),
    work: t(
      '拆解目标、资源约束与当前基线，选一个价值清楚且材料可得的场景。',
      'Map the goal, resource constraints and baseline. Select a valuable use case with usable inputs.',
    ),
    output: t('机会与范围卡', 'Opportunity & scope brief'),
    client: t(
      '业务负责人说明目标，提供现有样本。',
      'A business owner explains the goal and provides current examples.',
    ),
    done: t(
      '首份产出的使用者、用途和评价方式明确。',
      'The first output has a clear user, use and evaluation method.',
    ),
  },
  {
    title: t('还原真实工作', 'Reconstruct the real work'),
    detail: t(
      '沿着一项任务看输入、判断、工具与产出，找到真正依赖经验的地方。',
      'Follow a task through its inputs, judgments, tools and output. Find where expertise makes the difference.',
    ),
    work: t(
      '识别事实来源、缺失信息、业务口径、排除规则和常见失误。',
      'Identify sources, missing information, business definitions, exclusion rules and recurring errors.',
    ),
    output: t('输入到输出的工作图', 'Input-to-output work map'),
    client: t(
      '真实使用者演示一次工作，并解释关键取舍。',
      'A practitioner demonstrates the task and explains key decisions.',
    ),
    done: t(
      '正常路径与例外路径都能被说清。',
      'Both the normal path and important exceptions are explicit.',
    ),
  },
  {
    title: t('沉淀专业方法', 'Capture the professional method'),
    detail: t(
      '把专家怎样判断，写成能够被调用、被质疑、被检验的方法。',
      'Make expert judgment callable, challengeable and testable.',
    ),
    work: t(
      '构建 Skill 的输入要求、判断条件、模板、反例、来源边界和工具依赖。',
      'Specify Skill inputs, decision criteria, templates, counterexamples, evidence boundaries and dependencies.',
    ),
    output: t('企业 Skill 与验证样本', 'Enterprise Skill & test cases'),
    client: t(
      '业务专家核对判断方法，补充容易出错的样本。',
      'An expert reviews the method and contributes difficult examples.',
    ),
    done: t(
      '不只格式正确，新任务也能检验方法是否成立。',
      'Fresh tasks can test the method, not only its output format.',
    ),
  },
  {
    title: t('组装完整工作链', 'Assemble the workflow'),
    detail: t(
      'Agent 保持目标与上下文，Skill 提供方法，工具完成具体动作。',
      'Agents hold goals and context. Skills provide methods. Tools perform actions.',
    ),
    work: t(
      '连接实际数据与工作入口；复杂问题比较多视角，简单任务直接完成。',
      'Connect real data and entry points. Use multiple perspectives when useful and keep simple tasks direct.',
    ),
    output: t('可运行工作链与首份样张', 'Runnable workflow & first sample'),
    client: t(
      '提供适用的数据与工具访问范围，参与产出审阅。',
      'Provide the agreed data and tool access, and review outputs.',
    ),
    done: t(
      '产物可用，缺口清楚，不能把草稿当成执行成功。',
      'The output is usable, gaps are visible, and a draft is not mistaken for successful execution.',
    ),
  },
  {
    title: t('用真实任务验证', 'Validate on real tasks'),
    detail: t(
      '用同一批材料比较质量、时间、返工和成本，不用演示成功代替业务评价。',
      'Compare quality, time, rework and cost on the same material. A demo is not a business evaluation.',
    ),
    work: t(
      '约定样本和判定标准，记录证据正确性、业务采用与完整投入。',
      'Agree samples and criteria. Track evidence accuracy, business adoption and total effort.',
    ),
    output: t('试点评估与改进清单', 'Pilot evaluation & improvement list'),
    client: t(
      '业务人员评价能否使用，并记录实际承接情况。',
      'Business users judge usefulness and record actual follow-through.',
    ),
    done: t(
      '有效部分、未达标部分和下一步投入依据明确。',
      'What works, what falls short and the case for further investment are clear.',
    ),
  },
  {
    title: t('让有效改动留下来', 'Retain what works'),
    detail: t(
      '将纠错、反馈和适配结果留下来，让下一次任务从更好的起点开始。',
      'Retain corrections, feedback and adaptations so the next task starts from a better place.',
    ),
    work: t(
      '交接能力清单、版本、依赖、样例和维护责任；把通用方法与企业专属配置分开。',
      'Hand over capabilities, versions, dependencies, examples and ownership. Separate shared methods from client-specific settings.',
    ),
    output: t('能力资产与维护包', 'Capability assets & maintenance pack'),
    client: t(
      '确定维护人与下一轮优先改进项。',
      'Confirm maintenance ownership and the next improvements.',
    ),
    done: t(
      '团队知道怎么使用、怎样验证，以及何时需要维护。',
      'The team knows how to use, evaluate and maintain the capability.',
    ),
  },
];
export const faqs = [
  {
    q: t(
      '已经有大模型，为什么还需要 FDE？',
      'Why use FDE if we already have a model?',
    ),
    a: t(
      '模型是基础能力。FDE 负责理解具体工作、选对方法、补齐业务上下文、接通工具，并用真实任务确认产出是否可用。差异体现在业务结果和可复用的方法上。',
      'A model is a foundation. FDE understands the task, selects the methods, adds business context, connects tools and checks usefulness on real work. The difference is in the output and the reusable method.',
    ),
  },
  {
    q: t('必须先更换现有系统吗？', 'Do we need to replace existing systems?'),
    a: t(
      '不必。可以先从脱敏样本、导出表格或一个岗位入口开始。是否接系统、接哪些接口，取决于首个场景真正需要什么。',
      'No. Start with anonymized samples, exported tables or one work entry point. Integrations are chosen around what the first use case actually needs.',
    ),
  },
  {
    q: t(
      '多专业视角等于真人专家参与吗？',
      'Do multiple expert perspectives imply real expert participation?',
    ),
    a: t(
      '不等于。基于公开知识组织的视角，不代表真实个人参与、授权或背书；事实、公开表达、第三方评价和 AI 推断需要分开。',
      'No. Perspectives organized from public knowledge do not imply a real person’s involvement, authorization or endorsement. Keep facts, public statements, third-party assessments and AI inference distinct.',
    ),
  },
  {
    q: t(
      '怎么判断这次落地是否有效？',
      'How do we know the implementation works?',
    ),
    a: t(
      '先约定样本、指标和判定方式，再用同一批任务比较产出质量、完整耗时、返工成本和业务采用。具体收益需要试点验证，这里不承诺统一的提升比例。',
      'Agree samples, metrics and criteria first. Compare output quality, total elapsed time, rework cost and business adoption on the same tasks. Benefits require pilot validation; no universal improvement rate is promised.',
    ),
  },
  {
    q: t(
      '这个网站会接收我的业务数据吗？',
      'Does this website collect business data?',
    ),
    a: t(
      '本站没有业务数据提交表单，也不提供在线 AI 执行。示例均为合成内容。试点简报是可下载的模板，请在本地填写并通过双方约定的渠道分享。没有分析追踪器；部署平台仍可能记录基础访问日志。',
      'There is no business-data submission form or online AI execution here. Examples are synthetic. Download the pilot brief, complete it locally and share it through an agreed channel. No analytics trackers are included; a hosting provider may still keep basic access logs.',
    ),
  },
];
