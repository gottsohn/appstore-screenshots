# Name header

Generate this only when the user asks for the App Store header. It is not part of the default four-device run.

Canvas: **3840 × 1646**. Write:

`.shots/runs/header-3840x1646/preview.png`

Read `CFBundleDisplayName` (and localized InfoPlist.strings). The name is usually the same in every language, so one file is enough. If a locale has a different display name, write one PNG per distinct name under that locale directory.

## Layout

Same illustrated scene as the search-results preview, in the shorter frame. No phone.

- Only the app name. Centered horizontally, sitting in the upper-middle of the frame. Bold, off-white, about 248px. No tagline and no summary.
- A soft accent glow sits behind the word.
- Accent streaks run above the word and below it, and they stop short of the letters. A streak drawn through the name is wrong.
- Small props stay at the edges. In the reference frame that is a staging light at the lower left, a checkered flag at the upper right, and lane dashes along the bottom. Replace those with this app's props.

## How to draw it

Write an SVG at 3840 × 1646, then resize it to the same pixel size with `scripts/resize.mjs` so the PNG is flat and has no alpha.

Working geometry:

- Name: `<text x="1920" y="900" text-anchor="middle" font-size="248" font-weight="700">`.
- Upper streaks around y=540, lower streaks around y=1040, with a gap from about x=1680 to x=2160 so they never enter the word.
- Glow centered near (1920, 820).
- Ground begins around y=1080.

If the name is long, reduce the font size until it sits inside that gap with clear space on both sides. Do not let streaks touch the glyphs.
