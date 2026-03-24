import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 shadow-lg">
      {children}
    </div>
  );
}
