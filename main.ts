import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MIN_CHARS = 1;
const MAX_CHARS = 200;
const entryText = "It's you in ten years. Buy the umbrella. Trust me on the umbrella.";
const outputPath = "/output/entry.txt";

function validateEntry(text: string): void {
  const charCount = [...text].length;
  if (charCount < MIN_CHARS || charCount > MAX_CHARS) {
    throw new Error(`entry length ${charCount} outside ${MIN_CHARS}-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

validateEntry(entryText);
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, entryText, "utf8");

const written = readFileSync(outputPath, "utf8");
if (written !== entryText) {
  throw new Error("written output does not match entry text");
}
validateEntry(written);
