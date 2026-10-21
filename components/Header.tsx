"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mark } from "@/components/Mark";
import { useCart } from "@/components/CartProvider";
import { INVESTORS_URL } from "@/lib/site";

const LINKS = [
  { href: "/spirits", label: "Spirits" },
  { href: "/keepsakes", label: "Keepsakes" },
  { href: "/partners", label: "Partners" },
  { href: "/story", label: "The story" },
];

export function Header() {
  const pathname = usePathname();
  const { count, ready, drawerOpen, setDrawerOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="header">
        <p className="preview">Preview · payment opens at launch</p>
        <div className="wrap nav">
          <Link className="logo" href="/" aria-label="GemTale Shop home">
            <Mark />
            <span>GemTale Shop</span>
          </Link>
          <nav className="nav-links" aria-label="Shop">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="nav-tools">
            <a className="nav-investors" href={INVESTORS_URL}>
              Investors
            </a>
            <button
              className="menu-btn"
              type="button"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
            <button
              className="nav-cart"
              type="button"
              aria-label={ready && count > 0 ? `Bag, ${count}` : "Bag"}
              onClick={() => {
                setMenuOpen(false);
                setDrawerOpen(!drawerOpen);
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.5 7h13l-1.4 8.2a1.5 1.5 0 0 1-1.48 1.25H9.1a1.5 1.5 0 0 1-1.47-1.2L5.2 4.8A1 1 0 0 0 4.22 4H2.5" />
                <circle cx="9" cy="20" r="1.35" />
                <circle cx="17" cy="20" r="1.35" />
              </svg>
              {ready && count > 0 ? <span className="nav-cart-count">{count}</span> : null}
            </button>
          </div>
        </div>
      </header>
      {menuOpen ? (
        <nav className="menu" aria-label="Mobile">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <a className="menu-investors" href={INVESTORS_URL}>
            Investors
          </a>
        </nav>
      ) : null}
    </>
  );
}
