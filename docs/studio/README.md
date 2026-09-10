# GitHub showcase studio

The repository hero is an original, bilingual editorial comic. It is a method illustration, not a reconstruction of a customer system or proof of business outcomes. No reference-repository image, animation, code, logo or YouTube video is bundled.

## Assets and timing

- `../media/fde-comic-art.png`: original four-panel artwork, generated with the built-in image-generation tool. No customer material was provided to the generator.
- `../media/fde-showcase-zh.gif` and `fde-showcase-en.gif`: independently typeset Chinese and English compositions, 1100 × 650, approximately 19 seconds, continuous loop.
- Matching PNGs provide a static alternative and a useful first frame.
- `render-showcase.mjs`: deterministic SVG composition, scene reveals and GIF encoding. The original bitmap is referenced inside SVG viewports; text remains editable in code. It does not execute a browser or connect to any business system.

Story: discover a business problem → connect a complete workflow → verify the deliverables → hand over reusable capability. The opening and closing overview show all four panels. Scenes dwell long enough to read; there is no flashing or audio.

## Regenerate

Use Node 24 and Sharp 0.34.x. The website's dependency manifest and lockfile are intentionally unchanged. Install a compatible Sharp in a separate tools environment, then make it available to the renderer:

```sh
SHARP_MODULE=/absolute/path/to/sharp node docs/studio/render-showcase.mjs
```

PowerShell: set `$env:SHARP_MODULE` to the installed Sharp module directory before running Node. `--poster-only` renders only the two PNGs. Font fallback uses Microsoft YaHei / Arial; the validated render was created on Windows. On another OS, install suitable licensed Chinese fonts and visually inspect the rendered characters.

Check both language files, the opening frame and each scene, dimensions, duration, loop and size. Keep each GIF below 5 MB. Review at README width and at narrow mobile width. All meaningful information also exists in README text; a static image link sits under the animation.

## Artwork brief

Built-in image generation; original four-panel editorial comic, equal 2 × 2 grid, white paper, ink-navy architectural pen lines, restrained teal and cobalt, no readable text, no real client or product. Panel 1 compares customer questions and product evidence; panel 2 connects data and tools at an engineer's desk; panel 3 compares deliverables with a storyboard and test strip; panel 4 hands over an organized modular field kit. Object-centric scenes and cropped hands rather than stock portraits. No neon, glossy robots, customer screenshots, third-party logos or performance claims.

The reference repositories inspired the format (native GIF, badges, task-first navigation), not the artwork or wording: [huashu-design](https://github.com/alchaincyf/huashu-design), [huashu-skills](https://github.com/alchaincyf/huashu-skills).
