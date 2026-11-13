import { webinars, communityWebinarsUrl, platform, viewingCode2026 } from "../content/webinars";
import { lecturesContact } from "../content/documents";
import { Fold, Grid, HubCard, JumpNav, Lede, Notice, Row, Rows, Todo, fmtDate } from "../components/ui";
import { email, page, isRedacted } from "../lib/links";

export function LearningHub() {
  return (
    <div className="neals">
      <Lede sub="Upcoming events, lectures and opportunities, and the library of past member-only webinars.">
        Keep learning with the NEALS network.
      </Lede>
      <Grid size="md">
        <HubCard href={page("calendar")} icon="calendar" title="Events calendar" text="Upcoming NEALS events, workshops and deadlines." />
        <HubCard href={page("lectures")} icon="star" title="Lectures & opportunities" text="Upcoming lectures, training and opportunities for members." />
        <HubCard href={page("webinars")} icon="video" title="Member webinars" text={`${webinars.length} past member-only webinars, from 2021 onward.`} />
      </Grid>
    </div>
  );
}

export function Webinars() {
  const years = [...new Set(webinars.map((w) => w.date.slice(0, 4)))];
  return (
    <div className="neals">
      <Lede sub={<>These webinars are for NEALS members. Looking for webinars for people living with ALS? Visit <a href={communityWebinarsUrl} target="_blank" rel="noopener">Community Education Webinars on neals.org</a>.</>}>
        Catch up on past NEALS member webinars.
      </Lede>
      <JumpNav page="webinars" items={years.map((y) => ({ id: `w${y}`, label: y }))} />
      {years.map((y, i) => {
        const list = webinars.filter((w) => w.date.startsWith(y));
        return (
          <Fold key={y} id={`w${y}`} title={`${y} webinars`} meta={`${list.length} recordings`} open={i === 0}>
            {y === "2026" && <ViewingCode code={viewingCode2026} what="the 2026 webinars" />}
            <Rows>
              {list.map((w) => (
                <Row key={w.date + w.title} icon="video" href={w.url} title={w.title} sub={w.subtitle}
                  meta={<><span>{fmtDate(w.date)}</span><span className="n-row-host">{platform(w.url)}</span></>} note={w.todo} />
              ))}
            </Rows>
          </Fold>
        );
      })}
    </div>
  );
}

export function Lectures() {
  const c = email(lecturesContact);
  return (
    <div className="neals">
      <Lede sub="Lectures, online series and events of interest to NEALS members.">
        Open opportunities from across the ALS community.
      </Lede>
      <Todo>The WildApricot page had no current listings. Each new listing becomes a row like the example below: date, title, host, and a link to register.</Todo>
      <Rows>
        <Row icon="calendar" title="Example: Lecture title" sub="Speaker name, institution" meta={<span>Date · Virtual</span>} />
      </Rows>
      <Notice title="Share an opportunity">NEALS members are invited to submit upcoming lectures, series and events. <a href={c.href}>Send the details by email</a>{!isRedacted() && <> ({c.label})</>}.</Notice>
    </div>
  );
}

/** Shows a Vimeo viewing password. Members-only pages; replaced with a placeholder in the public demo. */
export function ViewingCode({ code, what }: { code: string; what: string }) {
  return <Notice title="Viewing code">Use the code <span className="n-code">{isRedacted() ? "••••••••" : code}</span> to watch {what}.</Notice>;
}
