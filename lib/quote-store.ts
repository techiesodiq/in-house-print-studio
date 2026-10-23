"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Deadline, FullMethod, InkCount, Placement, QuoteContact, QuoteDraft, QuoteItem } from "@/types";

const SIZE_DISTRIBUTION: [string, number][] = [
  ["XS", 0.06],
  ["S", 0.14],
  ["M", 0.24],
  ["L", 0.28],
  ["XL", 0.18],
  ["2XL", 0.1],
];

export function defaultSizeBreakdown(qty: number) {
  return SIZE_DISTRIBUTION.reduce<Record<string, number>>((acc, [label, pct]) => {
    acc[label] = Math.max(0, Math.round(qty * pct));
    return acc;
  }, {});
}

const initialDraft: QuoteDraft = {
  items: [],
  garment: "stencil-hoodie",
  qty: 48,
  sizeBreakdown: null,
  method: "Screen print",
  placement: "Front",
  inks: "2 colours",
  notes: "",
  contact: { name: "", business: "", email: "", phone: "" },
  deadline: "Standard",
  step: 1,
};

interface QuoteState extends QuoteDraft {
  addItem: (item: QuoteItem) => void;
  setGarment: (slug: string) => void;
  setQty: (qty: number) => void;
  setSizeBreakdown: (breakdown: Record<string, number>) => void;
  setMethod: (method: FullMethod) => void;
  setPlacement: (placement: Placement) => void;
  setInks: (inks: InkCount) => void;
  setNotes: (notes: string) => void;
  setContact: (patch: Partial<QuoteContact>) => void;
  setDeadline: (deadline: Deadline) => void;
  setStep: (step: number) => void;
  reset: () => void;
}

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set) => ({
      ...initialDraft,
      addItem: (item) =>
        set((s) => ({
          items: [...s.items, item],
          garment: item.productSlug,
          qty: item.qty,
          sizeBreakdown: null,
        })),
      setGarment: (slug) => set({ garment: slug }),
      setQty: (qty) => set({ qty: Math.min(500, Math.max(1, qty)), sizeBreakdown: null }),
      setSizeBreakdown: (breakdown) => set({ sizeBreakdown: breakdown }),
      setMethod: (method) => set({ method }),
      setPlacement: (placement) => set({ placement }),
      setInks: (inks) => set({ inks }),
      setNotes: (notes) => set({ notes }),
      setContact: (patch) => set((s) => ({ contact: { ...s.contact, ...patch } })),
      setDeadline: (deadline) => set({ deadline }),
      setStep: (step) => set({ step: Math.min(4, Math.max(1, step)) }),
      reset: () => set(initialDraft),
    }),
    { name: "ihps-quote-draft" }
  )
);
