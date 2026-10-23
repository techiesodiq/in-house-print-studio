import type { ButtonHTMLAttributes } from "react";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Chip({ active, className = "", ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`rounded-full border px-[13px] py-[7px] text-[12.5px] font-medium transition-all duration-150 ${
        active ? "border-ink bg-ink text-bg" : "border-line bg-surf text-ink2"
      } ${className}`}
      {...props}
    />
  );
}
