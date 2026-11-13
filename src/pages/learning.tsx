import { webinars, communityWebinarsUrl, platform } from "../content/webinars";
import { Fold, Grid, HubCard, JumpNav, Lede, Notice, Row, Rows, Todo, fmtDate } from "../components/ui";
import { page } from "../lib/links";

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
  return (
    <div className="neals">
      <Lede sub="Each listing shows the date, the speaker or host, and how to register or apply.">
        Upcoming lectures, training and opportunities for NEALS members.
      </Lede>
      <Todo>Copy the current listings from the WildApricot page “Upcoming Lectures & Opportunities”. Each one becomes a row like the example below.</Todo>
      <Rows>
        <Row icon="calendar" title="Example: Lecture title" sub="Speaker name, institution" meta={<span>Date · Virtual</span>} />
      </Rows>
      <Notice>Have an opportunity to share with the network? Contact NEALS to have it listed here.</Notice>
    </div>
  );
}
