import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The story",
  description: "Mimir carries a gem. The gem holds the chapter. Then he travels on.",
};

export default function StoryPage() {
  return (
    <article className="wrap prose-page">
      <p className="eyebrow">Mimir</p>
      <h1>A spirit who keeps falling onward.</h1>
      <p>
        Mimir is the character the product is made from. In the story he falls from world to world, and he
        attaches himself to an ordinary person so their days become a chapter. That person is whoever is
        holding him.
      </p>
      <h2>What you do with him</h2>
      <p>
        Hold an unlocked phone against him once. He is paired. In the evening you leave a mood, a note, a
        photograph, and the app writes it into an adventure log in a warm voice. The spirit himself has no
        battery. The story lives with the gem he carries.
      </p>
      <h2>What happens when you pass him on</h2>
      <p>
        Giving him away is the point. Your chapter freezes. The next person pairs him and continues. You can
        follow where he goes. The gem is the thread through every owner.
      </p>
      <p>
        The app’s base — your own writing, the handover, and a look at the new chapter — is free with every
        spirit. Premium is a one-time unlock. There is no subscription.
      </p>
      <p>
        <Link className="link" href="/spirits/mimir">
          Shop Mimir
        </Link>
      </p>
    </article>
  );
}
