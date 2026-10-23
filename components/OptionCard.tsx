import type { ButtonHTMLAttributes } from "react";

interface OptionCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function OptionCard({ active, className = "", ...props }: OptionCardProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`rounded-xl border-[1.5px] text-left transition-all duration-150 ${
        active ? "border-acc bg-acc-soft" : "border-line bg-surf"
      } ${className}`}
      {...props}
    />
  );
}
