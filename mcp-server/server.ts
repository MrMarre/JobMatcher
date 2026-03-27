import { genericSingleScraper } from "./scrapers/single/genericSingleScraper";
import { evaluateJob } from "./tools/evaluateJob";
import express from "express";
import cors from "cors";

const DEFAULT_PORT = 4001;

export function startHttpServer(
  port = Number(process.env.MCP_SERVER_PORT) || DEFAULT_PORT,
) {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGIN || "http://localhost:3000",
    }),
  );

  app.post("/analyze", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) return res.status(400).json({ error: "Missing url" });

      const listing = await genericSingleScraper(url);
      const evaluated = await evaluateJob(
        { listing, userProfile: {} },
        {} as any,
      );

      res.json(evaluated);
    } catch (err: any) {
      res.status(500).json({ error: err.message || String(err) });
    }
  });

  const server = app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`mcp-server HTTP API listening on http://localhost:${port}`);
  });

  return server;
}
