import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { findColor, getProduct, variantLabel } from "@/lib/catalog";
import { summarize, type BagLine } from "@/lib/bag";
import { assertStripeReady, getStripe } from "@/lib/stripe";
import { shopOrigin } from "@/lib/stripe-config";
import { FREE_DELIVERY_CENTS, SHIPPING_CENTS } from "@/lib/site";

export const runtime = "nodejs";

type CheckoutBody = {
  lines?: BagLine[];
  email?: string;
  name?: string;
  note?: string;
  country?: string;
};

export async function POST(request: Request) {
  try {
    assertStripeReady();
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Checkout not available",
        mode: "preview",
      },
      { status: 503 }
    );
  }

  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const lines = Array.isArray(body.lines) ? body.lines : [];
  if (lines.length === 0) {
    return NextResponse.json({ error: "Bag is empty" }, { status: 400 });
  }

  for (const line of lines) {
    const product = getProduct(line.productId);
    if (!product || product.price == null) {
      return NextResponse.json(
        { error: `Unknown or non-buyable product: ${line.productId}` },
        { status: 400 }
      );
    }
    if (product.enquiry) {
      return NextResponse.json({ error: `${product.name} is enquiry-only` }, { status: 400 });
    }
    if (line.colorId && product.colors && !findColor(product, line.colorId)) {
      return NextResponse.json({ error: `Unknown colour for ${product.name}` }, { status: 400 });
    }
  }

  const summary = summarize(lines);
  if (summary.resolved.length === 0) {
    return NextResponse.json({ error: "Nothing to charge" }, { status: 400 });
  }
  if (summary.gemNeedsSpirit) {
    return NextResponse.json({ error: "An extra gem ships with a spirit" }, { status: 400 });
  }

  const origin = shopOrigin();
  const stripe = getStripe();

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = summary.resolved.map((item) => {
    const detail = variantLabel(item.product, item.line.colorId);
    const name = detail ? `${item.product.name} · ${detail}` : item.product.name;
    const envKey = `STRIPE_PRICE_${item.product.slug.replace(/-/g, "_").toUpperCase()}`;
    const envPrice = process.env[envKey]?.trim() || null;

    // Optional Dashboard Price IDs (no colour). Colourways use price_data so variants stay free-form.
    if (envPrice && !item.line.colorId) {
      return { price: envPrice, quantity: item.line.quantity };
    }

    return {
      quantity: item.line.quantity,
      price_data: {
        currency: "eur",
        unit_amount: item.product.price!,
        tax_behavior: "inclusive",
        product_data: {
          name,
          description: item.product.summary.slice(0, 200),
          metadata: {
            productId: item.product.slug,
            colorId: item.line.colorId ?? "",
          },
        },
      },
    };
  });

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: "payment",
    customer_email: body.email?.trim() || undefined,
    line_items: lineItems,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout/cancel`,
    billing_address_collection: "required",
    phone_number_collection: { enabled: true },
    metadata: {
      customer_name: body.name?.trim().slice(0, 120) || "",
      note: body.note?.trim().slice(0, 400) || "",
      country: body.country?.trim().slice(0, 80) || "",
      source: "gemtale-shop",
    },
    payment_intent_data: {
      metadata: {
        source: "gemtale-shop",
      },
    },
  };

  if (summary.physical > 0) {
    sessionParams.shipping_address_collection = {
      allowed_countries: [
        "DE",
        "AT",
        "CH",
        "NL",
        "BE",
        "FR",
        "IT",
        "ES",
        "PL",
        "CZ",
        "DK",
        "SE",
        "FI",
        "IE",
      ],
    };
    sessionParams.shipping_options = [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: summary.physical >= FREE_DELIVERY_CENTS ? 0 : SHIPPING_CENTS,
            currency: "eur",
          },
          display_name:
            summary.physical >= FREE_DELIVERY_CENTS
              ? "Free delivery (Germany / EU)"
              : "Delivery in Germany / EU",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 3 },
            maximum: { unit: "business_day", value: 10 },
          },
        },
      },
    ];
  }

  const session = await stripe.checkout.sessions.create(sessionParams);

  if (!session.url) {
    return NextResponse.json({ error: "Stripe did not return a checkout URL" }, { status: 502 });
  }

  return NextResponse.json({ url: session.url, id: session.id });
}
