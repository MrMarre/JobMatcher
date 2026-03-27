import { callTool } from "@/lib/mcp-client";

export async function POST(req: Request) {
  const { url } = await req.json();

  const job = await callTool("scrapeSingleJob", { url });

  return Response.json(job);
}
