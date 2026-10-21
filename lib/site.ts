export const CONTACT_EMAIL = "info.likeyou@gmx.de";
export const STUDIO = "Grafing bei München";

export const SHIPPING_CENTS = 395;
export const FREE_DELIVERY_CENTS = 2500;
export const VAT_RATE = 1.19;

export function formatEUR(cents: number) {
  const sign = cents < 0 ? "−" : "";
  const abs = Math.abs(cents);
  const euros = Math.floor(abs / 100);
  const rest = abs % 100;
  return `${sign}€${euros}.${rest.toString().padStart(2, "0")}`;
}
