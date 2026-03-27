import express from "express";
import cors from "cors";
import { genericSingleScraper } from "./scrapers/single/genericSingleScraper";
import { simpleEvaluate } from "./tools/evaluateJob";

const DEFAULT_PORT = 4001;

export function startHttpServer(port = DEFAULT_PORT) {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGIN || "http://localhost:3000",
    }),
  );

  // EN enda endpoint
  app.post("/analyze", async (req, res) => {
    try {
      const { url, userProfile } = req.body;
      if (!url) return res.status(400).json({ error: "Missing url" });

      const listing = await genericSingleScraper(url);

      const evaluated = simpleEvaluate(listing, userProfile || {});

      res.json(evaluated);
    } catch (err: any) {
      res.status(500).json({ error: err.message || String(err) });
    }
  });

  const server = app.listen(port, () => {
    console.log(`Minimal MCP-server körs på http://localhost:${port}`);
  });

  return server;
}
