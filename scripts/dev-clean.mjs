#!/usr/bin/env node
/**
 * Clears stale Next.js cache and restarts dev server.
 * Use when styles disappear (white page / black text).
 */
import { rmSync } from "node:fs";
import { spawn } from "node:child_process";

rmSync(".next", { recursive: true, force: true });
console.log("Cleared .next cache.");
console.log("Starting dev server on http://localhost:3001 …\n");

const child = spawn("npm", ["run", "dev"], { stdio: "inherit", shell: true });
child.on("exit", (code) => process.exit(code ?? 0));
