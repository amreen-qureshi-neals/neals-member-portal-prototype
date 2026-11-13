import { committees, committeesIntro, committeePageId, type Committee } from "../content/committees";
import { Grid, Lede, Notice, Row, Rows, Section, TodoChip, Todo } from "../components/ui";
import { email, page } from "../lib/links";

const ABBR: Record<string, string> = {
  "big-data": "BD", biorepository: "BR", bulbar: "BU", "clinical-research-nurse": "CN", "genetic-als-ftd": "GA",
  imaging: "IM", nutrition: "NU", palliative: "PA", "physical-therapist": "PT", "recruitment-retention": "RR",
  "research-coordinator": "RC", "technology-in-als": "TA", umnd: "UM", ventilation: "VE", "veterans-affairs": "VA",
};

export function CommitteesHub() {
  return (
    <div className="neals">
      <Lede sub={<>{committeesIntro.sub} See <a href={committeesIntro.structureUrl} target="_blank" rel="noopener">committee co-chairs on neals.org</a>.</>}>
        {committeesIntro.lede}
      </Lede>
      <Grid size="sm">
        {committees.map((c) => (
          <a key={c.slug} className="n-committee" href={page(committeePageId(c))}>
            <span className="n-committee-initial" aria-hidden="true">{ABBR[c.slug] ?? c.name.slice(0, 2)}</span>
            <span className="n-committee-name">{c.name}</span>
            <span className="n-committee-sum">{c.summary}</span>
          </a>
        ))}
      </Grid>

      <div className="n-split">
        <Section title="Start a new committee">
          {committeesIntro.start.map((p) => <p key={p}>{p}</p>)}
        </Section>
        <aside className="n-aside">
          <h3>How committees work</h3>
          <p className="n-small">From the NEALS Bylaws</p>
          {committeesIntro.bylaws.map((p) => <p key={p} className="n-small">{p}</p>)}
          <p className="n-small"><a href={page("bylaws-policies")}>Read the bylaws →</a></p>
        </aside>
      </div>
    </div>
  );
}

export function CommitteePage({ c }: { c: Committee }) {
  return (
    <div className="neals">
      <Lede sub={<a href={page("committees")}>← All committees</a>}>{c.summary}</Lede>
      {c.todo && <Todo>{c.todo}</Todo>}

      <div className="n-split">
        <div>
          {(c.about.length > 0 || c.mission) && (
            <Section title="About the committee">
              {c.about.map((p, i) => <p key={i}>{p}</p>)}
              {c.mission && <blockquote className="n-quote"><b>Mission</b>{c.mission}</blockquote>}
            </Section>
          )}
          {c.goals && (
            <Section title={c.goalsTitle ?? "Goals"}>
              <ol className="n-goals">{c.goals.map((g) => <li key={g}>{g}</li>)}</ol>
            </Section>
          )}
          {c.resources && (
            <Section title={c.resourcesTitle ?? "Resources"}>
              <Rows>
                {c.resources.map((r) => (
                  <Row key={r.label} icon={r.note === "Video" ? "video" : r.url ? "doc" : "folder"} title={r.label} href={r.url}
                    meta={r.note ? <span className="n-row-host">{r.note}</span> : undefined} note={r.todo} />
                ))}
              </Rows>
            </Section>
          )}
        </div>
        <aside className="n-aside">
          <h3>{c.chairs.length > 1 ? "Chairs" : "Chair"}</h3>
          <ul className="n-people">
            {c.chairs.map((p) => {
              const e = p.email ? email(p.email) : null;
              return (
                <li key={p.name}>
                  <b>{p.name}</b>
                  {e && <a href={e.href}>{e.label}</a>}
                  <TodoChip text={p.todo} />
                </li>
              );
            })}
          </ul>
          <h3>Get involved</h3>
          <p className="n-small">Interested in joining? Contact a committee chair.</p>
        </aside>
      </div>
      <Notice>Committee membership normally lasts three years, with no more than one member per affiliated institution. <a href={page("committees")}>How committees work →</a></Notice>
    </div>
  );
}
