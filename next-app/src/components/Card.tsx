import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="p-6 max-w-3xl rounded-xl bg-zinc-900 border border-zinc-800 shadow-lg">
      {children}
    </div>
  );
}
