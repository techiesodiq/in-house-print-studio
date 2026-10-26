import Image from "next/image";

export function LogoMark({ size = 26, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/logo-badge.png"
      alt="In House Print Studios"
      width={size}
      height={size}
      className={className}
      priority
    />
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
