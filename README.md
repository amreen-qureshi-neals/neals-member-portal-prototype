# NEALS Member Portal: redesign

Pages for the NEALS member portal on YourMembership (YM), written once in React + TypeScript and output two ways:

1. **Prototype:** a clickable demo inside a mock YM frame, for review (`npm run dev`, or the GitHub Pages link).
2. **YM snippets:** plain HTML with no scripts, pasted into each YM page's HTML view (`npm run export` → `dist-ym/`).

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (once) |
| `npm run dev` | Prototype at http://localhost:5173 |
| `npm run export` | Write YM snippets + `neals.css` + `MANIFEST.md` to `dist-ym/` |
| `npm run build:demo` | Public demo build: member-only links disabled |
| `npm run typecheck` | Type-check everything |

## Where things live

```
src/content/     ← the content, as typed data (recordings, webinars, meetings, committees, documents)
src/pages/       ← one component per page (hub, media library, document library, committee, gallery)
src/components/  ← shared building blocks (cards, rows, collapsible sections, notices…)
src/styles/neals.css  ← the ONE stylesheet; goes into YM Custom CSS. All rules scoped under .neals
src/styles/shell.css  ← prototype-only mock of the YM header/menu/footer (never exported)
src/site.tsx     ← site map: every page, its section and where it goes in YM
scripts/export.tsx    ← renders the YM snippets
```

To update content (e.g. add next year's recordings), edit `src/content/*.ts` and run `npm run export`.

## Publishing to YM

See `dist-ym/MANIFEST.md` after exporting. In short: paste `neals.css` into **Website Settings → Meta Tags & CSS → Custom CSS** once, then for each page paste its snippet into the YM editor's HTML view, save as **Working**, preview signed in and signed out, then publish. Login, registration, store, dues and profile screens are YM system pages and are never touched.

## Content still needed

Yellow **Content needed** boxes in the prototype mark gaps (committee text, SOPs, newsletters, lectures). They are never included in the YM export.

See also `SITE_PLAN.md` (structure) and `MIGRATION.md` (WildApricot → YM tracker).
