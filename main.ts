// Alien Field Notes: The Two Day Earth Review
// Writes one original line to /output/entry.txt: an alien tourist's
// review of planet Earth. Gate: 1-200 Unicode code points, UTF-8,
// not only whitespace, single line.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "The locals pay good money to sit in a dark room and watch strangers pretend to be sad, then leave crying themselves. Five stars, I cried too.";

const MAX_CODE_POINTS = 200;

function codePointCount(text: string): number {
  return [...text].length;
}

function validate(text: string): void {
  const count = codePointCount(text);
  if (count < 1 || count > MAX_CODE_POINTS) {
    throw new Error(`entry must be 1-${MAX_CODE_POINTS} code points, got ${count}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

validate(LINE);
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
console.log(`Wrote ${codePointCount(LINE)} code points to ${outPath}`);
