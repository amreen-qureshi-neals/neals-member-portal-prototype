export type Resource = {
  kind: "recordings" | "abstracts" | "posters" | "agenda" | "photos" | "links" | "partners" | "extra";
  label: string;
  url?: string;
  /** internal page link: [pageId, anchor] */
  page?: [string, string?];
  /** migration note shown only in the prototype */
  todo?: string;
};
export type PastMeeting = { year: number; resources: Resource[] };

export const upcoming = {
  year: 2027,
  title: "2027 Annual NEALS Meeting",
  dates: "October 5–8, 2027",
  url: "https://meeting.neals.org/",
};

export const pastMeetings: PastMeeting[] = [
  {
    year: 2026,
    resources: [
      { kind: "recordings", label: "Livestream recordings", page: ["annualmeetingrecordings", "y2026"] },
      { kind: "abstracts", label: "Full poster abstracts (Muscle & Nerve)", url: "https://onlinelibrary.wiley.com/doi/10.1002/mus.70436" },
      { kind: "posters", label: "Selected poster PDFs", url: "https://event.fourwaves.com/2026nealsmtg/abstracts" },
      { kind: "agenda", label: "Full meeting agenda", url: "https://meeting.neals.org/_files/ugd/bd7e5f_d9522e415dcd4fd494c7fe9a750cfdbb.pdf" },
    ],
  },
  {
    year: 2025,
    resources: [
      { kind: "recordings", label: "Livestream recordings", page: ["annualmeetingrecordings", "y2025"] },
      { kind: "abstracts", label: "Full poster abstracts (Muscle & Nerve)", url: "https://onlinelibrary.wiley.com/toc/10974598/2025/72/S1" },
      { kind: "posters", label: "Selected poster PDFs", url: "https://event.fourwaves.com/2025nealsmtg/abstracts" },
      { kind: "agenda", label: "Full meeting agenda", url: "https://meeting.neals.org/_files/ugd/bd7e5f_00f569f790bc45e2ae7944902a3733c2.pdf" },
    ],
  },
  {
    year: 2024,
    resources: [
      { kind: "recordings", label: "Livestream recordings", page: ["annualmeetingrecordings", "y2024"] },
      { kind: "abstracts", label: "Full poster abstracts (Muscle & Nerve)", url: "https://onlinelibrary.wiley.com/doi/10.1002/mus.28259" },
      { kind: "posters", label: "Selected poster PDFs", url: "https://event.fourwaves.com/2024neals/abstracts" },
      { kind: "links", label: "Links shared during the sessions", url: "https://meeting.neals.org/meeting-materials/sharedlinks" },
      { kind: "partners", label: "Partner resources", url: "https://meeting.neals.org/partner-materials" },
      { kind: "agenda", label: "Full meeting agenda", url: "https://meeting.neals.org/_files/ugd/bd7e5f_6c33ad2bffc340c0adb0266d13c495a5.pdf" },
    ],
  },
  {
    year: 2023,
    resources: [
      { kind: "recordings", label: "Livestream recordings", page: ["annualmeetingrecordings", "y2023"] },
      { kind: "abstracts", label: "Full poster abstracts (Muscle & Nerve)", url: "https://onlinelibrary.wiley.com/toc/10974598/2023/68/S1" },
      { kind: "posters", label: "Selected poster PDFs", url: "#" },
      { kind: "agenda", label: "Full meeting agenda", url: "#" },
    ],
  },
  {
    year: 2022,
    resources: [
      { kind: "abstracts", label: "Full poster abstracts (Muscle & Nerve)", url: "https://onlinelibrary.wiley.com/toc/10974598/2022/66/S2" },
      { kind: "agenda", label: "Full meeting agenda", url: "#" },
    ],
  },
  {
    year: 2021,
    resources: [
      { kind: "posters", label: "Selected posters", url: "#" },
      { kind: "agenda", label: "Full meeting agenda", url: "#", todo: "Hosted on WildApricot: download and re-upload to YM" },
      { kind: "extra", label: "Murder, She Wrote: six-part murder mystery", url: "#" },
    ],
  },
];

export type Album = { year: string; url?: string; cover?: string; note?: string };
const cdn = (p: string) => `https://cdn.ymaws.com/neals.site-ym.com/resource/resmgr/annualmeeting/${p}`;

export const albums: Album[] = [
  { year: "2026", note: "Album coming soon" },
  { year: "2025", url: "#", cover: cdn("2025_am_photo_icon.png") },
  { year: "2023", url: "#", cover: cdn("2023_am_photo_icon.png") },
  { year: "2022", url: "#", cover: cdn("2022_am_photo_icon.png") },
  { year: "2019", url: "#", cover: cdn("2019_am_photo_icon.png") },
];
export const albumsNote = "No photo albums for 2024 or the virtual 2020 and 2021 meetings.";

/** Older albums, from the WildApricot Photos page (no cover images). */
export const olderAlbums: Album[] = [
  { year: "2018", url: "#" },
  { year: "2017", url: "#" },
  { year: "2016", url: "https://thegallerystudios.zenfolio.com/neals16", note: "Zenfolio" },
];

/** Notes shown with the 2026 recordings (from the WildApricot 2026 Recordings page). */
export const recordingNotes2026 = {
  certificates: "The deadline for certification requests has passed. No additional certificates will be issued for eligible events.",
};
