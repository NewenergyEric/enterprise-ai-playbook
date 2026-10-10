# Optional Toolkit request UI / 可选工具箱申请入口

The owner approved combining the existing contact-request UI with the complete `main` site. This supersedes the earlier no-entry policy; **it does not authorize publishing the private Toolkit itself**.

- Keep bilingual request pages at `/zh/toolkit/` and `/en/toolkit/`, linked from service navigation and footer.
- Preserve all services, nine plays and 66 More applications, FDE Academy and nine Agent cases. The combined build has 112 entries.
- Never include private repository URLs, Skill files, packages, original client material or Toolkit download links in public output.
- Collection is disabled unless both `TOOLKIT_LEAD_ENDPOINT` and `TOOLKIT_PRIVACY_URL` are valid and owner-approved.
- Read the [receiver and privacy contract](docs/TOOLKIT-LEAD-ENDPOINT.md) before configuring either. No receiving backend, privacy notice, payment processor or access grant is provided here.
- Use synthetic data and a local mock for form tests. Do not send a test message to a real receiver without permission.
- The [static hosting contract](DEPLOYMENT.md) controls any separately authorized release.

Tests preserve the request UI, disabled-by-default collection, complete routes and private-content boundary. Publishing repository changes does not enable a receiver or deploy production.
