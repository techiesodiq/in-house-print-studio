interface StepRailProps {
  step: number;
  stepNames: string[];
  onStepClick: (step: number) => void;
}

export function StepRail({ step, stepNames, onStepClick }: StepRailProps) {
  return (
    <div className="flex flex-wrap gap-[10px]">
      {stepNames.map((label, i) => {
        const n = i + 1;
        const active = n === step;
        const done = n < step;
        return (
          <button
            key={label}
            type="button"
            onClick={() => onStepClick(n)}
            aria-current={active ? "step" : undefined}
            className={`flex items-center gap-[9px] rounded-full border py-[9px] pl-[10px] pr-[14px] transition-all duration-150 ${
              active ? "border-acc bg-acc-soft" : "border-line bg-surf"
            }`}
          >
            <span
              className={`inline-flex h-5 w-5 items-center justify-center rounded-full font-mono text-[10px] ${
                active ? "bg-acc text-[#17150F]" : done ? "bg-ink text-bg" : "bg-bg2 text-ink2"
              }`}
            >
              {done ? "✓" : String(n).padStart(2, "0")}
            </span>
            <span className={`text-[12.5px] font-medium ${active || done ? "text-ink" : "text-ink2"}`}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
