import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductCard";
import { productsIn } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Keepsakes",
  description: "Premium, once. Printed books. An extra gem.",
};

export default function KeepsakesPage() {
  return (
    <div className="wrap">
      <header className="page-intro">
        <p className="eyebrow">Keepsakes</p>
        <h1>What stays</h1>
        <p className="lede">
          Premium is paid once — it is not a subscription, and there are no recurring costs. The books are
          printed from a timeline. An extra gem swaps into the bezel he already has.
        </p>
      </header>
      <ProductGrid products={productsIn("keepsakes")} />
      <div style={{ height: 72 }} />
    </div>
  );
}
