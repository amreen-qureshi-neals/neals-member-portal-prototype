export type Video = {
  title: string;
  url: string;
  /** seconds; 0 = unknown */
  dur?: number;
  /** full thumbnail URL, when Vimeo exposes one */
  thumb?: string;
};
export type Day = { label: string; note?: string; videos: Video[] };
export type MeetingYear = { year: number; dates: string; days: Day[]; host?: "vimeo" | "dropbox" };

const vt = (id: string) => `https://i.vimeocdn.com/video/${id}-d_640x360?f=webp&region=us`;
const share = (id: string) => `#`;
const vm = (path: string) => `#`;

export const recordings: MeetingYear[] = [
  {
    year: 2026,
    dates: "October 27–30, 2026",
    days: [
      {
        label: "Tuesday, October 27",
        note: "Member Only Day",
        videos: [
          { title: "Respiratory Care & Ventilation Committee Workshop", url: vm("") },
          { title: "Site Investigator Training", url: vm("") },
        ],
      },
      {
        label: "Wednesday, October 28",
        videos: [
          { title: "NEALS Bulbar Symposium: Best Practices on Management of Bulbar ALS", url: vm("") },
          { title: "PT/OT: Optimizing Function Across the ALS Continuum", url: vm("") },
          { title: "Opening Session", url: share(""), dur: 1376, thumb: vt("2225848203-8493ed513294ab744f56d8ddd2b96ddf4c1ce4886067ad59af4a832530de336b") },
          { title: "Industry Roundtable", url: share(""), dur: 3806, thumb: vt("2225865217-5661d1eb53996a80a496214ba6fde0647a169ddf33686039bf59d3031e197b7b") },
          { title: "NEALS Affiliated Trial Session", url: share(""), dur: 4821, thumb: vt("2225864980-934fc4e4b48b459ac96b62cfee040153cce540faac777f57cbee640a137af39d") },
          { title: "Lightning Science Talks", url: share(""), dur: 4579, thumb: vt("2225874309-4e2aea9967678a3489f0a90938bf9d11a6c82600b0f5211ebbc9323953612fab") },
          { title: "The Next Frontier in ALS", url: share(""), dur: 5796, thumb: vt("2225884998-6f1144b632b3b95238c1ff9760c43eb5a226fec699e2bc0ccda1dddca69d3093") },
        ],
      },
      {
        label: "Thursday, October 29",
        videos: [
          { title: "Co-Chair Announcement", url: share(""), dur: 1004, thumb: vt("2225852412-2a44b4a8f1b799efbbf3b5870ddc415f0cb34066ac214f3d2407efc46fa3c95f") },
          { title: "Embedding the ALS Patient Journey", url: share(""), dur: 3785, thumb: vt("2225862973-1d0558027c964a876f6eeb2fecab373705c3afd92d2c807c61bd4f7588c9e2e0") },
          { title: "Hot Topic Session", url: share(""), dur: 3587, thumb: vt("2225865149-ce01abd3dca34647ce9da438e8f7c2373f93282e3175c7e8fc6c7798844b84f9") },
          { title: "Science Symposium", url: share(""), dur: 7834, thumb: vt("2225872313-e1061c22bf26148714765397fc677c49a55dae0dd18af7853c8bf81dd25ab33a") },
          { title: "A Collaborative Ecosystem for Clinical Trial Innovation", url: share(""), dur: 3678, thumb: vt("2225870653-70f1cba80e847f45535181bdd06542f52b2b1df9d4ea7f60a6646ed2ab2f8800") },
          { title: "Stats Corner", url: share(""), dur: 3411, thumb: vt("2225873279-20b74143eeb81e927516e2b8fe461a0401df263f14eefbf0c6312555f8b84814") },
        ],
      },
      {
        label: "Friday, October 30",
        videos: [
          { title: "The Power of Partnership", url: share(""), dur: 1309, thumb: vt("2225872689-ae3259665a4bcb42d77d22ef405c7ae09b7c6e7eacd177221f6efbe7b33b8ce9") },
          { title: "Awards", url: share(""), dur: 1212, thumb: vt("2225873931-c3eb14f0d026b0905e6e075197d08a5950a36a10df816c2236356fc7655e4152") },
          { title: "Abstract Awards", url: share(""), dur: 534, thumb: vt("2225873685-089177479375b6b5f72b703daff7e6e789347b69b7d21411139b1fc69aebe34e") },
          { title: "Platform Presentations", url: share(""), dur: 6022, thumb: vt("2225884949-c22fe604abf3ee82ca1f033c4cd22357b527524cc58e3ffcee3207bf8e769d14") },
          { title: "Lessons from Novel Therapies", url: share(""), dur: 4778, thumb: vt("2225885683-e1d4a126046001c934fb575f68f792e4c05f30283f44c0a555779bb5485e33c9") },
        ],
      },
    ],
  },
  {
    year: 2025,
    dates: "October 7–10, 2025",
    days: [
      {
        label: "Tuesday, October 7",
        note: "Member Only Day",
        videos: [
          { title: "Respiratory Care & Ventilation Committee Workshop", url: vm("") },
          { title: "Clinical Research Staff Training & Development Workshop", url: vm("") },
        ],
      },
      {
        label: "Wednesday, October 8",
        videos: [
          { title: "NEALS at 30: A Legacy of Impact", url: vm(""), dur: 6626, thumb: "https://i.vimeocdn.com/video/2072750774-26f7b58d252564f8ce87ead07e3262c968ebf273645d84bc9b10f842b3d4ca1f-d_640?region=us" },
          { title: "Network of Excellence for ALS (NEALS) Video", url: vm(""), dur: 314, thumb: "https://i.vimeocdn.com/video/2073438024-14913dce66d186ee91c9842ccaf727fcc1aaf0749d7492128876e7cbd9c103cb-d_640?region=us" },
          { title: "NEALS Affiliated Trial Updates", url: vm("") },
          { title: "Cross Committee Member Workshop on Feeding Tubes", url: vm("") },
        ],
      },
      {
        label: "Thursday, October 9",
        videos: [
          { title: "Learnings from EAPs in ALS", url: vm("") },
          { title: "Partners in Discovery: Research Ambassadors Driving Change", url: vm("") },
          { title: "ALS Better Care Act Update", url: vm("") },
          { title: "Acknowledgement of Outgoing Executive Committee Members", url: vm("") },
          { title: "Scientific Symposium: Innovative Approaches and Future Directions for Treating Sporadic ALS", url: vm("") },
        ],
      },
      {
        label: "Friday, October 10",
        videos: [
          { title: "Uniting for Impact: Updates from the NEALS ALS Organizations Forum", url: vm("") },
          { title: "Harnessing Genetics to Understand and Treat ALS", url: vm("") },
          { title: "Awards & Poster Awards", url: vm("") },
          { title: "Platform Presentations", url: vm("") },
        ],
      },
    ],
  },
  {
    year: 2024,
    dates: "October 21–24, 2024",
    days: [
      {
        label: "Monday, October 21",
        note: "Member Only Day",
        videos: [
          { title: "Respiratory Care & Ventilation Committee Workshop", url: vm("") },
          { title: "Site Management Training", url: vm("") },
          { title: "Outcome Measures Update", url: vm("") },
        ],
      },
      {
        label: "Tuesday, October 22",
        videos: [
          { title: "CDC Informational Session", url: vm("") },
          { title: "Opening Session: NEALS Updates, Progress, and Partnerships in ALS Research", url: vm("") },
          { title: "NEALS Member Initiative Spotlight: Respiratory Care for ALS", url: vm("") },
          { title: "NEALS Affiliated Trial Updates", url: vm("") },
          { title: "Stats Corner", url: vm("") },
          { title: "Research Ambassador Panel: Through the Looking Glass", url: vm("") },
        ],
      },
      {
        label: "Wednesday, October 23",
        videos: [
          { title: "Global Site Meeting", url: vm("") },
          { title: "Day 2 Kickoff: CRLI Endowment & Future Plans", url: vm("") },
          { title: "30th Anniversary Bike Ride", url: vm("") },
          { title: "NEALS Committee Spotlight", url: vm("") },
          { title: "Scientific Symposium: AI is NOW! Bringing AI into ALS Research", url: vm("") },
          { title: "Industry Roundtable", url: vm("") },
        ],
      },
      {
        label: "Thursday, October 24",
        videos: [
          { title: "Revolutionizing ALS Care: The Promise of Brain-Computer Interfaces", url: vm("") },
          { title: "Awards", url: vm("") },
          { title: "Abstract Awards and Platform Presentations", url: vm("") },
        ],
      },
    ],
  },
  {
    year: 2023,
    dates: "October 4–6, 2023",
    host: "dropbox",
    days: [
      {
        label: "Wednesday, October 4",
        videos: [
          { title: "Industry Roundtable", url: "#" },
        ],
      },
      {
        label: "Thursday, October 5",
        videos: [
          { title: "General Session: NEALS Consortium Updates & Transformative ALS Initiatives", url: "#" },
          { title: "General Session: NEALS Affiliated Trial Updates", url: "#" },
          { title: "Science Symposium: Gene Therapies of the Future", url: "#" },
          { title: "Hot Topic in ALS Science: Neurofilaments: Are They the Ultimate Biomarkers, Outcome Measures, or More?", url: "#" },
        ],
      },
      {
        label: "Friday, October 6",
        videos: [
          { title: "Global Research Ambassadors: Real People. Real Impact", url: "#" },
          { title: "Awards and Abstract Platform Presentations", url: "#" },
        ],
      },
    ],
  },
];

export const countVideos = (y: MeetingYear) => y.days.reduce((n, d) => n + d.videos.length, 0);
export const totalSeconds = (y: MeetingYear) => y.days.reduce((n, d) => n + d.videos.reduce((m, v) => m + (v.dur ?? 0), 0), 0);
