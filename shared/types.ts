// shared/types.ts
export interface JobListing {
  title: string;
  company: string;
  url: string;
  description: string;
  matchScore: number;
  isEligible: boolean;
}
