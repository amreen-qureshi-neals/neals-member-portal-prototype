/**
 * Committee content migrated from the WildApricot committee pages (export of 2026-11-13).
 * `todo` notes flag problems found in the source (e.g. an email that belongs to someone else);
 * they show only in the prototype, never in the YM export.
 */
export type Person = { name: string; email?: string; todo?: string };
export type CommitteeResource = { label: string; url?: string; note?: string; todo?: string };
export type Committee = {
  slug: string;
  name: string;
  /** one line for the committee card */
  summary: string;
  about: string[];
  mission?: string;
  goals?: string[];
  goalsTitle?: string;
  chairs: Person[];
  resources?: CommitteeResource[];
  resourcesTitle?: string;
  todo?: string;
};

const WA_FILE = "Hosted on WildApricot: download and re-upload to YM before WildApricot closes";

export const committeesIntro = {
  lede: "Looking to become more active in NEALS? Join a committee.",
  sub: "Committees bring together members who are passionate about advancing ALS research. Whether you're a scientist, clinician, coordinator, therapist or patient advocate, there's a place for you.",
  structureUrl: "https://neals.org/about/our-structure/neals-committees",
  start: [
    "Any NEALS member can propose a new standing committee by sending the Executive Committee a proposal and a mission statement.",
    "Include the committee's goals and a list of NEALS members who'd like to join. New committees are formed once the Executive Committee approves them.",
  ],
  bylaws: [
    "The Executive Committee establishes standing committees after asking for the opinions of voting members. Each committee elects its own chairs.",
    "Standing committee membership normally lasts three years. Chairs and members can be re-appointed, provided committees keep a broad representation of NEALS sites: no more than one member from the same affiliated institution.",
    "Ad hoc work groups are set up by the Executive Committee as needed, for as long as the task requires. The need for each standing committee is reviewed every year.",
  ],
};

