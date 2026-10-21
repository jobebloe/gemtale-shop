export const CONTACT_EMAIL = "info.likeyou@gmx.de";
export const STUDIO = "Grafing bei München";
export const INVESTORS_URL = "https://jobebloe.github.io/gemtale_investors/";

export const SHIPPING_CENTS = 395;
export const FREE_DELIVERY_CENTS = 2500;
export const VAT_RATE = 1.19;

export function asset(path: string) {
  if (!path) return path;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!base || path.startsWith(base)) return path;
  return `${base}${path}`;
}

export function formatEUR(cents: number) {
  const sign = cents < 0 ? "−" : "";
  const abs = Math.abs(cents);
  const euros = Math.floor(abs / 100);
  const rest = abs % 100;
  return `${sign}€${euros}.${rest.toString().padStart(2, "0")}`;
}
