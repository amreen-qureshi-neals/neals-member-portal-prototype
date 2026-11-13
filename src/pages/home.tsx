import { recordings, countVideos } from "../content/recordings";
import { upcoming } from "../content/meetings";
import { webinars } from "../content/webinars";
import { A, Item, List, fmtDate } from "../components/ui";
import { page } from "../lib/links";
import { NAV } from "../nav";

/** Homepage: goes into the YM "Homepage - Main (Top)" content area. */
export function Home() {
  const latest = recordings[0];
  const recentWebinars = webinars.slice(0, 2);
  return (
    <div className="neals">
      <div className="n-lede n-lede-home">
        <h2>Recordings, documents, committees and events for NEALS member sites.</h2>
      </div>

      <div className="n-callout">
        <span className="n-callout-label">Next Annual Meeting</span>
        <span className="n-callout-text"><strong>{upcoming.dates}</strong></span>
        <A href={upcoming.url} className="n-callout-link">Meeting website</A>
      </div>

      <div className="n-home">
        <section className="n-home-sections" aria-label="Portal sections">
          {NAV.map((s) => (
            <div key={s.id} className="n-home-section">
              <h2><a href={page(s.id)}>{s.label}</a></h2>
              <p>{s.blurb}</p>
              {s.id !== "committees" && s.pages.length > 1 && (
                <ul>{s.pages.filter((p) => p.id !== s.id).map((p) => <li key={p.id}><a href={page(p.id)}>{p.label}</a></li>)}</ul>
              )}
            </div>
          ))}
        </section>

        <section className="n-home-new" aria-labelledby="new-h">
          <h2 id="new-h" className="n-h3">Recently added</h2>
          <List>
            <Item href={page("annualmeetingrecordings", `y${latest.year}`)} title={`${latest.year} Annual Meeting recordings`} desc={`${countVideos(latest)} sessions from ${latest.dates}`} />
            {recentWebinars.map((w) => (
              <Item key={w.date} href={page("webinars", "w2026")} title={w.title} desc={`Member webinar · ${fmtDate(w.date)}`} />
            ))}
          </List>
          <p className="n-more"><a href={page("annualmeetingrecordings")}>All recordings</a> · <a href={page("webinars")}>All webinars</a></p>
        </section>
      </div>
    </div>
  );
}
