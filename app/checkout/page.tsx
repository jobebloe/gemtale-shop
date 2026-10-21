import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata: Metadata = { title: "Reserve" };

export default function CheckoutPage() {
  return <CheckoutForm />;
}
