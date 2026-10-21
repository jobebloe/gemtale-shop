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
            <h1 className="display">Products</h1>
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
              <div className="card-media">
                <img
                  src={asset("/products/card-keepsakes.jpg")}
                  alt="Five gems resting on a year book"
                />
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
        <ProductGrid products={keepsakes} cta="Buy now" />
      </section>
    </>
  );
}
