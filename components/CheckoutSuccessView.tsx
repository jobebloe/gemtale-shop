"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessBody() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <div className="wrap checkout-page">
      <h1>Thank you</h1>
      <p className="lede">
        Payment was received. We will write to you with the next steps for your order.
      </p>
      {sessionId ? (
        <p className="fine" style={{ marginTop: 12 }}>
          Reference: {sessionId}
        </p>
      ) : null}
      <p style={{ marginTop: 22 }}>
        <Link className="link" href="/spirits">
          Back to the shop
        </Link>
      </p>
    </div>
  );
}

export function CheckoutSuccessView() {
  return (
    <Suspense
      fallback={
        <div className="wrap checkout-page">
          <h1>Thank you</h1>
        </div>
      }
    >
      <SuccessBody />
    </Suspense>
  );
}
