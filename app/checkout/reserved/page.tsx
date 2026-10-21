import type { Metadata } from "next";
import { ReservedView } from "@/components/ReservedView";

export const metadata: Metadata = { title: "Reserved" };

export default function ReservedPage() {
  return <ReservedView />;
}
