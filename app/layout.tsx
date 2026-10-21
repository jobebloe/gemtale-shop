import type { Metadata } from "next";
import { BagDrawer } from "@/components/BagDrawer";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { asset } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "GemTale",
    template: "%s — GemTale",
  },
  description:
    "Mimir, the spirit that carries your story. Launch colourways from €12.99. No subscription.",
  icons: { icon: asset("/gemtale-ghost-mark.svg") },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      style={{ "--pattern": `url("${asset("/feather-pattern.svg")}")` } as React.CSSProperties}
    >
      <body>
        <CartProvider>
          <a className="skip" href="#content">
            Skip to content
          </a>
          <Header />
          <main id="content">{children}</main>
          <Footer />
          <BagDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
