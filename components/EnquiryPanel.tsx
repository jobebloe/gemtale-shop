"use client";

import { FormEvent, useState } from "react";
import type { Product } from "@/lib/catalog";
import { CONTACT_EMAIL } from "@/lib/site";

export function EnquiryPanel({ product }: { product: Product }) {
  const min = product.enquiry?.minQty ?? 1;
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(String(min));
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const qty = Number(quantity);
    if (!name.trim() || !organisation.trim() || !email.includes("@")) {
      setError("Add your name, organisation, and email.");
      return;
    }
    if (!Number.isFinite(qty) || qty < min) {
      setError(`This edition starts at ${min}.`);
      return;
    }
    setError("");
    const body = [
      `Edition: ${product.name}`,
      `Name: ${name.trim()}`,
      `Organisation: ${organisation.trim()}`,
      `Email: ${email.trim()}`,
      `Quantity: ${qty}`,
      note.trim() ? `Note: ${note.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `GemTale — ${product.name}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <div className="pdp">
      <div>
        <div className="stage">
          {product.image ? (
            <img src={product.image} alt={product.imageAlt} />
          ) : (
            <div className="plate">
              <span>{product.plate?.kicker}</span>
              <strong>{product.plate?.title}</strong>
            </div>
          )}
          {product.sample ? <span className="sample-tag">Sample colourway</span> : null}
        </div>
      </div>
      <div>
        <p className="eyebrow">{product.eyebrow}</p>
        <h1>{product.name}</h1>
        <p className="price-line">{product.priceLabel}</p>
        <div className="prose">
          {product.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="fine">{product.enquiry?.unitNote}</p>
        <form className="fields" onSubmit={onSubmit} style={{ marginTop: 28 }}>
          <div className="field">
            <label htmlFor="enq-name">Name</label>
            <input id="enq-name" value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="enq-org">Organisation</label>
            <input
              id="enq-org"
              value={organisation}
              onChange={(event) => setOrganisation(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="enq-email">Email</label>
            <input
              id="enq-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="enq-qty">Quantity</label>
            <input
              id="enq-qty"
              inputMode="numeric"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="enq-note">Note</label>
            <textarea id="enq-note" value={note} onChange={(event) => setNote(event.target.value)} />
          </div>
          {error ? <p className="form-error">{error}</p> : null}
          <button className="btn-primary" type="submit">
            Request this edition
          </button>
          {sent ? (
            <p className="fine">
              Your email program should open with the request. If it does not, write to {CONTACT_EMAIL}.
            </p>
          ) : null}
        </form>
        <dl className="facts">
          {product.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
