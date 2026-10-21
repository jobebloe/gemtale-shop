import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { ProductVisual } from "@/components/ProductVisual";
import { formatEUR } from "@/lib/site";

export function ProductCard({ product, cta }: { product: Product; cta?: string }) {
  const href = `/${product.collection}/${product.slug}`;
  const price =
    product.price != null ? formatEUR(product.price) : product.priceLabel ?? "On request";

  return (
    <Link className="card" href={href}>
      <div className="card-media">
        <ProductVisual product={product} alt={product.imageAlt} />
        {product.sample ? <span className="sample-tag">Sample colourway</span> : null}
      </div>
      <div className="card-meta">
        <span className="card-name">{product.name}</span>
        <span className="card-price">{price}</span>
      </div>
      {cta ? <span className="btn-primary btn-card">{cta}</span> : null}
    </Link>
  );
}

export function ProductGrid({
  products,
  columns = 3,
  cta,
}: {
  products: Product[];
  columns?: 2 | 3;
  cta?: string;
}) {
  return (
    <ul className={`grid grid-${columns}`}>
      {products.map((product) => (
        <li key={product.slug}>
          <ProductCard product={product} cta={cta} />
        </li>
      ))}
    </ul>
  );
}
