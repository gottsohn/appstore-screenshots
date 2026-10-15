---
name: iphone-screenshots
description: >-
  Creates App Store screenshots and marketing frames from an iOS codebase.
  Reads the app UI and strings, then produces iPhone 1179×2556, iPhone
  landscape 2556×1179, iPad 13-inch 2048×2732, and open iPhone Duo 2034×1398
  screenshots, plus a 3840×2560 search-results preview and a 3840×1646 name
  header. Use when the user asks for App Store screenshots, a search results
  preview, a name header, iPhone, iPad 13, or iPhone Duo marketing images.
---

# App Store screenshots

Read the iOS repo you are in. Do not reuse another app's headlines, colors, or props. If a marketing site disagrees with the code, follow the code.

## Workflow

1. Read the app. Order and rules: [references/research.md](references/research.md).
2. Infer one promise, a visual direction from the icon and UI, and four screenshot ideas: outcome, the feature in action, a second proof, and one distinctive capability found in the code.
3. Show the four headlines. Ask only if the user has not already approved the set.
4. Generate device screenshots with the host image tool. Prompt rules: [references/prompting.md](references/prompting.md). Sizes and frames: [references/devices.md](references/devices.md). In Cursor, use image generation. If the host has no image tool, stop and ask for one. Do not require `OPENAI_API_KEY`.
5. Spell-check every headline and every visible UI label before resizing. Regenerate a panel whose words are wrong or still in the wrong language.
6. Resize with this skill's `scripts/resize.mjs`. Flatten onto black and strip alpha.
7. Write PNGs into the app repo at `.shots/runs/<device>-<width>x<height>/<locale>/`.

Default run: all four devices, the user's primary locale first, then each other locale they named. A named device, the search-results preview, or the name header is only that asset.

## Devices

| Key | Pixels | What the image is |
| --- | --- | --- |
| `iphone` | 1179 × 2556 | Headline above a portrait iPhone |
| `iphone-landscape` | 2556 × 1179 | The landscape screen itself |
| `ipad-13` | 2048 × 2732 | 13-inch iPad frame, no notch |
| `iphone-duo` | 2034 × 1398 | Open Duo, flat, hinge down the center |

## Marketing frames

Compose these as SVG so the words are real text, then rasterize with the resize script. Host image tools have no matching aspect ratio, and generated lettering misspells headlines.

- Search results, `3840 × 2560`: [references/search-results.md](references/search-results.md)
- Name header, `3840 × 1646`: [references/header.md](references/header.md)

## Resize

From this skill's directory, once:

```bash
npm install --prefix scripts
```

Then, for every export:

```bash
node scripts/resize.mjs --input src.jpg --width 1179 --height 2556 --output panel.png
```

`--fit` is `cover` (default), `fill`, or `contain`. Use `fill` for `iphone-landscape`. The script refuses an output whose pixel size is wrong or that still has an alpha channel.

## Finish check

- Pixel size matches the table.
- PNG has no alpha.
- Locale files use that locale's strings.
- Landscape frames are the screen, not a portrait phone in a banner.
- The Duo is open, not folded.
- Search-results streaks stop before the phone. Header streaks pass above and below the name.
