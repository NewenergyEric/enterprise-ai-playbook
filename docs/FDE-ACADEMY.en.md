# FDE Academy · From a business problem to an accepted delivery

[Learn online](https://fde.aielsen.com/academy/en/) · [12-week curriculum](https://fde.aielsen.com/academy/en/curriculum/) · [中文](FDE-ACADEMY.md) · [Guide home](../README.en.md)

A Forward Deployed Engineer connects field discovery, product capabilities, business judgment and engineering constraints. The outcome is a working capability with evidence that someone else can inspect and operate.

The course follows a synthetic retail membership project. The business wants better repeat purchasing, CRM and POS identities disagree, operators distrust the proposed audience, and IT needs clear access and operating responsibilities. Learners progress from project qualification to data adaptation, an advisory agent, controlled actions, outcome analysis and product feedback.

This is not an introductory programming course or a production agent platform. Engineering learners should know Python or TypeScript, SQL, HTTP APIs, Git and basic testing. Business participants can follow a role-specific path without completing every coding assignment.

## Choose your learning path

| Role | Focus | Question to bring | Expected work |
| --- | --- | --- | --- |
| FDE / solutions architect | W01–12 | How does a product become a useful customer capability? | Reproducible delivery portfolio and evidence pack |
| Data / agent engineer | W03–09, W12 | What must code guarantee, and what may a model decide? | Contracts, tools, model traces, evaluation and runbook |
| Business / marketing / operations expert | W02, 03, 05, 07, 08, 10 | What is useful, what must be refused, and how is quality judged? | Task specifications, gold examples, exceptions and business rubric |
| Leader / sponsor | W01, 03, 09, 10, 11 | Is the investment justified, who owns risk, and when is it complete? | Pilot decision, scope, ownership and acceptance agreement |
| Career transition | Prerequisites, then the full path | How can I demonstrate delivery judgment beyond an API demo? | A portfolio honestly labeled as synthetic training work |

[Review prerequisites](https://fde.aielsen.com/academy/en/paths/). Adjust the pace to your experience; 12 weeks is a curriculum structure, not a guarantee of capability, employment or business returns.

## Four phases, four substantive handoffs

| Phase | Work | Exit questions |
| --- | --- | --- |
| **W01–03: Frame the problem** | Product fit, field interviews, business objects, metrics and scope | Who uses the result? What is the baseline? Can another person recompute the metric? What is excluded? |
| **W04–06: Ground the advice** | Data adapters, identity, semantics, read-only tools and permissions | Where does each recommendation get its evidence? How does it stop without evidence? Is access enforced in code? |
| **W07–09: Control the action** | Layered evaluation, actions, idempotency, status checks, observability and drills | Which layer failed? Can a timeout cause duplicate effects? Who takes over operations? |
| **W10–12: Establish and hand over** | Outcome analysis, acceptance, asset layers, transfer and defense | Which claims are supported? Can someone reproduce the work? What transfers, and what needs adaptation? |

![Action states and recovery](media/states-en.svg)

## Weekly work and review questions

Repeat this loop: study the lesson, implement the exercise, retain evidence, review against acceptance, revise. Reading progress is not project completion.

| Module | Work to complete | Critical review question |
| --- | --- | --- |
| [W01 Project qualification](https://fde.aielsen.com/academy/en/curriculum/01/) | Fit/Gap memo, defer conditions, baseline owner and environment check | Why not a rule, script or existing product? Who supplies representative samples? |
| [W02 Discovery](https://fde.aielsen.com/academy/en/curriculum/02/) | Observe business, IT and operators; separate facts, interpretations and requests; retain disagreements | Which claim was observed, and which is one person's account? How will you resolve the conflict? |
| [W03 Metrics and scope](https://fde.aielsen.com/academy/en/curriculum/03/) | Denominator, time window, exclusions, version, executable checks and change rules | Can another person calculate the same number? Did the definition change after seeing the result? |
| [W04 Data adaptation](https://fde.aielsen.com/academy/en/curriculum/04/) | Preserve raw inputs; handle duplicates, refunds and late events; quarantine and reconcile | Does an empty answer mean no matching objects, no evidence, or an interface failure? |
| [W05 Advisory agent](https://fde.aielsen.com/academy/en/curriculum/05/) | Objects and relations, `segment_members`, `propose_operation`, model integration and traces | What belongs to computation, retrieval and the model? Can advice be traced to a metric version and snapshot? |
| [W06 Security and architecture](https://fde.aielsen.com/academy/en/curriculum/06/) | Data flow, tenant/field/tool access, denial tests, logging and retention choices | Is the action actually prohibited by the service, or merely discouraged in a prompt? |
| [W07 Evaluation and change](https://fde.aielsen.com/academy/en/curriculum/07/) | Normal, edge, adversarial and holdout sets; frozen versions; separate mechanism and model-task results | Does a fluent answer hide a wrong final state? Does an average score hide a safety failure? |
| [W08 Controlled actions](https://fde.aielsen.com/academy/en/curriculum/08/) | Simulated coupons/tags, bound confirmation, idempotency, budget rechecks and unknown-result queries | What happens on duplicate submission, changed parameters or a timeout? |
| [W09 Production engineering](https://fde.aielsen.com/academy/en/curriculum/09/) | Traces, failure drills, stop/recovery procedures, cost accounting and runbook | What is the total cost per completed task? Does code rollback reverse business effects? |
| [W10 Attribution and acceptance](https://fde.aielsen.com/academy/en/curriculum/10/) | Separate system capability, adoption and outcomes; document observation windows and control assumptions | Did the system work, did people use it, or was there attributable improvement? |
| [W11 Retrospective and product feedback](https://fde.aielsen.com/academy/en/curriculum/11/) | Tenant-specific / industry / product assets; reproducible feedback; a second-scenario transfer analysis | Does removing a customer name make an artifact reusable? Which semantics and permissions change? |
| [W12 Defense and review](https://fde.aielsen.com/academy/en/curriculum/12/) | Evidence index, normal and failure demos, independent reproduction and a new constraint | What did you contribute? What remains untested? Can you explain and adapt the design? |

## A running task: “Find members who have not returned recently”

### 1. Turn an ambiguous request into a contract

Clarify the store, snapshot date, and whether inactivity means no visit or no valid purchase. A training example may use a 30–90-day window since the last valid purchase. That is a teaching choice, not a default for a real business.

CRM IDs, POS IDs, names and phone numbers are not interchangeable identities. Version the matching rules and queue ambiguous matches for review. Retain explicit treatment of duplicates, refunds and unknown records.

### 2. Let tools supply evidence and the model explain it

`segment_members` is a read-only computation tool. It accepts the store, date and window and returns a segment reference, exclusion counts, metric version and evidence snapshot. Trusted tenant and authorization context must not come from a model-selected field.

`propose_operation` accepts valid references and constraints and proposes an action without issuing a coupon. The model clarifies, selects tools and explains uncertainty; code computes, validates, authorizes and enforces side-effect boundaries. Interoperability protocols such as MCP do not supply business semantics or authorization automatically.

### 3. Prove side-effect control separately

Coupons and tags in the kit are local simulations. Bind confirmation to the actor, tenant, snapshot, parameter digest, amount, rule version and expiry. Changed parameters require fresh confirmation. The same idempotency key and payload should recover the same outcome; the same key with different parameters should be rejected.

A timeout may leave the result `unknown`. Query status before retrying, and recheck budgets at execution. An in-memory idempotency dictionary does not prove restart recovery or concurrent transaction safety; those require additional implementation and testing.

### 4. Retain reproducible evidence, not one successful screenshot

Record a normal task, a clarification, a no-evidence or access-denied response, and recovery from an unknown action outcome. Keep input versions, tool arguments, observable results, business review and cost; do not request or collect private model chain-of-thought.

Report mechanism tests, real model-task behavior, business acceptance and business impact separately. Mark unexecuted checks `not_run`, not passed.

## Hands-on practice: what is supplied and what you must add

[Download the practice kit](https://fde.aielsen.com/academy/downloads/fde-practice-kit.zip) · [English instructions](../academy/practice-kit/README.en.md) · [Source](../academy/practice-kit/)

Python 3.10+ and the standard library are sufficient. From the practice-kit directory:

```sh
python -m unittest discover -s tests -v
python demo.py
python tenant_extension.py
python evaluate.py
python analysis.py
```

| Supplied teaching mechanism | Further learner work |
| --- | --- |
| 37 offline tests: 21 base and 16 tenant-extension tests | Integrate a real model; record tool selection across varied inputs |
| Synthetic CSV, quarantine, metric calculation and access-scope examples | Real authentication, complete permissions and data-quality ownership |
| Bounded read-only loop, confirmation, budgets, idempotency and audit examples | Persistence, transactions, concurrency, restart recovery and real connectors |
| Scripted planner and mechanism evaluations | Model-task evaluation, holdout cases and failure analysis; a fixed script is not proof of agent capability |
| Synthetic outcome analysis | Control design, sample limitations and causal assumptions; a sample difference is not a business return |

Do not enter customer records or production credentials. When adding a model, preserve tool allowlists, schema validation, permissions, budgets and step limits. Do not enable arbitrary scripts, shell commands or unreviewed SQL.

## Read a case as a sequence of decisions

The [19 course cases and exercises](https://fde.aielsen.com/academy/en/cases/) support lesson analysis and assignments. The [nine Agent work cases](https://fde.aielsen.com/agent-cases/en/) show how a workflow advances across steps.

For each case, write five answers:

1. **Problem:** Who is blocked in which task? What are the inputs and acceptance criteria?
2. **Discovery:** How was the real bottleneck distinguished from the initial request? What is known or disputed?
3. **Action:** What happened first, why, and how did experts, tools and models divide the work?
4. **Decision:** When should the workflow continue, clarify, refuse, narrow scope or hand over?
5. **Deliverable:** What artifact remains? Which rules and data must change in your situation?

Public cases combine reported facts with teaching analysis; synthetic exercises are not customer results. A company name or a reference is not your delivery credential.

## Finish with work that another person can use

Prepare six evidence groups: problem/scope, data/semantics, system/model, actions/operations, evaluation/results, and product feedback/reuse. Link each claim to code, a test, a trace or a deliverable.

Suggested assessment weights: business diagnosis 20%, data/semantics 20%, engineering/operations 20%, evaluation/safety 20%, outcomes/attribution 10%, collaboration/reuse 10%. This is a teaching rubric, not professional accreditation. Data leakage, fabricated traces, model self-authorization, an unrunnable workflow or a fixed script presented as an agent cannot be offset by other high scores.

Demonstrate a normal task and a failure path, then handle a new tenant, changed time window, timeout or insufficient budget. State your contribution, synthetic-data boundaries, verified scope and unresolved limitations.

[Assignment and defense guide](https://fde.aielsen.com/academy/en/guide/) · [Boards and worksheets](https://fde.aielsen.com/academy/en/resources/) · [Team learning](https://fde.aielsen.com/academy/en/enterprise/)

Personal learning, internal corporate learning and non-production evaluation follow the [project license](../LICENSING.md). Production, paid training/consulting, resale and SaaS require written authorization. The course does not supply formal certification, learner accounts, automated grading or employment guarantees. Expanded lecture notes remain Chinese; English pages cover summaries, cases, boards and practice guidance.
