import { LogoMark } from "./Logo";
import { FOOTER_COLUMNS } from "@/lib/products";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg2">
      <div className="mx-auto max-w-[1400px] px-[clamp(16px,4vw,56px)] pb-6 pt-[clamp(32px,4.4vw,64px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-[clamp(22px,3vw,48px)] pb-[clamp(26px,3.4vw,44px)]">
          <div className="flex flex-col items-start gap-3">
            <span className="flex h-[22px] items-center gap-[11px]">
              <LogoMark size={22} />
              <span className="font-display text-[17px] font-bold tracking-[-0.03em]">
                In House Print Studios
              </span>
            </span>
            <p className="max-w-[34ch] text-[13.5px] leading-[1.6] text-ink2">
              Screen print and DTF, print-to-order, quoted per job. Local
              delivery by hand.
            </p>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col items-start gap-3">
              <span className="flex h-[22px] items-center font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink2">
                {col.title}
              </span>
              {col.items.map((item) => (
                <span
                  key={item}
                  className="text-[13.5px] leading-[1.6] text-ink"
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-[14px] border-t border-line pt-[18px]">
          <span className="font-mono text-[10.5px] tracking-[0.08em] text-ink2">
            © 2026 In House Print Studios
          </span>
          <span className="font-mono text-[10.5px] tracking-[0.08em] text-ink2">
            Bank transfer · Full payment upfront
          </span>
        </div>
      </div>
    </footer>
  );
}
