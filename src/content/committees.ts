/**
 * Committee names come from the WildApricot page tree. Descriptions, chairs and meeting
 * details are still to be copied from each WildApricot committee page. Until then the
 * template shows a "content needed" notice instead of invented text.
 */
export type Committee = {
  slug: string;
  name: string;
  summary?: string;
  about?: string[];
  chairs?: { name: string; role?: string; site?: string }[];
  whoShouldJoin?: string;
  meetings?: string;
  resources?: { label: string; url?: string; page?: string; todo?: string }[];
  contact?: string;
};

export const committees: Committee[] = [
  { slug: "big-data", name: "Big Data", resources: [{ label: "Big Data Committee meeting materials", todo: "WildApricot sub-page: copy content" }] },
  { slug: "biorepository", name: "Biorepository" },
  { slug: "bulbar", name: "Bulbar" },
  { slug: "clinical-research-nurse", name: "Clinical Research Nurse" },
  { slug: "genetic-als-ftd", name: "Genetic ALS, FTD, and Related Disorders" },
  { slug: "imaging", name: "Imaging" },
  { slug: "nutrition", name: "Nutrition", resources: [{ label: "Nutrition Committee Webinars (YM group library)", todo: "Existing YM group page: link once committees are set up" }] },
  { slug: "palliative", name: "Palliative" },
  { slug: "physical-therapist", name: "Physical Therapist", resources: [{ label: "PT/OT Committee Booklet", todo: "WildApricot sub-page: copy content / upload PDF" }] },
  { slug: "recruitment-retention", name: "Recruitment & Retention", resources: [
      { label: "Site Level Recruitment Tools (RRE library)", todo: "Existing YM group library" },
      { label: "Social Media Templates (RRE library)", todo: "Existing YM group library" },
      { label: "Meeting Minutes (RRE library)", todo: "Existing YM group library" },
    ] },
  { slug: "research-coordinator", name: "Research Coordinator", resources: [{ label: "RCC Templates", todo: "Existing YM group library: confirm it belongs to this committee" }] },
  { slug: "technology-in-als", name: "Technology in ALS" },
  { slug: "umnd", name: "UMND" },
  { slug: "ventilation", name: "Ventilation" },
  { slug: "veterans-affairs", name: "Veteran's Affairs" },
];

export const committeePageId = (c: Committee) => `committee-${c.slug}`;
