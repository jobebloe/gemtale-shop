import type { Metadata } from "next";
import { CONTACT_EMAIL, STUDIO } from "@/lib/site";

export const metadata: Metadata = { title: "Imprint" };

export default function ImprintPage() {
  return (
    <article className="wrap prose-page">
      <p className="eyebrow">Legal draft</p>
      <h1>Imprint</h1>
      <p>
        GemTale · {STUDIO}, Germany
        <br />
        Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p>
        This shop is a preview. It does not take payment and does not conclude a contract. A street address,
        the legal form, a register number, and a VAT identification number will be published here before any
        order can be placed. Have this page reviewed before launch.
      </p>
    </article>
  );
}
