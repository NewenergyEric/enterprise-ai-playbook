# Toolkit email enquiry contract / 工具箱邮箱咨询

The public website contains a static, bilingual email form. It does not include a mailbox, receiver, database or private Toolkit contents. The reviewed receiver is deployed separately. Both `TOOLKIT_LEAD_ENDPOINT` and `TOOLKIT_PRIVACY_URL` must be owner-approved public HTTPS URLs before enabling collection. Without both values, fields and submission remain disabled.

本页只收邮箱和选填的工作需求，不再询问微信、组织、职位或购买意向。访客勾选同意后才提交。网页配置中不能出现收件邮箱路由、SMTP 凭据、令牌、密码或签名地址。接收接口和隐私页地址仍由 `lib/lead-endpoint.ts` 在序列化前校验，不接受 URL 用户信息、查询字符串、片段或生产回环地址。

## Request and response

POST JSON to the configured endpoint, normally on the same website origin at `/api/toolkit-contact`:

```json
{
  "method": "email",
  "contact": "reader@example.test",
  "message": "A weekly industry brief.",
  "locale": "en",
  "consent": true,
  "website": "",
  "submissionId": "caller-generated-UUID-v4",
  "formOpenedAt": 0,
  "captchaToken": "",
  "source": "fde-toolkit",
  "policyVersion": "fde-toolkit-2026-10-13"
}
```

`formOpenedAt` is the client timestamp when the form opened; the zero above is a schema example, not a valid submission. The recipient is fixed in private server configuration and must never be accepted from the request. Limit email to 254 characters and message to 500. Validate syntax, exact field names, `source`, `policyVersion`, locale, consent, UUID and the honeypot on the server. Store consent time and policy version with the encrypted note.

After the receiver durably queues the note, return HTTP 202 with `{"ok":true,"status":"queued","requestId":"opaque-receipt-id"}`. This means the note is queued, not that a notification reached the owner's mailbox. The browser requires all three acknowledgement fields, clears the form only on success, and retains the draft and submission ID when receipt is unknown. It never automatically retries or falls back to another receiver. Browser requests omit credentials, reject redirects, omit referrers and time out after 15 seconds.

The receiver exposes a sibling GET endpoint formed by appending `-config`: `/api/toolkit-contact-config`. Return only `{"available":true,"siteKey":""}`. An empty site key uses the existing minimum-time heuristic, honeypot and persistent quotas; it is not equivalent to a CAPTCHA. If a real Turnstile key is configured, the widget loads only after consent and the receiver validates its token, hostname and `fde_toolkit_contact` action. Incomplete key pairs fail closed. The optional widget follows [Cloudflare's explicit rendering API](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/).

## Receiver and privacy requirements

- Use an independent FDE queue and data key; do not read or reuse another product's visitor records or encryption key.
- Allow only the approved website Origin. Keep the API behind the website's same-origin reverse proxy; arbitrary origins and recipients are rejected.
- Enforce persistent request, contact, intake, queue and notification limits; cap body bytes. Store contact payloads with authenticated encryption. Logs contain only event names, opaque references and counts.
- Keep one submission idempotent across retries. Queue accepted notes before acknowledging; retain them through SMTP outages and retry with bounded backoff. Successful SMTP acceptance removes the contact payload from the website queue.
- The reviewed private receiver expires queued notes after 30 days and supports withdrawal by receipt reference. Mailbox retention and the withdrawal response are separate operator duties. The owner must approve the published privacy notice, retention and deletion procedure before enabling collection.
- Do not expose private repositories, Skill bodies, packages, attachments, payment information, secrets or raw customer data. Submission does not grant Toolkit access or subscribe anyone to marketing.

## Verification

Use synthetic contacts and a local SMTP sink only: bilingual email-only requests, optional empty message, invalid email, absent consent, bad source/policy, unknown fields, oversized body, honeypot, disallowed origins, duplicate submissions, quota exhaustion, receiver outage, timeout/ambiguous acknowledgement and queue restart. Verify drafts survive errors, success is only an acknowledged queue state, withdrawal and retention work, and no contact appears in public assets or logs. Production notification delivery is a separate check by the authorized operator.

Keep receiver code and private operational evidence outside this public static website repository. Publish only the complete website export; the private receiver is not part of `dist/client/`.
