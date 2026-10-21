"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { summarize } from "@/lib/bag";
import { formatEUR } from "@/lib/site";

export const RESERVATION_KEY = "gemtale-shop-reservation";

export function CheckoutForm() {
  const { lines, ready, clear } = useCart();
  const summary = summarize(lines);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Germany");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  if (!ready) {
    return (
      <div className="wrap checkout-page">
        <h1>Reserve</h1>
      </div>
    );
  }

  if (summary.resolved.length === 0) {
    return (
      <div className="wrap checkout-page">
        <h1>Reserve</h1>
        <p className="lede">Your bag is empty.</p>
        <p style={{ marginTop: 22 }}>
          <Link className="link" href="/spirits">
            Shop Mimir
          </Link>
        </p>
      </div>
    );
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (summary.gemNeedsSpirit) {
      setError("An extra gem ships with a spirit.");
      return;
    }
    if (!name.trim() || !email.includes("@")) {
      setError("Add the name and email we should write to.");
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
      <h1>Reserve</h1>
      <div className="checkout">
        <form className="fields" onSubmit={onSubmit}>
          <p className="lede">
            Tell us where to write. This preview keeps the reservation in this browser. Nothing is charged,
            and no contract is formed.
          </p>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
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
            <p className="notice">An extra gem ships with a spirit. Add Mimir before reserving.</p>
          ) : null}
          {error ? <p className="form-error">{error}</p> : null}
          <button className="btn-primary" type="submit" disabled={summary.gemNeedsSpirit}>
            Reserve this bag
          </button>
        </form>
        <aside className="summary" aria-label="Order summary">
          {summary.resolved.map((item) => (
            <div key={item.line.key}>
              <span>
                {item.product.name}
                {item.label ? ` · ${item.label}` : ""} × {item.line.quantity}
              </span>
              <span>{formatEUR(item.lineTotal)}</span>
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
