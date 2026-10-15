# Search results preview

Generate this only when the user asks for a search-results preview. It is not part of the default four-device run.

Canvas: **3840 × 2560**. One PNG per locale:

`.shots/runs/search-results-3840x2560/<locale>/preview.png`

## Layout

Wide 3:2 frame. Three zones:

- **Scene.** A dark illustrated background built from this app. Read the icon and the primary screen and pick a few props from that world. The reference frame uses a night road, a low accent-colored horizon glow, two light streaks, dashed lane paint, a staging light at the lower left, and a small checkered flag behind the phone. Swap every prop that does not belong to the current app. Keep the app's own accent and ink colors.
- **Summary, left.** Three stacked lines, bold, left-aligned, off-white. The promise in a few words, not a paragraph and not the app name alone. Example shape: "Time your" / "0–100" / "on the phone". Use the requested locale.
- **Phone, right.** One portrait iPhone showing the primary screen. Status bar, navigation title, the main content, the primary button, and the tab bar. Labels come from that locale's strings.

Props and streaks stay in the background. They end before the phone bezel and they do not cross the headline.

## How to draw it

Write an SVG at 3840 × 2560, then:

```bash
node scripts/resize.mjs --input preview.svg --width 3840 --height 2560 --output preview.png
```

The headline and every UI label are `<text>`, not painted by an image model. Use XML character references for dashes and accents (`&#8211;`, `&#252;`). A raw en dash or plus-minus has corrupted SVG rasterization before.

Working geometry, reuse the positions and restyle the contents:

- Headline block at x=220, first baseline y=620, font size 168, each next line `dy=190`.
- Phone screen clipped to a rounded rect at x=2628, y=390, about 860 × 1780, corner radius 78.
- Accent streaks finish by x=2480, left of the phone.
- Ground and horizon occupy the lower third. Small props sit at the edges, never on the type.

Redraw the phone UI from the primary screen in code. Simplify it: the real sections, the real button title, the real tab titles. Do not invent a screen the app does not have.
