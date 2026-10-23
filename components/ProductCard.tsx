import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatMethodTag, formatPrice } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  variant?: "home" | "catalogue";
}

export function ProductCard({ product, variant = "catalogue" }: ProductCardProps) {
  const isCatalogue = variant === "catalogue";

  return (
    <Link
      href={`/catalogue/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surf text-left transition-all duration-200 hover:-translate-y-1 hover:border-acc hover:shadow-[var(--shadow)]"
    >
      <span
        className={`relative block overflow-hidden bg-bg2 ${isCatalogue ? "aspect-[4/5]" : "aspect-square"}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full border border-line bg-bg px-2 py-[5px] font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink2">
          {product.supplier}
        </span>
        {isCatalogue && (
          <span className="absolute bottom-3 right-3 flex gap-1">
            {product.swatches.map((hex, i) => (
              <span
                key={i}
                className="h-[13px] w-[13px] rounded-full border border-black/15"
                style={{ background: hex }}
              />
            ))}
          </span>
        )}
      </span>
      <span className="flex flex-col gap-[6px] px-4 pb-[18px] pt-4">
        <span className="text-[15.5px] font-semibold tracking-[-0.01em]">{product.name}</span>
        <span className="font-mono text-[11px] text-ink2">{product.meta}</span>
        {isCatalogue ? (
          <span className="flex items-center justify-between gap-2 pt-[6px]">
            <span className="text-[13px] font-semibold text-acc-ink">
              From {formatPrice(product.basePrice)} ea
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink2">
              {formatMethodTag(product.methods)}
            </span>
          </span>
        ) : (
          <span className="pt-1 text-[13px] font-semibold text-acc-ink">
            From {formatPrice(product.basePrice)} ea
          </span>
        )}
      </span>
    </Link>
  );
}
