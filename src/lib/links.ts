/**
 * Every link in a page goes through these helpers so the same components can render:
 *  - "demo": the clickable prototype (hash routes, e.g. #/webinars)
 *  - "ym":   snippets pasted into YourMembership (real YM paths, e.g. /page/webinars)
 *
 * `redact` is for a public demo build: member-only external links (unlisted Vimeo,
 * Dropbox, GoToWebinar, YM resource files) and staff emails are replaced with "#".
 */
export type Mode = "demo" | "ym";

const config = { mode: "demo" as Mode, redact: false };

export function configureLinks(next: Partial<typeof config>) {
  Object.assign(config, next);
}
export const linkMode = () => config.mode;
export const isRedacted = () => config.redact;

/** Built-in YM features: no custom page, just a fixed YM URL. */
const BUILT_IN: Record<string, string> = {
  calendar: "/events/event_list.asp",
  directory: "/search/",
  home: "/",
};

/** Link to another portal page by its YM page identifier. */
export function page(id: string, anchor?: string): string {
  if (config.mode === "demo") return `#/${id}${anchor ? `/${anchor}` : ""}`;
  const base = BUILT_IN[id] ?? `/page/${id}`;
  return anchor ? `${base}#${anchor}` : base;
}

/** Jump link within the current page. */
export function anchor(currentPage: string, id: string): string {
  return config.mode === "demo" ? `#/${currentPage}/${id}` : `#${id}`;
}

/** External / member-only link. Public links (journals, neals.org, meeting site) are never redacted. */
const PUBLIC_HOSTS = ["neals.org", "meeting.neals.org", "tools.neals.org", "onlinelibrary.wiley.com", "event.fourwaves.com"];

export function ext(url: string): string {
  if (!config.redact) return url;
  try {
    const host = new URL(url, "https://neals.site-ym.com").hostname;
    return PUBLIC_HOSTS.some((h) => host === h || host.endsWith("." + h)) ? url : "#";
  } catch {
    return "#";
  }
}

export function email(addr: string): { href: string; label: string } {
  return config.redact ? { href: "#", label: "NEALS staff" } : { href: `mailto:${addr}`, label: addr };
}
