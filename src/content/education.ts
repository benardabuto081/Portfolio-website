/**
 * Education and training. Review dates and programme names here before
 * publishing — this is the only place they are defined.
 */
export type EducationEntry = {
  institution: string;
  programme: string;
  dates: string;
  /** Recognition or result, e.g. "Distinction" or "B+". */
  note?: { label: string; value: string };
};

export const education: EducationEntry[] = [
  {
    institution: "Open University of Kenya",
    programme: "BSc Computer Science",
    dates: "September 2026 — Expected April 2030",
  },
  {
    institution: "Zone01 Kisumu",
    programme: "Software Engineering",
    dates: "September 2026 — Expected February 2028",
  },
  {
    institution: "Ngao Labs",
    programme: "Data Science & AI Bootcamp",
    dates: "June 2026 — August 2026",
    note: { label: "Recognition", value: "Distinction" },
  },
  {
    institution: "Power Learn Project",
    programme: "AI & Software Engineering Scholarship Programme",
    dates: "May 2026 — Present",
  },
  {
    institution: "Chuka University",
    programme: "BSc Computer Science",
    dates: "September 2025 — April 2026",
  },
  {
    institution: "Friends School Kamusinga",
    programme: "Kenya Certificate of Secondary Education (KCSE)",
    dates: "2021 — 2024",
    note: { label: "Result", value: "B+" },
  },
];
