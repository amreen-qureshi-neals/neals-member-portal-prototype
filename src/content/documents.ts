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
    docs: [],
    empty: "SOP documents are listed on the WildApricot page but haven't been moved to YourMembership yet.",
  },
  {
    id: "policies",
    title: "Policies",
    docs: [
      { title: "Publication Guidelines", url: "#", type: "PDF", updated: "January 2024" },
    ],
  },
];

export const governanceContact = "staff@neals.invalid";
export const governanceContactName = "NEALS staff";

/** Existing YM group file libraries (from the YM custom pages list). */
export const toolkits: Doc[] = [
  { title: "Site Level Recruitment Tools", description: "Recruitment & Retention library", todo: "YM group library" },
  { title: "Social Media Templates", description: "Recruitment & Retention library", todo: "YM group library" },
  { title: "RCC Templates", description: "Research Coordinator Committee", todo: "YM group library" },
  { title: "Meeting Materials", description: "File library", todo: "YM group library" },
  { title: "Committee Overview", description: "File library", todo: "YM group library" },
];
