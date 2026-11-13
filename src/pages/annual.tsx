import { recordings, countVideos, totalSeconds, type MeetingYear } from "../content/recordings";
import { pastMeetings, upcoming, albums, albumsNote, olderAlbums, recordingNotes2026, type Resource } from "../content/meetings";
import { viewingCode2026 } from "../content/webinars";
import { A, Flag, Index, Lede, Note, OnThisPage, Page, Section, fmtDur } from "../components/ui";
import { ViewingCode } from "./learning";
import { page } from "../lib/links";

export function AnnualMeetingHub() {
  const latest = recordings[0];
  return (
    <Page id="annualmeeting">
      <Lede sub="The NEALS Annual Meeting brings the network together every fall to share research progress, train site staff and plan what comes next.">
        Everything from the Annual Meeting, past and upcoming.
      </Lede>

      <Section title={`${upcoming.year} Annual Meeting`}>
        <dl className="n-facts">
          <dt>Dates</dt><dd>{upcoming.dates}</dd>
          <dt>Details & registration</dt><dd><A href={upcoming.url}>meeting.neals.org</A></dd>
        </dl>
      </Section>

      <Section title="In this section">
        <Index items={[
          { href: page("annualmeetingrecordings"), title: "Recordings", desc: `Session videos from 2023 to ${latest.year}, by year and day. ${countVideos(latest)} sessions from ${latest.year}.` },
          { href: page("past-meetings"), title: "Past meetings", desc: "Agendas, published abstracts and poster libraries for every meeting since 2021." },
          { href: page("photos"), title: "Photos", desc: "Photo albums from past meetings, 2016 onward. The 2026 album is coming soon." },
        ]} />
      </Section>
    </Page>
  );
}

function YearTable({ y }: { y: MeetingYear }) {
  return (
    <table className="n-table n-table-rec">
      <caption className="n-sr">{y.year} recordings</caption>
      <thead><tr><th scope="col">Session</th><th scope="col" className="n-num">Length</th></tr></thead>
      {y.days.map((d) => (
        <tbody key={d.label}>
          <tr className="n-group"><th colSpan={2} scope="colgroup">{d.label}{d.note && <span className="n-group-note"> · {d.note}</span>}</th></tr>
          {d.videos.map((v) => (
            <tr key={v.url}>
              <td><A href={v.url}>{v.title}</A></td>
              <td className="n-num n-muted">{fmtDur(v.dur)}</td>
            </tr>
          ))}
        </tbody>
      ))}
    </table>
  );
}

export function Recordings() {
  const [latest] = recordings;
  return (
    <Page id="annualmeetingrecordings">
      <Lede sub="Select a session to watch it on Vimeo. Recordings open in a new tab.">
        Every Annual Meeting session recording, by year and day.
      </Lede>
      <OnThisPage page="annualmeetingrecordings" items={recordings.map((r) => ({ id: `y${r.year}`, label: String(r.year) }))} />

      {recordings.map((y) => (
        <Section key={y.year} id={`y${y.year}`} title={`${y.year} Annual Meeting`}
          meta={`${y.dates} · ${countVideos(y)} recordings${totalSeconds(y) && y === latest ? ` · ${fmtDur(totalSeconds(y))}` : ""}`}>
          {y === latest && (
            <>
              <ViewingCode code={viewingCode2026} what="recordings of 2026 member events" />
              <p className="n-small">{recordingNotes2026.certificates}</p>
            </>
          )}
          {y.host === "dropbox" && <p className="n-small">2023 recordings are stored on Dropbox.</p>}
          <YearTable y={y} />
        </Section>
      ))}
    </Page>
  );
}

const COLS: { kind: Resource["kind"][]; label: string }[] = [
  { kind: ["recordings"], label: "Recordings" },
  { kind: ["agenda"], label: "Agenda" },
  { kind: ["abstracts"], label: "Abstracts" },
  { kind: ["posters"], label: "Posters" },
  { kind: ["photos"], label: "Photos" },
  { kind: ["links", "partners", "extra"], label: "Other" },
];

/** Photos column comes from the albums list, so it stays in sync with the Photos page. */
const photoCell = (year: number): Resource[] => {
  const a = albums.find((x) => x.year === String(year));
  if (!a) return [];
  return [a.url ? { kind: "photos", label: "Album", page: ["photos"] } : { kind: "photos", label: a.note ?? "Coming soon" }];
};

export function PastMeetings() {
  const shortLabel = (r: Resource) =>
    r.kind === "abstracts" ? "Muscle & Nerve" : r.kind === "recordings" ? "Watch" : r.kind === "agenda" ? "PDF" : r.kind === "posters" ? "Poster library" : r.label;
  return (
    <Page id="past-meetings">
      <Lede sub="Each row is one meeting. Abstracts were published in Muscle & Nerve; agendas and posters open in a new tab.">
        Materials from every Annual Meeting since 2021.
      </Lede>
      <table className="n-table n-table-matrix">
        <colgroup><col className="n-col-year" /><col /><col /><col /><col /><col /><col className="n-col-other" /></colgroup>
        <caption className="n-sr">Past Annual Meeting materials by year</caption>
        <thead><tr><th scope="col">Meeting</th>{COLS.map((c) => <th scope="col" key={c.label}>{c.label}</th>)}</tr></thead>
        <tbody>
          {pastMeetings.map((m) => (
            <tr key={m.year} id={`m${m.year}`}>
              <th scope="row">{m.year}</th>
              {COLS.map((c) => {
                const items = c.label === "Photos" ? photoCell(m.year) : m.resources.filter((r) => c.kind.includes(r.kind));
                return (
                  <td key={c.label} data-label={c.label}>
                    <div className="n-cell">
                      {items.length === 0 ? <span className="n-muted">—</span> : items.map((r) => (
                        <div key={r.label}>
                          {c.label === "Photos" && !r.page ? <span className="n-muted">{r.label}</span> : <A href={r.page ? page(r.page[0], r.page[1]) : r.url}>{c.label === "Other" || c.label === "Photos" ? r.label : shortLabel(r)}</A>}
                          <Flag text={r.todo} />
                        </div>
                      ))}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
}

export function Photos() {
  const all = [...albums, ...olderAlbums];
  return (
    <Page id="photos">
      <Lede sub="Albums are hosted on Dropbox and open in a new tab.">Photo albums from past Annual Meetings.</Lede>
      <ul className="n-albums">
        {all.map((a) => (
          <li key={a.year}>
            {a.url ? (
              <A href={a.url}>
                {a.cover ? <img src={a.cover} alt="" loading="lazy" /> : <span className="n-albums-blank" aria-hidden="true" />}
                <span>{a.year} Annual Meeting</span>
              </A>
            ) : (
              <div className="n-albums-soon">
                <span className="n-albums-blank" aria-hidden="true" />
                <span>{a.year} Annual Meeting</span>
                <span className="n-small">{a.note}</span>
              </div>
            )}
            {a.url && a.note && <span className="n-small">{a.note}</span>}
          </li>
        ))}
      </ul>
      <Note>{albumsNote} Looking for session videos? See <a href={page("annualmeetingrecordings")}>recordings</a>.</Note>
    </Page>
  );
}
