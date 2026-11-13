# NEALS Member Portal: site plan (draft)

## Purpose

neals.org is the public site, for patients, the public and researchers looking for trials.
The YM portal is **for NEALS members**: investigators, coordinators, nurses and therapists at member sites.
Its job is to help a member find a recording, a document or their committee quickly.

## Site map

```
Home
│
├── Annual Meeting
│   ├── 2027 Meeting (upcoming)          → links out to meeting.neals.org
│   ├── Recordings (2023 → 2026)         ← 4 WA pages merged into one
│   ├── Past Meetings                    agendas, abstracts, posters by year
│   └── Photos                           ← moved here: every album is from an Annual Meeting
│
├── Learning & Events
│   ├── Events Calendar                  YM built-in Community Calendar
│   ├── Upcoming Lectures & Opportunities
│   └── Member Webinars                  video library, same layout as Recordings
│
├── Committees
│   ├── All Committees                   landing page, one card per committee
│   └── 15 committee pages               one template; text from WA
│
├── Resources
│   ├── Bylaws, SOPs & Policies
│   ├── Member Newsletters
│   └── Templates & Toolkits             existing YM group libraries (RRE, RCC…)
│
└── Directory                            YM built-in member directory

Utility bar / footer: My Profile · Log in/out · Donate · Merch Store · Join Mailing List · neals.org
```

**What changes from WildApricot**
- 10 top-level menu items become **5**.
- 4 recordings pages become **1**.
- Photos moves under Annual Meeting.
- Webinars and Lectures are grouped under Learning & Events.
- Bylaws, Newsletters and Templates are grouped under Resources.
- Donate, Merch and Mailing List move out of the main menu into the utility bar and footer.
- Drop: hidden Home, Untitled page, Old Newsletter.

## Page templates

Every page uses the same frame: a **section sidebar** listing all pages in that section (current page marked), and a content column. On phones, the sidebar moves below the content and the breadcrumb shows the path.

| Template | Used by | Built from |
|---|---|---|
| **Overview** | Annual Meeting, Learning & Events, Resources | One-line intro + index of the section's pages with a sentence each |
| **Media table** | Recordings, Member Webinars | Table grouped by year/day: title (link), length or date, host |
| **Document table** | Bylaws/SOPs/Policies, Newsletters, Toolkits | Table: document, format, updated |
| **Year matrix** | Past meetings | One row per meeting; columns: recordings, agenda, abstracts, posters, other |
| **Committee** | Committees list + 15 committee pages | List: table of committee / focus / chairs. Page: about, mission, goals, resources, chairs box |
| **Gallery** | Photos | Album per year |

**Homepage:** one-line intro · next meeting line · site index (each section + its pages) · recently added.

## Shared building blocks

Page frame with sidebar · Intro (h2) · Section heading · On-this-page links · Table · List · Index · Note · Facts box.
Design rules: Georgia headings, system sans body, one accent (NEALS navy #1f3866), thin rules. No gradients, shadows, icon tiles or card grids.

## Ground rules

- Plain HTML + one shared stylesheet (YM Custom CSS). No scripts.
- All styles scoped under one wrapper class, so the YM theme header and sign-in box are never affected.
- No fixed widths. Every page is checked at phone, tablet and desktop widths.
- Don't touch YM system screens: login, registration, dues, store and profile.

## Open decisions

1. Brand colors: navy + orange (from the WA site and the YM footer)?
2. Committees: custom pages, YM Groups, or both?
3. Who maintains pages after launch: edited in YM directly, or rebuilt from this project?
