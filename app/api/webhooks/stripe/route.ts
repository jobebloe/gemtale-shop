import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

/**
 * Stripe webhook stub — verify signature, acknowledge events.
 * Fulfilment / invoicing hooks go here when going live (email, 3PL, Rechnung).
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!secret || !process.env.STRIPE_SECRET_KEY?.trim()) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const rawBody = await request.text();
  const stripe = getStripe();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      // TODO (go-live): persist order, send confirmation, create invoice, notify fulfilment
      break;
    case "checkout.session.expired":
      break;
    case "payment_intent.payment_failed":
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true, type: event.type });
}
