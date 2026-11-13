export type Webinar = {
  date: string; // ISO
  title: string;
  subtitle?: string;
  url: string;
  /** migration note shown only in the prototype */
  todo?: string;
};

const gtw = (id: string) => `#`;
const DUP = "Same recording link as another webinar: confirm the right video";

/** Vimeo password for member-only 2026 videos (members-only page; stripped from the public demo). */
/** secret(): marks a value the public demo must never contain (stripped at build / copy time). */
const secret = (v: string) => v;
export const viewingCode2026 = secret("");

export const webinars: Webinar[] = [
  { date: "2026-09-01", title: "Voice Back: Innovation in ALS Communication", subtitle: "Technology in ALS Committee", url: "#" },
  { date: "2026-08-17", title: "Advanced Secretion Management", subtitle: "Palliative Care Committee", url: "#" },

  { date: "2024-07-26", title: "Nutrition Focused Physical Exam for the Patient with ALS", url: "#" },
  { date: "2024-06-07", title: "Palliative Care Webinar on ALS-Specific Healthcare Directives", url: "#" },
  { date: "2024-04-16", title: "NEALS Member Update at the AAN", url: "#" },

  { date: "2023-08-09", title: "My ALS Journey", subtitle: "Thoughts, reflections, and unsolicited advice for fellow clinicians and researchers", url: "#" },
  { date: "2023-05-18", title: "Site Considerations for Tofersen", subtitle: "A report from the NEALS Tofersen Implementation Working Group", url: "#" },
  { date: "2023-04-25", title: "NEALS Member Update at the AAN", url: "#" },
  { date: "2023-03-21", title: "Nutrition Support Reimbursement", url: gtw("") },

  { date: "2022-10-20", title: "ALS Himalaya Trial", subtitle: "A global, double-blind, placebo-controlled Phase 2 study of SAR443820, a RIPK1 inhibitor, in adults with ALS", url: gtw(""), todo: DUP },
  { date: "2022-09-30", title: "AMX0035: What's Next for Our Clinics?", url: gtw(""), todo: DUP },
  { date: "2022-04-22", title: "Investigator Workshop Series: How Remote Outcomes, Biomarkers, and Trial Design Will Change Future Trials", url: gtw(""), todo: DUP + " (old page also had an unlabelled link …680140723321352710)" },
  { date: "2022-04-19", title: "Spring Update", url: gtw("") },
  { date: "2022-04-08", title: "Investigator Workshop Series: Virtual Trials", url: gtw("") },
  { date: "2022-03-25", title: "Investigator Workshop Series: Trial Design Adaptations", url: gtw(""), todo: DUP },

  { date: "2021-12-10", title: "Single Patient IND EAPs in ALS: Tofersen and Beyond", url: gtw("") },
  { date: "2021-10-01", title: "An Update on AMX0035 and Design of the Phase 3 PHOENIX", url: gtw("") },
  { date: "2021-08-17", title: "Summer Update", url: gtw("") },
  { date: "2021-04-27", title: "Introducing the “thinkALS” Early Diagnosis and Referral Tool for Clinicians", url: gtw("") },
];

export const communityWebinarsUrl = "https://neals.org/people-living-with-als/educational-webinars/";

export function platform(url: string): string {
  if (url.includes("vimeo.com")) return "Vimeo";
  if (url.includes("dropbox.com")) return "Dropbox";
  if (url.includes("gotowebinar.com")) return "GoToWebinar";
  return "Video";
}
