import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { configureLinks, page, isRedacted } from "./lib/links";
import { PAGES, findPage, type SitePage } from "./site";
import { NAV, sectionOf } from "./nav";
import { Page } from "./components/ui";
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

/** Stand-in for a YM built-in feature (calendar, directory). */
function BuiltIn({ p }: { p: SitePage }) {
  return (
    <Page id={p.id}>
      <div className="n-lede">
        <h2>In the live portal, this opens YourMembership's built-in {p.ymTarget}.</h2>
        <p>It's a YM feature rather than a custom page, so it keeps YM's own layout. It only needs a menu link and the right visibility settings.</p>
      </div>
    </Page>
  );
}

function PageMap() {
  return (
    <div className="neals">
      <div className="n-lede"><h2>Every page in the prototype and where it goes in YourMembership.</h2></div>
      <table className="n-table">
        <thead><tr><th scope="col">Page</th><th scope="col">Section</th><th scope="col">In YM</th><th scope="col">Action</th></tr></thead>
        <tbody>
          {PAGES.map((p) => (
            <tr key={p.id}>
              <td><a href={page(p.id)}>{p.title}</a><div className="n-small">{p.kind === "custom" ? `/page/${p.id}` : p.ymTarget}</div></td>
              <td className="n-muted">{sectionOf(p.id)?.label ?? "Home"}</td>
              <td className="n-muted">{p.kind === "custom" ? "Custom page" : p.kind === "content-area" ? "Content area" : "Built-in feature"}</td>
              <td>{p.kind === "built-in" ? "Link only" : p.status === "new" ? <strong>Create page</strong> : p.status === "existing" ? "Replace content" : "Replace content"}</td>
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
  const section = sectionOf(p.id);

  useEffect(() => {
    if (!anchor) { window.scrollTo(0, 0); return; }
    document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
            <img src={`${import.meta.env.BASE_URL}neals-logo.png`} alt="NEALS" className="s-logo" />
            <small>Member Portal</small>
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
            <a href={page("home")} aria-current={p.id === "home" ? "page" : undefined}>Home</a>
            {NAV.map((s) => (
              <a key={s.id} href={page(s.id)} aria-current={section?.id === s.id ? "page" : undefined}>{s.label}</a>
            ))}
          </nav>
        </div>
      </header>

      <main className="s-wrap s-main">
        {!isMap && p.id !== "home" && (
          <nav className="s-crumbs" aria-label="Breadcrumb">
            <a href={page("home")}>Home</a>
            {section && section.id !== p.id && <><span aria-hidden="true"> › </span><a href={page(section.id)}>{section.label}</a></>}
          </nav>
        )}
        {!isMap && p.id !== "home" && <h1 className="s-title">{p.title}</h1>}
        {isMap ? (<><h1 className="s-title">Page map</h1><PageMap /></>) : p.render ? p.render() : <BuiltIn p={p} />}
      </main>

      <footer className="s-footer">
        <div className="s-wrap s-footer-cols">
          <div>
            <img src={`${import.meta.env.BASE_URL}neals-logo-white.png`} alt="NEALS" className="s-footer-logo" />
            <p>Network of Excellence for ALS<br />33 Arch Street, 16th Floor<br />Boston, MA 02110</p>
          </div>
          <div>
            <h2>Portal</h2>
            <ul>{NAV.map((s) => <li key={s.id}><a href={page(s.id)}>{s.label}</a></li>)}</ul>
          </div>
          <div>
            <h2>neals.org</h2>
            <ul>
              <li><a href="https://neals.org/about/our-mission/">Our mission</a></li>
              <li><a href="https://neals.org/about/neals-member-sites/">Member sites</a></li>
              <li><a href="https://tools.neals.org/als-clinical-trials/">Search for a trial</a></li>
              <li><a href="https://neals.org/about/contact-us/">Contact us</a></li>
            </ul>
          </div>
        </div>
        <div className="s-wrap s-footer-bottom">© {new Date().getFullYear()} Network of Excellence for ALS</div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
