import { recordings, countVideos } from "../content/recordings";
import { upcoming } from "../content/meetings";
import { webinars } from "../content/webinars";
import { committees } from "../content/committees";
import { Button, Grid, HubCard, Icon, Section, VideoCard } from "../components/ui";
import { page } from "../lib/links";

/** Homepage: goes into the YM "Homepage - Main (Top)" content area. */
export function Home() {
  const latest = recordings[0];
  const picks = latest.days.flatMap((d) => d.videos).filter((v) => v.thumb).slice(0, 4);
  return (
    <div className="neals">
      <div className="n-hero">
        <div>
          <span className="n-eyebrow">NEALS Member Portal</span>
          <h2>Welcome to the NEALS member portal</h2>
          <p>Recordings, documents, committees and events for the Network of Excellence for ALS member community.</p>
        </div>
        <div className="n-hero-card">
          <span className="n-eyebrow">Next up</span>
          <b>{upcoming.title}</b>
          <span className="n-hero-date"><Icon name="calendar" /> {upcoming.dates}</span>
          <Button href={upcoming.url} icon="external">Meeting details</Button>
        </div>
      </div>

      <Grid size="md">
        <HubCard href={page("annualmeeting")} icon="star" title="Annual Meeting" text="Upcoming meeting, session recordings, past materials and photos."
          links={[{ label: "Recordings", href: page("annualmeetingrecordings") }, { label: "Past meetings", href: page("past-meetings") }, { label: "Photos", href: page("photos") }]} />
        <HubCard href={page("learning")} icon="video" title="Learning & Events" text={`Events calendar, lectures and ${webinars.length} member webinars.`}
          links={[{ label: "Events calendar", href: page("calendar") }, { label: "Lectures & opportunities", href: page("lectures") }, { label: "Member webinars", href: page("webinars") }]} />
        <HubCard href={page("committees")} icon="people" title="Committees" text={`${committees.length} committees working across ALS research and care.`} />
        <HubCard href={page("resources")} icon="folder" title="Resources" text="Bylaws, SOPs & policies, newsletters, templates and toolkits."
          links={[{ label: "Bylaws, SOPs & policies", href: page("bylaws-policies") }, { label: "Newsletters", href: page("newsletters") }]} />
        <HubCard href={page("directory")} icon="search" title="Member directory" text="Find colleagues across NEALS member sites." />
      </Grid>

      <Section title={`New: ${latest.year} Annual Meeting recordings`} meta={`${countVideos(latest)} sessions`}
        action={<a className="n-link-arrow" href={page("annualmeetingrecordings")}>All recordings <Icon name="arrow" className="n-icon n-icon-sm" /></a>}>
        <Grid size="sm">
          {picks.map((v) => <VideoCard key={v.url} {...v} label={String(latest.year)} />)}
        </Grid>
      </Section>
    </div>
  );
}
