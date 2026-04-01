import iconv from "iconv-lite";
export async function fetchHTML(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000); // 10s

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status} for ${url}`);
    }

    // Read raw bytes
    const buffer = Buffer.from(await res.arrayBuffer());

    // Attempt to detect encoding from headers
    const contentType = res.headers.get("content-type") || "";
    const match = contentType.match(/charset=([^;]+)/i);
    const encoding = match ? match[1].trim() : "utf-8";

    // Decode using detected encoding or UTF-8 fallback
    const html = iconv.decode(buffer, encoding);

    return html;
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error(`Request to ${url} timed out`);
    }
    throw new Error(`Failed to fetch HTML from ${url}: ${err.message}`);
  }
}
