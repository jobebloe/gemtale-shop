import type { Product } from "@/lib/catalog";
import { Mark } from "@/components/Mark";
import { asset } from "@/lib/site";

export function PremiumCover() {
  return (
    <div className="premium-cover">
      <span className="premium-badge" aria-hidden="true">
        <Mark />
      </span>
      <strong>Premium</strong>
    </div>
  );
}

export function ProductVisual({
  product,
  src,
  alt,
}: {
  product: Product;
  src?: string;
  alt?: string;
}) {
  if (product.slug === "premium") return <PremiumCover />;
  const image = src || product.image;
  if (image) {
    return <img src={asset(image)} alt={alt || product.imageAlt || product.name} />;
  }
  return (
    <div className="plate">
      <span>{product.plate?.kicker}</span>
      <strong>{product.plate?.title}</strong>
    </div>
  );
}
