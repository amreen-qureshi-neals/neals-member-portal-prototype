import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Public demo builds (VITE_REDACT=1) strip member-only links from the content files at build
 * time, so they never reach the published JavaScript bundle. Public links (neals.org, meeting site,
 * journals) and thumbnail images are kept.
 */
function redactContent(): Plugin {
  const MEMBER_ONLY = /https?:\/\/(?:www\.)?(?:dropbox\.com|vimeo\.com|attendee\.gotowebinar\.com|neals\.wildapricot\.org|(?:[\w-]+\.)+box\.com)[^"'`\s)]*/g;
  const YM_FILES = /\/resource\/resmgr\/memberresourcedocs\/[^"'`\s)]*/g;
  const EMAILS = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g;
  return {
    name: "neals-redact-content",
    enforce: "pre",
    transform(code, id) {
      if (!id.includes("/src/content/")) return null;
      return code
        .replace(MEMBER_ONLY, "#")
        .replace(YM_FILES, "#")
        .replace(EMAILS, "name@example.org")
        // video IDs passed to the link helpers (share/vm/gtw) would let someone rebuild the URL
        .replace(/\b(share|vm|gtw|secret)\("[^"]*"\)/g, '$1("")');
    },
  };
}

// base "./" so the build works from any GitHub Pages sub-path
export default defineConfig(({ mode }) => {
  const redact = process.env.VITE_REDACT === "1" || mode === "demo";
  return { plugins: [react(), ...(redact ? [redactContent()] : [])], base: "./" };
});
