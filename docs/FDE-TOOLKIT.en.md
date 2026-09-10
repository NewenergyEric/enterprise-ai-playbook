# AIelsen FDE Toolkit · design and selection proposal

[中文](FDE-TOOLKIT.md) · [Repository home](../README.en.md) · [Machine-readable proposal](toolkit-blueprint.json)

**Select capabilities by the work an FDE needs to finish, and require a verifiable deliverable.**

This is a proposal, not a released skill library. No local skill bodies, customer files or private connectors are included. Being a candidate does not establish redistribution rights, compatibility or tested behavior. There is deliberately no install command.

## Six task entrances

| Task | Starting problem | Expected deliverable |
| --- | --- | --- |
| Discovery | A large request with no clear first step | Problem definition, evidence, scope, baseline and acceptance criteria |
| Product and marketing | Many features, but no clear customer value | Audience judgment, value proposition, campaign or partnership proposal |
| Knowledge and data | Fragmented documents, conflicting definitions, ungrounded answers | Inventory, metric contract, source map and retrieval checks |
| Agent engineering | A prototype without clear tools, permissions or state semantics | Capability contract, interfaces, permission scope and recovery design |
| Evaluation | Plausible output without a usable acceptance standard | Fixed tasks, failure classification, acceptance evidence and open issues |
| Handoff and reuse | The method remains in someone's conversation history | Decisions, runbooks, templates and retrospective |

These are user-facing task groups, not a reason to duplicate underlying skills. The audience spans FDEs, solution leads, marketing/product teams, data engineers, support teams and maintainers.

## Four layers

| Layer | Purpose | Publication boundary |
| --- | --- | --- |
| Method core | Problem framing, delivery contracts, evidence and acceptance templates | Verify ownership and choose licensing explicitly |
| Scenario recipes | Connect capabilities into an input–handoff–acceptance workflow | Use synthetic examples, not customer working files |
| Capability adapters | Community skills, platform connectors and runtime integration | Preserve authorship, provenance, versions and licenses; prefer upstream catalogs |
| Private project layer | Customer data, ontology, configuration and specific business rules | Remains outside the public toolkit |

This is a proposed productized delivery structure, not four existing products. Skills describe methods; the host agent and tools execute them. Durable tasks, concurrency, permissions and recovery still require runtime support.

## First eight candidates

Names identify existing capabilities for review. Their content has not been copied or rebranded.

| Candidate | First useful output | Main release check |
| --- | --- | --- |
| `market-research` | Research brief with sources and explicit assumptions | Verify provenance and MIT declaration; repair missing description; do not imply precise market measurement |
| `competitive-analysis` | Competitor comparison and differentiation hypotheses | Verify upstream, dates and licensing; do not copy competitor marketing |
| `kol-pitch-workflow` | Creator shortlist rationale, individual pitch and reply handoff | Remove private-system coupling, establish rights, authorize sending separately |
| `product-capability` | Capability contract, interfaces and open decisions | Repair missing template reference; separate business promises from technical preference |
| `api-design` | API contract and integration checklist | Verify upstream rights and version assumptions; documentation is not deployment |
| `agent-eval` | Reproducible coding-agent comparison: pass rate, cost, time and consistency | Verify CLI and isolation; this does not replace business-agent acceptance |
| `architecture-decision-records` | Decisions, context and alternatives | Verify upstream, remove identities, constrain project access |
| `sop-builder` | Runbook including exception paths | Verify MIT declaration; have an actual operator walk through it |

This is not complete coverage. Retrieval quality, data definitions, safe business actions and business-level acceptance need further selection or original work. A generic coding-agent comparison cannot stand in for them.

## Three recipes to prove first

**Product information → creator partnership draft.** Use authorized product information, target audience and limits. Establish defensible value claims, select creators, explain fit, draft individual pitches and prepare reply handling. Check sources, claims, personalization and open commercial terms. Drafting does not authorize sending or committing to a partnership.

**Product requirement → transferable agent capability.** Use requirements, current interfaces and a controlled environment. Write the capability and permission contract, design tool/state semantics, compare implementation on fixed tasks, and hand over decisions and runbooks. Check reproducibility, writes, retries and failure diagnosis. Skill text does not grant production access.

**Support documents → grounded response workflow.** Align authorized documents and service rules, establish retrieval and citations, then test unknown, conflicting, outdated and escalation cases with synthetic questions. This is a next-stage gap to fill, not an existing complete recipe. Test evidence and feedback flow, not just fluent prose.

## Metadata and release gates

Every entry should record identity, owner, original author, upstream URL and commit, license evidence, scope, inputs, outputs, environment, dependencies, permissions, cost assumptions, external actions, synthetic examples, behavioral tests, limitations, verified date, compatibility and rollback. Unknown values stay `null` or `pending`.

Before installation or redistribution:

1. Establish provenance and rights: original, authorized adaptation, upstream-only catalog, or not distributable yet.
2. Review privacy and content, retaining required third-party attribution while removing client and personal data.
3. Validate entry point, resources, links, syntax and host dependencies—not only `SKILL.md`.
4. Test success, missing inputs, permission denial and recovery using synthetic work; keep external actions within authorization.
5. Release a small versioned pack with checksums and compatibility evidence after one complete recipe works.

Future statuses may include `catalog-only`, `needs-adapter`, `runtime-tested` and `private-only`. Every current blueprint entry is a **candidate with `installable: false`**. Agents must not auto-install from this design file.

## Relationship to the existing website

Services explain value; cases show the work; Academy trains delivery; Toolkit would package verified capabilities as reusable recipes. An independent repository linked from the website is preferable to bundling hundreds of skills into the static marketing site.

Next decisions: confirm ownership/distribution rights, select a representative recipe, and test it in the target host. Opening a new repository, making it public and choosing a license remain explicit maintainer decisions.
