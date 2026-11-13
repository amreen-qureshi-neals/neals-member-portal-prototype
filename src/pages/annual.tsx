import { recordings, countVideos, totalSeconds } from "../content/recordings";
import { pastMeetings, upcoming, albums, albumsNote, olderAlbums, recordingNotes2026 } from "../content/meetings";
import { viewingCode2026 } from "../content/webinars";
import { ViewingCode } from "./learning";
import { Button, Fold, Grid, HubCard, JumpNav, Lede, Notice, Row, Rows, Section, TodoChip, VideoCard, fmtDur, Icon } from "../components/ui";
import { ext, page } from "../lib/links";

const kindIcon: Record<string, string> = { recordings: "video", abstracts: "doc", posters: "photo", agenda: "calendar", links: "external", partners: "people", extra: "star" };

export function AnnualMeetingHub() {
  const latest = recordings[0];
  return (
    <div className="neals">
      <Lede sub="Everything from the NEALS Annual Meeting in one place: what's coming up, session recordings, and materials from past years.">
        The NEALS Annual Meeting brings our network together every fall.
      </Lede>

      <div className="n-feature">
        <div className="n-feature-text">
          <span className="n-eyebrow">Save the date</span>
          <h2>{upcoming.title}</h2>
          <p className="n-feature-date"><Icon name="calendar" /> {upcoming.dates}</p>
          <Button href={upcoming.url} icon="external">Visit the meeting site</Button>
        </div>
      </div>

      <Grid size="md">
        <HubCard href={page("annualmeetingrecordings")} icon="video" title="Session recordings"
          text={`${countVideos(latest)} recordings from ${latest.year}, plus every session back to 2023.`}
          links={recordings.map((r) => ({ label: `${r.year} recordings`, href: page("annualmeetingrecordings", `y${r.year}`) }))} />
        <HubCard href={page("past-meetings")} icon="doc" title="Past meetings"
          text="Agendas, published abstracts and poster libraries from 2021 onward."
          links={pastMeetings.slice(0, 3).map((m) => ({ label: `${m.year} materials`, href: page("past-meetings", `m${m.year}`) }))} />
        <HubCard href={page("photos")} icon="photo" title="Photos" text="Photo albums from past Annual Meetings." />
      </Grid>
    </div>
  );
}

export function Recordings() {
  const [latest, ...older] = recordings;
  const yearBlock = (y: typeof latest) =>
    y.days.map((d) => (
      <div className="n-day" key={d.label}>
        <h3>{d.label}{d.note && <span className="n-day-note">{d.note}</span>}</h3>
        <Grid size="sm">
          {d.videos.map((v) => <VideoCard key={v.url} {...v} label={String(y.year)} />)}
        </Grid>
      </div>
    ));
  return (
    <div className="neals">
      <Lede sub="Select any session to watch it. Videos open in a new tab. Earlier years are collapsed below.">
        Missed a session, or want to revisit one? Every Annual Meeting recording, organized by year and day.
      </Lede>
      <JumpNav page="annualmeetingrecordings" items={recordings.map((r) => ({ id: `y${r.year}`, label: String(r.year) }))} />

      <Section id={`y${latest.year}`} title={String(latest.year)} meta={<>{countVideos(latest)} recordings · {fmtDur(totalSeconds(latest))} · {latest.dates}</>}>
        <ViewingCode code={viewingCode2026} what="recordings of 2026 member events" />
        <p className="n-small">{recordingNotes2026.certificates}</p>
        {yearBlock(latest)}
      </Section>

      <h3 className="n-overline">Previous years</h3>
      {older.map((y) => (
        <Fold key={y.year} id={`y${y.year}`} title={String(y.year)} meta={`${countVideos(y)} recordings · ${y.dates}${y.host === "dropbox" ? " · hosted on Dropbox" : ""}`}>
          {yearBlock(y)}
        </Fold>
      ))}
    </div>
  );
}

export function PastMeetings() {
  return (
    <div className="neals">
      <Lede sub="Recordings link to the recordings page. Abstracts, posters and agendas open in a new tab.">
        Looking for something from a past meeting? Materials are listed by year.
      </Lede>
      <JumpNav page="past-meetings" items={pastMeetings.map((m) => ({ id: `m${m.year}`, label: String(m.year) }))} />
      {pastMeetings.map((m, i) => (
        <Fold key={m.year} id={`m${m.year}`} title={`${m.year} Annual Meeting`} meta={`${m.resources.length} items`} open={i === 0}>
          <Rows>
            {m.resources.map((r) => (
              <Row key={r.label} icon={kindIcon[r.kind]} title={r.label}
                href={r.page ? page(r.page[0], r.page[1]) : r.url} note={r.todo} />
            ))}
          </Rows>
        </Fold>
      ))}
    </div>
  );
}

export function Photos() {
  return (
    <div className="neals">
      <Lede sub={<>Albums open in Dropbox in a new tab. Looking for session videos? See the <a href={page("annualmeetingrecordings")}>recordings</a>.</>}>
        Relive the Annual Meeting: photo albums from past years.
      </Lede>
      <Grid size="sm">
        {albums.map((a) => (
          <a key={a.year} className="n-album" href={ext(a.url ?? "#")} target="_blank" rel="noopener">
            <span className="n-album-cover">{a.cover && <img src={a.cover} alt="" loading="lazy" />}</span>
            <span className="n-album-label"><b>{a.year}</b> Annual Meeting <Icon name="external" className="n-icon n-icon-sm" /></span>
          </a>
        ))}
      </Grid>
      <h3 className="n-overline">Earlier albums</h3>
      <Grid size="sm">
        {olderAlbums.map((a) => (
          <a key={a.year} className="n-album n-album-plain" href={ext(a.url ?? "#")} target="_blank" rel="noopener">
            <span className="n-album-label"><b>{a.year}</b> Annual Meeting{a.note ? ` · ${a.note}` : ""} <Icon name="external" className="n-icon n-icon-sm" /></span>
          </a>
        ))}
      </Grid>
      <Notice>{albumsNote}</Notice>
      <TodoChip text="Covers are the existing YM thumbnails; consider moving albums off Dropbox" />
    </div>
  );
}
