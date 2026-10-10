# Academy integration / 学院集成

The Academy is part of the single maintained `main` branch. Use the [local-learning guide](docs/DEVELOPMENT.md) or, with separate release authority, the [static hosting contract](DEPLOYMENT.md). Do not switch to the retired Academy feature branch or deploy a standalone module over the full site.

## Learning and source

- [FDE Academy online](https://fde.aielsen.com/academy/zh/) · [English](https://fde.aielsen.com/academy/en/).
- [Learner guide](docs/FDE-ACADEMY.md) · [source map](academy/README.md).
- Source: `academy/`; integrated output: `dist/client/academy/`.
- 82 content pages plus the Academy language entry. Full combined build: 112 entries.

## Integration points to preserve

| Place | Learning entry |
| --- | --- |
| Service navigation and footer | Current-language Academy and team-learning links |
| Service homepage | Academy section with course illustration, board previews and curriculum entry |
| Six process stages | Relevant engineering modules, without replacing business deliverables |
| Nine Playbook scenarios | Contextual case exercise and course links, preserving More tabs and hash selection |
| Academy navigation/footer | Return to the current-language service page |

Course styles and runtime remain independent of the service app. The assembler adapts URLs, search results, canonical metadata and downloads to `/academy/`; do not replace paths globally or publish `academy/dist` directly.

Verify both languages, deep-link refresh, search, boards, zoom, keyboard behavior, labs, PDFs and the practice ZIP in the complete preview. Expanded detailed lecture notes remain Chinese; examples are synthetic, and public references are not partnership claims. Browser notes/progress are local and do not migrate automatically between origins.
