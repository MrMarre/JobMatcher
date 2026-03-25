import { cn } from "@/lib/cn";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full px-4 py-2 rounded-lg text-zinc-400 bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition",
        className,
      )}
      {...props}
    />
  );
}
