import { committees, committeePageId } from "./content/committees";

/** One source of truth for navigation: header menu, section sidebars and breadcrumbs. */
export type NavItem = { id: string; label: string };
export type NavSection = { id: string; label: string; blurb: string; pages: NavItem[] };

export const NAV: NavSection[] = [
  {
    id: "annualmeeting", label: "Annual Meeting", blurb: "The next meeting, session recordings and materials from past years.",
    pages: [
      { id: "annualmeeting", label: "Overview" },
      { id: "annualmeetingrecordings", label: "Recordings" },
      { id: "past-meetings", label: "Past meetings" },
      { id: "photos", label: "Photos" },
    ],
  },
  {
    id: "learning", label: "Learning & Events", blurb: "Upcoming events, lectures and the member webinar library.",
    pages: [
      { id: "learning", label: "Overview" },
      { id: "calendar", label: "Events calendar" },
      { id: "lectures", label: "Lectures & opportunities" },
      { id: "webinars", label: "Member webinars" },
    ],
  },
  {
    id: "committees", label: "Committees", blurb: "What each committee works on, who chairs it and how to join.",
    pages: [{ id: "committees", label: "All committees" }, ...committees.map((c) => ({ id: committeePageId(c), label: c.name }))],
  },
  {
    id: "resources", label: "Resources", blurb: "Governing documents, newsletters, templates and toolkits.",
    pages: [
      { id: "resources", label: "Overview" },
      { id: "bylaws-policies", label: "Bylaws, SOPs & policies" },
      { id: "newsletters", label: "Member newsletters" },
      { id: "toolkits", label: "Templates & toolkits" },
    ],
  },
  { id: "directory", label: "Directory", blurb: "Find colleagues across NEALS member sites.", pages: [] },
];

export const sectionOf = (pageId: string) => NAV.find((s) => s.id === pageId || s.pages.some((p) => p.id === pageId));
