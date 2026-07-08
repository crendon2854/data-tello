#!/usr/bin/env node
/**
 * Post-build guardrail — verifies compiled CSS contains theme markers.
 * Catches "white page / unstyled" regressions before deploy.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const cssDir = join(".next", "static", "css");

if (!existsSync(cssDir)) {
  console.error("Style build check failed: .next/static/css not found. Run `npm run build` first.");
  process.exit(1);
}

const cssFiles = readdirSync(cssDir).filter((file) => file.endsWith(".css"));
if (cssFiles.length === 0) {
  console.error("Style build check failed: no CSS files in .next/static/css");
  process.exit(1);
}

const bundle = cssFiles
  .map((file) => readFileSync(join(cssDir, file), "utf8"))
  .join("\n");

const required = [
  { label: "dark canvas (#020704)", test: /020704/i },
  { label: "bg-bg-primary utility", test: /\.bg-bg-primary\b/ },
  { label: "text-text-primary utility", test: /\.text-text-primary\b/ },
  { label: "glass-card component", test: /\.glass-card\b/ },
  { label: "accent brand color", test: /3ecf8e/i },
];

const missing = required.filter(({ test }) => !test.test(bundle));

if (missing.length > 0) {
  console.error("Style build check failed — compiled CSS is missing theme markers:");
  for (const { label } of missing) {
    console.error(`  • ${label}`);
  }
  console.error("\nTry: npm run dev:clean");
  process.exit(1);
}

console.log(`Style build check OK (${cssFiles.length} CSS file(s), ${(bundle.length / 1024).toFixed(1)} KB)`);
