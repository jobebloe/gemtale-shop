import Link from "next/link";
import { ProductCard, ProductGrid } from "@/components/ProductCard";
import { SPIRIT_COLORS, getProduct, productsIn, type Product } from "@/lib/catalog";
import { asset } from "@/lib/site";

export default function HomePage() {
  const spirits = [
    { product: getProduct("mimir"), image: "/products/card-mimir.jpg" },
    { product: getProduct("mimir-standard"), image: "/products/card-standard.jpg" },
    { product: getProduct("mimir-gift"), image: "/products/card-gift.jpg" },
  ].filter((item): item is { product: Product; image: string } => Boolean(item.product));
  const keepsakes = productsIn("keepsakes");

  return (
    <>
      <section className="hero">
        <img
          src={asset("/products/hero-spirits.jpg")}
          alt="Three Mimir spirits standing in a line: Ember, Mint, and Coral"
        />
        <div className="wrap hero-caption">
          <div>
            <p className="eyebrow">Launch colourways</p>
            <h1 className="display">Mimir</h1>
          </div>
        </div>
      </section>

      <section className="wrap offer">
        <ul className="grid grid-2">
          {spirits.map((item) => (
            <li key={item.product.slug}>
              <ProductCard product={item.product} cta="Buy now" image={item.image} />
            </li>
          ))}
          <li>
            <a className="card" href="#keepsakes">
              <div className="card-media keepsake-tile">
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M12 8h24a2 2 0 0 1 2 2v30H16a4 4 0 0 1-4-4V8Z" />
                  <path d="M12 8v28a4 4 0 0 0 4 4h26" />
                  <path d="M16 8v34" />
                  <path d="M22 17h12M22 23h12M22 29h8" />
                </svg>
              </div>
              <div className="card-meta">
                <span className="card-name">Keepsakes &amp; Accessories</span>
              </div>
              <span className="btn-primary btn-card">View</span>
            </a>
          </li>
        </ul>
        <p className="color-note">
          <span className="color-dots" aria-hidden="true">
            {SPIRIT_COLORS.map((color) => (
              <span key={color.id} className="swatch" style={{ background: color.swatch }} />
            ))}
          </span>
          Each spirit comes in five colours — Ember, Mint, Coral, Lavender, and Sun. Choose the colour on the next page.
        </p>
      </section>

      <section className="wrap section how">
        <p className="eyebrow">The story</p>
        <h2>How it works</h2>
        <p className="quote">He falls onward. You had your turn. The chapter you wrote stays yours.</p>
        <p className="lede">
          Hold an unlocked phone against him once. Write the evening. Pass him on when the chapter is
          finished — yours stays sealed, and you can follow the next one. There is no battery and no
          subscription. The app is free, including every entry you write. Premium, when you want it, is
          paid once.
        </p>
        <p className="how-link">
          <Link className="link" href="/story">
            Read the story
          </Link>
        </p>
      </section>

      <section className="wrap section" id="keepsakes">
        <div className="section-head">
          <h2>Keepsakes &amp; Accessories</h2>
          <Link className="link" href="/keepsakes">
            View all
          </Link>
        </div>
        <ProductGrid products={keepsakes} />
      </section>
    </>
  );
}
