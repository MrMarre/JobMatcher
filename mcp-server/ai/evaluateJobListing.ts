import { BaseJobListing, EvaluatedJobListing } from "../../shared/types";

async function evaluateListingWithAI(
  listing: BaseJobListing,
): Promise<EvaluatedJobListing> {
  const prompt = `
    You will analyze a job listing.

    TITLE: ${listing.title}
    COMPANY: ${listing.company}
    TEXT: ${listing.normalizedText}

    Return strictly JSON in this shape:
    {
      "matchScore": number,
      "isEligible": boolean,
      "strengths": string[],
      "missingSkills": string[],
      "cvHighlights": string[],
      "coverLetterTips": string[]
    }
  `;

  const json = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: prompt }],
    response_format: { type: "json_object" },
  });

  return {
    ...listing,
    ...json.choices[0].message.parsed,
  };
}
