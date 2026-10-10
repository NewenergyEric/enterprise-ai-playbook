# GitHub showcase studio

## Current hero: continuous motion, v2

The README uses original, bilingual **18-second / 20 FPS / 360-frame** motion graphics. These are method illustrations, not customer footage or measured business results. No YouTube, third-party animation, reference artwork or private material is embedded.

- `motion-scene.mjs`: editable vector scenes. Object positions, paths, rotations, chart drawing, filing and transitions are deterministic functions of time.
- `render-motion.mjs`: renders every frame and encodes the two GIFs with an explicit 50 ms delay for **each** frame. It checks unique rendered frames and meaningful object positions, not just a moving footer.
- `../media/fde-motion-zh.gif` and `fde-motion-en.gif`: current Chinese and English README animations.
- Matching PNG files: static alternatives, with the corresponding language.
- Matching JSON files: actual encoding metadata, size and motion-check counts.
- `check-showcase.mjs`: links, language, proposal boundaries and encoded GIF timing checks.
- [Local preview](preview.html): Chinese/English switch, play and static controls. It starts static when reduced motion is requested; explicit Play starts the animation.

The work itself moves: documents converge into a brief, packets travel between task and tools, charts/checks draw while a filmstrip advances, and files enter a reusable delivery kit. There are no multi-second still-frame holds. The loop starts within the first scene so its first frame already has visible content.

### Regenerate

Use Node 24 and Sharp 0.35.5 or a later security-reviewed release in a separate tools environment. Version 0.35.5 was checked on 2026-10-10; do not reuse the older 0.34.x recommendation. Recheck upstream advisories before installing. The website does not require Sharp, and its package manifest and lockfile remain unchanged by this optional rendering setup.

```sh
SHARP_MODULE=/absolute/path/to/sharp node docs/studio/render-motion.mjs
SHARP_MODULE=/absolute/path/to/sharp node docs/studio/check-showcase.mjs
node docs/studio/serve-preview.mjs
```

PowerShell: set `$env:SHARP_MODULE` before running Node. `--poster-only`, `--zh` and `--en` support targeted rendering. Set `SHOWCASE_REVIEW_DIR` to a separate local QA directory to export sample frames. Fonts fall back to Microsoft YaHei / Arial; on another OS install a suitable licensed Chinese font and visually recheck typography.

The read-only preview listens on `127.0.0.1:4197` by default and serves only its HTML and the four current GIF/PNG assets. It is not an update to the business website and should not be used as its production server.

### Acceptance

Check actual playback, both languages, pause/static controls, and 375 / 768 / 1440 widths. Each GIF must have 360 frames at 50 ms per frame, 18,000 ms total, continuous loop and size below 5 MB. Inspect main-stage motion separately from the footer progress indicator. Read metadata with an independent decoder where available; a GIF container alone does not prove correct animation timing.

All explanatory content remains available in README text. GitHub embeds a GIF, not an interactive player; the static link is the alternative there. Local preview controls do not imply that GitHub supports custom JavaScript in README.

## Archived v1 storyboard

`fde-comic-art.png`, `fde-showcase-*.gif` / PNG and `render-showcase.mjs` are retained as the earlier four-panel storyboard. They are no longer README heroes. The v1 artwork was created with the built-in image-generation tool without customer references: white paper, navy pen lines, restrained teal/cobalt, research / connected tools / deliverable comparison / reusable handoff kit. It contains no client or product identity. Its scene-reveal animation was superseded by v2's continuously moving vector objects.

The reference repositories inspired the format, not the artwork or code: [huashu-design](https://github.com/alchaincyf/huashu-design), [huashu-skills](https://github.com/alchaincyf/huashu-skills).
