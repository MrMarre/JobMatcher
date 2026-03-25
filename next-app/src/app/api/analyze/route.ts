export async function POST(req: Request) {
  const { url } = await req.json();

  return Response.json({
    status: "pending",
    message: "Scraping not implemented yet",
    //later: result: ...
  });
}
