import { load } from "cheerio";
import { normalizeSingleJob } from "../../shared/normalizers";

export async function scrapeSingleJob({ url }) {
  const html = await fetch(url).then((r) => r.text());
  const $ = load(html);

  const title = $("h1").first().text().trim();
  const company =
    $("meta[name='og:site_name']").attr("content") ||
    $(".company, .employer, .job-company").first().text().trim();

  const descriptionHtml = $("main, .job-description, #jobdesc").html() || "";

  return normalizeSingleJob({ title, company, descriptionHtml });
}
