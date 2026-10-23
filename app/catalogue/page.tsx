import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { PRINT_METHODS, PRODUCT_TYPES, PRODUCTS } from "@/lib/products";

function buildHref(current: { type: string; method: string }, patch: Partial<typeof current>) {
  const next = { ...current, ...patch };
  const params = new URLSearchParams();
  if (next.type !== "All") params.set("type", next.type);
  if (next.method !== "All") params.set("method", next.method);
  const qs = params.toString();
  return qs ? `/catalogue?${qs}` : "/catalogue";
}

export default async function CataloguePage({ searchParams }: PageProps<"/catalogue">) {
  const sp = await searchParams;
  const type = typeof sp.type === "string" && (PRODUCT_TYPES as string[]).includes(sp.type) ? sp.type : "All";
  const method =
    typeof sp.method === "string" && (PRINT_METHODS as string[]).includes(sp.method) ? sp.method : "All";
  const current = { type, method };

  const filtered = PRODUCTS.filter(
    (p) => (type === "All" || p.type === type) && (method === "All" || p.methods.includes(method as "Screen" | "DTF"))
  );

  return (
    <div className="mx-auto max-w-[1400px] px-[clamp(16px,4vw,56px)] py-[clamp(28px,4vw,56px)] pb-[clamp(48px,6vw,90px)]">
      <div className="mb-[clamp(22px,3vw,36px)] flex flex-col gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-acc-ink">Catalogue</span>
        <h1 className="font-display text-[clamp(30px,4.3vw,52px)] font-bold leading-[1.02] tracking-[-0.036em]">
          Blanks &amp; accessories
        </h1>
        <p className="max-w-[60ch] text-[15px] leading-[1.6] text-ink2">
          AS Colour and Ramo, all print-to-order. Add what you need to a quote request — we price the
          job, not a checkout.
        </p>
      </div>

      <div className="mb-[clamp(18px,2.4vw,28px)] flex flex-wrap items-center gap-[10px] rounded-[14px] border border-line bg-surf p-3">
        <span className="flex flex-wrap items-center gap-[6px]">
          <span className="pr-[2px] font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink2">Type</span>
          {["All", ...PRODUCT_TYPES].map((option) => (
            <Link
              key={option}
              href={buildHref(current, { type: option })}
              aria-pressed={type === option}
              className={`rounded-full border px-[13px] py-[7px] text-[12.5px] font-medium transition-all ${
                type === option ? "border-ink bg-ink text-bg" : "border-line bg-surf text-ink2"
              }`}
            >
              {option}
            </Link>
          ))}
        </span>
        <span className="flex flex-wrap items-center gap-[6px]">
          <span className="pr-[2px] font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink2">Method</span>
          {["All", ...PRINT_METHODS].map((option) => (
            <Link
              key={option}
              href={buildHref(current, { method: option })}
              aria-pressed={method === option}
              className={`rounded-full border px-[13px] py-[7px] text-[12.5px] font-medium transition-all ${
                method === option ? "border-ink bg-ink text-bg" : "border-line bg-surf text-ink2"
              }`}
            >
              {option}
            </Link>
          ))}
        </span>
        <span className="min-w-[8px] flex-1" />
        <span className="font-mono text-[11px] text-ink2">{filtered.length} products</span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-[clamp(12px,1.6vw,22px)]">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} variant="catalogue" />
        ))}
      </div>
    </div>
  );
}
