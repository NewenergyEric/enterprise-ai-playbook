# Deployment Agent handoff / 部署 Agent 交接

## Scope / 范围

Target repository: https://github.com/NewenergyEric/enterprise-ai-playbook

Public source access does not grant production or commercial-use rights. Read [LICENSING.md](LICENSING.md) and the [publication review](docs/security/PUBLICATION-REVIEW-2026-10-10.md) before deploying. Retain the existing production branch; repository publication is not deployment authorization.

This is a **static marketing website**, not an Agent execution system. The user will arrange deployment separately. Do not upload reference projects, local caches, build-server artifacts or source research.

这是独立的静态营销网站，不是 Agent 执行系统。只部署本仓库构建出的公开站点文件。不要打包参考项目、原始研究、客户资料、缓存、开发日志或服务器构建文件。

## Build / 构建

1. Use Node.js 24.19+ and npm.
2. Run npm ci --ignore-scripts, then npm run security:check and npm run security:audit.
3. Set SITE_URL to the real HTTPS origin, with no trailing slash or path.
4. Run npm run check, npm run build, then npm test.
5. Publish **dist/client** only.

PowerShell example (replace the example origin):

```powershell
$env:SITE_URL='https://your-actual-domain.example'
npm ci --ignore-scripts
npm run security:check
npm run security:audit
npm run check
npm run build
npm test
```

SITE_URL is read at **build time**. It sets canonical URLs, language alternates, absolute social-image URLs and sitemap.xml. If unset, local preview still works; no public origin or sitemap is invented. Rebuild after changing the domain.

No runtime secrets, AI keys or database bindings are needed. Preserve package-lock.json and use npm ci for reproducibility.

## Static host configuration / 静态托管配置

- Output directory: dist/client
- Framework behavior: static HTML, CSS, JS, fonts, images and documents.
- Serve directories through index.html. /en/process/ must work as a direct entry and on refresh.
- Use 404.html for unknown routes and return HTTP 404.
- **Do not configure a catch-all SPA fallback to /index.html.** It would hide broken links and return Chinese content for missing English routes.
- _headers is included for hosts that support it. On other hosts, configure equivalent MIME types and conservative security headers.
- Serve .rsc as text/x-component if the platform requires an explicit MIME mapping. Public navigation uses ordinary anchors, not a server runtime.
- Apply long immutable caching only to hashed /_next/static/ assets. Do not immutable-cache unversioned fonts, images, HTML or PDFs.
- The optional local preview server binds 127.0.0.1 by default. It is for review, not a production Internet-facing server.
- The local preview serves a complete in-memory build snapshot. While rebuilding it retains the previous complete version; a new build is swapped in only after its final readiness marker exists. HTML and 404 responses use no-store to avoid stale preview errors.

The pinned Vinext exporter requests bare paths during prerender. trailingSlash stays false to avoid redirect-skipped output; postbuild creates directory index mirrors for the public trailing-slash URLs. Keep this normalization unless a future framework upgrade is verified to make it unnecessary.

Do **not** deploy dist/server. It contains build/runtime internals that are unnecessary for this static website.

## Entry points / 验收入口

- /, /zh/, /en/
- /zh/process/, /en/process/
- /zh/playbook/, /en/playbook/
- /en/playbook/#creator-partnerships
- /zh/playbook/#business-analysis
- /resources/pilot-brief-zh.md, /resources/pilot-brief-en.md
- Four PDF links on the homepage
- /og.png, /favicon.svg, /robots.txt
- /sitemap.xml after SITE_URL is set

## Release acceptance / 发布前验收

Automated checks cover content structure, static rendering, document language, headings, metadata and local resource links. Browser visual and interaction acceptance remains a separate release step:

- Review desktop and narrow mobile layouts in both languages.
- Select every scenario; use all category filters; search in both languages; confirm the no-results and reset states.
- Open all inner tabs, sample-brief tabs and FAQs with mouse and keyboard.
- Refresh a hashed Playbook link and switch languages; the selected scenario should remain selected.
- Check navigation, PDF downloads and editable brief downloads.
- Verify real HTTP 404 behavior, response MIME types and no unexpected cross-origin requests.
- Inspect canonical/hreflang/social preview against the final domain.
- Confirm contact details or any future lead form with the owner before adding them. No mailbox, calendar or submission endpoint has been invented.
- Confirm publication rights for all materials and final business wording.

There is no analytics tracker or business-data submission form. A hosting provider may still record ordinary access logs; set the deployment privacy policy accordingly.

## Runtime note / 运行时说明

The validated local build uses Node 24.19.0. An older Windows Node 24.13.0 runtime emitted a native libuv shutdown assertion, so avoid that combination. Do not suppress nonzero build exits: all seven expected pages must exist before deployment.
