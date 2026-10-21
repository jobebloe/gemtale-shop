import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { SPIRIT_COLORS, getProduct, productsIn } from "@/lib/catalog";

export default function HomePage() {
  const entry = getProduct("mimir");
  const standard = getProduct("mimir-standard");
  const gift = getProduct("mimir-gift");
  const spirits = [entry, standard, gift].filter((item) => item != null);
  const keepsakes = productsIn("keepsakes");

  return (
    <>
      <section className="wrap">
        <header className="page-intro">
          <p className="eyebrow">Launch colourways</p>
          <h1>Mimir</h1>
          <p className="lede">
            A small spirit for a bag or a pocket. One sculpt, five launch colours, three ways to have him.
            The app is free with every spirit.
          </p>
          <p className="intro-cta">
            <Link className="btn-primary" href="/spirits/mimir">
              Buy now
            </Link>
          </p>
        </header>
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
