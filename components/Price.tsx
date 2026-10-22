import type { Product } from "@/lib/catalog";
import { promoPercent } from "@/lib/catalog";
import { formatEUR } from "@/lib/site";

export function Price({
  product,
  amount,
  showOff = true,
}: {
  product: Product;
  amount?: number;
  showOff?: boolean;
}) {
  if (product.price == null) return <>{product.priceLabel ?? "On request"}</>;
  const off = promoPercent(product);
  const now = amount ?? product.price;
  const was =
    off != null && product.compareAt != null
      ? amount != null
        ? Math.round((product.compareAt / product.price) * now)
        : product.compareAt
      : null;

  if (was == null) return <>{formatEUR(now)}</>;

  return (
    <span className="price">
      <s className="price-was">{formatEUR(was)}</s>
      <span className="price-now">{formatEUR(now)}</span>
      {showOff ? <span className="price-off">−{off}%</span> : null}
    </span>
  );
}
