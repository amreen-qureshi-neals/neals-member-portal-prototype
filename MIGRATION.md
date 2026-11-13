# WildApricot → YourMembership migration tracker

Every page on the WildApricot site is members-only (padlock), except "Pages not in menu".

Status key: ⬜ not started · 🟨 in progress · ✅ live on YM · ⛔ drop

## Menu pages

| # | WildApricot page | Goes to on YM | YM page today | Status | Notes |
|---|---|---|---|---|---|
| 1 | Home | Homepage Content Areas (Main Top / Center / Bottom) | Blank / "Test" | ⬜ | WA hero: group photo + "Welcome to the NEALS Membership Portal!" |
| 2 | Events | YM **Community Calendar** (built-in feature) | — | ⬜ | Built-in feature, not a custom page. Check that events were moved over. |
| 3 | Annual Meeting | `annualmeeting` | Has content, 6 WA links | 🟨 | Repoint recordings links to the merged page (see below). |
| 3a | ↳ 2023 / 2024 / 2025 / 2026 Recordings (4 pages) | **Merged** into `annualmeetingrecordings` | Rebuilt (`annual_meeting copy.html`) | 🟨 | One page with a section per year. Check each WA page for any video missing from the merged page. |
| 4 | Bylaws, SOPs, Policies | `bylaws-policies` | 2 docs only | ⬜ | **SOPs are missing on YM.** Get the full document list from WA. |
| 5 | Directory | YM **Member Directory** (built-in feature) | — | ⬜ | Built-in feature. Only menu link + visibility needed. |
| 6 | Upcoming Lectures & Opportunities | **New** custom page | Doesn't exist | ⬜ | |
| 7 | Member Webinars | `webinars` | Bloated, duplicate links | ⬜ | Fix 3 duplicate GoToWebinar links. |
| 8 | Member Newsletters | **New** custom page | Doesn't exist | ⬜ | Newsletter PDFs are probably WA-hosted, so download them. |
| 9 | Committees | **New** landing page: one card per committee | — | ⬜ | Decide whether each committee is a custom page or a YM Group (see below). |
| 10 | Photos | `photos` | Messy markup | ⬜ | |

### Committees (15 committees + 2 sub-pages)

All built from **one committee template**. Each committee is a data file, so every page has the same layout.

| # | Committee | Sub-page | Existing YM group library? | Status |
|---|---|---|---|---|
| C1 | Big Data | Big Data Committee Meeting… | | ⬜ |
| C2 | Biorepository | | | ⬜ |
| C3 | Bulbar | | | ⬜ |
| C4 | Clinical Research Nurse | | | ⬜ |
| C5 | Genetic ALS, FTD, and Related… | | | ⬜ |
| C6 | Imaging | | | ⬜ |
| C7 | Nutrition | | "Nutrition Committee Webinars - In Progress" | ⬜ |
| C8 | Palliative | | | ⬜ |
| C9 | Physical Therapist | PT/OT Committee Booklet | | ⬜ |
| C10 | Recruitment & Retention | | "RRE Library - …" (3)? | ⬜ |
| C11 | Research Coordinator | | "RCC Templates"? | ⬜ |
| C12 | Technology in ALS | | | ⬜ |
| C13 | UMND | | | ⬜ |
| C14 | Ventilation | | | ⬜ |
| C15 | Veteran's Affairs | | | ⬜ |

## Pages not in menu

| # | WildApricot page | Goes to on YM | Status | Notes |
|---|---|---|---|---|
| 11 | Home (hidden) | — | ⛔? | Looks like an old duplicate of Home. Confirm. |
| 12 | Membership | YM built-in **Membership / Dues / Registration** | ⬜ | System screens, linked to sign-in. Don't rebuild, only check the wording. |
| 13 | Newsletter Signup | `SignUpForEmails` + "Sign Up For Our Mailing List" form | ⬜ | YM page body is just "Test Information". |
| 14 | Untitled page | — | ⛔? | Check what's on it. |
| 15 | Old Newsletter (hidden) | — | ⛔? | Merge into Member Newsletters if anything is worth keeping. |
| 16 | Make a Donation | YM built-in **Donations** | ⬜ | YM menu already has "Donations". |
| 17 | Support CRLI | YM **Donations** (CRLI fund) or a short page | ⬜ | |

## YM menu gap

YM main menu today: Home · NEALS Merch Store · Sign Up For Our Mailing List · Donations.
None of the content pages (Annual Meeting, Bylaws, Webinars, Newsletters, Committees, Photos, Directory, Events, Lectures) are in the YM menu yet.

## Files hosted on WildApricot (download → upload to YM Resource Manager)

| File | Used on | Status |
|---|---|---|
| `resources/Documents/2021_Annual NEALS Mtg Agenda_v.2.6.pdf` | annualmeeting | ⬜ |
| `resources/Pictures/2027.jpeg` | annualmeeting | ⬜ |
| _…add the rest as pages are reviewed_ | | |

## Links to repoint

| Old link | New target |
|---|---|
| `(old WildApricot page)` (2026 recordings) | YM `annualmeetingrecordings#am-2026` |
| `(old WildApricot page)` (used for **2025** and 2024) | `#am-2025` / `#am-2024` |
| `(old WildApricot page)` | `#am-2023` |
