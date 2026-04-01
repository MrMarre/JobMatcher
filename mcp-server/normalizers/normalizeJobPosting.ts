import { load } from "cheerio";

export function normalizeJobPosting(listing: any) {
  const $ = load(listing.descriptionHtml || "");

  const text = $.text().replace(/\s+/g, " ").trim().toLowerCase();

  const sections = extractSections(text);

  //Hardcoded skills for demo purpose
  const skills = [
    "react",
    "typescript",
    "javascript",
    "node",
    "python",
    "docker",
    "aws",
    "graphql",
    "kubernetes",
    "next.js",
    "tailwind",
  ];

  const found = skills.filter((s) => text.includes(s));

  return {
    ...listing,
    cleanedText: text,
    sections,
    skillsFound: found,
  };
}

function extractSections(text: string) {
  const headers = [
    "responsibilities",
    "requirements",
    "qualifications",
    "nice to have",
    "about the role",
    "what we offer",
  ];

  const sections: Record<string, string[]> = {};
  let current: string | null = null;

  for (const line of text.split(".")) {
    const l = line.trim();
    if (!l) continue;

    const header = headers.find((h) => l.startsWith(h));
    if (header) {
      current = header;
      sections[current] = [];
    } else if (current) {
      sections[current].push(l);
    }
  }
  return sections;
}
