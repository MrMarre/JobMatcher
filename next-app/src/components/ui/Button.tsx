import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
