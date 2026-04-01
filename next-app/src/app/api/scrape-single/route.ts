/**
 * DEPRECATED: This route is not used. The MCP server handles scraping.
 * Frontend directly calls http://localhost:4001/analyze
 * 
 * TODO: Remove this file or repurpose as a proxy if needed
 */

export async function POST() {
  return new Response(
    JSON.stringify({ error: "This route is deprecated. Use MCP server at :4001" }),
    { status: 501 }
  );
}
