# Read the app before inventing screens

Stay inside the iOS repo the user pointed at. Do not copy headlines, sample data, or props from a previous app.

## Read in this order

1. README and the app entry point. Note the real job of the app.
2. Onboarding. The pages are often the benefits, already written.
3. Root tabs and the primary feature screen. This is the phone UI you will redraw.
4. Secondary screens that prove the feature: history, detail, map, saved result.
5. Models, so sample numbers and names match real fields.
6. `Localizable.strings` (and Swift string catalogs) for every requested locale.

Skip ads, paywalls, and settings unless the user asks for them. Do not feature an ad unit.

## When sources disagree

Follow the code. A marketing site can describe a different product than the one in the repo. Screenshots show the screens that exist.

## What to infer

- **Promise.** One sentence a buyer understands without the README.
- **Visual direction.** Colors and motifs from the app icon and the UI, not a generic gradient. Sample the icon and accent color. Keep the UI itself clean and dark or light as the app actually is.
- **Four ideas, in this order:**
  1. Outcome. The result the user came for.
  2. The feature in action. The primary screen, mid-use.
  3. A second proof. Map, history, or a saved result.
  4. One distinctive capability that is actually in the code (shortcuts, CarPlay, a garage, widgets). Pick it from this repo. Do not default to Siri.

Headlines stay short: two clauses, readable at thumbnail size. UI labels inside the device are copied from that locale's strings. Do not leave English section titles on a translated screen.

## Locales

Generate the primary locale first. Then translate by reading that locale's string file and rewriting both the headline and the UI. If a string is missing, translate the English string in the same tone as the file's existing copy. Do not invent a feature the locale file does not describe.

## Sample content

Use realistic values from previews and models already in the repo. Keep names, units, and button titles consistent across the four panels of one locale.
