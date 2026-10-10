# Security policy / 安全政策

## Report privately / 私密报告

Use GitHub's **Security → Report a vulnerability** for this repository:

[Submit a private vulnerability report](https://github.com/NewenergyEric/enterprise-ai-playbook/security/advisories/new).

不要在公开 Issue、PR、日志或截图中发布漏洞利用细节、真实密钥或客户数据。提交最小合成复现、受影响分支/提交、预期与实际行为及影响说明；不要发送可用凭据。若入口暂不可用，只在普通 Issue 中请求安排私密安全联系渠道，不提供漏洞细节。维护者不承诺固定响应时限、赏金或专业安全服务。

## Supported scope

Security fixes target the current heads of `main`, `feat/fde-academy-20260908` and `feat/agent-cases-20260910`. Old commits, archived teaching snapshots and unreviewed forks are not supported releases. The full application source is on the Agent cases integration branch; default-branch documentation is not evidence that all application modules have been merged.

The supported deployment is **static files from `dist/client/` only**. There is no production Agent runtime, authentication service, customer database or model API in this repository. Academy records and brief exports are local to the browser. Examples and the Python practice kit use synthetic data and are not production authorization, identity or auditing controls.

The Academy maintenance branch also contains an optional Toolkit lead form. It can submit contact details to a separately configured endpoint; it is **not** a browser-only note export. No receiving service is included or audited here. Enabling collection requires owner approval, a public privacy notice, secure endpoint validation, retention/deletion rules and server-side anti-abuse controls. Builds without that configuration must not submit. The Agent cases branch does not inherit this feature automatically.

## Safe operation

- Never expose `vinext dev`, Vite, repository roots, `dist/server/`, `.git`, `.env`, raw logs or local notes to the internet. Local previews bind to loopback by default.
- Only deploy a reviewed static build. A GitHub update does not deploy or patch an existing hosted site. Review TLS, headers, access logs and host configuration separately.
- Install the committed lockfile with a supported Node 24 LTS runtime. Verify dependency advisories before building; never run arbitrary PR code with production credentials.
- Do not enter customer secrets in browser notes or exercises. Local storage is not encrypted, access-controlled enterprise storage; same-origin scripts and a shared browser can access it.
- Preserve publication checks for downloaded PDFs, ZIP contents and image metadata. Removing a file from the latest commit does not remove it from Git history.
- Pin workflow actions, keep tokens read-only by default, and never use `pull_request_target` to execute untrusted code. Security reports must remain private even when source is public.

## Review and known limitations

See [the dated publication review](docs/security/PUBLICATION-REVIEW-2026-10-10.md) and [dependency risk acceptance](docs/security/dependency-exceptions.json). A green test or zero secret matches is not a guarantee of safety. Automated scanning does not prove asset rights, perfect anonymization, absence of unknown vulnerabilities or production readiness.

Test only local copies and synthetic inputs. This policy does not authorize scanning production infrastructure, accessing other users' records, social engineering, denial of service or testing discovered credentials. If a real secret is found, notify privately; the owner should revoke it before deciding whether history cleanup is necessary. History rewriting requires explicit owner coordination.
