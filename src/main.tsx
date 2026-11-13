import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { configureLinks, page, isRedacted } from "./lib/links";
import { PAGES, SECTIONS, findPage, type SitePage } from "./site";
import "./styles/neals.css";
import "./styles/shell.css";

configureLinks({ mode: "demo", redact: import.meta.env.VITE_REDACT === "1" });

function parseHash() {
  const [id = "home", anchor] = location.hash.replace(/^#\/?/, "").split("/");
  return { id: id || "home", anchor };
}

function useRoute() {
  const [route, setRoute] = useState(parseHash);
  useEffect(() => {
    const on = () => setRoute(parseHash());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

function BuiltIn({ p }: { p: SitePage }) {
  return (
    <div className="neals">
      <div className="n-lede"><h2>This is YourMembership's built-in {p.ymTarget}.</h2>
        <p>It isn't a custom page, so there's nothing to design here. It only needs a menu link and the right visibility settings. In the live portal this link opens the YM feature.</p></div>
    </div>
  );
}

function PageMap() {
  const rows = PAGES.filter((p) => p.id !== "_map");
  return (
    <div className="neals">
      <div className="n-lede"><h2>Every page in the prototype and where it goes in YourMembership.</h2></div>
      <table className="s-map">
        <thead><tr><th>Page</th><th>Section</th><th>Type in YM</th><th>Status</th></tr></thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id}>
              <td><a href={page(p.id)}>{p.title}</a><div className="s-map-id">{p.kind === "custom" ? `/page/${p.id}` : p.ymTarget}</div></td>
              <td>{SECTIONS.find((s) => s.id === p.section)?.label ?? "Home"}</td>
              <td>{p.kind === "custom" ? "Custom page" : p.kind === "content-area" ? "Content area" : "Built-in feature"}</td>
              <td>{p.kind === "built-in" ? "Link only" : p.status === "new" ? <span className="s-new">New page</span> : p.status === "existing" ? "Replace existing" : "Replace content"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const { id, anchor } = useRoute();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMap = id === "_map";
  const p = findPage(id) ?? findPage("home")!;
  const section = SECTIONS.find((s) => s.id === p.section);
  const sectionPages = PAGES.filter((x) => x.section === p.section && !x.hidden && p.section !== "home" && p.section !== "directory");

  useEffect(() => {
    if (!anchor) { window.scrollTo(0, 0); return; }
    const el = document.getElementById(anchor);
    if (el) {
      if (el instanceof HTMLDetailsElement) el.open = true;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [id, anchor]);

  useEffect(() => { document.title = `${isMap ? "Page map" : p.title} · NEALS Member Portal prototype`; }, [p, isMap]);

  return (
    <>
      <div className="s-proto">
        Prototype of the NEALS member portal redesign. Not the live site.
        {isRedacted() && " Member-only links are disabled in this public demo."}
        <a href="#/_map">Page map</a>
      </div>
      <header className="s-header">
        <div className="s-wrap s-header-row">
          <a className="s-brand" href={page("home")}>
            <span className="s-mark" aria-hidden="true">N</span>
            <span><b>NEALS</b><small>Member Portal</small></span>
          </a>
          <nav className="s-utility" aria-label="Account">
            <a href={page("SignUpForEmails")}>Mailing list</a>
            <a href="#">Donate</a>
            <a href="#">Merch store</a>
            <a className="s-login" href="#">My profile</a>
          </nav>
        </div>
        <div className={`s-menu${menuOpen ? " is-open" : ""}`}>
          <button type="button" className="s-menu-btn" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>Menu</button>
          <nav className="s-wrap s-nav" aria-label="Main" onClick={() => setMenuOpen(false)}>
            <a href={page("home")} aria-current={p.section === "home" ? "page" : undefined}>Home</a>
            {SECTIONS.map((s) => (
              <a key={s.id} href={page(s.id)} aria-current={p.section === s.id ? "page" : undefined}>{s.label}</a>
            ))}
          </nav>
        </div>
      </header>

      {sectionPages.length > 1 && !isMap && (
        <nav className="s-subnav" aria-label={section?.label}>
          <div className="s-wrap">
            {sectionPages.map((x) => (
              <a key={x.id} href={page(x.id)} aria-current={x.id === p.id ? "page" : undefined}>{x.id === p.section ? "Overview" : x.title.replace("Annual Meeting ", "").replace("NEALS Member ", "Member ")}</a>
            ))}
          </div>
        </nav>
      )}

      <main className="s-wrap s-main">
        {!isMap && p.id !== "home" && (
          <div className="s-crumbs">
            <a href={page("home")}>Home</a>
            {section && section.id !== p.id && <> / <a href={page(section.id)}>{section.label}</a></>}
          </div>
        )}
        {!isMap && p.id !== "home" && <h1 className="s-title">{p.title}</h1>}
        {isMap ? (<><h1 className="s-title">Page map</h1><PageMap /></>) : p.render ? p.render() : <BuiltIn p={p} />}
      </main>

      <footer className="s-footer">
        <div className="s-wrap s-footer-cols">
          <div>
            <b className="s-footer-brand">NEALS</b>
            <p>Network of Excellence for ALS<br />33 Arch Street, 16th Floor<br />Boston, MA 02110</p>
          </div>
          <div>
            <h4>Portal</h4>
            <ul>{SECTIONS.map((s) => <li key={s.id}><a href={page(s.id)}>{s.label}</a></li>)}</ul>
          </div>
          <div>
            <h4>neals.org</h4>
            <ul>
              <li><a href="https://neals.org/about/our-mission/">Our Mission</a></li>
              <li><a href="https://neals.org/about/neals-member-sites/">NEALS Member Sites</a></li>
              <li><a href="https://tools.neals.org/als-clinical-trials/">Search for a Trial</a></li>
              <li><a href="https://neals.org/about/contact-us/">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="s-wrap s-footer-bottom">© {new Date().getFullYear()} NEALS. All rights reserved.</div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
