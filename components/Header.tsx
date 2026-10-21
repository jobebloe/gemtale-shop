"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mark } from "@/components/Mark";
import { useCart } from "@/components/CartProvider";

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
          <Link className="logo" href="/" aria-label="GemTale home">
            <Mark />
            <span>GemTale</span>
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
            <button
              className="menu-btn"
              type="button"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
            <button
              className="nav-text"
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setDrawerOpen(!drawerOpen);
              }}
            >
              Bag{ready && count > 0 ? ` (${count})` : ""}
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
        </nav>
      ) : null}
    </>
  );
}
