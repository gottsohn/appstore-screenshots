# Prompting the image tool

Generate one locale at a time. The primary locale first. Pass the approved headline in quotes and list the UI strings that must appear. Tell the model the exact device body from [devices.md](devices.md).

Host image tools expose a few aspect ratios. Pick the closest, then resize:

| Device | Ask for | Then |
| --- | --- | --- |
| `iphone` | 9:16 | `cover` to 1179 × 2556 |
| `iphone-landscape` | 16:9 | `fill` to 2556 × 1179 |
| `ipad-13` | 3:4 | `cover` to 2048 × 2732 |
| `iphone-duo` | 4:3 | `cover` to 2034 × 1398 |

Do not use the image tool for the search-results preview or the name header. Those are SVG. See [search-results.md](search-results.md) and [header.md](header.md).

## Prompt contents

Include all of these:

- The quoted headline, spelled letter by letter if a word is easy to garble.
- The device: portrait iPhone, landscape viewport with no bezel, iPad without a notch, or open Duo with a center hinge. One of these, matching the key.
- The screen to draw, using labels from that locale's strings: navigation title, the main numbers, the primary button, the tab titles.
- Visual direction sampled from this app's icon and UI: background, accent, type color.
- "No extra marketing text beyond the headline. No watermark. No alpha."

For `iphone-landscape`, say the picture is the screen itself: status bar on the top edge, tab bar on the bottom edge, content side by side. Forbid a phone bezel and side padding.

For `iphone-duo`, say the device is open and flat, not folded, with the hinge vertical through the center and the inner display filled by the app.

## After generation

Read the image. Reject and regenerate when:

- A headline word is wrong (`saved` rendered as another word).
- A tab, button, or section title is still in the wrong language.
- The device pose is wrong.
- The status bar or tab bar is cut off in a landscape source. Add vertical margin and regenerate before you resort to cropping it away.

Then run `scripts/resize.mjs` at the exact pixel size.
