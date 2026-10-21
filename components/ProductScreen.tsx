import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BuyPanel } from "@/components/BuyPanel";
import { EnquiryPanel } from "@/components/EnquiryPanel";
import { ProductGrid } from "@/components/ProductCard";
import { getProduct, type Product } from "@/lib/catalog";

export function ProductScreen({ product }: { product: Product }) {
  const related = product.related
    .map((slug) => getProduct(slug))
    .filter((item): item is Product => Boolean(item));

  return (
    <article className="wrap pdp-page">
      {product.enquiry ? (
        <EnquiryPanel product={product} />
      ) : (
        <Suspense fallback={null}>
          <BuyPanel product={product} />
        </Suspense>
      )}
      {related.length > 0 ? (
        <section className="related">
          <h2>Also</h2>
          <ProductGrid products={related} columns={related.length > 2 ? 3 : 2} />
        </section>
      ) : null}
    </article>
  );
}

export function requireProduct(slug: string, collection: Product["collection"]) {
  const product = getProduct(slug);
  if (!product || product.collection !== collection) notFound();
  return product;
}
