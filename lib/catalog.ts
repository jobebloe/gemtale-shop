export type Colorway = {
  id: string;
  name: string;
  gem: string;
  swatch: string;
  image: string;
};

export type Fact = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  collection: "spirits" | "keepsakes" | "partners";
  eyebrow: string;
  summary: string;
  paragraphs: string[];
  price: number | null;
  priceLabel?: string;
  image: string;
  imageAlt: string;
  packImage?: string;
  defaultColor?: string;
  plate?: { kicker: string; title: string };
  colors?: Colorway[];
  facts: Fact[];
  ships: boolean;
  maxQty?: number;
  sample?: boolean;
  enquiry?: { minQty: number; unitNote: string };
  related: string[];
};

export const SPIRIT_COLORS: Colorway[] = [
  {
    id: "ember",
    name: "Ember",
    gem: "Iridescent",
    swatch: "#2c2c2c",
    image: "/products/mimir-ember.jpg",
  },
  {
    id: "mint",
    name: "Mint",
    gem: "Amber",
    swatch: "#a9cfc3",
    image: "/products/mimir-mint.jpg",
  },
  {
    id: "coral",
    name: "Coral",
    gem: "Sea",
    swatch: "#e07a62",
    image: "/products/mimir-coral.jpg",
  },
  {
    id: "lavender",
    name: "Lavender",
    gem: "Champagne",
    swatch: "#c4b4dc",
    image: "/products/mimir-lavender.jpg",
  },
  {
    id: "sun",
    name: "Sun",
    gem: "Violet",
    swatch: "#e2b83a",
    image: "/products/mimir-sun.jpg",
  },
];

export const GEM_COLORS: Colorway[] = [
  {
    id: "iris",
    name: "Iris",
    gem: "Iridescent",
    swatch: "linear-gradient(135deg, #6a7cff, #3ddec8 46%, #f0c14a)",
    image: "/products/extra-gems.jpg",
  },
  {
    id: "amber",
    name: "Amber",
    gem: "Amber",
    swatch: "#e2a33a",
    image: "/products/extra-gems.jpg",
  },
  {
    id: "sea",
    name: "Sea",
    gem: "Sea",
    swatch: "#1f8f93",
    image: "/products/extra-gems.jpg",
  },
  {
    id: "champagne",
    name: "Champagne",
    gem: "Champagne",
    swatch: "#d9d0c3",
    image: "/products/extra-gems.jpg",
  },
  {
    id: "violet",
    name: "Violet",
    gem: "Violet",
    swatch: "#7a4ea3",
    image: "/products/extra-gems.jpg",
  },
];

const spiritShared: Fact[] = [
  { label: "Sculpt", value: "One figure, with a loop for a bag or a key" },
  { label: "Size", value: "36 × 39.6 × 41.2 mm, including the loop" },
  { label: "Material", value: "PETG. Chosen so he can live on a bag and be passed on" },
  { label: "Inside", value: "One passive NFC tag. No battery, no cable, no charging" },
  { label: "Pairing", value: "Unlock your phone and hold it against him once" },
  { label: "The app", value: "Free with every spirit. Your own entries are never locked" },
  { label: "Delivery", value: "€3.95 in Germany, free from €25" },
];

