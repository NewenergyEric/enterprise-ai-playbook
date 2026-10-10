# AIelsen / Agent Field Notes

### 从业务问题出发，看 Agent 交付了什么。

产品研究、营销创意、海外创作者合作、客服、调查、工程交接与日常运营。九个匿名案例记录需求怎样进入判断、判断怎样成为产物，以及团队如何接着使用。

<img src="reference/covers/ruby-scene.webp" alt="家庭体感游戏的内容拍摄场景示意：相机、分镜与客厅挑战道具" width="860">

**业务问题 → 关键行动 → 工作产物 → 前后变化 → 可复用方法**

中英文各有一个首页和九个完整案例，图解、交互提示、报告选读与九份工作表随语言切换。右上角「中文 / EN」保留当前案例和章节。

本目录是独立维护的公开案例源模块，接入现有服务站的 `/agent-cases/`。它不替代 FDE 服务站或 FDE Academy。

## 案例目录

| 展示化名 | 具体业务工作 |
| --- | --- |
| Bella | 从产品与 FAB 研究，到全案文案、创意分镜与 TVC 对照 |
| Velia | 一份产品底稿，继续服务内容、创作者、渠道与商务沟通 |
| Oliva | 产品、物流与售后咨询，接成客服可核对的建议回复 |
| Steve | 广告分析工具交接，查清实际规则、配置差异与经营待确认项 |
| Atlas | 众筹项目核查，把经验变成带来源、缺口和下一步的调查报告 |
| Nora | 将双语卡片做成图、文、音和操作一致的互动产品原型 |
| Leo | 将众筹评论整理成客服每天可用的新问题巡查清单 |
| Iris | 问卷进入上市内容与购买组合，上市后的认识再改进研究 |
| Ruby | 家庭体感产品的海外创作者筛选、个性化 pitch、回复与商务交接 |

案例逐一注明交付阶段；不把原型等同公开运营，也不以材料交付代替销售、融资或学习效果。

## 本地构建

使用 Node 24 LTS。此模块没有外部 npm 依赖，无需单独安装依赖。

```sh
npm run build
npm test
npm start
```

打开中文 `http://127.0.0.1:4194/` 或英文 `http://127.0.0.1:4194/en/`。端口可通过 `FIELDNOTES_PREVIEW_PORT` 设置。预览只提供 `site/`，不存在的路径返回真正的 HTTP 404。

## 维护哪一层

```text
content/             中文案例正文、业务摘要、匿名提案、图片说明
content/en/          对应英文内容；与中文保留相同字段、ID 和事实边界
reference/series/    公共样式与交互
reference/series/brand-palette.css 主站配色层，构建时在其他样式之后加载
reference/covers/    经审查的场景封面
reference/bella/     Bella 已公开的对照页面与资产
tools/case-boards.mjs 中英 SVG 工作画板；照片按语言共享
tools/interface-locale.mjs 共用界面与交互的构建时语言映射
tools/case-sections.mjs 业务摘要与 pitch 的呈现
tools/build.mjs      静态构建入口
tools/check.mjs      路由、资源、语言与公开输出检查
site/               构建产物，不手改、不提交
```

先改源内容，再构建和验收。主站接入见仓库根目录的 `DEPLOY-AGENT-CASES.md`。发布根目录仍是完整 `dist/client/`，不能把本模块的独立构建覆盖到域名根目录。

配色对齐 FDE 主站：白底 `#ffffff`、深蓝文字 `#001f3f`、青色强调 `#007d86`、电蓝交互 `#3246ff`、冷灰面板 `#f3f6f7`。深蓝用于按钮、少量过渡段和页尾，不作为整片首屏背景。更改共享主题时，同时检查 `tools/case-boards.mjs` 的图解配色、中英文页面和 Bella 保留页面的文字对比度；不要用滤镜给照片统一染色。

## 内容与图片原则

- 用业务语言交代问题、判断和产物；实现细节留给需要深入的读者。
- 中文页面使用中文画板，英文页面使用英文画板。Ruby 中文页可展开英文提案；英文页直接展示，不重复同一版本。
- 案例切换语言保留 slug 与 hash；返回首页、相关推荐和下载保持当前语言。Bella 原始创意对照图片不重绘，只翻译页面说明。
- 示例邮件与工作图解是匿名方法重写，不是原始外发邮件或系统截图。
- 场景封面用于解释任务；不作为真实客户现场或业绩证明。Bella 的对照和单独授权的公开产品照片按页面说明使用。
- 不加入原始客户资料、联系人、邮件往来、机密报表、内部访问地址或凭据。
- 新案例必须分别写清：已形成、已交付、已使用、已上线，以及仍待验证的部分。

本仓库展示素材不构成第三方品牌背书。不要从示意图或匿名重写中推导客户身份。未另行提供素材许可时，不默认授予第三方素材再分发或商业再使用权。

## English

AIelsen Agent Field Notes is a bilingual collection of nine anonymized business delivery cases. It presents the problem, decisions, working outputs and handoff—not an unqualified claim of autonomous success. Both languages include full case narratives, localized diagrams, interactions, report excerpts and editable workbooks. Switch languages without losing the current case or section.

Build with Node 24 LTS using the commands above. The source module is additive to the FDE service site and Academy. Integrate Chinese at `/agent-cases/` and English at `/agent-cases/en/`, and deploy the complete existing `dist/client/` output after combined checks.
