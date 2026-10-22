import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { promoPercent } from "@/lib/catalog";
import { Price } from "@/components/Price";
import { ProductVisual } from "@/components/ProductVisual";

export function ProductCard({
  product,
  cta,
  image,
}: {
  product: Product;
  cta?: string;
  image?: string;
}) {
  const href = `/${product.collection}/${product.slug}`;
  const off = promoPercent(product);

  return (
    <Link className="card" href={href}>
      <div className="card-media">
        <ProductVisual product={product} src={image} alt={product.imageAlt} />
        {off != null ? <span className="promo-tag">−{off}%</span> : null}
        {product.sample ? <span className="sample-tag">Sample colourway</span> : null}
      </div>
      <div className="card-meta">
        <span className="card-name">{product.name}</span>
        <span className="card-price">
          <Price product={product} showOff={false} />
        </span>
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
