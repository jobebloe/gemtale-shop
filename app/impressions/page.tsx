import type { Metadata } from "next";
import Link from "next/link";
import { asset } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressions",
  description: "How Mimir travels — bags, desks, flights, and the hands that pass him on.",
};

const IMPRESSIONS = [
  {
    src: "/impressions/journey.jpg",
    alt: "A coral Mimir clipped to a hiking backpack overlooking a mountain lake",
    title: "On the road",
    line: "New places. Same you. New stories.",
  },
  {
    src: "/impressions/gift.jpg",
    alt: "Adult hands exchanging a gift box with a lavender Mimir inside",
    title: "As a gift",
    line: "Some moments are meant to be shared.",
  },
  {
    src: "/impressions/desk.jpg",
    alt: "An Ember Mimir resting on a green journal on a wooden desk",
    title: "At the desk",
    line: "A small companion for big feelings.",
  },
  {
    src: "/impressions/flight.jpg",
    alt: "A mint Mimir on a suitcase by an airplane window at sunset",
    title: "In the air",
    line: "Same dreams. New chapters.",
  },
  {
    src: "/impressions/campfire.jpg",
    alt: "A lavender Mimir on a rock in front of a campfire at night",
    title: "By the fire",
    line: "The little things make the biggest memories.",
  },
  {
    src: "/impressions/handover.jpg",
    alt: "Adult hands passing a coral Mimir outdoors",
    title: "Passed on",
    line: "Forward a moment. Continue the story.",
  },
  {
    src: "/impressions/window.jpg",
    alt: "A mint Mimir on an open notebook by a bright window",
    title: "In the morning",
    line: "From small moments to big tomorrows.",
  },
  {
    src: "/impressions/friends.jpg",
    alt: "Four adults watching a mountain sunset with a Mimir on a backpack",
    title: "Together",
    line: "Different people. Same story.",
  },
] as const;

export default function ImpressionsPage() {
  return (
    <div className="wrap impressions-page">
      <header className="page-intro">
        <p className="eyebrow">Impressions</p>
        <h1>Where he goes</h1>
        <p className="lede">
          Mimir is made to travel — clipped to a bag, left on a desk, carried onto a plane, and passed from
          hand to hand. These are impressions of how he lives with people.
        </p>
      </header>

      <ul className="impressions-grid">
        {IMPRESSIONS.map((item) => (
          <li key={item.src} className="impression">
            <figure>
              <img src={asset(item.src)} alt={item.alt} loading="lazy" />
              <figcaption>
                <span className="impression-title">{item.title}</span>
                <span className="impression-line">{item.line}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <p className="impressions-cta">
        <Link className="btn-primary" href="/spirits">
          Shop Mimir
        </Link>
      </p>
    </div>
  );
}
