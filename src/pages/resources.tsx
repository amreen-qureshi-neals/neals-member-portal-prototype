import { governance, governanceContact, governanceContactName, toolkits, newsletters, NEWSLETTER_TODO } from "../content/documents";
import { A, Flag, Index, Lede, Note, Page, Section, Todo, fmtDate } from "../components/ui";
import { email, page } from "../lib/links";

export function ResourcesHub() {
  return (
    <Page id="resources">
      <Lede sub="Governing documents, newsletters, and templates shared across the network.">NEALS documents and member resources.</Lede>
      <Index items={[
        { href: page("bylaws-policies"), title: "Bylaws, SOPs & policies", desc: "The bylaws, standard operating procedures and policies that govern how NEALS works." },
        { href: page("newsletters"), title: "Member newsletters", desc: "Past issues of the NEALS member newsletter, 2021 onward." },
        { href: page("toolkits"), title: "Templates & toolkits", desc: "Recruitment tools, social media templates and committee file libraries." },
      ]} />
    </Page>
  );
}

function DocTable({ docs, caption }: { docs: (typeof governance)[number]["docs"]; caption: string }) {
  return (
    <table className="n-table n-table-docs">
      <caption className="n-sr">{caption}</caption>
      <thead><tr><th scope="col">Document</th><th scope="col" className="n-hide-sm">Format</th><th scope="col">Updated</th></tr></thead>
      <tbody>
        {docs.map((d) => (
          <tr key={d.title}>
            <td><A href={d.url}>{d.title}</A>{d.description && <div className="n-small">{d.description}</div>}<Flag text={d.todo} /></td>
            <td className="n-muted n-hide-sm">{d.type}</td>
            <td className="n-muted n-nowrap">{d.updated}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Bylaws() {
  const c = email(governanceContact);
  return (
    <Page id="bylaws-policies">
      <Lede sub={<>Questions or suggestions? Contact {governanceContactName}, <a href={c.href}>{c.label}</a>.</>}>
        The documents that govern how NEALS works.
      </Lede>
      {governance.map((g) => (
        <Section key={g.id} id={g.id} title={g.title}>
          {g.docs.length ? <DocTable docs={g.docs} caption={g.title} /> : <Todo>{g.empty}</Todo>}
        </Section>
      ))}
    </Page>
  );
}

export function Newsletters() {
  const years = [...new Set(newsletters.map((n) => n.date.slice(0, 4)))];
  return (
    <Page id="newsletters">
      <Lede sub={<>Want new issues by email? <a href={page("SignUpForEmails")}>Join the mailing list</a>.</>}>Past issues of the NEALS member newsletter.</Lede>
      <Todo>{NEWSLETTER_TODO}. The old page had an empty 2024 heading: add any 2024–2026 issues.</Todo>
      <table className="n-table n-table-dated">
        <caption className="n-sr">Newsletter issues</caption>
        <thead><tr><th scope="col">Date</th><th scope="col">Issue</th></tr></thead>
        {years.map((y) => (
          <tbody key={y}>
            <tr className="n-group"><th colSpan={2} scope="colgroup">{y}</th></tr>
            {newsletters.filter((n) => n.date.startsWith(y)).map((n) => (
              <tr key={n.date}><td className="n-date">{fmtDate(n.date, { month: "short", day: "numeric" })}</td><td><A href={n.url}>{`${n.title} ${y}`}</A></td></tr>
            ))}
          </tbody>
        ))}
      </table>
    </Page>
  );
}

export function Toolkits() {
  return (
    <Page id="toolkits">
      <Lede sub="These libraries are shared through YourMembership groups. You may need to belong to the group to open them.">
        Templates, tools and files shared across NEALS committees.
      </Lede>
      <Todo>These group file libraries already exist in YM. Link each one to its group page and confirm which committee owns it.</Todo>
      <table className="n-table">
        <thead><tr><th scope="col">Library</th><th scope="col">From</th></tr></thead>
        <tbody>{toolkits.map((t) => <tr key={t.title}><td>{t.title}</td><td className="n-muted">{t.description}</td></tr>)}</tbody>
      </table>
      <Note>Committee-specific resources are also listed on each <a href={page("committees")}>committee page</a>.</Note>
    </Page>
  );
}
