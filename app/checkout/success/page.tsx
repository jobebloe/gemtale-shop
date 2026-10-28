import type { Metadata } from "next";
import { CheckoutSuccessView } from "@/components/CheckoutSuccessView";

export const metadata: Metadata = { title: "Thank you" };

export default function CheckoutSuccessPage() {
  return <CheckoutSuccessView />;
}
