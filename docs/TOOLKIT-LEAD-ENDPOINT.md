# Toolkit lead endpoint contract / 工具箱申请接收端契约

This repository only contains the static form. It does not include a mailbox, CRM, payment processor or database. A deployment Agent may set `TOOLKIT_LEAD_ENDPOINT` and `TOOLKIT_PRIVACY_URL` after privacy review. If either value is absent or invalid, the form stays non-submitting and tells the visitor that nothing was sent.

本仓库只有静态表单，不包含邮箱、CRM、支付处理器或数据库。部署 Agent 只有在完成隐私审查后，才可以配置负责人控制的接收端 `TOOLKIT_LEAD_ENDPOINT` 和真实隐私说明 `TOOLKIT_PRIVACY_URL`。任一变量缺失或地址无效时，表单保持不可提交，并明确告诉访客没有发送任何信息。

## Request body / 请求字段

### Publication security update (2026-10-10)

Set **both** `TOOLKIT_LEAD_ENDPOINT` and `TOOLKIT_PRIVACY_URL` before enabling collection. Both must be public HTTPS URLs without userinfo, query strings or fragments; production loopback URLs are rejected. Never put a password, API key, signed token or private routing information in either value: configuration is embedded in public static output. Sanitization happens on the server/build side before client props are serialized.

The privacy notice must identify the data controller, purpose, fields, retention period and a usable deletion/withdrawal channel. Missing/invalid configuration disables submission visibly. This code update does not supply or approve such a notice or receiving service. Browser requests omit credentials, reject redirects, time out after 15 seconds and require an explicit JSON `{ "ok": true }` acknowledgement. A timeout means receipt is unknown, not that a request could not have reached the receiver. Do not automatically retry or send the payload to an alternative endpoint.

启用前须配置接收端和真实的隐私说明地址。生产地址不得包含密码、查询令牌或片段，也不能是本机回环地址。隐私说明和服务端的数据保留、删除、限流等措施仍须负责人审查；前端校验不能替代它们。

The browser sends JSON over `POST` with `Content-Type: application/json`:

```json
{
  "email": "",
  "wechat": "",
  "organization": "",
  "role": "",
  "interest": "private-preview",
  "useCase": "",
  "language": "zh",
  "consent": true,
  "source": "fde-web-toolkit-access",
  "website": ""
}
```

The endpoint must validate again; browser validation is only a usability layer.

- At least one of `email` and `wechat` is required. Normalize whitespace and cap lengths before storage.
- Validate email syntax, but do not use email as an account credential.
- Accept `interest` only from the documented values: `private-preview`, `purchase`, `team-adaptation`.
- Cap `useCase` and treat it as untrusted text. Reject scripts, HTML and unexpected JSON fields where practical.
- Require `consent === true`, record the consent timestamp and policy version, and provide deletion/withdrawal handling.
- Require `source === "fde-web-toolkit-access"` and ignore the honeypot when it is empty; reject or silently discard non-empty honeypot submissions.
- Never accept file uploads, passwords, payment-card data, access tokens, customer exports or production credentials.

## Response / 返回

Return a short JSON response and an appropriate status code:

```json
{ "ok": true, "requestId": "owner-generated-non-sensitive-id" }
```

Do not return Toolkit URLs, repository paths, internal review notes or a payment link from an unauthenticated form submission. A `4xx` response should contain only a generic validation message; a `5xx` response should not disclose stack traces.

## Required server controls / 服务端门禁

1. Allow CORS only for the production FDE-web origin and an explicitly approved local preview origin. Reject arbitrary `Origin` values.
2. Apply IP and contact-based rate limits, a payload-size limit and bot protection. The honeypot is not a complete bot defense.
3. Use HTTPS, encrypted storage and least-privilege access. Do not write contact values to request logs, analytics events or error traces.
4. Define a retention period, deletion path and owner for the email/WeChat data before enabling the endpoint.
5. Keep the endpoint separate from payment collection. After human review, send the buyer to a separately approved checkout or invoice flow; do not turn the static form into a payment form.
6. Keep Toolkit packages behind private access control. The endpoint may create a review ticket, but it must not expose GitHub private URLs, ZIP files or raw audit reports to the browser.
7. Monitor failures without recording the submitted contact. Return `429` for rate limits and keep the client message generic.

## Release test / 上线前测试

Use synthetic contacts only:

- valid email-only, WeChat-only and both-contact submissions;
- malformed email, missing contact, missing consent, oversized fields and non-empty honeypot;
- repeated requests to confirm rate limiting;
- disallowed origins and missing/invalid endpoint configuration;
- confirm no request log, response, static HTML or public asset contains a Toolkit file path or submitted contact.

The endpoint is not part of this repository's automated test suite. Record its owner-approved test evidence outside the public website repository before enabling it in a production build.
