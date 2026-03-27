"use client";

import React, { useState } from "react";

export default function AnalyzeClient() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("http://localhost:4001/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setResult(data);
    } catch (err: unknown) {
      setError((err as Error).message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="text-white">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          className="flex-1 px-3 py-2 rounded bg-zinc-900 text-white"
          placeholder="Enter URL for analysis..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-indigo-600 rounded"
          type="submit"
          disabled={loading || !url}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {error && <div className="text-red-400">Error: {error}</div>}

      {result && (
        <div className="bg-zinc-900 p-4 rounded">
          <h2 className="text-xl font-semibold">Result</h2>
          <p>
            <strong>Match score:</strong> {result.matchScore}
          </p>
          <p>
            <strong>Eligible:</strong> {result.isEligible ? "Yes" : "No"}
          </p>
          <div>
            <strong>Strengths:</strong>
            <ul>
              {(result.strengths || []).map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Missing skills:</strong>
            <ul>
              {(result.missingSkills || []).map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
