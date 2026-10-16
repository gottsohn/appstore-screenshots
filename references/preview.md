# App preview video

Make this only when the user asks for an app preview, a preview video, or a product-page video. It is not part of the default four-device screenshot run.

The picture is the app, full-bleed, at Apple's accepted preview size. Headline and short labels are HTML text. Recreate the four screens from this repo's strings. Do not animate the generated PNGs, and do not draw a device bezel, hands, or a person holding a phone.

## Prerequisites

The machine running the agent needs Node.js 22 or newer, FFmpeg, and `npx hyperframes`. If any of those is missing, stop and say which one. Do not fall back to the image tool, and do not require `OPENAI_API_KEY`.

Keep the render local. A hosted render needs a separate explicit request.

## Sizes

These are App Store Connect's accepted preview pixels, not the screenshot pixels in [devices.md](devices.md). The aspects match the portrait iPhone and 13-inch iPad screenshots, so the video sits with those screenshots.

| Key | Pixels | When |
| --- | --- | --- |
| `iphone-preview` | 886 × 1920 | Default. Portrait iPhone. |
| `iphone-landscape-preview` | 1920 × 886 | Only when the user asks for a landscape preview. |
| `ipad-13-preview` | 1200 × 1600 | Only when the user asks for an iPad preview. |

There is no Duo preview. If the user asks for one, say this skill does not ship a Duo preview size.

Write into the app repo:

```text
.shots/runs/iphone-preview-886x1920/<locale>/preview.mp4
.shots/runs/iphone-preview-886x1920/<locale>/poster.jpg
.shots/runs/iphone-preview-886x1920/<locale>/preview-plan.md
.shots/runs/iphone-preview-886x1920/<locale>/composition-brief.md
.shots/runs/iphone-preview-886x1920/<locale>/composition/
```

Swap the directory key for `iphone-landscape-preview-1920x886` or `ipad-13-preview-1200x1600` when that is the requested size. Primary locale first, then each other locale the user named. One video per locale. UI labels come from that locale's strings.

Landscape is the screen itself: status bar on the top edge, tab bar on the bottom edge, headline as an overlay. iPad has no notch and no Dynamic Island.

## Story

Read the app with [research.md](research.md). Reuse the four headlines when this session already approved them. Otherwise show the four lines and wait.

Order:

1. Outcome. The result the user came for.
2. The feature in action. The primary screen, mid-use.
3. A second proof. Map, history, or a saved result.
4. One distinctive capability that is actually in the code.

A starting shape, about 21 seconds. Lengthen a hold when a line needs more time to read. Stay inside 15–30 seconds. Aim for 18–22.

| Scene | Window | What is settled |
| --- | --- | --- |
| Outcome | 0.0–6.0s | Headline and the result screen. The 5.0s frame is inside this hold. |
| Feature | 6.0–10.5s | Primary screen, mid-use. |
| Proof | 10.5–15.0s | Second proof. |
| Distinctive | 15.0–19.0s | The capability from this repo. |
| Name | 19.0–21.5s | App name. Purchase or login disclaimer, if one is required. |

The frame at exactly 5.0s is the poster. App Store Connect uses that second by default. It must be settled: outcome headline fully in, UI visible, not mid-dissolve.

Reading time, fully visible and not exiting:

- A short label: about 0.8s.
- A headline or sentence: about 0.3s per word, and at least 1.2s.

Transitions are dissolves of about 0.3–0.4s. Do not use a wipe, zoom, or flash that implies a gesture the app does not have.

Copy rules:

- Headlines and UI labels are the approved lines and that locale's strings. Spell-check every word.
- No prices, no currency, no "new this season," no dates.
- No feature the code does not have.
- If a shown screen needs a purchase, subscription, or login, say so on the end hold.
- The video has to make sense with the sound off. Previews autoplay muted.

Colors and type come from this app's icon and UI.

## Plan and brief

Write both files before creating the composition.

`preview-plan.md`:

```markdown
# Preview plan: [App name]

## Promise
[One sentence from the code.]

## Headlines
1. Outcome — [line]
2. Feature — [line]
3. Proof — [line]
4. Distinctive — [line]

## Visual identity
- Background: [value]
- Text: [value]
- Accent: [value]

## Poster
The 5.0s frame shows [outcome headline] on [screen], fully settled.

## Storyboard
### Outcome — 0.0–6.0s
[Screen, exact strings, hold.]
### Feature — 6.0–10.5s
[...]
### Proof — 10.5–15.0s
[...]
### Distinctive — 15.0–19.0s
[...]
### Name — 19.0–21.5s
[App name. Disclaimer if needed.]

## Audio
Silent, unless the user supplied a music file or asked for narration.
```

`composition-brief.md`:

