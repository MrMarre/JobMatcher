/**
 * DEPRECATED: This route has duplicate scraping logic and is not used.
 * The MCP server at :4001/analyze handles the full analysis pipeline.
 * Frontend directly calls MCP server.
 * 
 * This file is kept for reference only. TODO: Delete or remove.
 */

export async function POST() {
  return new Response(
    JSON.stringify({ error: "This route is deprecated. Use MCP server at http://localhost:4001/analyze" }),
    { status: 501 }
  );
}
