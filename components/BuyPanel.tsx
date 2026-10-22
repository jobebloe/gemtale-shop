"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { Qty } from "@/components/Qty";
import { ProductVisual } from "@/components/ProductVisual";
import { Price } from "@/components/Price";
import type { Product } from "@/lib/catalog";
import { findColor, promoPercent } from "@/lib/catalog";
import { formatEUR } from "@/lib/site";

export function BuyPanel({ product }: { product: Product }) {
  const params = useSearchParams();
  const queryColor = params.get("color");
  const colors = product.colors ?? [];
  const first = colors[0]?.id ?? null;
  const fallback = colors.some((color) => color.id === product.defaultColor)
    ? (product.defaultColor as string)
    : first;
  const [colorId, setColorId] = useState<string | null>(fallback);
  const [frame, setFrame] = useState<"color" | "pack">("color");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  useEffect(() => {
    const fromQuery = queryColor && colors.some((color) => color.id === queryColor) ? queryColor : fallback;
    setColorId(fromQuery);
    setFrame("color");
    setQty(1);
  }, [product.slug, queryColor, fallback]);

  const color = colorId ? findColor(product, colorId) : undefined;
  const src =
    frame === "pack" && product.packImage ? product.packImage : color?.image || product.image;
  const alt = color
    ? `${product.name} in ${color.name}, ${color.gem.toLowerCase()} gem`
    : product.imageAlt || product.name;

  return (
    <div className="pdp">
      <div className="pdp-visual">
        <div className="stage">
          <ProductVisual product={product} src={src} alt={alt} />
        </div>
        {product.packImage ? (
          <button
            className="link pack-toggle"
            type="button"
            onClick={() => setFrame((current) => (current === "color" ? "pack" : "color"))}
          >
            {frame === "color" ? "View the box" : "View the colour"}
          </button>
        ) : null}
        {frame === "pack" ? <p className="fine">The box, shown with Ember.</p> : null}
      </div>
      <div className="pdp-copy">
        <p className="eyebrow">{product.eyebrow}</p>
        <h1>{product.name}</h1>
        <p className="price-line">
          <Price product={product} />
        </p>
        {promoPercent(product) != null && product.compareAt != null ? (
          <p className="hint">Launch offer. Was {formatEUR(product.compareAt)}.</p>
        ) : null}
        {colors.length > 0 ? (
          <fieldset className="option">
            <legend>
              Colour <span>{color?.name}</span>
            </legend>
            <div className="swatches">
              {colors.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.name}
                  aria-pressed={item.id === colorId}
                  style={{ background: item.swatch }}
                  onClick={() => {
                    setColorId(item.id);
                    setFrame("color");
                  }}
                />
              ))}
            </div>
            {product.slug === "extra-gem" ? (
              <p className="hint">All five shades are in the photograph. Yours is the one you select.</p>
            ) : (
              <p className="hint">{color ? `${color.gem} gem` : ""}</p>
            )}
          </fieldset>
        ) : null}
        <div className="buy-row">
          {product.maxQty === 1 ? null : (
            <Qty value={qty} max={product.maxQty ?? 10} onChange={setQty} />
          )}
          <button
            className="btn-primary"
            type="button"
            onClick={() => {
              add(product.slug, colorId, qty);
              setAdded(true);
              window.setTimeout(() => setAdded(false), 1400);
            }}
          >
            {added ? "Added" : "Add to bag"}
          </button>
        </div>
        <p className="fine">
          {product.ships
            ? "Incl. VAT. Delivery in Germany €3.95, free from €25."
            : "Incl. VAT. Nothing to ship — the unlock sits on your account."}
        </p>
        <p className="fine">Reserving does not charge you. Payment opens at launch.</p>
        <div className="prose">
          {product.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
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