```markdown
# Hyperframes composition brief: [App name]

## Objective
An App Store preview for [App name]. The picture is the app UI, full-bleed.

## Output
- Composition: `.shots/runs/<key>-<width>x<height>/<locale>/composition/`
- Deliverable: `preview.mp4` beside that directory
- Size: [886×1920 / 1920×886 / 1200×1600]
- Frame rate: 30
- Duration: [15–30 seconds, target from the plan]

## Source
- Repo: [path]
- Strings from: [Localizable.strings or string catalog]
- Screens to recreate: [four screens]
- Copy that must appear verbatim:
  - [headline]
  - [UI labels]

## Storyboard
Follow `preview-plan.md`. The 5.0s frame is settled.

## Audio
- Music: [none / path the user supplied]
- Narration: [none / script]
- The story works with the sound off.

## Hyperframes
Load `hyperframes-core`, `hyperframes-animation`, `hyperframes-creative`, `hyperframes-keyframes`, and `hyperframes-cli`. This skill is its own workflow. Do not enter the Hyperframes intent interview, and do not route into its generic promo workflow.

Requirements:
- Root `data-width`, `data-height`, `data-fps="30"`, and `data-duration` inside 15–30 seconds.
- Real text for every headline and UI label.
- At least the four screens from this app, using its colors.
- Dissolves between scenes. The instant at 5.0s is not inside a dissolve.
- `npx hyperframes check` passes before the render.
- Render locally.
```

The brief owns the product, the copy, and the Apple rules. Hyperframes owns the composition structure and the motion.

## Compose and check

Build `composition/` from the brief and the plan. The root element carries the requested pixel size:

```html
data-composition-id="main"
data-width="886"
data-height="1920"
data-fps="30"
data-duration="21.5"
```

Use 1920×886 or 1200×1600 when that was the request. Duration matches the storyboard.

From `composition/`:

```bash
npx hyperframes check
npx hyperframes snapshot --at 5,8,13,17,20
```

`check` is the gate before render. Fix every error it reports, including contrast. Read the snapshots. Regenerate a scene whose headline is misspelled, whose UI is in the wrong language, or whose 5.0s frame is mid-transition.

## Audio

Default is silent. Do not add a music bed of your own.

When the user supplies a music file, copy it to `composition/assets/music/` and play that one file for the whole duration. Follow `hyperframes-audio` for the fade. The encode step makes it stereo AAC.

Narration only when the user asks. Write the lines in `preview-plan.md` under `## Voiceover`, then:

```bash
npx hyperframes tts "<narration text or path to script>" \
  --voice af_heart \
  --output assets/voiceover.wav
```

Place it on its own clip. If they want another Kokoro voice, `npx hyperframes tts --list`. The spoken script has to fit the 15–30 second window. If the WAV is longer, cut the script and regenerate. Do not stretch the video past 30 seconds. Duck the music under the voice when both exist.

## Render and encode

From `composition/`, after `check` is clean and the headlines are approved:

```bash
npx hyperframes render --quality delivery --fps 30 --output ../preview.source.mp4
```

Transcode so App Store Connect receives H.264 High Profile Level 4.0, yuv420p, 30 fps, about 10–12 Mbps, and `+faststart`.

Silent:

```bash
ffmpeg -y -i preview.source.mp4 \
  -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p \
  -r 30 -b:v 10M -maxrate 12M -bufsize 20M \
  -movflags +faststart \
  -an \
  preview.mp4
```

With music or narration:

```bash
ffmpeg -y -i preview.source.mp4 \
  -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p \
  -r 30 -b:v 10M -maxrate 12M -bufsize 20M \
  -movflags +faststart \
  -c:a aac -b:a 256k -ar 48000 -ac 2 \
  preview.mp4
```

Run the matching ffmpeg command from the locale directory, the parent of `composition/`. Delete `preview.source.mp4` after the gate below passes.

Poster, from that same directory. `-ss` after `-i` so the frame is the one at 5.0s:

```bash
ffmpeg -y -i preview.mp4 -ss 5 -frames:v 1 -q:v 2 poster.jpg
```

## Gate

```bash
ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height,codec_name,profile,level,avg_frame_rate,pix_fmt \
  -show_entries format=duration -of json preview.mp4
```

Refuse the file unless all of these hold:

- Width and height match the requested size exactly.
- `codec_name` is `h264`, profile is High, level is 40 (that is Level 4.0).
- `pix_fmt` is `yuv420p`.
- Frame rate is 30.
- Duration is from 15 to 30 seconds, inclusive.
- `poster.jpg` exists and is the settled outcome frame.
- Every on-screen string matches the approved headline or that locale's strings.

When audio is present, the audio stream is stereo AAC at 48000 Hz. A silent preview has no audio stream.
