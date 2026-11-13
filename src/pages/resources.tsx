import { governance, governanceContact, governanceContactName, toolkits, newsletters, NEWSLETTER_TODO } from "../content/documents";
import { Grid, HubCard, JumpNav, Lede, Notice, Row, Rows, Section, Todo, fmtDate } from "../components/ui";
import { email, page } from "../lib/links";

export function ResourcesHub() {
  return (
    <div className="neals">
      <Lede sub="Governing documents, member newsletters, and templates and toolkits shared across the network.">
        Find NEALS documents and member resources.
      </Lede>
      <Grid size="md">
        <HubCard href={page("bylaws-policies")} icon="doc" title="Bylaws, SOPs & policies" text="The documents that govern how NEALS works." />
        <HubCard href={page("newsletters")} icon="folder" title="Member newsletters" text="Past issues of the NEALS member newsletter." />
        <HubCard href={page("toolkits")} icon="folder" title="Templates & toolkits" text="Recruitment tools, social media templates and committee files." />
      </Grid>
    </div>
  );
}

export function Bylaws() {
  const c = email(governanceContact);
  return (
    <div className="neals">
      <Lede sub={<>Questions, or suggestions for helpful content? Contact {governanceContactName}, <a href={c.href}>{c.label}</a>.</>}>
        Our values underscore our commitment to the integrity of ALS clinical research and to the ALS community.
      </Lede>
      <JumpNav page="bylaws-policies" items={governance.map((g) => ({ id: g.id, label: g.title.replace(/ \(.*\)/, "") }))} />
      {governance.map((g) => (
        <Section key={g.id} id={g.id} title={g.title} meta={g.docs.length ? `${g.docs.length} document${g.docs.length > 1 ? "s" : ""}` : undefined}>
          {g.docs.length ? (
            <Rows>
              {g.docs.map((d) => (
                <Row key={d.title} icon="doc" title={d.title} sub={d.description} href={d.url}
                  meta={<>{d.type && <span className="n-row-host">{d.type}</span>}{d.updated && <span>Updated {d.updated}</span>}</>} note={d.todo} />
              ))}
            </Rows>
          ) : (
            <>
              <Todo>{g.empty}</Todo>
            </>
          )}
        </Section>
      ))}
    </div>
  );
}

export function Newsletters() {
  return (
    <div className="neals">
      <Lede sub="Browse past issues for key moments and updates from across the network, newest first.">
        Catch up on past issues of the NEALS member newsletter.
      </Lede>
      <Todo>{NEWSLETTER_TODO}. The old page had an empty 2024 heading: add any 2024–2026 issues.</Todo>
      {[...new Set(newsletters.map((n) => n.date.slice(0, 4)))].map((y) => (
        <Section key={y} title={y} meta={`${newsletters.filter((n) => n.date.startsWith(y)).length} issues`}>
          <Rows>
            {newsletters.filter((n) => n.date.startsWith(y)).map((n) => (
              <Row key={n.date} icon="doc" title={`${n.title} ${y}`} href={n.url} meta={<span>{fmtDate(n.date)}</span>} />
            ))}
          </Rows>
        </Section>
      ))}
      <Notice>Want the newsletter by email? <a href={page("SignUpForEmails")}>Join the mailing list</a>.</Notice>
    </div>
  );
}

export function Toolkits() {
  return (
    <div className="neals">
      <Lede sub="These libraries are shared through YM groups. You may need to be a member of the group to open them.">
        Templates, tools and files shared across NEALS committees.
      </Lede>
      <Todo>These are the group file libraries that already exist in YM. Link each one to its group page and confirm which committee owns it.</Todo>
      <Rows>
        {toolkits.map((t) => <Row key={t.title} icon="folder" title={t.title} sub={t.description} />)}
      </Rows>
    </div>
  );
}
