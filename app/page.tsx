import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { SPIRIT_COLORS, getProduct, productsIn } from "@/lib/catalog";
import { asset } from "@/lib/site";

export default function HomePage() {
  const entry = getProduct("mimir");
  const standard = getProduct("mimir-standard");
  const gift = getProduct("mimir-gift");
  const spirits = [entry, standard, gift].filter((item) => item != null);
  const partners = productsIn("partners").slice(0, 2);
  const keepsakes = productsIn("keepsakes");

  return (
    <>
      <section className="hero">
        <img
          src={asset("/products/hero-spirits.jpg")}
          alt="Three Mimir spirits: Ember, Mint, and Coral"
        />
        <div className="wrap hero-caption">
          <div>
            <p className="eyebrow">Launch colourways</p>
            <h1 className="display">Mimir</h1>
          </div>
          <Link className="link" href="/spirits/mimir">
            Shop the spirit
          </Link>
        </div>
      </section>

      <section className="wrap intro">
        <p className="eyebrow">GemTale</p>
        <h2 className="display">The gem it carries holds your story.</h2>
        <p className="lede">
          A small spirit for a bag or a pocket. Hold an unlocked phone against him once. Write the evening.
          Pass him on when the chapter is finished — yours stays sealed, and you can follow the next one.
        </p>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>The spirit</h2>
          <Link className="link" href="/spirits">
            View all
          </Link>
        </div>
        <ProductGrid products={spirits} />
        <ul className="color-row">
          {SPIRIT_COLORS.map((color) => (
            <li key={color.id}>
              <Link href={`/spirits/mimir?color=${color.id}`}>
                <span className="swatch" style={{ background: color.swatch }} />
                {color.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section">
        <div className="split">
          <img src={asset("/products/mimir-ember.jpg")} alt="Mimir in Ember, charcoal with a red base and an iridescent gem" />
          <div>
            <p className="eyebrow">From owner to owner</p>
            <p className="quote">He falls onward. You had your turn. The chapter you wrote stays yours.</p>
            <p className="lede">
              There is no battery and no subscription. The app that comes with him is free, including every
              entry you write. Premium, when you want it, is paid once.
            </p>
            <p style={{ marginTop: 22 }}>
              <Link className="link" href="/story">
                Read the story
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>For partners</h2>
          <Link className="link" href="/partners">
            Editions
          </Link>
        </div>
        <p className="lede" style={{ marginBottom: 28 }}>
          The same sculpt, in your colours, with your mark. A collaboration from about 500. A house gem that
          stays at the hotel, the hut, or the ship.
        </p>
        <ProductGrid products={partners} columns={2} />
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>Keepsakes</h2>
          <Link className="link" href="/keepsakes">
            View all
          </Link>
        </div>
        <ProductGrid products={keepsakes} />
      </section>
    </>
  );
}
