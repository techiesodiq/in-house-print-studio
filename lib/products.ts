import type { Product, PrintMethod, ProductType, Supplier } from "@/types";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function pexels(id: number, w = 700, h = 875) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;
}

export const COLOURS = [
  { name: "Bone", hex: "#E7E1D5" },
  { name: "Black", hex: "#17150F" },
  { name: "Faded Sage", hex: "#9BA58C" },
  { name: "Cardinal", hex: "#7E2C2C" },
  { name: "Mid Blue", hex: "#3D5A80" },
] as const;

export const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"] as const;

export const PRODUCT_TYPES: ProductType[] = ["Tees", "Hoodies", "Polos", "Caps", "Bags"];
export const PRINT_METHODS: PrintMethod[] = ["Screen", "DTF"];

interface RawProduct {
  name: string;
  code: string;
  supplier: Supplier;
  meta: string;
  basePrice: number;
  type: ProductType;
  methods: PrintMethod[];
  imageId: number;
  swatches: string[];
}

const RAW: RawProduct[] = [
  { name: "Stencil Hoodie", code: "5102", supplier: "AS Colour", meta: "320gsm · 8 colours", basePrice: 46, type: "Hoodies", methods: ["Screen", "DTF"], imageId: 6995867, swatches: ["#E7E1D5", "#17150F", "#9BA58C", "#5B6472"] },
  { name: "Staple Tee", code: "5001", supplier: "AS Colour", meta: "180gsm · 20 colours", basePrice: 18.5, type: "Tees", methods: ["Screen", "DTF"], imageId: 35625406, swatches: ["#FAF8F4", "#17150F", "#7E2C2C", "#3D5A80"] },
  { name: "Faded Tee", code: "5065", supplier: "AS Colour", meta: "190gsm · 9 colours", basePrice: 24, type: "Tees", methods: ["DTF"], imageId: 9594692, swatches: ["#C9C2B4", "#4A4740", "#8E7C6A", "#2C3440"] },
  { name: "Modern Fit Polo", code: "P303HB", supplier: "Ramo", meta: "Pique · 12 colours", basePrice: 27, type: "Polos", methods: ["Screen", "DTF"], imageId: 9594681, swatches: ["#17150F", "#3D5A80", "#E7E1D5", "#3F5D3A"] },
  { name: "Heavy Cap", code: "1120", supplier: "AS Colour", meta: "6-panel · 7 colours", basePrice: 19, type: "Caps", methods: ["DTF"], imageId: 30940601, swatches: ["#17150F", "#B79A64", "#FAF8F4", "#3F5D3A"] },
  { name: "Carrier Tote", code: "1001", supplier: "AS Colour", meta: "Canvas · 4 colours", basePrice: 16, type: "Bags", methods: ["Screen"], imageId: 3735641, swatches: ["#E7E1D5", "#17150F", "#9BA58C", "#8E7C6A"] },
  { name: "Relax Hood", code: "4101", supplier: "AS Colour", meta: "360gsm · 6 colours", basePrice: 52, type: "Hoodies", methods: ["Screen", "DTF"], imageId: 37420552, swatches: ["#17150F", "#E7E1D5", "#5B6472", "#7E2C2C"] },
  { name: "Team Tee", code: "T601HB", supplier: "Ramo", meta: "Sport mesh · 10 colours", basePrice: 21, type: "Tees", methods: ["DTF"], imageId: 36074834, swatches: ["#3D5A80", "#7E2C2C", "#17150F", "#FAF8F4"] },
];

export const PRODUCTS: Product[] = RAW.map((p) => ({
  slug: slugify(p.name),
  name: p.name,
  code: p.code,
  supplier: p.supplier,
  meta: p.meta,
  basePrice: p.basePrice,
  type: p.type,
  methods: p.methods,
  image: pexels(p.imageId),
  swatches: p.swatches,
}));

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatMethodTag(methods: PrintMethod[]) {
  return methods.join(" · ");
}

export function formatMethodLabel(methods: PrintMethod[]) {
  return methods
    .map((m) => (m === "Screen" ? "Screen print" : "DTF transfer"))
    .join(" · ");
}

export function formatPrice(amount: number) {
  return `$${amount.toFixed(2)}`;
}

/** Indicative per-unit tiers, using the same break points as the estimate calculator. */
export function tiersFor(basePrice: number) {
  return [
    { range: "1 – 24 units", price: basePrice },
    { range: "25 – 99 units", price: Math.round(basePrice * 0.9 * 100) / 100 },
    { range: "100+ units", price: Math.round(basePrice * 0.78 * 100) / 100 },
  ];
}

