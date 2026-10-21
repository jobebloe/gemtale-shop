import { findColor, getProduct, variantLabel, type Product } from "@/lib/catalog";
import { FREE_DELIVERY_CENTS, SHIPPING_CENTS, VAT_RATE } from "@/lib/site";

export type BagLine = {
  key: string;
  productId: string;
  colorId: string | null;
  quantity: number;
};

export function lineKey(productId: string, colorId: string | null) {
  return `${productId}:${colorId ?? "_"}`;
}

export type ResolvedLine = {
  line: BagLine;
  product: Product;
  label: string | null;
  image: string;
  lineTotal: number;
};

export function summarize(lines: BagLine[]) {
  const resolved: ResolvedLine[] = [];
  let subtotal = 0;
  let physical = 0;

  for (const line of lines) {
    const product = getProduct(line.productId);
    if (!product || product.price == null) continue;
    const color = line.colorId ? findColor(product, line.colorId) : undefined;
    const lineTotal = product.price * line.quantity;
    subtotal += lineTotal;
    if (product.ships) physical += lineTotal;
    resolved.push({
      line,
      product,
      label: variantLabel(product, line.colorId),
      image: color?.image || product.image,
      lineTotal,
    });
  }

  const shipping = physical <= 0 ? 0 : physical >= FREE_DELIVERY_CENTS ? 0 : SHIPPING_CENTS;
  const total = subtotal + shipping;
  const net = Math.round(total / VAT_RATE);
  const vat = total - net;
  const untilFree = physical > 0 && physical < FREE_DELIVERY_CENTS ? FREE_DELIVERY_CENTS - physical : 0;
  const hasSpirit = resolved.some((item) => item.product.collection === "spirits");
  const hasLooseGem = resolved.some((item) => item.product.slug === "extra-gem");

  return {
    resolved,
    subtotal,
    physical,
    shipping,
    total,
    vat,
    untilFree,
    gemNeedsSpirit: hasLooseGem && !hasSpirit,
  };
}
