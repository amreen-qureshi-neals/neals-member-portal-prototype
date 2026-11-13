import { committees, committeesIntro, committeePageId, type Committee } from "../content/committees";
import { A, Flag, Lede, Page, Section, Todo } from "../components/ui";
import { email, page } from "../lib/links";

const chairNames = (c: Committee) => c.chairs.map((p) => p.name.replace(/,.*$/, "")).join(", ");

export function CommitteesHub() {
  return (
    <Page id="committees">
      <Lede sub={<>{committeesIntro.sub} Co-chairs are also listed on <A href={committeesIntro.structureUrl}>neals.org</A>.</>}>
        {committeesIntro.lede}
      </Lede>

      <table className="n-table n-table-committees">
        <caption className="n-sr">NEALS committees</caption>
        <thead><tr><th scope="col">Committee</th><th scope="col">Focus</th><th scope="col" className="n-hide-sm">Chairs</th></tr></thead>
        <tbody>
          {committees.map((c) => (
            <tr key={c.slug}>
              <th scope="row"><a href={page(committeePageId(c))}>{c.name}</a></th>
              <td>{c.summary}</td>
              <td className="n-muted n-hide-sm">{chairNames(c)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Section title="Start a new committee">
        {committeesIntro.start.map((p) => <p key={p}>{p}</p>)}
      </Section>
      <Section title="How committees work">
        <p className="n-small">From the <a href={page("bylaws-policies")}>NEALS Bylaws</a>:</p>
        <ul className="n-bullets">{committeesIntro.bylaws.map((p) => <li key={p}>{p}</li>)}</ul>
      </Section>
    </Page>
  );
}

export function CommitteePage({ c }: { c: Committee }) {
  const id = committeePageId(c);
  const facts = (
    <aside className="n-facts-box" aria-label="Committee contacts">
      <h2 className="n-h3">{c.chairs.length > 1 ? "Chairs" : "Chair"}</h2>
      <ul>
        {c.chairs.map((p) => {
          const e = p.email ? email(p.email) : null;
          return <li key={p.name}><strong>{p.name}</strong>{e && <A href={e.href}>{e.label}</A>}<Flag text={p.todo} /></li>;
        })}
      </ul>
      <p className="n-small">To join, contact a chair. Membership normally lasts three years.</p>
    </aside>
  );
  return (
    <Page id={id}>
      <Lede>{c.summary}</Lede>
      {c.todo && <Todo>{c.todo}</Todo>}
      <div className="n-twocol">
        <div>
          {c.about.map((p, i) => <p key={i}>{p}</p>)}
          {c.mission && <p className="n-mission"><strong>Mission.</strong> {c.mission}</p>}
          {c.goals && (
            <Section title={c.goalsTitle ?? "Goals"}>
              <ol className="n-numbered">{c.goals.map((g) => <li key={g}>{g}</li>)}</ol>
            </Section>
          )}
          {c.resources && (
            <Section title={c.resourcesTitle ?? "Resources"}>
              <ul className="n-links">
                {c.resources.map((r) => (
                  <li key={r.label}>
                    <A href={r.url}>{r.label}</A>{r.note && <span className="n-muted"> · {r.note}</span>}
                    <Flag text={r.todo} />
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>
        {facts}
      </div>
    </Page>
  );
}
