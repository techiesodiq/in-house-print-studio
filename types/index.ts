export type PrintMethod = "Screen" | "DTF";
export type ProductType = "Tees" | "Hoodies" | "Polos" | "Caps" | "Bags";
export type Supplier = "AS Colour" | "Ramo";

export interface Product {
  slug: string;
  name: string;
  code: string;
  supplier: Supplier;
  meta: string;
  basePrice: number;
  type: ProductType;
  methods: PrintMethod[];
  image: string;
  swatches: string[];
}

export type FullMethod = "Screen print" | "DTF transfer";
export type Deadline = "Standard" | "Fixed date" | "Not sure yet";
export type InkCount = "1 colour" | "2 colours" | "3 colours" | "4+" | "Full colour";
export type Placement = "Front" | "Back" | "Left chest" | "Sleeve";

export interface QuoteContact {
  name: string;
  business: string;
  email: string;
  phone: string;
}

export interface QuoteItem {
  productSlug: string;
  colour: string;
  size?: string;
  qty: number;
}

export interface QuoteDraft {
  items: QuoteItem[];
  garment: string;
  qty: number;
  sizeBreakdown: Record<string, number> | null;
  method: FullMethod;
  placement: Placement;
  inks: InkCount;
  notes: string;
  contact: QuoteContact;
  deadline: Deadline;
  step: number;
}
