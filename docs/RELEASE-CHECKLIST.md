# Start, verify and hand over / 上手、验收与交接

This checklist links the existing product guides rather than introducing a second learning flow. A GitHub release is a versioned collection of learning materials, not a production-service certification.

本清单沿用已有学习流程。GitHub Release 为学习资料的版本记录，不是生产服务认证。原有 [许可](../LICENSING.md)和第三方权利继续适用。

## Read and practice / 阅读与实训

- [ ] Start with the [Chinese learning path](https://fde.aielsen.com/academy/zh/paths/) or [English learning path](https://fde.aielsen.com/academy/en/paths/). Choose one task and define an observable result. 先选一项工作，写清可观察的完成标准。
- [ ] Follow the existing HTML [Chinese review guide](https://fde.aielsen.com/academy/zh/guide/) or [English review guide](https://fde.aielsen.com/academy/en/guide/). The same pages are included at `academy/zh/guide/index.html` and `academy/en/guide/index.html` in a complete static export.
- [ ] Use the [practice-kit instructions](../academy/practice-kit/README.en.md) / [中文实训说明](../academy/practice-kit/README.zh.md) for Python prerequisites, installation, synthetic tasks and expected results. No customer data or live model key is needed for the offline mechanism tests.
- [ ] Report mechanisms, model-task results and business outcomes separately. Manual checkmarks do not establish a passing test or a real customer result. 手工勾选不等于自动验收；扩展讲义当前为中文。
- [ ] Share a non-sensitive result in [the evidence discussion](https://github.com/NewenergyEric/enterprise-ai-playbook/discussions/23), including what remains unverified.

You can ask an Agent: “Using a synthetic task, help me complete W01's project-fit memo, identify missing evidence and choose the next Academy exercise. Keep business outcomes unverified until measured.”

可以直接告诉 Agent：“用一个合成任务，帮我完成 W01 项目判断书，列出缺失证据，再选择下一项学院练习；没有实测的业务效果保持未验证。”

## Local source install / 本地源码安装

- [ ] Get the exact tagged source from [Releases](https://github.com/NewenergyEric/enterprise-ai-playbook/releases) or a recorded commit. Keep its lockfile. Record the source version before testing.
- [ ] Follow [DEVELOPMENT.md](DEVELOPMENT.md): Node 24 LTS, `npm ci --ignore-scripts`, security checks, typecheck/lint, full build, then post-build tests. Use a fresh directory and loopback preview.
- [ ] Confirm 112 entry routes: 9 service/request, 83 Academy and 20 Agent-case entries. Check both languages and the download links. Toolkit submission stays disabled without separately approved collection configuration.
- [ ] If installation fails, retain the error and source version; correct that failure before continuing. Do not force dependency upgrades or replace the complete export with one module.

## Static release / 静态交付

- [ ] Match the release tag, commit and successful [build/security runs](https://github.com/NewenergyEric/enterprise-ai-playbook/actions). The build now runs the same dependency policy before producing an artifact; new advisories or an expired exception stop that build.
- [ ] Verify archive SHA-256, archive membership and clean extraction. A deployable archive contains only the complete `dist/client/` contents, including license notices. Source archives are for study, not direct hosting.
- [ ] Preview the extracted artifact in a fresh directory. Confirm representative pages and true 404 responses before selecting a production target.
- [ ] Follow [DEPLOYMENT.md](../DEPLOYMENT.md) for an authorized atomic switch and rollback. Preserve the previous complete artifact. Do not infer the host from a domain name or publish source, `.git`, dependencies or `dist/server/`.
- [ ] After deployment, check the real origin: both languages, sitemap, robots, metadata, Academy/case assets, Toolkit disabled state and unknown-route 404s. Record the live version separately from the GitHub release.

## Known dependency boundary / 已知依赖边界

On 2026-10-12, the npm registry still lists `braces@3.0.3` and `vinext@1.1.0` as latest, and the [upstream advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) lists no patched braces release. The audit returns six affected entries from this one advisory. The existing scoped build-only exception still expires **2026-10-24**; it has not been extended or dismissed. Static-only hosting removes the production Node process from the supported deployment, but does not fix vulnerable build tools.

2026-10-12 复核仍无上游补丁，告警保持打开。只交付静态文件，可信源码构建保持最小权限；例外到期或风险发生变化时必须重新处理，不能靠延长期限或强制降级绕过审计。
