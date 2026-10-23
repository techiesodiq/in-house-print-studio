"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/types";
import { COLOURS, PHOTOS, SIZES, formatPrice, tiersFor } from "@/lib/products";
import { useQuoteStore } from "@/lib/quote-store";
import { Chip } from "./Chip";
import { OptionCard } from "./OptionCard";

const GALLERY_LABELS = ["The blank", "On the press", "Print detail", "On body"];

const METHOD_COPY: Record<"Screen" | "DTF", { label: string; moq: string; hint: string }> = {
  Screen: { label: "Screen print", moq: "MOQ on request", hint: "Best value at volume. Priced per colour." },
  DTF: { label: "DTF transfer", moq: "No minimum", hint: "Full colour, any quantity, fast." },
};

export function ProductView({ product }: { product: Product }) {
  const galleryImages = [product.image, PHOTOS.galleryOnPress, PHOTOS.galleryPrintDetail, PHOTOS.galleryOnBody];
  const [gallery, setGallery] = useState(0);
  const [colour, setColour] = useState<string>(COLOURS[0].name);
  const [size, setSize] = useState<string>("L");
  const [method, setMethod] = useState(product.methods[0]);
  const [qty, setQty] = useState(48);
  const [added, setAdded] = useState(false);

  const addItem = useQuoteStore((s) => s.addItem);

  const tiers = useMemo(() => tiersFor(product.basePrice), [product.basePrice]);
  const desc =
    product.supplier === "Ramo"
      ? "An Australian workhorse. Consistent sizing, holds print well, and priced for teams that need numbers."
      : "Mid-weight combed cotton with a clean face for print. Our most requested blank, and the one we keep coming back to.";

  function handleAddToQuote() {
    addItem({ productSlug: product.slug, colour, size, qty });
    setAdded(true);
  }

  return (
    <div className="mx-auto max-w-[1400px] px-[clamp(16px,4vw,56px)] py-[clamp(20px,3vw,36px)] pb-[clamp(48px,6vw,90px)]">
      <div className="mb-[clamp(18px,2.6vw,32px)] flex items-center gap-[9px] font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink2">
        <Link href="/catalogue" className="transition-colors hover:text-acc-ink">
          Catalogue
        </Link>
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,330px),1fr))] items-start gap-[clamp(24px,3.4vw,56px)]">
        {/* gallery */}
        <div className="flex flex-col gap-3">
          <div className="relative flex aspect-[4/5] items-end overflow-hidden rounded-[18px] border border-line bg-bg2 p-4">
            <Image
              src={galleryImages[gallery]}
              alt={`${product.name} — ${GALLERY_LABELS[gallery]}`}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="absolute inset-0 object-cover"
              priority
            />
            <span className="relative rounded-full border border-line bg-bg px-[10px] py-[6px] font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink2">
              {GALLERY_LABELS[gallery]}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-[10px]">
            {galleryImages.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setGallery(i)}
                aria-label={GALLERY_LABELS[i]}
                aria-pressed={gallery === i}
                className={`relative aspect-square overflow-hidden rounded-[11px] border-[1.5px] bg-bg2 transition-colors ${
                  gallery === i ? "border-acc" : "border-line"
                }`}
              >
                <Image src={src} alt="" fill sizes="120px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* info */}
        <div className="flex flex-col gap-[22px]">
          <div className="flex flex-col gap-[10px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-acc-ink">
              {product.supplier} · {product.code}
            </span>
            <h1 className="font-display text-[clamp(26px,3.5vw,42px)] font-bold leading-[1.05] tracking-[-0.032em]">
              {product.name}
            </h1>
            <p className="max-w-[52ch] text-[14.5px] leading-[1.62] text-ink2 text-pretty">{desc}</p>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-line bg-surf">
            <div className="flex items-center justify-between border-b border-line bg-bg2 px-4 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink2">
                Indicative unit price
              </span>
              <span className="font-mono text-[10px] tracking-[0.06em] text-acc-ink">Final price on quote</span>
            </div>
            {tiers.map((tier) => (
              <div
                key={tier.range}
                className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 last:border-b-0"
              >
                <span className="text-[13.5px] text-ink2">{tier.range}</span>
                <span className="flex items-baseline gap-2">
                  <span className="text-[15px] font-semibold">{formatPrice(tier.price)}</span>
                  <span className="font-mono text-[10px] text-ink2">ea + print</span>
                </span>
              </div>
            ))}
            <div className="px-4 py-[11px] text-[12.5px] leading-[1.5] text-ink2">
              Bulk discounts apply. Repeat screen print orders get screens free.
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink2">Colour — {colour}</span>
            <div className="flex flex-wrap gap-[9px]">
              {COLOURS.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  title={c.name}
                  aria-label={c.name}
                  aria-pressed={colour === c.name}
                  onClick={() => setColour(c.name)}
                  className="h-[34px] w-[34px] rounded-full transition-shadow"
                  style={{
                    background: c.hex,
                    boxShadow: `0 0 0 1px rgba(23,21,15,.15), 0 0 0 ${colour === c.name ? 3 : 0}px var(--acc)`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink2">Size run</span>
            <div className="flex flex-wrap gap-[7px]">
              {SIZES.map((s) => (
                <Chip key={s} active={size === s} onClick={() => setSize(s)} className="min-w-[46px]">
                  {s}
                </Chip>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink2">Print method</span>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,170px),1fr))] gap-[9px]">
              {product.methods.map((m) => (
                <OptionCard
                  key={m}
                  active={method === m}
                  onClick={() => setMethod(m)}
                  className="flex flex-col gap-1 px-[15px] py-[13px]"
                >
                  <span className="text-[14px] font-semibold">{METHOD_COPY[m].label}</span>
                  <span className="font-mono text-[10px] tracking-[0.06em] text-ink2">{METHOD_COPY[m].moq}</span>
                </OptionCard>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="flex items-center gap-1 rounded-[11px] border border-line bg-surf p-1">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 6))}
                className="h-[38px] w-[38px] rounded-lg text-[18px] text-ink2 transition-colors hover:bg-bg2"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="min-w-[52px] text-center font-mono text-[15px] font-medium">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(500, q + 6))}
                className="h-[38px] w-[38px] rounded-lg text-[18px] text-ink2 transition-colors hover:bg-bg2"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={handleAddToQuote}
              className="min-w-[200px] flex-1 rounded-xl bg-ink px-6 py-[15px] text-[15px] font-semibold text-bg shadow-[var(--shadow)] transition-transform hover:-translate-y-[2px]"
            >
              {added ? "Added to your request ✓" : "Add to quote request"}
            </button>
          </div>

          <div className="mt-1 flex flex-col border-t border-line">
            {[
              { k: "Supplier", v: `${product.supplier} ${product.code}` },
              { k: "Stock", v: "Print-to-order" },
              { k: "Turnaround", v: "7–10 working days" },
              {
                k: "Decoration",
                v: product.methods.map((m) => METHOD_COPY[m].label).join(" · "),
              },
              { k: "Payment", v: "Bank transfer, in full" },
            ].map((spec) => (
              <div key={spec.k} className="flex justify-between gap-4 border-b border-line py-[13px]">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink2">{spec.k}</span>
                <span className="text-right text-[13.5px]">{spec.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
