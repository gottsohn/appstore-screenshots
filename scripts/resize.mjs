import sharp from "sharp";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    input: { type: "string" },
    output: { type: "string" },
    width: { type: "string" },
    height: { type: "string" },
    fit: { type: "string", default: "cover" },
    background: { type: "string", default: "#000000" },
  },
});

const fits = ["cover", "fill", "contain"];
const width = Number(values.width);
const height = Number(values.height);

if (!values.input || !values.output || !Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1) {
  console.error(
    "Usage: node scripts/resize.mjs --input src.jpg --width 1179 --height 2556 --output panel.png [--fit cover|fill|contain] [--background #000000]",
  );
  process.exit(1);
}

if (!fits.includes(values.fit)) {
  console.error(`Unknown fit "${values.fit}". Use cover, fill, or contain.`);
  process.exit(1);
}

await sharp(values.input)
  .resize(width, height, {
    fit: values.fit,
    position: "centre",
    background: values.background,
  })
  .flatten({ background: values.background })
  .removeAlpha()
  .png()
  .toFile(values.output);

const meta = await sharp(values.output).metadata();
if (meta.width !== width || meta.height !== height || meta.hasAlpha) {
  console.error(`Output check failed: ${meta.width}x${meta.height} alpha=${Boolean(meta.hasAlpha)}`);
  process.exit(1);
}

console.log(`${values.output} ${meta.width}x${meta.height} alpha=false`);
