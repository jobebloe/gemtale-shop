/**
 * Stripe is wired but off by default.
 * Live Checkout only runs when SHOP_PAYMENTS_MODE=stripe and STRIPE_SECRET_KEY is set
 * on a Node host (e.g. Vercel). GitHub Pages static export cannot take payments.
 */

export type PaymentsMode = "preview" | "stripe";

export function getPaymentsMode(): PaymentsMode {
  const mode = (process.env.SHOP_PAYMENTS_MODE || process.env.NEXT_PUBLIC_SHOP_PAYMENTS_MODE || "preview")
    .trim()
    .toLowerCase();
  return mode === "stripe" ? "stripe" : "preview";
}

/** Client-safe: whether the UI should attempt Stripe Checkout. */
export function isStripeCheckoutUiEnabled(): boolean {
  return (
    (process.env.NEXT_PUBLIC_SHOP_PAYMENTS_MODE || "preview").trim().toLowerCase() === "stripe"
  );
}

export function isStripeCheckoutServerEnabled(): boolean {
  return getPaymentsMode() === "stripe" && Boolean(process.env.STRIPE_SECRET_KEY?.trim());
}

export function shopOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SHOP_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
