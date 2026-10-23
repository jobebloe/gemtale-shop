import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductCard";
import { productsIn } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Spirits",
  description: "Mimir in five launch colours. Starter €12.99, Shine €19.99, Premium launch offer €26.99.",
};

export default function SpiritsPage() {
  return (
    <div className="wrap">
      <header className="page-intro">
        <p className="eyebrow">Spirits</p>
        <h1>Mimir</h1>
        <p className="lede">
          One sculpt, five launch colours, three ways to have him. The app is free with every spirit.
        </p>
      </header>
      <ProductGrid products={productsIn("spirits")} />
      <div style={{ height: 72 }} />
    </div>
  );
}
