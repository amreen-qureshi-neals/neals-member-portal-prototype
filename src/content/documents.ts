export type Doc = { title: string; description?: string; url?: string; type?: "PDF" | "DOCX" | "Link"; updated?: string; todo?: string };
export type DocGroup = { id: string; title: string; intro?: string; docs: Doc[]; empty?: string };

export const governance: DocGroup[] = [
  {
    id: "bylaws",
    title: "Bylaws",
    docs: [
      { title: "NEALS Bylaws", description: "The bylaws of the Network of Excellence for ALS (NEALS).", url: "#", type: "PDF", updated: "January 2026" },
    ],
  },
  {
    id: "sops",
    title: "Standard Operating Procedures (SOPs)",
    docs: [
      { title: "Educational Webinar SOP", description: "Version 1.0", url: "#", type: "PDF", updated: "January 2018", todo: "Hosted on WildApricot: download and re-upload to YM" },
    ],
  },
  {
    id: "policies",
    title: "Policies",
    docs: [
      { title: "Publication Guidelines", url: "#", type: "PDF", updated: "January 2024" },
    ],
  },
];

export const governanceContact = "name@example.org";
export const governanceContactName = "NEALS staff";

/** Existing YM group file libraries (from the YM custom pages list). */
export const toolkits: Doc[] = [
  { title: "Site Level Recruitment Tools", description: "Recruitment & Retention library", todo: "YM group library" },
  { title: "Social Media Templates", description: "Recruitment & Retention library", todo: "YM group library" },
  { title: "RCC Templates", description: "Research Coordinator Committee", todo: "YM group library" },
  { title: "Meeting Materials", description: "File library", todo: "YM group library" },
  { title: "Committee Overview", description: "File library", todo: "YM group library" },
];

/** Member newsletter archive (WildApricot email templates: they disappear with WildApricot). */
export type Issue = { date: string; title: string; url: string };
const waNews = (path: string) => `#`;
export const NEWSLETTER_TODO = "Newsletters are WildApricot email pages: save each one as a PDF and upload it to YM before WildApricot closes";
export const newsletters: Issue[] = [
  { date: "2023-12-19", title: "Winter Newsletter", url: waNews("NEALS%20Member%20Newsletter") },
  { date: "2023-10-19", title: "Fall Newsletter", url: waNews("NEALS%20Member%20Newsletter%20Fall%2023") },
  { date: "2023-06-30", title: "Summer Newsletter", url: waNews("NEALS%20Member%20Newsletter-Summer%2023") },
  { date: "2022-07-27", title: "Summer Newsletter", url: waNews("NEALS%20Member%20Newsletter-Summer%2022") },
  { date: "2022-01-24", title: "Winter Newsletter", url: waNews("NEALS%20Member%20Newsletter-Winter%202022") },
  { date: "2021-07-29", title: "Summer Newsletter", url: waNews("NEALS%20Member%20Newsletter-Summer%2021") },
];

export const lecturesContact = "name@example.org";