export const committees: Committee[] = [
  {
    slug: "big-data", name: "Big Data",
    summary: "New ways to capture, harmonize, share and analyze ALS data.",
    about: ["The Big Data Committee introduces new pathways to capture, aggregate, harmonize, distribute and analyze ALS-related information. Topics include discovering new data sources, developing new platforms and tools, Common Data Elements, data harmonization, and incentive models for research collaboration and for contributing, using, analyzing and publishing data."],
    chairs: [{ name: "Alex Sherman", email: "name@example.org" }],
    resources: [{ label: "Meeting minutes: October 1, 2020", url: "#", note: "PDF", todo: WA_FILE }],
  },
  {
    slug: "biorepository", name: "Biorepository",
    summary: "Oversight of the NEALS biofluid repository and sample requests.",
    about: [
      "NEALS maintains a repository of biofluids collected from many clinical trials and research studies. The Biorepository Committee oversees the repository and the distribution of biofluids and tissues to investigators for scientific research.",
      "The committee reviews every sample application, judging the potential impact of the study, its design and the investigator. Priority goes to NEALS investigators. If the committee has concerns, it contacts the applicant to resolve them before approval.",
      "Publications using repository samples should acknowledge the NEALS Biorepository as the source. Applicants are also advised to acknowledge, or offer coauthorship to, the PI of the study that collected the samples.",
    ],
    chairs: [{ name: "Robert Bowser", email: "name@example.org" }, { name: "Terry Heiman-Patterson", email: "name@example.org" }],
    resources: [{ label: "Online sample application", note: "On neals.org", todo: "Old page says the application is “available at the NEALS website”: add the link" }],
  },
  {
    slug: "bulbar", name: "Bulbar",
    summary: "Evaluation and management of bulbar dysfunction in ALS.",
    about: ["The Bulbar Committee investigates the pathology, clinical implications and best treatment strategies for bulbar motor neuron disease, including speech and swallowing biomarkers across disease progression. The committee is chaired by Gary Pattee, MD, of Neurology Associates."],
    goals: [
      "Define existing clinical practice for screening, evaluating and managing bulbar dysfunction in ALS.",
      "Apply current bulbar measurements across disease progression and in clinical trials.",
      "Identify reliable, validated bulbar assessment methods and their use in the clinic.",
      "Explore how medications, devices and treatment programs affect bulbar function and disease progression.",
      "Develop a consensus statement on best-practice guidelines for evaluating and managing bulbar dysfunction in ALS and other motor neuron diseases, working with groups such as the AAN Quality Standards Subcommittee and ASHA on performance measures.",
    ],
    chairs: [{ name: "Gary Pattee, MD", email: "name@example.org" }],
    resourcesTitle: "Recent publications",
    resources: [
      { label: "Best practices protocol for the evaluation of bulbar dysfunction: summary recommendations from the NEALS bulbar subcommittee symposium", url: "https://www.tandfonline.com/doi/full/10.1080/21678421.2017.1404109", note: "ALS/FTD, 2018" },
      { label: "The assessment of bulbar function in ALS: validation of a self-report scale (CNS-BFS)", url: "https://onlinelibrary.wiley.com/doi/10.1111/ene.13638", note: "European Journal of Neurology, 2018" },
      { label: "The evaluation of bulbar dysfunction in ALS: survey of clinical practice patterns in the United States", url: "https://www.neals.org/uploads/blog/doc/Plowman,Tabor,Wymer,Pattee_(2017).pdf", note: "ALS/FTD, 2017" },
    ],
  },
  {
    slug: "clinical-research-nurse", name: "Clinical Research Nurse",
    summary: "Advancing nursing science and leadership in ALS research.",
    about: ["The Clinical Research Nurse Committee was established to further nursing science as it relates to ALS, foster professional development and leadership, and shape the future of ALS research through evidence-based research. All nurses in NEALS are encouraged to take part."],
    chairs: [{ name: "Danica Sanders", email: "name@example.org" }],
  },
  {
    slug: "genetic-als-ftd", name: "Genetic ALS, FTD, and Related Phenotypes",
    summary: "Care, research and trials for genetic ALS and FTD.",
    about: ["This committee focuses on clinical care, research and clinical trials for genetic and phenotypically defined subsets of ALS. Because ALS and FTD overlap in the most common form of familial ALS, the two share many areas of interest. The committee builds on relationships with ALS and FTD researchers toward a common goal: applying evidence-based research to advance clinical treatment."],
    chairs: [{ name: "Matthew Harms", email: "name@example.org" }, { name: "Rita Sattler" }],
    resources: [
      { label: "ALS Cognitive Behavioral Screen (ALS-CBS) manual", url: "https://www.neals.org/uploads/blog/doc/ALS_CBS_Manual__Instructions_Revised_2014.pdf", note: "PDF" },
      { label: "How to perform the ALS-CBS: tutorial video by Dr. Claire Flaherty, Penn State College of Medicine", url: "https://drive.google.com/file/d/0B1u7MZ2QWZE2cTQyM1ExRndPUXc/view?ts=5b8dc3fc", note: "Video" },
    ],
  },
  {
    slug: "imaging", name: "Imaging",
    summary: "Standardized imaging and imaging biomarkers for ALS trials.",
    about: [
      "The Imaging Committee advances imaging in ALS by standardizing data acquisition between interested NEALS sites and building a NEALS Imaging Core of sites ready for multicenter neuroimaging studies.",
      "Its main focus is the discovery, standardization and application of imaging biomarkers for ALS drug development and clinical trials. The committee complements European and international efforts (NiSALS) and works closely with related NEALS committees and task forces.",
    ],
    chairs: [{ name: "Erik Pioro", email: "name@example.org" }, { name: "Suma Babu", email: "name@example.org" }],
  },
  {
    slug: "nutrition", name: "Nutrition",
    summary: "Research and collaboration to optimize nutrition care in ALS.",
    about: ["The Nutrition Committee advances interdisciplinary collaboration and innovative research to optimize nutrition care for people living with ALS. Bringing together dietitians and other healthcare professionals, it develops comprehensive approaches to the unique nutritional challenges of ALS, aiming to improve quality of life, nutritional status and well-being for people with ALS and their caregivers."],
    chairs: [
      { name: "Andrea Charvet", email: "name@example.org" },
      { name: "Polina Vorobeychik", email: "name@example.org", todo: "On the old page this email linked to a different person: check" },
      { name: "Ashley Pagano", email: "name@example.org" },
    ],
    resources: [{ label: "Nutrition Committee webinars", note: "YM group library", todo: "Existing YM group page: add link" }],
  },
  {
    slug: "palliative", name: "Palliative",
    summary: "Palliative care models for people with ALS and their families.",
    about: [],
    mission: "To relieve the suffering of people with ALS and their families through comprehensive assessment and treatment of the physical, psychosocial and emotional symptoms experienced by patients and caregivers.",
    goals: [
      "Understand the biopsychosocial needs of people with ALS and family caregivers at different stages of ALS.",
      "Explore how patients, caregivers and healthcare providers perceive palliative care for people living with ALS.",
      "Develop palliative care models for people with ALS and their caregivers.",
      "Develop a practice model that integrates palliative care into the multidisciplinary ALS clinic.",
      "Develop models for hospice and comfort care for people with ALS.",
      "Develop a continued-care model for caregivers throughout the illness and after the patient's death.",
    ],
    chairs: [{ name: "Kellen Quigg", email: "name@example.org" }, { name: "Laura Foster", email: "name@example.org" }],
  },
  {
    slug: "physical-therapist", name: "Physical & Occupational Therapist",
    summary: "PT/OT standards of care, assessment and research in ALS.",
    about: ["Physical and occupational therapists active in NEALS clinical trials formed this committee, developing its mission and goals and electing co-chairs. It supports the conduct and regulation of clinical trial measures, and builds knowledge of movement and function in ALS through independent research."],
    mission: "To promote and encourage the involvement of physical and occupational therapists in developing standards of care, evaluation and assessment measures, and research, both PT/OT-specific and for clinical trials.",
    chairs: [
      { name: "Stephanie Johnson, OTR/L, PhD, MHS", todo: "On the old page this name linked to a different person's email: check" },
      { name: "Kayla Chomko, PT, DPT, NCS" },
    ],
    resourcesTitle: "PT/OT Committee Booklet & resources",
    resources: [
      { label: "PT/OT Committee Booklet: online viewing", url: "#", note: "PDF", todo: WA_FILE },
      { label: "PT/OT Committee Booklet: for printing", url: "#", note: "PDF", todo: WA_FILE },
      { label: "PT/OT Committee Booklet: double-sided, two per page", url: "#", note: "PDF", todo: WA_FILE },
      { label: "Daily Activities Made Easier", url: "#", note: "PDF", todo: WA_FILE },
    ],
  },
  {
    slug: "recruitment-retention", name: "Recruitment & Retention",
    summary: "Improving recruitment, retention and experience of research participants.",
    about: ["Scientific breakthroughs and a growing pipeline of candidate therapies offer renewed hope for people with ALS, but only if research projects and clinical trials are completed effectively and on time. This committee develops strategies to maximize the Recruitment, Retention and Experience (RRE) of participants in ALS research."],
    goalsTitle: "The RRE Committee will",
    goals: [
      "Identify challenges, barriers and opportunities for participation by people with ALS in NEALS research.",
      "Work with the PIs and study teams of selected NEALS studies to boost recruitment, retention and experience.",
      "Create a shared toolbox of resources and templates for future NEALS projects.",
      "Collaborate with other NEALS committees and advocacy groups to build partnership among everyone involved in ALS research.",
    ],
    chairs: [
      { name: "Lindsay Heyd", todo: "On the old page both chair names linked to a third person's email: check" },
      { name: "Kelly Gwathmey" },
    ],
    resources: [
      { label: "NEALS Clinical Research Recruitment and Retention Toolbox", url: "#", note: "Box" },
      { label: "Site Level Recruitment Tools", note: "YM group library", todo: "Existing YM group library: add link" },
      { label: "Social Media Templates", note: "YM group library", todo: "Existing YM group library: add link" },
      { label: "RRE meeting minutes", note: "YM group library", todo: "Existing YM group library: add link" },
    ],
  },
  {
    slug: "research-coordinator", name: "Research Coordinator",
    summary: "Training, mentoring and shared templates for coordinators.",
    about: [],
    mission: "To promote professional development, foster collaborative coordinator training, develop leadership skills, and create a shared repository of forms and templates that makes day-to-day clinical trial work more efficient across the ALS research community.",
    goals: [
      "Understand the professional and resource needs of NEALS research coordinators.",
      "Promote professional development opportunities for NEALS research coordinators.",
      "Create a coordinator mentor program for new NEALS sites and coordinators.",
      "Develop shared resources for pharmaceutical, federal and NEALS clinical trials.",
      "Advise pharmaceutical, federal and NEALS investigators with site-level experience during protocol development and implementation.",
    ],
    chairs: [{ name: "Heidi Runk", email: "name@example.org" }, { name: "Brandy Quarles" }],
    resources: [{ label: "RCC Templates", note: "YM group library", todo: "Existing YM group library: confirm it belongs to this committee, add link" }],
  },
  {
    slug: "technology-in-als", name: "Technology in ALS",
    summary: "Telemedicine, digital monitoring and assistive technology.",
    about: [
      "Technological advances are creating new opportunities in ALS care and research: improving clinical outcomes and patient satisfaction, reducing costs, and providing patient-centered research tools. These opportunities cluster in three areas: telemedicine (clinical interactions with the care team); mobile health and digital monitoring (supporting research and drug development); and assistive devices (technology that increases patients' interaction with their environment and quality of life).",
      "The committee builds a network of NEALS investigators advancing technology across all three areas, working closely with other NEALS committees and task forces, patient organizations and advocacy groups.",
    ],
    goalsTitle: "The committee will",
    goals: [
      "Increase awareness of ongoing projects and technology adoption among NEALS members.",
      "Review the landscape of technology in ALS care and research and identify opportunities for innovation.",
      "Foster collaborative multicenter technology-based projects.",
    ],
    chairs: [{ name: "Stephen Johnson", email: "name@example.org" }, { name: "Katherine Burke", email: "name@example.org" }],
    todo: "The old page also had an unlabelled email link to another person: check whether they should be listed (see MIGRATION.md)",
  },
  {
    slug: "umnd", name: "Upper Motor Neuron Disease",
    summary: "Care and research for PLS, HSP and other UMN disorders.",
    about: ["The Upper Motor Neuron Disease (UMND) Taskforce is dedicated to improving care and quality of life, furthering scientific understanding, and developing treatments for people with upper motor neuron disorders, including Primary Lateral Sclerosis (PLS) and Hereditary Spastic Paraparesis (HSP)."],
    chairs: [{ name: "Hande Ozdinler" }, { name: "Ikjae Lee" }],
  },
  {
    slug: "ventilation", name: "Ventilation",
    summary: "Diagnosis and treatment of respiratory failure in ALS.",
    about: [],
    mission: "To improve ALS survival and quality of life by facilitating research collaboration on accurate, timely diagnosis and effective treatment of respiratory failure in ALS, and to raise awareness of timely NIV and cough-assist use, and the dangers of oxygen, through education and outreach for ALS physicians, people with ALS and caregivers.",
    chairs: [{ name: "Eufrosina Young", email: "name@example.org" }, { name: "John Coleman", email: "name@example.org" }, { name: "Benjamin Rix Brooks", email: "name@example.org" }],
  },
  {
    slug: "veterans-affairs", name: "Veterans Affairs",
    summary: "Connecting clinicians caring for veterans with ALS in the VA.",
    about: ["VA hospitals and clinics are distinct care environments that operate outside the private insurance system, with their own opportunities and challenges. This committee aims to increase communication and cooperation among the physicians and staff caring for veterans with ALS in the VA. Most VA hospitals are affiliated with a local academic medical center, so many NEALS members hold joint appointments and care for veterans with ALS."],
    goalsTitle: "Initial goals",
    goals: [
      "Establish membership numbers and clinic characteristics.",
      "Consider using common data forms across clinics.",
      "Discuss and support cooperative veteran-centered research projects.",
      "Use the national VA infrastructure to expand NEALS initiatives to the veteran population.",
    ],
    chairs: [{ name: "Colin Quinn", email: "name@example.org" }, { name: "Christina Fournier", email: "name@example.org" }],
  },
];

export const committeePageId = (c: Committee) => `committee-${c.slug}`;
