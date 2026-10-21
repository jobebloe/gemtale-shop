import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { SPIRIT_COLORS, getProduct, productsIn } from "@/lib/catalog";
import { asset } from "@/lib/site";

export default function HomePage() {
  const entry = getProduct("mimir");
  const standard = getProduct("mimir-standard");
  const gift = getProduct("mimir-gift");
  const spirits = [entry, standard, gift].filter((item) => item != null);
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
        <ProductGrid products={spirits} cta="Buy now" />
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

      <section className="wrap section">
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