export const products: Product[] = [
  {
    slug: "mimir",
    name: "Mimir Standard",
    collection: "spirits",
    eyebrow: "Entry",
    summary:
      "The spirit in the colour of the filament, with a sleeve and a Gem # card. €12.99, incl. VAT.",
    paragraphs: [
      "Mimir is a small spirit for a bag or a pocket. He carries a gem, and that gem is the thread through every chapter written on him.",
      "This is the entry finish: colour from the print, a printed sleeve, and a card with his Gem #. The app that opens when you pair him is free. Nothing about it renews.",
    ],
    price: 1299,
    defaultColor: "mint",
    image: "/products/mimir-mint.jpg",
    imageAlt: "Mimir Standard in mint, with a cream base and an amber gem",
    colors: SPIRIT_COLORS,
    facts: [
      ...spiritShared,
      { label: "Finish", value: "Colour from the filament" },
      { label: "In the box", value: "The spirit and a Gem # card, in a sleeve" },
    ],
    ships: true,
    related: ["mimir-standard", "mimir-gift", "extra-gem"],
  },
  {
    slug: "mimir-standard",
    name: "Mimir Gift",
    collection: "spirits",
    eyebrow: "For a gift",
    summary: "The same sculpt, painted and packed in a rigid gift box. €19.99, incl. VAT.",
    paragraphs: [
      "The same spirit, with a painted finish and a rigid box. This is the one people give — a birthday, a farewell, a new chapter in someone else’s hands.",
      "Pick a launch colour. The gem set in front of him belongs to that colourway. One tap with an unlocked phone, and the story is his.",
    ],
    price: 1999,
    defaultColor: "lavender",
    image: "/products/mimir-lavender.jpg",
    imageAlt: "Mimir Gift in lavender, with an ivory base and a champagne gem",
    colors: SPIRIT_COLORS,
    facts: [
      ...spiritShared,
      { label: "Finish", value: "Painted" },
      { label: "In the box", value: "The spirit and a Gem # card, in a rigid gift box" },
    ],
    ships: true,
    related: ["mimir", "mimir-gift", "year-book"],
  },
  {
    slug: "mimir-gift",
    name: "Mimir Premium",
    collection: "spirits",
    eyebrow: "The bundle",
    summary:
      "Painted, boxed, and the one-time GemTale Premium unlock is included. €29.99, incl. VAT.",
    paragraphs: [
      "Painted, boxed, and GemTale Premium is included for your account. Premium is paid once. It is not a subscription, and there are no recurring costs.",
      "Premium adds further story voices, the full chain of owners side by side, more than one spirit on the account, and a PDF of a chapter or a year.",
    ],
    price: 2999,
    defaultColor: "ember",
    image: "/products/mimir-gift.jpg",
    imageAlt: "Mimir Premium beside an open charcoal gift box",
    packImage: "/products/mimir-gift.jpg",
    colors: SPIRIT_COLORS,
    facts: [
      ...spiritShared,
      { label: "Finish", value: "Painted" },
      { label: "In the box", value: "The spirit and a Gem # card, in a rigid gift box" },
      { label: "Included", value: "GemTale Premium, once, for the account that pairs him" },
    ],
    ships: true,
    related: ["mimir-standard", "premium", "year-book"],
  },
  {
    slug: "extra-gem",
    name: "Extra gem",
    collection: "keepsakes",
    eyebrow: "The gem",
    summary: "A printed gem in another colour, made to swap into the same bezel. €3.99.",
    paragraphs: [
      "A printed gem in another colour, about 9.6 mm, made to sit in the bezel he already has.",
      "It ships with a spirit. Choose the shade, and add him to the same bag.",
    ],
    price: 399,
    image: "/products/extra-gems.jpg",
    imageAlt: "Five gem shades: iris, amber, sea, champagne, and violet",
    colors: GEM_COLORS,
    facts: [
      { label: "Size", value: "About 9.6 mm across" },
      { label: "Material", value: "Printed, in the colour you choose" },
      { label: "Ships", value: "With a spirit in the same order" },
    ],
    ships: true,
    related: ["mimir", "mimir-standard", "mimir-gift"],
  },
  {
    slug: "premium",
    name: "GemTale Premium",
    collection: "keepsakes",
    eyebrow: "The app",
    summary: "The one-time unlock. €24.99, kept forever. It is not a subscription.",
    paragraphs: [
      "Paid once, and kept. It is not a subscription, and there are no recurring costs.",
      "Your own writing stays free either way — every entry, the handover, and the knowledge that a new chapter has begun. Premium is for everything around that.",
    ],
    price: 2499,
    image: "",
    imageAlt: "Premium",
    plate: { kicker: "Once", title: "Premium" },
    facts: [
      { label: "Price", value: "€24.99 once, per account" },
      { label: "Story voices", value: "Further styles, beyond the basic story engine" },
      { label: "The chain", value: "The full line of owners, side by side" },
      { label: "Spirits", value: "More than one spirit on the account" },
      { label: "Export", value: "A PDF of any chapter or year" },
      { label: "Also", value: "Extended question packs, mood trends, richer editing" },
      { label: "Stays free", value: "Your own entries, handover, and a look at the new chapter" },
    ],
    ships: false,
    maxQty: 1,
    related: ["mimir-gift", "year-book", "full-tale"],
  },
  {
    slug: "year-book",
    name: "The Year Book",
    collection: "keepsakes",
    eyebrow: "Keepsake",
    summary: "A hardcover of one year of entries and photographs. €44.",
    paragraphs: [
      "A hardcover of one year: the entries and the photographs, printed when that year is closed.",
      "The pages follow the A5 layout already in the app. Printing opens with our print partner. Reserving one here does not charge you.",
    ],
    price: 4400,
    image: "/products/year-book.jpg",
    imageAlt: "An ivory hardcover with a small iridescent gem set in the cover",
    plate: { kicker: "January", title: "The Year Book" },
    facts: [
      { label: "Price", value: "€44, incl. VAT" },
      { label: "Form", value: "Hardcover, in the app’s A5 layout" },
      { label: "Inside", value: "Your entries and photographs from the year" },
      { label: "Printed", value: "To order, when keepsake checkout opens" },
    ],
    ships: true,
    related: ["chapter-book", "full-tale", "premium"],
  },
  {
    slug: "chapter-book",
    name: "The Chapter Book",
    collection: "keepsakes",
    eyebrow: "Keepsake",
    summary: "Your sealed chapter, printed when you hand the spirit on. €24.",
    paragraphs: [
      "The chapter that seals when you pass him on, printed as its own book.",
      "It is the part that stays yours after he travels. Printing opens with our print partner.",
    ],
    price: 2400,
    image: "/products/chapter-book.jpg",
    imageAlt: "A slim charcoal hardcover with a small amber gem set in the cover",
    plate: { kicker: "At handover", title: "The Chapter Book" },
    facts: [
      { label: "Price", value: "€24, incl. VAT" },
      { label: "Inside", value: "The sealed chapter of one owner" },
      { label: "When", value: "Printed as you hand the spirit on" },
      { label: "Printed", value: "To order, when keepsake checkout opens" },
    ],
    ships: true,
    related: ["year-book", "full-tale", "mimir"],
  },
  {
    slug: "full-tale",
    name: "The Full Tale",
    collection: "keepsakes",
    eyebrow: "Keepsake",
    summary: "The complete chain of one spirit, every owner, in one book. €59.",
    paragraphs: [
      "Every owner of one spirit, in one book — from the first chapter to the one being written now.",
      "Printed to order once keepsake checkout opens.",
    ],
    price: 5900,
    image: "/products/full-tale.jpg",
    imageAlt: "A thick stone-linen hardcover with a small gold gem set in the cover",
    plate: { kicker: "The chain", title: "The Full Tale" },
    facts: [
      { label: "Price", value: "€59, incl. VAT" },
      { label: "Inside", value: "The complete multi-owner chain of one spirit" },
      { label: "Printed", value: "To order, when keepsake checkout opens" },
    ],
    ships: true,
    related: ["year-book", "chapter-book", "premium"],
  },
  {
    slug: "collaboration",
    name: "Collaboration",
    collection: "partners",
    eyebrow: "Brand edition",
    summary:
      "The same sculpt in a partner colourway, with an embossed mark. From about 500 units.",
    paragraphs: [
      "A partner colourway of the same sculpt. The colour changes, the gem can change, and the mark is embossed. Mimir stays Mimir — a collaboration dresses him.",
      "The piece shown here is the yellow-and-black outdoor colourway. On a real edition the mark is yours. About 500 units, ready in three to four weeks.",
    ],
    price: null,
    priceLabel: "€7–€8",
    image: "/products/mimir-trail.jpg",
    imageAlt: "Sample collaboration spirit in yellow with a black base and an amber gem",
    sample: true,
    facts: [
      { label: "Minimum", value: "About 500 units" },
      { label: "Lead time", value: "Three to four weeks" },
      { label: "Wholesale", value: "About €7 to €8 a unit" },
      { label: "What changes", value: "Colour, gem, and an embossed mark" },
      { label: "What stays", value: "The sculpt, the app, and the name Mimir" },
      { label: "Shown", value: "Yellow and black, the outdoor sample" },
    ],
    ships: true,
    enquiry: {
      minQty: 500,
      unitNote: "Wholesale is about €7 to €8 a unit. Freight is arranged with the order.",
    },
    related: ["house-gem", "corporate"],
  },
  {
    slug: "house-gem",
    name: "House Gem",
    collection: "partners",
    eyebrow: "For a house",
    summary:
      "A spirit that stays at a hotel, a hut, or a ship. Guests write, and leave with their chapter.",
    paragraphs: [
      "This one stays with the house. Guests write during the stay. At the desk they can leave with their own chapter.",
      "A small batch, often two to twelve, in the house’s colours. The spirit shown here is the limestone and forest sample. The repeating sale is the one at the desk.",
    ],
    price: null,
    priceLabel: "On request",
    image: "/products/mimir-house.jpg",
    imageAlt: "House Gem sample in limestone with a forest-green base and a honey gem",
    sample: true,
    facts: [
      { label: "Batch", value: "Often 2 to 12" },
      { label: "Where he lives", value: "A hotel, a hut, or a ship" },
      { label: "For the guest", value: "A chapter written during the stay, theirs to keep" },
      { label: "Shown", value: "Limestone and forest, the hospitality sample" },
      { label: "Price", value: "Quoted for the house" },
    ],
    ships: true,
    enquiry: {
      minQty: 2,
      unitNote: "Quoted for the batch. A house edition is often between 2 and 12 spirits.",
    },
    related: ["collaboration", "corporate"],
  },
  {
    slug: "corporate",
    name: "Corporate gifting",
    collection: "partners",
    eyebrow: "For teams",
    summary: "The spirit as a farewell, an anniversary, or a welcome. From about 200 units.",
    paragraphs: [
      "Retirement, anniversaries, a relocation, a farewell, a first day. The same spirit, in the launch colours, given with a chapter already waiting.",
      "From about 200 units, between €12 and €16. Tell us the occasion and the quantity.",
    ],
    price: null,
    priceLabel: "€12–€16",
    image: "",
    imageAlt: "",
    plate: { kicker: "From 200", title: "For a team" },
    facts: [
      { label: "Minimum", value: "About 200 units" },
      { label: "Price", value: "About €12 to €16 a unit" },
      { label: "Occasions", value: "Retirement, anniversaries, relocation, farewells, onboarding" },
      { label: "The object", value: "The same sculpt, in the launch colours" },
    ],
    ships: true,
    enquiry: {
      minQty: 200,
      unitNote: "About €12 to €16 a unit, from 200.",
    },
    related: ["collaboration", "house-gem", "mimir-standard"],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function productsIn(collection: Product["collection"]) {
  return products.filter((product) => product.collection === collection);
}

export function findColor(product: Product, colorId: string) {
  return product.colors?.find((color) => color.id === colorId);
}

export function variantLabel(product: Product, colorId: string | null) {
  if (!colorId) return null;
  const color = findColor(product, colorId);
  if (!color) return null;
  if (product.slug === "extra-gem") return color.name;
  return `${color.name} · ${color.gem.toLowerCase()} gem`;
}
