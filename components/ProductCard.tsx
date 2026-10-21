import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { ProductVisual } from "@/components/ProductVisual";
import { formatEUR } from "@/lib/site";

export function ProductCard({ product }: { product: Product }) {
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
    </Link>
  );
}

export function ProductGrid({
  products,
  columns = 3,
}: {
  products: Product[];
  columns?: 2 | 3;
}) {
  return (
    <ul className={`grid grid-${columns}`}>
      {products.map((product) => (
        <li key={product.slug}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
