import type { BaseJobListing, EvaluatedJobListing } from "../../shared/types";

function simpleEvaluate(
  listing: BaseJobListing,
  userProfile: any,
): EvaluatedJobListing {
  const text = (
    (listing.descriptionHtml || "") +
    " " +
    (listing.title || "")
  ).toLowerCase();

  // Very small skill list for POC — extend as needed
  const skills = [
    "react",
    "node",
    "typescript",
    "javascript",
    "docker",
    "aws",
    "python",
    "kubernetes",
  ];
  const found: string[] = [];
  for (const s of skills) {
    if (text.includes(s)) found.push(s);
  }

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
    seniority: listing.seniority,
    tags: listing.tags,
    matchScore: matchScore >= 0 ? matchScore : 0,
    isEligible: matchScore >= 60,
    strengths: found,
    missingSkills: missing,
    cvHighlights: found.slice(0, 3).map((s) => `Experienced with ${s}`),
    coverLetterTips: missing
      .slice(0, 3)
      .map((m) => `Highlight any experience related to ${m}`),
  } as EvaluatedJobListing;
}

export async function evaluateJob(
  { listing, userProfile }: { listing: BaseJobListing; userProfile?: any },
  { model } = { model: undefined },
): Promise<EvaluatedJobListing> {
  if (!model) {
    return simpleEvaluate(listing, userProfile);
  }

  try {
    const result = await model.generate({
      system: "Analyze the job listing and compare with user background.",
      prompt: `
Job Title: ${listing.title}
Company: ${listing.company}
Requirements: ${listing.requirements?.join(", ")}

User profile:
${JSON.stringify(userProfile)}

Return JSON matching the EvaluatedJobListing shape.
      `,
    });

    try {
      const parsed = JSON.parse(result.text());
      // Merge parsed output with original listing to ensure fields exist
      return {
        ...listing,
        matchScore:
          typeof parsed.matchScore === "number" ? parsed.matchScore : 0,
        isEligible:
          typeof parsed.isEligible === "boolean"
            ? parsed.isEligible
            : parsed.matchScore >= 60,
        strengths: parsed.strengths ?? parsed.userStrengths ?? [],
        missingSkills: parsed.missingSkills ?? [],
        cvHighlights: parsed.cvHighlights ?? parsed.cv_highlights ?? [],
        coverLetterTips:
          parsed.coverLetterTips ?? parsed.cover_letter_tips ?? [],
      } as EvaluatedJobListing;
    } catch (err) {
      // If parsing fails, fallback to simple evaluator
      return simpleEvaluate(listing, userProfile);
    }
  } catch (err) {
    return simpleEvaluate(listing, userProfile);
  }
}
