"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { Price } from "@/components/Price";
import { summarize } from "@/lib/bag";
import { formatEUR } from "@/lib/site";
import { isStripeCheckoutUiEnabled } from "@/lib/stripe-config";

export const RESERVATION_KEY = "gemtale-shop-reservation";

export function CheckoutForm() {
  const { lines, ready, clear } = useCart();
  const summary = summarize(lines);
  const router = useRouter();
  const stripeUi = isStripeCheckoutUiEnabled();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Germany");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!ready) {
    return (
      <div className="wrap checkout-page">
        <h1>{stripeUi ? "Checkout" : "Reserve"}</h1>
      </div>
    );
  }

  if (summary.resolved.length === 0) {
    return (
      <div className="wrap checkout-page">
        <h1>{stripeUi ? "Checkout" : "Reserve"}</h1>
        <p className="lede">Your bag is empty.</p>
        <p style={{ marginTop: 22 }}>
          <Link className="link" href="/spirits">
            Shop Mimir
          </Link>
        </p>
      </div>
    );
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (summary.gemNeedsSpirit) {
      setError("An extra gem ships with a spirit.");
      return;
    }
    if (!name.trim() || !email.includes("@")) {
      setError("Add the name and email we should write to.");
      return;
    }

    if (stripeUi) {
      setBusy(true);
      setError("");
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lines,
            name: name.trim(),
            email: email.trim(),
            country,
            note: note.trim(),
          }),
        });
        const data = (await res.json()) as { url?: string; error?: string; mode?: string };
        if (!res.ok || !data.url) {
          setError(
            data.error ??
              "Checkout is not open yet. Keep the shop in preview, or enable Stripe on a Node host."
          );
          setBusy(false);
          return;
        }
        clear();
        window.location.href = data.url;
      } catch {
        setError("Could not reach checkout. Try again in a moment.");
        setBusy(false);
      }
      return;
    }

    const reservation = {
      name: name.trim(),
      email: email.trim(),
      country,
      note: note.trim(),
      lines: summary.resolved.map((item) => ({
        name: item.product.name,
        detail: item.label,
        qty: item.line.quantity,
        total: item.lineTotal,
      })),
      subtotal: summary.subtotal,
      shipping: summary.shipping,
      vat: summary.vat,
      total: summary.total,
    };
    sessionStorage.setItem(RESERVATION_KEY, JSON.stringify(reservation));
    clear();
    router.push("/checkout/reserved");
  }

  return (
    <div className="wrap checkout-page">
      <h1>{stripeUi ? "Checkout" : "Reserve"}</h1>
      <div className="checkout">
        <form className="fields" onSubmit={onSubmit}>
          <p className="lede">
            {stripeUi
              ? "Tell us where to write, then continue to secure card payment with Stripe. Prices include VAT."
              : "Tell us where to write. This preview keeps the reservation in this browser. Nothing is charged, and no contract is formed."}
          </p>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="country">Country</label>
            <select id="country" value={country} onChange={(event) => setCountry(event.target.value)}>
              <option>Germany</option>
              <option>Austria</option>
              <option>Switzerland</option>
              <option>Other EU</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="note">Note</label>
            <textarea id="note" value={note} onChange={(event) => setNote(event.target.value)} />
          </div>
          {summary.gemNeedsSpirit ? (
            <p className="notice">An extra gem ships with a spirit. Add Mimir before continuing.</p>
          ) : null}
          {error ? <p className="form-error">{error}</p> : null}
          <button className="btn-primary" type="submit" disabled={summary.gemNeedsSpirit || busy}>
            {busy
              ? "Opening Stripe…"
              : stripeUi
                ? "Continue to payment"
                : "Reserve this bag"}
          </button>
          {stripeUi ? (
            <p className="fine" style={{ marginTop: 12 }}>
              Card details are entered on Stripe — never on this site.
            </p>
          ) : null}
        </form>
        <aside className="summary" aria-label="Order summary">
          {summary.resolved.map((item) => (
            <div key={item.line.key}>
              <span>
                {item.product.name}
                {item.label ? ` · ${item.label}` : ""} × {item.line.quantity}
              </span>
              <span>
                <Price product={item.product} amount={item.lineTotal} showOff={false} />
              </span>
            </div>
          ))}
          <div>
            <span>Delivery in Germany</span>
            <span>{summary.shipping === 0 ? "Free" : formatEUR(summary.shipping)}</span>
          </div>
          <div className="grand">
            <span>Total</span>
            <span>{formatEUR(summary.total)}</span>
          </div>
          <p className="fine">Includes {formatEUR(summary.vat)} VAT.</p>
        </aside>
      </div>
    </div>
  );
}
