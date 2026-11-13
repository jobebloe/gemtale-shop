import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductCard";
import { productsIn } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Collaboration editions, House Gems for brand storytelling, and corporate gifting. Mimir stays Mimir.",
};

export default function PartnersPage() {
  return (
    <div className="wrap">
      <header className="page-intro">
        <p className="eyebrow">Partners</p>
        <h1>Your colours. His name.</h1>
        <p className="lede">
          Co-branded editions are a filament change and an embossed mark — no tooling. A{" "}
          <strong>House Gem</strong> adds a B2B login so your team can tell an emotional brand story
          (optional co-branding; guest hand-off at hotels remains secondary). Mimir stays ours. The
          colourways below are samples, not signed partnerships.
        </p>
      </header>
      <ProductGrid products={productsIn("partners")} />
      <div style={{ height: 72 }} />
    </div>
  );
}
