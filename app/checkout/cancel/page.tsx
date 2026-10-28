import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Checkout cancelled" };

export default function CheckoutCancelPage() {
  return (
    <div className="wrap checkout-page">
      <h1>Checkout cancelled</h1>
      <p className="lede">Nothing was charged. Your bag is still here when you are ready.</p>
      <p style={{ marginTop: 22 }}>
        <Link className="link" href="/bag">
          Return to bag
        </Link>
      </p>
    </div>
  );
}
