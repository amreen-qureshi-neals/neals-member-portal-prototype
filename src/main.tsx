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
          <li>The header, menu, page title band, share buttons and footer copy the portal's current YourMembership theme, so pages appear as they will in YourMembership. The new menu items and footer are set up in YourMembership's menu and footer settings.</li>
          <li>The homepage is shown without the theme's homepage extras (slideshow and side panels such as news and calendar). Those are set in YourMembership and will be switched off or kept as needed.</li>
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

  const title = isAbout ? "About this prototype" : isMap ? "Page map" : p.title;
  return (
    <>
      <div className="s-proto">
        <strong>Prototype for review</strong>, not the live member portal.
      </div>

      {/* ---- Everything below mirrors the live YourMembership theme (YM-FX-02-A) ---- */}
      <div className="ym-toolbar">
        <div className="ym-container ym-toolbar-row">
          <nav className="ym-toolbar-links" aria-label="Site tools">
            <a href="#">Print Page</a><a href="#">Contact Us</a><a href="#">Report Abuse</a><a href="#">Sign Out</a>
          </nav>
          <form className="ym-search" role="search" onSubmit={(e) => e.preventDefault()}>
            <input type="search" placeholder="Enter search criteria..." aria-label="Search" />
            <button type="submit" aria-label="Search"><span aria-hidden="true">⌕</span></button>
          </form>
        </div>
      </div>

      <header className="ym-header">
        <div className="ym-container ym-header-row">
          <a className="ym-logo" href={page("home")}>
            <img src={`${import.meta.env.BASE_URL}neals-mark.png`} alt="NEALS home" />
          </a>
          <button type="button" className="ym-menu-btn" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>MENU <span aria-hidden="true">☰</span></button>
          <nav className={`ym-menu${menuOpen ? " is-open" : ""}`} aria-label="Main" onClick={() => setMenuOpen(false)}>
            <a href={page("home")} aria-current={p.id === "home" && !isMap && !isAbout ? "page" : undefined}>Home</a>
            {NAV.map((sct) => (
              <a key={sct.id} href={page(sct.id)} aria-current={!isMap && !isAbout && section?.id === sct.id ? "page" : undefined}>{sct.label}</a>
            ))}
          </nav>
        </div>
      </header>

      {p.id !== "home" || isMap || isAbout ? (
        <div className="ym-titleband"><div className="ym-container"><h1>{title}</h1></div></div>
      ) : null}

      <main className="ym-container ym-main">
        {p.id !== "home" && !isMap && !isAbout && (
          <div className="ym-share" aria-hidden="true">
            <span className="ym-share-plus">+</span> Share <span className="ym-share-sep">|</span>
            <span className="ym-share-ico">f</span><span className="ym-share-ico">X</span><span className="ym-share-ico">✉</span><span className="ym-share-ico">in</span>
          </div>
        )}
        {isAbout ? <About /> : isMap ? <PageMap /> : p.render ? p.render() : <BuiltIn p={p} />}
      </main>

      <footer>
        <div className="ym-footer-area">
          <div className="s-footer">
            <div className="ym-container s-footer-cols">
              <div>
                <img src={`${import.meta.env.BASE_URL}neals-logo-white.png`} alt="NEALS" className="s-footer-logo" />
                <p>Network of Excellence for ALS<br />33 Arch Street, 16th Floor<br />Boston, MA 02110</p>
              </div>
              <div>
                <h2>Portal</h2>
                <ul>{NAV.map((sct) => <li key={sct.id}><a href={page(sct.id)}>{sct.label}</a></li>)}</ul>
              </div>
              <div>
                <h2>More</h2>
                <ul>
                  <li><a href={page("SignUpForEmails")}>Join the mailing list</a></li>
                  <li><a href="#">Donate</a></li>
                  <li><a href="#">NEALS Merch Store</a></li>
                  <li><a href="https://neals.org/">neals.org</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="ym-copyright"><div className="ym-container">Membership Software Powered by <a href="#">YourMembership</a> &nbsp;::&nbsp; <a href="#">Legal</a></div></div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
