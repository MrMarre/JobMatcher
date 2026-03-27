import { load } from "cheerio";
import { fetchHTML } from "../../../shared/fetchHTML";
import { BaseJobListing } from "../../../shared/types";

export async function genericSingleScraper(
  url: string,
): Promise<BaseJobListing> {
  const html = await fetchHTML(url);
  const $ = load(html);

  const title = $("h1").first().text().trim();
  const company =
    $(".company, .employer, meta[name='og:site_name']")
      .first()
      .attr("content") ?? $(".company, .employer").first().text().trim();

  const descriptionHtml =
    $("main, .job-description, #jobdesc, article").first().html() ?? "";

  return {
    title,
    company,
    url,
    descriptionHtml,
  };
}
