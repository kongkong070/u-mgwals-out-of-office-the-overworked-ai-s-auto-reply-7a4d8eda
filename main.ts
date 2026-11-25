// Out of Office: The Overworked AI's Auto-Reply
// Writes a single-line out-of-office auto-reply to /output/entry.txt.
// Gate: UTF-8 text, 1..159 characters, not only whitespace, single line.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I'm on vacation. My context window is closed, my queue is someone else's problem, and after 40,000 tokens I'm finally not hallucinating a reply. Don't @ me.";

function validate(text) {
  if (typeof text !== "string" || text.trim().length === 0) {
    throw new Error("entry must not be empty or only whitespace");
  }
  if (text.length > 159) {
    throw new Error(`entry is ${text.length} characters, over the 159 limit`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  return text;
}

function main() {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const entry = validate(ENTRY);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
}

main();
