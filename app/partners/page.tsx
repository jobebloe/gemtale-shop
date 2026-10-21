import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductCard";
import { productsIn } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Partners",
  description: "Collaboration editions, house gems, and corporate gifting. Mimir stays Mimir.",
};

export default function PartnersPage() {
  return (
    <div className="wrap">
      <header className="page-intro">
        <p className="eyebrow">Partners</p>
        <h1>Your colours. His name.</h1>
        <p className="lede">
          A co-branded edition is a filament change and an embossed mark — no tooling. Mimir stays ours. The
          colourways below are samples, not signed partnerships.
        </p>
      </header>
      <ProductGrid products={productsIn("partners")} />
      <div style={{ height: 72 }} />
    </div>
  );
}
