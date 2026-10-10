# Agent case integration / Agent 案例集成

The full case collection is now integrated into the single maintained `main` branch together with services, FDE Academy and the optional Toolkit request UI. The earlier feature branch is retired; no additional source assembly is needed.

Readers: [Agent work cases](https://fde.aielsen.com/agent-cases/) · [English](https://fde.aielsen.com/agent-cases/en/). Contributors: [module guide](agent-cases/README.md) and [module instructions](agent-cases/AGENTS.md).

## Integration contract

- Nine cases, 20 bilingual pages, 18 worksheets and 28 bilingual diagrams.
- Chinese paths: `/agent-cases/`, `/agent-cases/cases/<slug>/`.
- English paths: `/agent-cases/en/`, `/agent-cases/en/cases/<slug>/`.
- The shared service navigation/footer links to the correct language. Related Playbook entries map customer support to Oliva, creator partnerships to Ruby, content to Bella/Velia and engineering handoff to Steve.
- Retain anonymized names, original comparisons, language/hash behavior, diagram zoom and white/navy/teal styling.
- Authored source: `agent-cases/`; public build: `dist/client/agent-cases/`. Never publish module source.
- Full combined build: 112 entry routes. See [DEPLOYMENT.md](DEPLOYMENT.md) for the current contract.

Verify all nine cases in both languages, filters, board zoom, worksheets, report excerpts, service returns and true 404 responses. Keep public case facts separate from illustrative methods and proposed measurements. Publication permission for assets does not grant readers unrestricted downstream reuse.

A GitHub update does not deploy the website. Do not change production, DNS, hosting or a receiving endpoint without separate authorization.
