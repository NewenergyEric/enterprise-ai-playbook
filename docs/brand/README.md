# Field Geometry

深色空间是工作尚未被解释时的背景。几何形体逐渐从散点走向可辨识的结构，留白承担关系的间隔，让视线能在复杂度与秩序之间移动。每一个位置都应经过细致推敲，不用额外装饰掩盖结构上的松散。

海军蓝、纸白与青绿构成有限的色域。蓝色承托，白色划定对象，青绿只在连接、状态与关键节点出现。颜色的克制需要精确的明度校准，使图形即使缩小也依然具有层次。

尺度建立节奏：少量大字与细密线条并置，重复的小模块为结构提供内部韵律。标记不是正文的替代物，而是图形的坐标。字体的字距、数字的基线和线条端点应体现专业排印的耐心与精度。

构图从开放的问题空间走向结构化的结果，再通过一条回路返回起点。形体之间留有充分呼吸，不把所有含义同时挤到前景。这种平衡依赖逐处打磨：对齐、间距和视觉重量都必须足够稳定。

最终表达应像一张经过反复修订的工程观察图。细节保留探索的痕迹，却不制造噪声；工艺上的精密服务于关系的清楚，而不是炫耀制作过程。

## Repository assets

- `../media/fde-cover.png`: original AIelsen FDE repository cover, 1600 × 800. Abstract field-to-delivery diagram, not a customer environment or product screenshot.
- `../media/evals-*.svg`, `../media/states-*.svg`: unchanged exports of the Academy's original bilingual teaching boards. Their source is `academy/scripts/visual-boards.mjs` on `main`.
- `render-cover.py`: optional authoring utility for the cover. It is not imported by the website or run during deployment.

The cover uses Instrument Sans and IBM Plex Mono, both under SIL OFL 1.1. Only the raster artwork is distributed here, not font files. Font attribution: the Instrument Sans Project Authors and IBM Corp. See the licenses accompanying your font distribution. The Academy boards retain their existing font fallback and source provenance.

To regenerate with licensed local TrueType fonts:

```sh
python docs/brand/render-cover.py --font-dir /path/to/fonts
```

The directory must contain `InstrumentSans-Regular.ttf`, `InstrumentSans-Bold.ttf` and `IBMPlexMono-Regular.ttf`. The utility uses `reportlab` and `pypdfium2`, writes a temporary authoring PDF under ignored `.generated/`, and exports the PNG to `docs/media/`. No production dependency or remote image service is required.

README images are relative GitHub assets, not externally hosted badges. They do not request private CI tokens, use customer imagery or depend on a live Academy deployment. A README cover does not automatically configure GitHub's separate Social preview setting.

## Maintaining the repository home

Maintain English in `README.md` and Chinese in `README.zh-CN.md`, with language switches at the top. Keep `README.en.md` identical to the English default so existing links, including section anchors, continue to work. Run `node docs/studio/check-showcase.mjs` after editing. All modules are now integrated on `main`; a repository update does not establish what is deployed at the public origin.

Keep these assets under `docs/`, not `public/`. Repository decoration must not alter website routes, deployment configuration, privacy settings or original-content licensing.