// Extra gallery / editorial photography used across the site.
export const PHOTOS = {
  hero: pexels(33650433),
  screenPrintMethod: pexels(27893067, 1200, 650),
  dtfMethod: pexels(33650428, 1200, 650),
  howItWorksBanner: pexels(32641559, 1200, 650),
  galleryOnPress: pexels(33650427),
  galleryPrintDetail: pexels(34117503),
  galleryOnBody: pexels(33650424),
  work: {
    ostiniCafe: pexels(32963961),
    impactGym: pexels(18199559),
    iseeChurch: pexels(29320945),
    standTall: pexels(8146451),
  },
};

export const WORK = [
  { tag: "Screen print", client: "Ostini Cafe", image: PHOTOS.work.ostiniCafe },
  { tag: "DTF", client: "Impact Gym", image: PHOTOS.work.impactGym },
  { tag: "Screen print", client: "Isee Church", image: PHOTOS.work.iseeChurch },
  { tag: "DTF", client: "Stand Tall Australia", image: PHOTOS.work.standTall },
];

export const CLIENTS = [
  "Geeks on Tap",
  "Stand Tall Australia",
  "Isee Church",
  "Impact Gym",
  "Ostini Cafe",
  "Trades & contractors",
];

export const METHOD_INFO = [
  {
    name: "Screen print",
    moq: "MOQ on request",
    image: PHOTOS.screenPrintMethod,
    body: "The classic. Thick, opaque ink that sits in the fabric and survives years of washing. Best value once the numbers climb.",
    points: ["Free screens on repeat orders", "Priced per colour, per placement", "Ideal for 25 units and up"],
  },
  {
    name: "DTF transfer",
    moq: "No minimum",
    image: PHOTOS.dtfMethod,
    body: "Full-colour detail, gradients and photographic artwork, heat-pressed onto almost any garment. One shirt or fifty.",
    points: ["No minimum order", "Unlimited colours in one hit", "Great for sample runs and reorders"],
  },
];

export const PROCESS_STEPS = [
  { n: "01", title: "Enquiry & quote", body: "Send the job through the site. We reply with a written quote, usually the same day.", who: "You → us" },
  { n: "02", title: "Artwork & approval", body: "We prepare a proof and email it for sign-off. Nothing prints until you approve it.", who: "Us → you" },
  { n: "03", title: "Payment", body: "Full payment by bank transfer. Once it clears, the order goes into the run.", who: "You" },
  { n: "04", title: "Print", body: "Blanks land at the studio and we print. 7–10 working days is our standard window.", who: "Us" },
  { n: "05", title: "Pickup or delivery", body: "We let you know it is done and arrange pickup, or deliver locally ourselves.", who: "Us → you" },
];

export const FAQS = [
  { q: "What is your minimum order?", a: "DTF has no minimum — one shirt is fine. Screen print minimums depend on the job, so talk to us and we will work it out." },
  { q: "What file should I send?", a: "Illustrator files are ideal. We also accept PDF and JPG at 300 DPI or higher. We review every file for print quality before proofing." },
  { q: "How long does an order take?", a: "We aim for 7–10 working days from approved artwork. Blanks are ordered in for each job, so that window includes stock arriving at the studio." },
  { q: "How do I pay?", a: "Bank transfer, in full, upfront. Once payment clears we send the artwork approval and the job goes into the run." },
  { q: "Do you deliver?", a: "Delivery is priced per job because quantity changes everything — 20 shirts is a very different job to 500. Most local orders we deliver personally." },
  { q: "Can I reorder the same job?", a: "Yes, and it is cheaper the second time. Repeat screen print orders reuse your screens free of charge." },
];

export const ARTWORK_CHECKLIST = [
  "Vector artwork, or 300 DPI minimum",
  "Fonts outlined or supplied",
  "Print size noted in mm",
  "Pantone references if colour is critical",
  "Transparent background where needed",
];

export const CONTACT_EMAIL = "hello@inhouseprintstudios.com";

export type SocialNetwork = "Instagram" | "Facebook" | "TikTok" | "X";

// Placeholders: swap each href for the studio's real profile URL once the accounts exist.
export const SOCIAL_LINKS: { network: SocialNetwork; href: string }[] = [
  { network: "Instagram", href: "https://www.instagram.com" },
  { network: "Facebook", href: "https://www.facebook.com" },
  { network: "TikTok", href: "https://www.tiktok.com" },
  { network: "X", href: "https://x.com" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Shop",
    items: [
      { label: "Catalogue", href: "/catalogue" },
      { label: "Tees", href: "/catalogue?type=Tees" },
      { label: "Hoodies", href: "/catalogue?type=Hoodies" },
      { label: "Caps", href: "/catalogue?type=Caps" },
      { label: "Bags", href: "/catalogue?type=Bags" },
    ],
  },
  {
    title: "Studio",
    items: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Screen print", href: "/catalogue?method=Screen" },
      { label: "DTF transfer", href: "/catalogue?method=DTF" },
      { label: "Our work", href: "/#work" },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: "Request a quote", href: "/quote" },
      { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
      { label: "Local delivery & pickup", href: "/how-it-works#faq" },
    ],
  },
];
