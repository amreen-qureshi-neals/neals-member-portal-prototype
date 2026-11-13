import type { ReactNode } from "react";
import { anchor, ext, isRedacted, linkMode, page } from "../lib/links";
import { sectionOf } from "../nav";

/* ---------- helpers ---------- */

export const fmtDur = (s?: number) => {
  if (!s) return "";
  const h = Math.floor(s / 3600), m = Math.round((s % 3600) / 60);
  return h ? `${h} hr ${m} min` : `${m} min`;
};
export const fmtDate = (iso: string, opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", opts);

const isExternal = (href: string) => /^https?:\/\//.test(href);

/** Link that handles internal pages, external links (new tab + ↗) and redaction. */
export function A({ href, children, className }: { href?: string; children: ReactNode; className?: string }) {
  if (!href) return <span className={className}>{children}</span>;
  // Public preview: member-only links are removed. Show them as plain, clearly marked text.
  if (isRedacted() && (href === "#" || (isExternal(href) && ext(href) === "#"))) {
    return (
      <span className={`n-redacted${className ? " " + className : ""}`} title="Member-only link: removed in this public preview">
        {children}<span className="n-sr"> (member-only link removed in this preview)</span>
      </span>
    );
  }
  if (isExternal(href)) {
    return (
      <a className={className} href={ext(href)} target="_blank" rel="noopener">
        {children}<span className="n-ext" aria-hidden="true">{"\u00a0"}↗</span><span className="n-sr"> (opens in a new tab)</span>
      </a>
    );
  }
  return <a className={className} href={href}>{children}</a>;
}

/* ---------- page frame ---------- */

/**
 * Every page: optional section sidebar + content column.
 * The sidebar lists every page in the section, so members always see where they are.
 */
export function Page({ id, children, aside }: { id: string; children: ReactNode; aside?: ReactNode }) {
  const section = sectionOf(id);
  const pages = section?.pages ?? [];
  return (
    <div className="neals">
      <div className={pages.length ? "n-layout" : undefined}>
        {pages.length > 0 && (
          <nav className="n-sidenav" aria-label={`${section!.label} pages`}>
            <p className="n-sidenav-title"><a href={page(section!.id)}>{section!.label}</a></p>
            <ul>
              {pages.map((p) => (
                <li key={p.id}>
                  <a href={page(p.id)} aria-current={p.id === id ? "page" : undefined}>{p.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <div className="n-main">
          {children}
          {aside}
        </div>
      </div>
    </div>
  );
}

/** Opening lines of a page. YM prints the page title itself, so this is an h2. */
export function Lede({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <div className="n-lede">
      <h2>{children}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}

export function Section({ id, title, meta, children }: { id?: string; title: string; meta?: ReactNode; children: ReactNode }) {
  return (
    <section className="n-section" id={id}>
      <h2 className="n-h2">{title}{meta && <span className="n-meta">{meta}</span>}</h2>
      {children}
    </section>
  );
}

/** "On this page" links for long pages. */
export function OnThisPage({ page: pageId, items }: { page: string; items: { id: string; label: string }[] }) {
  return (
    <nav className="n-toc" aria-label="On this page">
      <span>On this page:</span>
      <ul>{items.map((i) => <li key={i.id}><a href={anchor(pageId, i.id)}>{i.label}</a></li>)}</ul>
    </nav>
  );
}

/** Plain note. */
export const Note = ({ children, title }: { children: ReactNode; title?: string }) => (
  <div className="n-note">{title && <strong>{title} </strong>}{children}</div>
);

/** Migration note: visible in the prototype only, never exported to YM. */
export function Todo({ children }: { children: ReactNode }) {
  if (linkMode() === "ym" || isRedacted()) return null;
  return <p className="n-todo"><strong>Content needed:</strong> {children}</p>;
}
export function Flag({ text }: { text?: string }) {
  if (!text || linkMode() === "ym" || isRedacted()) return null;
  return <span className="n-flag" title={text}>Check: {text}</span>;
}

/* ---------- lists ---------- */

/** A list of items with a title (linked), optional description and right-aligned details. */
export function List({ children }: { children: ReactNode }) {
  return <ul className="n-list">{children}</ul>;
}
export function Item({ href, title, desc, meta, flag }: { href?: string; title: ReactNode; desc?: ReactNode; meta?: ReactNode; flag?: string }) {
  return (
    <li className="n-item">
      <div className="n-item-main">
        <A href={href} className="n-item-title">{title}</A>
        {desc && <p className="n-item-desc">{desc}</p>}
        <Flag text={flag} />
      </div>
      {meta && <div className="n-item-meta">{meta}</div>}
    </li>
  );
}

/** Index of a section's pages with one-line descriptions (used on overview pages). */
export function Index({ items }: { items: { href: string; title: string; desc: string }[] }) {
  return (
    <ul className="n-index">
      {items.map((i) => (
        <li key={i.title}><a href={i.href}>{i.title}</a><p>{i.desc}</p></li>
      ))}
    </ul>
  );
}
