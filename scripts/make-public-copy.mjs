#!/usr/bin/env node
/**
 * Builds a redacted copy of this project for the PUBLIC prototype repo.
 *
 *   node scripts/make-public-copy.mjs <output-dir>
 *
 * The real project (with member-only links) stays local / private. The copy:
 *  - takes the committed files at HEAD (git archive), so originals/ and other ignored files never leak
 *  - replaces member-only URLs (Vimeo, Dropbox, GoToWebinar, WildApricot, YM member docs) with "#"
 *  - removes the video IDs passed to the link helpers, staff emails and staff names
 *  - fails if anything sensitive is still found
 */
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, readdirSync, statSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const out = resolve(process.argv[2] ?? "");
if (!process.argv[2]) { console.error("usage: make-public-copy.mjs <output-dir>"); process.exit(1); }

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
execSync(`git archive HEAD | tar -x -C "${out}"`, { stdio: "inherit" });

// Internal working notes (names, data errors, file inventory) stay private
for (const f of ["MIGRATION.md"]) rmSync(join(out, f), { force: true });

const MEMBER_ONLY = /https?:\/\/(?:www\.)?(?:dropbox\.com|vimeo\.com|attendee\.gotowebinar\.com|neals\.wildapricot\.org|(?:[\w-]+\.)+box\.com)[^"'`\s)|]*/g;
const YM_FILES = /\/resource\/resmgr\/memberresourcedocs\/[^"'`\s)|]*/g;
const EMAILS = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g;
const STAFF_NAMES = [/Jennifer Heinly/g];

const redact = (s) => {
  let r = s
    .replace(MEMBER_ONLY, "#")
    .replace(/neals\.wildapricot\.org\/[^\s|`)"']*/g, "(old WildApricot page)")
    .replace(YM_FILES, "#")
    .replace(EMAILS, "name@example.org")
    .replace(/\b(share|vm|gtw|secret)\("[^"]*"\)/g, '$1("")');
  for (const n of STAFF_NAMES) r = r.replace(n, "NEALS staff");
  return r;
};

const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});

const targets = walk(out).filter((p) => /\.(ts|tsx|md|mjs|html)$/.test(p) && !p.endsWith("make-public-copy.mjs") && !p.endsWith("vite.config.ts"));
for (const p of targets) {
  const before = readFileSync(p, "utf8");
  const after = redact(before);
  if (after !== before) { writeFileSync(p, after); console.log("redacted", p.slice(out.length + 1)); }
}

// Redacted link helpers no longer use their parameter; relax that one compiler check in the copy only
const tsconfig = join(out, "tsconfig.json");
writeFileSync(tsconfig, readFileSync(tsconfig, "utf8").replace('"noUnusedParameters": true', '"noUnusedParameters": false'));

// Safety check: nothing sensitive may remain anywhere in the copy (except the redaction rules themselves)
const LEAKS = /dropbox\.com\/(?:s|sh|scl)\/|vimeo\.com\/(?:share\/)?\d|vimeo\.com\/share\/[0-9a-f-]{8}|gotowebinar\.com\/recording\/\d|wildapricot\.org\/|memberresourcedocs\/\w|rlkey=|secret\("[^"]+"\)|box\.com\/v\/|[\w.+-]+@(?!example\.org)[\w-]+\.(?:org|edu|com)|Heinly/;
const leaks = walk(out)
  .filter((p) => !p.endsWith("make-public-copy.mjs") && !p.endsWith("vite.config.ts") && !p.endsWith("package-lock.json"))
  .filter((p) => LEAKS.test(readFileSync(p, "utf8")));
if (leaks.length) { console.error("✗ Sensitive content still present in:\n  " + leaks.join("\n  ")); process.exit(2); }
console.log(`✓ Public copy ready (no member-only links): ${out}`);
