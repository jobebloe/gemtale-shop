import Stripe from "stripe";
import { isStripeCheckoutServerEnabled } from "@/lib/stripe-config";

let stripe: Stripe | null = null;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!stripe) {
    stripe = new Stripe(key, {
      typescript: true,
    });
  }
  return stripe;
}

export function assertStripeReady() {
  if (!isStripeCheckoutServerEnabled()) {
    throw new Error(
      "Stripe Checkout is not enabled. Set SHOP_PAYMENTS_MODE=stripe and STRIPE_SECRET_KEY (Node host only)."
    );
  }
}
