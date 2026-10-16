# appstore-screenshots

An agent skill that reads an iOS app from its repo and produces App Store images at the exact pixel sizes below. When asked, it also renders an App Store preview video. It follows the code when a marketing site disagrees with it.

## Install

### Cursor and other agents

Global, available in every project:

```bash
npx skills add gottsohn/appstore-screenshots --global
```

One project only:

```bash
npx skills add gottsohn/appstore-screenshots
```

Update and remove:

```bash
npx skills update
npx skills remove appstore-screenshots
```

### Claude Code

The same installer, aimed at Claude Code:

```bash
npx skills add gottsohn/appstore-screenshots -a claude-code --global
```

That copies the skill to `~/.claude/skills/appstore-screenshots/`. Drop `--global` to install it into the current project's `.claude/skills/` instead.

Claude Code can also install this repo as a plugin. In a Claude Code session:

```text
/plugin marketplace add gottsohn/appstore-screenshots
/plugin install appstore-screenshots@appstore-screenshots
```

Or from the shell, without opening a session:

```bash
claude plugin install appstore-screenshots --marketplace gottsohn/appstore-screenshots
```

After a plugin install, the skill is available as `/appstore-screenshots:appstore-screenshots`. Remove it later with `/plugin uninstall appstore-screenshots@appstore-screenshots`.

The resize script uses [sharp](https://sharp.pixelplumbing.com/). From the installed skill directory:

```bash
npm install --prefix scripts
```

That install is only for the PNG export. Screenshot generation uses the agent's own image tool.

A preview video needs three things on the machine running the agent: Node.js 22 or newer, FFmpeg, and the Hyperframes CLI (`npx hyperframes`). The video does not use the image tool and does not need `OPENAI_API_KEY`. If Node, FFmpeg, or Hyperframes is missing, the agent stops instead of building a video out of the stills.

## Use it

Open an iOS repo and ask for the assets. Examples:

- "Create App Store screenshots in English and German."
- "iPad 13-inch screenshots in English and German."
- "Search results preview at 3840×2560."
- "Name header at 3840×1646."
- "App preview video in English."
- "iPad preview video in English and German."
- "Landscape iPhone preview."

The default screenshot run is the four devices in the table. The search-results preview, the name header, and the preview video are separate. Ask for each by name. A screenshot run does not include a video.

The agent reads the README, onboarding, tabs, feature screens, and `Localizable.strings`, then proposes four headlines: the outcome, the feature in action, a second proof, and one distinctive capability that exists in that repo. It generates the primary locale first, then each other locale from that locale's strings. A preview video uses those same four headlines. If they are already approved, it keeps them. Otherwise it proposes them before rendering.

Files land in the app repo:

```text
.shots/runs/<device>-<width>x<height>/<locale>/01-<slug>.png
.shots/runs/search-results-3840x2560/<locale>/preview.png
.shots/runs/header-3840x1646/preview.png
.shots/runs/iphone-preview-886x1920/<locale>/preview.mp4
.shots/runs/iphone-preview-886x1920/<locale>/poster.jpg
.shots/runs/ipad-13-preview-1200x1600/<locale>/preview.mp4
.shots/runs/iphone-landscape-preview-1920x886/<locale>/preview.mp4
```

PNGs are flattened and have no alpha channel.

## Sizes

| Asset | Key | Pixels | Frame |
| --- | --- | --- | --- |
| iPhone | `iphone` | 1179 × 2556 | Headline above a portrait iPhone |
| iPhone landscape | `iphone-landscape` | 2556 × 1179 | The landscape screen itself |
| iPad 13-inch | `ipad-13` | 2048 × 2732 | iPad frame, no notch |
| iPhone Duo | `iphone-duo` | 2034 × 1398 | Open and flat, hinge down the center |
| Search results | `search-results` | 3840 × 2560 | Summary on the left, phone on the right |
| Name header | `header` | 3840 × 1646 | Centered app name, no phone |

`iphone-duo` uses Apple's outer landscape slot and shows the Duo open, not folded. The native inner landscape size is 2853 × 2007. Ask for that size if you want the inner display at its own pixel dimensions.

## App preview video

Ask for it by name. The default is one portrait iPhone video. An iPad video or a landscape iPhone video happens only when you name that size. There is no Duo preview.

| Asset | Pixels | When |
| --- | --- | --- |
| iPhone preview | 886 × 1920 | Default |
| iPhone landscape preview | 1920 × 886 | When you ask for landscape |
| iPad 13-inch preview | 1200 × 1600 | When you ask for iPad |

These are the pixel sizes App Store Connect accepts for a preview, not the screenshot sizes above. The portrait iPhone preview matches the aspect of the 1179×2556 screenshot, and the iPad preview matches the 13-inch screenshot, so the video sits with those screenshots on the product page.

The video runs 15–30 seconds, aimed at 18–22. It is H.264 at 30 fps. It is silent unless you supply a music file. Narration is added only if you ask for it.

The picture is the app itself, full-bleed. The four screenshot beats play in order: the outcome, the feature in action, a second proof, and one distinctive capability from the repo. Headlines are real text in the composition. The video is not a pan across the PNG screenshots.

`poster.jpg` is the frame at 5 seconds. That is the frame App Store Connect shows by default, and it is the outcome screen with the headline fully on screen. Previews autoplay muted, so the story has to read with the sound off.

## What the skill contains

- `SKILL.md` tells the agent the workflow.
- `.claude-plugin/` is the Claude Code plugin manifest, so the repo can be installed with `/plugin`.
- `references/` holds research order, device frames, image prompts, the two marketing layouts, and the video workflow in `preview.md`: storyboard, Hyperframes composition, encode, and the size check.
- `scripts/resize.mjs` writes the exact pixel size for PNGs. It is not used for the preview video.

```bash
node scripts/resize.mjs --input src.jpg --width 1179 --height 2556 --output panel.png
```

`--fit` accepts `cover` (default), `fill`, or `contain`. Landscape iPhone exports use `fill` so the status bar and tab bar stay in frame.
