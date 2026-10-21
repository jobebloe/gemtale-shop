import type { Metadata } from "next";

export const metadata: Metadata = { title: "Withdrawal" };

export default function WithdrawalPage() {
  return (
    <article className="wrap prose-page">
      <p className="eyebrow">Legal draft</p>
      <h1>Withdrawal</h1>
      <p>
        Because this preview does not take payment, no distance contract is formed and there is nothing to
        withdraw.
      </p>
      <p>
        When the shop opens, the intended returns window for a spirit is 30 days. The statutory withdrawal
        text for consumers in the EU has to be published in full, in the right language, before the first
        paid order. Have that text prepared with counsel. It is not reproduced here.
      </p>
    </article>
  );
}
