import type { BaseJobListing, EvaluatedJobListing } from "../../shared/types";

export function simpleEvaluate(
  listing: BaseJobListing,
  userProfile: any,
): EvaluatedJobListing {
  const text = (
    (listing.descriptionHtml || "") +
    " " +
    (listing.title || "")
  ).toLowerCase();

  const skills = ["react", "node", "typescript", "javascript", "docker", "aws"];
  const found: string[] = skills.filter((s) => text.includes(s));

  const requirements = listing.requirements ?? [];
  const missing = requirements.filter((r) => !found.includes(r.toLowerCase()));

  const matchScore = requirements.length
    ? Math.round(
        ((requirements.length - missing.length) / requirements.length) * 100,
      )
    : Math.min(80, found.length * 20);

  return {
    title: listing.title,
    company: listing.company,
    url: listing.url,
    descriptionHtml: listing.descriptionHtml,
    requirements: listing.requirements,
    matchScore: matchScore >= 0 ? matchScore : 0,
    isEligible: matchScore >= 60,
    strengths: found,
    missingSkills: missing,
    cvHighlights: found.slice(0, 3).map((s) => `Experienced with ${s}`),
    coverLetterTips: missing
      .slice(0, 3)
      .map((m) => `Highlight experience related to ${m}`),
  } as EvaluatedJobListing;
}
