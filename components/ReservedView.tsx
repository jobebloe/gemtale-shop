"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RESERVATION_KEY } from "@/components/CheckoutForm";
import { formatEUR } from "@/lib/site";

type Reservation = {
  name: string;
  email: string;
  country: string;
  note: string;
  lines: { name: string; detail: string | null; qty: number; total: number }[];
  subtotal: number;
  shipping: number;
  vat: number;
  total: number;
};

export function ReservedView() {
  const [reservation, setReservation] = useState<Reservation | null | undefined>(undefined);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(RESERVATION_KEY);
      setReservation(raw ? (JSON.parse(raw) as Reservation) : null);
    } catch {
      setReservation(null);
    }
  }, []);

  if (reservation === undefined) {
    return (
      <div className="wrap prose-page">
        <h1>Reserved</h1>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="wrap prose-page">
        <h1>Nothing reserved in this browser.</h1>
        <p>
          <Link className="link" href="/spirits">
            Shop Mimir
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="wrap prose-page">
      <p className="eyebrow">Preview</p>
      <h1>Reserved.</h1>
      <p>
        {reservation.name}, we have this list for {reservation.email}. Nothing has been charged. When payment
        opens, we write to you. Until then, no contract of sale exists.
      </p>
      <div className="totals">
        {reservation.lines.map((line) => (
          <div key={`${line.name}-${line.detail}`}>
            <span>
              {line.name}
              {line.detail ? ` · ${line.detail}` : ""} × {line.qty}
            </span>
            <span>{formatEUR(line.total)}</span>
          </div>
        ))}
        <div>
          <span>Delivery in Germany</span>
          <span>{reservation.shipping === 0 ? "Free" : formatEUR(reservation.shipping)}</span>
        </div>
        <div className="grand">
          <span>Total</span>
          <span>{formatEUR(reservation.total)}</span>
        </div>
        <p className="fine">
          Includes {formatEUR(reservation.vat)} VAT. Country noted: {reservation.country}.
        </p>
      </div>
    </div>
  );
}
