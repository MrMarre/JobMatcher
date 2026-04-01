import express from "express";
import cors from "cors";
import { simpleEvaluate } from "./tools/simpleEvaluate";
import { normalizeJobPosting } from "./normalizers/normalizeJobPosting";
import { fetchHTML } from "./shared/fetchHTML";
import { normalizeHtmlToListing } from "./normalizers/normalizeHtmlToListing";

const DEFAULT_PORT = 4001;

export function startHttpServer(port = DEFAULT_PORT) {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGIN || "http://localhost:3000",
    }),
  );

  // Single endpoint for job analysis
  app.post("/analyze", async (req, res) => {
    try {
      const { url, userProfile } = req.body;
      if (!url) return res.status(400).json({ error: "Missing url" });

      // 1️⃣ Hämta HTML
      const html = await fetchHTML(url);

      // 2️⃣ Normalisera HTML → BaseJobListing
      const listing = normalizeHtmlToListing(html, url);

      // 3️⃣ Extrahera features
      const normalized = normalizeJobPosting(listing);

      // 4️⃣ Utvärdera mot användarprofil / skills
      const evaluated = simpleEvaluate(normalized, userProfile || {});

      // 5️⃣ Returnera JSON
      res.json(evaluated);
      // const listing = await genericSingleScraper(url);
      // const normalized = normalizeJobPosting(listing);
      // const evaluated = simpleEvaluate(normalized, {});

      // res.json(evaluated);
    } catch (err: any) {
      res.status(500).json({ error: err.message || String(err) });
    }
  });

  const server = app.listen(port, () => {
    console.log(`Minimal MCP-server is running on http://localhost:${port}`);
  });

  return server;
}
