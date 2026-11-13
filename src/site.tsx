import type { ReactElement } from "react";
import { Home } from "./pages/home";
import { AnnualMeetingHub, PastMeetings, Photos, Recordings } from "./pages/annual";
import { LearningHub, Lectures, Webinars } from "./pages/learning";
import { CommitteePage, CommitteesHub } from "./pages/committees";
import { Bylaws, Newsletters, ResourcesHub, Toolkits } from "./pages/resources";
import { committees, committeePageId } from "./content/committees";

/**
 * kind:
 *  - "custom":       a YM Custom Page (Content & Settings > Custom Pages); id = YM page identifier
 *  - "content-area": a YM Content Area (homepage etc.)
 *  - "built-in":     a YM feature (calendar, directory); not exported, stub in the prototype
 * status: "existing" = YM page already exists (replace its body), "new" = create it in YM
 */
export type SitePage = {
  id: string;
  title: string;
  section: string;
  kind: "custom" | "content-area" | "built-in";
  status?: "existing" | "new";
  ymTarget?: string;
  render?: () => ReactElement;
  hidden?: boolean;
};

export const PAGES: SitePage[] = [
  { id: "home", title: "Home", section: "home", kind: "content-area", ymTarget: "Homepage - Main (Top)", render: Home },

  { id: "annualmeeting", title: "Annual Meeting", section: "annualmeeting", kind: "custom", status: "existing", render: AnnualMeetingHub },
  { id: "annualmeetingrecordings", title: "Annual Meeting Recordings", section: "annualmeeting", kind: "custom", status: "existing", render: Recordings },
  { id: "past-meetings", title: "Past Annual Meetings", section: "annualmeeting", kind: "custom", status: "new", render: PastMeetings },
  { id: "photos", title: "Annual Meeting Photos", section: "annualmeeting", kind: "custom", status: "existing", render: Photos },

  { id: "learning", title: "Learning & Events", section: "learning", kind: "custom", status: "new", render: LearningHub },
  { id: "calendar", title: "Events Calendar", section: "learning", kind: "built-in", ymTarget: "Community Calendar" },
  { id: "lectures", title: "Upcoming Lectures & Opportunities", section: "learning", kind: "custom", status: "new", render: Lectures },
  { id: "webinars", title: "NEALS Member Webinars", section: "learning", kind: "custom", status: "existing", render: Webinars },

  { id: "committees", title: "Committees", section: "committees", kind: "custom", status: "new", render: CommitteesHub },
  ...committees.map((c): SitePage => ({
    id: committeePageId(c), title: `${c.name} Committee`, section: "committees", kind: "custom", status: "new", hidden: true,
    render: () => <CommitteePage c={c} />,
  })),

  { id: "resources", title: "Resources", section: "resources", kind: "custom", status: "new", render: ResourcesHub },
  { id: "bylaws-policies", title: "Bylaws, SOPs & Policies", section: "resources", kind: "custom", status: "existing", render: Bylaws },
  { id: "newsletters", title: "Member Newsletters", section: "resources", kind: "custom", status: "new", render: Newsletters },
  { id: "toolkits", title: "Templates & Toolkits", section: "resources", kind: "custom", status: "new", render: Toolkits },

  { id: "directory", title: "Member Directory", section: "directory", kind: "built-in", ymTarget: "Member Directory" },
];

export const findPage = (id: string) => PAGES.find((p) => p.id === id);
