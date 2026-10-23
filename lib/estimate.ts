import { getProduct } from "./products";
import type { FullMethod, InkCount } from "@/types";

const INK_COUNTS: Record<InkCount, number> = {
  "1 colour": 1,
  "2 colours": 2,
  "3 colours": 3,
  "4+": 4,
  "Full colour": 4,
};

/**
 * Indicative total only — the studio sends the real quote by email.
 * unit = basePrice * qty tier discount; print = per-unit decoration cost.
 */
export function estimateTotal(
  garmentSlug: string,
  qty: number,
  method: FullMethod,
  inks: InkCount
) {
  const basePrice = getProduct(garmentSlug)?.basePrice ?? 28;
  const unit = basePrice * (qty >= 100 ? 0.78 : qty >= 25 ? 0.9 : 1);
  const inkCount = INK_COUNTS[inks] ?? 1;
  const print = method === "Screen print" ? 4 + inkCount * 1.8 : 6.5;
  return Math.round((unit + print) * qty);
}

export function formatAUD(amount: number) {
  return "$" + amount.toLocaleString("en-AU");
}
