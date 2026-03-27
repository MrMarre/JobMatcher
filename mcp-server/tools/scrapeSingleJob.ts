import { load } from "cheerio";
import { normalizeSingleJob } from "../../shared/normalizers";
import { fetchHTML } from "../../shared/fetchHTML";

export async function scrapeSingleJob({ url }: { url: string }) {
  const html = await fetchHTML(url);
  const $ = load(html);

  const title = $("h1").first().text().trim();
  const company =
    $("meta[name='og:site_name']").attr("content") ||
    $(".company, .employer, .job-company").first().text().trim();

  const descriptionHtml = $("main, .job-description, #jobdesc").html() || "";

  return normalizeSingleJob({ title, company, descriptionHtml });
}
