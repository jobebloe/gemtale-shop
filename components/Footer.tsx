import Link from "next/link";
import { Mark } from "@/components/Mark";
import { CONTACT_EMAIL, INVESTORS_URL, STUDIO } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <Link className="logo" href="/" aria-label="GemTale Shop home">
            <Mark />
            <span>GemTale Shop</span>
          </Link>
          <p>The gem it carries holds your story.</p>
          <p>{STUDIO}</p>
        </div>
        <div>
          <Link href="/spirits">Spirits</Link>
          <Link href="/keepsakes">Keepsakes</Link>
          <Link href="/impressions">Impressions</Link>
          <Link href="/partners">Partners</Link>
          <Link href="/story">The story</Link>
          <a href={INVESTORS_URL}>Investors</a>
        </div>
        <div>
          <Link href="/bag">Bag</Link>
          <Link href="/legal/imprint">Imprint</Link>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/withdrawal">Withdrawal</Link>
        </div>
        <div>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <p>Prices include VAT.</p>
          <p>€3.95 in Germany, free from €25.</p>
        </div>
      </div>
      <div className="wrap legal-note">
        <p>© GemTale, 2026. This preview does not take payment and does not form a contract of sale.</p>
      </div>
    </footer>
  );
}
