# Devices, sizes, and frames

Export PNG with no alpha. App Store Connect rejects an alpha channel. The resize script flattens onto black and strips alpha.

| Key | Pixels | Source aspect | Resize fit | Frame |
| --- | --- | --- | --- | --- |
| `iphone` | 1179 × 2556 | 9:16 | `cover` | Headline above a portrait iPhone with Dynamic Island |
| `iphone-landscape` | 2556 × 1179 | 16:9 | `fill` | The image is the landscape screen |
| `ipad-13` | 2048 × 2732 | 3:4 | `cover` | 13-inch iPad. No notch, no Dynamic Island |
| `iphone-duo` | 2034 × 1398 | 4:3 | `cover` | Open Duo, flat, vertical hinge through the center |

Write `.shots/runs/<key>-<width>x<height>/<locale>/01-<slug>.png` through `04-<slug>.png`. Slugs describe the panel (`01-outcome`), not a previous app's feature names.

## iPhone portrait

1179 × 2556 is the 6.3-inch class slot. The marketing headline sits above the device. The phone shows one screen, not a collage.

9:16 sources are wider than 1179:2556 (0.461). A center cover crops the sides. If the last letters of the headline sit on the crop edge, shift the extract toward the ink instead of clipping a word. Check this on every locale. A headline that is wider in translation needs more side margin in the source.

## iPhone landscape

2556 × 1179 is the same phone class, turned. The bitmap is the screen: status bar across the top, content laid out for landscape, tab bar along the bottom. Do not place a portrait phone in the middle of a wide poster, and do not pad the sides with stretched gutters.

16:9 into 2556 × 1179 (about 2.17:1) clips the status bar and the tab bar under `cover`. Use `--fit fill`. The slight vertical squash keeps the chrome. Confirm both bars are fully visible after resize.

## iPad 13-inch

2048 × 2732. Draw an iPad: thicker uniform bezel, no iPhone speaker cutout. 3:4 is close to 2048:2732, so `cover` is enough. Rebuild translated panels when the first pass leaves English labels.

## iPhone Duo

Picture the foldable fully open and flat, like an open book, inner screen facing the camera, hinge down the middle. Do not draw the closed cover phone.

The default canvas is 2034 × 1398, which is Apple's outer-display landscape slot (5.4-inch cover). The pictured device is still the open inner screen, because that is the frame this skill's default `iphone-duo` key means. A 4:3 source cover-cropped to 2034 × 1398 loses a thin strip at the top and bottom. Keep the hinge centered and the status bar inside the frame.

Other official Duo slots, only when the user names them:

| Slot | Pixels |
| --- | --- |
| Outer portrait | 1398 × 2034 |
| Outer landscape | 2034 × 1398 |
| Inner portrait | 2007 × 2853 |
| Inner landscape | 2853 × 2007 |

## App preview video

Preview pixels are not the PNG sizes above. Sizes, storyboard, and encode: [preview.md](preview.md).

## Failures to refuse

- A portrait phone floating inside a landscape banner.
- A folded Duo when the user asked for the open one.
- English strings left inside a translated panel.
- A headline that is a misspelling of the approved line.
- An alpha channel, or a size that is merely close.
