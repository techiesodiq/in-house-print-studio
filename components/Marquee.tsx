export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];

  return (
    <section className="overflow-hidden border-y border-line bg-bg2 py-[18px]">
      <div className="flex w-max animate-ihps-marquee">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-[34px] whitespace-nowrap pr-[34px] font-mono text-[12px] uppercase tracking-[0.14em] text-ink2"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-acc" />
          </span>
        ))}
      </div>
    </section>
  );
}
