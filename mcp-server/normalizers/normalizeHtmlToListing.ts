import { load } from "cheerio";
import { BaseJobListing } from "../../shared/types";

export function normalizeHtmlToListing(
  html: string,
  url: string,
): BaseJobListing {
  const $ = load(html);

  const text = $("body").text().replace(/\s+/g, " ").trim();

  const title =
    $("h1").first().text().trim() ||
    $('meta[property="og:title"]').attr("content") ||
    "Unknown title";

  return {
    title,
    company: $(".company").first().text().trim() || undefined,
    url,
    descriptionHtml: html,
    rawText: text,
    normalizedText: text,
    seniority: "unknown",
    tags: [],
  };
}
