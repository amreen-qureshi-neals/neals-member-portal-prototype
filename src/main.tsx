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
        <h2>In the live portal, this link opens YourMembership's built-in {p.ymTarget}.</h2>
        <p>{p.ymTarget} is a standard YourMembership feature with its own layout, so it isn't redesigned in this prototype. Members reach it from the same menu and sidebar.</p>
      </div>
    </Page>
  );
}

function About() {
  const redacted = isRedacted();
  return (
    <div className="neals">
      <div className="n-lede">
        <h2>A clickable prototype of the redesigned NEALS member portal on YourMembership.</h2>
        <p>It shows the proposed structure, navigation and page layouts, using real content from the current member portal (as of November 13, 2026).</p>
      </div>

      <section className="n-section">
        <h2 className="n-h2">What's real</h2>
        <ul className="n-bullets">
          <li>The site structure: five sections (Annual Meeting, Learning &amp; Events, Committees, Resources, Directory), each with a sidebar listing its pages.</li>
          <li>Titles and dates of recordings, webinars, newsletters, documents and past meetings.</li>
          <li>Committee descriptions, missions, goals and chair names.</li>
          <li>Page layouts, typography and colors (NEALS navy, taken from the logo).</li>
        </ul>
      </section>

      {redacted && (
        <section className="n-section">
          <h2 className="n-h2">What's removed from this public preview</h2>
          <p>This preview is hosted publicly on GitHub Pages, but the real portal is for members only. So the following are removed from the preview, both from the pages and from the site's code:</p>
          <ul className="n-bullets">
            <li>Links to session and webinar recordings (Vimeo, Dropbox and GoToWebinar)</li>
            <li>Links to member documents and files, and the Recruitment &amp; Retention toolbox (Box)</li>
            <li>All email addresses, including committee chairs and staff</li>
            <li>The viewing code for 2026 recordings and webinars</li>
          </ul>
          <p>Removed links show as <span className="n-redacted">grey text with a dotted underline</span>. Public links still work: the meeting website, Muscle &amp; Nerve abstracts, poster libraries and neals.org. In the real portal, every link works as normal.</p>
        </section>
      )}

      <section className="n-section">
        <h2 className="n-h2">What isn't final</h2>
        <ul className="n-bullets">
          <li>The header, menu and footer stand in for the YourMembership theme. The live portal uses YM's own header, sign-in and footer.</li>
          <li>The Events calendar and Member directory are standard YourMembership features, so they aren't redesigned here.</li>
          <li>Some pages are waiting for content, for example current Lectures &amp; opportunities listings and links to the committee file libraries.</li>
          <li>Wording, layout and section names are open to feedback.</li>
        </ul>
      </section>

      <section className="n-section">
        <h2 className="n-h2">How it becomes the live portal</h2>
        <p>Each page here becomes a YourMembership page, built as plain HTML with one shared stylesheet and no scripts. Sign-in, registration, dues and payment pages are YourMembership system pages and aren't changed. The <a href="#/_map">page map</a> lists every page and what happens to it in YourMembership.</p>
      </section>
    </div>
  );
}

function PageMap() {
  return (
    <div className="neals">
      <div className="n-lede"><h2>Every page in the prototype and what happens to it in YourMembership.</h2><p>“New page” means the page doesn't exist on the current portal yet. “Existing page” means the page exists and gets the new content and layout.</p></div>
      <table className="n-table">
        <thead><tr><th scope="col">Page</th><th scope="col">Section</th><th scope="col">Type in YM</th><th scope="col">Status</th></tr></thead>
        <tbody>
          {PAGES.map((p) => (
            <tr key={p.id}>
              <td><a href={page(p.id)}>{p.title}</a><div className="n-small">{p.kind === "custom" ? `/page/${p.id}` : p.ymTarget}</div></td>
              <td className="n-muted">{sectionOf(p.id)?.label ?? "Home"}</td>
              <td className="n-muted">{p.kind === "custom" ? "Custom page" : p.kind === "content-area" ? "Content area" : "Built-in feature"}</td>
              <td>{p.kind === "built-in" ? "Standard YM feature" : p.status === "new" ? <strong>New page</strong> : "Existing page"}</td>
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
  const isAbout = id === "_about";
  const p = findPage(id) ?? findPage("home")!;
  const section = sectionOf(p.id);

  useEffect(() => {
    if (!anchor) { window.scrollTo(0, 0); return; }
    document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [id, anchor]);

  useEffect(() => { document.title = `${isMap ? "Page map" : isAbout ? "About this prototype" : p.title} · NEALS Member Portal prototype`; }, [p, isMap, isAbout]);

  return (
    <>
      <div className="s-proto">
        <strong>Prototype for review</strong>, not the live member portal.
        {isRedacted() && " Member-only links, email addresses and viewing codes are removed from this public preview."}
        <a href="#/_about">About this prototype</a>
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
        {!isMap && !isAbout && p.id !== "home" && (
          <nav className="s-crumbs" aria-label="Breadcrumb">
            <a href={page("home")}>Home</a>
            {section && section.id !== p.id && <><span aria-hidden="true"> › </span><a href={page(section.id)}>{section.label}</a></>}
          </nav>
        )}
        {!isMap && !isAbout && p.id !== "home" && <h1 className="s-title">{p.title}</h1>}
        {isAbout ? (<><h1 className="s-title">About this prototype</h1><About /></>)
          : isMap ? (<><h1 className="s-title">Page map</h1><PageMap /></>)
          : p.render ? p.render() : <BuiltIn p={p} />}
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
