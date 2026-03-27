import { load } from "cheerio";
import type { NextRequest } from "next/server";

import { evaluateJob } from "../../../../../mcp-server/tools/evaluateJob";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;
    if (!url)
      return new Response(JSON.stringify({ error: "Missing url" }), {
        status: 400,
      });

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: `HTTP ${res.status}` }), {
        status: res.status,
      });
    }

    const html = await res.text();
    const $ = load(html);

    const title = $("h1").first().text().trim();
    const company =
      $("meta[name='og:site_name']").attr("content") ||
      $(".company, .employer, .job-company").first().text().trim();
    const descriptionHtml =
      $("main, .job-description, #jobdesc, article").first().html() || "";

    const listing = {
      title,
      company,
      url,
      descriptionHtml,
    };

    const evaluated = await evaluateJob({ listing }, {});

    return new Response(JSON.stringify(evaluated), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    return new Response(
      JSON.stringify({ error: (err as Error).message || String(err) }),
      {
        status: 500,
      },
    );
  }
}
