import type { Metadata } from "next";
import { ProductScreen, requireProduct } from "@/components/ProductScreen";
import { productsIn } from "@/lib/catalog";

export function generateStaticParams() {
  return productsIn("spirits").map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = requireProduct(slug, "spirits");
  return { title: product.name, description: product.summary };
}

export default async function SpiritPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = requireProduct(slug, "spirits");
  return <ProductScreen product={product} />;
}
