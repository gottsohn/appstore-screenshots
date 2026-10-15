# appstore-screenshots

An agent skill that reads an iOS app from its repo and produces App Store images at the exact pixel sizes below. It follows the code when a marketing site disagrees with it.

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

Node is only required for that exact-size export. Image generation uses the agent's own image tool.

## Use it

Open an iOS repo and ask for the assets. Examples:

- "Create App Store screenshots in English and German."
- "iPad 13-inch screenshots in English and German."
- "Search results preview at 3840×2560."
- "Name header at 3840×1646."

The default screenshot run is the four devices in the table. The search-results preview and the name header are separate. Ask for them by name.

The agent reads the README, onboarding, tabs, feature screens, and `Localizable.strings`, then proposes four headlines: the outcome, the feature in action, a second proof, and one distinctive capability that exists in that repo. It generates the primary locale first, then each other locale from that locale's strings.

Files land in the app repo:

```text
.shots/runs/<device>-<width>x<height>/<locale>/01-<slug>.png
.shots/runs/search-results-3840x2560/<locale>/preview.png
.shots/runs/header-3840x1646/preview.png
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

## What the skill contains

- `SKILL.md` tells the agent the workflow.
- `.claude-plugin/` is the Claude Code plugin manifest, so the repo can be installed with `/plugin`.
- `references/` holds research order, device frames, image prompts, and the two marketing layouts.
- `scripts/resize.mjs` writes the exact pixel size.

```bash
node scripts/resize.mjs --input src.jpg --width 1179 --height 2556 --output panel.png
```

`--fit` accepts `cover` (default), `fill`, or `contain`. Landscape iPhone exports use `fill` so the status bar and tab bar stay in frame.
