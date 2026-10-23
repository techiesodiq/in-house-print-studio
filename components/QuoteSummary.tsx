import { formatAUD } from "@/lib/estimate";

interface SummaryRow {
  k: string;
  v: string;
  accent?: boolean;
}

interface QuoteSummaryProps {
  rows: SummaryRow[];
  estimate: number;
  disclaimer: string;
}

export function QuoteSummary({ rows, estimate, disclaimer }: QuoteSummaryProps) {
  return (
    <aside className="sticky top-24 flex flex-col overflow-hidden rounded-[18px] border border-line bg-surf shadow-[var(--shadow)]">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-bg2 px-[18px] py-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink2">Your request</span>
        <span className="font-mono text-[10px] tracking-[0.06em] text-acc-ink">Draft</span>
      </div>
      <div className="px-[18px] py-2">
        {rows.map((row) => (
          <div
            key={row.k}
            className="flex items-baseline justify-between gap-[14px] border-b border-line py-[11px] last:border-b-0"
          >
            <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink2">{row.k}</span>
            <span className={`text-right text-[13.5px] font-medium ${row.accent ? "text-acc-ink" : "text-ink"}`}>
              {row.v}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-[10px] px-[18px] pb-5 pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[14px] font-semibold">Indicative total</span>
          <span className="font-display text-[24px] font-bold tracking-[-0.03em]">{formatAUD(estimate)}</span>
        </div>
        <span className="text-[12px] leading-[1.55] text-ink2">{disclaimer}</span>
      </div>
    </aside>
  );
}
