"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "@/lib/catalog";
import { lineKey, type BagLine } from "@/lib/bag";

const STORAGE_KEY = "gemtale-shop-bag";

type CartApi = {
  lines: BagLine[];
  ready: boolean;
  count: number;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  add: (productId: string, colorId: string | null, quantity?: number) => void;
  setQty: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<BagLine[]>([]);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as BagLine[];
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {
      /* keep an empty bag if storage is unreadable */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const api = useMemo<CartApi>(() => {
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);
    return {
      lines,
      ready,
      count,
      drawerOpen,
      setDrawerOpen,
      add: (productId, colorId, quantity = 1) => {
        const product = getProduct(productId);
        if (!product || product.price == null) return;
        const key = lineKey(productId, colorId);
        setLines((current) => {
          const existing = current.find((line) => line.key === key);
          const max = product.maxQty ?? 10;
          if (!existing) {
            return [...current, { key, productId, colorId, quantity: Math.min(quantity, max) }];
          }
          return current.map((line) =>
            line.key === key
              ? { ...line, quantity: Math.min(max, line.quantity + quantity) }
              : line,
          );
        });
        setDrawerOpen(true);
      },
      setQty: (key, quantity) => {
        setLines((current) =>
          current
            .map((line) => {
              if (line.key !== key) return line;
              const product = getProduct(line.productId);
              const max = product?.maxQty ?? 10;
              return { ...line, quantity: Math.max(1, Math.min(max, quantity)) };
            })
            .filter((line) => line.quantity > 0),
        );
      },
      remove: (key) => setLines((current) => current.filter((line) => line.key !== key)),
      clear: () => setLines([]),
    };
  }, [lines, ready, drawerOpen]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used within CartProvider");
  return cart;
}
