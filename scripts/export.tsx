/**
 * Renders every YM page to a plain-HTML snippet (no scripts) for pasting into the YM editor's HTML view.
 *
 *   npm run export
 *
 * Output (dist-ym/):
 *   neals.css                    → paste once into Website Settings > Meta Tags & CSS > Custom CSS
 *   <page-id>.html               → page body only (needs neals.css in Custom CSS)
 *   standalone/<page-id>.html    → same, with the stylesheet inlined (use until Custom CSS is set up)
 *   MANIFEST.md                  → which YM page / content area each file goes into
 */
import { mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import { configureLinks } from "../src/lib/links";

configureLinks({ mode: "ym", redact: false });
const { PAGES } = await import("../src/site");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "dist-ym");
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, "standalone"), { recursive: true });

const css = readFileSync(join(root, "src/styles/neals.css"), "utf8");
writeFileSync(join(out, "neals.css"), css);

const manifest: string[] = [
  "# YM paste manifest",
  "",
  "1. Paste `neals.css` into **Website Settings → Meta Tags & CSS → Custom CSS** and tick *Enable Custom CSS*.",
  "2. For each row: open the page in YM → Edit → HTML view → replace everything with the file → save as **Working** → preview signed in and signed out → Publish.",
  "",
  "| File | Goes into | Action |",
  "|---|---|---|",
];

for (const p of PAGES) {
  if (p.kind === "built-in" || !p.render) continue;
  const html = renderToStaticMarkup(p.render());
  if (/<script/i.test(html)) throw new Error(`${p.id}: snippet contains a script tag`);
  writeFileSync(join(out, `${p.id}.html`), html + "\n");
  writeFileSync(join(out, "standalone", `${p.id}.html`), `<style>\n${css}\n</style>\n${html}\n`);
  const target = p.kind === "content-area" ? `Content Area: ${p.ymTarget}` : `Custom Page \`${p.id}\` (“${p.title}”)`;
  const action = p.kind === "content-area" ? "Replace content" : p.status === "new" ? "**Create page** with this ID, then paste" : "Replace page body";
  manifest.push(`| \`${p.id}.html\` | ${target} | ${action} |`);
  console.log(`✓ ${p.id.padEnd(34)} ${(html.length / 1024).toFixed(1)} KB`);
}

writeFileSync(join(out, "MANIFEST.md"), manifest.join("\n") + "\n");
console.log(`\nWrote ${out}`);
