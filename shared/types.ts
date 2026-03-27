// shared/types.ts
export interface BaseJobListing {
  title: string;
  company?: string;
  url: string;
  descriptionHtml: string;
  requirements?: string[];
  seniority?: "junior" | "mid" | "senior" | "unknown";
  tags?: string[];
}

export interface EvaluatedJobListing extends BaseJobListing {
  matchScore: number; // 0–100
  isEligible: boolean; // true/false based on match/seniority
  strengths: string[]; // what the user has that matches the job
  missingSkills: string[];
  cvHighlights: string[]; // Highlights to include in resume
  coverLetterTips: string[];
}
