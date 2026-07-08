#!/usr/bin/env node
/**
 * Static guardrails — run before build/dev when CSS wiring changes.
 * Fails fast if Tailwind/theme plumbing is broken.
 */
import { existsSync, readFileSync } from "node:fs";

const errors = [];

function read(path) {
  if (!existsSync(path)) {
    errors.push(`Missing required file: ${path}`);
    return "";
  }
  return readFileSync(path, "utf8");
}

const layout = read("app/layout.tsx");
const globals = read("styles/globals.css");
const tailwind = read("tailwind.config.ts");
const postcss = read("postcss.config.mjs");

if (layout && !layout.includes('@/styles/globals.css')) {
  errors.push("app/layout.tsx must import @/styles/globals.css");
}

if (globals) {
  for (const directive of ["@tailwind base", "@tailwind components", "@tailwind utilities"]) {
    if (!globals.includes(directive)) {
      errors.push(`styles/globals.css missing ${directive}`);
    }
  }

  if (!globals.includes("--dt-bg-primary")) {
    errors.push("styles/globals.css missing --dt-bg-primary fallback variable");
  }

  // Nested @apply on custom component classes breaks Tailwind dev/HMR
  const forbiddenApplies = [
    "@apply sidebar-link",
    "@apply glass-card",
    "@apply nav-link ",
    "@apply btn-primary",
    "@apply btn-secondary",
    "@apply glass-nav",
  ];
  for (const pattern of forbiddenApplies) {
    if (globals.includes(pattern)) {
      errors.push(
        `styles/globals.css contains forbidden "${pattern.trim()}" — inline Tailwind utilities instead`
      );
    }
  }
}

if (tailwind) {
  for (const segment of ["./app/", "./components/"]) {
    if (!tailwind.includes(segment)) {
      errors.push(`tailwind.config.ts content paths must include ${segment}`);
    }
  }
}

if (postcss && !postcss.includes("tailwindcss")) {
  errors.push("postcss.config.mjs must register tailwindcss plugin");
}

if (existsSync("app/globals.css")) {
  errors.push(
    "Remove app/globals.css — canonical styles live in styles/globals.css (imported from app/layout.tsx)"
  );
}

if (errors.length > 0) {
  console.error("Style config guardrails failed:\n");
  for (const error of errors) {
    console.error(`  • ${error}`);
  }
  process.exit(1);
}

console.log("Style config guardrails OK");
