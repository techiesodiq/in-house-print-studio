export function LogoMark({ size = 26, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none" aria-hidden="true" className={className}>
      <circle cx="13" cy="13" r="12" stroke="var(--acc)" strokeWidth="1.4" />
      <circle cx="13" cy="13" r="4.2" fill="var(--acc)" />
      <line x1="13" y1="0" x2="13" y2="6" stroke="var(--ink)" strokeWidth="1.4" />
      <line x1="13" y1="20" x2="13" y2="26" stroke="var(--ink)" strokeWidth="1.4" />
      <line x1="0" y1="13" x2="6" y2="13" stroke="var(--ink)" strokeWidth="1.4" />
      <line x1="20" y1="13" x2="26" y2="13" stroke="var(--ink)" strokeWidth="1.4" />
    </svg>
  );
}

export function LogoLockup({ size = 26 }: { size?: number }) {
  return (
    <span className="flex items-center gap-[11px]">
      <LogoMark size={size} />
      <span className="flex flex-col items-start leading-none">
        <span className="font-display font-bold text-[17px] tracking-[-0.03em]">In House</span>
        <span className="font-mono text-[8.5px] tracking-[0.26em] uppercase text-ink2 mt-[3px]">
          Print Studios
        </span>
      </span>
    </span>
  );
}
