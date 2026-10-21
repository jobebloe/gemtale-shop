import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <article className="wrap prose-page">
      <p className="eyebrow">Legal draft</p>
      <h1>Privacy</h1>
      <p>
        This preview is built to keep personal data on your device. The shopping bag is stored in this
        browser. A reservation is stored in this browser for the session, so you can read it back. It is not
        sent to a server.
      </p>
      <p>
        A partner request opens your own email program, addressed to {CONTACT_EMAIL}. That message leaves
        your device only when you send it.
      </p>
      <p>
        Before the shop takes real orders it will need a full privacy notice: the lawful basis for an order,
        how long details are kept, who processes payment and delivery, and how to reach us for access or
        deletion. That notice has to be written with counsel. This page is the boundary of the preview, not
        that notice.
      </p>
    </article>
  );
}
