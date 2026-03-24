import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
    >
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">
        <div className="max-w-lg w-full space-y-6">
          <Card>
            <h1 className="text-3xl font-bold mb-4">JobScraper</h1>
            <p className="text-zinc-400 mb-6">
              Dummy text om Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Reiciendis pariatur ducimus, provident qui quia autem dolore
              possimus odio dolores sapiente cum vel incidunt? Debitis, deserunt
              libero? Cupiditate accusantium quo dolor culpa placeat expedita
              harum. Cupiditate fugiat illum nemo et. Odit.
            </p>
            <Button onClick={() => alert("Snart: starta scrape!")}>
              Starta scrape
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
