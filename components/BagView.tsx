"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { Qty } from "@/components/Qty";
import { ProductVisual } from "@/components/ProductVisual";
import { summarize } from "@/lib/bag";
import { formatEUR } from "@/lib/site";

export function BagView() {
  const { lines, ready, setQty, remove } = useCart();
  const summary = summarize(lines);

  if (!ready) {
    return (
      <div className="wrap bag-page">
        <h1>Bag</h1>
      </div>
    );
  }

  return (
    <div className="wrap bag-page">
      <h1>Bag</h1>
      {summary.resolved.length === 0 ? (
        <div>
          <p className="lede">Your bag is empty.</p>
          <p style={{ marginTop: 22 }}>
            <Link className="link" href="/spirits">
              Shop Mimir
            </Link>
          </p>
        </div>
      ) : (
        <>
          {summary.resolved.map((item) => (
            <div className="line" key={item.line.key}>
              <div className="thumb">
                <ProductVisual product={item.product} src={item.image} alt="" />
              </div>
              <div>
                <Link className="line-name" href={`/${item.product.collection}/${item.product.slug}`}>
                  {item.product.name}
                </Link>
                {item.label ? <p className="line-meta">{item.label}</p> : null}
                <Qty
                  value={item.line.quantity}
                  max={item.product.maxQty ?? 10}
                  onChange={(quantity) => setQty(item.line.key, quantity)}
                />
              </div>
              <div className="line-side">
                <p>{formatEUR(item.lineTotal)}</p>
                <button className="remove" type="button" onClick={() => remove(item.line.key)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="totals">
            <div>
              <span>Subtotal</span>
              <span>{formatEUR(summary.subtotal)}</span>
            </div>
            <div>
              <span>Delivery in Germany</span>
              <span>{summary.shipping === 0 ? "Free" : formatEUR(summary.shipping)}</span>
            </div>
            <div className="grand">
              <span>Total</span>
              <span>{formatEUR(summary.total)}</span>
            </div>
            <p className="fine">Includes {formatEUR(summary.vat)} VAT. The rate shown is for Germany.</p>
            {summary.untilFree > 0 ? (
              <p className="fine">{formatEUR(summary.untilFree)} until delivery in Germany is free.</p>
            ) : summary.physical > 0 ? (
              <p className="fine">Delivery in Germany is free with this bag.</p>
            ) : null}
          </div>
          {summary.gemNeedsSpirit ? (
            <p className="notice">An extra gem ships with a spirit. Add Mimir to this bag.</p>
          ) : null}
          <div className="bag-actions">
            {summary.gemNeedsSpirit ? (
              <Link className="btn-primary" href="/spirits">
                Add a spirit
              </Link>
            ) : (
              <Link className="btn-primary" href="/checkout">
                Reserve
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
