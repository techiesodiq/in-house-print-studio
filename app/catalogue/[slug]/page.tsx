import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, PRODUCTS } from "@/lib/products";
import { ProductView } from "@/components/ProductView";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/catalogue/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — In House Print Studios`,
    description: `${product.supplier} ${product.code}, from $${product.basePrice.toFixed(2)} ea. Print-to-order, quoted per job.`,
  };
}

export default async function ProductPage({ params }: PageProps<"/catalogue/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return <ProductView product={product} />;
}
