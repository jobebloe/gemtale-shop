# GemTale shop

A preview of the GemTale online shop: Mimir, the keepsakes, and the partner editions.

Prices and product facts follow the October 2026 business plan. Photographs are studio presentations of the current sculpt, in the launch colours. Payment is not connected. A reservation stays in the browser and does not form a contract.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The published preview is [https://jobebloe.github.io/gemtale-shop/](https://jobebloe.github.io/gemtale-shop/).

## Payments (Stripe-ready, not live)

Checkout is prepared for **Stripe Checkout** but stays in **preview** by default (browser reservation only — no charge, no contract).

| Host | What works |
| --- | --- |
| GitHub Pages (`GITHUB_PAGES=1` static export) | Preview / reserve only — **no** `/api` routes |
| Local `npm run dev` or **Vercel** (Node) | Can enable Stripe when you set env vars |

### Enable Stripe later (test mode first)

1. Create a Stripe account (EU) and copy **test** secret + publishable keys.
2. Deploy this shop to **Vercel** (not only GitHub Pages) so `/api/checkout` and `/api/webhooks/stripe` run.
3. Copy `.env.example` → `.env.local` (local) or Vercel env:
   - `SHOP_PAYMENTS_MODE=stripe`
   - `NEXT_PUBLIC_SHOP_PAYMENTS_MODE=stripe`
   - `STRIPE_SECRET_KEY=sk_test_…`
   - `NEXT_PUBLIC_SHOP_URL=https://your-shop-domain`
   - `STRIPE_WEBHOOK_SECRET=…` (from `stripe listen` or Dashboard webhook)
4. Open `/checkout` → **Continue to payment** opens Stripe-hosted Checkout (cards never touch this site).
5. Webhook stub acknowledges `checkout.session.completed` — plug in email / invoice / 3PL when going live.

Optional: set `STRIPE_PRICE_<SLUG>` (e.g. `STRIPE_PRICE_PREMIUM`) for Dashboard Price IDs on products **without** colourways. Colourways use Stripe `price_data` from the catalogue.

**Do not** set `SHOP_PAYMENTS_MODE=stripe` on production until imprint, privacy, terms, Widerruf, and fulfilment are ready.

## Before this can take orders

- Publish a complete imprint (address, legal form, register, VAT id).
- Have counsel write the privacy notice, terms, and the statutory withdrawal text.
- CE / product-safety documentation for the NFC product before it is placed on the EU market.
- Turn on Stripe (above) and a German fulfilment partner. Shipping in this preview is the plan figure: €3.95 in Germany, free from €25.
- Issue proper invoices (Stripe Tax / accounting tool) once live.

## Catalogue

| Piece | Price |
| --- | --- |
| Mimir Starter | €12.99 |
| Mimir Shine | €19.99 |
| Mimir Premium, GemTale Premium included | €26.99 launch offer, was €29.99 |
| Extra gem | €3.99 |
| GemTale Premium | €24.99 once |
| Year Book | €44 |
| Chapter Book | €24 |
| Full Tale | €59 |
| Collaboration | about €7–€8 wholesale, from ~500 |
| House Gem | quoted, often 2–12 |
| Corporate gifting | about €12–€16, from ~200 |
