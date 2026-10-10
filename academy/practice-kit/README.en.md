# AIelsen FDE / Offline engineering practice kit

An independent teaching scaffold with synthetic data. It makes no model calls, sends no messages and connects to no business system. Browser labs use a separate synthetic dataset; do not reconcile them as one customer cohort.

## Quick start

Unzip and open a terminal in this directory. Python 3.10+; no third-party packages.

```sh
python -m unittest discover -s tests -v
python tenant_extension.py
python demo.py
python evaluate.py
python analysis.py
```

Expected: 37 tests (21 baseline mechanisms and 16 tenant-extension tests) and five mechanism evaluations pass. Fourteen raw orders reconcile to eleven accepted, one duplicate and two quarantined. Store A has five fully observed members and two repeat buyers: 40%. The separate DiD illustration is three percentage points, with no significance calculation.

The independent tenant-extension fixture selects p01 and p04 for store A, snapshot 2026-09-01 and a 30–90-day inactivity window. It reports consent, unknown-date and out-of-window exclusions. The proposal is read-only. The demo simulates an allowlisted tag action and request replay in memory. It is not the same cohort as orders.csv, and does not use a model.

## Implemented versus not implemented

Implemented: read-only CSV import, exact duplicates, quarantine, store scope, full-window metrics, synthetic eligibility, budget, bound confirmation, expiry, idempotency, in-memory audit and a bounded read-only tool loop.

Not implemented: real authentication, model planning, vector retrieval, an MCP server, database transactions, persistence, cross-process concurrency, real offers, monitoring infrastructure, SSO or enterprise security certification. A process-local lock is not a distributed transaction.

`ScriptedPlanner` is a fixed script, not model intelligence. Tests verify listed mechanisms, not language understanding, resistance to model prompt injection or production reliability.

## File map

- `engine.py`: data, metrics, action contracts and the teaching loop.
- `tenant_extension.py`: segments, proposals, coupon/tag simulations, parameter binding, request idempotency, status queries and a write-stop switch for W05/W08/W09.
- `tests/test_tenant_extension.py`: sixteen executable extension-contract tests.
- `data/orders.csv`: duplicates, refunds, incomplete windows and invalid records.
- `data/ontology.json`: object, link and action sketch.
- `data/identity-candidates.csv`: identity exercise; no automatic merges.
- `data/ad-report-a.csv` and `ad-report-b.csv`: report-definition exercise.
- `exercises/knowledge-packet.md`: two synthetic manuals and questions.
- `exercises/eval-design.json`: normal, edge and adversarial specifications for your harness.
- `tests/test_engine.py`: executable engineering tests.

## Integrating a model

1. Choose a provider in an authorized environment and check current official tool documentation. Use environment variables for keys, never browser inputs or repository files.
2. Implement `choose(context)`. Provide the task and authorized, minimized observations. Return `{"tool":"read_metric","arguments":{"store":"A"}}` or `{"done":true,"summary":"..."}`.
3. The model proposes a tool; the service still validates allowlists, schemas and scope. Never execute arbitrary model-generated shell commands, Python or unreviewed SQL.
4. Pass your planner into `run_teaching_loop`. Handle timeouts, malformed responses, rate limits, budget and maximum steps. Malformed tool requests must fail closed.
5. Record sanitized operational summaries, model versions, tool traces, final state and cost. Do not request or store private internal reasoning.
6. Add clarification, abstention, injected-document and failed-tool cases. Repeat trials and keep a holdout; one successful run is not stable capability.

References: https://developers.openai.com/api/docs/guides/function-calling and https://www.anthropic.com/engineering/building-effective-agents . Provider APIs evolve; verify before integrating.

## Staged assignments

W1–W3: define the job, roles and metric contract. Explain why the store-A metric is 2/5 rather than 2/6. Do not change definitions to improve a result.

W4–W6: add unknown fields, out-of-order events and ambiguous identities. Preserve quarantine, versions and distinctions between real permissions and synthetic eligibility.

W7–W9: assert final state, replay a request after a simulated lost response and test concurrent budget commitments. Explain limitations of in-memory audit, authentication and deployment.

W10–W12: assemble three-layer acceptance, explain unidentifiable causal effects and classify reusable assets. Without a model integration, label the portfolio an engineering-mechanism sandbox, not a complete agent.

## Rights and confidentiality

Written for AIelsen education, with no original customer files or third-party course screenshots. Adapt for internal team learning with appropriate rights checks for any added materials. No production, legal-compliance, accreditation or performance guarantee.
