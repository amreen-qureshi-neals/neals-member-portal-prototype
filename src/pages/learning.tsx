import { webinars, communityWebinarsUrl, platform, viewingCode2026 } from "../content/webinars";
import { lecturesContact } from "../content/documents";
import { A, Flag, Index, Lede, Note, OnThisPage, Page, Section, Todo, fmtDate } from "../components/ui";
import { email, page, isRedacted } from "../lib/links";

export function LearningHub() {
  return (
    <Page id="learning">
      <Lede sub="Find upcoming NEALS events and outside opportunities, or catch up on past member webinars.">
        Events, lectures and member webinars.
      </Lede>
      <Index items={[
        { href: page("calendar"), title: "Events calendar", desc: "Upcoming NEALS events, workshops and member meetings." },
        { href: page("lectures"), title: "Lectures & opportunities", desc: "Lectures, online series and events of interest to members, from across the ALS community." },
        { href: page("webinars"), title: "Member webinars", desc: `Recordings of ${webinars.length} member-only webinars, 2021 to 2026.` },
      ]} />
    </Page>
  );
}

export function Webinars() {
  const years = [...new Set(webinars.map((w) => w.date.slice(0, 4)))];
  return (
    <Page id="webinars">
      <Lede sub={<>Recordings open in a new tab. Webinars for people living with ALS are on <A href={communityWebinarsUrl}>neals.org</A>.</>}>
        Recordings of past NEALS member-only webinars.
      </Lede>
      <OnThisPage page="webinars" items={years.map((y) => ({ id: `w${y}`, label: y }))} />
      {years.map((y) => {
        const list = webinars.filter((w) => w.date.startsWith(y));
        return (
          <Section key={y} id={`w${y}`} title={y} meta={`${list.length} webinar${list.length > 1 ? "s" : ""}`}>
            {y === "2026" && <ViewingCode code={viewingCode2026} what="the 2026 webinars" />}
            <table className="n-table n-table-dated">
              <caption className="n-sr">{y} member webinars</caption>
              <thead><tr><th scope="col">Date</th><th scope="col">Webinar</th><th scope="col" className="n-hide-sm">Hosted on</th></tr></thead>
              <tbody>
                {list.map((w) => (
                  <tr key={w.date + w.title}>
                    <td className="n-date">{fmtDate(w.date, { month: "short", day: "numeric" })}</td>
                    <td>
                      <A href={w.url}>{w.title}</A>
                      {w.subtitle && <div className="n-small">{w.subtitle}</div>}
                      <Flag text={w.todo} />
                    </td>
                    <td className="n-muted n-hide-sm">{platform(w.url)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        );
      })}
    </Page>
  );
}

export function Lectures() {
  const c = email(lecturesContact);
  return (
    <Page id="lectures">
      <Lede sub="Lectures, online series and events of interest to NEALS members.">
        Opportunities from across the ALS community.
      </Lede>
      <Todo>The WildApricot page had no current listings. Each new listing becomes a row in the table below: date, title, host, and a link to register.</Todo>
      <table className="n-table n-table-dated">
        <thead><tr><th scope="col">Date</th><th scope="col">Opportunity</th><th scope="col" className="n-hide-sm">Format</th></tr></thead>
        <tbody>
          <tr><td className="n-date n-muted">—</td><td className="n-muted">No upcoming listings right now.</td><td className="n-hide-sm" /></tr>
        </tbody>
      </table>
      <Note title="Share an opportunity.">Members can submit upcoming lectures, series and events: <a href={c.href}>{isRedacted() ? "email NEALS" : c.label}</a>.</Note>
    </Page>
  );
}

/** Shows a Vimeo viewing password. Members-only pages; replaced with a placeholder in the public demo. */
export function ViewingCode({ code, what }: { code: string; what: string }) {
  return <Note title="Viewing code:"><span className="n-code">{isRedacted() ? "hidden in demo" : code}</span>. Enter it to watch {what}.</Note>;
}
