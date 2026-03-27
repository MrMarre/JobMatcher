import { Card } from "@/components/Card";
import AnalyzeClient from "./AnalyzeClient";

export default function Analyze() {
  return (
    <Card>
      <h1 className="text-3xl text-white font-bold mb-4">Analyze Page</h1>
      <p className="text-zinc-400 mb-6">
        This is where the analysis will take place. Enter a job URL below to run
        a quick proof-of-concept evaluation.
      </p>
      <AnalyzeClient />
    </Card>
  );
}
