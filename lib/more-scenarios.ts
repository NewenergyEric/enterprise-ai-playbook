type Copy<T = string> = { zh: T; en: T };
const t = (zh: string, en: string): Copy => ({ zh, en });
const a = (zh: string[], en: string[]): Copy<string[]> => ({ zh, en });

export const moreScenarioBasis = {
  'project-pattern': t('项目方法提炼', 'Project-derived method'),
  prototype: t('应用原型方向', 'Application prototype'),
  'enterprise-skill': t('企业 Skill 扩展', 'Enterprise Skill extension'),
};
export type MoreScenario = {
  id: string;
  playId: string;
  basis: keyof typeof moreScenarioBasis;
  title: Copy;
  question: Copy;
  inputs: Copy;
  method: Copy;
  outputs: Copy<string[]>;
};
const group = (
  playId: string,
  items: Omit<MoreScenario, 'playId'>[],
): MoreScenario[] => items.map((item) => ({ ...item, playId }));

// Anonymized application patterns. Basis describes source material, not
// production readiness or measured customer outcomes.
export const moreScenarios: MoreScenario[] = [
  ...group('market-entry', [
    {
      id: 'regional-launch-priorities',
      basis: 'project-pattern',
      title: t('出海市场优先级', 'International launch priorities'),
      question: t(
        '几个国家都像有机会，第一笔市场预算该花在哪里？',
        'Several markets look promising. Where should the first launch budget go?',
      ),
      inputs: t(
        '产品用途、目标国家、价格带与渠道假设。',
        'Product use cases, candidate countries, price bands and channel assumptions.',
      ),
      method: t(
        '按需求、渠道、服务成本和本地习惯比较同一组问题，把分歧收敛成小规模验证方案。',
        'Compare demand, channels, service costs and local behavior on a common basis; turn disagreements into focused market tests.',
      ),
      outputs: a(
        ['市场比较简报', '关键假设清单', '首轮验证路线'],
        [
          'Market comparison brief',
          'Critical assumptions',
          'First validation route',
        ],
      ),
    },
    {
      id: 'category-positioning',
      basis: 'project-pattern',
      title: t('新品定位与差异化', 'New-product positioning'),
      question: t(
        '产品参数不错，为什么消费者仍然觉得“都差不多”？',
        'The specifications are strong. Why do buyers still see a look-alike product?',
      ),
      inputs: t(
        '产品资料、竞品页面、用户评价与现有定位。',
        'Product material, competitor pages, customer reviews and current positioning.',
      ),
      method: t(
        '同时检查直接竞品与替代方案，把功能差异映射到具体人群的购买理由，找出能够证明的独特价值。',
        'Compare competitors and substitutes, then connect feature differences to a specific audience and a defensible reason to buy.',
      ),
      outputs: a(
        ['定位选项', '差异化证据表', '核心购买理由'],
        [
          'Positioning options',
          'Differentiation evidence',
          'Core reason to buy',
        ],
      ),
    },
    {
      id: 'competitive-spec-matrix',
      basis: 'project-pattern',
      title: t(
        '竞品参数与产品机会',
        'Competitive specifications & product gaps',
      ),
      question: t(
        '面对一堆说明书和商品页，哪些差异真能影响购买？',
        'Which differences across manuals and product pages actually matter to buyers?',
      ),
      inputs: t(
        '说明书 PDF、产品链接、关键参数与使用场景。',
        'PDF manuals, product URLs, priority specifications and use cases.',
      ),
      method: t(
        '统一参数名称与单位，保留缺失和冲突，再将性能差异与使用场景关联。',
        'Normalize specification names and units, retain gaps and conflicts, and connect performance differences to practical use cases.',
      ),
      outputs: a(
        ['参数对照矩阵', '证据与缺项', '产品机会清单'],
        ['Specification matrix', 'Evidence and gaps', 'Product opportunities'],
      ),
    },
    {
      id: 'voice-of-customer-discovery',
      basis: 'project-pattern',
      title: t('用户真实需求发现', 'Voice-of-customer discovery'),
      question: t(
        '用户说的“不好用”，究竟是功能、体验，还是预期错了？',
        'Is the customer struggling with functionality, experience or mismatched expectations?',
      ),
      inputs: t(
        '有权使用的评论、访谈、社区讨论和产品资料。',
        'Authorized reviews, interviews, community discussions and product material.',
      ),
      method: t(
        '按具体问题拆解原话，聚合表扬、抱怨与未满足需求，区分声量、严重性和使用条件。',
        'Break feedback into specific issues, cluster praise and unmet needs, and distinguish frequency from severity and context.',
      ),
      outputs: a(
        ['需求与痛点地图', '代表性原话索引', '待验证产品机会'],
        [
          'Needs and pain-point map',
          'Source quote index',
          'Product hypotheses to test',
        ],
      ),
    },
    {
      id: 'local-channel-strategy',
      basis: 'project-pattern',
      title: t('本地渠道与服务网络', 'Local channels & service coverage'),
      question: t(
        '卖得出去以后，谁来安装、交付、售后和复购？',
        'After the sale, who handles installation, fulfillment, service and repeat business?',
      ),
      inputs: t(
        '产品服务要求、市场资料、潜在渠道与合作条件。',
        'Service requirements, market material, prospective channels and partner terms.',
      ),
      method: t(
        '把渠道触达能力与实际服务责任一起比较，识别渠道利润、覆盖范围和售后承接的断点。',
        'Evaluate customer reach alongside service responsibilities, including partner economics, coverage and after-sales gaps.',
      ),
      outputs: a(
        ['渠道角色地图', '合作条件比较', '服务缺口清单'],
        [
          'Channel-role map',
          'Partner-term comparison',
          'Service coverage gaps',
        ],
      ),
    },
    {
      id: 'buying-committee-map',
      basis: 'project-pattern',
      title: t('购买决策链与沟通重点', 'Buying roles & sales messages'),
      question: t(
        '使用者满意，采购却不买单：这笔生意还差谁点头？',
        'Users like it, but purchasing hesitates. Whose concerns are still unresolved?',
      ),
      inputs: t(
        '用户访谈、销售记录、产品用途与采购场景。',
        'Interviews, sales notes, product use cases and buying context.',
      ),
      method: t(
        '区分使用、影响、采购与决策角色，分别提取目标、顾虑和证据需求，形成不同对象的沟通材料。',
        'Separate user, influencer, buyer and decision-maker needs; tailor the argument and evidence for each role.',
      ),
      outputs: a(
        ['购买角色地图', '异议与证据清单', '分角色沟通简报'],
        ['Buying-role map', 'Objections and evidence', 'Role-specific briefs'],
      ),
    },
    {
      id: 'benefit-validation',
      basis: 'project-pattern',
      title: t('卖点验证与上市取舍', 'Benefit validation before launch'),
      question: t(
        '团队最想讲的功能，是不是用户最愿意付钱的理由？',
        'Is the feature your team loves a reason customers would actually pay?',
      ),
      inputs: t(
        '功能列表、竞争优势、用户痛点证据与备选卖点。',
        'Features, competitive advantages, customer pain evidence and candidate claims.',
      ),
      method: t(
        '沿“功能—优势—利益”逐项连接证据，再用用户反馈反向检查，筛出真正值得进入上市方案的卖点。',
        'Trace features to advantages and benefits, then test each proposed claim against customer evidence and alternative explanations.',
      ),
      outputs: a(
        ['FAB 证据链', '卖点优先级', '验证问题清单'],
        ['FAB evidence chain', 'Prioritized benefits', 'Validation questions'],
      ),
    },
    {
      id: 'launch-message-house',
      basis: 'project-pattern',
      title: t('上市叙事与页面信息架构', 'Launch narrative & page structure'),
      question: t(
        '研究已经做完，如何变成官网、销售和广告都能用的表达？',
        'How does research become a story the website, sales team and ads can use?',
      ),
      inputs: t(
        '定位结论、核心卖点、证据材料和渠道任务。',
        'Positioning, priority benefits, supporting evidence and channel objectives.',
      ),
      method: t(
        '把核心承诺、支撑理由和证明材料组织成品牌信息屋，再按访客决策顺序排出页面内容。',
        'Organize the promise, reasons and proof into a message house, then sequence page content around the buyer decision.',
      ),
      outputs: a(
        ['品牌信息屋', '页面结构草案', '跨渠道信息层级'],
        ['Message house', 'Page outline', 'Cross-channel message hierarchy'],
      ),
    },
  ]),
  ...group('prospecting', [
    {
      id: 'account-profile-enrichment',
      basis: 'project-pattern',
      title: t('企业名单补全与画像', 'Account enrichment & profiles'),
      question: t(
        '销售手上只有公司名，如何判断对方做什么、是否值得跟？',
        'With only company names, how can sales identify accounts worth pursuing?',
      ),
      inputs: t(
        '现有企业名单、目标客户标准与公开商务资料。',
        'Account lists, ideal-customer criteria and public business information.',
      ),
      method: t(
        '统一企业身份，补齐业务、区域和产品线；将核实的信息与待验证推断分开，关联到可能的应用场景。',
        'Resolve company identities, enrich business and regional context, and map possible use cases while separating facts from hypotheses.',
      ),
      outputs: a(
        ['结构化客户画像', '来源与缺项表', '可跟进名单'],
        [
          'Structured account profiles',
          'Sources and gaps',
          'Actionable prospect list',
        ],
      ),
    },
    {
      id: 'territory-prospecting',
      basis: 'project-pattern',
      title: t('行业与区域客户拓展', 'Industry & territory prospecting'),
      question: t(
        '同一套产品，下一批该在哪个行业、哪个区域找客户？',
        'Which industries and regions should the next prospecting list cover?',
      ),
      inputs: t(
        '产品能力、已有客户类型、目标区域和企业资料。',
        'Product capabilities, existing customer types, target regions and account information.',
      ),
      method: t(
        '按行业工作方式拆分适用场景，识别跨区域经营与具体需求的联系，再组织成可分配的目标客户池。',
        'Map capabilities to industry workflows and regional needs, then organize suitable accounts into assignable prospect pools.',
      ),
      outputs: a(
        ['行业应用分组', '区域目标池', '拓客切入理由'],
        [
          'Industry use-case groups',
          'Territory account pools',
          'Reasons to approach',
        ],
      ),
    },
    {
      id: 'technical-fit-prioritization',
      basis: 'project-pattern',
      title: t('技术型销售机会排序', 'Technical sales prioritization'),
      question: t(
        '大公司不一定是好机会，谁真正依赖我们的这项能力？',
        'A large company is not always a strong opportunity. Who genuinely needs this capability?',
      ),
      inputs: t(
        '目标企业业务流程、产品能力、替代方案与证据。',
        'Account workflows, product capabilities, alternatives and supporting evidence.',
      ),
      method: t(
        '结合业务依赖度、适用规模、已有方案和替换难度解释优先级，让分数背后有业务理由。',
        'Assess workflow dependency, scale, incumbent solutions and switching friction so every priority has a business rationale.',
      ),
      outputs: a(
        ['机会排序表', '匹配依据', '技术沟通重点'],
        [
          'Prioritized opportunities',
          'Fit rationale',
          'Technical discovery topics',
        ],
      ),
    },
    {
      id: 'expansion-signal-prospecting',
      basis: 'project-pattern',
      title: t('出海与业务扩张信号', 'Expansion-led prospecting'),
      question: t(
        '哪些企业刚进入新市场，现有系统或服务可能跟不上？',
        'Which companies are entering markets their current systems may not support?',
      ),
      inputs: t(
        '目标企业公开动态、区域布局、产品与服务信息。',
        'Public account updates, regional presence, products and service information.',
      ),
      method: t(
        '核对海外布局与业务变化的时间和来源，将扩张信号对应到本地化、交付或系统能力的潜在缺口。',
        'Verify expansion events and dates, then connect them to possible localization, fulfillment or system gaps.',
      ),
      outputs: a(
        ['扩张信号卡', '需求假设', '及时跟进理由'],
        ['Expansion signal cards', 'Need hypotheses', 'Timely outreach angles'],
      ),
    },
    {
      id: 'discovery-call-brief',
      basis: 'project-pattern',
      title: t('拜访前研究与问题设计', 'Pre-meeting account briefs'),
      question: t(
        '第一次见客户，怎样少讲通用介绍，多问到业务要害？',
        'How can the first meeting get beyond a generic product introduction?',
      ),
      inputs: t(
        '客户画像、产品资料、历史沟通与已知业务信号。',
        'Account profiles, product material, correspondence and business signals.',
      ),
      method: t(
        '将业务现状、可能痛点和竞争方案压缩成简报，设计能够验证需求、预算与实施条件的问题。',
        'Condense account context, likely pain and alternatives into questions that test need, economics and delivery conditions.',
      ),
      outputs: a(
        ['拜访简报', '发现式提问清单', '会后验证事项'],
        ['Meeting brief', 'Discovery questions', 'Follow-up validation items'],
      ),
    },
    {
      id: 'warm-introduction-map',
      basis: 'enterprise-skill',
      title: t('人脉关系与暖介绍路径', 'Warm introduction paths'),
      question: t(
        '名单有了，能否找到比陌生触达更合适的进入方式？',
        'Can an existing relationship provide a better route into a target account?',
      ),
      inputs: t(
        '有权使用的关系网络、目标客户和关系强度记录。',
        'Authorized relationship data, target accounts and relationship-strength notes.',
      ),
      method: t(
        '比较直接与间接连接、关系强度和目标匹配度，给出可解释的引荐路径及缺失的关系节点。',
        'Compare connections, relationship strength and target fit to identify credible introduction paths and network gaps.',
      ),
      outputs: a(
        ['引荐路径图', '联系人优先级', '引荐请求草稿'],
        [
          'Introduction path map',
          'Connector priorities',
          'Introduction request drafts',
        ],
      ),
    },
    {
      id: 'inbound-lead-handoff',
      basis: 'prototype',
      title: t('对话线索转销售任务', 'Conversation-to-sales handoff'),
      question: t(
        '咨询聊了很多，销售接手时为什么还要从头问一遍？',
        'Why does sales restart discovery after an extensive inbound conversation?',
      ),
      inputs: t(
        '经授权的咨询对话、客户主动提供的信息与跟进规则。',
        'Authorized conversations, volunteered customer details and follow-up rules.',
      ),
      method: t(
        '提取购买意图、需求约束和约定动作，连同关键上下文生成线索卡，交给对应销售继续推进。',
        'Capture purchase intent, constraints and agreed next steps in a contextual lead card for the right salesperson.',
      ),
      outputs: a(
        ['销售线索卡', '需求摘要', '下一步跟进任务'],
        ['Sales lead card', 'Needs summary', 'Next-step follow-up task'],
      ),
    },
  ]),
  ...group('creator-partnerships', [
    {
      id: 'creator-fit-shortlist',
      basis: 'enterprise-skill',
      title: t('红人合作适配研究', 'Creator partnership screening'),
      question: t(
        '粉丝数相近的两个人，谁更适合讲我们的产品？',
        'Two creators have similar reach. Who can better tell the product story?',
      ),
      inputs: t(
        '候选名单、公开内容、受众要求与合作目标。',
        'Candidate lists, public content, audience criteria and collaboration goals.',
      ),
      method: t(
        '从内容主题、受众相关性、近期活跃和互动质量核对适配度，保留每个入选理由的出处。',
        'Assess content, audience fit, recent activity and interaction quality, retaining evidence for each shortlist decision.',
      ),
      outputs: a(
        ['候选短名单', '匹配理由卡', '合作风险与缺项'],
        [
          'Creator shortlist',
          'Fit rationale cards',
          'Risks and missing information',
        ],
      ),
    },
    {
      id: 'longtail-personalized-outreach',
      basis: 'project-pattern',
      title: t('长尾红人批量个性化邀约', 'Personalized long-tail outreach'),
      question: t(
        '已有几百个候选，如何让每封邀约都说清“为什么找你”？',
        'How can each invitation explain why this creator matters across a list of hundreds?',
      ),
      inputs: t(
        '已有名单、已核验内容、品牌资料与合作提议。',
        'An existing list, verified content, brand material and the collaboration offer.',
      ),
      method: t(
        '将固定品牌信息与个人化段落分离，围绕具体内容生成匹配理由，批量检查错配和承诺后衔接发送。',
        'Separate reusable brand copy from personal passages, tie pitches to verified content, and check mismatches before sending.',
      ),
      outputs: a(
        ['个性化邀约草稿', '批量校对工作表', '触达结果记录'],
        [
          'Personalized pitch drafts',
          'Batch review worksheet',
          'Outreach result log',
        ],
      ),
    },
    {
      id: 'partnership-reply-desk',
      basis: 'project-pattern',
      title: t('合作回复分流与推进', 'Partnership reply desk'),
      question: t(
        '报价、追问、拒绝混在收件箱里，哪些回复最值得先处理？',
        'Rates, questions and refusals land together. Which replies deserve attention first?',
      ),
      inputs: t(
        '授权邮箱中的合作线程、已发提议和产品资料。',
        'Authorized email threads, sent proposals and product knowledge.',
      ),
      method: t(
        '按线程还原上下文，区分兴趣、报价、产品问题和拒绝，给出有依据的回复建议与待办。',
        'Reconstruct threads, distinguish intent and questions, and suggest contextual replies and next actions.',
      ),
      outputs: a(
        ['回复意图分组', '建议回信', '合作推进队列'],
        [
          'Reply-intent groups',
          'Suggested replies',
          'Partnership action queue',
        ],
      ),
    },
    {
      id: 'creator-reengagement',
      basis: 'project-pattern',
      title: t(
        '老红人再合作与新品激活',
        'Creator reactivation for new launches',
      ),
      question: t(
        '合作过的红人，下一次新品上市时怎样重新激活？',
        'How do you re-engage past partners when a new product launches?',
      ),
      inputs: t(
        '有权使用的合作记录、历史反馈与新品信息。',
        'Authorized collaboration history, prior feedback and new-product information.',
      ),
      method: t(
        '区分历史合作关系和当前产品匹配，引用真实上下文，给出这一次合作值得继续的具体理由。',
        'Combine real collaboration history with current product fit to explain why another partnership makes sense now.',
      ),
      outputs: a(
        ['再合作候选池', '新品合作提议', '分组跟进计划'],
        [
          'Reactivation shortlist',
          'New-launch proposals',
          'Segmented follow-up plan',
        ],
      ),
    },
    {
      id: 'creator-outreach-review',
      basis: 'project-pattern',
      title: t('红人触达效果复盘', 'Creator outreach performance review'),
      question: t(
        '邮件发出去了，问题出在名单、提议，还是后续跟进？',
        'Is the campaign limited by the list, the offer or the follow-up?',
      ),
      inputs: t(
        '发送与回复记录、内容版本和可用合作结果。',
        'Send and reply logs, message variants and available partnership outcomes.',
      ),
      method: t(
        '按名单分组、提议版本和跟进轮次比较实际结果，区分发送失败、无回复与明确拒绝。',
        'Compare outcomes by segment, offer and follow-up round, separating delivery failures, silence and explicit refusals.',
      ),
      outputs: a(
        ['触达漏斗', '版本比较表', '下一轮调整建议'],
        ['Outreach funnel', 'Variant comparison', 'Next-round recommendations'],
      ),
    },
    {
      id: 'creator-collaboration-brief',
      basis: 'enterprise-skill',
      title: t('创作者内容合作 Brief', 'Creator collaboration briefs'),
      question: t(
        '怎么给红人足够明确的方向，又保留他自己的表达？',
        'How do you give a creator a clear brief without scripting away their voice?',
      ),
      inputs: t(
        '产品可公开卖点、受众、创作者风格与合作范围。',
        'Public product claims, audience, creator style and collaboration scope.',
      ),
      method: t(
        '围绕一个真实使用场景选择可信卖点，说明必备信息、可自由发挥部分和需要验证的说法。',
        'Build around a real use case and credible benefit; distinguish essential information from creative freedom and unverified claims.',
      ),
      outputs: a(
        ['合作创意简报', '使用场景建议', '产品事实清单'],
        [
          'Creative collaboration brief',
          'Use-case suggestions',
          'Product fact sheet',
        ],
      ),
    },
  ]),
  ...group('content-production', [
    {
      id: 'product-campaign-content',
      basis: 'project-pattern',
      title: t('产品资料转营销内容', 'Product material into campaign content'),
      question: t(
        '说明书、卖点表和研究报告，怎样变成客户愿意看的内容？',
        'How do manuals and research become content customers want to read?',
      ),
      inputs: t(
        '产品资料、已验证卖点、受众问题和渠道目标。',
        'Product material, verified benefits, audience questions and channel goals.',
      ),
      method: t(
        '从资料中提取可证明的主张，把参数转成使用场景，按客户关心的问题组织图文内容。',
        'Extract supported claims, translate specifications into use cases, and organize content around customer questions.',
      ),
      outputs: a(
        ['内容主线', '图文稿件', '事实与素材清单'],
        [
          'Content narrative',
          'Copy and visual briefs',
          'Facts and asset checklist',
        ],
      ),
    },
    {
      id: 'bilingual-sales-material',
      basis: 'project-pattern',
      title: t('中英文销售资料与演示', 'Bilingual sales collateral'),
      question: t(
        '同一个方案，怎样让国内和海外客户都快速理解价值？',
        'How can domestic and international buyers quickly understand the same offer?',
      ),
      inputs: t(
        '方案资料、典型业务问题、目标受众与品牌规范。',
        'Solution material, buyer problems, target audiences and brand guidelines.',
      ),
      method: t(
        '先梳理价值叙事和证据，再分别写中英文商业表达，用流程图、样张和服务模块组织演示。',
        'Build the value narrative and evidence first, then write each language for its audience using diagrams, samples and service modules.',
      ),
      outputs: a(
        ['双语销售演示', '方案介绍页', '可复用视觉模板'],
        [
          'Bilingual sales presentation',
          'Solution pages',
          'Reusable visual templates',
        ],
      ),
    },
    {
      id: 'channel-native-repurposing',
      basis: 'enterprise-skill',
      title: t('一份素材，多渠道适配', 'One source, channel-native content'),
      question: t(
        '一篇长文能不能同时服务公众号、LinkedIn 和短视频？',
        'Can one article work across newsletters, LinkedIn and short-form video?',
      ),
      inputs: t(
        '原始文章、访谈、演示或产品发布素材。',
        'An original article, interview, demo or product-launch asset.',
      ),
      method: t(
        '提取独立观点，按渠道重组开头、长度和视觉顺序，保留作者语气与原始事实。',
        'Extract distinct ideas and adapt hooks, length and visual sequence to each channel while preserving voice and facts.',
      ),
      outputs: a(
        ['平台原生稿件', '短视频脚本', '内容发布编排'],
        [
          'Platform-native drafts',
          'Short-video scripts',
          'Publishing sequence',
        ],
      ),
    },
    {
      id: 'performance-creative-variants',
      basis: 'enterprise-skill',
      title: t('广告创意变体与测试', 'Ad creative variants & tests'),
      question: t(
        '广告疲劳了，下一轮该换卖点、开头，还是表达形式？',
        'When an ad loses traction, should you change the benefit, hook or format?',
      ),
      inputs: t(
        '现有广告、产品事实、受众与历史表现。',
        'Existing ads, product facts, audiences and historical performance.',
      ),
      method: t(
        '拆分受众、利益点、证据和行动号召，每轮围绕清楚的测试假设生成可比较的创意变体。',
        'Separate audience, benefit, proof and call to action; generate comparable variants around explicit test hypotheses.',
      ),
      outputs: a(
        ['创意测试矩阵', '标题与正文变体', '素材制作简报'],
        [
          'Creative test matrix',
          'Headline and copy variants',
          'Asset production brief',
        ],
      ),
    },
    {
      id: 'expert-voice-content',
      basis: 'enterprise-skill',
      title: t('创始人与专家观点内容', 'Founder & expert thought leadership'),
      question: t(
        '有经验、有观点，为什么写出来总像一篇通用宣传稿？',
        'Why does hard-won expertise turn into generic promotional copy?',
      ),
      inputs: t(
        '本人授权的访谈、工作笔记、演讲和过往文章。',
        'Authorized interviews, work notes, talks and prior writing.',
      ),
      method: t(
        '从真实表达中提炼观点、案例与语气，围绕具体判断组织文章，补出需要核实的事实。',
        'Extract actual arguments, examples and voice; build articles around concrete judgments and flag facts that need verification.',
      ),
      outputs: a(
        ['观点素材库', '署名文章草稿', '社交内容系列'],
        [
          'Point-of-view library',
          'Bylined article drafts',
          'Social content series',
        ],
      ),
    },
    {
      id: 'product-explainer-video',
      basis: 'enterprise-skill',
      title: t('产品演示与解释型视频', 'Product demos & explainer videos'),
      question: t(
        '复杂的产品价值，怎样用一段视频讲清楚？',
        'How can a short video make a complex product understandable?',
      ),
      inputs: t(
        '产品演示、可用画面、业务问题和品牌素材。',
        'Product demonstrations, usable footage, buyer problems and brand assets.',
      ),
      method: t(
        '按问题、动作和结果设计分镜，将旁白与画面证据对应，再组织字幕和不同渠道版本。',
        'Storyboard the problem, action and result; align narration with visual proof and prepare captions and channel versions.',
      ),
      outputs: a(
        ['分镜与旁白', '演示视频方案', '多比例版本清单'],
        [
          'Storyboard and narration',
          'Demo video treatment',
          'Format variant list',
        ],
      ),
    },
    {
      id: 'visual-campaign-kit',
      basis: 'project-pattern',
      title: t('主题营销图与整套物料', 'Cohesive campaign visual kits'),
      question: t(
        '海报、朋友圈图和网页各做各的，品牌怎样保持一个样？',
        'How do posters, social tiles and web pages stay recognizably one campaign?',
      ),
      inputs: t(
        '活动主题、主视觉、文案层级与目标版式。',
        'Campaign theme, key visual, copy hierarchy and required formats.',
      ),
      method: t(
        '先确定统一视觉母版，再按信息层级和展示顺序生成系列物料，检查裁切、文字密度和跨尺寸一致性。',
        'Establish a shared visual master, adapt it by message hierarchy and sequence, then check crops, text density and consistency.',
      ),
      outputs: a(
        ['主题主视觉', '社交系列图', '网页与海报物料'],
        ['Campaign key visual', 'Social tile series', 'Web and poster assets'],
      ),
    },
  ]),
  ...group('frontline-support', [
    {
      id: 'inbound-intent-triage',
      basis: 'prototype',
      title: t('私信咨询与购买意图识别', 'Inbound purchase-intent triage'),
      question: t(
        '大量“多少钱”“适不适合”的咨询里，哪些需要马上承接？',
        'Which price and suitability questions signal an opportunity to act now?',
      ),
      inputs: t(
        '授权渠道的咨询、产品知识和销售承接规则。',
        'Authorized inbound messages, product knowledge and sales routing rules.',
      ),
      method: t(
        '识别问题类型、购买意图和缺失条件，给出相关回复，把明确机会交给销售并保留上下文。',
        'Identify intent and missing requirements, suggest relevant replies, and pass clear opportunities to sales with context.',
      ),
      outputs: a(
        ['意图标签', '相关回复建议', '高意向机会队列'],
        [
          'Intent labels',
          'Relevant reply suggestions',
          'High-intent opportunity queue',
        ],
      ),
    },
    {
      id: 'store-visit-conversion',
      basis: 'prototype',
      title: t('到店、试驾与体验预约', 'Store visits, test drives & demos'),
      question: t(
        '客户在网上聊得很热闹，如何把兴趣接成一次实际体验？',
        'How does an enthusiastic online conversation become an actual visit or demo?',
      ),
      inputs: t(
        '客户意向、门店服务信息、可预约时段与对接人员。',
        'Customer intent, location information, available slots and service contacts.',
      ),
      method: t(
        '围绕体验目标补齐时间、地点和必要准备，形成预约摘要与到店交接信息，减少重复沟通。',
        'Clarify the desired experience, time, location and preparation; create a booking summary and arrival handoff.',
      ),
      outputs: a(
        ['体验预约摘要', '到店准备说明', '门店接待交接卡'],
        ['Visit booking summary', 'Preparation guidance', 'Store handoff card'],
      ),
    },
    {
      id: 'product-fit-consultation',
      basis: 'project-pattern',
      title: t('产品选型与售前答疑', 'Product-fit consultation'),
      question: t(
        '产品很多、参数很细，导购怎样快速给出适用建议？',
        'How can frontline staff recommend a suitable option across a complex range?',
      ),
      inputs: t(
        '产品资料、使用限制、客户需求与常见问题。',
        'Product information, usage limits, customer requirements and FAQs.',
      ),
      method: t(
        '先确认使用环境与限制，再从可信资料中比较选项，解释适合与不适合的原因。',
        'Clarify the use environment and constraints, compare options from trusted material, and explain suitability and trade-offs.',
      ),
      outputs: a(
        ['需求确认清单', '产品比较建议', '带来源的答疑'],
        [
          'Needs checklist',
          'Product comparison advice',
          'Source-backed answers',
        ],
      ),
    },
    {
      id: 'manual-troubleshooting',
      basis: 'project-pattern',
      title: t('设备手册与故障排查', 'Manual-based troubleshooting'),
      question: t(
        '用户描述一个故障，客服能否直接找到对应型号的图和步骤？',
        'Can support find the right diagram and steps for the exact product model?',
      ),
      inputs: t(
        '按型号整理的手册 PDF、故障描述与技术图示。',
        'Model-specific PDF manuals, issue descriptions and technical diagrams.',
      ),
      method: t(
        '同时索引文字、表格和页面图像，按型号检索相关片段，将排查建议链接到具体页码。',
        'Index text, tables and page images; retrieve model-specific evidence and link troubleshooting guidance to exact pages.',
      ),
      outputs: a(
        ['排查步骤建议', '手册页码引用', '相关技术图示'],
        [
          'Troubleshooting suggestions',
          'Manual page citations',
          'Relevant technical diagrams',
        ],
      ),
    },
    {
      id: 'support-knowledge-feedback',
      basis: 'project-pattern',
      title: t('售后知识持续更新', 'Support knowledge learning loop'),
      question: t(
        '一个客服解决过的问题，怎样让整个团队下次都能用上？',
        'How does one resolved issue become useful knowledge for the whole team?',
      ),
      inputs: t(
        '已解决工单、人工纠错、现有知识和未回答问题。',
        'Resolved tickets, human corrections, existing knowledge and unanswered questions.',
      ),
      method: t(
        '从纠错中提取知识缺口，形成 FAQ 增补建议，再用历史问题检查更新是否改善回答。',
        'Extract knowledge gaps from corrections, propose FAQ additions, and test the updates against historical questions.',
      ),
      outputs: a(
        ['FAQ 增补单', '未知问题队列', '回答回测样本'],
        [
          'FAQ additions',
          'Unanswered-question queue',
          'Answer regression samples',
        ],
      ),
    },
    {
      id: 'after-sales-case-handoff',
      basis: 'project-pattern',
      title: t('复杂售后问题交接', 'Complex support case handoff'),
      question: t(
        '问题转了几个人，如何不再让客户反复描述同一件事？',
        'How can a complex case move between teams without making the customer repeat everything?',
      ),
      inputs: t(
        '授权工单、对话记录、产品版本与已尝试措施。',
        'Authorized tickets, conversations, product versions and attempted remedies.',
      ),
      method: t(
        '按问题而非整段对话归纳症状、已做动作和未解决条件，为技术支持保留证据与关键缺项。',
        'Summarize symptoms, attempted actions and unresolved conditions by issue, preserving evidence and gaps for technical support.',
      ),
      outputs: a(
        ['问题时间线', '技术交接摘要', '下一轮必要提问'],
        [
          'Issue timeline',
          'Technical handoff summary',
          'Essential follow-up questions',
        ],
      ),
    },
    {
      id: 'voice-service-desk',
      basis: 'prototype',
      title: t('语音产品咨询助手', 'Voice-based product assistance'),
      question: t(
        '忙着操作设备或接待客户时，能不能开口就查到需要的信息？',
        'Can staff ask for information while operating equipment or serving a customer?',
      ),
      inputs: t(
        '授权语音输入、岗位知识和当前咨询上下文。',
        'Consented voice input, role knowledge and the current inquiry context.',
      ),
      method: t(
        '将语音转成明确问题，交给知识助手检索，再用适合口头听取的短回答和文本依据反馈。',
        'Turn speech into a clear query, retrieve relevant knowledge, and return a concise spoken answer with a text reference.',
      ),
      outputs: a(
        ['语音答复', '文字与来源记录', '需继续澄清的问题'],
        ['Spoken answer', 'Text and source record', 'Clarification prompts'],
      ),
    },
    {
      id: 'clinic-appointment-assistant',
      basis: 'prototype',
      title: t('诊所预约与服务陪伴', 'Clinic scheduling & service support'),
      question: t(
        '预约、到诊准备和服务随访，哪些重复沟通可以更连贯？',
        'How can scheduling, arrival preparation and service follow-up feel more connected?',
      ),
      inputs: t(
        '诊所服务说明、预约规则与机构确认的科普材料。',
        'Clinic service information, booking rules and approved educational material.',
      ),
      method: t(
        '帮助解释服务流程、整理预约需求与到诊准备，转交需要专业人员处理的问题；不做诊断或用药建议。',
        'Explain service steps, organize bookings and preparation, and route professional questions to staff; no diagnosis or medication advice.',
      ),
      outputs: a(
        ['预约需求摘要', '到诊准备说明', '服务随访提纲'],
        [
          'Booking needs summary',
          'Arrival preparation guide',
          'Service follow-up outline',
        ],
      ),
    },
  ]),
  ...group('business-analysis', [
    {
      id: 'commerce-daily-operations',
      basis: 'project-pattern',
      title: t('电商经营日报与动作建议', 'Commerce daily review & actions'),
      question: t(
        'GMV、投放、退款和库存一起变化，今天先处理什么？',
        'When sales, ads, refunds and stock all move, what needs action today?',
      ),
      inputs: t(
        '订单、流量、投放、退款、商品与库存日报。',
        'Daily orders, traffic, advertising, refunds, product and stock reports.',
      ),
      method: t(
        '先对齐指标口径，再从商品、渠道、素材与直播环节寻找异常，将结论转成当天可执行的动作。',
        'Align metrics, locate exceptions across products, channels, creative and live commerce, then turn findings into daily actions.',
      ),
      outputs: a(
        ['经营日报', '异常雷达', '商品与渠道动作表'],
        [
          'Daily business brief',
          'Exception radar',
          'Product and channel actions',
        ],
      ),
    },
    {
      id: 'sales-decline-diagnosis',
      basis: 'project-pattern',
      title: t('销量下滑与转化诊断', 'Sales decline & conversion diagnosis'),
      question: t(
        '销量下去了，先加广告、改页面，还是处理产品问题？',
        'Sales are down. Should you increase ads, fix the page or address a product issue?',
      ),
      inputs: t(
        '可比周期的流量、转化、客单价、退款与客诉记录。',
        'Comparable traffic, conversion, order value, refund and complaint records.',
      ),
      method: t(
        '拆解收入变化，叠加客诉主题和时间信号，区分已观察到的关联与仍待验证的原因。',
        'Decompose revenue changes and align complaint themes over time, separating observed correlations from unproven causes.',
      ),
      outputs: a(
        ['收入变化分解', '转化断点假设', '优先验证动作'],
        [
          'Revenue change decomposition',
          'Conversion hypotheses',
          'Priority validation actions',
        ],
      ),
    },
    {
      id: 'complaint-driver-analysis',
      basis: 'project-pattern',
      title: t(
        '客诉主题与产品改进排序',
        'Complaint drivers & product priorities',
      ),
      question: t(
        '工单堆了很多，哪些问题值得产品、质量和服务团队一起解决？',
        'Which ticket themes deserve coordinated product, quality and service action?',
      ),
      inputs: t(
        '脱敏工单、产品版本、问题状态和时间信息。',
        'De-identified tickets, product versions, issue status and timestamps.',
      ),
      method: t(
        '把一张工单拆成多个问题单元，结合稳定分类与新兴主题聚类，比较频次、影响和变化趋势。',
        'Split tickets into issue units, combine stable categories with emerging clusters, and compare frequency, impact and trends.',
      ),
      outputs: a(
        ['客诉主题地图', '代表性问题样本', '跨团队改进清单'],
        [
          'Complaint theme map',
          'Representative issue samples',
          'Cross-team improvement list',
        ],
      ),
    },
    {
      id: 'paid-media-budget',
      basis: 'project-pattern',
      title: t('广告预算与渠道组合', 'Advertising budget & channel mix'),
      question: t(
        '哪个广告值得加钱，哪个看起来热闹却没有经营贡献？',
        'Which campaigns deserve more budget, and which are busy without adding business value?',
      ),
      inputs: t(
        '广告报表、商品业务报表、归因窗口与预算目标。',
        'Ad reports, product business reports, attribution windows and budget goals.',
      ),
      method: t(
        '统一产品线与广告类型，比较成本、销售贡献和效率分布，形成可回测的预算调整方案。',
        'Align product lines and ad types, compare costs and attributed performance, and propose budget adjustments for evaluation.',
      ),
      outputs: a(
        ['投放效率象限', '预算调整建议', '渠道组合简报'],
        [
          'Ad efficiency quadrants',
          'Budget recommendations',
          'Channel mix brief',
        ],
      ),
    },
    {
      id: 'search-term-optimization',
      basis: 'project-pattern',
      title: t(
        '搜索词与广告机会诊断',
        'Search-term & advertising opportunities',
      ),
      question: t(
        '付费流量买来了，哪些词带来的是客户，哪些只是点击？',
        'Which paid search terms bring customers, and which mainly bring clicks?',
      ),
      inputs: t(
        '搜索词、广告活动、搜索查询表现与销售报表。',
        'Search-term, campaign, search-query performance and sales reports.',
      ),
      method: t(
        '按搜索意图和商品关联性分组，比较花费、转化与品牌相关性，提出扩量、观察或收缩的候选。',
        'Group by intent and product relevance, compare spend and conversion, and identify terms to expand, watch or reduce.',
      ),
      outputs: a(
        ['搜索词分组', '机会与浪费清单', '下一轮测试建议'],
        [
          'Search-term groups',
          'Opportunity and waste list',
          'Next-test recommendations',
        ],
      ),
    },
    {
      id: 'share-of-voice-tracking',
      basis: 'project-pattern',
      title: t(
        '搜索声量与竞争位置',
        'Search visibility & competitive position',
      ),
      question: t(
        '销售变化之前，品牌在关键搜索需求里是变强还是变弱？',
        'Is the brand gaining or losing visibility in important search demand?',
      ),
      inputs: t(
        '搜索查询表现、品牌与商品指标、可比时间区间。',
        'Search-query performance, brand and product metrics, comparable periods.',
      ),
      method: t(
        '对比需求变化与品牌的曝光、点击和购买份额，识别机会来自市场增量还是竞争位置变化。',
        'Compare demand with brand impression, click and purchase shares to distinguish market growth from competitive shifts.',
      ),
      outputs: a(
        ['搜索声量趋势', '竞争位置变化', '重点词与商品清单'],
        [
          'Search visibility trends',
          'Competitive position changes',
          'Priority terms and products',
        ],
      ),
    },
    {
      id: 'report-definition-alignment',
      basis: 'project-pattern',
      title: t('多表报表清洗与口径对齐', 'Report cleanup & metric alignment'),
      question: t(
        '几个系统都叫“销售额”，为什么一到复盘就对不上？',
        'Why do reports from different systems disagree on the same sales metric?',
      ),
      inputs: t(
        'CSV 或 Excel 报表、字段定义、时间与币种口径。',
        'CSV or Excel exports, field definitions, time windows and currency conventions.',
      ),
      method: t(
        '识别表头、日期与字段别名，映射到共同口径，明确销售、退款和广告归因的差异后再分析。',
        'Resolve headers, dates and field aliases; align definitions and expose differences in sales, refunds and attribution before analysis.',
      ),
      outputs: a(
        ['字段映射表', '可比分析数据', '口径差异说明'],
        [
          'Field mapping',
          'Comparable analysis data',
          'Metric discrepancy notes',
        ],
      ),
    },
    {
      id: 'revenue-billing-truth',
      basis: 'enterprise-skill',
      title: t('收入与账单异常核对', 'Revenue & billing reconciliation'),
      question: t(
        '重复扣费、退款和套餐变更混在一起，实际收入究竟是多少？',
        'How do duplicate charges, refunds and plan changes affect recorded revenue?',
      ),
      inputs: t(
        '授权账单、交易、退款、订阅与合同条款记录。',
        'Authorized billing, transaction, refund, subscription and contract records.',
      ),
      method: t(
        '沿交易和账户时间线核对状态，区分收入确认差异与真实账单异常，整理修复依据。',
        'Reconcile account and transaction timelines, distinguish accounting differences from billing errors, and assemble correction evidence.',
      ),
      outputs: a(
        ['收入状态快照', '账单异常分类', '修复与跟进建议'],
        [
          'Revenue status snapshot',
          'Billing exception groups',
          'Correction recommendations',
        ],
      ),
    },
  ]),
  ...group('inventory-planning', [
    {
      id: 'sku-replenishment',
      basis: 'enterprise-skill',
      title: t('SKU 补货与库存结构', 'SKU replenishment & stock mix'),
      question: t(
        '畅销品缺货、长尾品积压，采购预算该如何重新分配？',
        'Bestsellers run out while slow movers pile up. How should purchasing priorities change?',
      ),
      inputs: t(
        'SKU 销量、可用库存、在途、交期与服务目标。',
        'SKU sales, available and inbound stock, lead times and service targets.',
      ),
      method: t(
        '区分需求波动与供给延迟，按周转和断货风险分层，结合补货周期提出数量与优先级建议。',
        'Separate demand volatility from supply delays, segment turnover and stockout risk, and propose replenishment quantities and priorities.',
      ),
      outputs: a(
        ['库存风险分层', '补货建议表', '滞销处置候选'],
        [
          'Inventory risk tiers',
          'Replenishment proposals',
          'Slow-stock candidates',
        ],
      ),
    },
    {
      id: 'production-rescheduling',
      basis: 'enterprise-skill',
      title: t('生产排程与中断重排', 'Production scheduling & disruptions'),
      question: t(
        '插单、缺料或设备停机时，如何知道哪些订单会被连带影响？',
        'Which orders are affected when rush jobs, shortages or downtime disrupt production?',
      ),
      inputs: t(
        '订单交期、工艺路线、产能、物料与换线约束。',
        'Due dates, process routes, capacity, material and changeover constraints.',
      ),
      method: t(
        '识别瓶颈和硬约束，比较重排选项对交期与换线的影响，保留不可满足的条件及原因。',
        'Identify bottlenecks and hard constraints, compare delivery and changeover impacts, and expose infeasible requirements.',
      ),
      outputs: a(
        ['瓶颈地图', '重排方案', '订单交期影响表'],
        ['Bottleneck map', 'Rescheduling options', 'Order delivery impacts'],
      ),
    },
    {
      id: 'quality-nonconformance',
      basis: 'enterprise-skill',
      title: t('质量异常与纠正措施', 'Quality issues & corrective actions'),
      question: t(
        '同一类缺陷反复发生，怎样让问题解决到根因？',
        'How do you address the cause of a recurring defect, not just the latest incident?',
      ),
      inputs: t(
        '检验记录、不合格描述、批次信息与既往处理结果。',
        'Inspection records, defect descriptions, batch information and prior remedies.',
      ),
      method: t(
        '先整理影响范围与遏制动作，再建立根因假设和证据，跟踪纠正措施是否在后续样本中有效。',
        'Establish scope and containment, develop evidence-backed root-cause hypotheses, and check corrective actions against later samples.',
      ),
      outputs: a(
        ['异常与遏制摘要', '根因树', '纠正措施效果记录'],
        [
          'Issue and containment brief',
          'Root-cause tree',
          'Corrective-action results',
        ],
      ),
    },
    {
      id: 'returns-recovery',
      basis: 'enterprise-skill',
      title: t('退货处置与价值回收', 'Returns disposition & value recovery'),
      question: t(
        '退回来的货，怎样判断补货、翻新、清算还是退供应商？',
        'Should a returned item be restocked, refurbished, liquidated or returned to the vendor?',
      ),
      inputs: t(
        '退货原因、商品成色、保修规则与处置成本。',
        'Return reasons, item condition, warranty terms and disposition costs.',
      ),
      method: t(
        '结合成色、风险和回收成本比较处置路线，把客户处理与库存价值回收关联起来。',
        'Compare disposition routes by condition, risk and recovery economics, connecting customer resolution with inventory value.',
      ),
      outputs: a(
        ['退货分级', '处置经济性比较', '价值回收建议'],
        [
          'Return condition grades',
          'Disposition economics',
          'Recovery recommendations',
        ],
      ),
    },
    {
      id: 'logistics-exception-desk',
      basis: 'enterprise-skill',
      title: t(
        '物流异常与索赔准备',
        'Logistics exceptions & claim preparation',
      ),
      question: t(
        '延误、破损和短少同时出现，怎样尽快确定处置路线？',
        'How do you prioritize action when delays, damage and shortages occur together?',
      ),
      inputs: t(
        '运输状态、订单、签收凭证、异常记录与服务条款。',
        'Shipment status, orders, proof of delivery, incident records and service terms.',
      ),
      method: t(
        '按客户影响和时限分级，关联运输事件与证据缺口，为补发、追踪或索赔组织材料。',
        'Prioritize by customer impact and deadlines, connect shipment events to evidence gaps, and prepare resolution or claim material.',
      ),
      outputs: a(
        ['异常优先级', '处置路线', '索赔证据包'],
        ['Exception priorities', 'Resolution routes', 'Claim evidence pack'],
      ),
    },
    {
      id: 'carrier-portfolio',
      basis: 'enterprise-skill',
      title: t('承运商组合与运力策略', 'Carrier portfolio & capacity strategy'),
      question: t(
        '报价最低的承运商，算上延误和损耗以后还便宜吗？',
        'Is the lowest-rate carrier still economical after delays and damage?',
      ),
      inputs: t(
        '线路运量、报价、准时率、异常与运力承诺。',
        'Lane volumes, quotes, on-time performance, exceptions and capacity commitments.',
      ),
      method: t(
        '把成本、服务稳定性与可用运力放进同一张评分卡，比较线路分配和供应商组合。',
        'Combine cost, service reliability and available capacity in a scorecard, then compare lane allocations and carrier mixes.',
      ),
      outputs: a(
        ['承运商评分卡', '线路分配方案', '谈判准备简报'],
        ['Carrier scorecard', 'Lane allocation options', 'Negotiation brief'],
      ),
    },
    {
      id: 'energy-procurement-portfolio',
      basis: 'enterprise-skill',
      title: t('多站点能源采购与用能成本', 'Multi-site energy procurement'),
      question: t(
        '固定价、浮动价和峰值需量不同，怎么比较真正的总成本？',
        'How do fixed rates, variable rates and peak demand change total energy cost?',
      ),
      inputs: t(
        '站点负荷、用能账单、费率结构与供应商报价。',
        'Site load profiles, energy bills, tariff structures and supplier quotes.',
      ),
      method: t(
        '按真实负荷测算各报价情景，比较价格波动、峰值需量和合同组合对预算的影响。',
        'Model offers against actual load patterns and compare price volatility, peak demand and contract mixes against the budget.',
      ),
      outputs: a(
        ['负荷与费率画像', '报价情景比较', '采购预算风险简报'],
        [
          'Load and tariff profiles',
          'Quote scenario comparison',
          'Procurement budget risks',
        ],
      ),
    },
    {
      id: 'trade-compliance-preflight',
      basis: 'enterprise-skill',
      title: t('跨境发货资料预检', 'Cross-border shipment preflight'),
      question: t(
        '货已备好，哪些单证与商品信息缺口可能卡住交付？',
        'The goods are ready. Which document or product-information gaps may delay shipment?',
      ),
      inputs: t(
        '商品说明、交易资料、原产地与目的地要求。',
        'Product descriptions, transaction documents, origin and destination requirements.',
      ),
      method: t(
        '核对单证一致性，整理归类与来源依据，将需贸易专业人员复核的事项提前列出。',
        'Check document consistency, organize classification and origin evidence, and identify items for a trade specialist to review.',
      ),
      outputs: a(
        ['单证缺口清单', '归类依据索引', '发货前复核事项'],
        [
          'Documentation gaps',
          'Classification evidence index',
          'Pre-shipment review items',
        ],
      ),
    },
  ]),
  ...group('market-intelligence', [
    {
      id: 'tender-opportunity-radar',
      basis: 'enterprise-skill',
      title: t('跨区域招标机会雷达', 'Cross-region tender opportunity radar'),
      question: t(
        '招标公告很多，哪些真的符合产品能力和投标条件？',
        'Which tender notices fit the product and the conditions for bidding?',
      ),
      inputs: t(
        '公开公告、目标地区、产品关键词与资格条件。',
        'Public notices, target regions, product keywords and eligibility criteria.',
      ),
      method: t(
        '合并重复公告，核验截止时间和原始来源，对照资格、交付范围与产品适配度筛选。',
        'Deduplicate notices, verify deadlines and original sources, and compare eligibility, delivery scope and product fit.',
      ),
      outputs: a(
        ['可跟进招标清单', '资格与期限摘要', '机会判断简报'],
        [
          'Tender shortlist',
          'Eligibility and deadline notes',
          'Opportunity brief',
        ],
      ),
    },
    {
      id: 'competitive-move-monitor',
      basis: 'project-pattern',
      title: t('竞品发布与策略变化', 'Competitor launches & strategy shifts'),
      question: t(
        '竞品上新、换卖点或调整渠道，哪些变化会影响我们？',
        'Which competitor launches, messages or channel moves should change our plans?',
      ),
      inputs: t(
        '竞品官网、公开产品资料、传播内容与历史快照。',
        'Competitor sites, public product material, messaging and historical snapshots.',
      ),
      method: t(
        '对照产品参数、定位和渠道表达的变化，标记来源与时间，解释对自身产品和市场动作的影响。',
        'Compare specification, positioning and channel changes over time, retain sources, and explain implications for product and marketing.',
      ),
      outputs: a(
        ['竞争变化卡', '产品与传播对照', '应对选项简报'],
        [
          'Competitive change cards',
          'Product and messaging comparison',
          'Response options',
        ],
      ),
    },
    {
      id: 'evidence-led-risk-review',
      basis: 'project-pattern',
      title: t('众筹与新项目风险研究', 'Crowdfunding & venture risk research'),
      question: t(
        '项目看起来很热闹，哪些事实值得在合作或投入前核实？',
        'A project attracts attention. Which facts need checking before commitment?',
      ),
      inputs: t(
        '公开项目页、团队信息、用户反馈与交付相关材料。',
        'Public project pages, team information, customer feedback and delivery material.',
      ),
      method: t(
        '交叉核对项目叙事、时间线、社区和交付信号，保留相互矛盾的证据与待核实事项。',
        'Cross-check the narrative, timeline, community and delivery signals, preserving conflicting evidence and open questions.',
      ),
      outputs: a(
        ['风险信号矩阵', '可复核证据链', '进一步核实清单'],
        ['Risk signal matrix', 'Reviewable evidence trail', 'Further checks'],
      ),
    },
    {
      id: 'price-promotion-monitor',
      basis: 'enterprise-skill',
      title: t('竞品价格与促销观察', 'Competitor pricing & promotion watch'),
      question: t(
        '竞品降价是真变便宜，还是优惠、规格和渠道口径不同？',
        'Is a competitor really cheaper, or are offers, specifications and channels different?',
      ),
      inputs: t(
        '公开商品页、规格、促销条件和历史观察记录。',
        'Public listings, specifications, promotion terms and prior observations.',
      ),
      method: t(
        '按可比规格整理到手价与促销限制，记录时间和渠道，区分一次性活动与持续价格变化。',
        'Compare equivalent specifications and effective prices, retain offer terms and dates, and distinguish promotions from sustained changes.',
      ),
      outputs: a(
        ['可比价格表', '促销变化记录', '定价讨论简报'],
        [
          'Comparable price table',
          'Promotion change log',
          'Pricing discussion brief',
        ],
      ),
    },
    {
      id: 'social-demand-signals',
      basis: 'enterprise-skill',
      title: t(
        '社交讨论与新需求信号',
        'Social conversations & emerging demand',
      ),
      question: t(
        '哪些讨论只是短期热闹，哪些正在暴露新的用户需求？',
        'Which conversations are passing noise, and which reveal emerging customer needs?',
      ),
      inputs: t(
        '授权或公开讨论、产品关键词与观察时间区间。',
        'Authorized or public discussions, product keywords and an observation window.',
      ),
      method: t(
        '聚合主题并保留原始语境，比较持续性、相关性和用户问题，形成值得进一步验证的需求线索。',
        'Cluster themes with context, compare persistence and relevance, and identify demand signals worth further validation.',
      ),
      outputs: a(
        ['讨论主题趋势', '需求信号卡', '研究跟进清单'],
        [
          'Conversation theme trends',
          'Demand signal cards',
          'Research follow-up list',
        ],
      ),
    },
    {
      id: 'industry-intelligence-brief',
      basis: 'project-pattern',
      title: t('行业情报与决策简报', 'Industry intelligence for decisions'),
      question: t(
        '每天这么多资讯，哪些值得经营者花时间看？',
        'Which of the daily information stream deserves a business leader’s attention?',
      ),
      inputs: t(
        '行业公开资料、重点议题、业务目标与历史判断。',
        'Public industry material, priority topics, business goals and prior judgments.',
      ),
      method: t(
        '围绕一个业务问题组织来源，区分新事实、不同观点和推断，压缩成影响、未知项和下一步。',
        'Organize sources around a business question, separate facts from perspectives and inference, and summarize implications and next steps.',
      ),
      outputs: a(
        ['决策情报简报', '来源与分歧表', '业务影响清单'],
        [
          'Decision intelligence brief',
          'Sources and disagreements',
          'Business implications',
        ],
      ),
    },
    {
      id: 'partner-background-review',
      basis: 'project-pattern',
      title: t('合作对象背景与可信度核验', 'Partner background verification'),
      question: t(
        '企业介绍、人物履历和公开记录不一致时，应该相信哪一个？',
        'What should you trust when company claims, biographies and public records disagree?',
      ),
      inputs: t(
        '合作方公开资料、企业身份、角色信息与相关声明。',
        'Public partner material, company identity, role information and relevant claims.',
      ),
      method: t(
        '先匹配实体身份，再交叉核对角色、时间与公开活动，明确已核实、冲突和无法确认的内容。',
        'Resolve identities, cross-check roles, dates and public activity, and separate verified facts, conflicts and unknowns.',
      ),
      outputs: a(
        ['背景核验摘要', '声明与来源对应表', '合作前待确认事项'],
        [
          'Verification summary',
          'Claims-to-sources table',
          'Pre-partnership questions',
        ],
      ),
    },
  ]),
  ...group('knowledge-capability', [
    {
      id: 'expert-method-distillation',
      basis: 'project-pattern',
      title: t('专家判断沉淀为岗位 Skill', 'Expert judgment into role Skills'),
      question: t(
        '同一份资料，为什么老手能看到新人看不到的问题？',
        'Why does an expert spot issues a newcomer misses in the same material?',
      ),
      inputs: t(
        '授权专家访谈、工作样本、判断过程与反例。',
        'Authorized expert interviews, work samples, decision reasoning and counterexamples.',
      ),
      method: t(
        '提取判断顺序、关键条件、例外和常见误区，用新任务检查能否复现有用的专业判断。',
        'Extract decision sequences, conditions, exceptions and pitfalls, then test the method on new tasks.',
      ),
      outputs: a(
        ['岗位 Skill', '专业判断规则', '任务评测样本'],
        ['Role Skill', 'Decision rules', 'Task evaluation samples'],
      ),
    },
    {
      id: 'business-ontology-rules',
      basis: 'prototype',
      title: t('业务对象与关系建模', 'Business objects & relationship models'),
      question: t(
        '产品、订单、库存和渠道各有一套叫法，Agent 怎么理解同一笔业务？',
        'How can an Agent understand one business event across products, orders, stock and channels?',
      ),
      inputs: t(
        '业务对象、字段、关联关系、规则与代表性问题。',
        'Business objects, fields, relationships, rules and representative questions.',
      ),
      method: t(
        '将业务概念和约束组织为可检查的对象关系图，用场景问题验证模型是否表达了真实工作。',
        'Represent concepts and constraints in an inspectable relationship model and test it against actual business questions.',
      ),
      outputs: a(
        ['业务对象图', '关系与规则定义', '场景验证用例'],
        [
          'Business object graph',
          'Relationship and rule definitions',
          'Scenario validation cases',
        ],
      ),
    },
    {
      id: 'multimodal-knowledge-index',
      basis: 'project-pattern',
      title: t(
        '图文资料变可检索知识',
        'Searchable visual and textual knowledge',
      ),
      question: t(
        '关键答案藏在 PDF 的图、表和脚注里，团队怎样快速找得到？',
        'How do teams find answers buried in PDF diagrams, tables and footnotes?',
      ),
      inputs: t(
        '授权 PDF、技术手册、表格与资料版本信息。',
        'Authorized PDFs, technical manuals, tables and document versions.',
      ),
      method: t(
        '按页组织文字、图像与表格索引，保留资料范围和引用关系，让回答可以返回原始页面。',
        'Index text, images and tables by page, retain document scope and references, and connect answers to the original pages.',
      ),
      outputs: a(
        ['图文知识索引', '来源定位问答', '资料覆盖与缺口'],
        [
          'Multimodal knowledge index',
          'Source-located answers',
          'Coverage and gaps',
        ],
      ),
    },
    {
      id: 'case-based-onboarding',
      basis: 'prototype',
      title: t('岗位案例训练与知识带教', 'Case-based onboarding & coaching'),
      question: t(
        '培训手册看完了，新人遇到真实问题还是不会判断怎么办？',
        'New hires read the manual. How do they learn to judge real situations?',
      ),
      inputs: t(
        '岗位知识、典型业务案例、标准解法与常见误区。',
        'Role knowledge, business cases, reference solutions and common mistakes.',
      ),
      method: t(
        '把知识组织成情境任务，让学习者先判断，再对照业务关系、规则和解释进行反馈。',
        'Turn knowledge into scenario tasks, ask learners to decide, and give feedback through business relationships, rules and explanations.',
      ),
      outputs: a(
        ['场景练习库', '判断解释卡', '知识薄弱项记录'],
        [
          'Scenario exercise library',
          'Decision explanation cards',
          'Learning gap notes',
        ],
      ),
    },
    {
      id: 'meeting-expert-companion',
      basis: 'prototype',
      title: t('会议中的专业知识助手', 'In-meeting knowledge companion'),
      question: t(
        '开会讨论具体业务时，能否让知识助手听懂问题并参与答疑？',
        'Can a knowledge assistant respond to specific business questions during a meeting?',
      ),
      inputs: t(
        '参会者知情同意、会议问题、限定知识与角色配置。',
        'Participant consent, meeting questions, scoped knowledge and role configuration.',
      ),
      method: t(
        '通过语音接入、问题理解、知识回答和语音反馈串联场景，验证轮次衔接与响应体验。',
        'Connect voice input, question understanding, knowledge retrieval and spoken responses; test turn-taking and response quality.',
      ),
      outputs: a(
        ['场景化会议原型', '问答记录', '交互验证报告'],
        [
          'Scenario-specific meeting prototype',
          'Q&A record',
          'Interaction evaluation report',
        ],
      ),
    },
    {
      id: 'role-agent-workspaces',
      basis: 'prototype',
      title: t('岗位 Agent 与团队工作空间', 'Role Agents & team workspaces'),
      question: t(
        '个人用得好的 Agent，怎样让不同岗位各取所需、持续复用？',
        'How can an effective personal Agent become useful to multiple roles?',
      ),
      inputs: t(
        '岗位任务、知识范围、工具依赖与工作空间要求。',
        'Role tasks, knowledge scope, tool dependencies and workspace requirements.',
      ),
      method: t(
        '按岗位组合知识、Skill 和工具，在独立工作空间中保留任务上下文，将共用方法整理成可维护的能力包。',
        'Combine knowledge, Skills and tools by role, preserve context in scoped workspaces, and package shared methods for maintenance.',
      ),
      outputs: a(
        ['岗位能力包', '工作空间配置方案', '维护与复用说明'],
        [
          'Role capability pack',
          'Workspace configuration plan',
          'Maintenance and reuse guide',
        ],
      ),
    },
    {
      id: 'correction-regression-loop',
      basis: 'project-pattern',
      title: t('人工纠错变能力回归测试', 'Corrections into regression tests'),
      question: t(
        '同一个错误已经改过，下一次更新为什么还会出现？',
        'Why does an issue reappear after an update when the team already corrected it?',
      ),
      inputs: t(
        '真实任务样本、人工修订、失败原因与版本记录。',
        'Task samples, human revisions, failure reasons and version history.',
      ),
      method: t(
        '将纠错转换成有判断依据的测试任务，对照更新前后的输出，检查质量提升和已有能力是否退化。',
        'Turn corrections into evidence-backed test cases, compare outputs across versions, and check improvements and regressions.',
      ),
      outputs: a(
        ['回归任务集', '版本比较结果', '可保留的改进记录'],
        [
          'Regression task set',
          'Version comparison results',
          'Retained improvement log',
        ],
      ),
    },
  ]),
];
