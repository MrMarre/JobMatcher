import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className={
        "flex min-h-screen items-center justify-center font-sans dark:bg-black"
      }
    >
      <div className="w-full space-y-6">
        <Card>
          <h1 className="text-3xl font-bold text-white mb-4 ">JobScraper</h1>
          <p className="text-zinc-400 mb-6">
            Dummy text om Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Reiciendis pariatur ducimus, provident qui quia autem dolore
            possimus odio dolores sapiente cum vel incidunt? Debitis, deserunt
            libero? Cupiditate accusantium quo dolor culpa placeat expedita
            harum. Cupiditate fugiat illum nemo et. Odit.
          </p>
          <Button>
            <Link href="/analyze">Scrape Jobs</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
