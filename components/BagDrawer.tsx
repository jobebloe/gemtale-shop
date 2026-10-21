"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/components/CartProvider";
import { Qty } from "@/components/Qty";
import { summarize } from "@/lib/bag";
import { asset, formatEUR } from "@/lib/site";

export function BagDrawer() {
  const { lines, drawerOpen, setDrawerOpen, setQty, remove } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  const summary = summarize(lines);

  useEffect(() => {
    if (!drawerOpen) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, setDrawerOpen]);

  if (!drawerOpen) return null;

  return (
    <div className="drawer-root">
      <button className="backdrop" aria-label="Close bag" onClick={() => setDrawerOpen(false)} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Shopping bag">
        <div className="drawer-head">
          <h2>Bag</h2>
          <button ref={closeRef} className="nav-text" type="button" onClick={() => setDrawerOpen(false)}>
            Close
          </button>
        </div>
        <div className="drawer-lines">
          {summary.resolved.length === 0 ? (
            <p className="lede">Your bag is empty.</p>
          ) : (
            summary.resolved.map((item) => (
              <div className="line" key={item.line.key}>
                {item.image ? (
                  <img src={asset(item.image)} alt="" />
                ) : (
                  <div className="thumb">
                    <div className="plate">
                      <strong>{item.product.plate?.title}</strong>
                    </div>
                  </div>
                )}
                <div>
                  <Link
                    className="line-name"
                    href={`/${item.product.collection}/${item.product.slug}`}
                    onClick={() => setDrawerOpen(false)}
                  >
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
            ))
          )}
        </div>
        <div className="drawer-foot">
          <div>
            <p className="line-meta">Subtotal {formatEUR(summary.subtotal)}</p>
            <p className="line-meta">Incl. VAT</p>
          </div>
          <Link className="btn-primary" href="/bag" onClick={() => setDrawerOpen(false)}>
            View bag
          </Link>
        </div>
      </aside>
    </div>
  );
}
