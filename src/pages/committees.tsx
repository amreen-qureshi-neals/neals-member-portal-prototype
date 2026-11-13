import { committees, committeePageId, type Committee } from "../content/committees";
import { Grid, Lede, Row, Rows, Section, Todo } from "../components/ui";
import { page } from "../lib/links";

export function CommitteesHub() {
  return (
    <div className="neals">
      <Lede sub="Each committee page explains what the committee works on, who leads it, when it meets, and how to get involved.">
        NEALS committees bring together members with shared expertise to advance ALS research and care.
      </Lede>
      <Grid size="sm">
        {committees.map((c) => (
          <a key={c.slug} className="n-committee" href={page(committeePageId(c))}>
            <span className="n-committee-initial" aria-hidden="true">{c.name.replace(/[^A-Za-z]/g, "").slice(0, 2)}</span>
            <span className="n-committee-name">{c.name}</span>
            <span className="n-committee-sum">{c.summary ?? "Committee overview, leadership and resources."}</span>
          </a>
        ))}
      </Grid>
    </div>
  );
}

export function CommitteePage({ c }: { c: Committee }) {
  return (
    <div className="neals">
      <Lede sub={<a href={page("committees")}>← All committees</a>}>
        {c.summary ?? `The ${c.name} Committee`}
      </Lede>

      <div className="n-split">
        <div>
          <Section title="About the committee">
            {c.about?.length ? c.about.map((p, i) => <p key={i}>{p}</p>) : <Todo>Copy the committee description from its WildApricot page.</Todo>}
          </Section>
          <Section title="Who should join">
            {c.whoShouldJoin ? <p>{c.whoShouldJoin}</p> : <Todo>Who the committee is for (e.g. role, specialty).</Todo>}
          </Section>
          <Section title="Resources">
            {c.resources?.length ? (
              <Rows>{c.resources.map((r) => <Row key={r.label} icon="folder" title={r.label} href={r.page ? page(r.page) : r.url} note={r.todo} />)}</Rows>
            ) : <Todo>Documents, recordings or templates the committee shares.</Todo>}
          </Section>
        </div>
        <aside className="n-aside">
          <h3>Leadership</h3>
          {c.chairs?.length ? (
            <ul className="n-people">{c.chairs.map((p) => <li key={p.name}><b>{p.name}</b>{p.role && <span>{p.role}</span>}{p.site && <span>{p.site}</span>}</li>)}</ul>
          ) : <Todo>Chair / co-chair names and sites.</Todo>}
          <h3>Meetings</h3>
          {c.meetings ? <p>{c.meetings}</p> : <Todo>How often the committee meets.</Todo>}
          <h3>Get involved</h3>
          {c.contact ? <p>{c.contact}</p> : <Todo>Who to contact to join.</Todo>}
        </aside>
      </div>
    </div>
  );
}
