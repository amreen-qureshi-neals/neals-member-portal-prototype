import type { ReactNode } from "react";
import { anchor, ext, linkMode } from "../lib/links";

/* ---------- helpers ---------- */

export const fmtDur = (s?: number) => {
  if (!s) return "";
  const h = Math.floor(s / 3600), m = Math.round((s % 3600) / 60);
  return h ? `${h} hr ${m} min` : `${m} min`;
};
export const fmtDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

const isExternal = (href: string) => /^https?:\/\//.test(href);
const linkProps = (href: string) =>
  isExternal(href) ? { href: ext(href), target: "_blank", rel: "noopener" } : { href };

/* ---------- icons (inline SVG, no icon font needed) ---------- */

const PATHS: Record<string, string> = {
  play: "M8 5.5v13l10.5-6.5z",
  video: "M4 6h11a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm13 4 4-2.5v9L17 14z",
  calendar: "M7 3v2M17 3v2M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z",
  people: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm-6 9c0-3.3 2.7-6 6-6s6 2.7 6 6M16 4.5a3.5 3.5 0 0 1 0 6.5M18 14.5c1.8.9 3 2.9 3 5.5",
  folder: "M3 7a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z",
  doc: "M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm7 0v5h5M9 13h6M9 17h6",
  photo: "M4 6h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm0 10 5-5 4 4 2-2 5 5M15.5 10a1.5 1.5 0 1 0 0-.01",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm9 3-4.5-4.5",
  arrow: "M5 12h14m-5-5 5 5-5 5",
  external: "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
  star: "M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z",
};

export function Icon({ name, className = "n-icon" }: { name: keyof typeof PATHS | string; className?: string }) {
  const filled = name === "play";
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={PATHS[name] ?? PATHS.doc} />
    </svg>
  );
}

/* ---------- layout ---------- */

/** Opening lines of a page. YM already prints the page title, so this is an h2. */
export function Lede({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <div className="n-lede">
      <h2>{children}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}

export function Section({ id, title, meta, action, children }: { id?: string; title: string; meta?: ReactNode; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="n-section" id={id}>
      <div className="n-section-head">
        <h2>{title}</h2>
        {meta && <span className="n-meta">{meta}</span>}
        {action && <span className="n-section-action">{action}</span>}
      </div>
      {children}
    </section>
  );
}

/** Collapsible block built on <details>, so it works with no JavaScript in YM. */
export function Fold({ id, title, meta, open, children }: { id?: string; title: string; meta?: ReactNode; open?: boolean; children: ReactNode }) {
  return (
    <details className="n-fold" id={id} open={open}>
      <summary>
        <h2>{title}</h2>
        {meta && <span className="n-meta">{meta}</span>}
        <span className="n-chev" aria-hidden="true" />
      </summary>
      <div className="n-fold-body">{children}</div>
    </details>
  );
}

export function JumpNav({ page, items, label = "Jump to" }: { page: string; items: { id: string; label: string }[]; label?: string }) {
  return (
    <nav className="n-jump" aria-label={label}>
      <span>{label}</span>
      {items.map((i) => (
        <a key={i.id} href={anchor(page, i.id)}>{i.label}</a>
      ))}
    </nav>
  );
}

export const Grid = ({ children, size = "md" }: { children: ReactNode; size?: "sm" | "md" | "lg" }) => (
  <div className={`n-grid n-grid-${size}`}>{children}</div>
);

export function Button({ href, children, variant = "primary", icon }: { href: string; children: ReactNode; variant?: "primary" | "ghost"; icon?: string }) {
  return (
    <a className={`n-btn n-btn-${variant}`} {...linkProps(href)}>
      {children}
      {icon && <Icon name={icon} className="n-icon n-icon-sm" />}
    </a>
  );
}

export const Chip = ({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "brand" | "warn" }) => (
  <span className={`n-chip n-chip-${tone}`}>{children}</span>
);

/** Banner for general information. */
export const Notice = ({ children, title }: { children: ReactNode; title?: string }) => (
  <div className="n-notice">
    {title && <strong>{title}</strong>}
    <div>{children}</div>
  </div>
);

/** Migration note: visible in the prototype only, never exported to YM. */
export function Todo({ children }: { children: ReactNode }) {
  if (linkMode() === "ym") return null;
  return (
    <div className="n-todo" role="note">
      <strong>Content needed</strong>
      <span>{children}</span>
    </div>
  );
}
export function TodoChip({ text }: { text?: string }) {
  if (!text || linkMode() === "ym") return null;
  return <span className="n-chip n-chip-warn" title={text}>⚠ {text}</span>;
}

/* ---------- cards ---------- */

export function HubCard({ href, title, text, icon, links }: { href: string; title: string; text: string; icon: string; links?: { label: string; href: string }[] }) {
  return (
    <div className="n-hub">
      <a className="n-hub-main" {...linkProps(href)}>
        <span className="n-hub-icon"><Icon name={icon} /></span>
        <span className="n-hub-title">{title}</span>
        <span className="n-hub-text">{text}</span>
      </a>
      {links && links.length > 0 && (
        <ul className="n-hub-links">
          {links.map((l) => (
            <li key={l.label}><a {...linkProps(l.href)}>{l.label}</a></li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function VideoCard({ title, url, dur, thumb, label }: { title: string; url: string; dur?: number; thumb?: string; label: string }) {
  return (
    <a className="n-video" {...linkProps(url)}>
      <span className="n-video-thumb">
        {thumb ? <img src={thumb} alt="" loading="lazy" /> : (
          <span className="n-video-ph"><span>NEALS</span><b>{label}</b></span>
        )}
        <span className="n-video-play"><Icon name="play" /></span>
        {dur ? <span className="n-video-dur">{fmtDur(dur)}</span> : null}
      </span>
      <span className="n-video-title">{title}</span>
    </a>
  );
}

export function Row({ href, icon, title, sub, meta, note }: { href?: string; icon: string; title: string; sub?: string; meta?: ReactNode; note?: string }) {
  const inner = (
    <>
      <span className="n-row-icon"><Icon name={icon} /></span>
      <span className="n-row-text">
        <span className="n-row-title">{title}</span>
        {sub && <span className="n-row-sub">{sub}</span>}
        <TodoChip text={note} />
      </span>
      {meta && <span className="n-row-meta">{meta}</span>}
      {href && <Icon name={isExternal(href) ? "external" : "arrow"} className="n-icon n-icon-sm n-row-go" />}
    </>
  );
  return href ? <a className="n-row" {...linkProps(href)}>{inner}</a> : <div className="n-row n-row-static">{inner}</div>;
}

export const Rows = ({ children }: { children: ReactNode }) => <div className="n-rows">{children}</div>;
